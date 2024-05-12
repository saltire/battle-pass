import { useEffect, useState } from 'react';
import './Game.css';
import funkJungle from '../assets/Funk Jungle.mp3';

const funkJungleAudio = new Audio(funkJungle);
funkJungleAudio.loop = true;
funkJungleAudio.volume = 0.5;

type GameProps = {
  onExit: () => void,
};

export default function Game({ onExit }: GameProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    funkJungleAudio.play();
    setTimeout(() => {
      funkJungleAudio.pause();
      setLoading(false);
    }, 5000);
  }, []);

  return loading ? (
    <div className='Game loading'>
      <h1>GET READY TO GONK!!!!</h1>
    </div>
  ) : (
    <div className='Game error'>
      <p><em>ERROR GONKAZOID.EXE</em></p>

      <p>
        The server is currently unreachable.
        This is undoubtably due to GONKAZOID's massive popularity.
      </p>

      <p>
        Please try again in a few minutes.
        In the meantime, please take a look at the items in the <a onClick={() => onExit()}>Gonk Shop</a>!
      </p>
    </div>
  );
}
