import { useState } from 'react';

import './Loadout.css';
import Player, { PlayerLoadout } from './Player';
import { items } from './items';
import allIcon from '../assets/icon_all.png';
import hatIcon from '../assets/icon_hat.png';
import faceIcon from '../assets/icon_face.png';
import shirtIcon from '../assets/icon_shirt.png';
import pantsIcon from '../assets/icon_pants.png';
import remove from '../assets/remove.png';
import tube from '../assets/background-TUBE.png';

const icons = {
  all: allIcon,
  hat: hatIcon,
  face: faceIcon,
  shirt: shirtIcon,
  pants: pantsIcon,
};

export default function Loadout() {
  const [loadout, setLoadout] = useState<PlayerLoadout>({});
  const [viewSlot, setViewSlot] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const filteredItems = [
    ...viewSlot ? [{ slot: viewSlot, name: 'remove', url: remove }] : [],
    ...items.filter(item => !viewSlot || item.slot === viewSlot),
  ];
  const lastPage = Math.floor(filteredItems.length / 15);

  return (
    <div className='Loadout'>
      <div className='main'>
        <div className='nav'>
          {Object.entries(icons).map(([slot, url]) => (
            <button
              key={slot}
              type='button'
              onClick={() => setViewSlot(slot === 'all' ? null : slot)}
            >
              <img src={url} />
            </button>
          ))}
        </div>

        <div className='items'>
          {filteredItems.slice(page * 15, (page + 1) * 15).map(({ name, slot, url }) => (
            <button
              key={name}
              type='button'
              className={name === 'remove' ? 'remove' : slot}
              onClick={() => setLoadout(prev => ({ ...prev, [slot]: name === 'remove' ? null : name }))}
            >
              <img src={url} />
            </button>
          ))}
        </div>

        <div className='nav'>
          <button type='button' disabled={page === 0} onClick={() => setPage(prev => prev - 1)}>
            «
          </button>

          <button type='button' disabled={page === lastPage} onClick={() => setPage(prev => prev + 1)}>
            »
          </button>
        </div>
      </div>

      <img className='tube' src={tube} />
      <Player loadout={loadout} />
    </div>
  );
}
