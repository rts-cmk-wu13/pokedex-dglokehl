
let search = window.location.search;
let params = new URLSearchParams(search);
let urlName = params.get("name");


fetch(`https://pokeapi.co/api/v2/pokemon/${urlName}/`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let id = data.id;
        let pokemonName = data.name;

        let primaryType = data.types[0].type.name;
        setType(primaryType, "primary-type");
        if (data.types.length > 1) {
            let secondaryType = data.types[1].type.name;
            setType(secondaryType, "secondary-type");
        }



        // --- HEADER --- //

        headerElm.innerHTML = `
            <nav>
                <i class="fa-solid fa-arrow-left arrow__back"></i>
                <h1 class="pokemon__name">${pokemonName}</h1>
                <h2 class="pokemon__number">#${calcNums(id)}</h2>
            </nav>

            <div class="pokemon__gallery__wrapper">
                <figure class="pokemon__gallery">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="" class="pokemon__gallery__img">
                    <i class="fa-solid fa-chevron-left pokemon__gallery__arrow arrow__left"></i>
                    <i class="fa-solid fa-chevron-right pokemon__gallery__arrow arrow__right"></i>
                </figure>
            </div>

            <img src="svg/pokeball.svg" alt="" class="header__bg">
        `;



        // --- TYPES --- //

        let pokemonTypeContainer = document.createElement("div");
        pokemonTypeContainer.classList.add("pokemon__type__container");

        pokemonTypeContainer.innerHTML = data.types.map((type, index) => {
            let pokemonType = type.type.name;
            console.log(pokemonType, index + 1);

            return `
                <span class="pokemon__type pokemon__type__${index + 1}">${pokemonType}</span>
            `;
        }).join("");

        mainElm.append(pokemonTypeContainer);



        // --- ABOUT --- //

        let aboutSection = document.createElement("section");
        aboutSection.classList.add("about__section");
        aboutSection.innerHTML = `
            <h3 class="about__headline">About</h3>

            <div class="info__wrapper">
                <article class="info">
                    <div class="info__text__wrapper info__text__wrapper--weight">
                        <span class="info__text">
                            <i class="fa-solid fa-weight-hanging info__icon"></i> ${pokemonAboutFormat(data.weight)} kg
                        </span>
                    </div>
                    <p class="info__title">Weight</p>
                </article>

                <article class="info">
                    <div class="info__text__wrapper info__text__wrapper--height">
                        <span class="info__text">
                            <i class="fa-solid fa-ruler-vertical info__icon"></i> ${pokemonAboutFormat(data.height)} m
                        </span>
                    </div>
                    <p class="info__title">Height</p>
                </article>

                <article class="info">
                    <div class="info__text__wrapper info__text__wrapper--abilities">
                    </div>
                    <p class="info__title">Abilities</p>
                </article>
            </div>

            <p class="about__desc"></p>
        `;
        mainElm.append(aboutSection);


        let abilitiesContainer = document.querySelector(".info__text__wrapper--abilities");
        abilitiesContainer.innerHTML = data.abilities.map(ability => {
            if (ability.is_hidden) {
                return `
                <span class="info__text hiddenability">${ability.ability.name}</span>
            `;
            } else {
                return `
                    <span class="info__text">${ability.ability.name}</span>
                `;
            }
        }).join("");


        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                let pokedexDesc = document.querySelector(".about__desc");
                pokedexDesc.innerHTML = data.flavor_text_entries[9].flavor_text;
            });



        // --- BASE STATS --- //

        let basestatsNames = ["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"];
        let basestats = [];
        let basestatsNum = [];
        let basestatsPercent = [];

        data.stats.forEach(stat => {
            basestats.push(calcNums(stat.base_stat));
            basestatsNum.push(stat.base_stat);
            basestatsPercent.push(calcPercentage(stat.base_stat, 255));
        });


        let statsSection = document.createElement("section");
        statsSection.classList.add("stats__section");
        statsSection.innerHTML = `
            <h3 class="stats__headline">Base Stats</h3>

            <table class="basestats">
            </table>
        `;

        mainElm.append(statsSection);


        let basestatsTable = document.querySelector(".basestats");
        basestatsTable.innerHTML = basestatsNames.map((stat, index) => {
            return `
                <tr>
                    <td class="basestats__title">${stat}</td>
                    <td class="basestats__value">${basestats[index]}</td>
                    <td class="basestats__chart">
                        <meter value="${basestatsNum[index]}" min="0" max="255" class="basestats__bar"></meter>
                    </td>
                </tr>
            `;
        }).join("");
    });