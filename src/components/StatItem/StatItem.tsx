import React from 'react';
import { Stat } from '../../types';
import { useClasses } from './styles';

export const StatItem = (props: Stat) => {
    const { name, baseStat } = props;
    const classes = useClasses(props);

    return (
        <li className={classes.stat}>
            <span className={classes.statName}>{name}</span>
            <span className={classes.statValue}>{baseStat}</span>
        </li>
    )
};