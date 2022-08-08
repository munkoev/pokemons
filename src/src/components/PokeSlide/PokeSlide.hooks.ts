import axios from 'axios';
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import { add } from '../../app/pokeSlice';

export interface IfetchedPokemon {
    name: string,
    url: string,
    sprite?: string
}

const usePokeSlideHook = () => {
    const [offset, setOffset] = useState(0);
    const [pokes, setPokes] = useState([] as any[]);
    
    const [slidesNum, setSlidesNum] = useState(window.innerWidth < 650 ? 3 : 5)

    useEffect(() => {
        window.onresize = () => {
            setSlidesNum(window.innerWidth < 650 ? 3 : 5);
        }
    }, [])

    useEffect(() => {
        const getPokes = async () => {
            const fetched_pokes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${slidesNum}&offset=${offset}`);
            for (const e of fetched_pokes.data.results) {
                e.sprite =  (await axios.get(e.url)).data.sprites.front_default
            }
            setPokes(fetched_pokes.data.results);
        }
        getPokes().catch(console.error)
    }, [offset, slidesNum])

    const onLeftArrClick = () => {
        if (offset !== 0) {
            setOffset(offset - slidesNum);
        }
    }
    const onRightArrClick = () => {
        if (offset <= 1150) {
            setOffset(offset + slidesNum);
        }
    }

    const dispatch = useAppDispatch();
    const onCardClickHandler = async (el: IfetchedPokemon) => {
        const data = await axios.get(el.url);
        dispatch(add(data));
    }

    return { pokes, onLeftArrClick, onCardClickHandler, onRightArrClick }
}

export default usePokeSlideHook;