import server from "../../server";
import { productRepository } from "../../repositories";

const PORT = 5000;
const alive = true;

const version = "1.0"
const info = {
  "descricao": "Service for list products of a store",
  "autor": "Amanda Prates",
  "versao": version
}

server.listen(PORT, () => {
	console.log('processing', process.env.DATABASE_URL)
	console.log(`[server] started on port ${PORT} xxx 🚀`);
});

server.get('/healthcheck', (request, response) => {
	alive ? response.status(200).json({ status: 'ok' }) : response.status(500).json({ status: 'error' });
});

server.get('/info', (request, response) => {
	response.status(200).json(info);
});

server.get('/products', async (request, response) =>  {
	const databaseProducts = await productRepository.findMany();

	if (!databaseProducts) {
		response.status(404).json({
			status: 'Products not found',
		});
	}

	response.status(201).json({
		status: 'Products fetched successfully',
		data: databaseProducts,
	});
});