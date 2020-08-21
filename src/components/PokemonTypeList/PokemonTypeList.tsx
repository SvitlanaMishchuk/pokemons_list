import React from 'react';
import { Chip } from '@material-ui/core';

import { Type } from '../../types';
import { useClasses } from './styles';

interface PokemonTypeListProps {
    types: Type[]
}

export const PokemonTypeList = ({ types }: PokemonTypeListProps) => {
    const classes = useClasses();

    return (
        <ul className={classes.list}>
            {
                types.map((type: Type) => (
                    <li key={type.name}>
                        <Chip style={{ backgroundColor: type.color }}
                              label={type.name}/>
                    </li>
                ))
            }
        </ul>
    )
};
