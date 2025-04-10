import { Cart } from "@prisma/client";
import appDatabase from "~/database";


export const create = async (data: Cart) => {
    return await appDatabase.cart.create({ data });
};

export const findCartByCustomerId = async (customerId: string) => {
    return await appDatabase.cart.findMany({
        where: { customerId },
        include: {
            products: true
        }
    });
};

export const repository = {
    create,
    findCartByCustomerId,
};