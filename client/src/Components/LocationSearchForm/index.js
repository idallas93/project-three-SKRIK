import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useGlobalContext } from "../../context/GlobalContext";
import "./style.css";


function LocationSearchForm({ searchParks }) {
  const [state, dispatch] = useGlobalContext();
  const zipRef = useRef();
  const radiusRef = useRef();

  const searchClick = (e) => {
    e.preventDefault();
    const radius = radiusRef.current.value * 1609;
    const zipcode = zipRef.current.value;
    console.log("POOOOOOOOOOOP", radius);
    searchParks(radius, zipcode);
  };

  return (
    <Form className="locationSearchForm">
          <h2 className="inYourArea"> Search For Dog Parks In Your Area</h2>
          <br></br>
      <Form.Group>
        <label htmlFor="zip">Zip-Code:</label>
        <input
          defaultValue={
            state.apiToken
              ? JSON.parse(localStorage.getItem("user")).zipcode
              : ""
          }
          name="zip"
          type="text"
          ref={zipRef}
          className="zipCodeInput"
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="radius">Radius:</label>
        <input
          type="number"
          name="radius"
          min="0"
          max="30"
          step="0.1"
          ref={radiusRef}
          className="radiusInput"

        />
      </Form.Group>

      <Button variant="secondary" size="lg" className="zipCodeButton" type="submit" onClick={searchClick}>
        Search
      </Button>
    </Form>
  );
}

export default LocationSearchForm;
