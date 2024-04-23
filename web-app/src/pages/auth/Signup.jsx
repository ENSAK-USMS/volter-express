import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '../../components/Modal';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function SignUp() {
    const [position, setPosition] = useState([34.020882, -6.841650]); // Initial position set to Rabat
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef(null);


    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      document.getElementById(
        "location"
      ).value = `Latitude: ${lat}, Longitude: ${lng}`;
    };

    useEffect(() => {
      const modal = document.getElementById("mapModal");
      const modalListener = () => setModalVisible(true);

      modal.addEventListener("shown.bs.modal", modalListener);
      return () => {
        modal.removeEventListener("shown.bs.modal", modalListener);
      };
    }, [setModalVisible, handleMapClick]);



    // Define custom marker icon
    const customMarkerIcon = new L.Icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    function LocationMarker() {
        useMapEvents({
            click(e) {
                handleMapClick(e);
            },
        });

        return position === null ? null : (
            <Marker position={position} icon={customMarkerIcon} />
        );
    }

    return (
        <>
            <Modal />
            <div className="modal fade" id="mapModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content rounded-4 px-2">
                        <div className="modal-body">
                            <div className="modal-header">
                                <h5 className="modal-title">Map Modal</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {modalVisible && (
                                <div style={{ height: '500px', width: '100%' }}>
                                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                                        <TileLayer
                                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                                            maxZoom={20}
                                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                        />
                                        <LocationMarker />
                                    </MapContainer>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
