//FRAMER MOTION STYLES
export const containerVariants = (staggerChildren: number = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
    },
  },
});

export const itemVariants = (duration: number = 0.5, yOffset: number = 20) => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
    },
  },
});

//
