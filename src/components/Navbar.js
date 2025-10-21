import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategories } from '../utils/articles';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const categoryList = await getCategories();
      setCategories(categoryList);
    }

    loadCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/?category=${categoryName.toLowerCase()}`);
  };

  const handleAllClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📝</span>
          Bulta
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' && !location.search ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <span className={`nav-link ${location.search.includes('category=') ? 'active' : ''}`}>
              Categories
            </span>
            <ul className="dropdown-menu">
              <li>
                <button onClick={handleAllClick} className="dropdown-item">
                  All Categories
                </button>
              </li>
              {categories.map(category => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="dropdown-item"
                  >
                    {category.displayName}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
