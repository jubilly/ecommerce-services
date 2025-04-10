import { customerRepository } from "~/repositories";
import server from "../../server";

const PORT = 5000;
const alive = true;

const version = "1.0"
const info = {
  "descricao": "Service for list customers of a store",
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

server.get('/customers', async (request, response) =>  {
	const databaseCustomers = await customerRepository.findMany();

	if (!databaseCustomers) {
		response.status(404).json({
			status: 'Customers not found',
		});
	}

	response.status(201).json({
		status: 'Customers fetched successfully',
		data: databaseCustomers,
	});
});