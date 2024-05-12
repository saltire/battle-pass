import { ComponentType, ReactNode, useEffect, useMemo, useState } from 'react';

import './App.css';
import BattlePass from './BattlePass';
import Game from './Game';
import Loadout from './Loadout';
import Modal from './Modal';
import Play from './Play';
import Quests, { quests } from './Quests';
import Shop from './Shop';
import { items } from './items';
import { GameState, PageProps } from './types';
import burstImg from '../assets/burst.png';
import gonkImg from '../assets/currency_GONK.png';
import zoidImg from '../assets/currency_ZOID.png';
import starImg from '../assets/currency_XP-ribbon.png';
import waitingRoom from '../assets/Waiting Room.mp3';
import glitter1 from '../assets/sounds/Glitter 1.mp3';
import glitter2 from '../assets/sounds/Glitter 2.mp3';
import glitter3 from '../assets/sounds/Glitter 3.mp3';

const pages: { [index: string]: ComponentType<PageProps> } = {
  Play,
  Loadout,
  'Gonk Shop': Shop,
  'Zoid Pass': BattlePass,
  Quests,
};

const waitingRoomAudio = new Audio(waitingRoom);
waitingRoomAudio.loop = true;
waitingRoomAudio.volume = 0.5;

const glitters = [
  new Audio(glitter1),
  new Audio(glitter2),
  new Audio(glitter3),
];

