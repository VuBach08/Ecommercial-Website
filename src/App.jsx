import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import './App.css'
import MainLayout from './components/layout/main-layout'
import themesSelector from './store/selectors/themeSelector'

function App() {
  const theme = useSelector(themesSelector.selectThemes)

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
        </Route>
      </Routes>
    </div>
  )
}

export default App
