import './Quests.css';
import { PageProps, Quest } from './types';
import checkImg from '../assets/check.png';
import starImg from '../assets/currency_XP-ribbon.png';
import zoidImg from '../assets/currency_ZOID.png';

export const quests: Quest[] = [
  {
    id: 'gonks100',
    title: 'New Customer',
    desc: <>Spend 100 <span className='gonkstext'>Gonks</span>.</>,
    condition: state => state.gonksSpent >= 100,
    stars: 25,
  },
  {
    id: 'gonks500',
    title: 'Dropping Gonks',
    desc: <>Spend 500 <span className='gonkstext'>Gonks</span>.</>,
    condition: state => state.gonksSpent >= 500,
    stars: 75,
  },
];

const rewards: { [index: number]: number } = {
  2: 100,
  3: 200,
  4: 400,
  5: 800,
};

export default function Quests({ state, setState }: PageProps) {
  return (
    <div className='Quests'>
      <div className='quest-list'>
        {quests.map(quest => (
          <div key={quest.id} className={state.quests.includes(quest.id) ? 'completed' : ''}>
            <div>
              <p>{quest.title}</p>
              <p className='desc'>{quest.desc}</p>
            </div>
            <div className='xp'>
              {state.quests.includes(quest.id) && <img src={checkImg} />}
              <img src={starImg} /> {quest.stars}
            </div>
          </div>
        ))}
      </div>

      <div className='rewards'>
        <h2>Rewards</h2>

        <div className='meter'>
          <div className='meter-fill' style={{ width: `${state.stars / 4}%` }} />
        </div>

        <div className='levels'>
          {[1, 2, 3, 4, 5].map(lvl => (
            <div key={lvl}>
              <span className='lvl'>{lvl}</span>
              <button
                type='button'
                disabled={state.level < lvl || state.levelClaimed !== lvl - 1}
                onClick={() => {
                  setState(prev => ({
                    ...prev,
                    zoids: (prev.zoids || 0) + rewards[lvl],
                    levelClaimed: lvl,
                  }));
                }}
              >
                {!!rewards[lvl] && <><img className='zoid' src={zoidImg} /> {rewards[lvl]}</>}
                {state.levelClaimed >= lvl && <img className='check' src={checkImg} />}
              </button>
              {state.level >= lvl && state.levelClaimed === lvl - 1 && <span className='claim'>CLAIM!</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
