export const hat = [
  'hat_ballcap-blue',
  'hat_ballcap-green',
  'hat_ballcap-moregreen',
  'hat_ballcap-pink',
  'hat_ballcap-purple',
  'hat_ballcap-red',
  'hat_bowler',
  'hat_bubble-helmet',
  'hat_propeller-beanie',
  'hat_tophat',
];
export const face = [
  'face_goggles',
];
export const shirt = [
  'top_shirt-black',
  'top_shirt-bluestripe',
  'top_shirt-greenstripe',
  'top_shirt-magenta',
  'top_shirt-ochre',
  'top_shirt-purplegreen',
];
export const pants = [
  'bottom_pants-black',
  'bottom_pants-blue',
  'bottom_pants-magenta',
  'bottom_pants-purplegreen',
  'bottom_pants-teal',
];

export type Item = {
  slot: string,
  name: string,
};

export const items: Item[] = [
  ...hat.map(name => ({ slot: 'hat', name })),
  ...face.map(name => ({ slot: 'face', name })),
  ...shirt.map(name => ({ slot: 'shirt', name })),
  ...pants.map(name => ({ slot: 'pants', name })),
];
