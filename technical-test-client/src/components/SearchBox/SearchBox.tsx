import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductDetail } from '../../services/mercadoLibreService';
import styles from './SearchBox.module.scss';
import LogoSmall from '../../images/logo_ML.png';
import Logo from '../../images/logo_ML@2x.png';
import IconSmall from '../../images/ic_search.png';
import Icon from '../../images/ic_search@2x.png';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  let navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      try {
        const data = await getProductDetail(query);
        navigate(`/items/${query}`);
      } catch (error: any) {
        if (error.response?.status === 404) {
          navigate(`/items?search=${query}`);
        }
        else {
          navigate(`/error`);
        }
      }
    }
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <header className={styles.searchBar}>
      <form role="search" className={styles.searchForm} onSubmit={handleSubmit}>
        <img src={LogoSmall} srcSet={`${LogoSmall} 480w, ${Logo} 1920w`} sizes="(max-width: 900px) 480px, 1920px" className={styles.searchImage} loading="lazy" alt="Logo" />
        <input
          id="seeker"
          type="search"
          aria-label="Search"
          className={styles.searchInput}
          placeholder="Nunca dejes de buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef}
        />
        <button type="submit" aria-label="Search" className={styles.searchButton}>
          <img src={IconSmall} srcSet={`${IconSmall} 480w, ${Icon} 1920w`} sizes="(max-width: 900px) 480px, 1920px" className={styles.searchIcon} alt="Buscar" />
        </button>
      </form>
    </header>
  );
};

export default SearchBox;
