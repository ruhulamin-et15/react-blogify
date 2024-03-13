import { motion } from "framer-motion";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "100%",
  minHeight: "100vh",
};

const circleStyle = {
  width: "3rem",
  height: "3rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #3498db",
  borderRadius: "50%",
  boxSizing: "border-box",
};

const textStyle = {
  marginTop: "1rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const spinTransition = {
  rotate: {
    from: 0,
    to: 360,
    duration: 1,
    repeat: Infinity,
    ease: "linear",
  },
};

export default function CircleLoader() {
  return (
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      <div style={textStyle}>Loading...</div>
    </div>
  );
}
