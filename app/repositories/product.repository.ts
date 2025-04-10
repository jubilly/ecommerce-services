import { Products } from '@prisma/client';
import appDatabase from '../database';

const create = async (data: Products) => {
    return await appDatabase.products.create({ data });
};

const createMany = async (data: Products[]) => {
    return await appDatabase.products.createMany({ data });
};

const findMany = async () => {
    return await appDatabase.products.findMany();
};

export const repository = {
    create,
    createMany,
    findMany
}