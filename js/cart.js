const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const Cart = document.querySelector('.cartt')
const Idprod = localStorage.getItem('ProductID')
const cart2 = document.querySelector('.cartt2')
const pagoportarj = document.getElementById('tarjcred')
const nmerotarj = document.getElementById('tarjnum')
const codigoseg = document.getElementById('segcod')
const fvencimiento= document.getElementById('vencimiento')
const transfbancaria = document.getElementById('transfbanc')
const numcuenta = document.getElementById('numcuenta')
const tarjdisable= document.querySelector('.tarjdisabled')
const transfdisable = document.getElementById('disablee')
const inputcompra = document.getElementById('Finalizarcompra')
const esquina = document.getElementById('esquina')
const calle = document.getElementById('calle')
const númerocasa = document.getElementById('num')
const formadepagos = document.getElementById('formadepago')
const error2 = document.querySelector('.error2')
const premiummradio = document.getElementById('premiummradio')
const standardradio =  document.getElementById('standardradio')
const expressradio =  document.getElementById('expressradio')
const error3 = document.querySelector('.error3')
const cerrarmodal = document.getElementById('cerrarpagos')

let productCost = 0;
let productCount = 0;
let Porcentaje = 0;
let DOLLAR_SYMBOL = "USD ";




//Función que se utiliza para actualizar los costos de publicación
function MostrarCostoTotal(){
    let  subtotal = document.getElementById('productCost')
    let precioenvio = document.getElementById('productenvio')
    let total = document.getElementById('totalCost')
  

    let subtotalamostrar = DOLLAR_SYMBOL+ productCost;
    let costoenvioamostrar = DOLLAR_SYMBOL + Math.round((Porcentaje * productCost))  ;
    let costototalamostrar= DOLLAR_SYMBOL + ((Math.round(productCost  * Porcentaje) + parseInt(productCost)));

    subtotal.innerHTML = subtotalamostrar;
    precioenvio.innerHTML = costoenvioamostrar;
    total.innerHTML = costototalamostrar;
}


function setError(elemento, mensaje) {
  const inputControl = elemento.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  elemento.classList.remove("is-valid");
  elemento.classList.add("is-invalid");
  errorDisplay.innerText = mensaje;
}
function setSuccess(elemento) {
  const inputControl = elemento.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  elemento.classList.remove("is-invalid");
  elemento.classList.add("is-valid");
  errorDisplay.innerText = "";
}


document.addEventListener('DOMContentLoaded', async function traerdata(){
  
  const cart = await getJSONData(URL)
  const cartdata = cart.data.articles[0];
  productCart(cartdata)
  const precio2 = cartdata.unitCost
  const cantidad2 = document.getElementById('prodcount');
  const costo2 = document.getElementById('sub');
  const error4 = document.querySelector('.error4')
  inputcompra.addEventListener("click", function () {
    validacion()
    
    
    if((calle.value !== "" &&  númerocasa.value !== "" && esquina.value !=="" && formadepagos.textContent !== "No ha seleccionado" && cantidad2.value !== "0" && codigoseg.disabled && nmerotarj.disabled && fvencimiento.disabled && numcuenta.value !=="") || (calle.value !== "" &&  númerocasa.value !== "" && esquina.value !=="" && formadepagos.textContent !== "No ha seleccionado" && cantidad2.value !== "0" && numcuenta.disabled && nmerotarj.value !=="" && codigoseg.value !=="" && fvencimiento.value !=="") ){
      swal(
        'Listo!',
        'Tu compra se realizó con éxito!',
        'success'
      )
    }
    if (!premiummradio.checked && !standardradio.checked && !expressradio.checked) {
      error3.innerHTML = "Debe seleccionar un tipo de envío"
    }
    if(cantidad2.value === "0" ){
      error4.innerHTML = "Ingrese una cantidad"
    } else{
      error4.innerHTML= ""
    }
    if(formadepagos.textContent === "No ha seleccionado"){
      error2.innerHTML = "Debe seleccionar una forma de pago"
    }
   
  })

  cantidad2.addEventListener('change', ()=>{
    costo2.innerHTML = precio2 * cantidad2.value
    localStorage.setItem('Cantidad', cantidad2.value)
    localStorage.setItem('Precio', precio2 * cantidad2.value)
    error4.innerHTML = ""
    productCost= costo2.textContent
    updateTotalCosts();
   
  })
  if(localStorage.getItem("productscart")!=undefined){

    let listprodcart =
    JSON.parse(window.localStorage.getItem("productscart"));
    console.log(listprodcart)
    for (let i = 0; i < listprodcart.length; i++){
      Cart.innerHTML += cargarProd(listprodcart[i])
    }
    
    for(let i= 0; i < listprodcart.length; i++){
    const precio = document.getElementsByClassName('precio')[i].value;
    const costo = document.getElementsByClassName('costito')[i];
    const cantidad = document.getElementsByClassName('prodcountt')[i];
    costo.innerHTML = precio * cantidad.value
    
    cantidad.addEventListener('change', () => {
      
      costo.innerHTML = precio * cantidad.value
      localStorage.setItem('Cantidad', cantidad.value)
    
    })
  }
  }
  productCost = costo2.textContent || localStorage.getItem('Precio');



 
document.getElementById('expressradio').addEventListener('change', function(){
  Porcentaje = 0.07
  MostrarCostoTotal();
error3.innerHTML = ""
})

document.getElementById("premiummradio").addEventListener("change", function(){
  Porcentaje = 0.15;
  MostrarCostoTotal();
  error3.innerHTML = ""
});
document.getElementById("standardradio").addEventListener("change", function(){
  Porcentaje = 0.05;
  MostrarCostoTotal();
  error3.innerHTML = ""
});

MostrarCostoTotal();

/*selecciona el pago por tarjeta y deja disabled la transferencia bancaria*/
pagoportarj.addEventListener('change', function(){
transfbancaria.disabled = true;
numcuenta.disabled = true;
formadepagos.innerHTML = "Tarjeta de Crédito"
error2.innerHTML = ""
})

/*selecciona el pago por transferencia bancaria y deja disabled el pago por tarjeta*/
transfbancaria.addEventListener('change', function(){
pagoportarj.disabled = true;
 nmerotarj.disabled = true;
 codigoseg.disabled = true;
 fvencimiento.disabled = true;
 formadepagos.innerHTML = "Transferencia bancaria"
  error2.innerHTML = ""
})

/*validación de los metodos de pago*/
cerrarmodal.addEventListener('click', function(){
if(!pagoportarj.checked && !transfbancaria.checked){
  
  
} else {
  if (nmerotarj.value === "" && nmerotarj.disabled) {
  
  }
  if (nmerotarj.value === "" && !nmerotarj.disabled) {
    setError(nmerotarj, "");
    error2.innerHTML="Debe ingresar los datos de la tarjeta"
    
  }  else if (nmerotarj.value.length > 1) {
    setSuccess(nmerotarj);
    nmerotarj.setCustomValidity("");
    error2.innerHTML=""
  }
  if (codigoseg.value === "" && codigoseg.disabled) {
    
  }
  if (codigoseg.value === "" && !codigoseg.disabled) {
    setError(codigoseg, "");
    error2.innerHTML="Debe ingresar los datos de la tarjeta"
    
  }  else if (codigoseg.value.length > 1) {
    setSuccess(codigoseg);
    codigoseg.setCustomValidity("");
    error2.innerHTML=""
  }
  
  
  if (fvencimiento.value === "" && fvencimiento.disabled) {
    
  }
  if (fvencimiento.value === "" && !fvencimiento.disabled) {
    setError(fvencimiento, "");
    error2.innerHTML="Debe ingresar los datos de la tarjeta"
    
  }  else if (fvencimiento.value.length > 1) {
    setSuccess(fvencimiento);
    fvencimiento.setCustomValidity("");
    error2.innerHTML=""
  }
  
  if(numcuenta.value === "" && numcuenta.disabled) {
    
  }
  
  if(numcuenta.value === "" && !numcuenta.disabled) {
    setError(numcuenta, "Ingresa el número");
    error2.innerHTML="Debe ingresar el número de cuenta"
    
  }  else if (numcuenta.value.length > 1) {
    setSuccess(numcuenta);
    numcuenta.setCustomValidity("");
    error2.innerHTML=""
  }

}

})


})



