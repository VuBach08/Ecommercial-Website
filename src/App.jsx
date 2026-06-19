import MainPage from './components/body/main page/body'
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
import Blog from './components/body/blog page/body'
import About from './components/body/about page/body'
import Contact from './components/body/contact page/body'
import StaticPage from './components/body/static page/body'
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
          <Route index element={<MainPage />} />
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
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<StaticPage />} />
          <Route path="privacy" element={<StaticPage />} />
          <Route path="returns" element={<StaticPage />} />
          <Route path="shipping" element={<StaticPage />} />
          <Route path="data-protection" element={<StaticPage />} />
          <Route path="team" element={<StaticPage />} />
          <Route path="careers" element={<StaticPage />} />
          <Route path="vision" element={<StaticPage />} />
          <Route path="culture" element={<StaticPage />} />
          <Route path=":category" element={<CategoryBody />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
