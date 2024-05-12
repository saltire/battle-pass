import './Player.css';

export type PlayerLoadout = {
  hat?: string | null,
  face?: string | null,
  shirt?: string | null,
  pants?: string | null,
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
