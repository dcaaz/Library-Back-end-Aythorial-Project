import { users, sessions } from "../database/db";
import { signUpSchema } from "../models/userModel";

import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function postSignUp (req, res) {
    const { name, email, password, photograph } = req.body;

    try {

        const userExist = await users.findOne({ email });

        if (userExist) {
            return res.status(401).send({ message: "Esse usuário já existe" });
        }

        const validation = signUpSchema.validate(
            { name, email, password, photograph },
            { abortEarly: false }
        );

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message);
            return res.status(400).send(errors);
        };

        const hidePassword = bcrypt.hashSync(senha, 10); //criptografar

        const newProfile =
        {
            nome,
            email,
            senha: hidePassword,
            photograph
        };

        await usuarios.insertOne(newProfile); // inserindo no mongo
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    };

};

export async function postSignIn (req, res) {
    try {
    } catch (err) {
        res.sendStatus(500);
    };

};
