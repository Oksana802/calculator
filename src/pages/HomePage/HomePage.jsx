import s from "./HomePage.module.css";

import foto from "../../assets/bg-1.jpg";
import foto2x from "../../assets/bg-2x.jpg";
import fotoTab from "../../assets/bg-tab.jpg";
import fotoTab2x from "../../assets/home-tab-2x.jpg";
import fotoMob from "../../assets/bg-mob.jpg";
import fotoMob2x from "../../assets/bg-mob-2x.jpg";

const HomePage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <h1 className={s.title}>
          🎄Don't forget to spread the holiday cheer!🎄
        </h1>
        <ul>
          <li className={s.text}>
            Save your contacts in our app, create a festive list, and make sure
            everyone gets their Christmas wishes!
          </li>
          <li className={s.text}>
            ✨ Stay organized, make the season magical! ✨
          </li>
        </ul>

        <div>
          <picture>
            <source
              srcSet={`${foto2x} 2x, ${foto} 1x`}
              media="(min-width: 1158px)"
              type="image/jpeg"
            />

            <source
              srcSet={`${fotoTab2x} 2x, ${fotoTab} 1x`}
              media="(min-width: 768px)"
              type="image/jpeg"
            />

            <source
              srcSet={`${fotoMob2x} 2x, ${fotoMob} 1x`}
              media="(min-width: 320px)"
              type="image/jpeg"
            />
            <img
              src={fotoMob}
              alt="Santa and his friends"
              // width="300"
              // height="256"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
