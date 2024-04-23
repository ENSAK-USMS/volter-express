import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '../../components/Modal';

function LocationMarker({ setLocation }) {
    useMapEvents({
        click: e => {
            const { lat, lng } = e.latlng;
            setLocation([lat, lng]); // Update parent component's state
            document.getElementById('location').value = `Latitude: ${lat}, Longitude: ${lng}`;
        }
    });

    return null;  // No need to return a Marker as we handle marker positioning separately
}

export default function SignUp() {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [modalVisible, setModalVisible] = useState(false);

    // Effect to monitor modal visibility
    useEffect(() => {
        const modal = document.getElementById('mapModal');
        const modalListener = () => setModalVisible(true);

        modal.addEventListener('shown.bs.modal', modalListener);
        return () => {
            modal.removeEventListener('shown.bs.modal', modalListener);
        };
    }, []);

    return (
        <>
            <Modal />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mapModal">
                Show Map
            </button>
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
                                            url='http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}'
                                            maxZoom={20}
                                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                        />
                                        <LocationMarker setLocation={setPosition} />
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