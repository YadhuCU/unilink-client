import PropTypes from "prop-types";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";

Profile.propTypes = {};

export function Profile() {
  return (
    <>
      <LeftSidebar />
      <div>Profile</div>
      <RightSidebar />
    </>
  );
}
