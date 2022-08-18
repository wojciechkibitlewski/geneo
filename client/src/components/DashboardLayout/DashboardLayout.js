import { Outlet } from 'react-router-dom';

import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';



const DashboardLayout = () => {
  return (
    <>
        <DashboardHeader />
        <Outlet />   
        <DashboardFooter /> 
        </>
  )
}

export default DashboardLayout