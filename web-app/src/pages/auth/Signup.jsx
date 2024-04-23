import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function SignUp() {
    const [position, setPosition] = useState([34.020882, -6.841650]); // Initial position set to Rabat
    const [modalVisible, setModalVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/register", {
                firstName,
                lastName,
                "login":username,
                email,
                password
            });
            navigate("/login");
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    // Call handleSignUp when the signup form is submitted
    // For example, if you have a form with an onSubmit event handler
    // <form onSubmit={handleSignUp}>
    //   ...
    //   <button type="submit">Sign Up</button>
    // </form>

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
            <div>
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card shadow p-5 rounded col-7 rounded-4">
                        <h2 className="text-center mb-4">Sign Up</h2>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="fname" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fname"
                                            placeholder="Yourfirst Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="lname" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lname"
                                            placeholder="Your Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            UserName
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Your Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="streetName" className="form-label">
                                            Street Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="streetName"
                                            placeholder="Your Street Name"
                                            value={streetName}
                                            onChange={(e) => setStreetName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            placeholder="Your City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            placeholder="Your Country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Localisation</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control red"
                                                id="location"
                                                placeholder="Votre localisation"
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#mapModal"
                                            >
                                                Sélectionner <i className="ri-road-map-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary" onClick={handleSignUp}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <p className="mb-0">
                                Already have an account? <a href="login">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="mapModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content rounded-4 px-2">
                        <div className="modal-body">
                            <div className="modal-header">
                                <h5 className="modal-title">Map Modal</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            {modalVisible && (
                                <div style={{ height: "500px", width: "100%" }}>
                                    <MapContainer
                                        center={position}
                                        zoom={13}
                                        style={{ height: "100%", width: "100%" }}
                                        scrollWheelZoom={true}
                                    >
                                        <TileLayer
                                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            maxZoom={20}
                                            subdomains={['a', 'b', 'c']}
                                        />
                                        {position && <Marker position={position} icon={customMarkerIcon} />}
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
