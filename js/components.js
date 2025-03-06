
function formatNums(num) {
    let formatter = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
    });
    return formatter.format(num);
}


function calcPercentage(a, b) {
    return Math.floor((a / b) * 100);
}


function formatPokemonInfo(num) {
    let formattedNum = num / 10;
    return formattedNum.toFixed(1).replace(".", ",");
}


function setPokemonType(value, name) {
    let r = document.documentElement;
    let currentHex = getComputedStyle(r).getPropertyValue(`--${value}`);

    r.style.setProperty(`--${name}`, currentHex);
    if (name === "primary-type") {
        r.style.setProperty(`--${name}-bg`, `${currentHex}33`);
    }
}


function showHide(elm) {
    if (elm.classList.contains("hidden")) {
        elm.classList.remove("hidden")
    } else {
        elm.classList.add("hidden")
    }
}