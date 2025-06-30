'use client';
import React, { ReactNode } from 'react';
import { Menu, MenuItems } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';

type Children = {
  children: ReactNode;
  title?: string;
};

const DropdownMenu = ({ children }: Children) => {
  return (
    <div className='py-1'>
      <Menu
        as='div'
        className='flex flex-col justify-center items-center relative'
      >
        {({ open }) => (
          <>
            <Menu.Button className='flex gap-1 justify-center p-1 hover:text-brandLight dark:hover:text-brandDark transition-all duration-100'>
              {open ? (
                <X className='h-8 w-8' />
              ) : (
                <MenuIcon className='h-8 w-8' />
              )}
              {/* <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <RiArrowDropDownLine className='text-3xl' aria-hidden='true' />
              </motion.div> */}
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <MenuItems
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={true}
                  className='absolute top-12 min-w-32 rounded-large bg-white shadow-lg focus:outline-none text-gray-700 z-10'
                >
                  <div className='px-1 py-1 w-72'>{children}</div>
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
