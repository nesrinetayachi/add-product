function signUp() {
  var firstName = document.getElementById("firstName").value;
  var checkLengthFirstName = verifLength(firstName, 3);
  if (!checkLengthFirstName) {
    document.getElementById("firstNameMsg").innerHTML =
      "First Name must have at least 3 characters";
  } else {
    document.getElementById("firstNameMsg").innerHTML = "";
  }
  var lastName = document.getElementById("lastName").value;
  var checkLengthLastName = verifLength(lastName, 3);
  if (!checkLengthLastName) {
    document.getElementById("lastNameMsg").innerHTML =
      "Last Name must have at least 3 characters";
  } else {
    document.getElementById("lastNameMsg").innerHTML = "";
  }
  var email = document.getElementById("email").value;
  var verifEmail = checkIfEmailExist(email);
  var password = document.getElementById("pwd").value;
  var checkPwd = verifLength(password, 8);
  if (!checkPwd) {
    document.getElementById("pwdMsg").innerHTML =
      "Password must have at least 8 characters";
  } else {
    document.getElementById("pwdMsg").innerHTML = "";
  }
  var confirmPassword = document.getElementById("confirmPwd").value;
  var checkPwdConfirmPwd = compare(password, confirmPassword);
  if (!checkPwdConfirmPwd) {
    document.getElementById("confirmPwdMsg").innerHTML =
      "Confirm Password does not much with password";
  } else {
    document.getElementById("confirmPwdMsg").innerHTML = "";
  }
  var telNbr = document.getElementById("tel").value;
  var checkIfNumber = verifNumber(telNbr);
  if (checkIfNumber) {
    document.getElementById("telMsg").innerHTML = "Tel number is not correct";
  } else {
    document.getElementById("telMsg").innerHTML = "";
  }

  var userType = document.getElementById("userType").value;
  var idU = localStorage.getItem("idU") || "1";

  // JSON Object
  var user = {
    id: Number(idU),
    fName: firstName,
    lName: lastName,
    email: email,
    pwd: password,
    confirmPwd: confirmPassword,
    tel: telNbr,
    userType: userType,
  };

  if (
    checkLengthFirstName &&
    checkLengthLastName &&
    checkPwdConfirmPwd &&
    !checkIfNumber &&
    checkPwd &&
    !verifEmail
  ) {
    var T = JSON.parse(localStorage.getItem("usersJ") || "[]");
    T.push(user);
    localStorage.setItem("usersJ", JSON.stringify(T));
    localStorage.setItem("idU", Number(idU) + 1);
  }
}

// Function declaration
function compare(ch1, ch2) {
  return ch1 == ch2;
}

function verifLength(ch, n) {
  return ch.length >= n;
}

function verifNumber(ch) {
  return isNaN(ch);
}

function addProduct() {
  var productName = document.getElementById("productName").value;
  var x = verifLength(productName, 5);
  if (!x) {
    document.getElementById("productNameMsg").innerHTML =
      "Product Name must have at least 5 caracters";
  } else {
    document.getElementById("productNameMsg").innerHTML = "";
  }
  var productCode = document.getElementById("productCode").value;

  var y = verifCode(productCode);
  if (!y) {
    document.getElementById("productCodeMsg").innerHTML =
      "Product code must start with #";
  } else {
    document.getElementById("productCodeMsg").innerHTML = "";
  }

  var price = document.getElementById("price").value;
  var z = verifNbr(price, 0);
  if (!z) {
    document.getElementById("priceMsg").innerHTML =
      "Product price should be positif";
  } else {
    document.getElementById("priceMsg").innerHTML = "";
  }
  var stock = document.getElementById("stock").value;
  var w = verifNbr(stock, 10);
  if (!w) {
    document.getElementById("stockMsg").innerHTML = "Stock should be > 10";
  } else {
    document.getElementById("stockMsg").innerHTML = "";
  }
  var category = document.getElementById("category").value;
  var idL = localStorage.getItem("idL") || "1";
  var product = {
    id: Number(idL),
    prName: productName,
    prCode: productCode,
    prPrice: price,
    prStock: stock,
    prCategory: category,
  };

  if (x && y && z && w) {
    var T = JSON.parse(localStorage.getItem("productsJ") || "[]");
    T.push(product);
    localStorage.setItem("productsJ", JSON.stringify(T));
    localStorage.setItem("idL", Number(idL) + 1);
  }
}

