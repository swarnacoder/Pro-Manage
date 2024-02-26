import { NavLink } from "react-router-dom";
import styles from "./PageNotFound.module.css"
export const PageNotFound = () => {
    return (
      <>
        <section className={styles.errorpage}>
          <div className={styles.content}>
            <h2 className={styles.header}>404</h2>
            <h4>Sorry! Page not found</h4>
            <p>
              Oops! It seems like the page you're trying to access doesn't exist.
              If you believe there's an issue, feel free to report it, and we'll
              look into it.
            </p>
            <div className={styles.btns}>
              <NavLink to="/login">return home</NavLink>
            </div>
          </div>
        </section>
      </>
    );
  };