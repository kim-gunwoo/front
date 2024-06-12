'use client';

import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import loading from '../../../../public/loading.json';

export default function LottieComp() {
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      lottie.loadAnimation({
        name: 'loading',
        container: element.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path: 'loading.json',
        animationData: loading,
      });
    }
    return () => {
      lottie.destroy('loading');
    };
  }, []);

  return (
    <div>
      <div ref={element} style={{ width: 50, height: 50 }}></div>
    </div>
  );
}
