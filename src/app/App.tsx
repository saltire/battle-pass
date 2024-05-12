import { ComponentType, ReactNode, useEffect, useState } from 'react';

import './App.css';
import BattlePass from './BattlePass';
import Loadout from './Loadout';
import Modal from './Modal';
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

  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const intro = (
    <>
      Hello
      <button type='button' onClick={() => setModalContent(freeBucks)}>OK</button>
    </>
  );

  const freeBucks = (
    <>
      Free bucks!
      <button type='button' onClick={() => setModalContent(undefined)}>OK</button>
    </>
  );

  useEffect(() => {
    setModalContent(intro);
  }, []);

  return (
    <div className={`App page-${page}`}>
      <header>
        {Object.keys(pages).map(p => (
          <button
            key={p}
            type='button'
            className={[page === p && 'active', p === 'Battle Pass' && 'battle'].filter(Boolean).join(' ')}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </header>

      <PageComponent />

      <Modal>{modalContent}</Modal>

      <footer></footer>
    </div>
  );
}
