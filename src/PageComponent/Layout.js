import React from 'react';
import Sidebar from './Sidebar';
import { HeaderTitle } from './HeaderTitle';
import ScrollToTop from '../helper/ScrollToTop';
import { useState } from 'react';

const Layout = ({ children, active }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col '>
      <div className='sticky top-0 bg-gray-200 z-10 h-12'>
        <HeaderTitle open={open} setOpen={setOpen} />
      </div>
      <div className='flex flex-1 h-screen  bg-gray-100'>
        {
          open &&
          <div className={`w-2/12 bg-white`}>
            <Sidebar active={active} />
          </div>
        }
        <div className={`${open ? 'w-10/12' : 'w-full'} min-h-screen ml-3`}>
          <ScrollToTop>
            {children}
          </ScrollToTop>
        </div>
      </div>
    </div>
  );
};

export default Layout;
