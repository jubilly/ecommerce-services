const BASE_URL = "http://localhost";

const SERVICE_CUSTOMER_URL = `${BASE_URL}:5003/customers`;
const SERVICE_CUSTOMER_ISALIVE_URL = `${BASE_URL}:5003/healthcheck`;

const SERVICE_CREATE_USTOMER_URL = `${BASE_URL}:5004/customers`;
const SERVICE_CREATE_USTOMER_ISALIVE_URL = `${BASE_URL}:5004/healthcheck`;

const SERVICE_CART_URL = `${BASE_URL}:5005/cart`;
const SERVICE_CART_ISALIVE_URL = `${BASE_URL}:5005/healthcheck`;

const SERVICE_CREATE_CART_URL = `${BASE_URL}:5006/cart`;
const SERVICE_CREATE_CART_ISALIVE_URL = `${BASE_URL}:5006/healthcheck`;

const SERVICE_PRODUCT = `${BASE_URL}:5001/products`;
const SERVICE_PRODUCT_ISALIVE = `${BASE_URL}:5001/healthcheck`;

const SERVICE_CREATE_PRODUCT = `${BASE_URL}:5002/products`;
const SERVICE_CREATE_PRODUCT_ISALIVE = `${BASE_URL}:5002/healthcheck`;

function hideAllSections() {
  document.querySelectorAll(".panel").forEach((section) => {
    section.classList.add("no-show");
  });
}

function toggleSection(selector) {
  hideAllSections();
  document.querySelector(selector).classList.remove("no-show");
}

function renderData(response, targetOutputSelector) {
  const container = targetOutputSelector;
  container.innerHTML = "";

  response.data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    for (const key in item) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
      card.appendChild(p);
    }

    container.appendChild(card);
  });
}

async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      mode: "cors",
      cache: "default",
    });

    if (!response.ok) throw new Error("Erro na requisição");

    return await response.json();
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return { error: err.message };
  }
}

async function handleSubmitProductForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const product = {
    storeId: formData.get("storeId"),
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    promotionalPrice: formData.get("promotionalPrice") || "0",
  };

  const payload = {
    products: [product],
  };

  try {
    const createProductServiceIsAlive = await fetch(
      SERVICE_CREATE_PRODUCT_ISALIVE
    );
    const responseCreateProductIsAlive =
      await createProductServiceIsAlive.json();
    if (responseCreateProductIsAlive.status !== "ok") {
      return {
        message: "Serviço de criar produtos indisponível",
      };
    }
    const response = await fetch(SERVICE_CREATE_PRODUCT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Produto cadastrado com sucesso!");
      form.reset();
    } else {
      alert(`Erro: ${result.status || "Falha ao cadastrar produto."}`);
    }

    console.log("Resposta do servidor:", result);
  } catch (err) {
    console.error("Erro ao enviar produto:", err);
    alert("Erro inesperado. Tente novamente.");
  }
}

function handlePostProducts() {
  toggleSection(".post-products");
  const form = document.querySelector(".product-form");
  form.addEventListener("submit", handleSubmitProductForm);
}

async function handleGetProducts() {
  toggleSection(".get-products");

  const productServiceIsAlive = await fetch(SERVICE_PRODUCT_ISALIVE);
  const responseProductIsAlive = await productServiceIsAlive.json();

  if (responseProductIsAlive.status !== "ok") {
    return {
      message: "Serviço de buscar produtos indisponível",
    };
  }

  const response = await fetchData(SERVICE_PRODUCT);

  const resultContainer = document.querySelector(".get-products__result");
  renderData(response, resultContainer);
}

async function handleGetCustomers() {
  toggleSection(".get-customers");

  const customerServiceIsAlive = await fetch(SERVICE_CUSTOMER_ISALIVE_URL);
  const responseCustomerIsAlive = await customerServiceIsAlive.json();

  if (responseCustomerIsAlive.status !== "ok") {
    return {
      message: "Erro ao listar os clientes",
    };
  }

  const response = await fetchData(SERVICE_CUSTOMER_URL);
  const resultContainer = document.querySelector(".get-customers__result");
  renderData(response, resultContainer);
}

async function handleGetCart() {
  toggleSection(".get-carts");

  const cartServiceIsAlive = await fetch(SERVICE_CART_ISALIVE_URL);
  const responseCartIsAlive = await cartServiceIsAlive.json();

  if (responseCartIsAlive.status !== "ok") {
    return {
      message: "Erro ao listar os carrinhos",
    };
  }

  const response = await fetchData(`${SERVICE_CART_URL}?storeId=85274196310`);
  console.log("response", response);
  const resultContainer = document.querySelector(".get-carts__result");
  renderData(response, resultContainer);
}

function handleActions() {
  document.querySelectorAll(".menu-item").forEach((item) => {
    const action = item.dataset.action;

    switch (action) {
      case "post-product":
        item.addEventListener("click", handlePostProducts);
        break;
      case "get-products":
        item.addEventListener("click", handleGetProducts);
        break;
      case "get-customers":
        item.addEventListener("click", handleGetCustomers);
        break;
      case "get-carts":
        item.addEventListener("click", handleGetCart);
        break;
    }
  });
}

document.addEventListener("DOMContentLoaded", handleActions);
