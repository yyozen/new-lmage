import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './SearchBar.css';

/**
 * 搜索栏组件
 */
const SearchBar = ({ 
  placeholder = '搜索图片...', 
  onSearch, 
  defaultValue = '',
  showFilters = false,
  onFilterChange,
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      className="search-bar-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <i className="ri-search-line search-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClear}
            aria-label="清除"
          >
            <i className="ri-close-line"></i>
          </button>
        )}
        <button type="submit" className="search-submit" aria-label="搜索">
          <i className="ri-arrow-right-line"></i>
        </button>
      </form>

      {showFilters && (
        <div className="search-filters">
          <button
            className="filter-btn"
            onClick={() => onFilterChange?.('date')}
          >
            <i className="ri-calendar-line"></i>
            日期
          </button>
          <button
            className="filter-btn"
            onClick={() => onFilterChange?.('size')}
          >
            <i className="ri-file-line"></i>
            大小
          </button>
          <button
            className="filter-btn"
            onClick={() => onFilterChange?.('type')}
          >
            <i className="ri-image-line"></i>
            类型
          </button>
        </div>
      )}
    </motion.div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  showFilters: PropTypes.bool,
  onFilterChange: PropTypes.func,
};

export default SearchBar;
