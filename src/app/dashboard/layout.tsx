import styles from "./dashboard.module.css";
import Header from "./Header";
export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Header />
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
}
