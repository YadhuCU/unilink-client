import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";

Message.propTypes = {};

export function Message() {
  return (
    <>
      <LeftSidebar />
      <div className="border">Message</div>
    </>
  );
}
