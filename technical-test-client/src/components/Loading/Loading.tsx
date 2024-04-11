import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingBalls}></div>
        <div className={styles.loadingBalls}></div>
        <div className={styles.loadingBalls}></div>
        <span className={styles.loadingText}>Cargando...</span>
      </div>
    </div>
  )
}

export default Loading