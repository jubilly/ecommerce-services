import {
  isAliveCreateProduct,
  isAliveGetCart,
  isAliveGetCustomer,
  isAliveGetProduct,
} from "./isAlive.js";

const BASE_URL = "http://localhost";

const SERVICE_PRODUCT = `${BASE_URL}:5001/products`;
const SERVICE_CREATE_PRODUCT = `${BASE_URL}:5002/products`;
const SERVICE_CUSTOMER_URL = `${BASE_URL}:5003/customers`;
const SERVICE_CART_URL = `${BASE_URL}:5005/cart`;

function hideAllSections() {
  document.querySelectorAll(".panel").forEach((section) => {
    section.classList.add("no-show");
  });
}

function toggleSection(selector) {
  hideAllSections();
  document.querySelector(selector).classList.remove("no-show");
}

function formatJson(value = "") {
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch (error) {
    parsed = value;
  }
  const pretty = JSON.stringify(parsed, null, 4);

  return pretty === "" || pretty === "{}" ? "N/A" : pretty;
}

function renderData(response, targetOutputSelector) {
  const container = targetOutputSelector;
  container.innerHTML = "";

  response.data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    for (const key in item) {
      const field = document.createElement("div");
      field.className = "field";

      if (typeof item[key] === "object") {
        field.innerHTML = `<strong>${key}:</strong> <pre>${formatJson(
          item[key]
        )}</pre>`;
      } else {
        field.innerHTML = `<strong>${key}:</strong> <span>${item[key]}</span>`;
      }
      card.appendChild(field);
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
    const isAlive = await isAliveCreateProduct();
    if (!isAlive) {
      return;
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

  const isAlive = await isAliveGetProduct();
  if (!isAlive) {
    return;
  }

  const response = await fetchData(SERVICE_PRODUCT);

  const resultContainer = document.querySelector(".get-products__result");
  renderData(response, resultContainer);
}

async function handleGetCustomers() {
  toggleSection(".get-customers");

  const isAlive = await isAliveGetCustomer();
  if (!isAlive) {
    return;
  }

  const response = await fetchData(SERVICE_CUSTOMER_URL);
  const resultContainer = document.querySelector(".get-customers__result");
  renderData(response, resultContainer);
}

async function handleGetCart() {
  toggleSection(".get-carts");

  const isAlive = await isAliveGetCart();
  if (!isAlive) {
    return;
  }

  const response = await fetchData(`${SERVICE_CART_URL}?storeId=85274196310`);
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
