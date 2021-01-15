import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./createLine.module.css";
import Autocomplete from "react-google-autocomplete";
import MyMapComponent from "../map/map";

const CreateLine = () => {
  const [serviceTimeOptions, setServiceTimeOptions] = useState([
    ...Array(30).keys(),
  ]);
  const [location, setLocation] = useState();
  const [lat, setLat] = useState(-34.397);
  const [lng, setLng] = useState(150.644);
  const setMap = (place) => {
    setLocation(false);
    setLat(place.geometry.location.lat());
    setLng(place.geometry.location.lng());
  };
  useEffect(() => {
    setLocation(true);
  }, [lng]);
  return (
    <div>
      <header className={styles.header}>
        <h3>Line Setup</h3>
      </header>
      <div className={styles["page-container"]}>
        <p className="text-center pb-3">
          Please enter the following information to start your queue.
        </p>
        <Form>
          <Form.Group controlId="storeName">
            <Form.Label>Store name*</Form.Label>
            <Form.Control required type="text" placeholder="Enter store name" />
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Store location*</Form.Label>

            <Autocomplete
              style={{
                width: "100%",
                height: "calc(1.5em + .75rem + 2px)",
                borderRadius: ".25rem",
              }}
              onPlaceSelected={(place) => {
                setMap(place);
              }}
              types={["address"]}
            />
            {location && (
              <MyMapComponent
                lat={lat}
                lng={lng}
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Kx9Y9puWzmvyo9yVW_fCZvAiDNnKhlA&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `300px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            )}
          </Form.Group>

          <Form.Group controlId="serviceTime">
            <Form.Label>Average service time - per customer*</Form.Label>
            <Form.Control required as="select">
              {serviceTimeOptions.map((option) => (
                <option key={option}>{option + 1 + "min"}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            style={{
              backgroundColor: "#fca311",
              color: "#14213d",
              border: "none",
            }}
            className="w-100"
            type="submit"
          >
            Start queue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateLine;
