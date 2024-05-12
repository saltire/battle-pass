import { Dispatch, SetStateAction } from 'react';

export type PlayerLoadout = { [index: string]: string | null };

export type GameState = {
  loading: boolean,
  gonks?: number,
  zoids?: number,
  items: string[],
  loadout: PlayerLoadout,
  justBought?: string | null,
};

export type PageProps = {
  state: GameState,
  setState: Dispatch<SetStateAction<GameState>>,
};
