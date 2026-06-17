import { Outlet } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'
import Header from '../header/header'

const MainLayout = () => {
  useScrollToTop()

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
