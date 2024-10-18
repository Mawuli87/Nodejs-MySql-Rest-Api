import {Request, Response} from "express";
import {User} from "../entity/user.entity";
import bcyptjs from "bcryptjs";
import {AppDataSource} from "../index";




export const Users = async (req: Request, res: Response) => {
   // const take = 15;
    //const page = parseInt(req.query.page as string || '1');

    const repository = AppDataSource.getRepository(User);
    const users = await repository.find({
        relations: ['role']
    });
    res.send(users.map(u => {
        const {password, ...data} = u;
        return data;
    }));



    // const [data, total] = await repository.findAndCount({
    //     take,
    //     skip: (page - 1) * take,
    //     relations: ['role']
    // })

    // res.send({
    //     data: data.map(u => {
    //         const {password, ...data} = u;
    //
    //         return data;
    //     }),
    //     meta: {
    //         total,
    //         page,
    //         last_page: Math.ceil(total / take)
    //     }
    // });
}

export const CreateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;
    const hashedPassword = await bcyptjs.hash('1234', 10);

    const repository = AppDataSource.getRepository(User);

    const {password, ...user} = await repository.save({
        ...body,
        password: hashedPassword,
        role: {
            id: role_id
        }
    })

    res.status(201).send(user);
}

export const GetUser = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(User);

    // @ts-ignore
    const {password, ...user} = await repository.findOneBy({id:req.params.id,relations: ['role']});


    res.send(user);
}

export const UpdateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body;

    const repository = AppDataSource.getRepository(User);

    await repository.update(req.params.id,body);
    // @ts-ignore
    const {password, ...user} = await repository.findOneBy({id:req.params.id});

    res.status(202).send(user);
}

export const DeleteUser = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(User);

    await repository.delete(req.params.id);

    res.status(204).send({
        message: 'User deleted successfully!'
    });
}
