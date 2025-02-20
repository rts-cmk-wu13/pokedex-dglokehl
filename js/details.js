
let search = window.location.search;
let params = new URLSearchParams(search);
let urlName = params.get("name");



fetch(`https://pokeapi.co/api/v2/pokemon/${urlName}/`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let id = data.id.toString();

        let pokeNum = idFormat(id)        


        headerElm.innerHTML = `
            <nav>
                <i class="fa-solid fa-arrow-left arrow__back"></i>
                <h1 class="headline capitalize">${data.name}</h1>
                <h2 class="subtitle2">#${pokeNum}</h2>
            </nav>

            <figure class="pokemon__wrapper">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="" class="pokemon__img">
            </figure>
        `;

    });