import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ lat, lon, onClose }) => {
  useEffect(() => {
    // Estilos personalizados para el marcador
    const icon = L.divIcon({
      className: "custom-icon",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      html: `<div style="background-color: red; border-radius: 50%; width: 20px; height: 20px;"></div>`,
    });

    // Código para inicializar el mapa con Leaflet cuando el componente se monta en el DOM
    const map = L.map("map").setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.marker([lat, lon], { icon }).addTo(map);

    // Asegurarse de que el mapa se destruya cuando el componente se desmonte
    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return (
    <div className="map-container">
      <div id="map" style={{ height: "400px" }}></div>
      <button onClick={onClose}>Cerrar Mapa</button>
    </div>
  );
};

export default Map;

