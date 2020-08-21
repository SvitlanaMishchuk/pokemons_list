import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useClasses } from './styles';
import { Pokemon } from '../../types';
import { PokemonStatList } from '../PokemonStatList';
import { PokemonTypeList } from '../PokemonTypeList';
import { PokemonSize } from '../PokemonSize';
import { getPokemonName } from '../../helpers/capitalizeFirstLetter';

interface PokemonCardProps {
    pokemon: Pokemon,
    pokemonsImageProcessing: Set<string>;
    onPokemonClick: () => void
}

export const PokemonCard = (props: PokemonCardProps) => {
    const classes = useClasses();
    const { pokemon, pokemonsImageProcessing, onPokemonClick } = props;

    const img = () => {
        if (pokemon.img) {
            return <CardMedia className={classes.image}
                              image={pokemon.img}
                              title={pokemon.name} />
        } else if (pokemonsImageProcessing.has(pokemon.name)) {
            return <Skeleton variant="rect" width={210} height={118}/>
        }

        return <CardMedia className={classes.image}
                          image='src/assets/poke_ball.png'
                          title={pokemon.name} />
    };

    return (
        <Card key={pokemon.name} className={classes.pokemon} onClick={onPokemonClick}>
            <CardActionArea>
                {img()}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {getPokemonName(pokemon.name)}
                    </Typography>
                    <Typography className={classes.data} component="div">
                        <PokemonSize height={pokemon.height}
                                     weight={pokemon.weight}/>
                        <PokemonTypeList types={pokemon.types}/>
                    </Typography>
                    <PokemonStatList stats={pokemon.stats}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
};