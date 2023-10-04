const socketCliente = io();
socketCliente.on("productos", (products) => {
  console.log(products);
  updateProductList(products);
});

function updateProductList(products) {
  let div = document.getElementById("list-products");
  let productos = "";

  products.forEach((product) => {
    productos += `
        <article class="container">
      <div class="card">
        <div class="img">
          <img src="${product.thumbnail}" width="150" />
        </div>
        <div class="content">
          <h2>${product.title}</h2>
          <div>
            <h3>${product.description}</h3>
            <p> Stock: ${product.stock}</p>
          </div>
          <div>
            <h3>Price: ${product.price}</h3>
          </div>
        </div>
      </div>
    </article>`;
  });
  div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  socketCliente.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = parseInt(deleteidinput.value);
  socketCliente.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
});
socketCliente.on("productosupdated", (obj) => {
  updateProductList(obj);
});
