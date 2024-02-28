import { LeftSidebar } from "../../components/LeftSidebar/LeftSidebar"
import styles from "./Analytics.module.css"
import dotIcon from "../../assets/icons/doticon.png"

export const Analytics = () => {
    return (
        <>
        <section className={styles.analytics}>
            <LeftSidebar/>
            <section className={styles.analytics_container}>
                <div className={styles.analytics_heading}>
                    <p className={styles.heading}>Analytics</p>
                </div>
                <section className={styles.analytics_content}>
                <div className={styles.categories}>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Backlog Tasks </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> To-Do Tasks </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> In-Progress Tasks </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                    <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Done Tasks </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                </div>
                <div className={styles.priorities}>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Low Priority </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Moderate Priority </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> High Priority </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                <div className={styles.categories_container}>
                        <p className={styles.categories_container_text}> <img src={dotIcon} alt="Blue Icon" width="10px" height="10px" /> Due Date Tasks </p>
                        <span className={styles.categories_container_num}>16</span>
                    </div>
                </div>
                </section>
            </section>
        </section>
        </>
    )
}
