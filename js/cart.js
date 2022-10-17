const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const Cart = document.querySelector('.cartt')
const Idprod = localStorage.getItem('ProductID')
const cart2 = document.querySelector('.cartt2')

document.addEventListener('DOMContentLoaded', async function traerdata(){
  
  const cart = await getJSONData(URL)
  const cartdata = cart.data.articles[0];
  productCart(cartdata)
  const precio2 = cartdata.unitCost
  const cantidad2 = document.getElementById('prodcount');
  const costo2 = document.getElementById('sub');
  cantidad2.addEventListener('change', ()=>{
    costo2.innerHTML = precio2 * cantidad2.value
  })

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
  
  })
}

})


document.addEventListener('DOMContentLoaded', function(){
  
  
});


function cargarProd(listprodcart){     
      return `<div class="row w-100 ">
     
      <div class="row">
        <div class="col">
          <img class="img-fluid img-thumbnail mb-3 " width="100px" height="60px" src="${listprodcart.imagen}"></img>
       
        </div>
        <div class="col mt-3 mb-2">
          ${listprodcart.producto}
        </div>
        
        <div class="col mt-3 mb-2 ms-3" >
          ${listprodcart.moneda}<span > <input class="precio"  style="width : 55px"  type="text" value="${listprodcart.precio}" disabled></span>
          
        </div>
        <div class="col mt-3 mb-2 ms-4">
        <input class="prodcountt"  type="number" min="1" max="100" value="${listprodcart.cantidad}">
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
    <input id="prodcount" type="number" min="1" max="100" value="1">
    </div>
    <div class="col mt-3 mb-2 fw-bold">
    ${cartdata.currency}<span id="sub">${cartdata.unitCost}</span>
    </div>
    </div>
    <hr>
  `
 
}


