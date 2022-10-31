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
  var productCart;
  productList.forEach(function (element) {
    if (element.id == id) return (productCart = element);
  });

  // 6. 
  var cartItem = {
    product: {
      id: productCart.id,
      price: productCart.price,
      name: productCart.name,
    },
    quantity: 1,
  };

  checkCarts(cartItem);

  renderCart(carts);
  console.log(carts);
}

function checkCarts(cartItem) {
  // 7.check yes or no
  if (carts.length === 0) {
    console.log(1);
    return carts.push(cartItem);
  }

  carts.forEach(function (item) {
    if (item.product.id === cartItem.product.id) {
      console.log(2);
      return (item.quantity += 1);
    } else {
      console.log(3);
      return carts.push(cartItem);
    }
  });
  
}

function renderCart(data) {
  productHtml = "";
  data.forEach(function (currentProduct) {
    productHtml += `
    <div class="cartContent">
    <div class="cardProduct">${currentProduct.product.name}</div>
    <div class="cardPrice">${currentProduct.product.price}</div>
    <div class="quantity">${currentProduct.quantity}</div>
  </div>`;
  });

  document.querySelector(".addCart").innerHTML = productHtml;
}

window.onload = function () {
  showProduct();
  // console.log(document.querySelector("#purchase-addCart"));
  // document.querySelector("#purchase-addCart").addEventListener("click", addCart);
  document.getElementById("toggleCart").addEventListener("click", toggleCart);
};
