
function pokemonAboutFormat(num) {
    let formattedNum = num / 10;
    return formattedNum.toFixed(1).replace(".", ",");
}


function calcPercentage(a, b) {
    return Math.floor((a / b) * 100);
}

function calcNums(num) {
    let formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
    });
    return formatter.format(num);
}

function setType(value, name) {
    let r = document.documentElement;
    let currentHex = getComputedStyle(r).getPropertyValue(`--${value}`);

    r.style.setProperty(`--${name}`, currentHex);
    r.style.setProperty(`--${name}-bg`, `${currentHex}33`);
}


// function findType(value, index) {
//     let r = document.documentElement;
//     let currentHex = getComputedStyle(r).getPropertyValue(`--${value}`);

//     r.style.setProperty(`--pokemon-type${index}`, currentHex);

//     return currentHex;
// }





// Get the latest flavor text (in English)
//let lastIndex = species.flavor_text_entries.map(s => s.language.name === "en").lastIndexOf(true);
//let mostToDateText = species.flavor_text_entries[lastIndex].flavor_text;
// Add the flavor text to the pokemon object (optional, but convenient)
//pokemon.flavorText = mostToDateText;