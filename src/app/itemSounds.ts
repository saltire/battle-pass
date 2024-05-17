import bubbleHelmet from '../assets/sounds/clothes/Bubble Helmet.mp3';
import chainmail1 from '../assets/sounds/clothes/Chainmail 1.mp3';
import chainmail2 from '../assets/sounds/clothes/Chainmail 2.mp3';
import chainmail3 from '../assets/sounds/clothes/Chainmail 3.mp3';
import chainmail4 from '../assets/sounds/clothes/Chainmail 4.mp3';
import chainmail5 from '../assets/sounds/clothes/Chainmail 5.mp3';
import coolShades from '../assets/sounds/clothes/Cool Shades.mp3';
import fancy1 from '../assets/sounds/clothes/Fancy 1.mp3';
import fancy2 from '../assets/sounds/clothes/Fancy 2.mp3';
import fancy3 from '../assets/sounds/clothes/Fancy 3.mp3';
import fancy4 from '../assets/sounds/clothes/Fancy 4.mp3';
import goggles from '../assets/sounds/clothes/Goggles.mp3';
import hoodie from '../assets/sounds/clothes/Hoodie.mp3';
import pants1 from '../assets/sounds/clothes/Pants 1.mp3';
import pants2 from '../assets/sounds/clothes/Pants 2.mp3';
import pants3 from '../assets/sounds/clothes/Pants 3.mp3';
import shirt1 from '../assets/sounds/clothes/Shirt 1.mp3';
import shirt2 from '../assets/sounds/clothes/Shirt 2.mp3';
import shirt3 from '../assets/sounds/clothes/Shirt 3.mp3';
import snapHat1 from '../assets/sounds/clothes/Snap Hat 1.mp3';
import snapHat2 from '../assets/sounds/clothes/Snap Hat 2.mp3';
import snapHat3 from '../assets/sounds/clothes/Snap Hat 3.mp3';
import velcroHat1 from '../assets/sounds/clothes/Velcro Hat 1.mp3';
import velcroHat2 from '../assets/sounds/clothes/Velcro Hat 2.mp3';
import goat1 from '../assets/sounds/Goat 1.mp3';
import goat2 from '../assets/sounds/Goat 2.mp3';
import goat3 from '../assets/sounds/Goat 3.mp3';

const bubbleHelmetAudios = [
  new Audio(bubbleHelmet),
];
const chainmailAudios = [
  new Audio(chainmail1),
  new Audio(chainmail2),
  new Audio(chainmail3),
  new Audio(chainmail4),
  new Audio(chainmail5),
];
const coolShadesAudios = [
  new Audio(coolShades),
];
const fancyAudios = [
  new Audio(fancy1),
  new Audio(fancy2),
  new Audio(fancy3),
  new Audio(fancy4),
];
const gogglesAudios = [
  new Audio(goggles),
];
const hoodieAudios = [
  new Audio(hoodie),
];
const pantsAudios = [
  new Audio(pants1),
  new Audio(pants2),
  new Audio(pants3),
];
const shirtAudios = [
  new Audio(shirt1),
  new Audio(shirt2),
  new Audio(shirt3),
];
const snapHatAudios = [
  new Audio(snapHat1),
  new Audio(snapHat2),
  new Audio(snapHat3),
];
const velcroHatAudios = [
  new Audio(velcroHat1),
  new Audio(velcroHat2),
];
const goatAudios = [
  new Audio(goat1),
  new Audio(goat2),
  new Audio(goat3),
];

export const slotSounds: { [index: string]: HTMLAudioElement[] } = {
  hat: snapHatAudios,
  face: gogglesAudios,
  top: shirtAudios,
  bottom: pantsAudios,
};

export const itemSounds: { [index: string]: HTMLAudioElement[] } = {
  bubble: bubbleHelmetAudios,
  monocle: fancyAudios,
  shades: coolShadesAudios,
  GOAP: goatAudios,
  hoodie: hoodieAudios,
  armor: chainmailAudios,
};
