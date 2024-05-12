import { ComponentType, ReactNode, useEffect, useState } from 'react';

import './App.css';
import BattlePass from './BattlePass';
import Loadout from './Loadout';
import Modal from './Modal';
import Play from './Play';
import Quests from './Quests';
import Shop from './Shop';
import { GameState, PageProps } from './types';
import burstImg from '../assets/burst.png';
import gonkImg from '../assets/currency_GONK.png';

const pages: { [index: string]: ComponentType<PageProps> } = {
  Play,
  Loadout,
  'Gonk Shop': Shop,
  'Battle Pass': BattlePass,
  Quests,
};

export default function App() {
  const [page, setPage] = useState('Play');
  const PageComponent = pages[page];

  const [state, setState] = useState<GameState>({
    loading: true,
  });

  const [seenIntro, setSeenIntro] = useState(false);
  const [seenBucks, setSeenBucks] = useState(false);

  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [showGonkHighlight, setShowGonkHighlight] = useState(false);

  const intro = (
    <>
      <p>
        Welcome to <strong>GONKAZOID</strong>,
        the retrofuturistic space MMO that has taken the galaxy by storm!
      </p>
      <button type='button' onClick={() => {
        setSeenIntro(true);
        setState(prev => ({ ...prev, gonks: 500 }));
      }}>I'm excited!</button>
    </>
  );

  const freeBucks = (
    <>
      <p>Season 98 has started!</p>
      <p>As a special offer, we're giving you 500 free <span className='gonktext'>Gonks</span> to spend!</p>
      <button
        type='button'
        onClick={() => {
          setSeenBucks(true);
          setShowGonkHighlight(false);
          setPage('Gonk Shop');
        }}
      >
        Go to Gonk Shop
      </button>
    </>
  );

  const spendGonks = (
    <>
      <p>You have unspent <span className='gonktext'>Gonks</span>! Time to load up on items from the shop!</p>
      <button
        type='button'
        onClick={() => {
          setShowGonkHighlight(false);
          setPage('Gonk Shop');
        }}
      >
        Go to Gonk Shop
      </button>
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({ ...prev, loading: false }));
      setModalContent(intro);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!seenIntro) {
      setModalContent(intro);
    }
    else if (!seenBucks) {
      setModalContent(freeBucks);
      setShowGonkHighlight(true);
    }
    else if (page === 'Play' && state.gonks) {
      setModalContent(spendGonks);
      setShowGonkHighlight(true);
    }
    else {
      setModalContent(null);
    }
  }, [seenIntro, seenBucks, page, state.gonks]);

  return (
    <div className={`App page-${page}`}>
      <header>
        {Object.keys(pages).map(p => (
          <button
            key={p}
            type='button'
            disabled={state.loading}
            className={[page === p && 'active', p === 'Battle Pass' && 'battle'].filter(Boolean).join(' ')}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </header>

      <PageComponent state={state} />

      <Modal>{modalContent}</Modal>

      {showGonkHighlight && <img className='gonk-highlight' src={burstImg} />}

      <footer>
        {state.gonks !== undefined && <span><img src={gonkImg} /> {state.gonks}</span>}
      </footer>
    </div>
  );
}
