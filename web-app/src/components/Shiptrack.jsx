import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { MapContainer, TileLayer } from "react-leaflet";
import ShipGrid from "./ShipGrid";

import truckIconImage from "../assets/truck.svg"; // Rename the import variable

export default function RouteMapModal() {
  const [modalVisible, setModalVisible] = useState(false);
  let map;
  let truckMarker;

  useEffect(() => {
    const modal = document.getElementById("livetrack");
    const showModalListener = () => setModalVisible(true);
    const hideModalListener = () => {
      setModalVisible(false);
      if (map) {
        map.remove();
        map = null;
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
    if (modalVisible && !map) {
      map = L.map("routingmap").setView([51.505, -0.09], 14); // Adjusted zoom level to 14 for better visibility

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      // Coordinates of Rabat and Casablanca
      const rabatLatLng = [34.020882, -6.841650];
      const casablancaLatLng = [33.573110, -7.589843];

      const rabatMarker = L.marker(rabatLatLng).addTo(map).bindPopup('Rabat');
      const casablancaMarker = L.marker(casablancaLatLng).addTo(map).bindPopup('Casablanca');

      const control = L.Routing.control({
        waypoints: [
          L.latLng(rabatLatLng[0], rabatLatLng[1]),
          L.latLng(casablancaLatLng[0], casablancaLatLng[1])
        ],
        routeWhileDragging: false,
        draggableWaypoints: false,
        lineOptions: {
          styles: [{ color: "red", weight: 5 }] // Use the routeColor prop
        }
      }).addTo(map);

      // Create the truck icon using the truck icon image
      const truckIcon = L.icon({
        iconUrl: truckIconImage,
        iconSize: [32, 32], // Adjust the size as needed
      });

      // Define the position for the truck marker
      const truckLatLng = L.latLng(33.796961, -7.554564); // Example location along the road

      // Create the truck marker using the truck icon
      truckMarker = L.marker(truckLatLng, { icon: truckIcon }).addTo(map).bindPopup('Truck');

      map.setView(rabatLatLng, 14); // Adjusted zoom level to 14 for better visibility

    }
  }, [modalVisible, map]);
  
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
