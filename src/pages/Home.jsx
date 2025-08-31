import { useState, useEffect } from "react";
import './Home.css';
import img1 from '../assets/accenture_climb.jpg';
import img2 from '../assets/ocbc_end.jpg';

const images = [img1, img2];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hero-section">
        {images.map((img, index) => (
          <div
            key={index}
            className="hero-bg"
            style={{ backgroundImage: `url(${img})`, opacity: index === current ? 1 : 0 }}
          />
        ))}
        <h1 className="hero-title">Nicholas</h1>
      </div>
      <div className="full-page-section">
        <h1 style={{ textAlign: "center" }}>This is the about section of my portfolio</h1>
      </div>
    </>
  );
}