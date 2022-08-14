import axios from "axios";

// PokeSlide.hooks.ts
export const WIDTH_BREAKPOINT = 650;
export const SMALL_WIDTH_CARDS_NUM = 3;
export const BIG_WIDTH_CARDS_NUM = 5;
export const AXIOS_REQUEST = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon`,
});
export const OFFSET_MIN = 0;
export const OFFSET_MAX = 1150;
