import server from "../../server";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import appDatabase from "../../database";
import { customerRepository } from "../../repositories";

const PORT = 5000;
const alive = true;
const version = "1.0"

const info = {
  "descricao": "Service for insert customer of a store in database",
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
		@body to create customer
		{
				"storeId": "85274196310",
				"name": "Joe Doe",
				"email": "joe.doe@exame.com",
				"phone": "123456789",
				"address": "123 Main St",
				"city": "New York",
				"state": "NY",
				"country": "USA",
				"zipCode": "10001"
		}
*/

server.post('/customers', async (request, response) =>  {
    const { body } = request;

		const parsedCustomer = {
			id: randomUUID(),
			storeId: body.storeId,
			name: body.name,
			email: body.email,
			phone: body.phone,
			address: body.address,
			city: body.city,
			state: body.state,
			country: body.country,
			zipCode: body.zipCode,
			createdAt: new Date(),
		}

		try {
        const databaseCustomer = await customerRepository.create(parsedCustomer);

        appDatabase.$disconnect();
    
        if (!databaseCustomer) {
			response.status(404).json({
				status: 'Customer not found',
			});
        }
    
        response.status(201).json({
            status: 'Customer created successfully',
            data: parsedCustomer,
        });
    } catch (error) {
        response.status(500).json({
            status: 'Error creating customer',
            error: error,
        });
    }
});