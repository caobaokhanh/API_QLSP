function apiGetProducts() {
  return axios({
    url: "https://64a6ad25096b3f0fcc8043ec.mockapi.io/products",
    method: "GET",
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64a6ad25096b3f0fcc8043ec.mockapi.io/products/${productId}`,
    method: "GET",
  });
}

// product = {name: "...", price: 1000, image: "...", type: "..."}
function apiCreateProduct(product) {
  return axios({
    url: "https://64a6ad25096b3f0fcc8043ec.mockapi.io/products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64a6ad25096b3f0fcc8043ec.mockapi.io/products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64a6ad25096b3f0fcc8043ec.mockapi.io/products/${productId}`,
    method: "DELETE",
  });
}
