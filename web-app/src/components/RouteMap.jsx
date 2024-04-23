import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { MapContainer, TileLayer } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function RouteMapModal() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  useEffect(() => {
    if (modalVisible) {
      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(51.5, -0.09), // Example waypoint 1
          L.latLng(51.51, -0.1) // Example waypoint 2
        ],
        routeWhileDragging: true
      }).addTo(map);
    }
  }, [modalVisible]);

  return (
    <div>
      {modalVisible && (
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
                <div id="map" style={{ height: "500px", width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
