import React from 'react';

export default function SVGComponent({ pathData } : { pathData : string }) {
  return (
    <div className="App">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="width"
        height="height"
        viewBox="0 0 16 16"
      >
        <path d={pathData} />
      </svg>
    </div>
  );
}