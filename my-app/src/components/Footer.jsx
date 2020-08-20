import React from 'react';

function Footer() {
  const copyRightYear = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright © {copyRightYear}</p>
    </footer>
  );
}

export default Footer;
