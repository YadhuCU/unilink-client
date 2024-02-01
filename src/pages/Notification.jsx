import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";

Notification.propTypes = {};

export function Notification() {
  return (
    <>
      <LeftSidebar />
      <div>Notification</div>
      <RightSidebar />
    </>
  );
}
