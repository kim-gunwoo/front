'use client';

import '~/styles/globals.css';
// eslint-disable-next-line no-redeclare
import Image from 'next/image';
import styles from './RootLayoutWrapper.module.scss';
import classNames from 'classnames';
// import passorderSvg from '~/styles/assets/svgs/passorder.svg';
// import { IMAGE_PATH } from '@/constant/globals';
import { PassorderIcon } from '@repo/icons';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

const IMAGE_PATH = 'https://passorderstatic.s3.ap-northeast-2.amazonaws.com';

const imagePath = `${IMAGE_PATH}/web-app/assets/images/landing/`;
const images = {
  appStore: imagePath + 'app_store_logo.jpg',
  googlePlay: imagePath + 'google_play_logo.jpg',
  passorderChat: imagePath + 'passorder_chat.jpg',
  trophy: imagePath + 'trophy.jpg',
  forbes: imagePath + 'forbes_logo.jpg',
  passorderQR: imagePath + 'passorder_qr.jpg',
};

export default function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  const onClickAppStoreButton = () => {};
  const onClickGooglePlayStoreButton = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <aside className={classNames(styles.side_view, styles.left)}>
        <div className={styles.title}>
          <div className={styles.passorder_title}>
            <PassorderIcon />
            <Image src={PassorderIcon.src} width={28} height={28} alt={'passorder'} />
            <span>패스오더란?</span>
          </div>
          <div className={styles.passorder_introduce}>
            카페 가는 길 미리 주문하고 <br />
            기다림 없이 바로 픽업하는 서비스예요.
          </div>
          <div className={styles.store_wrapper}>
            <Image src={images.appStore} width={83} height={19} alt="애플스토어" onClick={onClickAppStoreButton} />
            |
            <Image src={images.googlePlay} width={83} height={19} alt="구글플레이" onClick={onClickGooglePlayStoreButton} />
          </div>
          <div>
            <Image src={images.passorderChat} width={260} height={410} alt="패스오더 이야기" />
          </div>
        </div>
      </aside>
      <main>{children}</main>
      <aside className={classNames(styles.side_view, styles.right)}>
        <div className={styles.trophy_wrapper}>
          <Image src={images.trophy} width={140} height={120} alt="패스오더 업적" />
          <div className={styles.trophy_introduce}>
            <span className={classNames(styles.bold, styles.orange)}>150만 명 이상</span>의 유저들이 <br />
            <span className={styles.bold}>VIP 경험</span>을 하고 있습니다.
          </div>
        </div>
        <div className={styles.panel_wrapper}>
          <div className={styles.panel}>
            <div className={styles.store}>
              <Image src={images.forbes} width={58} height={16} alt="포브스" />
              <span>포브스 선정</span>
            </div>
            <div className={styles.achievement}>한국인이 사랑한 식/음료 앱 11위</div>
          </div>
          <div className={styles.panel}>
            <div className={styles.store}>
              <Image src={images.googlePlay} width={83} height={19} alt="구글 플레이" />
              <span>평점 ★4.8</span>
            </div>
            <div className={styles.achievement}>100만 회 이상 다운로드</div>
          </div>
          <div className={styles.panel}>
            <div className={styles.store}>
              <Image src={images.appStore} width={83} height={19} alt="앱스토어" />
              <span>평점 ★4.8</span>
            </div>
            <div className={styles.achievement}>인기 앱 순위 3위</div>
          </div>
        </div>
        <div className={styles.qr_wrapper}>
          <Image src={images.passorderQR} width={100} height={100} alt="패스오더 qr" />
          <div>패스오더 앱 다운로드 QR</div>
        </div>
      </aside>
    </div>
  );
}
