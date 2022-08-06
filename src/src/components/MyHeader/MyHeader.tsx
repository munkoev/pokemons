import React from "react";
import styles from './MyHeader.module.css'
import axios from 'axios'
import { add } from '../../app/pokeSlice';
import { useAppDispatch } from '../../app/hooks'

interface IfetchedPokemon {
    name: string,
    url: string
}

const MyHeader = () => {
    let val = '';
    const dispatch = useAppDispatch();

    return (<header className={styles.myheader}>
        <p>Type in pokemon's name and press enter: (for ex. pikachu)</p>
        <input
            className={styles.inp}
            id='inp'
            onChange={(e) => {val = e.target.value}}
            onKeyPress={async (e) => {
                if (e.key === 'Enter') {
                    const fetched_poke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
                    const f = fetched_poke.data.results.find((e: IfetchedPokemon) => e.name === val)
                    const data = await axios.get(f.url)
                    dispatch(add(data));
                }
            }}
            ></input>
    </header>)
}

export default MyHeader;