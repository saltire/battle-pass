import './Player.css';
import { items } from './items';
import playerImg from '../assets/BASE_GUY.png';
import { PlayerLoadout } from './types';

type PlayerProps = {
  loadout: PlayerLoadout,
};

export default function Player({ loadout }: PlayerProps) {
  return (
    <div className='Player'>
      <img className='guy' src={playerImg} />

      {Object.entries(loadout).map(([slot, name]) => {
        const item = name ? items.find(i => i.name === name) : undefined;
        return item && <img key={slot} className={slot} src={item.url} />;
      })}
    </div>
  );
}
