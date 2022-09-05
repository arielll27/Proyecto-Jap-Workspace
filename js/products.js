
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

function showCategoriesList() {
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

  
  showCategoriesList();
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
      showCategoriesList();
      
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

      showCategoriesList();
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

      showCategoriesList();
    });
});
