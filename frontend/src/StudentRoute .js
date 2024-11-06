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

const StudentRoute = ({ busLocation }) => {
  const [routeControl, setRouteControl] = useState(null);

  const createRoute = (map, busLocation, collegeLocation) => {
    if (routeControl) {
      routeControl.setWaypoints([L.latLng(busLocation), L.latLng(collegeLocation)]);
    } else {
      const newRouteControl = L.Routing.control({
        waypoints: [L.latLng(busLocation), L.latLng(collegeLocation)],
        routeWhileDragging: true,
        createMarker: () => null,
      }).addTo(map);
      setRouteControl(newRouteControl);
    }
  };

  const MapRoute = ({ busLocation, collegeLocation }) => {
    const map = useMap();

    useEffect(() => {
      if (busLocation) {
        createRoute(map, busLocation, collegeLocation);
      }
    }, [busLocation, map, collegeLocation]);

    return null;
  };

  return (
    <div>
      <h2>Student View - Bus Location</h2>
      <MapContainer center={collegeLocation} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {busLocation && (
          <Marker position={busLocation} icon={busIcon}>
            <Popup>Bus Location</Popup>
          </Marker>
        )}
        <Marker position={collegeLocation}>
          <Popup>College Location</Popup>
        </Marker>
        <MapRoute busLocation={busLocation} collegeLocation={collegeLocation} />
      </MapContainer>
    </div>
  );
};

const BusTrackingApp = () => {
  const [busLocation, setBusLocation] = useState(null);

  const fetchBusLocation = () => {
    // For student view, you could simulate fetching bus location from a server.
    // You might replace this logic with an API call to get the bus location in a real app.
    setBusLocation([10.957, 77.955]); // Example coordinates
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBusLocation(); // Update location for students every second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <StudentRoute busLocation={busLocation} />;
};

export default BusTrackingApp;
