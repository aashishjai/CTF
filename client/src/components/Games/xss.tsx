import React from 'react';

const XSS = () => {
  const iframeStyle = {
    width: '100vw',
    height: '150vh',
  };

  return (
    <iframe src="https://xss-game.appspot.com/level2" style={iframeStyle}></iframe>
  );
};

export default XSS;
