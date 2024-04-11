import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { getProductDetail } from '../../services/mercadoLibreService';
import { ProductDetail as ProductDetailType } from '../../services/types';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const [details, setDetails] = useState<ProductDetailType | null>(null);
    const { id: idProduct } = useParams();
    const formattedDecimals = details?.price.decimals.toString().padStart(2, '0');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!idProduct) return;
            try {
                const data = await getProductDetail(idProduct);
                setDetails(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError(true);
            }
        };

        fetchSearchResults();
    }, [idProduct]);

    if (!details && !error) {
        return <Loading></Loading>;
    }
    if (error) {
        return <Error message="Se produjo un error al cargar los detalles del producto. Vuelva al inicio e intentelo más tarde."></Error>;
    }

    return (
        <article className={styles.detailCard}>
            <img className={styles.detailImage} src={details?.picture} loading="lazy" alt="Imagen del Producto" />
            <div className={styles.detailBuy}>
                <p className={styles.detailCondition}>{details?.condition}</p>
                <h4 className={styles.detailTitle}>{details?.title}</h4>
                <h3 className={styles.detailPrice}>${details?.price.amount}<span className={styles.decimals}>.{formattedDecimals}</span></h3>
                <button className={styles.detailButton} aria-label="Comprar">Comprar</button>
            </div>
            {details?.description ? (
                <div className={styles.deatilDescription}>
                    <h1>Descripción del producto</h1>
                    <p>{details.description}</p>
                </div>
            ) : (    
                <div className={styles.deatilDescription}>
                    <p>Sin Descripción</p>
                </div>
            )}
        </article>
    )
}

export default ProductDetail