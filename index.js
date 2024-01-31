const listaPersonajes = [];
const listaLibros = [];
const listaCasas = [];
const listaHechizos = [];

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.nav-link');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
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
            mostrarDatos(container, dataList, datos);
        })
        .catch(error => console.log(error))
        .finally(() => console.log("proceso finalizo"));
}

function mostrarDatos(container, dataList, datos) {
    datos.forEach(item => {
        const tarjeta = createCard(item);
        container.appendChild(tarjeta);
        dataList.push(item);
    });
}

function createCard(item) {
    const card = document.createElement("div");
    card.className = "card text-center mb-3 ";

    let imageUrl, title, description;
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
        <a href="#" class="btn btn-dark">Añadir a favoritos</a>
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
