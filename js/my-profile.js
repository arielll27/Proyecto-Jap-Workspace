const primernombre = document.getElementById('primernombre')
const segundonombre =document.getElementById('segundonombre')
const primerapellido =document.getElementById('primerapellido')
const segundoapellido =document.getElementById('segundoapellido')
const email =document.getElementById('emailcontacto')

const telcontacto = document.getElementById('telcontacto')
const user = localStorage.getItem('User')
const bntGuardar = document.getElementById('btnGuardar')
const cambiarimg = document.getElementById('cambiarimg')
const ImgPerfil = document.getElementById('imgperfil')

console.log(ImgPerfil.src)

document.addEventListener('DOMContentLoaded', function(){
email.value = user;




bntGuardar.addEventListener('click', function(){
    
    if(primernombre.value ===""){
        primernombre.classList.add("is-invalid")

    }else{
        primernombre.classList.remove("is-invalid")
        primernombre.classList.add("is-valid")
    }
    if(primerapellido.value ===""){
        primerapellido.classList.add("is-invalid")

    }else{
        primerapellido.classList.remove("is-invalid")
        primerapellido.classList.add("is-valid")
    }
    if(telcontacto.value ===""){
        telcontacto.classList.add("is-invalid")

    }else{
        telcontacto.classList.remove("is-invalid")
        telcontacto.classList.add("is-valid")
    }

    if(primernombre.value !=="" && primerapellido.value !=="" && telcontacto.value !==""){

        var datosusuario = {
            usuario: user,
            primernombre: primernombre.value,
            segundonombre: segundonombre.value,
            primerapellido: primerapellido.value,
            segundoapellido: segundoapellido.value,
            Email: email.value,
            teléfono: telcontacto.value,
          };
        
        let listadedatos =
        JSON.parse(window.localStorage.getItem("DatosUsuario")) || [] ;
        listadedatos.push(datosusuario);
          window.localStorage.setItem("DatosUsuario", JSON.stringify(listadedatos));
        
    }
   
      
    
})
CargarDatos()
})

    function CargarDatos (){
        
        let datoscargados = JSON.parse(window.localStorage.getItem("DatosUsuario")) ;
            for (let dato of datoscargados) {
                if(user === dato.usuario){
            primernombre.value = dato.primernombre
            segundonombre.value = dato.segundonombre
            primerapellido.value = dato.primerapellido
            segundoapellido.value = dato.segundoapellido
            email.value = dato.Email
            telcontacto.value = dato.teléfono
             }
         }
    }







   

