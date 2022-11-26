import { users, sessions } from "../database/db.js";
import { signUpSchema } from "../models/userModel.js";

import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function postSignUp (req, res) {
    const { name, email, password, imageURL } = req.body;

    try {

        const userExist = await users.findOne({ email });

        if (userExist) {
            return res.status(401).send({ message: "Esse usuário já existe" });
        }

        const validation = signUpSchema.validate(
            { name, email, password, imageURL },
            { abortEarly: false }
        );

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).send(errors);
        };

        const hidePassword = bcrypt.hashSync(password, 10); //criptografar

        const newProfile =
        {
            name,
            email,
            password: hidePassword,
            imageURL
        };

        await users.insertOne(newProfile); // inserindo no mongo
        res.sendStatus(201);
    } catch (err) {
        console.log("err", err)
        res.sendStatus(500);
    };

};

export async function postSignIn (req, res) {
    const { email, password } = req.body;

    console.log("password", password)

    const token = uuidV4(); 

    try {

        const userExist = await users.findOne({ email });
        console.log("user", userExist)

        if (!userExist) {
            return res.status(401).send({ message: "Esse usuário já existe" });
        }

        const passwordOk = bcrypt.compareSync(password, userExist.password);
        console.log("ok", passwordOk)

        if (!passwordOk) {
            return res.status(400).send({ message: "Senha incorreta" });
        }

        const sessionUser = await sessions.findOne({ userId: userExist._id });

        if (!sessionUser) {
            return res.status(401).send({ message: "Você já está logado, saia para logar novamente" });
        };

        await sessions.insertOne({
            token,
            userId: userExist._id
        });

        res.send({ token });
    } catch (err) {
        res.sendStatus(500);
    };

};

export async function deleteSignIn(req, res) {
     const token = req.params;
    console.log(token.token)
  
    try {
      const sessionExists = await sessions.findOne({ token: token.token });
      if (!sessionExists) {
        return res.status(404).send("Esse usuário nem sequer existe :s");
      }
      await sessions.deleteOne({ token: token.token });
      res.status(200).send("User deslogado com sucesso");
    } catch (err) {
      console.log(err);
    }
  };