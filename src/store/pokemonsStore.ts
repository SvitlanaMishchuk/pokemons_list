import { action, observable } from 'mobx';
import { createContext } from 'react';

import { Pokemon, RequestUrlData, Type } from '../types';

/**
 * Store with pokemon details data
 * pokemon name as string key and Pokemon as value
 */
const pokemonsDetailsCache: Map<string, Pokemon> = new Map();

/**
 * Store with pokemon list by type
 * type name as string key and list of pokemons as value
 * pokemons list without details
 */
const pokemonsTypesCache: Map<string, any> = new Map();

export class PokemonsStore {
    @observable pokemons: Pokemon[] = [];
    @observable types: Type[] = [];
    @observable activeType?: Type;
    @observable pokemonsCount: number = 0;
    @observable pokemonsImageProcessing: Set<string> = new Set();

    @action getPokemons(requestUrlData: RequestUrlData, type?: Type) { // split into 3 parts
        if (!type) {
            this.fetchPokemonsWithoutType(requestUrlData);
        } else {
            if (pokemonsTypesCache.has(type.name)) {
                this.getPokemonsByTypeFromCache(requestUrlData, type)
            } else {
                this.fetchPokemonsByType(requestUrlData, type)
            }
        }
    }

    @action fetchPokemonsWithoutType(requestUrlData: RequestUrlData) {
        fetch(this.makeRequestUrl(requestUrlData))
            .then(res => res.json())
            .then(json => {
                this.pokemonsCount = json.count;
                if (json.results && json.results.length) {
                    this.setPokemonList(json.results);
                    this.getPokemonsDetails(json.results);
                }
            })
            .catch(e => console.log(`Some error happened: ${e}`))
    }

    @action getPokemonsByTypeFromCache({ offset, limit }: RequestUrlData, type: Type) {
        this.pokemonsCount = pokemonsTypesCache.get(type.name).length;
        let pokemons = offset ?
            pokemonsTypesCache.get(type.name).slice(offset, offset + limit) :
            pokemonsTypesCache.get(type.name).slice(0, limit);

        this.setPokemonList(pokemons);
        this.getPokemonsDetails(pokemons);
    }

    @action fetchPokemonsByType({ offset, limit }: RequestUrlData, type: Type) {
        fetch(type.url)
            .then(res => res.json())
            .then(result => {
                if (result && result.pokemon) {
                    let pokemons = result.pokemon.map((p: any) => {
                        return p.pokemon
                    });
                    pokemonsTypesCache.set(type.name, pokemons);
                    this.pokemonsCount = result.pokemon.length;
                    let filteredPokemons = offset ?
                        pokemons.slice(offset, offset + limit) :
                        pokemons.slice(0, limit);
                    this.setPokemonList(filteredPokemons);
                    this.getPokemonsDetails(filteredPokemons);
                }
            })
            .catch(e => console.log(`Some error happened: ${e}`))
    }


    @action makeRequestUrl({ offset, limit }: RequestUrlData) {
        return offset ?
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}` :
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
    }

    @action getPokemonsDetails(pokemons: Pokemon[]) {
        // filter available pokemon details
        const requestPokemons = pokemons.reduce((acc: Pokemon[], next: Pokemon) => {
            if (!pokemonsDetailsCache.get(next.name)) {
                acc.push(next);
            }
            return acc;
        }, []);

        if (!requestPokemons) {
            this.setPokemonDetails();
        } else {
            this.pokemonsImageProcessing = new Set<string>(pokemons.map((p) => p.name));

            const promises$ = requestPokemons.map(p => fetch(p.url).then(res => res.json()));
            Promise.all(promises$)
                .then(responses => responses)
                .then(json => this.setPokemonDetails(json))
                .catch(e => console.log(`Some error happened: ${e}`))
        }
    }

    @action getPokemonByName(name: string) {
        fetch(`http://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                return response.ok ? response.json() : Promise.reject('Error');
            })
            .then(result => {
                let pokemons = [];
                if (result) {
                    pokemons.push(result);
                }
                this.pokemonsCount = pokemons.length;
                this.setPokemonList(pokemons);
                this.setPokemonDetails(pokemons);
            })
            .catch((e) => {
                this.pokemonsCount = 0;
                this.setPokemonList([]);
                console.log(`Some error happened: ${e}`)
            })
    }

    @action setPokemonList(pokemons: any[]) {
        this.pokemons = pokemons.map(p => new Pokemon(p));
    }

    @action setPokemonDetails(pokemonsDetails?: any[]) {
        if (pokemonsDetails && pokemonsDetails.length) {
            pokemonsDetails.forEach((p: any) => {
                let pokemon = new Pokemon(p);
                pokemonsDetailsCache.set(p.name, pokemon);
            });
        }

        this.pokemons = this.pokemons.map((p: Pokemon) => pokemonsDetailsCache.get(p.name) as Pokemon);
        this.pokemonsImageProcessing = new Set();
    }

    @action getTypesList() {
        fetch('http://pokeapi.co/api/v2/type')
            .then(res => res.json())
            .then(types => {
                if (types.results && types.results.length) {
                    this.setTypesList(types.results)
                }
            })
            .catch((e) => {
                console.log(`Some error happened: ${e}`)
            })
    }

    @action setTypesList(types: Type[]) {
        this.types = types.map(type => new Type(type));
    }

    @action setActiveType(type: Type | undefined) {
        this.activeType = type;
    }

    @action clearActiveType() {
        this.activeType = undefined;
    }

    @action clearPokemonsList() {
        this.pokemons = [];
    }

    @action clearTypesList() {
        this.types = [];
    }
}

export const pokemonsStoreContext = createContext(new PokemonsStore());