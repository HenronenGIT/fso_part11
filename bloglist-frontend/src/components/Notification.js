import React from "react";
import "../styles/index.css";
import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  if (message === null) return null;
  else if (type === 0) return <div className="success">{message}</div>;
  else if (type === 1) return <div className="error">{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.number,
};

export default Notification;
