'use client';
import React, { Fragment, ReactNode } from 'react';

import { Menu, MenuItems, Transition } from '@headlessui/react';
import { RiArrowDropDownLine } from 'react-icons/ri';

type Children = {
  children: ReactNode;
  title?: string;
};

const Dropdown = ({ children, title = 'menu' }: Children) => {
  return (
    <div className=' py-1'>
      <Menu as='div' className='flex flex-col justify-center items-center'>
        <div>
          <Menu.Button className='flex gap-1 justify-center p-1   hover:text-brandLight dark:hover:text-brandDark transition-all duration-100'>
            {title}
            <RiArrowDropDownLine className='text-3xl' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <MenuItems className=' absolute top-16 min-w-44 max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-lg focus:outline-none text-gray-700 dark:text-gray-200'>
            <div className='px-1 py-1 '>{children}</div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
