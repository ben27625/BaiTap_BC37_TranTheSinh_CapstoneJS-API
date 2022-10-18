// 3. Show product
var productList = [];
function showProduct() {
  axios({
    url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products",
    method: "GET",
  })
    .then(function (res) {
      productList = mapData(res.data);
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
    <div class="card-top"><i class="fa-solid fa-mobile"></i></div>
    <div class="card-img">
      <img
        src="${currentPhone.img.src}"
        class="img-fluid"
        alt=""
      />
    </div>
    <div class="card-title"><h2>${currentPhone.name}</h2></div>
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
}
