import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = (props) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
      >
        <Marker
          icon={{
            url: "https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          position={{ lat: 21.027763, lng: 105.83416 }}
        />
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
