import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react';

import './App.css';
import BattlePass from './BattlePass';
import Loadout from './Loadout';
import Modal from './Modal';
import Play from './Play';
import Quests from './Quests';
import Shop from './Shop';
import { items } from './items';
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
    items: [],
    loadout: {},
  });

  const [seenIntro, setSeenIntro] = useState(false);
  const [seenBucks, setSeenBucks] = useState(false);
  const [seenLoadout, setSeenLoadout] = useState(false);

  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [showGonkHighlight, setShowGonkHighlight] = useState(false);

  const intro = useMemo(() => (
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
  ), []);

  const freeBucks = useMemo(() => (
    <>
      <p>Season 98 has started!</p>
      <p>As a special offer, we're giving you 500 free <span className='gonktext'>Gonks</span> to spend!</p>
      <button
        type='button'
        onClick={() => {
          setSeenBucks(true);
          setPage('Gonk Shop');
        }}
      >
        Go to Gonk Shop
      </button>
    </>
  ), []);

  const spendGonks = useMemo(() => (
    <>
      <p>You have unspent <span className='gonktext'>Gonks</span>! Time to load up on items from the shop!</p>
      <button
        type='button'
        onClick={() => setPage('Gonk Shop')}
      >
        Go to Gonk Shop
      </button>
    </>
  ), []);

  const gotoLoadout = useMemo(() => (
    <>
      <p>Don't forget to equip your hard-earned items in your Loadout!</p>
      <button
        type='button'
        onClick={() => {
          setSeenLoadout(true);
          setPage('Loadout');
        }}
      >
        Go to Loadout
      </button>
    </>
  ), []);

  const justBoughtItem = useMemo(() => items.find(item => item.name === state.justBought), [state.justBought]);
  const boughtItem = useMemo(() => (
    <>
      <p>UNLOCKED!</p>
      <div className='boughtitem'>
        <img className={justBoughtItem?.slot} src={justBoughtItem?.url} />
      </div>
      <button
        type='button'
        onClick={() => setState(prev => ({ ...prev, justBought: null }))}
      >
        Yay!
      </button>
    </>
  ), [justBoughtItem]);

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
    else if (page === 'Play' && !seenLoadout && !(state.loadout.hat && state.loadout.face && state.loadout.top && state.loadout.bottom)) {
      setModalContent(gotoLoadout);
    }
    else if (state.justBought) {
      setModalContent(boughtItem);
    }
    else {
      setModalContent(null);
      setShowGonkHighlight(false);
    }
  }, [
    seenIntro, seenBucks, seenLoadout, page,
    state.gonks, state.loadout, state.justBought,
    intro, freeBucks, spendGonks, boughtItem,
  ]);

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

      <PageComponent state={state} setState={setState} />

      <Modal>{modalContent}</Modal>

      {showGonkHighlight && <img className='gonk-highlight' src={burstImg} />}

      <footer>
        {state.gonks !== undefined && <span><img src={gonkImg} /> {state.gonks}</span>}
      </footer>
    </div>
  );
}
