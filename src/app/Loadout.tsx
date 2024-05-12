import { useState } from 'react';

import './Loadout.css';
import Player, { PlayerLoadout } from './Player';
import { items } from './items';

export default function Loadout() {
  const [loadout, setLoadout] = useState<PlayerLoadout>({});
  const [page, setPage] = useState(0);
  const lastPage = Math.floor(items.length / 15);

  return (
    <div className='Loadout'>
      <div className='items'>
        {items.slice(page * 15, (page + 1) * 15).map(({ slot, name }) => (
          <button
            key={name}
            type='button'
            className={slot}
            onClick={() => setLoadout(prev => ({ ...prev, [slot]: name }))}
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

      <img className='tube' src='/src/assets/background-TUBE.png' />
      <Player loadout={loadout} />
    </div>
  );
}
