import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine

// Set up the icon for the bus marker
const busIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const collegeLocation = [10.95628961382053, 77.95483683491189]; // College location

const DriverRoute = () => {
  const [busLocation, setBusLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  let intervalId = null;

  const startTracking = () => {
    if (navigator.geolocation) {
      setIsTracking(true);
      intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setBusLocation([latitude, longitude]);
          },
          (error) => {
            console.error(error);
            alert("Error getting location.");
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
        );
      }, 1000); // Update every second
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const stopTracking = () => {
    clearInterval(intervalId);
    setIsTracking(false);
  };

  useEffect(() => {
    if (isTracking) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      clearInterval(intervalId); // Clean up on unmount
    };
  }, [isTracking]);

  const MapRoute = ({ busLocation, collegeLocation }) => {
    const map = useMap();

    useEffect(() => {
      if (busLocation) {
        const routeControl = L.Routing.control({
          waypoints: [L.latLng(busLocation), L.latLng(collegeLocation)],
          routeWhileDragging: true,
          createMarker: () => null,
        }).addTo(map);
        return () => routeControl.remove();
      }
    }, [busLocation, collegeLocation, map]);

    return null; // This component doesn't render anything, it only handles map logic
  };

  return (
    <div>
      <h2>Driver View - Track Bus Location</h2>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? "Stop Tracking" : "Start Tracking"}
      </button>
      <MapContainer center={collegeLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {busLocation && (
          <>
            <Marker position={busLocation} icon={busIcon}>
              <Popup>Your Bus Location</Popup>
            </Marker>
          </>
        )}
        <Marker position={collegeLocation}>
          <Popup>College Location</Popup>
        </Marker>
        <MapRoute busLocation={busLocation} collegeLocation={collegeLocation} />
      </MapContainer>
    </div>
  );
};

export default DriverRoute;
