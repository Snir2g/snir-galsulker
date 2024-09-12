class Toast {
  constructor(message) {
    this.message = message;
    this.toastElement = null;
    this.createToast();
  }

  createToast() {
    // Create the toast element using default Bootstrap classes
    this.toastElement = document.createElement("div");
    this.toastElement.className = "toast mb-0";
    this.toastElement.setAttribute("role", "alert");
    this.toastElement.setAttribute("aria-live", "assertive");
    this.toastElement.setAttribute("aria-atomic", "true");

    this.toastElement.innerHTML = `
          <div class="toast-body d-flex justify-content-between align-items-center">
              <div>${this.message}</div>
              <button type="button" class="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
      `;

    // Show the toast using Bootstrap's Toast API with a 3-second delay
    const bootstrapToast = new bootstrap.Toast(this.toastElement, {
      autohide: true,
      delay: 3000,
    });
    bootstrapToast.show();

    // Event listener to remove the toast after it's hidden
    this.toastElement.addEventListener("hidden.bs.toast", () => {
      this.remove(); // Remove the toast from the DOM
    });
  }

  remove() {
    if (this.toastElement && this.toastElement.parentElement) {
      this.toastElement.parentElement.removeChild(this.toastElement);
      this.toastElement = null; // Clear reference to the element
    }
  }
}

class ToastManager {
  static toastContainer = null;

  static initializeContainer() {
    if (!this.toastContainer) {
      this.toastContainer = document.createElement("div");
      this.toastContainer.className =
        "toast-container position-fixed bottom-0 end-0 p-3";
      this.toastContainer.style.zIndex = 1055;
      this.toastContainer.style.display = "flex";
      this.toastContainer.style.flexDirection = "column";
      this.toastContainer.style.gap = "0.5rem"; // Gap between toasts
      document.body.appendChild(this.toastContainer);
    }
  }

  static addToast(message) {
    this.initializeContainer();
    const newToast = new Toast(message);
    this.toastContainer.appendChild(newToast.toastElement);
  }
}

// Declaration
class Product {
  constructor(id, name, description, manufacturer, category, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.manufacturer = manufacturer;
    this.category = category;
    this.price = price;
  }

  static new(product) {
    return new Product(
      product.id,
      product.name,
      product.description,
      product.manufacturer,
      product.category,
      product.price
    );
  }
}

class orderdProduct extends Product {
  constructor(id, name, description, manufacturer, category, price, amount) {
    super(id, name, description, manufacturer, category, price);
    this.amount = amount;
  }

  static new(product, amount) {
    return new orderdProduct(
      product.id,
      product.name,
      product.description,
      product.manufacturer,
      product.category,
      product.price,
      amount
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      manufacturer: this.manufacturer,
      category: this.category,
      price: this.price,
      amount: this.amount,
    };
  }

  static fromLiteralObject(object) {
    return new orderdProduct(
      object.id,
      object.name,
      object.description,
      object.manufacturer,
      object.category,
      object.price,
      object.amount
    );
  }
  calcTotalPrice() {
    if (this.amount > 0) return this.price * this.amount;
    else return this.price;
  }
}

