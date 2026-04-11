import styles from "./button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  full = false
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${full ? styles.full : ""}
      `}
    >
      {children}
    </button>
  );
}