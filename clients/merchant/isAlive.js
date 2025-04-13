const BASE_URL = "http://localhost";

const SERVICE_PRODUCT_ISALIVE = `${BASE_URL}:5001/healthcheck`;
const SERVICE_CREATE_PRODUCT_ISALIVE = `${BASE_URL}:5002/healthcheck`;

const SERVICE_CUSTOMER_ISALIVE_URL = `${BASE_URL}:5003/healthcheck`;
const SERVICE_CREATE_CUSTOMER_ISALIVE_URL = `${BASE_URL}:5004/customers`;

const SERVICE_CART_ISALIVE_URL = `${BASE_URL}:5005/healthcheck`;
const SERVICE_CREATE_CART_ISALIVE_URL = `${BASE_URL}:5006/healthcheck`;

const isAliveGetProduct = async () => {
  try {
    const response = await fetch(SERVICE_PRODUCT_ISALIVE);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert(
      "O serviço de listagem de produtos está indisponível!",
      error.message
    );
  }
};

const isAliveCreateProduct = async () => {
  try {
    const response = await fetch(SERVICE_CREATE_PRODUCT_ISALIVE);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert("O serviço de criar produtos está indisponível!", error.message);
  }
};

const isAliveGetCustomer = async () => {
  try {
    const response = await fetch(SERVICE_CUSTOMER_ISALIVE_URL);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert(
      "O serviço de listagem de customer está indisponível!",
      error.message
    );
  }
};

const isAliveCreateCustomer = async () => {
  try {
    const response = await fetch(SERVICE_CREATE_CUSTOMER_ISALIVE_URL);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert("O serviço de criar customer está indisponível!", error.message);
  }
};

const isAliveGetCart = async () => {
  try {
    const response = await fetch(SERVICE_CART_ISALIVE_URL);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert(
      "O serviço de listagem de carrinho está indisponível!",
      error.message
    );
  }
};

const isAliveCreateCart = async () => {
  try {
    const response = await fetch(SERVICE_CREATE_CART_ISALIVE_URL);
    const data = await response.json();
    return data.status === "ok";
  } catch (error) {
    alert("O serviço de criar carrinho está indisponível!", error.message);
  }
};

export {
  isAliveGetProduct,
  isAliveCreateProduct,
  isAliveGetCustomer,
  isAliveCreateCustomer,
  isAliveGetCart,
  isAliveCreateCart,
};