/*función para validar los datos de envío*/
 function validacion (){
  if (calle.value === "") {
    setError(calle, "Ingresa una calle");

    ;
  } else {
    setSuccess(calle);
    calle.setCustomValidity("");
  }
  if (númerocasa.value === "") {
    setError(númerocasa, "Ingresa un número");

    
  } else {
    setSuccess(númerocasa);
    númerocasa.setCustomValidity("");
  }
  
  if (esquina.value === "") {
    setError(esquina, "Ingresa una esquina");

    ;
  } else {
    setSuccess(esquina);
    esquina.setCustomValidity("");
  }
  
 }

function cargarProd(listprodcart){     
      return `<div class="row w-100 ">
     
      <div class="row">
        <div class="col">
          <img class="img-fluid img-thumbnail mb-3  " width="100px" height="60px" src="${listprodcart.imagen}"></img>
       
        </div>
        <div class="col mt-3 mb-2">
          ${listprodcart.producto}
        </div>
        
        <div class="col mt-3 mb-2 ms-3" >
          ${listprodcart.moneda}<span > <input class="precio"  style="width : 55px"  type="text" value="${listprodcart.precio}" disabled></span>
          
        </div>
        <div class="col mt-3 mb-2 ms-4">
        <input class="prodcountt"  type="number" min="1" max="100" value="${localStorage.getItem('Cantidad') || "0"}">
        </div>
        <div class="col mt-3 mb-2 fw-bold ">
        ${listprodcart.moneda}<span class="costito"> ${listprodcart.precio}</span>
        </div>
        
      </div>
      <hr>
      `
      
  }
  


function productCart(cartdata){
  
  Cart.innerHTML += `<div class="row w-100">
    <hr>
  <div class="row ">
    <div class="col">
      <img class="img-fluid img-thumbnail mb-3 " width="100px" height="60px" src="${cartdata.image}"></img>
   
    </div>
    <div class="col mt-3 mb-2">
      ${cartdata.name}
    </div>
    
    <div class="col mt-3 mb-2 ms-3" >
      ${cartdata.currency}<span> <input id="precio1"  style="width : 55px"  type="text" value="${cartdata.unitCost}" disabled></span>
      
    </div>
    <div class="col mt-3 mb-2 ms-4">
   
    <input id="prodcount" type="number" placeholder="0" min="1" max="100" value="${localStorage.getItem('Cantidad') || "0"}">
    <div class="error4 text-start"></div>
    </div>
    
    <div class="col mt-3 mb-2 fw-bold">
    ${cartdata.currency}<span id="sub">${localStorage.getItem('Precio') || "0"}</span>
    </div>
   
    </div>
    <hr>
  `
 
}