function verifNbr(x, n) {
  return x > n;
}

function verifCode(ch) {
  return ch[0] == "#";
}

function checkIfEmailExist(email) {
  var i = 0;
  var T = JSON.parse(localStorage.getItem("usersJ") || "[]");

  while (i < T.length && T[i].email != email) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return T[i].email == email;
  }
}

function login() {
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  var i = 0;
  var T = JSON.parse(localStorage.getItem("usersJ") || "[]");
  while (i < T.length && (T[i].email != email || T[i].pwd != pwd)) {
    i++;
  }
  if (i == T.length) {
    return null;
  } else {
    if (T[i].userType == "0") {
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
      location.replace("productList.html");
    } else {
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
      location.replace("allProducts.html");
    }
    return T[i];
  }
}

function displayProducts() {
  var T = JSON.parse(localStorage.getItem("productsJ") || "[]");
  var render = `
          <table class="table table-striped" id="myTable">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product Code</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Product Stock</th>
                    <th scope="col">Product Category</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>`;
  for (var i = 0; i < T.length; i++) {
    render += `
                <tr>
                    <th scope="row">${T[i].id}</th>
                    <td>${T[i].prCode}</td>
                    <td>${T[i].prName}</td>
                    <td>${T[i].prPrice}</td>
                    <td>${T[i].prStock}</td>
                    <td>${T[i].prCategory}</td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick='deleteProduct(${T[i].id})'>Delete</button>
                    <button type="button" class="btn btn-warning" onclick='editProduct(${T[i].id})'>Edit</button>
                    <button type="button" class="btn btn-info" onclick="displayProduct(${T[i].id})">Display</button>
                    </td>

                </tr>
    `;
  }

  render += `</tbody> </table>`;
  document.getElementById("productsTable").innerHTML = render;
}

function deleteProduct(id) {
  var T = JSON.parse(localStorage.getItem("productsJ") || "[]");
  var index = searchById(id, T);
  T.splice(index, 1);
  localStorage.setItem("productsJ", JSON.stringify(T));
  location.reload();
}

function searchById(id, T) {
  var index;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      index = i;
    }
  }
  return index;
}

function searchProductById(id) {
  var T = JSON.parse(localStorage.getItem("productsJ") || "[]");
  var product;
  for (var i = 0; i < T.length; i++) {
    if (T[i].id == id) {
      product = T[i];
    }
  }
  return product;
}

function editProduct(id) {
  var product = searchProductById(id);
  var render = `
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Product Name</label>
                <input type="text" class="form-control" id="productNameEdit" value=${product.prName} >
            </div>
            <div class="form-group col-md-6">
                <label>Product Price</label>
                <input type="text" class="form-control" id="productPriceEdit" value=${product.prPrice} >
            </div>
            <div class="form-group col-md-6">
                <label>Stock</label>
                <input type="number" class="form-control" id="productStockEdit" value=${product.prStock} >
            </div>
            <div class="center">
              <button type="submit" class="btn btn-primary" onclick="validateEdit(${product.id})" >Edit Product</button>
            </div>
        </div>
  
  `;
  document.getElementById("editProductDiv").innerHTML = render;
}

function validateEdit(id) {
  var product = searchProductById(id);
  var newName = document.getElementById("productNameEdit").value;
  var newPrice = document.getElementById("productPriceEdit").value;
  var newStock = document.getElementById("productStockEdit").value;

  var newPr = {
    id: product.id,
    prName: newName,
    prCode: product.prCode,
    prPrice: newPrice,
    prStock: newStock,
    prCategory: product.prCategory,
  };

  var allProducts = JSON.parse(localStorage.getItem("productsJ"));
  var index = searchById(id, allProducts);
  allProducts.splice(index, 1);
  allProducts.splice(index, 0, newPr);
  localStorage.setItem("productsJ", JSON.stringify(allProducts));
  location.reload();
}

function displayProduct(id) {
  var product = searchProductById(id);
  localStorage.setItem("searchedPr", JSON.stringify(product));
  location.replace("displayProduct.html");
}

