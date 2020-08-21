import React from 'react';

import { PokemonsList } from './PokemonsList/PokemonsList';

import { useClasses } from './styles';
import logo from './../assets/logo.png';

export const App = () => {
    const classes = useClasses();
    return (
        <div>
            <header className={classes.header}>
                <img className={classes.logo} src={logo} alt="Pokemon Logo"/>
            </header>
            <PokemonsList />
        </div>
    );
};