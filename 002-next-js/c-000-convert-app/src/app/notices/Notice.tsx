'use client';

import { useEffect, useMemo } from 'react';
import { Notice, NoticeInterface } from '@/types/Notice.types';

export default function NoticeContents(props: { notice: NoticeInterface }) {
  const notice = useMemo(() => new Notice(props.notice), [props.notice]);

  useEffect(() => {
    const srcScripts: HTMLScriptElement[] = [];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.innerHTML = notice.script;
    document.body.appendChild(script);

    notice.scriptSrcList.map((src) => {
      const srcScript = document.createElement('script');
      srcScript.src = src;
      srcScripts.push(srcScript);
      document.head.appendChild(srcScript);
    });
    return () => {
      script.remove();
      srcScripts.forEach((src) => {
        src.remove();
      });
    };
  }, [notice]);

  return <div dangerouslySetInnerHTML={{ __html: notice.contents }} suppressHydrationWarning />;
}
