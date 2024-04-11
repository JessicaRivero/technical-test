import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { getSearchResults } from '../../services/mercadoLibreService';
import { SearchResult as SearchResultType } from '../../services/types';
import { setBreadcrumbs } from '../../redux/slices/breadcrumbSlice';
import IconSmall from '../../images/ic_shipping.png';
import Icon from '../../images/ic_shipping@2x.png';
import styles from './SearchResult.module.scss';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState<SearchResultType | null>(null);
    const [categories, setCategories] = useState<string[]>(['']);
    const query = searchParams.get('search');
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            try {
                const data = await getSearchResults(query);
                setResults(data);
                setCategories(data.categories);
                if(data.categories.length === 0)
                    dispatch(setBreadcrumbs(['Sin categoría']));
                else
                    dispatch(setBreadcrumbs(data.categories));
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError(String(error));
            }
        };

        fetchSearchResults();
    }, [query, dispatch]);

    const handleSubmit = (idProduct: string, i: number) => () => {
        navigate(`/items/${idProduct}`);
        dispatch(setBreadcrumbs([categories[i]]));
    };

    if (!results && !error) {
        return <Loading></Loading>;
    } if (error) {
        return <Error message="Se produjo un error en la busqueda de producto. Vuelva al inicio e intentelo más tarde."></Error>;
    } if (results?.items.length === 0) {
        return <div className={styles.resultEmpty}><p>No se encontraron productos que coincidan con su búsqueda.</p></div>;
    }

    return (
        <ul className={styles.resultList}>
            {results?.items.map((item, i) => (
                <li key={item.id} className={styles.resultItemCard} onClick={handleSubmit(item.id, i)}>
                    <article className={styles.resultCard}>
                        <img className={styles.resultImage} src={item.picture} loading="lazy" alt={item.title} />
                        <div className={styles.resultPrice}>
                            <h2>${item.price.amount}</h2>
                            {item.free_shipping && <img src={IconSmall} srcSet={`${IconSmall} 480w, ${Icon} 1920w`} sizes="(max-width: 768px) 480px, 1920px" className={styles.resultFreeShipping} alt="Envío Gratis" />}
                        </div>
                        <p className={styles.resultDescription}>{item.title}</p>
                        <p className={styles.resultCondition}>{item.condition}</p>
                    </article>
                </li>
            ))}
        </ul>
    );
};

export default SearchResult;