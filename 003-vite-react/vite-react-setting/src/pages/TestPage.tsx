import styles from './TestPage.module.scss';
import variables from '../styles/palette.module.scss';

interface TestPageProps {
  text?: string;
}

export default function TestPage({ text }: TestPageProps) {
  return (
    <div className={styles.container}>
      {text && <div>{text}</div>}
      <div>test</div>
      <button disabled>test button</button>
      <div style={{ color: variables.primary }}>varibales???</div>
    </div>
  );
}
