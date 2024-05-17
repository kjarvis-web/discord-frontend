import { useEffect } from 'react';
import { useRef } from 'react';

const ScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' });
  });
  return <div ref={elementRef} />;
};

export default ScrollToBottom;
