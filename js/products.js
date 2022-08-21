const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function colocarHTML(producto) {
  return ` 
    <div class="row shadow p-0 rounded overflow-hidden mb-3 bg-white  cursor-active">
        <div class="col-3 p-0">
            <img class="img-thumbnail" src='${producto.image}' alt="">
        </div>
    <div id=autosh class="col-9 d-flex flex-column justify-content-between">
        <div class="productoNpBody">
        <h4 class="mt-3 ">${producto.name} -<span class="moneda"> ${producto.currency}</span><span class="precio"> ${producto.cost}</span></h4>
        <p>${producto.description}</p>
        </div>
        <div class="productoFooter d-flex justify-content-between">
        <p class="text-muted">Cantidad vendidos: <span class="cant text-muted">${producto.soldCount}</span></p>
        
       </div>
     </div>
  </div>
            `;
}

document.addEventListener("DOMContentLoaded", async function () {
  const listado = document.querySelector(".product-list");

  const listaAutos = await getJSONData(URL);

  listaAutos.data.products.forEach((auto) => {
    listado.innerHTML += colocarHTML(auto);
  });
});

/*
<div class="row shadow p-0 rounded overflow-hidden mb-3 bg-white">
        <div class="col-3 p-0">
            <img class="img-fluid" src='${producto.image}' alt="">
        </div>
    <div class="col-9 d-flex flex-column justify-content-between">
    <div class="productoNpBody">
            <h3 class="mt-3">${producto.name}</h3>
            <p>${producto.description}</p>
        </div>
        <div class="productoFooter d-flex justify-content-between">
            <p>Cantidad vendidos: <span class="cant">${producto.soldCount}</span></p>
        <div class="precio">
            <span class="moneda">${producto.currency}</span>
            <span class="precio">${producto.cost}</span>
         </div>
       </div>
     </div>
  </div>*/
