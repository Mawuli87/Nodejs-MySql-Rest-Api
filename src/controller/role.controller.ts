import {Request, Response} from "express";
import {Role} from "../entity/role.entity";
import {AppDataSource} from "../index";
import {Permission} from "../entity/permission.entity";

export const Roles = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Role);

    res.send(await repository.find());
}

// export const CreateRole = async (req: Request, res: Response) => {
//     const {name, permissions} = req.body;
//
//     const repository = AppDataSource.getRepository(Role);
//
//     const role = await repository.save({
//         name,
//         permissions: permissions.map(id => ({id})),
//        // permissions: permissions.map(permission => ({ id: permission.id }))
//     });
//
//     res.status(201).send(role);
// }



export const CreateRole = async (req: Request, res: Response) => {
    const { name, permissions } = req.body;

    // Check if permissions is an array
    if (!Array.isArray(permissions)) {
        return res.status(400).send({ message: "Permissions must be an array of permission IDs" });
    }

    const repository = AppDataSource.getRepository(Role);
    const permissionRepository = AppDataSource.getRepository(Permission);

    // Fetch permissions from the database based on the provided IDs
    const permissionEntities = await permissionRepository.findByIds(permissions);

    if (permissionEntities.length !== permissions.length) {
        return res.status(400).send({ message: "Some permissions were not found" });
    }

    try {
        const role = await repository.save({
            name,
            permissions: permissionEntities // Assign permission entities directly
        });

        return res.status(201).send(role);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error creating role" });
    }
};

export const GetRole = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Role);

    // @ts-ignore
    res.send(await repository.findOneById(req.params.id, {relations: ['permissions']}))
}

export const UpdateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;

    const repository = AppDataSource.getRepository(Role);

    const role = await repository.save({
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map(id => ({id}))
    });

    res.status(202).send(role);
}

export const DeleteRole = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Role)

    await repository.delete(req.params.id);

    res.status(204).send(null);
}
