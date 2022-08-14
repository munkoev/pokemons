import styles from './PokeList.module.scss'
import PokeCard from '../PokeCard/PokeCard'
import { useAppSelector } from "../../app/hooks";

const PokeList = () => {
    const cards = useAppSelector(state => state.poke.cards)

    return (<div className={styles.list}>
        {[...cards].reverse().map((e,i) => {
            return (<PokeCard card={e} key={i}/>)
        })}
    </div>)
}

export default PokeList;