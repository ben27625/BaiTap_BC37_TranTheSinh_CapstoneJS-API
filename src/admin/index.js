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
      <button class="btn btn-primary "  onclick= "showFromUpdate(${currentPhone.id})" id="btnUpdate">Update</button>
      <button class="btn btn-warning ms-1" id="btnDelete" onclick="deleteProduct(${currentPhone.id})">Delete</button>
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
      url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products/" + id,
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
function showFromUpdate(id) {
  testArrow();

  axios({
    url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products/" + id,
    method: "GET",
  })
    .then(function (response) {
      console.log(response);

      let product = response.data;
      document.getElementById("form-name").value = product.name;
      document.getElementById("form-price").value = product.price;
      document.getElementById("form-screen").value = product.screen;
      document.getElementById("form-backCamera").value = product.backCamera;
      document.getElementById("form-frontCamera").value = product.frontCamera;
      document.getElementById("form-link").value = product.img;
      document.getElementById("form-desc").value = product.desc;
      document.getElementById("form-type").value = product.type;
      document.getElementById("form-id").value = product.id;

      document.getElementById("btnUpdateProduct").classList.remove("d-none");
      document.getElementById("btnCreateProduct").classList.add("d-none");
      document.getElementById("form-id").classList.remove("d-none");
      document.getElementById("form-id").disabled = true;
    })
    .catch(function (err) {
      console.log(err);
    });
}

// put update products
function updateProduct() {
  let isFormValid = validateForm();
  console.log("a");
  if (!isFormValid) return;
  let name = document.getElementById("form-name").value;
  let price = document.getElementById("form-price").value;
  let screen = document.getElementById("form-screen").value;
  let backCamera = document.getElementById("form-backCamera").value;
  let frontCamera = document.getElementById("form-frontCamera").value;
  let img = document.getElementById("form-link").value;
  let desc = document.getElementById("form-desc").value;
  let type = document.getElementById("form-type").value;
  let id = document.getElementById("form-id").value;
  console.log("a");

  let newProduct = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id
  );

  axios({
    url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products/" + id,
    method: "PUT",
    data: newProduct,
  })
    .then(function (res) {
      console.log(res);
      showProduct();
    })
    .catch(function (err) {
      console.log(err);
    });

  document.getElementById("btnReset").click();
}

// thêm sản phẩm

// toggle

const testArrow = () => {
  document.querySelector(".infoProduct").classList.toggle("d-none");
  document.querySelector(".fromCreate").classList.toggle("d-none");
  document.getElementById("form-id").classList.add("d-none");
};

function createProduct() {
  let isFormValid = validateForm();

  if (!isFormValid) return;
  // get data
  let name = document.getElementById("form-name").value;
  let price = document.getElementById("form-price").value;
  let screen = document.getElementById("form-screen").value;
  let backCamera = document.getElementById("form-backCamera").value;
  let frontCamera = document.getElementById("form-frontCamera").value;
  let img = document.getElementById("form-link").value;
  let desc = document.getElementById("form-desc").value;
  let type = document.getElementById("form-type").value;

  // id -be

  let newProduct = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  axios({
    url: "https://6336fc7565d1e8ef2677ae1c.mockapi.io/products",
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      console.log(res);
      showProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}

// validate

function validateForm() {
  // get data
  let name = document.getElementById("form-name").value;
  let price = document.getElementById("form-price").value;
  let screen = document.getElementById("form-screen").value;
  let backCamera = document.getElementById("form-backCamera").value;
  let frontCamera = document.getElementById("form-frontCamera").value;
  let img = document.getElementById("form-link").value;
  let desc = document.getElementById("form-desc").value;
  let type = document.getElementById("form-type").value;

  let isValid = true;

  isValid &= required(name, "notificationName");

  isValid &=
    required(price, "notificationPrice") &&
    checkPrice(price, "notificationPrice");

  isValid &= required(screen, "notificationScreen");
  isValid &= required(backCamera, "notificationBackCamera");
  isValid &= required(frontCamera, "notificationFrontCamera");
  isValid &= required(img, "notificationLink");
  isValid &= required(desc, "notificationDesc");
  isValid &= required(type, "notificationType");

  return isValid;
}

function required(val, spanId) {
  if (val.length === 0) {
    document.getElementById(spanId).innerHTML =
      "* Trường hợp không được để trống";

    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function checkPrice(price, spanId) {
  if (price < 1000) {
    document.getElementById(spanId).innerHTML =
      "* Price phải lớn hơn 1 triệu  .";

    return false;
  }

  return true;
}

// function

window.onload = function () {
  showProduct();
  document
    .querySelector(".btnCreateProduct")
    .addEventListener("click", createProduct);
};
