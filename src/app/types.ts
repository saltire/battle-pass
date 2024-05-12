export type GameState = {
  loading: boolean,
  gonks?: number,
  zoids?: number,
};

export type PageProps = {
  state: GameState,
};
