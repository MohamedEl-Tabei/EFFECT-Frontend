import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loaderAnimationData from "../animation/loader.json";
const Loader = () => {
  return (
    <motion.div
      className=" d-flex jcc aic   p-3 rounded-3 text-light"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Lottie
        width={4}
        height={5}
        loop={true}
        animationData={loaderAnimationData}
        autoPlay={true}
      />
    </motion.div>
  );
};
export default Loader;
