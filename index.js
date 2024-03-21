document.querySelector('#search').addEventListener('click', getPokemon);

function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
    return string.toLowerCase();
}

function calcHeight(int){
    return int.toString().slice(0, -1) + ',' + int.toString().slice(-1) + ' m';
}

function calcWeight(int){
    return int.toString().slice(0, -1) + ',' + int.toString().slice(-1) + ' kg'
}

function getPokemon(e) {
    const name = lowerCaseName(document.querySelector("#pokemonName").value);

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            const hpStat = data.stats.find(stat => stat.stat.name === 'hp');
            const attackStat = data.stats.find(stat => stat.stat.name === 'attack');
            const defenseStat = data.stats.find(stat => stat.stat.name === 'defense');
            const spattackStat = data.stats.find(stat => stat.stat.name === 'special-attack');
            const spdefenseStat = data.stats.find(stat => stat.stat.name === 'special-defense');
            const speedStat = data.stats.find(stat => stat.stat.name === 'speed');

            document.querySelector('.pokemonBox').innerHTML =
            `
            <div class="pokemonInfo">
                <div>
                    <img 
                        src="${data.sprites.other["official-artwork"].front_default}" 
                        alt="${capitalizeFirstChar(data.name)}" 
                    />
                </div>
                <h1>${capitalizeFirstChar(data.name)}</h1>
                <p><strong>Height:</strong> ${calcHeight(data.height)}</p>
                <p><strong>Weight:</strong> ${calcWeight(data.weight)}</p>
                <br>
                <h2><Strong>Base Stats</Strong></h2>
                <div class="stats-group">
                    <p><strong>Hp:</strong> ${hpStat.base_stat}</p>
                    <p><strong>Attack:</strong> ${attackStat.base_stat}</p>
                    <p><strong>Defense:</strong> ${defenseStat.base_stat}</p>
                </div>
                <div class="stats-group">
                    <p><strong>Special-Attack:</strong> ${spattackStat.base_stat}</p>
                    <p><strong>Special-Defense:</strong> ${spdefenseStat.base_stat}</p>
                    <p><strong>Speed:</strong> ${speedStat.base_stat}</p>
                </div>
            </div>
            `
        })
        .catch((err) => {
            console.log("Pokemon not found", err);
        });

    e.preventDefault();
}