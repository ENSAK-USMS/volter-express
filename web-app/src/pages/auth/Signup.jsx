import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// leaflet
import L from 'leaflet';

export default function SignUp() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [mapInitialized, setMapInitialized] = useState(false);
    const [marker, setMarker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        const modalElement = document.getElementById('mapModal');
    
        if (modalElement) {
            // Function to initialize the map
            const initializeMap = () => {
                if (!mapInitialized) {
                    const mapContainer = document.getElementById('mapContainer');
                    if (!mapContainer) {
                        // If map container is not found, create it
                        const newMapContainer = document.createElement('div');
                        newMapContainer.id = 'mapContainer';
                        modalElement.appendChild(newMapContainer);
                    }
    
                    // Initialize map centered at user's current position
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            const map = L.map('mapContainer').setView([latitude, longitude], 16);
    
                            L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
                                maxZoom: 20,
                                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                            }).addTo(map);
    
                            // Initialize the marker and circle at user's position
                            const initialPosition = L.latLng(latitude, longitude);
                            const newMarker = L.marker(initialPosition, { draggable: true }).addTo(map);
                            const circle = L.circle(initialPosition, { radius: 15, fillColor: 'red' }).addTo(map);
                            document.getElementById('location').value = `Latitude: ${initialPosition.lat}, Longitude: ${initialPosition.lng}`;
    
                            // Event handler for marker dragend
                            newMarker.on('dragend', (e) => {
                                const coordinates = e.target.getLatLng();
                                circle.setLatLng(coordinates);
                                document.getElementById('location').value = `Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`;
                            });
    
                            setMarker(newMarker);
    
                            // Set mapInitialized to true after initialization
                            setMapInitialized(true);
                        },
                        (error) => {
                            console.error('Error getting user location:', error);
                        }
                    );
                }
            };
    
            // Check if the modal is currently being shown
            const isModalShown = () => modalElement.classList.contains('show');
    
            // If the modal is shown, initialize the map
            if (isModalShown()) {
                initializeMap();
            }
    
            // Event listener for when the modal is shown
            const onModalShow = () => {
                initializeMap();
            };
    
            // Event listener for when the modal is hidden
            const onModalHidden = () => {
                // Reset mapInitialized state when modal is hidden
                setMapInitialized(false);
    
            };
    
            // Add event listeners for modal show and hidden events
            modalElement.addEventListener('shown.bs.modal', onModalShow);
            modalElement.addEventListener('hidden.bs.modal', onModalHidden);
    
            // Clean up event listeners when unmounting
            return () => {
                modalElement.removeEventListener('shown.bs.modal', onModalShow);
                modalElement.removeEventListener('hidden.bs.modal', onModalHidden);
            };
        }
    }, []);
    
    
    
    const showModal = () => {
        setModalVisible(true);
        initializeMap();
    };
    
    const hideModal = () => {
        setModalVisible(false);
    };

    const onSubmit = async (data) => {
        console.log(data);
        await login(data);
        navigate("/dashboard");
    };
    
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow p-4 rounded col-7">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" placeholder="Your Phone Number" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="streetName" className="form-label">Street Name</label>
                                    <input type="text" className="form-control" id="streetName" placeholder="Your Street Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="Your City" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Your Country" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Localisation</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control red" id="location" placeholder="Votre localisation" disabled />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mapModal">Sélectionner <i className="ri-road-map-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="mb-0">Already have an account? <a href="login">Login</a></p>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="mapModal" >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content rounded-4 px-2">
                        <div className="modal-body">
                            <div className="modal-header">
                                <h5 className="modal-title">Map Modal</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div id="mapContainer" style={{ height: '500px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
