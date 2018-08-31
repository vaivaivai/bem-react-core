import { stringifyWrapper } from '@bem/sdk.naming.entity.stringify';
import { INamingConvention } from '@bem/sdk.naming.presets';

const react = require('@bem/sdk.naming.presets/react');

export type NoStrictEntityMods = Record<string, string | boolean | number | undefined>;

export type ClassNameFormatter = (elemOrBlockMods?: NoStrictEntityMods | string, mods?: NoStrictEntityMods) => string;

function modsToEntities(block: string, elem?: string, mods?: NoStrictEntityMods): any[] {
    if (!mods) return [{ block, elem }];

    const arr = [];

    for (const modName in mods) {
        if (mods[modName] || mods[modName] === 0) {
            arr.push({ block, elem, mod: {
                name: modName,
                val: mods[modName] === true ? true : String(mods[modName]),
            }});
        }
    }

    if (arr.length === 0) return [{ block, elem }];

    return arr;
}

export function configure(preset: INamingConvention) {
    const naming = stringifyWrapper(preset);

    return (block: string, elem?: string): ClassNameFormatter =>
        (elemOrBlockMods?: NoStrictEntityMods | string, mods?: NoStrictEntityMods) => {
            return typeof elemOrBlockMods === 'string'
                ? modsToEntities(block, elemOrBlockMods, mods).map(naming).join(' ')
                : modsToEntities(block, elem, elemOrBlockMods).map(naming).join(' ')
        };
}

export const cn = configure(react);