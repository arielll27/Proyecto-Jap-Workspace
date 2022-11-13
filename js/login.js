document.addEventListener("DOMContentLoaded", () => {
  const btnIngresar = document.querySelector("#boton");


  
  btnIngresar.addEventListener("click", (event) => {
    const email = document.querySelector("#email");
    const contraseña = document.querySelector("#pass");
    localStorage.setItem("User", email.value);

    if (contraseña.value == "") {
      contraseña.classList.add('is-invalid')
    } else{
      contraseña.classList.remove('is-invalid')
      contraseña.classList.add('is-valid')
    }
    if (email.value == "") {
      email.classList.add('is-invalid')
    } else{
      email.classList.remove('is-invalid')
      email.classList.add('is-valid')
    }

    if (contraseña.value.length && email.value.length >= 1) {
      window.location.replace("home.html");
    }
  });
});
