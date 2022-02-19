const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const SPECIES_URL = 'https://pokeapi.co/api/v2/pokemon-species/'

export const basicFetch = async (pokemon) => {
    const req = await fetch(`${BASE_URL}${pokemon}`);
    return await req.json();
}

export const speciesFetch = async (pokemon) => {
    const req = await fetch(`${SPECIES_URL}${pokemon}`)
    return await req.json()
}