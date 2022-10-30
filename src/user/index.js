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

// findById
function findById(id) {}

// 5. add cart items
var carts = [];
function addCart(id) {
  // display quantity number
  console.log(productList);
  // var element = document.getElementById("quantityCart");
  // findById
  var product;
  productList.forEach(function (element) {
    if (element.id == id) return (product = element);
    // return console.log("err");
  });
  carts.push(product);
  console.log(carts);
  renderCart(carts);
}

function renderCart(data) {
  productHtml = "";
  data.forEach(function (currentProduct) {
    productHtml += `
    <div class="cartContent">
    <div class="cardProduct">Trần Thế Sinh</div>
    <div class="cardPrice">10000</div>
    <div class="quantity">1</div>
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
