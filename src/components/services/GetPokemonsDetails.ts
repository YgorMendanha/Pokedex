import axios from 'axios'
import { PokemonsDetails } from '../interfaces/PokemonsDetails'

export async function GetPokemonsDetails(
	name: string
): Promise<PokemonsDetails> {
	let endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`

	let reponse = await axios.get<PokemonsDetails>(endpoint)

	return reponse.data
}
