import { motion } from "framer-motion";
import { cn } from "../utils/helpers";

function GradualSpacing({
  text,
  duration = 0.4,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
  scrollStyle = {},
}) {
  return (
    <div className="flex justify-center space-x-1">
      {text.split("").map((char, i) => (
        <motion.h1
          key={i}
          initial="hidden"
          animate="visible"
          variants={framerProps}
          transition={{ duration, delay: 0.3 + i * delayMultiple }}
          className={cn("drop-shadow-sm ", className)}
          style={scrollStyle}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.h1>
      ))}
    </div>
  );
}

export { GradualSpacing };
