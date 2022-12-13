import React from "react";
function Display(props) {


  let listDisplay = props.listDisplay;
  let listDisplayTable = listDisplay.map((user, index) => {
    return (
      <tr key={index}>
        <td key={user._id}>{user.firstName}{" "}{user.surName}</td>
        <td key={user._id + "1"}>{user.course}</td>
        <td key={user._id + "2"}>{user.localization}{" "}</td>
         <td key={user._id + "3"} class="ded"> <span onClick={() => props.removeUserMethod(user._id)}>usun</span></td>
      </tr>
    );
  });

  return (
    <table id="wys">
      <tbody>
        <tr id="tytulLabel">
<td>Imie i nazwisko</td>
<td>Rodzaj kursu</td>
<td>Miejsce</td>
        </tr>
        {listDisplayTable}</tbody>
    </table>
  );
}

export default Display;
