import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className="min-h-1/2screen flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
};
