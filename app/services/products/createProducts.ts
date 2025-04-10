import server from "~/server";
import { productRepository } from "../../repositories";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import appDatabase from "~/database";

const PORT = 5000;
const alive = true;
const version = "1.0"

const info = {
  "descricao": "Service for insert products of a store in database",
  "autor": "Amanda Prates",
  "versao": version
}

server.listen(PORT, () => {
    console.log(`[server] started on port ${PORT} 🚀`);
});

server.get('/healthcheck', (request, response) => {
    alive ? response.status(200).json({ status: 'ok' }) : response.status(500).json({ status: 'error' });
});

server.get('/info', (request, response) => {
    response.status(200).json(info);
});

/*
    @body to create products

    {
        "products": [
            {
                "storeId": "85274196310",
                "name": "Sabonete",
                "category": "higiente",
                "price": "10",
                "promotionalPrice": "15"
            },
            {
                "storeId": "85274196310",
                "name": "Desodorante",
                "category": "higiente",
                "price": "20",
                "promotionalPrice": "25"
            }
        ]

    }
*/

server.post('/products', async (request, response) =>  {
    const { body } = request;

    const products = body.products;
    const parsedProducts = products.map((product: {
        id: string;
        storeId: string;
        name: string;
        category: string;
        price: string;
        promotionalPrice: string;
    }) => {
		return {
            id: randomUUID(),
			storeId: product.storeId,
			name: product.name,
			category: product.category,
			price: Prisma.Decimal(product.price),
			promotionalPrice: Prisma.Decimal(product.promotionalPrice)
		};
	});

    try {
        console.log('parsedProducts x', parsedProducts);

        const databaseProducts = await productRepository.createMany(parsedProducts);

        appDatabase.$disconnect();
    
        if (!databaseProducts) {
            response.status(404).json({
                status: 'Product not found',
            });
        }
    
        response.status(201).json({
            status: 'Product created successfully',
            data: body,
        });
    } catch (error) {
        response.status(500).json({
            status: 'Error creating product',
            error: error,
        });
    }
});