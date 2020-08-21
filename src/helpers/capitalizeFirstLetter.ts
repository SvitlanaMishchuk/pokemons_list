export const getPokemonName = (name: string): string => {
    return name[0].toUpperCase() + name.slice(1);
};