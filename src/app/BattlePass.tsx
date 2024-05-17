import { useState } from 'react';

import './BattlePass.css';
import { PageProps } from './types';
import Modal from './Modal';
import lootboxImg from '../assets/loot-box-closed.png';
import zoidImg from '../assets/currency_ZOID.png';
import outerSpace from '../assets/sounds/Outer Space.mp3';

const outerSpaceAudio = new Audio(outerSpace);

export default function BattlePass({ state, setState }: PageProps) {
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <div className='BattlePass'>
      <div className='header'>
        <h1>
          ZOID PASS
          <h1>ZOID PASS</h1>
        </h1>
      </div>

      {showPurchase && (
        <Modal>
          <p>Visit www.gonkazoid.slime to purchase <span className='zoidtext'>Zoids</span> for a very reasonable price!</p>
          <button type='button' onClick={() => setShowPurchase(false)}>OK</button>
        </Modal>
      )}

      {state.zoidPass ? (
        <div className='pass'>
          <p>Stay tuned for <span className='goldtext'>ZOID PASS LOOTBOXES</span>!</p>
          <img src={lootboxImg} />
        </div>
      ) : (
        <div className='unlock'>
          <p>Unlock the <span className='goldtext'>ZOID PASS</span> for rare, exclusive rewards!</p>
          <button
            type='button'
            onClick={() => {
              if ((state.zoids || 0) >= 100) {
                setState(prev => ({ ...prev, zoids: (prev.zoids || 0) - 100, zoidPass: true }));
                outerSpaceAudio.play();
              }
              else {
                setShowPurchase(true);
              }
            }}
          >
            <img src={zoidImg} /> 100
          </button>
          <p>Visit <span className='goldtext'>www.gonkazoid.slime</span> to purchase <span className='zoidtext'>Zoids</span>.</p>
        </div>
      )}
    </div>
  );
}
