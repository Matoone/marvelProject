import { Character } from "../components/CharacterCard";

export type Rules = {
  [key in Status]: Rule;
};

export type Rule = {
  label: string;
  iterations: () => number;
  collect?: () => {};
};

export interface Stats {
  xp: number;
  tire: number;
  hp: number;
}

export enum Status {
  idle = "idle",
  move = "move",
  train = "train",
  heal = "heal",
  rest = "rest",
  fight = "fight",
}

export interface Collect {
  xp?: number;
  hp?: number;
  tire?: number;
}

export interface LoopState {
  totalIterations: number;
  iterations: number;
  progress: number;
  status: Status;
  nextLoopStatus: Status;
}
export enum Place {
  Home = "Home",
  TrainingGroud = "TrainingGround",
  Arena = "Arena",
  Hospital = "Hospital",
}

export interface CharacterWithPlace extends Character {
  place: Place;
}
