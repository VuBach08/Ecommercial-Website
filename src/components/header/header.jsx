import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RiArrowDropRightFill } from 'react-icons/ri'
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import clsx from 'clsx'
import './header.css'

const categories = [
  ['On Sale', '/onsale'],
  ['Trending', '/trending'],
  ['Newest', '/newest'],
  ['Serums', '/serums'],
  ['Moisturizers', '/moisturizers'],
  ['Cleansers', '/cleansers'],
  ['Eye Care', '/eye-care'],
  ['Masks', '/masks'],
  ['Suncare', '/suncare'],
  ['Toners', '/toners'],
  ['Treatments', '/treatments'],
]

const Header = () => {
  const navigate = useNavigate()
  const [isActive, setActive] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [searchContent, setSearchContent] = useState('')
  const [search, setSearch] = useState(false)

  const handleNavClick = () => {
    setActive(false)
    setToggle(false)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const query = searchContent.trim()

    if (query) {
      navigate(`/search?search=${encodeURIComponent(query)}`)
      setActive(false)
      setSearch(false)
    }
  }

  useEffect(() => {
    if (!isActive) {
      setToggle(false)
    }
  }, [isActive])

  return (
    <header className="primary-header">
      <nav className="primary-navigation center" aria-label="Primary">
        <button
          className="nav-icon-btn nav-menu-toggle"
          type="button"
          onClick={() => setActive(!isActive)}
          aria-label="Toggle menu"
        >
          {isActive ? <FiX /> : <FiMenu />}
        </button>

        <Link id="logo" className="font-clrs" to="/" onClick={handleNavClick}>
          Ecommercial Website
        </Link>

        <form className="nav-search" onSubmit={onSubmit}>
          <FiSearch aria-hidden="true" />
          <input
            type="text"
            placeholder="Search skincare"
            name="search"
            value={searchContent}
            onChange={(event) => setSearchContent(event.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className={clsx('primary-navigation-panel', isActive && 'open')}>
          <NavLink to="/" className="nav-link" onClick={handleNavClick}>
            Home
          </NavLink>

          <div className="nav-category">
            <button
              className="nav-link nav-category-btn"
              type="button"
              onClick={() => setToggle(!toggle)}
              aria-expanded={toggle}
            >
              Categories
              <RiArrowDropRightFill />
            </button>
            <div className={clsx('nav-category-menu', toggle && 'open')}>
              {categories.map(([label, path]) => (
                <NavLink key={path} to={path} className="nav-category-link" onClick={handleNavClick}>
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/blog" className="nav-link" onClick={handleNavClick}>
            Blog
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={handleNavClick}>
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link" onClick={handleNavClick}>
            Contact
          </NavLink>

          <div className="mobile-auth-actions">
            <Link className="btn primary-bg fs-300" to="/auth/login" onClick={handleNavClick}>
              Login
            </Link>
          </div>
        </div>

        <div className="primary-navigation-actions">
          <button
            className="nav-icon-btn desktop-search-toggle"
            type="button"
            onClick={() => setSearch(!search)}
            aria-label="Toggle search"
            title="Toggle search"
          >
            <FiSearch />
          </button>
          <form className={clsx('floating-search', search && 'open')} onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Search skincare"
              name="search"
              value={searchContent}
              onChange={(event) => setSearchContent(event.target.value)}
              aria-label="Search products"
            />
          </form>
          <Link className="nav-icon-btn nav-cart-link" to="/cart" aria-label="Shopping cart" title="Shopping cart">
            <FiShoppingBag />
          </Link>
          <Link className="nav-icon-btn nav-profile-link" to="/auth/login" aria-label="User profile" title="User profile">
            <FiUser />
          </Link>
          <Link className="btn primary-bg nav-login-btn" to="/auth/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
