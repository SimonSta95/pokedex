//Get Elements
const pokedex    = document.querySelector('.pokedex');
const search     = document.querySelector('.search');
const number     = document.querySelector('.number');
const image      = document.querySelector('.image')
const types      = document.querySelector('.types');
const baseStats  = document.querySelector('.base-stats');
const statDesc   = document.querySelectorAll('.stat-desc');
const statNumber = document.querySelectorAll('.stat-number');
const barOuter   = document.querySelectorAll('.bar-outer');
const barInner   = document.querySelectorAll('.bar-inner');

//Colors for type badges
const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "C22E28",
    poison: "A33EA1",
    ground: "E2BF65",
    flying: "A98FF3",
    psychic: "F95587",
    bug: "A6B91A",
    rock: "B6A136",
    ghost: "735797",
    dragon: "6F35FC",
    dark: "705746",
    steel: "B7B7CE",
    fairy: "D685AD"
};

const Api = async (pokemon) => {
    pokemonApi = pokemon.split(' ').join('-').toLowerCase();

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonApi);

    if(response.status === 200) {
        const data = await response.json();
        return data;
    }

    return false;
}

search.addEventListener('change', async(event) => {
    const data = await Api(event.target.value);

    if(!data) {
        alert('Pokémon does not exist');
        return;
    }

    //Set main Backgroundcolor after first type
    const mainColor = typeColors[data.types[0].type.name];
    baseStats.style.color         = mainColor;
    pokedex.style.backgroundColor = mainColor;

    // Sets pokemon # at the top of the page
    number.innerHTML = '#' + data.id.toString().padStart(3, '0');

    // Sets pokemon image
    image.src = data.sprites.other["official-artwork"].front_default;


    // Updates "Type" bubbles
    types.innerHTML = '';

    data.types.forEach((t) => {
        let newType = document.createElement('span');
        let color   = typeColors[t.type.name];
    
        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = color; 
    
        types.appendChild(newType);
    });

    // Update Bars
    data.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = mainColor;
        barOuter[i].style.backgroundColor = mainColor;
        statDesc[i].style.color           = mainColor;
    });
    
});