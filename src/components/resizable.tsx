import { useEffect } from "react";
import "./styles/resizable.css";
import { ResizableBox, type ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const listner = () => {};
    window.addEventListener("resize", listner);
    return () => {
      window.removeEventListener("reset", listner);
    };
  }, []);

  if (direction === "vertical") {
    resizableProps = {
      height: 300,
      width: Infinity,
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 30],
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: window.innerWidth * 0.75,
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
