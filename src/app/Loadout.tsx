import { useState } from 'react';

import './Loadout.css';
import Player, { PlayerLoadout } from './Player';
import { items } from './items';

export default function Loadout() {
  const [loadout, setLoadout] = useState<PlayerLoadout>({});
  const [viewSlot, setViewSlot] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const filteredItems = [
    ...viewSlot ? [{ slot: viewSlot, name: 'remove' }] : [],
    ...items.filter(item => !viewSlot || item.slot === viewSlot),
  ];
  const lastPage = Math.floor(filteredItems.length / 15);

  return (
    <div className='Loadout'>
      <div className='main'>
        <div className='nav'>
          {['all', 'hat', 'face', 'shirt', 'pants'].map(slot => (
            <button
              key={slot}
              type='button'
              onClick={() => setViewSlot(slot === 'all' ? null : slot)}
            >
              <img src={`/src/assets/icon_${slot}.png`} />
            </button>
          ))}
        </div>

        <div className='items'>
          {filteredItems.slice(page * 15, (page + 1) * 15).map(({ slot, name }) => (
            <button
              key={name}
              type='button'
              className={name === 'remove' ? 'remove' : slot}
              onClick={() => setLoadout(prev => ({ ...prev, [slot]: name === 'remove' ? null : name }))}
            >
              <img src={`/src/assets/items/${name}.png`} />
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

      <img className='tube' src='/src/assets/background-TUBE.png' />
      <Player loadout={loadout} />
    </div>
  );
}
