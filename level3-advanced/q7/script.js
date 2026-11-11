const addButtons = document.querySelectorAll(".add-btn");
const cartItems = document.querySelector("#cartItems");
const totalElement = document.querySelector("#total");
const cartCount = document.querySelector("#cartCount");
const productCount = document.querySelector("#productCount");

// Product data
const products = [
  {id: 1, name: "Notebook", price: 100},
  {id: 2, name: "Pen", price: 20},
  {id: 3, name: "Backpack", price: 800},
];

// Empty cart
let cart = [];

// Add product to cart
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.id);

    // Find selected product
    const product = products.find((item) => {
      return item.id === productId;
    });

    // Check whether product already exists
    const existingItem = cart.find((item) => {
      return item.id === productId;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    displayCart();
  });
});

// Display cart
function displayCart() {
  cartItems.innerHTML = "";

  // Display each cart item
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    const details = document.createElement("span");

    details.textContent = `${item.name} - ₹${item.price} × ${item.quantity}`;

    // Increase quantity
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";

    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      displayCart();
    });

    // Decrease quantity
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";

    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter((cartItem) => {
          return cartItem.id !== item.id;
        });
      }

      displayCart();
    });

    // Remove product
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
      cart = cart.filter((cartItem) => {
        return cartItem.id !== item.id;
      });

      displayCart();
    });

    div.append(details, increaseBtn, decreaseBtn, removeBtn);

    cartItems.append(div);
  });

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalElement.textContent = `Total: ₹${total}`;

  // Calculate total item quantity
  const totalItems = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = totalItems;

  // Calculate different products count
  const differentProducts = cart.length;

  productCount.textContent = differentProducts;
}

// Display initial cart
displayCart();
