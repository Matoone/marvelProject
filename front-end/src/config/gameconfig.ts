import { Rules, Status } from "../types/gameTypes";

export const placesStatus = {
  Home: Status.rest,
  TrainingGround: Status.train,
  Arena: Status.fight,
  Hospital: Status.heal,
};

export const rules: Rules = {
  idle: {
    label: "Doing nothing",
    iterations: () => 5000 / frameDuration,
  },
  move: {
    label: "Moving...",
    iterations: () => 5000 / frameDuration,
  },
  train: {
    label: "Training...",
    iterations: () => 10000 / frameDuration,
    collect: () => ({ xp: 10, tire: 4 }),
  },
  heal: {
    label: "Healing...",
    iterations: () => 10000 / frameDuration,
    collect: () => ({ hp: 10 }),
  },
  rest: {
    label: "Resting...",
    iterations: () => 10000 / frameDuration,
    collect: () => ({ tire: -10 }),
  },
  fight: {
    label: "Fighting...",
    iterations: () => 15000 / frameDuration,
    collect: () => ({ xp: 30, tire: 30, hp: -20 }),
  },
};

export const frameDuration = 10;
