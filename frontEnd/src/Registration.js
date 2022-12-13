import React, { useState, useRef } from "react";
import Display from "./Display";
import DisplayErr from "./DisplayErr";
import axios from "axios";

function Registration() {
  const [listDisplay, setListDisplay] = useState([]);
  let registrationRef = {
    firstName: useRef(0),
    surName: useRef(0),
    course: useRef(0),
    localization: useRef(0),
  };
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    course: "",
    localization: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    surname: "",
    course: "",
    localization: "",
  });
  const validate = (formData) => {
    let validationErrors = {
      firstname: false,
      surname: false,
      course: false,
      localization: false,
    };

    if (formData.firstName.trim().length < 2) {
      validationErrors.firstname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firstname: "Twoje imie musi zawierac conajmniej 2 znaki",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.firstName.trim())) {
      validationErrors.firstname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firstname: "Twoje imie nie moze zawierac pustych znakow typu spacja",
        };
      });
    } else {
      validationErrors.firstname = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, firstname: "" };
      });
    }

    if (formData.surName.trim().length < 2) {
      validationErrors.surname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          surname: "Twoje nazwisko musi zawierac conajmniej 2 znaki",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.surName.trim())) {
      validationErrors.surname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          surname: "Twoje nazwisko nie moze zawierac pustych znakow typu spacja",
        };
      });
    } else {
      validationErrors.surname = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, surname: "" };
      });
    }

    if (formData.course === "---" || formData.course === "") {
      validationErrors.course = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          course: "Musisz wybrac rodzaj kursu",
        };
      });
    } else {
      validationErrors.course = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, course: "" };
      });
    }

    if (formData.localization === "---" || formData.localization === "") {
      validationErrors.localization = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, localization: "Musisz wybrac lokalizacje" };
      });
    } else {
      validationErrors.localization = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, localization: "" };
      });
    }

    return (
      !validationErrors.firstname &&
      !validationErrors.surname &&
      !validationErrors.course &&
      !validationErrors.localization
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(validate(formData));
   console.log(event)
    if (validate(formData)) {
      axios
        .post("http://localhost:8080/api/add", {
          firstName: registrationRef.firstName.current.value,
          surName: registrationRef.surName.current.value,
          course: registrationRef.course.current.value,
          localization: registrationRef.localization.current.value,
        })
        .then(function (response) {
           console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          axios
            .get("http://localhost:8080/api/all")

            .catch((error) => {
              console.log("Error:", error);
            })
            .then((res) => {
              setListDisplay(res.data);
            });
            const tr = event.target;
            tr[0].value=""
            tr[1].value=""
            tr[2].value="---"
            tr[3].value="---"
           
        });
    }
  };
  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const removeElement = (idToRemove) => {
    setListDisplay(listDisplay.filter((item) => item._id !== idToRemove));
    console.log(listDisplay);
    axios.delete("http://localhost:8080/api/" + idToRemove);
  };
  /*axios
  .get("http://localhost:8080/api/all")

  .catch((error) => {
    console.log("Error:", error);
  })
  .then((res) => {
    setListDisplay(res.data);
  });*/
  return (
    <div id="forms">
      <form
        method="POST"
        action="http://localhost:8080/api/add"
        onSubmit={handleSubmit}
      >
        <label>
          <span>Wpisz imię:</span>
          <input 
            type="text"
            name="firstName"
            ref={registrationRef.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
        <span>Wpisz nazwisko:</span>
          <input
            type="text"
            name="surName"
            ref={registrationRef.surName}
            onChange={handleInputChange}
          />
        </label>
        <label>
        <span>Wybierz rodzaj kursu</span>
          <select
            name="course"
            ref={registrationRef.course}
            onChange={handleInputChange}
          >
            <option>---</option>
            <option>full stack</option>
            <option>front-end</option>
            <option>back-end</option>
          </select>
        </label>
        <label>
        <span> Wybierz miejsce kursu</span>
          <select
            name="localization"
            ref={registrationRef.localization}
            onChange={handleInputChange}
          >
            <option>---</option>
            <option>Ustron</option>
            <option>Zadupie</option>
            <option>White Stock</option>
            <option>Online</option>
          </select>
        </label>
        <button type="submit">Wyslij i wyswietl</button>
      </form>
      <DisplayErr errDisplay={errors} />
      <Display listDisplay={listDisplay} removeUserMethod={removeElement} />
    </div>
  );
}

export default Registration;
