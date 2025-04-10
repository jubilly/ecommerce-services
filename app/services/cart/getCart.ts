import { cartRepository, customerRepository } from "~/repositories";
import server from "../../server";

const PORT = 5000;
const alive = true;

const version = "1.0"
const info = {
  "descricao": "Service for list carts of a store",
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
	GET /cart
	- Query Parameters:
		- customerId: string (required)
	- Response:
		- 200 OK: Carts fetched successfully
		- 400 Bad Request: Customer ID is required
		- 404 Not Found: Customer not found with this ID
		- 500 Internal Server Error: Error fetching carts

	- Example Request:
	GET /cart?customerId=12345678-1234-1234-1234-123456789012
*/

server.get('/cart', async (request, response) =>  {

	const { customerId } = request.query;
	
	if (!customerId) {
		response.status(400).json({
			status: 'Customer ID is required',
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

		if (!findCustomer) {
			response.status(404).json({
				status: 'Customer not found with this ID',
			});
			return;
		}

		const databaseCarts = await cartRepository.findCartByCustomerId(customerId as string);
	
		if (!databaseCarts) {
			response.status(404).json({
				status: 'Carts not found',
			});
		}
	
		response.status(201).json({
			status: 'Carts fetched successfully',
			data: databaseCarts,
		});
	} catch (error) {
		console.error('Error fetching carts:', error);
		response.status(500).json({
			status: 'Internal server error',
			error: error,
		});
	}

});