import axios from 'axios'

export interface PokedexListInterface {
	id: number
	name: string
	url: string
}

interface listPokemonsInterface {
	count: number
	next: null | string
	previus: null | string
	results: PokedexListInterface[]
}

export async function ListPokemons(): Promise<listPokemonsInterface> {
	let endpoint = `${'https://pokeapi.co/api/v2/pokemon'}`

	let reponse = await axios.get<listPokemonsInterface>(endpoint)

	return reponse.data
}
