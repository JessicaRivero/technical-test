import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../images/alert.png';
import styles from './Error.module.scss';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  let navigate = useNavigate();
  return (
    <div className={styles.errorContent}>
      <img className={styles.errorImage} src={NotFoundImage} alt="Search" />
      <p className={styles.errorText}>{message}</p>
      <button className={styles.errorButton} onClick={() => navigate('/')}>Volver</button>
    </div>
  )
}

export default Error