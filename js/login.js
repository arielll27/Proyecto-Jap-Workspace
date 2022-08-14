document.addEventListener('DOMContentLoaded', ()=> {
const boton = document.querySelector('#boton');

boton.addEventListener('click', (event) => {


const email = document.querySelector('#form3Example3');
const contraseña = document.querySelector('#form3Example4');

if (contraseña.value == ''){alert('Ingrese su Contraseña')

}if (email.value == '')
{alert('Ingrese su Email') }

if(contraseña.value.length && email.value.length >=1){
    window.location.replace('home.html')
}

}) 
 })

