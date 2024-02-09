import { ErrorIcon } from "../Icons/Error";

export const Input = ({ label, id, errorMessage, className, ...rest }) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={"inputHolder"}>
        <input
          type="text"
          name={id}
          id={id}
          className={`${className} ${!!errorMessage ? "error" : ""}`}
          {...rest}
        />
        {!!errorMessage && (
          <ErrorIcon style={{ position: "absolute", right: 10, top: 10 }} />
        )}
      </div>

      {!!errorMessage && <span className={"errorMessage"}>{errorMessage}</span>}
    </>
  );
};
