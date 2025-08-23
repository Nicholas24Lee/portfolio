import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);
  const linkRefs = useRef([]);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  // Update activeIndex on route change
  useEffect(() => {
    const currentIndex = links.findIndex(link => link.path === location.pathname);
    setActiveIndex(currentIndex);
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDisableTransition(true);
      setTimeout(() => setDisableTransition(false), 50);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure refs are set before rendering the oval
  const [refsReady, setRefsReady] = useState(false);
  useLayoutEffect(() => {
    if (linkRefs.current.every(ref => ref)) {
      setRefsReady(true);
    }
  }, [linkRefs.current]);

  return (
    <nav style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      padding: "1rem",
      backgroundColor: "#282c34",
    }}>
      {links.map((link, index) => (
        <Link
          key={link.path}
          ref={el => linkRefs.current[index] = el}
          to={link.path}
          style={{
            position: "relative",
            color: "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            zIndex: 1,
          }}
        >
          {link.name}
        </Link>
      ))}

      {/* Moving oval */}
      {refsReady && linkRefs.current[activeIndex] && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            height: "2.5rem",
            width: `${linkRefs.current[activeIndex].offsetWidth}px`,
            borderRadius: "999px",
            backgroundColor: "#61dafb",
            transition: disableTransition ? "none" : "all 0.3s ease",
            left: `${linkRefs.current[activeIndex].offsetLeft}px`,
            zIndex: 0,
          }}
        />
      )}
    </nav>
  );
}