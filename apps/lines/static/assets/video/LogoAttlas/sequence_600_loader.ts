import { Assets, AnimatedSprite, Texture } from 'pixi.js';

const pageUrls = [
  '/assets/logo/sequence_600_0.json',
  '/assets/logo/sequence_600_1.json',
  '/assets/logo/sequence_600_2.json',
  '/assets/logo/sequence_600_3.json'
];

export async function createLogoAnimation(): Promise<AnimatedSprite> {
  const sheets = await Promise.all(pageUrls.map((url) => Assets.load(url)));
  const textures: Texture[] = sheets.flatMap((sheet) => sheet.animations.sequence);
  const animation = new AnimatedSprite(textures);
  animation.anchor.set(0.5);
  animation.width = 375;
  animation.height = 375;
  animation.animationSpeed = 0.5;
  animation.loop = true;
  animation.play();
  return animation;
}
