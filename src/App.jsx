import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import './App.css'
import CategoryBody from './components/body/category page/body'
import ProductBody from './components/body/product page/body'
import ProductPage from './components/body/product page/products'
import AuthBody from './components/body/auth page/body-login'
import AuthBodySignin from './components/body/auth page/body-sign-in'
import ForgotPassword from './components/body/auth page/forgot-password'
import ProfilePage from './components/body/auth page/profile'
import SearchPage from './components/body/search page/body'
import ShoppingCart from './components/body/shopping cart page/body'
import MainLayout from './components/layout/main-layout'
import CheckOut from './components/body/checkout page/body'
import authAction from './store/actions/auth'
import productAction from './store/actions/product'
import authSelector from './store/selectors/authSelector'
import themesSelector from './store/selectors/themeSelector'

const ProtectedRoute = ({ children }) => {
  const isInitialized = useSelector(authSelector.selectIsInitialized)
  const isLoggedIn = useSelector(authSelector.selectIsLoggedIn)

  if (!isInitialized) {
    return null
  }

  return isLoggedIn ? children : <Navigate to="/auth/login" replace />
}

const GuestRoute = ({ children }) => {
  const isInitialized = useSelector(authSelector.selectIsInitialized)
  const isLoggedIn = useSelector(authSelector.selectIsLoggedIn)

  if (!isInitialized) {
    return null
  }

  return isLoggedIn ? <Navigate to="/auth/profile" replace /> : children
}

function App() {
  const dispatch = useDispatch()
  const theme = useSelector(themesSelector.selectThemes)

  useEffect(() => {
    dispatch(authAction.initializeAuth())
  }, [dispatch])

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
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="auth/login"
            element={
              <GuestRoute>
                <AuthBody />
              </GuestRoute>
            }
          />
          <Route
            path="auth/register"
            element={
              <GuestRoute>
                <AuthBodySignin />
              </GuestRoute>
            }
          />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="auth/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path=":category" element={<CategoryBody />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
