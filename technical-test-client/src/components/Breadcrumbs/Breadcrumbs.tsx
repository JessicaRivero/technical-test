import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.breadcrumbs);
  
  return (
    <nav aria-label="breadcrumbs" className={styles.productContentBreadcrumbs}>
      <ol className={styles.productBreadcrumbs}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className={styles.productItemBreadcrumbs}>
              <span aria-current="page">{breadcrumb.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
