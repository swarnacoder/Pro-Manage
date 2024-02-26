import welcome from "../../assets/image/welcome.png";
import styles from "../WelcomePage/WelcomePage.module.css"
export const WelcomePage = () => {
  return (
    <>
      <section className={styles.main_section}>
        <div>
          <img
            className={styles.image}
            src={welcome}
            alt="Welcome "
          />
        </div>
        <div className={styles.text}>
          <p className={styles.text_p1}>Welcome aboard my friend </p>
          <p className={styles.text_p2}>just a couple of clicks and we start</p>
        </div>
      </section>
    </>
  );
};