let categories = [];
let products = [
  new Product(
    "01",
    "50-inch TV",
    "50-inch TV by Samsung, FULL HD",
    "Samsung",
    "Televisions",
    1599
  ),
  new Product(
    "02",
    "500-liter Refrigerator",
    "500-liter refrigerator by LG",
    "LG",
    "Refrigerators",
    2999
  ),
  new Product(
    "03",
    "8 kg Washing Machine",
    "8 kg washing machine by Bosch",
    "Bosch",
    "Washing Machines",
    1999
  ),
  new Product(
    "04",
    "25-liter Microwave",
    "25-liter microwave with grill",
    "Sharp",
    "Microwaves",
    499
  ),
  new Product(
    "05",
    "15-inch Laptop",
    "15-inch laptop by Dell",
    "Dell",
    "Laptops",
    3499
  ),
  new Product(
    "06",
    "12 Place Settings Dishwasher",
    "Dishwasher with a capacity of 12 place settings",
    "Siemens",
    "Dishwashers",
    2499
  ),
  new Product(
    "07",
    "65-inch TV",
    "65-inch TV by Sony, 4K",
    "Sony",
    "Televisions",
    4999
  ),
  new Product(
    "08",
    "60 cm Oven",
    "60 cm oven with internal light and grill lamp",
    "Electrolux",
    "Ovens",
    1799
  ),
  new Product(
    "09",
    "Robot Vacuum Cleaner",
    "Robot vacuum cleaner with area analysis technology",
    "iRobot",
    "Vacuum Cleaners",
    1199
  ),
  new Product(
    "10",
    "128GB Mobile Phone",
    "Mobile phone with 128GB internal memory",
    "Apple",
    "Mobile Phones",
    3999
  ),
  new Product(
    "11",
    "75-inch TV",
    "75-inch TV by LG, OLED",
    "LG",
    "Televisions",
    7999
  ),
  new Product(
    "12",
    "Bluetooth Speaker",
    "Portable Bluetooth speaker with high-quality sound",
    "JBL",
    "Speakers",
    299
  ),
  new Product(
    "13",
    "Laser Printer",
    "Color laser printer for home and office",
    "HP",
    "Printers",
    699
  ),
  new Product(
    "14",
    "27-inch Monitor",
    "27-inch monitor with QHD resolution",
    "Samsung",
    "Monitors",
    1299
  ),
  new Product(
    "15",
    "DSLR Camera",
    "Professional DSLR camera with 24MP sensor",
    "Canon",
    "Cameras",
    3999
  ),
  new Product(
    "16",
    "Wireless Headphones",
    "Wireless headphones with noise cancellation",
    "Sony",
    "Headphones",
    899
  ),
  new Product(
    "17",
    "Kitchen Mixer",
    "Professional kitchen mixer with 5-liter bowl",
    "Kenwood",
    "Mixers",
    1499
  ),
  new Product(
    "18",
    "7 kg Dryer",
    "Dryer with a capacity of 7 kg",
    "AEG",
    "Dryers",
    1999
  ),
  new Product(
    "19",
    "10-inch Tablet",
    "10-inch tablet with 64GB internal memory",
    "Samsung",
    "Tablets",
    1599
  ),
  new Product(
    "20",
    "Automatic Coffee Machine",
    "Automatic coffee machine with coffee bean grinder",
    "DeLonghi",
    "Coffee Machines",
    2499
  ),
];

let cart = [];
let productsListContainerElement;
let cartTable;
let cartTbody;
let cartControlsElement;
let confirmModel;

function init() {
  cartLocalStorageJSON = localStorage.getItem("cart");

  if (cartLocalStorageJSON != null) {
    try {
      cart = JSON.parse(cartLocalStorageJSON);
      cart = cart.map((prod) => orderdProduct.fromLiteralObject(prod));
    } catch (e) {
      localStorage.setItem("cart", []);
      ToastManager.addToast("Error loading your cart, Your cart is now empty.");
    }
  }
  cartTable = document.getElementById("cart-table");
  cartTbody = document.getElementById("cart-tbody");
  cartControlsElement = document.getElementById("cart-controls");
  productsListContainerElement = document.getElementById(
    "products-list-container"
  );
  confirmModel = new bootstrap.Modal(
    document.getElementById("confirmModel"),
    {}
  );

  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);

    /* 
  <div class="col-sm-4 d-inline-flex flex-column justify-content-center">
    <div class="input-group input-group-sm">
      <input type="text" id="card-amount-input-${
      product.id
      }" class="form-control form-control-xs"/>
      <div class="btn-group-vertical btn-group-sm" role="group">
        <button
        onclick="adjustInputValue('card-amount-input-${product.id}', 1)"
        class="btn btn-primary btn-xs"
        >
          <img src="images/caret-up.svg" />
        </button>
        <button
        onclick="adjustInputValue('card-amount-input-${product.id}', -1)"
        class="btn btn-primary btn-xs"
        >
          <img src="images/caret-down.svg" />
        </button>
      </div>
    </div>
  </div> */
  });

  updateAllDisplays();
}

