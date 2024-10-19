import {Request, Response} from "express";
import {Product} from "../entity/product.entity";
import {AppDataSource} from "../index"; 

export const Products = async (req: Request, res: Response) => {
    const take = 15;
    const page = parseInt(req.query.page as string || '1');

    const repository = AppDataSource.getRepository(Product);

    const [data, total] = await repository.findAndCount({
        take,
        skip: (page - 1) * take
    })

    res.send({
        data,
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    });
}

export const CreateProduct = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Product);

    const product = await repository.save(req.body)

    res.status(201).send(product);
}

export const GetProduct = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Product);
    // @ts-ignore
    res.send(await repository.findOneBy({id:req.params.id}));
}

export const UpdateProduct = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Product);

    await repository.update(req.params.id, req.body);

    // @ts-ignore
    res.status(202).send(await repository.findOne({id:req.params.id}));
}

export const DeleteProduct = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Product);

    await repository.delete(req.params.id);

    res.status(204).send(null);
}
