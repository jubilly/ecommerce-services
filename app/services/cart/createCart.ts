import { cartProductsRepository, cartRepository, customerRepository } from "../../repositories";
import server from "../../server";
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";

const PORT = 5000;
const alive = true;

const version = "1.0"
const info = {
  "descricao": "Service for create a customer cart of a store",
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
	POST /cart
	- Body:
		- storeId: string (required)
		- customerId: string (required)
		- total: number (required)
		- products: array of objects (optional)
			- productId: string (required)
			- name: string (required)
			- quantity: number (required)
	- Response:
		- 201 Created: Cart created successfully
		- 400 Bad Request: Store ID, Customer ID and Total are required
		- 404 Not Found: Customer not found with this ID
		- 500 Internal Server Error: Error creating cart
	- Example Request:
	POST /cart
	{
		"storeId": "85274196310",
		"customerId": "8dd6824f-8067-400a-8f92-a67d79c5c3aa",
		"total": "1200",
		"products": [
			{
				"productId": "76fe2043-4f55-4223-9d77-a744fff94020",
				"name": "aaa",
				"quantity": "10"
			}
		]
	}
*/

server.post('/cart', async (request, response) =>  {

	const { storeId, customerId, total, products } = request.body;
	
	if (!storeId || !customerId || !total) {
		response.status(400).json({
			status: 'Store ID, Customer ID and Total are required',
		});
		return;
	}

	if (customerId.length !== 36) {
		response.status(400).json({
			status: 'Customer ID must be 36 characters long',
		});
		return;
	}
	
	try {
		const findCustomer = await customerRepository.findById(customerId as string);
		console.log('findCustomer', findCustomer);

		const allCustomers = await customerRepository.findMany();
		console.log('allCustomers', allCustomers);

		if (!findCustomer) {
			response.status(404).json({
				status: 'Customer not found with this ID',
			});
			return;
		}

		const parseCart = {
			id: randomUUID(),
			storeId,
			customerId,
			total: Prisma.Decimal(total),
			createdAt: new Date(),
		}

		const cart = await cartRepository.create(parseCart);

		if (!products || products.length === 0) {
			response.status(500).json({
				status: 'Error creating cart, products are required',
				data: cart,
			});
			return;
		}

		const parsedProducts = products.map((item: any) => ({
			id: randomUUID(),
			productId: item.productId,
			name: item.name,
			quantity: parseInt(item.quantity),
			cartId: cart.id,
			createdAt: new Date(),
		}));
		
		const cartItems = await cartProductsRepository.createMany(parsedProducts);

		response.status(201).json({
			status: 'Cart created successfully',
			data: {
				cart,
				cartItems,
			},
		});
		
	} catch (error) {
		response.status(500).json({
			status: 'Error creating cart',
			error: error,
		});
	}

});