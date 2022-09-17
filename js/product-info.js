const puntuacion = document.querySelector("#inputState");
const elusuario = localStorage.getItem("User");
const inputcomentario = document.querySelector("#tucomentario");
const fecha = new Date();
const hoy = fecha.toLocaleString();
const Comments = document.querySelector(".comentarios");
const botonenviar = document.querySelector("#enviar");

/* Función que inyecta el contenido del producto*/
function ColocarProducto(producto) {
  return `
  <div class="row  p-0 rounded overflow-hidden mb-3 bg-light ">
  
  <h2 class="mb-5 mt-4 fw-bold text-center producto-name ">${producto.name}</h2>
  <hr>
<div  class="col-3">
<div class="productoBody text-center">
  
<h6 class="fw-bold mt-5">Precio</h6>
<p class="mt-3 "><span class="moneda">${producto.currency}</span><span class="precio"> ${producto.cost}</span></p><hr>
<h6 class="fw-bold mt-4">Descripción</h6>
<p class="mt-3">${producto.description}</p><hr>
<h6 class="fw-bold mt-4 ">Categoría</h6>
<p class"mt-3">${producto.category}</p><hr>
<h6 class="fw-bold mt-4">Cantidad vendidos</h6> 
<p>${producto.soldCount}</p>
</div>
<div>

</div>
</div>
<div class="col  mb-1 bg-light ">
            <div id="carouselExampleDark" class="carousel carousel-dark slide shadow rounded" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner mt-5">
                  <div class="carousel-item active" data-bs-interval="3000">
                    <img src="${producto.images[0]}" class="d-block w-95 shadow rounded" >
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="${producto.images[1]}" class="d-block w-95" >
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                  <div class="carousel-item"  data-bs-interval="3000">
                    <img src="${producto.images[2]}" class="d-block w-95" >
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="${producto.images[3]}" class="d-block w-95" >
                    <div class="carousel-caption d-none d-md-block">
                      
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Siguiente</span>
                </button>
              </div>
          </div>  
         <div class="col"></div>
        </div>
</div> 
<section class="imagenes ">
      
      <section class="mb-5 mt-5">
        <div class="row">
        
          <div class="col-lg-3 col-md-8 mb-4 mb-lg-0">
            <div
              class="img-fluid img-thumbnail shadow rounded" id="img-products">
              <img src="${producto.images[0]}" class="w-100 "/>
             
            </div>
          </div>
            <div class="col-lg-3 mb-4 mb-lg-0">
            <div
              class="img-fluid img-thumbnail shadow rounded " id="img-products">
              <img src="${producto.images[1]}"class="w-100"/>
              
            </div>
          </div>
    
          <div class="col-lg-3 mb-4 mb-lg-0">
            <div class="img-fluid img-thumbnail shadow rounded" id="img-products">
              <img src="${producto.images[2]}" class="w-100"/>
              
            </div>
          </div>
          <div class="col-lg-3 mb-4 mb-lg-0">
            <div class="img-fluid img-thumbnail shadow rounded" id="img-products">
              <img src="${producto.images[3]}" class="w-100"/>
              
            </div>
          </div>
        </div>
      </section>
   </section>

`;
}

/* Función que inyecta los comentarios proporcionados por la URL*/
function Colocarcomentario(comentario) {
  return `
  
  <div class="comentario">
  <li class="mt-3 list-group-item list-group-item-light"> <strong>${comentario.user}</strong>  - <span >${comentario.dateTime}</span> - <span class="fa fa-star checked">${comentario.score}</span><hr><p class=" list-group-item-light">${comentario.description}</p></li>
  
  </div>
  
  `;
}

document.addEventListener("DOMContentLoaded", async function () {
  const Productocont = document.querySelector("#product-descr");
  let productoID = localStorage.getItem("ProductID");
  const URLproductos = PRODUCT_INFO_URL + productoID + EXT_TYPE;
  const URLcomentarios = PRODUCT_INFO_COMMENTS_URL + productoID + EXT_TYPE;

  /*Se Colocan los productos desde la URL*/
  const productodatos = await getJSONData(URLproductos);
  Productocont.innerHTML = ColocarProducto(productodatos.data);

  /*Se colocan los comentarios desde la URL*/
  const comentarios = await getJSONData(URLcomentarios);
  comentarios.data.forEach((coment) => {
    Comments.innerHTML += Colocarcomentario(coment);
  });

  /* Con la escucha click al botonenviar publica el nuevo comentario y lo guarda en localStorage*/
  botonenviar.addEventListener("click", function () {
    Comments.innerHTML += enviarComentario();

    var nuevocomentario = {
      usuario: elusuario,
      fecha: hoy,
      puntuacion: puntuacion.value,
      descripcion: inputcomentario.value,
      identificador: productoID,
    };

    let listcomentarios =
      JSON.parse(window.localStorage.getItem("coments")) || [];
    listcomentarios.push(nuevocomentario);

    window.localStorage.setItem("coments", JSON.stringify(listcomentarios));
  });

  CargarComentario();
});

/* Función que carga desde localStorage los comentarios realizados por el usuario para cada producto*/
function CargarComentario() {
  let listcomentarioscargados =
    JSON.parse(window.localStorage.getItem("coments")) || [];
  let comentariosfiltrados = listcomentarioscargados.filter(
    (comentario) =>
      comentario.identificador === localStorage.getItem("ProductID")
  );

  for (let comentario of comentariosfiltrados) {
    Comments.innerHTML += `
        
        <div>
        <li class="mt-3 list-group-item list-group-item-light"> <strong>${comentario.usuario}</strong>  - <span >${comentario.fecha}</span> - <span class="fa fa-star checked">${comentario.puntuacion}</span></li>
        <li class=" list-group-item list-group-item-light">${comentario.descripcion}</li> 
        </div>
        
        `;
  }
}

/*Función que envia un nuevo comentario*/
function enviarComentario() {
  return `
  
  <div class="comentario">
  <li class="mt-3 list-group-item list-group-item-light"> <strong>${elusuario}</strong>  - <span >${hoy}</span> - <span class="fa fa-star checked">${puntuacion.value}</span></li>
  <li class=" list-group-item list-group-item-light">${inputcomentario.value}</li>
  
  </div>
  
  `;
}
