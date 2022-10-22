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

window.onload = function () {
  showProduct();
};

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
      product.type
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
    <div class="card-title"><h3 >${currentPhone.name}</h3></div>
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


