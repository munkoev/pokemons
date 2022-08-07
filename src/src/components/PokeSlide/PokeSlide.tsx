import React, { useEffect, useState } from 'react'
import styles from './PokeSlide.module.css'
import axios from "axios";
import { useAppDispatch } from '../../app/hooks';
import { add } from '../../app/pokeSlice';

interface IfetchedPokemon {
    name: string,
    url: string,
    sprite?: string
}

const PokeSlide = () => {
    const [offset, setOffset] = useState(0);
    const arr: any[] = [];
    const [pokes, setPokes] = useState(arr);

    useEffect(() => {
        const getPokes = async () => {
            const fetched_pokes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`);
            const res = [...fetched_pokes.data.results];
            for (const e of res) {
                e.sprite =  (await axios.get(e.url)).data.sprites.front_default
            }
            setPokes(res);
        }
        getPokes()
        .catch(console.error)
    }, [offset])

    const onLeftArrClick = () => {
        if (offset !== 0) {
            setOffset(offset - 5);
        }
    }
    const onRightArrClick = () => {
        if (offset <= 1150) {
            setOffset(offset + 5);
        }
    }

    const dispatch = useAppDispatch();
    const onCardClickHandler = async (el: IfetchedPokemon) => {
        const data = await axios.get(el.url);
        dispatch(add(data));
    }

    return (<div className={styles.wrapper}>
        <div className={[styles.arrow, styles.noselect].join(' ')}
            onClick={onLeftArrClick}>{'<'}</div>
        <div className={styles.list}>
            {pokes.map(e => {
                return (<div
                            key={e.name}
                            className={[styles.smallcard, styles.noselect].join(' ')}
                            onClick={onCardClickHandler.bind(null, e)}>
                        <img width="20px" height="20px" alt="" src={e.sprite}/>
                        <div className={"pokename"}>{e.name}</div>
                    </div>)
            })}
        </div>
        <div className={[styles.arrow, styles.noselect].join(' ')}
            onClick={onRightArrClick}>{'>'}</div>
    </div>)
}

export default PokeSlide;