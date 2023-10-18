if('serviceWorker' in navigator)
// navigator.serviceWorker.register('/sw.js');
navigator.serviceWorker.register('cine/sw.js');
const resultadoHTML= document.getElementById("resultado")
const imagenHTML = document.getElementById("imgPelicula")

const nombrePelicula = document.getElementById("pelicula");
const imagenPelicula = document.getElementById("imgPelicula");

nombrePelicula.addEventListener(
  "change",
  function (){
    switch (this.value) {
      case "peli1":
        imagenPelicula.src = "img/Taylor.jpg";
        break;
      case "peli2":
        imagenPelicula.src = "img/El exorcista.jpg";
        break;
      case "peli3":
        imagenPelicula.src = "img/Gran Turismo.jpg";
        break;
      case "peli4":
        imagenPelicula.src = "img/Por Siempre Te Amaré.jpg";
        break;
      case "peli5":
        imagenPelicula.src = "img/La Monja II.jpg";
        break;
      default:
        imagenPelicula.src = "img/cine.jpg";
        break;
    }
  },
  false
);

const form = document.getElementById("formulario"); 

// Agregar un evento de submit al formulario
form.addEventListener("submit", (event) => {
  // Prevenir el comportamiento por defecto del formulario
  event.preventDefault();

  // Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const pelicula = document.getElementById("pelicula").value;
  const imagenPelicula = document.getElementById("imgPelicula").src;
  const boletos = document.getElementById("boletos").value;
  const precio = 50;
  // Crear una nueva fila en la tabla
  const fila = tabla.insertRow();

  // Crear celdas para cada valor del formulario
  const celdaNombre = fila.insertCell();
  const celdaCorreo = fila.insertCell();
  const celdaPeliculas = fila.insertCell();
  const celdaImagenPelicula = fila.insertCell();
  const celdaBoletos = fila.insertCell();
  const celdaTotal = fila.insertCell();
  const celdaEliminarActulizar = fila.insertCell();
  // Asignar los valores del formulario a las celdas
  celdaNombre.innerHTML = nombre;
  celdaCorreo.innerHTML = correo;
  celdaPeliculas.innerHTML = pelicula;
  celdaImagenPelicula.innerHTML = `<img src="${imagenPelicula}" alt="Imagen Pelicula" class="imgTabla">`;
  celdaBoletos.innerHTML = boletos;
  const total = boletos * precio;
  celdaTotal.innerHTML = `$` + total;
  celdaEliminarActulizar.innerHTML = `<button type="button" class="boton1 editar">Editar</button>
  <button type="button" class="boton2 eliminar" >Eliminar</button>
`;
  // Limpiar el formulario
  form.reset();
  imagenHTML.setAttribute("src", "img/cine.jpg");
 

//   alert("Se ha registrado correctamente");
});

const tabla = document.getElementById("tabla"); 

// Escucha los clics en los botones de "Editar" y "Eliminar"
tabla.addEventListener("click", function (event) {
  if (event.target.classList.contains("editar")) {
    
       // Obtén la fila a editar
       const fila = event.target.closest("tr");
       console.log(fila)
       if (fila) {
         // Extrae los datos de la fila seleccionada para editar
         const nombre = fila.cells[0].textContent;
         const correo = fila.cells[1].textContent;
         const pelicula = fila.cells[2].textContent;
         const boletos = fila.cells[4].textContent;
  
         // Rellena el formulario con los datos de la fila
         document.getElementById("nombre").value = nombre;
         document.getElementById("correo").value = correo;
         document.getElementById("pelicula").value = pelicula;
         document.getElementById("boletos").value = boletos;
         



         imagenHTML.setAttribute("src", fila.children[3].children[0].getAttribute("src"))

         // Elimina la fila seleccionada
         fila.remove();
       }

  } else if (event.target.classList.contains("eliminar")) {
    // Código para eliminar la fila
    const rowIndex = event.target.parentElement.parentElement.rowIndex;
    tabla.deleteRow(rowIndex);
    imagenPelicula.src = "img/cine.jpg";
  }
});

