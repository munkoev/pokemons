import React from "react";
import { useSelector } from "react-redux";
import styles from './PokeList.module.css'
import { RootState } from '../../app/store'
import PokeCard from '../PokeCard/PokeCard'

const PokeList = () => {
    const state = useSelector((state:RootState) => state);

    return (<div className={styles.list}>
        {state.poke.cards.map((e,i) => {
            return (<PokeCard card={e} key={i}/>)
        })}
    </div>)
}

export default PokeList;