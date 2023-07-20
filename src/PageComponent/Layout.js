import React from 'react';
import Sidebar from './Sidebar';
import { HeaderTitle } from './HeaderTitle';
import ScrollToTop from '../helper/ScrollToTop';

const Layout = ({ children, active }) => {

  return (
    <div className='flex flex-col '>
      <div className='sticky top-0 bg-gray-200 z-10 h-12'>
        <HeaderTitle title='Vpllex' />
      </div>
      <div className='flex flex-1 h-screen  bg-gray-100'>
        <div className={`w-2/12 bg-white`}>
          <Sidebar active={active} />
        </div>
        <div className={`w-10/12 min-h-screen ml-3`}>
          <ScrollToTop>
            {children}
          </ScrollToTop>
        </div>
      </div>
    </div>
  );
};

export default Layout;
