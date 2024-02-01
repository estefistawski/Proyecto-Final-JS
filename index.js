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
        this.titulo = titulo;
        this.fecha = fecha;
        this.paginas = paginas;
        this.portada = portada;
    }
}
class Casa{
    constructor(id,nombre,emoji,fundador,animal){
        this.id=id;
        this.nombre=nombre;
        this.emoji=emoji;
        this.fundador=fundador;
        this.animal=animal;
    }
}
class Hechizo{
    constructor(id,nombre,uso){
        this.id=id;
        this.nombre=nombre;
        this.uso=uso;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.nav-link');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
    const carrusel = document.querySelector('.carrusel');
    const slide = document.querySelectorAll('.slide');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    btnSiguiente.addEventListener('click', handleSiguienteClick);
    btnAnterior.addEventListener('click', handleAnteriorClick);
    function handleSiguienteClick() {
        imgCero = (imgCero + 1) % slide.length;
        actualizarCarrusel();
    }
    function handleAnteriorClick() {
        imgCero = (imgCero - 1 + slide.length) % slide.length;
        actualizarCarrusel();
    }
    function actualizarCarrusel() {
        carrusel.style.transform = `translateX(${-imgCero * 100}%)`;
    }
    function autoSlide() {
        handleSiguienteClick();
    }
    setInterval(autoSlide, 3000);
});

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
let cont = 0;
function convertirObjeto(item, category) {
    cont++;
    let objetoNuevo
    if (category === 'characters') {
        objetoNuevo = new Personaje(String(cont), String(item.fullName), String(item.hogwartsHouse), String(item.birthdate), String(item.interpretedBy), item.image);
    }
    if (category === 'books') {
        objetoNuevo = new Libro(String(cont), String(item.title), String(item.releaseDate), String(item.pages), String(item.cover));
    }
    if (category === 'houses') {
        objetoNuevo = new Casa(String(cont),String(item.house),String(item.emoji),String(item.founder),String(item.animal));
    }
    if (category === 'spells') {
        objetoNuevo = new Hechizo(String(cont),String(item.spell),String(item.use));
    }
    return objetoNuevo;
}

function mostrarDatos(container, dataList, datos, category) {
    datos.forEach(item => {
        const tarjeta = createCard(item);
        container.appendChild(tarjeta);
        const objetoActual = convertirObjeto(item, category);
        if(category==='characters' && dataList.length!=25){
            dataList.push(objetoActual);
        }
        if(category==='books' && dataList.length!=8){
            dataList.push(objetoActual);
        }
        if(category==='houses' && dataList.length!=4){
            dataList.push(objetoActual);
        }
        if(category==='spells' && dataList.length!=72){
            dataList.push(objetoActual);
        }
        const boton = document.getElementById('btn${objetoActual.id}')
        boton.addEventListener('click',()=>{
         agregarFavorito(dataList,objetoActual.id);
      })

    })
    console.log(listaLibros);
    console.log(listaPersonajes);
    console.log(listaCasas);
    console.log(listaHechizos);
}
function agregarFavorito(lista, id) {
    const listaFiltrada = lista.filter((obj) => obj.id === (id));
    favoritos.push(listaFiltrada);
    console.log(favoritos);
}
let contador=0
function createCard(item) {
    const card = document.createElement("div");
    card.className = "card text-center mb-3 ";
    contador++;
    let imageUrl, title, description, id;
    if (item.image) {
        imageUrl = item.image;
        title = item.fullName;
        description = `Casa: ${item.hogwartsHouse}\nCumpleaños: ${item.birthdate}\nInterpretado por: ${item.interpretedBy}`;
    } else if (item.cover) {
        imageUrl = item.cover;
        title = item.title;
        description = `Fecha de publicación: ${item.releaseDate}\nPáginas: ${item.pages}`;
    } else if (item.house) {
        imageUrl = `img/${item.house}.jpg`;
        title = item.house;
        description = `Emoji: ${item.emoji}\nFundador: ${item.founder}\nAnimal: ${item.animal}`;
    } else if (item.spell) {
        imageUrl = "img/Hechizos.jpg";
        title = item.spell;
        description = item.use;
    }

    card.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-body">
        <a href="#" id="btn${contador}" class="btn btn-dark">Añadir a favoritos</a>
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

