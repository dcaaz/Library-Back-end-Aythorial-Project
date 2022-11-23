import { sessions, users } from "../database/db.js";

export async function tokenValidation(req, res, next){ //função interceptadora

    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try{

        const session = await sessions.findOne({token});

        if(!session){
            return res.sendStatus(401);
        }

        const id = session?.userId;

        const user = await users.findOne({ _id: id});

        if (!user) {
            return res.sendStatus(401);
        }

        req.usuario = usuario;

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}