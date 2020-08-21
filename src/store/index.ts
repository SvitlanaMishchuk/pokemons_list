import { useContext } from 'react'
import { pokemonsStoreContext } from './pokemonsStore';

export const useStores = () => useContext( pokemonsStoreContext );