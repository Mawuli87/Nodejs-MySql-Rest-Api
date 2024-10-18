import {Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {User} from "../entity/user.entity";
import {AppDataSource} from "../index";

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
        const repository = AppDataSource.getRepository(User);

        req["user"] = await repository.findOneBy({id: payload.id});


        next();
    } catch (e) {
        return res.status(401).send({
            message: 'You are not logged in'
        });
    }
}
