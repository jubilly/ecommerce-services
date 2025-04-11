(function () {
  const BASE_URL = "http://localhost";

  const SERVICE_CUSTOMER_URL = `${BASE_URL}:5004/customers`;
  const SERVICE_CUSTOMER_ISALIVE_URL = `${BASE_URL}:5004/healthcheck`;
  const SERVICE_CART_URL = `${BASE_URL}:5006/cart`;
  const SERVICE_CART_ISALIVE_URL = `${BASE_URL}:5006/healthcheck`;

  const openBtn = document.querySelector(".open-cart-btn");
  const closeBtn = document.getElementById("closeDrawer");
  const drawer = document.getElementById("cartDrawer");
  const productsCart = document.getElementById("productsCart");
  const totalCart = document.querySelector("#totalCart");
  const form = document.querySelector("#customerForm");

  form.addEventListener("submit", handleCreateCart);

  document.addEventListener("cart-updated", (event) => {
    const cart = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cart);
    loadCartItems(cartParsed);
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
      const customerServiceIsAlive = await fetch(SERVICE_CUSTOMER_ISALIVE_URL);
      const responseCustomerIsAlive = await customerServiceIsAlive.json();

      if (responseCustomerIsAlive.status !== "ok") {
        return {
          message: "Serviço de criar customer indisponível",
        };
      }
      const createCustomer = await fetch(SERVICE_CUSTOMER_URL, {
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

        const cartServiceIsAlive = await fetch(SERVICE_CART_ISALIVE_URL);
        const responseCartIsAlive = await cartServiceIsAlive.json();

        if (responseCartIsAlive.status !== "ok") {
          return {
            message: "Serviço de criar carrinho indisponível",
          };
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
    } catch {
      return undefined;
    }
  }
})();
