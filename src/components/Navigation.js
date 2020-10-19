import React from "react";

const Navigation = ({ onRouteChnage, signedIn }) => {
  if (signedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChnage("signForm")}
          className="f3 link grow navy pa1 mt4 mr4 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChnage("signForm")}
          className="f3 link grow navy pa1 mt4 mr4 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChnage("Register")}
          className="f3 link grow navy pa1 mt4 mr4 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
