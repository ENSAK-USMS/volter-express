import React from 'react';
import './Waves.css';

const Waves = () => {
  const waveOpacityValues = ['0.7', '0.5', '0.3', '1'];

  return (
    <div className="waves z-index w-100">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
        style={{ transform: 'rotateX(180deg)' }} // Rotate the SVG element 180 degrees
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {waveOpacityValues.map((opacity, index) => (
            <use
              key={index}
              xlinkHref="#gentle-wave"
              x="48"
              y={index * 2} 
              fill={`white`}
              opacity={opacity}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Waves;
