
headerElm.innerHTML = `
    <h1 class="headline">Pokédex</h1>
    <nav class="search-sort">
        <input type="search" name="searchbar" id="searchbar" class="innershadow body3" placeholder="Search">
        <button id="sort" class="innershadow">#</button>
    </nav>
`;


fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
        let pokeContainer = document.createElement("div");
        pokeContainer.classList.add("pokemon__container", "innershadow");

        pokeContainer.innerHTML = data.results.map(pokemon => {
            let id = pokemon.url.slice(0, -1).split("/").pop();
            let pokeName = pokemon.name;

            let pokeNum = idFormat(id);


            return `
                <a href="details.html?name=${pokeName}" class="pokemon__wrapper dropshadow1">
                    <article class="pokemon">
                        <h3 class="pokemon__number caption">#${pokeNum}</h3>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="" class="pokemon__img">
                        <h2 class="pokemon__name body3">${pokeName}</h2>
                    </article>
                </a>
            `;
        }).join("");

        mainElm.append(pokeContainer);
    });