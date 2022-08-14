import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as Constants from "../../app/constants";
import { add, changeOffset } from "../../app/pokeSlice";

export interface IfetchedPokemon {
  name: string;
  url: string;
  sprite?: string;
}

interface IFetchedPokes {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: IfetchedPokemon[];
  };
}

const usePokeSlideHook = () => {
  const offset = useAppSelector((state) => {
    return state.poke.offset;
  });
  const [pokes, setPokes] = useState<IfetchedPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [slidesNum, setSlidesNum] = useState(
    window.innerWidth < Constants.WIDTH_BREAKPOINT
      ? Constants.SMALL_WIDTH_CARDS_NUM
      : Constants.BIG_WIDTH_CARDS_NUM
  );

  useEffect(() => {
    window.onresize = () => {
      setSlidesNum(
        window.innerWidth < Constants.WIDTH_BREAKPOINT
          ? Constants.SMALL_WIDTH_CARDS_NUM
          : Constants.BIG_WIDTH_CARDS_NUM
      );
    };
  }, []);

  useEffect(() => {
    const getPokes = async () => {
      setLoading(true);
      const fetched_pokes = (await Constants.AXIOS_REQUEST.get(
        `?limit=${slidesNum}&offset=${offset}`
      )) as IFetchedPokes;
      for (const e of fetched_pokes.data.results) {
        e.sprite = (await axios.get(e.url)).data.sprites.front_default;
      }
      setPokes(fetched_pokes.data.results);
      setLoading(false);
    };
    getPokes().catch(console.error);
  }, [offset, slidesNum]);

  const onLeftArrClick = () => {
    if (offset + slidesNum >= Constants.OFFSET_MIN) {
      dispatch(changeOffset(-slidesNum));
    } else {
      dispatch(changeOffset(Constants.OFFSET_MIN));
    }
  };
  const onRightArrClick = () => {
    if (offset + slidesNum <= Constants.OFFSET_MAX) {
      dispatch(changeOffset(slidesNum));
    } else {
      dispatch(changeOffset(Constants.OFFSET_MAX));
    }
  };

  const dispatch = useAppDispatch();
  const onCardClickHandler = async (el: IfetchedPokemon) => {
    const data = await axios.get(el.url);
    dispatch(add(data));
  };

  return {
    pokes,
    onLeftArrClick,
    onCardClickHandler,
    onRightArrClick,
    slidesNum,
    loading,
  };
};

export default usePokeSlideHook;
