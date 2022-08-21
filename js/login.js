document.addEventListener('DOMContentLoaded', ()=> {
const boton = document.querySelector('#boton');

boton.addEventListener('click', (event) => {


const email = document.querySelector('#email');
const contraseña = document.querySelector('#pass');

if (contraseña.value == ''){alert('Ingrese su Contraseña')

}if (email.value == '')
{alert('Ingrese su Email') }

if(contraseña.value.length && email.value.length >=1){
    window.location.replace('home.html')
}

}) 
 })

