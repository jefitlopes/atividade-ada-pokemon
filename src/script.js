function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchAllPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonList = document.getElementById('pokemonList');
        pokemonList.innerHTML = '';
        for (const pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const listItem = document.createElement('li');
            const img = document.createElement('img');
            img.src = pokemonData.sprites.front_default;
            listItem.appendChild(img);
            listItem.appendChild(document.createTextNode(capitalizeFirstLetter(pokemon.name)));
            listItem.addEventListener('click', function() {
                fetchPokemon(pokemon.name);
            });
            pokemonList.appendChild(listItem);
        }
    } catch (error) {
        console.error(error);
    }
}

function clearPokemonList() {
    const pokemonList = document.getElementById('pokemonList');
    while (pokemonList.firstChild) {
        pokemonList.removeChild(pokemonList.firstChild);
    }
}

function clearSearch() {
    document.getElementById('pokemonInput').value = '';
    document.getElementById('pokemonName').textContent = '';
    document.getElementById('pokemonImage').src = '';
    document.getElementById('pokemonImage').classList.add('hidden');
    document.getElementById('pokemonHeight').textContent = '';
    document.getElementById('pokemonWeight').textContent = '';
    document.getElementById('pokemonResult').classList.add('hidden'); 
    fetchAllPokemons();
}

async function fetchPokemon(pokemonName) {
    try {
        if (!pokemonName) {
            pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
        }
        if (pokemonName === '') {
            return;
        } else {
            clearPokemonList();
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            document.getElementById('pokemonName').textContent = capitalizeFirstLetter(data.name);
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonImage').classList.remove('hidden');
            document.getElementById('pokemonHeight').textContent = `Altura: ${data.height}`;
            document.getElementById('pokemonWeight').textContent = `Peso: ${data.weight}`;
            document.getElementById('pokemonResult').classList.remove('hidden');
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('pokemonForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await fetchPokemon();
});

window.onload = fetchAllPokemons;