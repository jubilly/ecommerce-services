import { productRepository } from "../repository";


const data = {
    name: 'test',
    category: 'higiente',
    price: '100',
    promotionalPrice: '200'
}

productRepository.create(data)