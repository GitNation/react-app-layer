import React from 'react';

const useNewTab = (link) => {
  const navOutside = () => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  React.useEffect(() => {
    navOutside();
  }, []);
};

const NewTab = ({ to }) => {
  useNewTab(to);
  return null;
};

export default NewTab;
