// Variables del carrousel
const imagenCarrousel = document.getElementById("imagenCarrousel");
const tituloCarrousel = document.getElementById("tituloCarrousel");
const textoCarrousel = document.getElementById("textoCarrousel");
const carrousel = document.querySelector(".carrousel");

// Funcion Carrousel

let contador = 0;

function cambiarContendio() {
  fetch('json/datosCarrousel.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    carrousel.classList.add("animate__fadeOutLeft");
    setTimeout(() => {
      contador++;
      if (contador >= data.length) {
        contador = 0;
      }
      imagenCarrousel.src = data[contador].imagen;
      imagenCarrousel.setAttribute("alt", data[contador].altImagen);
      tituloCarrousel.innerHTML = data[contador].titulo;
      textoCarrousel.innerHTML = data[contador].texto;
      carrousel.classList.remove("animate__fadeOutLeft");
      carrousel.classList.add("animate__fadeInRight");
      setTimeout(() => {
        carrousel.classList.remove("animate__fadeInRight");
      }, 1000)
    }, 500)
  })
  .catch(error => console.error(error));
}

// Funcion cambio marcas

function cambiarMarcas() {
  fetch('json/datosMarcasSecundarias.json')
  .then(response => response.json())
  .then(data => {
    const imagenesSecundarias = document.querySelectorAll('.marca-secundaria');
    const numerosAleatorios = [];
    let numeroAleatorio;
    for (let i = 0; i < imagenesSecundarias.length; i++) {
      do {
        numeroAleatorio = Math.floor(Math.random() * data.length);
      } while (numerosAleatorios.includes(numeroAleatorio));
      numerosAleatorios.push(numeroAleatorio);
      imagenesSecundarias[i].src = data[numeroAleatorio].url;
      imagenesSecundarias[i].setAttribute("alt", data[numeroAleatorio].alt);
      // console.log(numerosAleatorios);
    }
  })
  .catch(error => console.error(error));
}

// Funcion animacion Nosotros

function animacionNosotros(){
  const verificarVisibilidad = (entries) => {
    const entry = entries[0];
    console.log(entry.isIntersecting);
    if (entry.isIntersecting == true) {
      document.querySelector(".nosotros_left").classList.add("animate__slideInLeft");
      document.querySelector(".nosotros_right").classList.add("animate__slideInRight");
    } else {
      document.querySelector(".nosotros_left").classList.remove("animate__slideInLeft");
      document.querySelector(".nosotros_right").classList.remove("animate__slideInRight");
    }
  }
  const observer = new IntersectionObserver(verificarVisibilidad);
  const nosotros = document.querySelector(".nosotros");
  observer.observe(nosotros);
}

// Llamado funciones

setInterval(cambiarContendio, 8000);
setInterval(cambiarMarcas, 2000);
animacionNosotros();

