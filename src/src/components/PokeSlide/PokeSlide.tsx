import styles from "./PokeSlide.module.scss";
import usePokeSlideHook from "./PokeSlide.hooks";
import PokePreviewCard from "../PokePreviewCard/PokePreviewCard";
import arrowimg from "./right-arrow.png";

const PokeSlide = () => {
  const { pokes, onLeftArrClick, onCardClickHandler, onRightArrClick } =
    usePokeSlideHook();

  return (
    <div className={styles.wrapper}>
      <div
        className={[styles.arrow, styles.noselect].join(" ")}
        onClick={onLeftArrClick}
      >
        <img className={styles.leftarrow} alt="arrow" src={arrowimg} />
      </div>
      <div className={styles.list}>
        {pokes.map((e, i) => {
          return (
            <PokePreviewCard item={e} key={i} onCardClickHandler={onCardClickHandler} />
          );
        })}
      </div>
      <div
        className={[styles.arrow, styles.noselect].join(" ")}
        onClick={onRightArrClick}
      >
        <img className={styles.rightarrow} alt="arrow" src={arrowimg} />
      </div>
    </div>
  );
};

export default PokeSlide;
