import { sessionsCollection, usersCollection } from "../database/db.js";

export async function tokenValidation(req, res, next){ //função interceptadora
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Nenhuma token foi enviada")
    }

    try{

        const session = await sessionsCollection.findOne({token});

        if(!session){
            return res.sendStatus(401);
        }

        const id = session?.userId;

        const user = await usersCollection.findOne({ _id: id});

        if (!user) {
            return res.sendStatus(401);
        }

       res.locals.user = user

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}