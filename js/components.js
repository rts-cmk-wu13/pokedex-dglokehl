function idFormat(id) {
    if (id.length == 1) {
        pokeNum = "00" + id;
    } else if (id.length == 2) {
        pokeNum = "0" + id;
    } else {
        pokeNum = id;
    }
    return pokeNum;
}