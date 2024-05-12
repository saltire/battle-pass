import './Quests.css';
import { PageProps, Quest } from './types';
import checkImg from '../assets/check.png';
import starImg from '../assets/currency_XP-ribbon.png';

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

export default function Quests({ state }: PageProps) {
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
    </div>
  );
}
