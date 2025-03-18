import { isWithinInterval } from "date-fns";
import React from "react";


function Footer() {

  function getYear () {
    const currentYear = new Date().getFullYear()
    return currentYear
  }

  return (
    // Define a footer with centered text alignment using inline styles.
    <footer style={{ textAlign: "center" }}>
      {/* Display the list of collaborators on the left side of the footer */}
      <div className="left-side">
        This site is maintained by Greg Bailey. Originally started as a collaborative project. See <a href="https://github.com/zmuda44/travel-blog">repo for details</a>
      </div>
      {/* Display the copyright notice on the right side of the footer */}
      <div className="right-side">Copyright {getYear()} </div>
    </footer>
  );
}

export default Footer;

