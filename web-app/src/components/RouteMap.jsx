import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { MapContainer, TileLayer } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function RouteMapModal({ waypoints, onRouteCalculated }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  let map;

  useEffect(() => {
    const modal = document.getElementById("redtruck");
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
    if (modalVisible) {
      map = L.map("routingmap").setView([51.505, -0.09], 18); // Adjusted zoom level to 18

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      const control = L.Routing.control({
        waypoints: waypoints,
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "blue", weight: 4 }] // Use the routeColor prop
        }
      }).addTo(map);

      control.on("routesfound", function (e) {
        const routes = e.routes;
        const route = routes[0]; // Assuming only one route
        const { distance, time } = route.summary;
        setDistance(distance);
        setTime(time);
        onRouteCalculated({ distance, time });
      });
    }
  }, [modalVisible, waypoints, onRouteCalculated]);

  return (
    <div>
      <div className="modal fade" id="redtruck" tabIndex="-1">
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
              <div id="routingmap" style={{ height: "500px", width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
