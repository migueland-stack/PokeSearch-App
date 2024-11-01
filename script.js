const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonSprite = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const hpStat = document.getElementById("hp");
const attackStat = document.getElementById("attack");
const defenseStat = document.getElementById("defense");
const specialAttackStat = document.getElementById("special-attack");
const specialDefenseStat = document.getElementById("special-defense");
const speedStat = document.getElementById("speed");

const fetchPokemonData = () => {
  if (searchInput.value === "") {
    alert("Input Pokémon information");
  } else {
    const query = searchInput.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
      })
      .then((data) => {
        pokemonTypes.style.display = "block";
        pokemonName.textContent = data.name;
        pokemonID.textContent = `#${data.id}`;
        pokemonWeight.textContent = `Weight: ${data.weight}`;
        pokemonHeight.textContent = `Height: ${data.height}`;
        pokemonSprite.src = data.sprites.front_default;

        const types = data.types
          .map((typeInfo) => typeInfo.type.name)
          .join(", ");
        pokemonTypes.textContent = `Type(s): ${types}`;

        hpStat.textContent = data.stats[0].base_stat;
        attackStat.textContent = data.stats[1].base_stat;
        defenseStat.textContent = data.stats[2].base_stat;
        specialAttackStat.textContent = data.stats[3].base_stat;
        specialDefenseStat.textContent = data.stats[4].base_stat;
        speedStat.textContent = data.stats[5].base_stat;
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        alert("Pokémon not found. Please try a different name or ID.");
      });
  }
};

// Event listener for button click
searchButton.addEventListener("click", fetchPokemonData);

// Event listener for Enter keydown
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchPokemonData();
  }
});
