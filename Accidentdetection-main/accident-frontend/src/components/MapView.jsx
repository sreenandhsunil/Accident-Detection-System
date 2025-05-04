import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '10px',
};

const center = { lat: 9.9312, lng: 76.2673 };

const MapView = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'incidents'));
        const incidents = querySnapshot.docs.map((doc) => doc.data());
        setMarkers(incidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAyDTTrtQjoe-_uGCipivX0ZjUPBSvVP7E" // ✅ Remember to restrict this key in Google Cloud Console
    >
      <GoogleMap
  mapContainerStyle={containerStyle}
  center={center}
  zoom={13}
>
  {/* Static Dummy Marker */}
  <Marker
    position={{ lat: 10.0095, lng: 76.452639 }}
    title="Test Dummy Location"
  />

  {/* Firebase Incident Markers */}
  {markers
    .filter(
      (incident) =>
        !isNaN(incident.latitude) && !isNaN(incident.longitude)
    )
    .map((incident, index) => (
      <Marker
        key={index}
        position={{
          lat: parseFloat(incident.latitude),
          lng: parseFloat(incident.longitude),
        }}
        title={`${incident.location} - ${new Date(
          incident.timestamp
        ).toLocaleString()}`}
      />
    ))}
</GoogleMap>

    </LoadScript>
  );
};

export default MapView;
