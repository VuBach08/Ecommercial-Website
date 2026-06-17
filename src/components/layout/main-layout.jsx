import { Outlet } from 'react-router-dom'
import useScrollToTop from '../../hooks/useScrollToTop'

const MainLayout = () => {
  useScrollToTop()

  return <Outlet />
}

export default MainLayout
