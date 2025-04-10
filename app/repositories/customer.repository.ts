import { Customer } from '@prisma/client';
import appDatabase from '../database';

const create = async (data: Customer) => {
	return await appDatabase.customer.create({
		data,
	});
};

const findMany = async () => {
	return await appDatabase.customer.findMany();
};

const findById = async (id: string) => {
	return await appDatabase.customer.findUnique({
		where: {
			id,
		},
	});
};

export const repository = {
	create,
	findById,
	findMany,
};
