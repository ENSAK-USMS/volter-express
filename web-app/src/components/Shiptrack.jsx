import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { MapContainer, TileLayer } from "react-leaflet";
import ShipGrid from "./ShipGrid";

import truckIconImage from "../assets/truck.svg"; // Rename the import variable

export default function RouteMapModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [truckLocation, setTruckLocation] = useState([33.796961, -7.554564]);
  const mapRef = useRef(null);
  const truckMarkerRef = useRef(null);

  useEffect(() => {
    const modal = document.getElementById("livetrack");
    const showModalListener = () => setModalVisible(true);
    const hideModalListener = () => {
      setModalVisible(false);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };

    modal.addEventListener("shown.bs.modal", showModalListener);
    modal.addEventListener("hidden.bs.modal", hideModalListener);

    return () => {
      modal.removeEventListener("shown.bs.modal", showModalListener);
      modal.removeEventListener("hidden.bs.modal", hideModalListener);
    };
  }, []);

  useEffect(() => {
    if (modalVisible && !mapRef.current) {
      const map = L.map("routingmap").setView([51.505, -0.09], 14); // Adjusted zoom level to 14 for better visibility
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Coordinates of Rabat and Casablanca
      const rabatLatLng = [34.020882, -6.84165];
      const casablancaLatLng = [33.57311, -7.589843];

      const rabatMarker = L.marker(rabatLatLng).addTo(map).bindPopup("Rabat");
      const casablancaMarker = L.marker(casablancaLatLng)
        .addTo(map)
        .bindPopup("Casablanca");

      const control = L.Routing.control({
        waypoints: [
          L.latLng(rabatLatLng[0], rabatLatLng[1]),
          L.latLng(casablancaLatLng[0], casablancaLatLng[1]),
        ],
        routeWhileDragging: false,
        draggableWaypoints: false,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }], // Use the routeColor prop
        },
      }).addTo(map);

      // Create the truck icon using the truck icon image
      const truckIcon = L.icon({
        iconUrl: truckIconImage,
        iconSize: [32, 32], // Adjust the size as needed
      });

      // Define the initial position for the truck marker
      const truckLatLng = L.latLng(33.796961, -7.554564); // Example location along the road

      // Create the truck marker using the truck icon
      const truckMarker = L.marker(truckLatLng, { icon: truckIcon })
        .addTo(map)
        .bindPopup("Truck");
      truckMarkerRef.current = truckMarker;

      map.setView(rabatLatLng, 14); // Adjusted zoom level to 14 for better visibility

      // Set up SSE connection to receive truck location updates
      const sse = new EventSource(
        `http://localhost:8080/api/delivery-trucks/delivery-trucks/6627ae7a50f66b0313b909bf/location`
      );

      sse.onmessage = (event) => {
        const truckLocation = JSON.parse(event.data);
        console.log("Truck location:", truckLocation);
        setTruckLocation([truckLocation[0], truckLocation[1]]);
      };

      sse.onerror = (error) => {
        console.error("SSE error:", error);
        sse.close();
      };
    }

    // Update truck marker location when truckLocation changes
    if (truckMarkerRef.current) {
      truckMarkerRef.current.setLatLng(truckLocation);
    }
  }, [modalVisible, truckLocation]);

  return (
    <div>
      <ShipGrid />
      <div className="modal fade" id="livetrack" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content rounded-4 px-2">
            <div className="modal-body">
              <div className="modal-header">
                <h5 className="modal-title">Live Tracking</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div id="routingmap" style={{ height: "500px", width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
