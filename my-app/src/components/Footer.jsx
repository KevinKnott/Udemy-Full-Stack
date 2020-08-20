import React from 'react';

const copyRightYear = new Date().getFullYear();

function Footer() {
  return (
    <footer>
      <p>Copyright {copyRightYear}</p>
    </footer>
  );
}

export default Footer;
