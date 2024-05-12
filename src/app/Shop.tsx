import { useState } from 'react';

import './Shop.css';
import { items } from './items';
import { icons } from './slots';
import { PageProps } from './types';
import gonkImg from '../assets/currency_GONK.png';

export default function Shop({ state, setState }: PageProps) {
  const shopItems = items.filter(item => !state.items.includes(item.name));
  const [viewSlot, setViewSlot] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const filteredItems = shopItems.filter(item => !viewSlot || item.slot === viewSlot);
  const lastPage = Math.floor(filteredItems.length / 14);

  return (
    <div className='Shop'>
      <div className='main'>
        <div className='nav'>
          {Object.entries(icons).map(([slot, url]) => (
            <button
              key={slot}
              type='button'
              disabled={!shopItems.some(item => slot === 'all' || item.slot === slot)}
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
          {filteredItems.slice(page * 14, (page + 1) * 14).map(({ name, slot, url, value }) => (
            <div key={name} className={value > state.gonks ? 'locked' : ''}>
              <button
                type='button'
                className={name === 'remove' ? 'remove' : slot}
                disabled={value > state.gonks}
                onClick={() => setState(prev => ({
                  ...prev,
                  items: [...prev.items, name],
                  gonks: prev.gonks - value,
                  gonksSpent: prev.gonksSpent + value,
                  justBought: name,
                }))}
              >
                <img src={url} />
              </button>
              <p><img src={gonkImg} />{value}</p>
            </div>
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
    </div>
  );
}
