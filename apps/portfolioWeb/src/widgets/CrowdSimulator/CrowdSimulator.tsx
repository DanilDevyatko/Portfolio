import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import crowdPng from '../../assets/crowed.png';

type Config = {
  src: string;
  rows: number;
  cols: number;
};

type Stage = {
  width: number;
  height: number;
};

type SpriteRect = [number, number, number, number];

type Peep = {
  image: HTMLImageElement;
  rect: SpriteRect;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: 1 | -1;
  walk: gsap.core.Timeline | null;
  drawArgs: [
    HTMLImageElement,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
};

type ResetProps = {
  startX: number;
  startY: number;
  endX: number;
};

type WalkFactory = (args: { peep: Peep; props: ResetProps }) => gsap.core.Timeline;

const CONFIG: Config = {
  src: crowdPng,
  rows: 15,
  cols: 7,
};

const randomRange = (min: number, max: number): number =>
  min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const randomIndex = (arrayLength: number): number => randomRange(0, arrayLength) | 0;

const removeAt = <T,>(array: T[], index: number): T | undefined => {
  if (index < 0 || index >= array.length) return undefined;
  return array.splice(index, 1)[0];
};

const removeRandom = <T,>(array: T[]): T | undefined =>
  removeAt(array, randomIndex(array.length));

const removeItem = <T,>(array: T[], item: T): void => {
  const index = array.indexOf(item);
  if (index >= 0) array.splice(index, 1);
};

const pickRandom = <T,>(array: T[]): T | undefined => array[randomIndex(array.length)];

const createPeep = (image: HTMLImageElement, rect: SpriteRect): Peep => {
  const width = rect[2];
  const height = rect[3];

  return {
    image,
    rect,
    width,
    height,
    x: 0,
    y: 0,
    anchorY: 0,
    scaleX: 1,
    walk: null,
    drawArgs: [image, rect[0], rect[1], rect[2], rect[3], 0, 0, width, height],
  };
};

const setPeepScale = (peep: Peep, scale: number): void => {
  peep.width = peep.rect[2] * scale;
  peep.height = peep.rect[3] * scale;
  peep.drawArgs[7] = peep.width;
  peep.drawArgs[8] = peep.height;
};

const renderPeep = (ctx: CanvasRenderingContext2D, peep: Peep): void => {
  ctx.save();
  ctx.translate(peep.x, peep.y);
  ctx.scale(peep.scaleX, 1);
  ctx.drawImage(...peep.drawArgs);
  ctx.restore();
};

const createPeeps = (image: HTMLImageElement): Peep[] => {
  const { rows, cols } = CONFIG;
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  const total = rows * cols;
  const rectWidth = width / rows;
  const rectHeight = height / cols;

  const peeps: Peep[] = [];

  for (let i = 0; i < total; i++) {
    const rect: SpriteRect = [
      (i % rows) * rectWidth,
      ((i / rows) | 0) * rectHeight,
      rectWidth,
      rectHeight,
    ];

    peeps.push(createPeep(image, rect));
  }

  return peeps;
};

const getSpriteScale = (stage: Stage, basePeepHeight: number): number => {
  const widthScale = Math.min(1.6, Math.max(0.42, stage.width / 900));
  const maxAllowedHeight = Math.max(96, stage.height * 0.94);
  const heightScale = Math.min(1.6, maxAllowedHeight / basePeepHeight);
  return Math.min(widthScale, heightScale);
};

const resetPeep = (stage: Stage, peep: Peep): ResetProps => {
  const direction: 1 | -1 = Math.random() > 0.5 ? 1 : -1;

  // Skew random to lower values to keep feet inside viewport on small heights.
  const ease = gsap.parseEase('power2.in') as (v: number) => number;
  const maxHidden = Math.min(40, peep.height * 0.35);
  const maxLift = Math.min(120, stage.height * 0.45);
  const offsetY = maxHidden - maxLift * ease(Math.random());
  const rawStartY = stage.height - peep.height + offsetY;
  const minStartY = 8;
  const maxStartY = stage.height - peep.height + maxHidden;
  const startY = clamp(rawStartY, minStartY, maxStartY);

  let startX: number;
  let endX: number;

  if (direction === 1) {
    startX = -peep.width;
    endX = stage.width;
    peep.scaleX = 1;
  } else {
    startX = stage.width + peep.width;
    endX = 0;
    peep.scaleX = -1;
  }

  peep.x = startX;
  peep.y = startY;
  peep.anchorY = startY;

  return { startX, startY, endX };
};

const normalWalk: WalkFactory = ({ peep, props }) => {
  const { startY, endX } = props;

  const xDuration = 10;
  const yDuration = 0.25;

  const timeline = gsap.timeline();
  timeline.timeScale(randomRange(0.5, 1.5));

  timeline.to(
    peep,
    {
      duration: xDuration,
      x: endX,
      ease: 'none',
    },
    0,
  );

  const bobY = Math.max(0, startY - 10);

  timeline.to(
    peep,
    {
      duration: yDuration,
      repeat: xDuration / yDuration,
      yoyo: true,
      y: bobY,
    },
    0,
  );

  return timeline;
};

const WALKS: WalkFactory[] = [normalWalk];

export function CrowdSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stage: Stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    let isAlive = true;
    let image: HTMLImageElement | null = new Image();

    const removePeepFromCrowd = (peep: Peep): void => {
      removeItem(crowd, peep);
      availablePeeps.push(peep);
    };

    const addPeepToCrowd = (): void => {
      const peep = removeRandom(availablePeeps);
      if (!peep) return;

      const walkFactory = pickRandom(WALKS);
      if (!walkFactory) {
        availablePeeps.push(peep);
        return;
      }

      peep.walk = walkFactory({
        peep,
        props: resetPeep(stage, peep),
      }).eventCallback('onComplete', () => {
        if (!isAlive) return;
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const initCrowd = (): void => {
      while (availablePeeps.length > 0) {
        addPeepToCrowd();
      }

      for (const peep of crowd) {
        peep.walk?.progress(Math.random());
      }
    };

    const resize = (): void => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width <= 0 || height <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      stage.width = width;
      stage.height = height;

      const basePeepHeight = allPeeps[0]?.rect[3] ?? 1;
      const spriteScale = getSpriteScale(stage, basePeepHeight);
      for (const peep of allPeeps) setPeepScale(peep, spriteScale);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      for (const peep of crowd) peep.walk?.kill();

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    const render = (): void => {
      const dpr = window.devicePixelRatio || 1;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const peep of crowd) renderPeep(ctx, peep);
    };

    let resizeObserver: ResizeObserver | null = null;

    image.onload = () => {
      if (!isAlive || !image) return;

      allPeeps.push(...createPeeps(image));
      availablePeeps.push(...allPeeps);
      resize();

      gsap.ticker.add(render);

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      window.addEventListener('resize', resize, { passive: true });
      window.visualViewport?.addEventListener('resize', resize, { passive: true });
    };

    image.src = CONFIG.src;

    return () => {
      isAlive = false;

      window.removeEventListener('resize', resize);
      window.visualViewport?.removeEventListener('resize', resize);
      resizeObserver?.disconnect();
      gsap.ticker.remove(render);

      for (const peep of crowd) peep.walk?.kill();

      allPeeps.length = 0;
      availablePeeps.length = 0;
      crowd.length = 0;

      if (image) image.onload = null;
      image = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

// Backward-compatible export for existing imports.
export { CrowdSimulator as CrowedSimulator };
