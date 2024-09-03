import React from "react";

function Footer() {
  return (
    // Define a footer with centered text alignment using inline styles.
    <footer style={{ textAlign: "center" }}>
      {/* Display the list of collaborators on the left side of the footer */}
      <div className="left-side">
        A Collaboration by Vincent, Donna, Destiny, Zach and Greg
      </div>
      {/* Display the copyright notice on the right side of the footer */}
      <div className="right-side">Copyright 2024</div>
    </footer>
  );
}

export default Footer;

