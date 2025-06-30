'use client';
import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';

type Button = {
  title: string;
  func: () => void;
  textStyle?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  //props?: Record<string, any>; // Allows any additional props
} & React.HTMLAttributes<HTMLButtonElement>;

const AltButton = ({
  title,
  textStyle,
  type,
  disabled,
  func,
}: Button): ReactElement => {
  return (
    <motion.button
      className={`py-2.5 px-4 text-center rounded-full duration-150 font-medium text-sm text-white bg-gray-800  hover:bg-brandDark dark:hover:bg-brandLight dark:bg-white dark:text-gray-800 hover:text-gray-200 ${
        textStyle || ''
      }`}
      onClick={() => func()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      disabled={disabled}
    >
      {title}
    </motion.button>
  );
};

export default AltButton;
