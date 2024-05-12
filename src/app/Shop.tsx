import { useState } from 'react';

import './Shop.css';
import { items } from './items';
import { icons } from './slots';
import { PageProps } from './types';
import gonkImg from '../assets/currency_GONK.png';
import bling1 from '../assets/sounds/Bling 1.mp3';
import bling2 from '../assets/sounds/Bling 2.mp3';
import bling3 from '../assets/sounds/Bling 3.mp3';
import bling4 from '../assets/sounds/Bling 4.mp3';
import bling5 from '../assets/sounds/Bling 5.mp3';
import bling6 from '../assets/sounds/Bling 6.mp3';
import bling7 from '../assets/sounds/Bling 7.mp3';

const blings = [
  new Audio(bling1),
  new Audio(bling2),
  new Audio(bling3),
  new Audio(bling4),
  new Audio(bling5),
  new Audio(bling6),
  new Audio(bling7),
];

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
            <div key={name} className={value > (state.gonks || 0) ? 'locked' : ''}>
              <button
                type='button'
                className={name === 'remove' ? 'remove' : slot}
                disabled={value > (state.gonks || 0)}
                onClick={() => {
                  const bling = blings[Math.floor(Math.random() * blings.length)];
                  bling.load();
                  bling.play();

                  setState(prev => ({
                    ...prev,
                    items: [...prev.items, name],
                    gonks: (prev.gonks || 0) - value,
                    gonksSpent: (prev.gonksSpent || 0) + value,
                    justBought: name,
                  }));
                }}
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
