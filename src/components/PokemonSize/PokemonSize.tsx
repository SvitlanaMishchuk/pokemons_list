import React from 'react';

interface PokemonSizeProps {
    height?: number,
    weight?: number,
}

export const PokemonSize = (props: PokemonSizeProps) => {
    const { height, weight } = props;

    const getPokemonHeight = (height?: number): string => {
        return height ? `Height:   ${height} dm` : '';
    };

    const getPokemonWeight = (weight?: number): string => {
        return weight ? `Weight:   ${weight} hg` : ''
    };

    return (
        <ul>
            <li>{getPokemonHeight(height)}</li>
            <li>{getPokemonWeight(weight)}</li>
        </ul>
    )
};