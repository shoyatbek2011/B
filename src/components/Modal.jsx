import { motion } from "framer-motion";

export default function Modal({ children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </motion.div>
  );
}