function addToCart(productId) {
  const product = products.find((prod) => prod.id === productId);
  let orderdProd;

  if (product) {
    const indexProd = cart.findIndex(
      (orderdProd) => orderdProd.id === productId
    );

    if (indexProd != -1) {
      tryUpdateAmountOf(productId, 1);
    } else {
      orderdProd = orderdProduct.new(product, 1);
      cart.push(orderdProd);

      ToastManager.addToast(orderdProd.name + " has been added to cart.");
    }

    updateAllDisplays();
  }
}

function formatNumber(number) {
  return number.toLocaleString("he-IL");
}

function tryUpdateAmountOf(productId, incrementBy) {
  const indexProd = cart.findIndex((prod) => prod.id === productId);
  let newAmount = 0;
  if (indexProd != -1) {
    newAmount = cart[indexProd].amount + incrementBy;
    if (newAmount > 0) {
      cart[indexProd].amount = newAmount;
      ToastManager.addToast(
        `${cart[indexProd].name} amount updated to ${newAmount}`
      );
      return 1;
    } else {
      return 0;
    }
  }
  return -1;
}

function updateAmountofOrderdProduct(productId, incrementBy) {
  const stateUpdate = tryUpdateAmountOf(productId, incrementBy);

  switch (stateUpdate) {
    case 0:
      askUserToPremmissionToRemoveFromCart(productId);
    case 1:
      updateAllDisplays();
    case -1:
  }
}

// TO-DO use in updateAllDisplays
function adjustInputValue(inputId, increment) {
  const inputElement = document.getElementById(inputId);
  let newValue;
  if (inputElement) {
    const currentValue = parseInt(inputElement.value, 10) || 0;
    newValue = currentValue + increment;
    inputElement.value = newValue >= 0 ? newValue : 0;
  }
}

function getOrderdProduntButtonsComponnetHTMLcode(orderdProduct) {
  return `
  <div class="col-sm-4 d-inline-flex flex-row justify-content-between" style="width:7rem">
    <div class="input-group input-group-sm">
      <input type="text" class="form-control form-control-xs" value="${orderdProduct.amount}"/>
      <div class="btn-group-vertical btn-group-sm" role="group">
        <button
        onclick="updateAmountofOrderdProduct('${orderdProduct.id}', 1)"
        class="btn btn-primary btn-xs"
        >
          <img src="images/caret-up.svg" />
        </button>
        <button
        onclick="updateAmountofOrderdProduct('${orderdProduct.id}', -1)"
        class="btn btn-primary btn-xs"
        >
          <img src="images/caret-down.svg" />
        </button>
      </div>
    </div>
    <button class="btn btn-sm btn-danger ms-1" onclick="askUserToPremmissionToRemoveFromCart('${orderdProduct.id}')"><i class="bi bi-trash"></i></button>
  </div>`;
}

function getProductLineToTable(orderdProduct) {
  return `
  <tr>
    <td>${orderdProduct.name}</td>
    <td>${orderdProduct.price}</td>
    <td class="d-none d-sm-table-cell">
      ${getOrderdProduntButtonsComponnetHTMLcode(orderdProduct)}
    </td>
    <td>${orderdProduct.calcTotalPrice()} ₪</td>
  </tr>
  <!-- For small devices, add buttons in a new row -->
  <tr class="d-sm-none table-borderless text-start borderless-top">
    <td class="borderless-top" colspan="4" style="width:100% ">
    Amount 
      ${getOrderdProduntButtonsComponnetHTMLcode(orderdProduct)}
    </td>
  </tr>
`;
}
/*
function getOrderdProductsTotalPriceSum() {
  return cart.reduce(
    (accumulator, product) => accumulator + product.price * product.amount,
    0
  );


}
*/
function askUserToPremmissionToRemoveFromCart(productId) {
  const indexProd = cart.findIndex((prod) => prod.id === productId);
  const prod = cart[indexProd];
  if (indexProd != -1) {
    const confirmModelLabel = document.getElementById("confirmModelLabel");
    const confrimRemove = document.getElementById("confrimRemove");
    confirmModelLabel.innerText =
      "Confirmation of deletion of an item from the cart";
    const confirmModelText = document.getElementById("confirmModelText");
    confirmModelText.innerText = `Are you sure you want to delete the item "${prod.name}" (Product code: ${prod.id}) from the cart?`;

    confrimRemove.onclick = function () {
      removeFromCart(productId);
    };
    confirmModel.show();
  }
}
function askUserToPremmissionToRemoveAllFromCart() {
  const confirmModelLabel = document.getElementById("confirmModelLabel");
  const confrimRemove = document.getElementById("confrimRemove");
  const confirmModelText = document.getElementById("confirmModelText");
  confirmModelLabel.innerText =
    "Confirmation of deletion of all prducts in your cart";
  confirmModelText.innerText = `Are you sure you want to delete all products from the cart?`;

  confrimRemove.onclick = function () {
    cart = [];
    updateAllDisplays();
  };
  confirmModel.show();
}

