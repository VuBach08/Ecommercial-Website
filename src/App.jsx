import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import './App.css'
import CategoryBody from './components/body/category page/body'
import ProductBody from './components/body/product page/body'
import ProductPage from './components/body/product page/products'
import SearchPage from './components/body/search page/body'
import ShoppingCart from './components/body/shopping cart page/body'
import MainLayout from './components/layout/main-layout'
import productAction from './store/actions/product'
import themesSelector from './store/selectors/themeSelector'

function App() {
  const dispatch = useDispatch()
  const theme = useSelector(themesSelector.selectThemes)

  useEffect(() => {
    dispatch(productAction.fetchProducts()).catch(() => {})
  }, [dispatch])

  return (
    <div className={clsx('App background-clrs', theme === 'dark' ? 'darkmode' : null)}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <main className="primary-body">
                <section className="hero-section">
                  <div className="hero-copy">
                    <p className="secondary-clrs">Clean skincare storefront</p>
                    <h2>Ecommercial Website</h2>
                    <p className="hero-description">
                      A focused React shopping experience for products, cart, checkout, and customer accounts.
                    </p>
                  </div>
                </section>
              </main>
            }
          />
          <Route path="product" element={<ProductPage />} />
          <Route path="product/:id" element={<ProductBody />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path=":category" element={<CategoryBody />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
