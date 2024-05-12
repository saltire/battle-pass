import './Player.css';

export type PlayerLoadout = {
  hat?: string,
  face?: string,
  shirt?: string,
  pants?: string,
};

type PlayerProps = {
  loadout: PlayerLoadout,
};

export default function Player({ loadout }: PlayerProps) {
  return (
    <div className='Player'>
      <img className='guy' src='/src/assets/BASE_GUY.png' />

      {Object.entries(loadout).map(([slot, name]) => !!name && (
        <img key={slot} className={slot} src={`/src/assets/items/${name}.png`} />
      ))}
    </div>
  );
}
