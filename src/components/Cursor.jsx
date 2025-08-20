import { useEffect, useState } from "react";

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* The custom cursor is just the default cursor */}
      <div className="cursor" />
      {/* The dot that follows the cursor */}
      <div
        className="dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
    </>
  );
};

export default Cursor;
