import './Play.css';
import { PageProps } from './types';

export default function Play({ state, setState }: PageProps) {
  return (
    <div className='Play'>
      <div className='title'><div className='overlay' /></div>

      <h1>SEASON 98</h1>

      <button type='button' disabled={state.loading} onClick={() => setState(prev => ({ ...prev, play: true }))}>
        {state.loading ? 'Loading...' : 'Play Game'}
      </button>
    </div>
  );
}
