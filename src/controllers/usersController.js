import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function postSignUp(req, res) {
  const { name, email, password, imageURL, type } = res.locals.user;

  try {
    const userExist = await usersCollection.findOne({ email });

    if (userExist) {
      return res.status(401).send({ message: "Esse e-mail já está sendo usado." });
    }

    const hidePassword = bcrypt.hashSync(password, 10); //criptografar

    const newProfile = {
      name,
      email,
      password: hidePassword,
      imageURL,
      type : !type ? "user" : type,
    };

    await usersCollection.insertOne(newProfile); // inserindo no mongo
    res.sendStatus(201);
  } catch (err) {
    console.log("err", err);
    res.sendStatus(500);
  }
}

export async function postSignIn(req, res) {
  const { email, password } = req.body;

    const token = uuidV4(); 

    try {

        const userExist = await users.findOne({ email });

    if (!userExist) {
      return res.status(401).send({ message: "Esse usuário não existe" });
    }

        const passwordOk = bcrypt.compareSync(password, userExist.password);

    if (!passwordOk) {
      return res.status(400).send({ message: "Senha incorreta" });
    }

    const sessionUser = await sessionsCollection.findOne({
      userId: userExist._id,
    });

        if (sessionUser) {
            return res.status(401).send({ message: "Você já está logado, saia para logar novamente" });
        };

    await sessionsCollection.insertOne({
      token,
      userId: userExist._id,
    });

    res.send({ token, name: userExist.name, imageURL: userExist.imageURL });
  } catch (err) {
    res.sendStatus(500);
  }
}

//logout :D
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

  export async function changeUserData(req,res) {
    const field = req.body;
    const user = res.locals.user;
  
    if (!field) {
      return res.status(404).send("Nenhum campo foi mandado.");
    }
  
    try {
      const isThereAnyField = await usersCollection.find({ field });
      if (!isThereAnyField)
        return res
          .status(404)
          .send("Nenhum campo com esse nome foi encontrado no banco de dados");
  
      await usersCollection.updateOne({ _id: user._id }, { $set: field });
      res.status(200).send("Campo atualizado com sucesso");
    } catch (err) {
      console.log(err);
    }
  }