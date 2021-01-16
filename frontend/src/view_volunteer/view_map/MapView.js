import ReactMapGL, { NavigationControl, Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import React, { useState, useEffect } from 'react';

//css
import './MapView.css';

//components
import TaskDescriptionCard from './TaskDescriptionCard/TaskDescriptionCard';
import RequestVolunteerCard from './RequestVolunteerCard/RequestVolunteerCard';

function MapView(props) { 
  //location
  const [viewport, setViewport] = useState(null);

  //component did mount
  useEffect(() => {
    //user allow locaiton
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10
        });
      });
    }
  }, []);

  if(viewport){
    return (
      <div className = "mapView">
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle='mapbox://styles/mapbox/outdoors-v10?optimize=true'
          mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX_API_KEY}
          onViewportChange={nextViewport => setViewport(nextViewport)}>
            {props.isRequestView &&
              <RequestVolunteerCard />}
            <TaskDescriptionCard />
          </ReactMapGL>
      </div>
    );
  }
  else{
    return null;
  }
}

export default MapView;