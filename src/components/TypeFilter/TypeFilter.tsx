import React from 'react';
import { Chip, MenuItem, Select } from '@material-ui/core';

import { Type } from '../../types';
import { useClasses } from './styles';

interface TypeFilterProps {
    types: Type[],
    activeType?: Type,
    onTypeFilterClick: (value?: Type) => () => void;
}

export const TypeFilter = (props: TypeFilterProps) => {
    const classes = useClasses();
    const { types, activeType, onTypeFilterClick } = props;

    return (
        <div className={classes.wrapper}>
            <span className={classes.label}>Filter by type:</span>
            <Select className={classes.selectList}
                    value={activeType ? activeType.name : ''}>
                <MenuItem value="None" onClick={onTypeFilterClick(undefined)}>
                    <Chip label="None"/>
                </MenuItem>
                {
                    types.map((t: Type) => {
                        return (
                            <MenuItem value={t.name} onClick={onTypeFilterClick(t)} key={t.name}>
                                <Chip style={{ backgroundColor: t.color }} label={t.name}/>
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </div>
    )
};