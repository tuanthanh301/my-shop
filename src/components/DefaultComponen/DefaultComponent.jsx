import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent />
      <main>
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
