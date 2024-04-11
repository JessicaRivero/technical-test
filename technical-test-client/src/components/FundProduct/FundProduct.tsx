import styles from './FundProduct.module.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import SearchBox from '../SearchBox/SearchBox';

interface FundProductProps {
  children: React.ReactNode;
}

const FundProduct: React.FC<FundProductProps> = ({ children }) => (
  <section className={styles.productBody}>
    <SearchBox></SearchBox>
    <Breadcrumbs></Breadcrumbs>
    <div className={styles.productContent}>
      {children}
    </div>
  </section>
);

export default FundProduct