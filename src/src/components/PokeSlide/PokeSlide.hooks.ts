import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { add } from "../../app/pokeSlice";
import * as Constants from "../../app/constants";

export interface IfetchedPokemon {
  name: string;
  url: string;
  sprite?: string;
}

const usePokeSlideHook = () => {
  const [offset, setOffset] = useState(0);
  const [pokes, setPokes] = useState([] as any[]);
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
      const fetched_pokes = await Constants.AXIOS_REQUEST.get(
        `?limit=${slidesNum}&offset=${offset}`
      );
      for (const e of fetched_pokes.data.results) {
        e.sprite = (await axios.get(e.url)).data.sprites.front_default;
      }
      setPokes(fetched_pokes.data.results);
      setLoading(false)
    };
    getPokes().catch(console.error);
  }, [offset, slidesNum]);

  const onLeftArrClick = () => {
    if (offset !== Constants.OFFSET_MIN) {
      setOffset(offset - slidesNum);
    }
  };
  const onRightArrClick = () => {
    if (offset <= Constants.OFFSET_MAX) {
      setOffset(offset + slidesNum);
    }
  };

  const dispatch = useAppDispatch();
  const onCardClickHandler = async (el: IfetchedPokemon) => {
    const data = await axios.get(el.url);
    dispatch(add(data));
  };

  return { pokes, onLeftArrClick, onCardClickHandler, onRightArrClick, slidesNum, loading };
};

export default usePokeSlideHook;
