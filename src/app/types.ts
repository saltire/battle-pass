import { Dispatch, ReactNode, SetStateAction } from 'react';

export type PlayerLoadout = { [index: string]: string | null };

export type GameState = {
  loading: boolean,
  gonks?: number,
  zoids?: number,
  stars?: number,
  gonksSpent?: number,
  items: string[],
  loadout: PlayerLoadout,
  justBought?: string | null,
  quests: string[],
  level: number,
  levelClaimed: number,
};

export type PageProps = {
  state: GameState,
  setState: Dispatch<SetStateAction<GameState>>,
};

export type Quest = {
  id: string,
  title: string,
  desc: ReactNode,
  condition: (state: GameState) => boolean,
  stars: number,
};
