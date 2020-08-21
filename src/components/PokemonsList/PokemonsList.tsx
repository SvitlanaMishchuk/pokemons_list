import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';

import { Pokemon, RequestUrlData, Type } from '../../types';
import { useStores } from '../../store';
import { useClasses } from './styles';
import { constants } from '../../contants';
import { PaginationSelection } from '../PaginationSelection';
import { PokemonCard } from '../PokemonCard';
import { PokemonModal } from '../PokemonModal';
import { TypeFilter } from '../TypeFilter';
import { SearchByName } from '../SearchByName';

export const PokemonsList = observer(() => {
    const { entitiesPerPage, defaultSelectedPage } = constants;

    const pokemonsStore = useStores();
    const classes = useClasses();
    const [selectedEntitiesPerPage, setSelectedEntitiesPerPage] = useState(entitiesPerPage[0]);
    const [activePokemon, setActivePokemon] = useState<Pokemon | undefined>();
    const [selectedPage, setSelectedPage] = useState(defaultSelectedPage);

    const pageCount = useMemo(
        () => Math.ceil(pokemonsStore.pokemonsCount / selectedEntitiesPerPage),
        [pokemonsStore.pokemonsCount, selectedEntitiesPerPage]);

    useEffect(() => {
        pokemonsStore.getTypesList();
        pokemonsStore.getPokemons(makeRequestData());
        return () => {
            pokemonsStore.clearTypesList();
            pokemonsStore.clearPokemonsList();
        }
    }, []);

    useEffect(() => {
        pokemonsStore.getPokemons(makeRequestData(), pokemonsStore.activeType)
    }, [selectedPage, selectedEntitiesPerPage]);


    useEffect(() => {
        setSelectedPage(defaultSelectedPage);
    }, [pokemonsStore.activeType]);

    const makeRequestData = (): RequestUrlData => {
        return {
            limit: selectedEntitiesPerPage,
            offset: selectedEntitiesPerPage * (selectedPage - 1)
        }
    };

    const onPageChange = (_, value: number) => {
        setSelectedPage(value);
    };

    const onEntriesPerPageChange = (_: ChangeEvent<{ name?: string; value: unknown }>,
                                    value: any) => {
        setSelectedPage(defaultSelectedPage);
        setSelectedEntitiesPerPage(value?.props?.value);
    };

    const onPokemonClick = (pokemon: Pokemon) => () => {
        setActivePokemon(pokemon);
    };

    const onTypeFilterClick = (value?: Type) => () => {
        if (!value) {
            pokemonsStore.setActiveType(undefined);
            pokemonsStore.getPokemons(makeRequestData());
        } else {
            pokemonsStore.setActiveType(value);
            pokemonsStore.getPokemons(makeRequestData(), pokemonsStore.activeType);
        }
    };

    const onSearchByName = (value: string) => {
        value ?
            pokemonsStore.getPokemonByName(value) :
            pokemonsStore.getPokemons(makeRequestData(), pokemonsStore.activeType);
    };

    const onModalClose = () => {
        setActivePokemon(undefined);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.filterBlock}>
                <SearchByName onSearchByName={onSearchByName}/>
                <TypeFilter types={pokemonsStore.types}
                            activeType={pokemonsStore.activeType}
                            onTypeFilterClick={onTypeFilterClick}/>
                <PaginationSelection entitiesPerPage={entitiesPerPage}
                                     selectedEntitiesPerPage={selectedEntitiesPerPage}
                                     onEntriesPerPageChange={onEntriesPerPageChange}/>
            </div>
            <div className={classes.list}>
                {pokemonsStore.pokemons.map((pokemon: Pokemon) => {
                    return <PokemonCard key={pokemon.name}
                                        pokemon={pokemon}
                                        pokemonsImageProcessing={pokemonsStore.pokemonsImageProcessing}
                                        onPokemonClick={onPokemonClick(pokemon)}/>
                })}
            </div>
            <Modal
                className={classes.modal}
                open={Boolean(activePokemon)}
                onClose={onModalClose}>
                <div>
                    {activePokemon && <PokemonModal pokemon={activePokemon}/> }
                </div>
            </Modal>
            <Pagination onChange={onPageChange}
                        className={classes.pagination}
                        count={pageCount}
                        page={selectedPage}/>
        </div>
    )
});