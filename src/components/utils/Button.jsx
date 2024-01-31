import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.any,
  buttonClick: PropTypes.func,
  classes: PropTypes.string,
};

export function Button({ children, buttonClick, classes }) {
  return (
    <button
      onClick={buttonClick}
      className={`px-5 py-3 rounded-[100vw] font-bold text-slate-950 bg-slate-100 hover:bg-slate-300 transition ${classes}`}
    >
      {children}
    </button>
  );
}
