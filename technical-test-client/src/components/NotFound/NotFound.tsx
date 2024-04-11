import styles from './NotFound.module.scss';
import NotFoundImage from '../../images/alert.png';

const NotFound = () => {
  return (
    <div className={styles.notFoundContent}>
      <img className={styles.notFoundImage} src={NotFoundImage} alt="Search" />
      <p className={styles.notFoundText}>Parece que esta páguina no existe</p>
    </div>
  )
}

export default NotFound