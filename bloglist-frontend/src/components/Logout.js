import React from "react";
import PropTypes from "prop-types";

const Logout = ({ username, handleLogout }) => {
  return (
    <div>
      {username} logged in
      <button id="logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

Logout.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default Logout;
