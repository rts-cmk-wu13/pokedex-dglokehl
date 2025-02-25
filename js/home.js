
headerElm.innerHTML = `
    <h1 class="home__headline">Pokédex</h1>
    <nav class="search-sort">
        <input type="search" name="searchbar" id="searchbar" placeholder="Search">
        <button id="sort">#</button>
    </nav>
`;


fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
        let pokeContainer = document.createElement("div");
        pokeContainer.classList.add("pokemon__container");

        pokeContainer.innerHTML = data.results.map(pokemon => {
            let id = pokemon.url.slice(0, -1).split("/").pop();
            let pokeNum = calcNums(id);

            let pokeName = pokemon.name;


            return `
                <a href="details.html?name=${pokeName}" class="pokemon__wrapper">
                    <article class="pokemon">
                        <h3 class="pokemon__number">#${pokeNum}</h3>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="" class="pokemon__img">
                        <h2 class="pokemon__name">${pokeName}</h2>
                    </article>
                </a>
            `;
        }).join("");

        mainElm.append(pokeContainer);
    });