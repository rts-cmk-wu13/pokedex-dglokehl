
headerElm.innerHTML = `
    <h1 class="home__headline">Pokédex</h1>

    <nav>
        <form action="details.html" class="search__form">
            <input type="search" name="name" id="searchbar" placeholder="Search">
        </form>

        <div class="sort">
            <div class="sort__btn">
                <img src="svg/tag.svg" alt="" class="sort__btn__icon">
            </div>

            <div class="sort__menu hidden">
                <h3 class="sort__headline">Sort by:</h3>

                <div class="sort__menu__options">
                    <div class="sort__option__container">
                        <input type="radio" name="sort" id="sort__number" class="sort__option" value="number" checked>
                        <label for="sort__number">Number</label>
                    </div>

                    <div class="sort__option__container">
                        <input type="radio" name="sort" id="sort__name" class="sort__option" value="name">
                        <label for="sort__name">Name</label>
                    </div>
                </div>
            </div>
        </div>
    </nav>
`;


let searchBar = headerElm.querySelector("#searchbar");


let sortMenu = headerElm.querySelector(".sort__menu");
let sortBtn = headerElm.querySelector(".sort__btn");
sortBtn.addEventListener("click", function () {
    showHide(sortMenu);
});



let currentOffset = 0;

const fetchObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (currentOffset < 1025) {
                currentOffset = currentOffset + 50;
                fetchPokemon(currentOffset);
            }
        }
    });
});


function fetchPokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.results);

            mainElm.innerHTML += data.results.map(pokemon => {
                let id = pokemon.url.slice(0, -1).split("/").pop();
                let pokeNum = formatNums(id);

                let pokeName = pokemon.name;
                let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;


                return `
                <a href="details.html?name=${pokeName}" class="pokemon__wrapper" data-name="${pokeName}">
                    <article class="pokemon">
                        <h3 class="pokemon__number">#${pokeNum}</h3>
                        <img loading="lazy" src="${imgSrc}" alt="${pokeName}" class="pokemon__img">
                        <h2 class="pokemon__name">${pokeName}</h2>
                    </article>
                </a>
            `;
            }).join("");

            let observedPokemon = mainElm.querySelector(".pokemon__wrapper:nth-last-of-type(10)");
            fetchObserver.observe(observedPokemon);
        });
}

fetchPokemon(currentOffset);