export default function App() {
  const [page, setPage] = useState('Play');
  const PageComponent = pages[page];

  const [state, setState] = useState<GameState>({
    loading: true,
    gonks: 0,
    zoids: 0,
    stars: 0,
    items: [],
    loadout: {},
    quests: [],
    level: 1,
    levelClaimed: 1,
  });

  useEffect(() => {
    if (state.play) {
      waitingRoomAudio.pause();
    }
    else {
      waitingRoomAudio.play();
    }
  }, [state.play]);

  const [seenIntro, setSeenIntro] = useState(false);
  const [seenBucks, setSeenBucks] = useState(false);
  const [seenZoids, setSeenZoids] = useState(false);
  const [seenLoadout, setSeenLoadout] = useState(false);

  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [showLevelHighlight, setShowLevelHighlight] = useState(false);
  const [showStarHighlight, setShowStarHighlight] = useState(false);
  const [showGonkHighlight, setShowGonkHighlight] = useState(false);
  const [showZoidHighlight, setShowZoidHighlight] = useState(false);

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

  const spendZoids = useMemo(() => (
    <>
      <p>You have unspent <span className='zoidtext'>Zoids</span>! Redeem them with your ZOID PASS!</p>
      <button
        type='button'
        onClick={() => {
          setSeenZoids(true);
          setShowZoidHighlight(false);
          setPage('Zoid Pass');
        }}
      >
        Go to ZOID PASS
      </button>
    </>
  ), []);

  const claimRewards = useMemo(() => (
    <>
      <p>You have unclaimed Level Rewards!</p>
      <button
        type='button'
        onClick={() => setPage('Quests')}
      >
        View Level Rewards
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
  const justBought = useMemo(() => justBoughtItem && (
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

  const completedQuest = useMemo(() => quests.find(q => !state.quests.includes(q.id) && q.condition(state)), [state]);
  const questComplete = useMemo(() => completedQuest && (
    <div className='levelup'>
      <h2>QUEST COMPLETED!</h2>
      <p className='questtitle'>{completedQuest.title}</p>
      <p className='questdesc'>{completedQuest.desc}</p>
      <p className='queststars'><img src={starImg} /> {completedQuest.stars}</p>
      <button
        type='button'
        onClick={() => setState(prev => ({
          ...prev,
          quests: [...prev.quests, completedQuest.id],
          stars: (prev.stars || 0) + completedQuest.stars,
        }))}
      >
        Claim
      </button>
    </div>
  ), [completedQuest]);

  const xpLevel = useMemo(() => Math.floor((state.stars || 0) / 100) + 1, [state.stars]);
  const levelUp = useMemo(() => (xpLevel <= state.level ? null : (
    <div className='levelup'>
      <h2 className='orangetext'>LEVEL UP!</h2>
      <p>Congratulations, you've hit level {xpLevel}!</p>
      <button
        type='button'
        onClick={() => {
          setState(prev => ({ ...prev, level: xpLevel }));
          setShowLevelHighlight(false);
          setPage('Quests');
        }}
      >
        View Level Rewards
      </button>
    </div>
  )), [state.level, xpLevel]);

  useEffect(() => {
    setTimeout(() => {
      setState(prev => ({ ...prev, loading: false }));
      setModalContent(intro);
    }, 3000);
  }, []);

  useEffect(() => {
    if (state.loading) {
      // pass
    }
    else if (!seenIntro) {
      setModalContent(intro);
    }
    else if (!seenBucks) {
      setModalContent(freeBucks);
      setShowGonkHighlight(true);
    }
    else if ((!seenZoids || page === 'Play') && state.zoids) {
      setModalContent(spendZoids);
      setShowZoidHighlight(true);
    }
    else if (page === 'Play' && state.gonks) {
      setModalContent(spendGonks);
      setShowGonkHighlight(true);
    }
    else if (page === 'Play' && !seenLoadout && !(state.loadout.hat && state.loadout.face && state.loadout.top && state.loadout.bottom)) {
      setModalContent(gotoLoadout);
    }
    else if (page === 'Play' && state.levelClaimed < state.level) {
      setModalContent(claimRewards);
    }
    else if (justBought) {
      setModalContent(justBought);
    }
    else if (questComplete) {
      glitters[Math.floor(Math.random() * glitters.length)].play();
      setModalContent(questComplete);
    }
    else if (levelUp) {
      glitters[Math.floor(Math.random() * glitters.length)].play();
      setModalContent(levelUp);
      setShowLevelHighlight(true);
    }
    else {
      setModalContent(null);
      setShowGonkHighlight(false);
    }
  }, [
    seenIntro, seenBucks, seenZoids, seenLoadout, page,
    state.loading, state.gonks, state.zoids, state.loadout, state.level, state.levelClaimed,
    intro, freeBucks, spendGonks, justBought, questComplete, levelUp,
  ]);

  return (
    <div className={`App page-${page}`}>
      {state.play ? (
        <Game
          onExit={() => {
            setState(prev => ({ ...prev, play: false }));
            setPage('Gonk Shop');
          }}
        />
      ) : (
        <>
          <header>
            {Object.keys(pages).map(p => (
              <button
                key={p}
                type='button'
                disabled={state.loading}
                className={[page === p && 'active', p === 'Zoid Pass' && 'bigger'].filter(Boolean).join(' ')}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </header>

          <PageComponent state={state} setState={setState} />

          <Modal>{modalContent}</Modal>

          {showLevelHighlight && <img className='level highlight' src={burstImg} />}
          {showStarHighlight && <img className='star highlight' src={burstImg} />}
          {showGonkHighlight && <img className='gonk highlight' src={burstImg} />}
          {showZoidHighlight && <img className='zoid highlight' src={burstImg} />}

          <footer>
            <div className='level'>{xpLevel}</div>
            <span><img src={starImg} /> {state.stars || 0}</span>
            {state.gonks !== undefined && <span><img src={gonkImg} /> {state.gonks}</span>}
            {state.zoids !== undefined && <span><img className='zoids' src={zoidImg} /> {state.zoids}</span>}

            <button
              type='button'
              className='mute'
              onClick={() => {
                if (waitingRoomAudio.volume) {
                  waitingRoomAudio.volume = 0;
                }
                else {
                  waitingRoomAudio.volume = 0.5;
                }
              }}
            >
              Mute
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
