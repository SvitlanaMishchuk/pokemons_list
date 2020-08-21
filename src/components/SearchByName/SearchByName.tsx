import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { useDebounce } from '../../hooks/useDebounce';
import { useClasses } from './styles';

interface SearchByNameProps {
    onSearchByName: (value: string) => void;
}

const delayTime = 1000;
export const SearchByName = ({ onSearchByName }: SearchByNameProps) => {
    const classes = useClasses();

    const [searchKey, setSearchKey] = useState('');
    const debouncedSearchKey = useDebounce(searchKey, delayTime);
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        onSearchByName(debouncedSearchKey.toLowerCase());

    }, [debouncedSearchKey]);

    const handleSearchByName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchKey(value);
    };

    const handleClearSearchByName = () => {
        setSearchKey('');
    };

    return (

            <div className={classes.wrapper}>
                <InputLabel className={classes.label} htmlFor="search-input">Search</InputLabel>
                <TextField type="text"
                           className={classes.input}
                           variant="outlined"
                           value={searchKey}
                           id="search-input"
                           InputProps={{
                               endAdornment: <InputAdornment position="end" onClick={handleClearSearchByName}>
                                   <span className="material-icons" style={{ cursor: 'pointer' }}>
                                        clear
                                   </span>
                               </InputAdornment>,
                           }}
                           onChange={handleSearchByName}/>
            </div>
    )
};