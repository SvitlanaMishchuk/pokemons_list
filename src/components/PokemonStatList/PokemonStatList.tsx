import React from 'react';

import { StatItem } from '../StatItem';
import { Stat } from '../../types';

interface PokemonStatListProps {
    stats: Stat[]
}

export const PokemonStatList = ({ stats }: PokemonStatListProps) => {
    return (
        <ul>
            {stats.map((stat: Stat) => <StatItem key={stat.name} name={stat.name} baseStat={stat.baseStat}/>)}
        </ul>
    );
};

