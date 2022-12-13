import React from "react";
import './DisplayErr.css'
function DisplayErr(props) {


  let errDisplay = props.errDisplay;
 

  return (
 <ul>
    <li>{errDisplay.firstname}</li>
    <li>{errDisplay.surname}</li>
    <li>{errDisplay.course}</li>
    <li>{errDisplay.localization}</li>
 </ul>
  );
}

export default DisplayErr;