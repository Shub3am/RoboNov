import styles from "./dashboard.module.css";
export default function Layout(props: {
  children: React.ReactNode;
  profile: React.ReactNode;
  orders: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.container}>
        <div>{props.children}</div>
        <div className={styles.content}>
          {false ? props.profile : props.orders}
          {props.orders}
        </div>
      </div>
    </>
  );
}
