import { useEffect, useState } from "react";
import "./styles/resizable.css";
import { ResizableBox, type ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(innerWidth * 0.75);
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: number;
    const listner = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        console.log(width)
        if (window.innerWidth * 75 > width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listner);
    return () => {
      window.removeEventListener("resize", listner);
    };
  }, []);

  if (direction === "vertical") {
    resizableProps = {
      height: 300,
      width: Infinity,
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 30],
      resizeHandles: ["s"],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop(_, data) {
        setWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
