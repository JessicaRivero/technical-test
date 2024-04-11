import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearBreadcrumbs } from '../../redux/slices/breadcrumbSlice';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBreadcrumbs());
  }, [dispatch]);

  return (
    <div className={styles.homeContent}>
      <p className={styles.homeText}>En la parte superior busca el producto que deseas comprar</p>
    </div>
  )
}

export default Home