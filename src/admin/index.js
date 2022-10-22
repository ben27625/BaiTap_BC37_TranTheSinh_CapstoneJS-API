// hiện sản phẩm

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
      i + 1
    );
    results.push(newProduct);
  }
  return results;
}

function renderProduct(data) {
  var cardHTML = "";

  for (var i = 0; i < data.length; i++) {
    var currentPhone = data[i];

    cardHTML += `  <tr>
    <th scope="row" id="productid${currentPhone.id}">${currentPhone.id}</th>
   
    <td >${currentPhone.price}</td>
    <td>${currentPhone.screen}</td>
    <td>${currentPhone.backCamera}</td>
    <td>${currentPhone.frontCamera}</td>
    <td>${currentPhone.img}</td>
    <td>${currentPhone.desc}</td>
    <td>${currentPhone.type}</td>
    <td class="d-flex">
      <button class="btn btn-primary me-1 onclick="" id="btnUpdate">Update</button>
      <button class="btn btn-warning" id="btnDelete" onclick=" deleteProduct(${currentPhone.id})">Delete</button>
    </td>
  </tr>
    `;
  }
  document.querySelector("#renderProduct").innerHTML = cardHTML;
}

// xóa sản phẩm

async function deleteProduct(id) {
  try {
    var res = await axios({
      url: 
      "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products/" + id,
      method: "DELETE",
    });
    console.log(res);
    showProduct();
  } catch (err) {
    console.log(err);
  }
}

function findById(id) {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      return i;
    }

    return -1;
  }
}



// cập nhật product
function showFromUpdate() {

}

function updateProduct() {

}

// thêm sản phẩm

function createProduct() {
    document.querySelector(".infoProduct").classList.add("d-none");
    document.querySelector(".fromCreate").classList.remove("d-none");
}

// validate 

function validateForm() {
    
}


window.onload = function () {
  showProduct();
  document.querySelector(".btnCreateProduct").addEventListener("click",createProduct);
};
