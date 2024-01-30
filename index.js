const apiP = "https://potterapi-fedeperin.vercel.app/es/characters";
const contenedorPersonajes = document.getElementById('contenedorPersonajes');
const listaPersonajes=[];
let btnPersonajes = document.getElementById('btnPersonajes');
btnPersonajes.addEventListener("click", clickPersonajes);

function clickPersonajes() {
    if(listaPersonajes.length ===0){
    fetch(apiP)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos);
            mostrarPersonajes(datos);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
    }
};
function mostrarPersonajes(datos) {
    datos.forEach(personaje => {
        const tarjetaPersonaje = document.createElement("div")
        tarjetaPersonaje.innerHTML = `
        <div class="card text-center mb-3" style="width: 20rem;">
        <img src="${personaje.image}" class="card-img-top" alt="${personaje.fullName}">
        <div class="card-body">
          <h5 class="card-title">${personaje.fullName}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-light">Casa: ${personaje.hogwartsHouse}</li>
          <li class="list-group-item list-group-item-light">Cumpleaños: ${personaje.birthdate}</li>
          <li class="list-group-item list-group-item-light">Interpretado por: ${personaje.interpretedBy} </li>
        </ul>
        <div class="card-body">
        <a href="#" class="btn btn-dark">Añadir a favoritos</a>
        </div>
      </div>
            `;
        contenedorPersonajes.appendChild(tarjetaPersonaje);
        listaPersonajes.push(personaje);
    });
}

const apiL = "https://potterapi-fedeperin.vercel.app/es/books";
const contenedorLibros = document.getElementById('contenedorLibros');
const listaLibros=[];
let btnLibros = document.getElementById('btnLibros');
btnLibros.addEventListener("click", clickLibros);

function clickLibros() {
    if(listaLibros.length ===0){
    fetch(apiL)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos);
            mostrarLibros(datos);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
    }
};
function mostrarLibros(datos) {
    datos.forEach(libro => {
        const tarjetaLibro = document.createElement("div")
        tarjetaLibro.innerHTML = `
        <div class="card text-center mb-3" style="width: 20rem;">
        <img src="${libro.cover}" class="card-img-top" alt="${libro.title}">
        <div class="card-body">
          <h5 class="card-title">${libro.title}</h5>
          <p class="card-text">${libro.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-light">Fecha de publicación: ${libro.releaseDate}</li>
          <li class="list-group-item list-group-item-light">Páginas: ${libro.pages}</li>
        </ul>
        <div class="card-body">
        <a href="#" class="btn btn-dark">Añadir a favoritos</a>
        </div>
      </div>
            `;
        contenedorLibros.appendChild(tarjetaLibro);
        listaLibros.push(libro);
    });
}

const apiC = "https://potterapi-fedeperin.vercel.app/es/houses";
const contenedorCasas = document.getElementById('contenedorCasas');
const listaCasas=[];
let btnCasas = document.getElementById('btnCasas');
btnCasas.addEventListener("click", clickCasas);

function clickCasas() {
    if(listaCasas.length ===0){
    fetch(apiC)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos);
            mostrarCasas(datos);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
    }
};
function mostrarCasas(datos) {
    datos.forEach(casa => {
        const tarjetaCasa = document.createElement("div")
        tarjetaCasa.innerHTML = `
        <div class="card text-center mb-3" style="width: 20rem;">
        <img src="img/${casa.house}.jpg" class="card-img-top" alt="${casa.house}">
        <div class="card-body">
          <h5 class="card-title">${casa.house}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item list-group-item-light">Emoji: ${casa.emoji}</li>
          <li class="list-group-item list-group-item-light">Fundador: ${casa.founder}</li>
          <li class="list-group-item list-group-item-light">Animal: ${casa.animal} </li>
        </ul>
        <div class="card-body">
        <a href="#" class="btn btn-dark">Añadir a favoritos</a>
        </div>
      </div>
            `;
        contenedorCasas.appendChild(tarjetaCasa);
        listaCasas.push(casa);
    });
}
const apiH = "https://potterapi-fedeperin.vercel.app/es/spells";
const contenedorHechizos = document.getElementById('contenedorHechizos');
const listaHechizos=[];
let btnHechizos = document.getElementById('btnHechizos');
btnHechizos.addEventListener("click", clickHechizos);

function clickHechizos() {
    if(listaHechizos.length ===0){
    fetch(apiH)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos);
            mostrarHechizos(datos);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
    }
};
function mostrarHechizos(datos) {
    datos.forEach(hechizo => {
        const tarjetaHechizo = document.createElement("div")
        tarjetaHechizo.innerHTML = `
        <div class="card text-center mb-3" style="width: 18rem;">
        <img src="img/Hechizos.jpg" class="card-img-top" alt="${hechizo.spell}">
        <div class="card-body">
          <h5 class="card-title">${hechizo.spell}</h5>
          <p class="card-text">${hechizo.use}</p>
          <a href="#" class="btn btn-dark">Añadir a favoritos</a>
        </div>
      </div>
            `;
        contenedorHechizos.appendChild(tarjetaHechizo);
        listaHechizos.push(hechizo);
    });
}
