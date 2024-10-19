import {Request, Response} from "express";
import {Permission} from "../entity/permission.entity";
import {AppDataSource} from "../index";

export const PermissionController = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Permission);

    res.send(await repository.find());
}
