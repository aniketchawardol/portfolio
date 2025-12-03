import { cn } from "../utils/helpers";
import { motion } from "framer-motion";

function GradualSpacing({
  text,
  duration = 0.6,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  className,
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayMultiple,
        delayChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: framerProps.hidden,
    visible: {
      ...framerProps.visible,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="flex justify-center gradual-spacing"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.h1
          key={i}
          className={cn("drop-shadow-sm", className)}
          style={{ display: "inline-block" }}
          variants={child}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.h1>
      ))}
    </motion.div>
  );
}

export { GradualSpacing };
