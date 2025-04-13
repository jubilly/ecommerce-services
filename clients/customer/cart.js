import { isAliveCreateCart, isAliveGetCustomer } from "./isAlive.js";

(function () {
  const BASE_URL = "http://localhost";

  const SERVICE_CREATE_CUSTOMER_URL = `${BASE_URL}:5004/customers`;
  const SERVICE_CART_URL = `${BASE_URL}:5006/cart`;

  const openBtn = document.querySelector(".open-cart-btn");
  const closeBtn = document.getElementById("closeDrawer");
  const drawer = document.getElementById("cartDrawer");
  const productsCart = document.getElementById("productsCart");
  const totalCart = document.querySelector("#totalCart");
  const form = document.querySelector("#customerForm");
  const cta__addToCart = document.querySelector(".cta__addToCart");

  form.addEventListener("submit", handleCreateCart);

  document.addEventListener("cart-updated", (event) => {
    const cart = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cart);
    loadCartItems(cartParsed);
    cta__addToCart.disabled = false;
  });

  openBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    const cart = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cart);
    loadCartItems(cartParsed);
  });

  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

  function loadCartItems(cart) {
    productsCart.innerHTML = "<h3>Produtos no Carrinho</h3>";

    if (!cart || cart.products.length === 0) {
      cta__addToCart.disabled = true;
      productsCart.innerHTML = "<h3>Carrinho vazio</h3>";
      totalCart.textContent = "Preço total 0,00";
      return;
    }

    cart.products.forEach((item) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
          <strong>${item.name}</strong><br>
          Quantidade: ${item.quantity}<br>
        `;
      productsCart.appendChild(div);
    });
    totalCart.textContent = `Preço total ${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cart.total)}`;
  }

  async function handleCreateCart(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const customerPayload = {
      storeId: data.storeId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
    };

    try {
      const isAlive = await isAliveGetCustomer();
      if (!isAlive) {
        return;
      }

      const createCustomer = await fetch(SERVICE_CREATE_CUSTOMER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerPayload),
      });

      const customer = await createCustomer.json();

      if (customer.status && customer.data) {
        const customerId = customer.data.id;
        const storeId = customer.data.storeId;

        const storagedCart = localStorage.getItem("cart");

        if (!storagedCart) {
          return {
            error: 404,
            message: "Carrinho vazio!",
          };
        }

        const parseStoragedCart = JSON.parse(storagedCart);
        const cartPayload = {
          storeId: storeId,
          customerId: customerId,
          total: parseStoragedCart.total,
          products: parseStoragedCart.products,
        };

        const isAlive = await isAliveCreateCart();
        if (!isAlive) {
          return;
        }

        const createCart = await fetch(SERVICE_CART_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartPayload),
        });
        const cart = await createCart.json();

        if (cart.status && cart.data) {
          alert("Pedido criado com sucesso");
          localStorage.setItem("cart", null);
          drawer.classList.remove("open");
        }
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error.message);
    }
  }
})();
