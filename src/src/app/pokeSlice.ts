import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPokes } from "./pokeActions";

interface nameurl {
  name: string;
  url: string;
}

interface Isprite {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

export interface IpokeCard {
  name: string;
  id: number;
  front_default: string;
  abilities: {
    ability: nameurl;
    is_hidden: boolean;
    slot: number;
  }[];
}

export interface IpokeCardBig extends IpokeCard {
  base_experience: number;
  forms: nameurl[];
  game_indices: {
    game_index: number;
    version: nameurl;
  }[];
  height: number;
  held_items: {
    item: nameurl;
    version_details: {
      rarity: number;
      version: nameurl;
    }[];
  }[];
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: nameurl;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: nameurl;
      version_group: nameurl;
    }[];
  }[];
  order: number;
  past_types: [];
  species: nameurl;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: Isprite;
      home: Isprite;
      "official-artwork": Isprite;
    };
    versions: {
      [key: string]: {
        [key: string]: Isprite;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: nameurl;
  }[];
  weight: number;
}

export type TOperation = "add" | "remove";
export type TStatus = "Success" | "Fail" | "None";

export interface IpokeState {
  cards: IpokeCard[];
  total_added: number;
  lastOperation: TOperation | null;
  lastPoke?: string;
  status: {
    [key in TOperation]: TStatus;
  };
}

const initialState: IpokeState = {
  cards: [],
  total_added: 0,
  lastOperation: null,
  status: {
    add: "None",
    remove: "None",
  },
};

export const pokeSlice = createSlice({
  name: "poke",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokes.fulfilled, (state, action) => {
      pokeSlice.caseReducers.add(state, action);
    });
    builder.addCase(fetchPokes.rejected, (state, action) => {
      state.lastOperation = "add";
      state.status.add = "Fail";
      state.lastPoke = action.payload as string;
    });
  },
  reducers: {
    add: (state, action) => {
      state.total_added += 1;
      const newpoke: IpokeCard = {
        name: action.payload.data.name,
        id: state.total_added,
        front_default: action.payload.data.sprites.front_default,
        abilities: [...action.payload.data.abilities],
      };
      state.cards.push(newpoke);
      state.lastPoke = newpoke.name;
      state.status.add = "Success";
      state.lastOperation = "add";
    },
    remove: (state, action: PayloadAction<IpokeCard>) => {
      state.lastPoke = state.cards.find(
        (e) => e.id === action.payload.id
      )?.name;
      state.cards = [
        ...state.cards.filter((el) => el.id !== action.payload.id),
      ];
      state.status.remove = "Success";
      state.lastOperation = "remove";
    },
    hydrate: (state, action) => {
      return action.payload;
    },
  },
});

export const { add, remove, hydrate } = pokeSlice.actions;

export default pokeSlice.reducer;
