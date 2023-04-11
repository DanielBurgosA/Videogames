import style from "./Card.module.css"

const Card = (game) => {

    const {name, background_image, genres, platform, rating} = game.game;

    console.log(background_image);

    return (
        <div className={style.card}>
          <p className={style.name}>{name}</p>
          <div className={style.att}></div>
          <div className={style.imgContainer}>
            <img className={style.img} src={background_image} alt="Non" />
          </div>
          <div className={style.att}>
            <div className={style.div2}>
              <div className={style.values1}>{genres.reduce((ac, g)=>ac+"-"+g)}</div>
            </div>
            <div className={style.div1}>
              <p className={style.title}>Platform:</p>
              <p className={style.values2}>
                {platform}
              </p>
              <p className={style.rating}>
                {rating ? rating : "Not rated"}{" "}
              </p>
            </div>
          </div>
        </div>
      );
    };

export default Card;
