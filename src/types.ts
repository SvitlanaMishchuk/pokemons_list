export class Pokemon {
    name: string;
    url: string;
    stats: Stat[];
    types: Type[];
    abilities: Ability[];
    abilitiesCount: number;
    img?: string;
    height?: number;
    weight?: number;

    constructor (pokemon: any) {
        this.url = pokemon.url || '';
        this.name = pokemon.name;
        this.stats = pokemon.stats?.length ? this.getStats(pokemon.stats) : [];
        this.types = pokemon.types?.length ? this.getTypes(pokemon.types) : [];
        this.abilities = pokemon.abilities?.length ? this.getAbilities(pokemon.abilities) : [];
        this.abilitiesCount = this.abilities.length;
        this.img = pokemon.sprites?.front_default ? pokemon.sprites.front_default : '';
        this.height = pokemon.height;
        this.weight = pokemon.weight;
    }

    getStats = (stats: any): Stat[] => {
        return stats.map((s: any) => ({
            baseStat: s.base_stat,
            name: s.stat.name,
            effort: s.effort,
            url: s.stat.url
        }))
    };

    getTypes = (types: any): Type[] => {
        return types.map((t: any) => ({
            slot: t.slot,
            color: this.intToRGB(this.hashCode(t.type.name)),
            name: t.type.name,
            url: t.type.url
        }))
    };

    getAbilities = (abilities: any): Ability[] => {
        return abilities.map((a: any) => ({
            name: a.ability.name,
            url: a.ability.url
        }))
    };

    hashCode = (type: string) => {
        let hash = 0;
        for (let i = 0; i < type.length; i++) {
            hash = type.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    intToRGB = (i: number) => {
        let c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return `#${"00000".substring(0, 6 - c.length) + c}`;
    };
}

interface Ability {
    name: string;
    url: string;
}

export interface Stat {
    baseStat: number;
    name: string;
    effort?: number;
    url?: string;
}

export class Type {
    name: string;
    url: string;
    color: string;
    slot?: number;

    constructor (type: any) {
        this.name = type.name;
        this.url = type.url;
        this.color = this.intToRGB(this.hashCode(type.name))
    }


    hashCode = (type: string) => {
        let hash = 0;
        for (let i = 0; i < type.length; i++) {
            hash = type.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    intToRGB = (i: number) => {
        let c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return `#${"00000".substring(0, 6 - c.length) + c}`;
    };

}

export interface RequestUrlData {
    limit: number,
    offset: number
}