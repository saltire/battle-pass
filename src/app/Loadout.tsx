import { useState } from 'react';

import './Loadout.css';
import Player from './Player';
import { items } from './items';
import { icons } from './slots';
import checkImg from '../assets/check.png';
import removeImg from '../assets/remove.png';
import tubeImg from '../assets/background-TUBE.png';
import { PageProps } from './types';

export default function Loadout({ state, setState }: PageProps) {
  const [viewSlot, setViewSlot] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const playerItems = items.filter(item => state.items.includes(item.name));

  const filteredItems = [
    ...viewSlot ? [{ slot: viewSlot, name: 'remove', url: removeImg }] : [],
    ...playerItems.filter(item => !viewSlot || item.slot === viewSlot),
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
              disabled={!playerItems.some(item => slot === 'all' || item.slot === slot)}
              onClick={() => {
                setViewSlot(slot === 'all' ? null : slot);
                setPage(0);
              }}
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
              onClick={() => setState(prev => ({ ...prev, loadout: { ...prev.loadout, [slot]: name === 'remove' ? null : name } }))}
            >
              <img className='item' src={url} />
              {state.loadout[slot] === name && <img className='check' src={checkImg} />}
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

      <img className='tube' src={tubeImg} />
      <Player loadout={state.loadout} />
    </div>
  );
}
