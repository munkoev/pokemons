import { IfetchedPokemon } from "../PokeSlide/PokeSlide.hooks"
import styles from './PokePreviewCard.module.scss'

interface IPokePreviewCardProps {
    item: IfetchedPokemon,
    onCardClickHandler: (el: IfetchedPokemon) => Promise<void>
}

const PokePreviewCard = ({ item, onCardClickHandler}: IPokePreviewCardProps) => {
    return (<div
        key={item.name}
        className={[styles.smallcard, styles.noselect].join(' ')}
        onClick={() => onCardClickHandler(item)}>
        <img className={styles.img} alt="" src={item.sprite}/>
        <div className={"pokename"}>{item.name}</div>
    </div>)
}

export default PokePreviewCard;