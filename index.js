const listaPersonajes = [];
const listaLibros = [];
const listaCasas = [];
const listaHechizos = [];
const favoritos = [];


let imgCero = 0;
class Personaje {
    constructor(id, nombre, casa, cumpleaños, interprete, img) {
        this.id = id;
        this.nombre = nombre;
        this.casa = casa;
        this.cumpleaños = cumpleaños;
        this.interprete = interprete;
        this.img = img;
    }
}
class Libro {
    constructor(id, titulo, fecha, paginas, portada) {
        this.id = id;
        this.nombre = titulo;
        this.fecha = fecha;
        this.paginas = paginas;
        this.portada = portada;
    }
}
class Casa {
    constructor(id, nombre, emoji, fundador, animal) {
        this.id = id;
        this.nombre = nombre;
        this.emoji = emoji;
        this.fundador = fundador;
        this.animal = animal;
    }
}
class Hechizo {
    constructor(id, nombre, uso) {
        this.id = id;
        this.nombre = nombre;
        this.uso = uso;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.nav-link');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
    const favoritosRecuperado = localStorage.getItem("favoritos");
    const favoritosObjeto = JSON.parse(favoritosRecuperado);
    favoritosObjeto.forEach(obj => {
            favoritos.push(obj);
        })
    });

const personajesFav = [];
const btnFavoritos = document.getElementById("btnFavoritos");
btnFavoritos.addEventListener('click', () => {
    const favoritosRecuperado = localStorage.getItem("favoritos");
    const favoritosObjeto = JSON.parse(favoritosRecuperado);
    const contenedorGeneral = document.getElementById('contenedorGeneral');
    let title, description, id;
    contenedorGeneral.innerHTML = '';
    favoritosObjeto.forEach(obj => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "card text-center mb-3 ";
            if (obj.cumpleaños) {
                // imageUrl = item.image;
                id = obj.id;
                title = obj.nombre;
                description = `Casa: ${obj.casa}<br>Cumpleaños: ${obj.cumpleaños}`;
            } else if (obj.paginas) {
                // imageUrl = item.cover;
                id = obj.id;
                title = obj.nombre;
                description = `Fecha de publicación: ${obj.fecha}<br>Páginas: ${obj.paginas}`;
            } else if (obj.fundador) {
                // imageUrl = `img/${item.house}.jpg`;
                id = obj.id;
                title = obj.nombre;
                description = `Emoji: ${obj.emoji}<br>Fundador: ${obj.fundador}<br>Animal: ${obj.animal}`;
            } else if (obj.uso) {
                // imageUrl = "img/Hechizos.jpg";
                id = obj.id;
                title = obj.nombre;
                description = obj.uso;
            }
            tarjeta.innerHTML = `
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${description}</p>
                    </div>
                    <div class="card-body">
                    <a href="#" id="btn${id}" class="btn btn-dark">Eliminar</a>
                     </div>
                    `;
            contenedorGeneral.appendChild(tarjeta);
        })
    })


function handleClick(event) {
    const category = event.target.getAttribute('value');
    fetchData(category);

}

function fetchData(category) {
    const apiUrl = `https://potterapi-fedeperin.vercel.app/es/${category}`;
    const container = document.getElementById('contenedorGeneral');
    const dataList = getListByCategory(category);

    container.innerHTML = '';

    fetch(apiUrl)
        .then(respuesta => respuesta.json())
        .then((datos) => {
            console.log(datos);
            mostrarDatos(container, dataList, datos, category);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
}
// let cont = 0;
function convertirObjeto(item, category) {
    // cont++;
    let objetoNuevo
    if (category === 'characters') {
        const nombre = item.fullName;
        const string1 = nombre.substr(0, 2);
        const string2 = nombre.substr(-2);
        objetoNuevo = new Personaje((string1 + string2), String(nombre), String(item.hogwartsHouse), String(item.birthdate), String(item.interpretedBy), item.image);
    }
    if (category === 'books') {
        const titulo = item.title;
        const string1 = titulo.substr(0, 2);
        const string2 = titulo.substr(-2);
        objetoNuevo = new Libro((string1 + string2), String(titulo), String(item.releaseDate), String(item.pages), String(item.cover));
    }
    if (category === 'houses') {
        const nombre = item.house;
        const string1 = nombre.substr(0, 2);
        const string2 = nombre.substr(-2);
        objetoNuevo = new Casa((string1 + string2), String(nombre), String(item.emoji), String(item.founder), String(item.animal));
    }
    if (category === 'spells') {
        const nombre = item.spell;
        const string1 = nombre.substr(0, 2);
        const string2 = nombre.substr(-2);
        objetoNuevo = new Hechizo((string1 + string2), String(nombre), String(item.use));
    }
    return objetoNuevo;
}



function mostrarDatos(container, dataList, datos, category) {
    datos.forEach(item => {
        const tarjeta = createCard(item, dataList);
        container.appendChild(tarjeta);
        const objetoActual = convertirObjeto(item, category);
        if (category === 'characters' && listaPersonajes.length != 25) {
            listaPersonajes.push(objetoActual);
        }
        else if (category === 'books' && listaLibros.length != 8) {
            listaLibros.push(objetoActual);
        }
        else if (category === 'houses' && listaCasas.length != 4) {
            listaCasas.push(objetoActual);
        }
        else if (category === 'spells' && listaHechizos.length != 72) {
            listaHechizos.push(objetoActual);
        }
        const boton = document.getElementById(`btn${objetoActual.id}`);
        boton.addEventListener('click', () => {
            agregarFavorito(dataList, objetoActual.id);
            Swal.fire({
                title: "Se ha agregado a favoritos!",
                icon: "success"
            });
        })
    })
}
function agregarFavorito(lista, id) {

    const listaFiltrada = lista.filter((obj) => obj.id === (id));
    listaFiltrada.forEach(obj=>{
        favoritos.push(obj);
    })
    const favoritosJSON = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", favoritosJSON);
    console.log(favoritos);
}
// let contador = 0
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card text-center mb-3 ";
    // contador++;
    let imageUrl, title, description;
    if (item.image) {
        imageUrl = item.image;
        title = item.fullName;
        description = `Casa: ${item.hogwartsHouse}<br>Cumpleaños: ${item.birthdate}<br>Interpretado por: ${item.interpretedBy}`;
    } else if (item.cover) {
        imageUrl = item.cover;
        title = item.title;
        description = `Fecha de publicación: ${item.releaseDate}<br>Páginas: ${item.pages}`;
    } else if (item.house) {
        imageUrl = `img/${item.house}.jpg`;
        title = item.house;
        description = `Emoji: ${item.emoji}<br>Fundador: ${item.founder}<br>Animal: ${item.animal}`;
    } else if (item.spell) {
        imageUrl = "img/Hechizos.jpg";
        title = item.spell;
        description = item.use;
    }
    // let stringCont = String(contador);
    const string1 = title.substr(0, 2);
    const string2 = title.substr(-2);
    const id = (string1 + string2);
    card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-body">
        <a href="#" id="btn${id}" class="btn btn-dark">Añadir a favoritos</a>
        </div>
    `;
    return card;
}


function getListByCategory(category) {
    switch (category) {
        case "characters":
            return listaPersonajes;
        case "books":
            return listaLibros;
        case "houses":
            return listaCasas;
        case "spells":
            return listaHechizos;
        default:
            return null;
    }
}

