import React from 'react';

import { PokemonStatList } from '../PokemonStatList';
import { PokemonTypeList } from '../PokemonTypeList';
import { PokemonSize } from '../PokemonSize';
import { Pokemon } from '../../types';
import { useStyles } from './styles';
import { getPokemonName } from '../../helpers/capitalizeFirstLetter';

interface PokemonModalProps {
    pokemon: Pokemon
}

export const PokemonModal = ({ pokemon }: PokemonModalProps) => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <h2>{getPokemonName(pokemon.name)}</h2>
            <div className={classes.data}>
                <img src={pokemon.img} alt={pokemon.name}/>
                <div className={classes.data}>
                    <PokemonSize height={pokemon.height} weight={pokemon.weight}/>
                    <div className={classes.typesList}>
                        <PokemonTypeList types={pokemon.types}/>
                    </div>

                </div>
            </div>
            <div>
                <PokemonStatList stats={pokemon.stats}/>
            </div>
        </div>
    )
};