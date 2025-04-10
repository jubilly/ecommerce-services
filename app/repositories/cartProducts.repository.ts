import { CartProducts } from "@prisma/client";
import appDatabase from "~/database";

const create = async (
    productId: string, 
    name: string,
    quantity: number, 
    cartId: string,
) => {
    return await appDatabase.cartProducts.create({
        data: {
            productId,
            name,
            quantity,
            cartId,
        },
    });
}

const createMany = async (data: CartProducts[]) => {
    return await appDatabase.cartProducts.createMany({ data });
}


export const repository = {
    create,
    createMany,
}