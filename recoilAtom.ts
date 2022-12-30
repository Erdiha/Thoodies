import { healthOptions } from './data';
import { atom } from 'recoil';
import { IRecipe } from './types';
import { DocumentData } from 'firebase/firestore';

export const startSearch = atom({
  key: 'startSearch',
  default: false,
});

export const healthOptionsAtom = atom({
  key: 'selectedOptionsAtom',
  default: '',
});

export const displayModalAtom = atom({
  key: 'displayModalAtom',
  default: false,
});

export const modalRecipeCardAtom = atom<any>({
  key: 'modalRecipeCardAtom',
  default: null,
});

export const scrollInitiatedAtom = atom({
  key: 'scrollInitiatedAtom',
  default: 0,
});

export const databaseRecipesAtom = atom({
  key: 'databaseRecipesAtom',
  default: {
    liked: null,
    saved: null,
    all: null,
  },
});

export const cardAddedAtom = atom({
  key: 'cardAddedAtom',
  default: false,
});

// export const extendNavbarAtom = atom<boolean>({
// 	key: 'extendNavbarAtom',
// 	default: false,
// });
