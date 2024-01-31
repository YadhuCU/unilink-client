import PropTypes from "prop-types";
import { Navbar } from "../components/Navbar";

Home.propTypes = {};

export function Home() {
  return (
    <div className="border-x border-slate-900">
      <Navbar insideHome />
    </div>
  );
}
