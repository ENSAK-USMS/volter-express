import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import SendProductModal from './SendProductModal'
import RouteMap from "./RouteMap";


const ProductsManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(
      "http://localhost:8080/api/orders/warehouse?page=0&size=20"
    ).then((response) => {
      setData(response.data);
      console.log("Data:", response.data);
    }
    ).catch((error) => {
      console.error('Error getting user location:', error);
    }
    );
  }, [setData]);

  useEffect(() => {
    console.log("datassss- ", data);
    // Initialize Ag-Grid instance
    const initGrid = () => {
      const gridOptions = {
        rowData: data,
        columnDefs: [
          {
            field: "id",
            headerName: "Product ID",
            filter: true,
            sortable: true,
            floatingFilter: true,
            width: 150,
          },
          {
            field: "totalAmount",
            headerName: "Total Amount",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            field: "weightKg",
            headerName: "Weight (kg)",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            field: "expirationDate",
            headerName: "Expiration Date",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            headerName: "Actions",
            cellRenderer: function (params) {
              return `<div class="btn-group" role="group">
                                <button type="button" class="btn mx-1 rounded-2 btn-sm btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#send" data-bs-dismiss="modal"><i class="ri-send-plane-fill"></i> Ship</button>
                            </div>`;
            },
            filter: false,
            sortable: false,
            autoHeight: true,
            cellStyle: { textAlign: "center" },
          },
        ],
        pagination: true,
        removePivotHeaderRowWhenSingleValueColumn: true,
        sideBar: true,
        paginationPageSize: 20,
        defaultColDef: {
          flex: 1,
        },
      };

      const gridDiv = document.querySelector("#productsGrid");

      //   remove the ag-Grid old instance
      if (gridDiv != null) {
        gridDiv.innerHTML = "";
      }


      new agGrid.Grid(gridDiv, gridOptions);
    };

    initGrid();
  }, [setData, data]);

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
  const [waypoints, setWaypoints] = useState([]);

  const addWaypoint = (waypoint) => {
    setWaypoints([...waypoints, waypoint]);
  };
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        firstName,
        lastName,
        "login": username,
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
      <div className="container card-shadow content mb-5 mt-4 rounded-4">
        <div className="d-flex justify-content-between px-4 pt-4">
          <div className="text my-3 col-6">Products management</div>
          <div className="col-6 text-end">
            <div class="btn-group" role="group">
              <button type="button" class="btn mx-1 rounded-2 btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#send" data-bs-dismiss="modal"><i class="ri-send-plane-fill"></i> Send Order</button>
            </div>
          </div>
        </div>
        <div className="col-md-12 d-flex flex-column">
          <div className="rounded-4 p-4">
            <div
              id="productsGrid"
              className="ag-theme-alpine"
              style={{ height: "75vh", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
      <SendProductModal data={data} />
      <RouteMap
        waypoints={[
          L.latLng(34.020882, -6.841650), // Rabat
          L.latLng(33.971590, -6.849813), // Temara
          L.latLng(33.926039, -6.894477), // Bouznika
          L.latLng(33.691515, -7.392832), // Mohammedia
          L.latLng(33.595062, -7.618754), // Ain Harrouda
          L.latLng(33.589886, -7.603869), // Casablanca
        ]}
      />

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
              <div className="modal-footer">
                <button type="button" class="btn mx-1 rounded-2 btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#send" data-bs-dismiss="modal">Go Back To The Form</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsManagement;
