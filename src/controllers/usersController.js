import { users, sessions } from "../database/db.js";

import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function postSignUp (req, res) {
    
    const user = res.locals.user;
    console.log("user", user)

    try {

        /*  const userExist = await users.findOne({ email });

      if (userExist) {
            return res.status(401).send({ message: "Esse usuário já existe" });
        }/*/

        const hidePassword = bcrypt.hashSync(user.password, 10); //criptografar

        await users.insertOne(   { ...user, password: hidePassword }         ); // inserindo no mongo
        res.sendStatus(201);
    } catch (err) {
        console.log("err", err)
        res.sendStatus(500);
    };

};

export async function postSignIn (req, res) {
    const { email, password } = req.body;

    const token = uuidV4(); 

    try {

        const userExist = await users.findOne({ email });

        if (!userExist) {
            return res.status(401).send({ message: "Esse usuário já existe" });
        }

        const passwordOk = bcrypt.compareSync(password, userExist.password);

        if (!passwordOk) {
            return res.status(400).send({ message: "Senha incorreta" });
        }

        const sessionUser = await sessions.findOne({ userId: userExist._id });

        if (sessionUser) {
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
