# Informações gerais

- Disciplina: Projeto de microsserviços da disciplina Desenvolvimento de Aplicações Orientadas a Serviços (2025.1)
- Autora: Amanda Prates Caetano
- Curso: Especialização em desenvolviment Web 2024.2, IFBA (Vitória da Conquista)

# Descrição do projeto

Mini-mundo: Plataforma de ecommerce

Os microsserviços de backend permitem que um comerciante cadastre produtos, visualize os produtos cadastrados e visualize os clientes que realizaram o cadastro na loja para efetuar pedidos.

Serão 5 microsserviços:

- Microsserviço de cadastro produtos: Permite que o comerciante cadastre o produto
- Microsserviço de listagem de produtos: Permite que o comerciante visualize o produto cadastrado
- Microsserviço de carrinho: Permite que o customer - pessoa que compra produtos - monte o carrinho, de acordo com os produtos cadastrados pelo comerciante
- Microsserviço de listagem de clientes: Permite que o comerciante gerencie os clientes cadastrados na loja
- Microsserviço de cadastro de clientes: Permite que um cliente se cadastre na loja

# Como rodar?

1.  Abrir o terminal na pasta raiz do projeto

2.  Executar a cli para instalar as dependências

        	npm install

3.  Para rodar os tipos e crir o banco de dados:
    3.1 Criar na pasta raiz o arquivo .env, baseando-se no arquivo .env-example. Esse .env será usado para configurar o banco no docker
    Conteúdo do arquivo:

        		DATABASE_URL="postgresql://root:root@localhost:5448/db_ecommerce"

3.2 Criar na pasta raiz o arquivo .env.docker, baseando-se no arquivo .env-example. Esse .env.docker será usado pelos serviços para se conectar no banco e realaizar as queries.
Conteúdo do arquivo:

    		DATABASE_URL="postgresql://root:root@db_ecommerce:5432/db_ecommerce"

4.  No terminal na pasta raiz do projeto, inicar os serviços executando a cli

        	docker compose up -d

5.  Para configurar o banco de dados, devemos gerar os tipos e aplicar o schema atual dentro do banco, rode as clis abaixo

        	- npx prisma generate
        	- npx prisma migrate dev

6.  Abrir o html dos clientes pelo Live Serve, exemplo abaixo:

    - Cliente Merchant: comerciante cadastra produtos, visualiza os produtos cadastrados, visualiza os clientes e carrinhos da loja
    - Cliente: Customer: visualiza produtos cadastrados pelo merchant realiza pedidos/carrinhos

    ![alt text](docs/how_to_start_client.png)

7.  Rotas

Serviço service_get_products (GET)
http://localhost:5001/

Serviço service_create_products (POST)
http://localhost:5002/

Serviço service_get_customer (GET)
http://localhost:5003/

Serviço service_create_customer (POST)
http://localhost:5004/

Serviço service_get_cart (GET)
http://localhost:5005/