function display() {
  var searchedPr = JSON.parse(localStorage.getItem("searchedPr"));
  document.getElementById("displayPrName").innerHTML = searchedPr.prName;
  document.getElementById("displayPrPrice").innerHTML = searchedPr.prPrice;
  document.getElementById("displayPrStock").innerHTML = searchedPr.prStock;
  document.getElementById("displayPrCategory").innerHTML =
    searchedPr.prCategory;
}

function displayAllProducts() {
  var T = JSON.parse(localStorage.getItem("productsJ") || "[]");
  var render = `<div class="row"> `;
  for (var i = 0; i < T.length; i++) {
    var pr = T[i];
    render += ` 
    <div class="col-3 card">
  <img src="images/panier.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${pr.prName}</h5>
    <p class="card-text">${pr.prPrice} TND</p>
    <p class="card-text">${pr.prStock} pieces</p>
    <button class="btn btn-primary" onclick="displayProduct(${pr.id})">View</button>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="displayModal(${pr.id})">
    Reserve
  </button>  </div>
</div>
   `;
  }
  render += `</div>`;
  document.getElementById("allProductsTable").innerHTML = render;
}

function displayUserParams() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  document.getElementById("navFirstName").innerHTML = connectedUser.fName;
  document.getElementById("navLastName").innerHTML = connectedUser.lName;
}

function displayModal(id) {
  var product = searchProductById(id);
  var render = `

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Command</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <label>Quantity</label>
      <input type="text" id="qtyToCmd" class='form-control'>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="validateCmd(${id})">Validate</button>
      </div>
    </div>
  </div>
</div>`;
  document.getElementById("modalId").innerHTML = render;
}

function validateCmd(id) {
  var idC = localStorage.getItem("idC") || "1";
  var qty = document.getElementById("qtyToCmd").value;
  var user = JSON.parse(localStorage.getItem("connectedUser"));
  var product = searchProductById(id);

  if (qty > product.prStock  || qty <= 0) {
    alert("Stock Indisponible");
  } else {
    var cmd = {
      id: Number(idC),
      qty: qty,
      price: product.prPrice,
      idProduct: product.id,
      idUser: user.id,
    };

    // MAJ product
    var newPr = {
      id: product.id,
      prName: product.prName,
      prCode: product.prCode,
      prPrice: product.prPrice,
      prStock: Number(product.prStock) - Number(qty),
      prCategory: product.prCategory,
    };
  
    var allProducts = JSON.parse(localStorage.getItem("productsJ"));
    var index = searchById(id, allProducts);
    allProducts.splice(index, 1);
    allProducts.splice(index, 0, newPr);
    localStorage.setItem("productsJ", JSON.stringify(allProducts));

    var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
    T.push(cmd);
    localStorage.setItem("myCommands", JSON.stringify(T));
    localStorage.setItem("idC", Number(idC) + 1);
    location.reload();

  }


}

function displayCommands(idUser) {
  var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
  var userCmd = Array();
  for (var i = 0; i < T.length; i++) {
    if (T[i].idUser == idUser)    {
      userCmd.push(T[i]);
    }
  }
  var render = `
          <table class="table table-striped" id="myCmdTable">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total price HT</th>
                    <th scope="col">Total Price TTC</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>`;
  for (var i = 0; i < userCmd.length; i++) {
    cmd = userCmd[i];
    render += `
                <tr>
                    <th scope="row">${cmd.id}</th>
                    <td>${searchProductById(cmd.idProduct).prName}</td>
                    <td>${cmd.qty}</td>
                    <td>${cmd.price}</td>
                    <td>${Number(cmd.price) * Number(cmd.qty)} </td>
                    <td>${Number(cmd.price) * Number(cmd.qty) * 1.19}</td>
                    <td>
                    <button type="button" class="btn btn-danger" onclick='deleteCmd(${cmd.id})'>Delete</button>
                    </td>

                </tr>
    `;
  }

  render += `</tbody> </table>`;
  document.getElementById("commandsTable").innerHTML = render;
}

function deleteCmd(id) {
  var T = JSON.parse(localStorage.getItem("myCommands") || "[]");
  var index = searchById(id, T);
  T.splice(index, 1);
  localStorage.setItem("myCommands", JSON.stringify(T));
  location.reload();
}