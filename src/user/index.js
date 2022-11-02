// 3. Show product
var productList = [];
function showProduct() {
  axios({
    url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products",
    method: "GET",
  })
    .then(function (res) {
      productList = mapData(res.data);
      renderProduct(productList);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function mapData(data) {
  var results = [];
  for (var i = 0; i < data.length; i++) {
    var product = data[i];

    var newProduct = new Product(
      product.name,
      product.price,
      product.screen,
      product.backCamera,
      product.frontCamera,
      product.img,
      product.desc,
      product.type,
      product.id
    );
    results.push(newProduct);
  }
  return results;
}

function renderProduct(data) {
  var cardHTML = "";
  for (var i = 0; i < data.length; i++) {
    var currentPhone = data[i];
    cardHTML += `  <div class="card">
    <div class="card-top"></i></div>
    <div class="card-img">
      <img
        src="${currentPhone.img}"
        class="img-fluid img-thumbnail rounded"
        alt=""
      />
    </div>
    <div class="card-title  "><h3 class= "text-center" >${currentPhone.name}</h3></div>
    <div class="card-desc">
      <p>
        ${currentPhone.screen} <br />
        ${currentPhone.backCamera}<br />
        ${currentPhone.frontCamera} <br />
        ${currentPhone.desc}
      </p>
    </div>
    <div class="purchase">
      <button class="purchase-buy btn btn-danger rounded-pill">
        Buy
      </button>
      <button class="purchase-add btn btn-danger rounded-pill ms-4" id="purchase-addCart" onclick="addCart(${currentPhone.id})">
        Add Cart
      </button>
    </div>
  </div>
    `;
  }
  document.querySelector(".product .cart").innerHTML = cardHTML;
}
// 4. button filter phone
function filterPhone() {
  var filterResults = [];
  var type = document.getElementById("valueFilter").value;

  for (let i = 0; i < productList.length; i++) {
    var typePhone = productList[i].type.toLowerCase();
    console.log(1);
    if (type === typePhone) {
      filterResults.push(productList[i]);
    }
  }

  renderProduct(filterResults);
}

// toggle cart
function toggleCart() {
  document.querySelector(".addCart").classList.toggle("d-none");
}

// 5. add cart items
var carts = [];
function addCart(id) {
  var productItem;
  productList.forEach(function (product) {
    if (product.id == id) return (productItem = product);
  });

  // 6.
  var cartItem = {
    product: {
      id: productItem.id,
      price: productItem.price,
      name: productItem.name,
    },
    quantity: 1,
  };

  checkCarts(cartItem);

  renderCart(carts);

  caclPrice();
  setCart();
}

function checkCarts(cartItem) {
  // 7.check yes or no

  let foundItem = carts.find((item) => {
    return item.product.id == cartItem.product.id;
  });

  console.log(foundItem);
  if (foundItem) {
    foundItem.quantity++;
  } else {
    carts.push(cartItem);
  }
}

// 8.
function renderCart(data) {
  productHtml = "";
  data.forEach(function (currentProduct) {
    productHtml += `
    <tr>
                  <td>${currentProduct.product.name}</td>
                  <td>
                    <span class="" id="quantityMinus" onclick="decrease(${currentProduct.product.id})">-</span>
                    <input type="number" value="${currentProduct.quantity}" id="quantityNumber">
                    <span  class="" id="quantityPlus" onclick="increase(${currentProduct.product.id})">+</span>
                  </td>
                  <td>${currentProduct.product.price}</td>
                  <td><button class="btn btn-danger" onclick="removeCart(${currentProduct.product.id})" >Remove</button></td>

                </tr>`;
  });

  document.querySelector("#cartItem").innerHTML = productHtml;
}

// 9 . increase , decrease

function increase(id) {
  let value = parseInt(document.getElementById("quantityNumber").value, 10);
  console.log(value);

  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById("quantityNumber").value = value;

  carts.forEach((element) => {
    if (element.product.id == id) {
      return element.quantity++;
    }
  });
  caclPrice();
  setCart();

  return renderCart(carts);
}

function decrease(id) {
  let value = parseInt(document.getElementById("quantityNumber").value);
  console.log(value);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementById("quantityNumber").value = value;

  carts.forEach((element) => {
    if (element.product.id == id) {
      return element.quantity--;
    }
  });
  caclPrice();
  setCart();

  return renderCart(carts);
}

//  10 cacl in carts
function caclPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;
  carts.forEach((item) => {
    totalQuantity += item.quantity;
    totalPrice += item.product.price * item.quantity;
  });

  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
}

// 11, Lưu carts localstorage
function setCart() {
  var cartJSON = JSON.stringify(carts);
  localStorage.setItem("SL", cartJSON);
}

function getCart() {
  let cartJSON = localStorage.getItem("SL");

  if (!cartJSON) return;

  carts = JSON.parse(cartJSON);
  renderCart(carts);
  caclPrice();
}

// function mapCart() {
//   let result = [];

// }

// 12 press check out , clear cart , set arr empty

function checkOut() {
  carts = [];
  renderCart(carts);
  caclPrice();
}

// 13 remove from cart
function removeCart(id) {
 let index =  carts.findIndex((item) => item.product.id == id );
console.log(index);

  carts.splice(index, 1);
  renderCart(carts);
  caclPrice();
  setCart();

}



window.onload = function () {
  showProduct();
  getCart();
  // console.log(document.querySelector("#purchase-addCart"));
  // document.querySelector("#purchase-addCart").addEventListener("click", addCart);
  document.getElementById("toggleCart").addEventListener("click", toggleCart);
  document.getElementById("btnCheckOut").addEventListener("click", checkOut);
}
