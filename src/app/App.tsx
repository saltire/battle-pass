import { ComponentType, useState } from 'react';

import './App.css';
import BattlePass from './BattlePass';
import Loadout from './Loadout';
import Play from './Play';
import Quests from './Quests';
import Shop from './Shop';

const pages: { [index: string]: ComponentType } = {
  Play,
  Loadout,
  Shop,
  'Battle Pass': BattlePass,
  Quests,
};

export default function App() {
  const [page, setPage] = useState('Play');
  const PageComponent = pages[page];

  return (
    <div className='App'>
      <header>
        {Object.keys(pages).map(p => (
          <button
            key={p}
            type='button'
            className={page === p ? 'active' : undefined}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </header>

      <PageComponent />

      <footer></footer>
    </div>
  );
}
