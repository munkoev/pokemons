import styles from './PokeSlide.module.css'
import usePokeSlideHook, { IfetchedPokemon } from './PokeSlide.hooks';

interface IPokePreviewCardProps {
    item: IfetchedPokemon,
    onCardClickHandler: (el: IfetchedPokemon) => Promise<void>
}

const PokePreviewCard = ({ item, onCardClickHandler}: IPokePreviewCardProps) => {
    return (<div
        key={item.name}
        className={[styles.smallcard, styles.noselect].join(' ')}
        onClick={() => onCardClickHandler(item)}>
        <img width="30px" height="30px" alt="" src={item.sprite}/>
        <div className={"pokename"}>{item.name}</div>
    </div>)
}

const PokeSlide = () => {
    const { pokes, onLeftArrClick, onCardClickHandler, onRightArrClick } = usePokeSlideHook();
    
    return (<div className={styles.wrapper}>
        <div className={[styles.arrow, styles.noselect].join(' ')}
            onClick={onLeftArrClick}>{'<'}</div>
        <div className={styles.list}>
            {pokes.map(e => {
                return (<PokePreviewCard item={e} onCardClickHandler={onCardClickHandler}/>)
            })}
        </div>
        <div className={[styles.arrow, styles.noselect].join(' ')}
            onClick={onRightArrClick}>{'>'}</div>
    </div>)
}

export default PokeSlide;