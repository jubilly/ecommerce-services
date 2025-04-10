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

1. Abrir o terminal na pasta raiz do projeto

2. Executar a cli para instalar as dependências

			npm install

3. Criar na pasta raiz o arquivo .env, baseando-se no arquivo .env-example. Os valores usados na variável DATABASE_URL podem ser encotradoss no serviço db_ecommerce na pasta docker-compose.yaml, o arquivo ficará:

			DATABASE_URL="postgresql://root:root@localhost:5438/db_ecommerce"

4.