function removeFromCart(prodId) {
  const prodIndex = cart.findIndex((prod) => prod.id === prodId);
  const prodName = cart[prodIndex].name;
  if (prodIndex != -1) cart.splice(prodIndex, 1);

  updateAllDisplays();
  ToastManager.addToast(prodName + " has been removed form cart.");
}

function updateDisplayCartAmount() {
  document.getElementById("nav-display-cart-amount").innerText = cart.length;
}

function getProductItemButtonsComponnetHTMLcode(productId) {
  const indexProd = cart.findIndex((prod) => prod.id === productId);
  if (indexProd != -1) {
    return getOrderdProduntButtonsComponnetHTMLcode(cart[indexProd]);
  } else {
    return `<button class="btn btn-primary add-to-cart" onclick="addToCart('${productId}')">Add to cart <i class="bi bi-cart-plus"></i>
              </button>`;
  }
}

function updateAllDisplays() {
  //save cart on storgae
  localStorage.setItem("cart", JSON.stringify(cart));

  //update products in  products cards

  productsListContainerElement.innerHTML = "";
  products.forEach((product) => {
    cardHTML = `    
      <div class="col">
        <div class="card h-100">
          <img src="images/rect-img.svg" class="card-img-top" alt="${
            product.name
          }" />
          <div class="card-body">
          <h5 class="card-title" id="product-name">${product.name}</h5>
          <p class="card-text" id="description">
          ${product.description}
          longer.
          </p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
            <span class="text-light-emphasis">Price: </span><span class="text-success" id="price">${formatNumber(
              product.price
            )} ₪</span>
            </li class="list-group-item">
  
            <li class="list-group-item">
              <span class="text-light-emphasis">Product Category: </span><span class="text-primary">${
                product.category
              }</span>
            </li>
            <li class="list-group-item">
              <span class="text-light-emphasis">manufacturer: </span><span class="text-primary" id="manufacturer">${
                product.manufacturer
              }</span>
            </li>
          </ul>
          <div class="container">
          ${getProductItemButtonsComponnetHTMLcode(product.id)}
          </div>
        </div>
      </div>`;
    ///getProductItemButtonsComponnetHTMLcode(product);
    productsListContainerElement.insertAdjacentHTML("beforeend", cardHTML);
  });

  handleCartDisplay();

  updateDisplayCartAmount();
}

function handleCartDisplay() {
  let totalCartPrice = 0;
  cartTbody.innerHTML = "";

  if (cart.length > 0) {
    //
    cartTable.classList.remove("d-none");
    cartTable.classList.add("d-table");
    //update cart
    for (const orderdProd of cart) {
      cartTbody.insertAdjacentHTML(
        "beforeend",
        getProductLineToTable(orderdProd)
      );
      totalCartPrice += orderdProd.calcTotalPrice();
    }

    cartControlsElement.innerHTML = `
  <div class="d-flex justify-content-center">
    <button type="button" id="removeall-btn" class="btn btn-danger btn-lg" onclick="askUserToPremmissionToRemoveAllFromCart()">
    Empty cart
    </button>
    <button type="button" id="checkout-btn" class="btn btn-primary btn-lg ms-2">
      <div class="d-flex justify-content-between">
        <span>${totalCartPrice.toLocaleString("he-IL")} ₪</span>
        <span class="ms-2">Checkout <i class="bi-arrow-right ms-2"></i></span>
      </div>
    </button>
  </div>
  `;
  } else {
    cartControlsElement.innerHTML = `<h1 class="h-100 text-secondary text-center">Your cart is empty</h1>`;
    cartTable.classList.add("d-none");
    cartTable.classList.remove("d-table");
  }
}
