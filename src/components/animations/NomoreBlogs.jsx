import { motion } from "framer-motion";

const NoMoreBlogs = () => {
  const sentence = "No More Blogs!";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="text-2xl ms-5 flex justify-center mt-4"
    >
      {sentence.split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            x: index === 0 ? -50 : index === 1 ? 0 : 50,
            y: index === 0 ? 0 : index === 1 ? -50 : 0,
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
          style={{ display: "inline-block", marginLeft: "10px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default NoMoreBlogs;
