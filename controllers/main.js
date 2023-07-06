getProducts();
function getProducts() {
  apiGetProducts()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Hiển thị sản phẩm
function display(products) {
  let html = products.reduce((result, value, index) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.image,
      value.type
    );

    return (
      result +
      `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="${product.image}" width="100px" height="100px" />
            </td>
            <td>${product.type}</td>
            <td>
                <button class="btn btn-primary" onclick="selectProduct('${
                  product.id
                }')">Xem</button>
                <button 
                    class="btn btn-danger" 
                    onclick="deleteProduct('${product.id}')"
                    >Xóa
                </button>
            </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

// Thêm sản phẩm
function createProduct() {
  //   let name = getElement("#tenSP").value;
  //   let price = +getElement("#giaSP").value;
  //   let image = getElement("#hinhSP").value;
  //   let type = getElement("#loaiSP").value;

  // DOM và khởi tạo Object product
  let product = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    image: getElement("#HinhSP").value,
    type: getElement("#loaiSP").value,
  };

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then(() => {
      // Sau khi thêm thành công, dữ liệu chỉ mới đc cập nhật ở phía server. Ta cần gọi lại hàm apiGetProducts để lấy đc danh sách những sản phẩm mới nhất (bao gồm sản phẩm mình mới thêm)
      return apiGetProducts();
    })
    .then((response) => {
      // response là kết quả promise của hàm apiGetProducts
      display(response.data);

      // Ẩn modal sau khi thêm sản phẩm
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

// Xóa sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      // Xóa thành công
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Xem sản phẩm
function selectProduct(productId) {
  // Hiển thị modal
  $("#myModal").modal("show");

  // Hiển thị title và footer của modal
  getElement(".modal-title").innerHTML = "Cập nhật Sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
    <button class="btn btn-success" onclick="updateProduct('${productId}')">Cập nhật</button>
  `;

  apiGetProductById(productId)
    .then((response) => {
      // Lấy thông tin sản phẩm thành công => Hiển thị dữ liệu lên form
      let product = response.data;
      getElement("#TenSP").value = product.name;
      getElement("#GiaSP").value = product.price;
      getElement("#HinhSP").value = product.image;
      getElement("#loaiSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Cập nhật sản phẩm
function updateProduct(productId) {
  // DOM và khởi tạo Object product
  let newProduct = {
    name: getElement("#TenSP").value,
    price: +getElement("#GiaSP").value,
    image: getElement("#HinhSP").value,
    type: getElement("#loaiSP").value,
  };

  apiUpdateProduct(productId, newProduct)
    .then(() => {
      return apiGetProducts();
    })
    .then((response) => {
      display(response.data);

      // Ẩn modal sau khi thêm sản phẩm
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

// ===== DOM ======
getElement("#btnThemSP").onclick = () => {
  getElement(".modal-title").innerHTML = "Thêm sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Hủy</button>
    <button class="btn btn-success" onclick="createProduct()">Thêm</button>
  `;
};

// ===== Utils =====
function getElement(selector) {
  return document.querySelector(selector);
}
