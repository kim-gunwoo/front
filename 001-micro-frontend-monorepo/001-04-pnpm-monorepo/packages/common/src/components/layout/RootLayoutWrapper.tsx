'use client';

import '../../styles/globals.css';
import styles from './RootLayoutWrapper.module.scss';
import classNames from 'classnames';
import { IMAGE_PATH } from '../../constant/globals';
import { PassorderSvg } from '../../index';

interface RootLayoutWrapperProps {
  children: React.ReactNode;
}

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
            <PassorderSvg />
            <span>패스오더란?</span>
          </div>
          <div className={styles.passorder_introduce}>
            카페 가는 길 미리 주문하고 <br />
            기다림 없이 바로 픽업하는 서비스예요.
          </div>
          <div className={styles.store_wrapper}>
            <img src={images.appStore} width={83} height={19} alt="애플스토어" onClick={onClickAppStoreButton} />
            |
            <img src={images.googlePlay} width={83} height={19} alt="구글플레이" onClick={onClickGooglePlayStoreButton} />
          </div>
          <div>
            <img src={images.passorderChat} width={260} height={410} alt="패스오더 이야기" />
          </div>
        </div>
      </aside>
      <main>{children}</main>
      <aside className={classNames(styles.side_view, styles.right)}>
        <div className={styles.trophy_wrapper}>
          <img src={images.trophy} width={140} height={120} alt="패스오더 업적" />
          <div className={styles.trophy_introduce}>
            <span className={classNames(styles.bold, styles.orange)}>150만 명 이상</span>
            의 유저들이 <br />
            <span className={styles.bold}>VIP 경험</span>을 하고 있습니다.
          </div>
        </div>
        <div className={styles.panel_wrapper}>
          <div className={styles.panel}>
            <div className={styles.store}>
              <img src={images.forbes} width={58} height={16} alt="포브스" />
              <span>포브스 선정</span>
            </div>
            <div className={styles.achievement}>한국인이 사랑한 식/음료 앱 11위</div>
          </div>
          <div className={styles.panel}>
            <div className={styles.store}>
              <img src={images.googlePlay} width={83} height={19} alt="구글 플레이" />
              <span>평점 ★4.8</span>
            </div>
            <div className={styles.achievement}>100만 회 이상 다운로드</div>
          </div>
          <div className={styles.panel}>
            <div className={styles.store}>
              <img src={images.appStore} width={83} height={19} alt="앱스토어" />
              <span>평점 ★4.8</span>
            </div>
            <div className={styles.achievement}>인기 앱 순위 3위</div>
          </div>
        </div>
        <div className={styles.qr_wrapper}>
          <img src={images.passorderQR} width={100} height={100} alt="패스오더 qr" />
          <div>패스오더 앱 다운로드 QR</div>
        </div>
      </aside>
    </div>
  );
}
