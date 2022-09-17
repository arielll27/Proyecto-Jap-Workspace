
const ORDER_ASC_BY_PRECIO = "123";
const ORDER_DESC_BY_PRECIO = "321";
const ORDER_BY_VENDIDOS_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minPrecio = undefined;
let maxPrecio = undefined;

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRECIO) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRECIO) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_VENDIDOS_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}

function setProductID(id) {
  localStorage.setItem("ProductID", id);
  window.location = "product-info.html"
}



function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let producto = currentCategoriesArray[i];

    if (
      (minPrecio == undefined ||
        (minPrecio != undefined &&
          parseInt(producto.cost) >= minPrecio)) &&
      (maxPrecio == undefined ||
        (maxPrecio != undefined && parseInt(producto.cost) <= maxPrecio))
    ) {
      htmlContentToAppend += `
  <div onclick="setProductID(${producto.id})" class=" card m-3 shadow p-2 rounded  mb-2  cursor-active productos" id="autosh" style="width: 30rem;">
        <img id=autosh class=" card-img-top" src='${producto.image}'>
  <div id=autosh class=" card-body ">
        <h4 class=" card-title mt-3 ">${producto.name} -<span class ="card-text moneda"> ${producto.currency}</span><span class ="card-text precio"> ${producto.cost}</span></h4>
        <p class ="card-text">${producto.description}</p>
        <p class ="card-text text-muted">Cantidad vendidos: <span class ="card-text cant text-muted">${producto.soldCount}</span></p>
      </div>
  </div>
            `;
    }
   
    document.querySelector(".product-list").innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  
  showProductsList();
}

function agregardescripcion(descripcion){
  return `<h1 class="fs-1 ">Productos</h1>
  <p class="lead">Verás aquí todos los productos de la categoría ${descripcion}</p>`;
}

document.addEventListener("DOMContentLoaded", function () {

let categori = localStorage.getItem("catID");
var URL = PRODUCTS_URL + categori + EXT_TYPE;

  getJSONData(URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data.products;
      showProductsList();
      
    }
    const descripción = document.querySelector('#descr')
    const descripcióncat = resultObj.data.catName
    descripción.innerHTML += agregardescripcion(descripcióncat);
  });

  
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_PRECIO);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_DESC_BY_PRECIO);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowCategories(ORDER_BY_VENDIDOS_COUNT);
  });

  document.getElementById("clearRangeFilterr").addEventListener("click", function () {
      document.getElementById("rangeFilterCountMinn").value = "";
      document.getElementById("rangeFilterCountMaxx").value = "";

      minPrecio = undefined;
      maxPrecio = undefined;

      showProductsList();
    });

  document.getElementById("rangeFilterCountt").addEventListener("click", function () {
      
      minPrecio = document.getElementById("rangeFilterCountMinn").value;
      maxPrecio = document.getElementById("rangeFilterCountMaxx").value;

      if (minPrecio != undefined && minPrecio != "" && parseInt(minPrecio) >= 0) {
        minPrecio = parseInt(minPrecio);
      } else {
        minPrecio = undefined;
      }

      if (maxPrecio != undefined && maxPrecio != "" && parseInt(maxPrecio) >= 0) {
        maxPrecio = parseInt(maxPrecio);
      } else {
        maxPrecio = undefined;
      }

      showProductsList();
    });
});

document.addEventListener("keyup", e=>{

  if (e.target.matches("#buscador")){

      if (e.key ==="Escape")e.target.value = ""

      document.querySelectorAll(".productos").forEach(producto =>{

          producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?producto.classList.remove("filtro")
            :producto.classList.add("filtro")
      })

  }


})