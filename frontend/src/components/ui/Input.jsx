import styles from "./input.module.css";

export default function Input({ label, ...props }) {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input {...props} className={styles.input} />
    </div>
  );
}