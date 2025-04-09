import { PrismaClient, Products } from "../../../generated/prisma";

const prisma = new PrismaClient();

const create = async (data: Products) => {
    return await prisma.products.create({ data });
}

export const repository = {
    create
}