import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Api.css";
import Map from "./Map";
//Importo axios para conectar con la API
//Importo Map para crear el mapa y posicionar el incendio

export const Api = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [provinciaFilter, setProvinciaFilter] = useState("");
  const [causaProbableFilter, setCausaProbableFilter] = useState("");
  const [situacionActualFilter, setSituacionActualFilter] = useState("");
  const [nivelMaximoFilter, setNivelMaximoFilter] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [incendioSeleccionado, setIncendioSeleccionado] = useState(null);

  //Esta función detecta el cambio al aplicar el filtro de provincia
  function handleProvinciaFilter(event) {
    setProvinciaFilter(event.target.value);
    localStorage.setItem("provinciaFilter", event.target.value);
    setOffset(0);
  }

  //Esta función detecta el cambio al aplicar el filtro de causa probable
  function handleCausaProbableFilter(event) {
    setCausaProbableFilter(event.target.value);
    localStorage.setItem("causaProbableFilter", event.target.value);
    setOffset(0);
  }

  //Esta función detecta el cambio al aplicar el filtro de sitacion actual
  function handleSituacionActualFilter(event) {
    setSituacionActualFilter(event.target.value);
    localStorage.setItem("situacionActualFilter", event.target.value);
    setOffset(0);
  }

  //Esta función detecta el cambio al aplicar el filtro de máximo nivel alcanzado
  function handleNivelMaximoFilter(event) {
    setNivelMaximoFilter(event.target.value);
    localStorage.setItem("nivelMaximoFilter", event.target.value);
    setOffset(0);
  }

  //Esta función filtra los incendios según el filtro seleccionado
  const filteredData = data.filter((incendio) => {
    return (
      (provinciaFilter === "" ||
        incendio.provincia.includes(provinciaFilter)) &&
      (causaProbableFilter === "" ||
        incendio.causa_probable === causaProbableFilter) &&
      (situacionActualFilter === "" ||
        incendio.situacion_actual === situacionActualFilter) &&
      (nivelMaximoFilter === "" ||
        incendio.nivel_maximo_alcanzado === nivelMaximoFilter)
    );
  });

  useEffect(() => {
    //Aquí estoy comprobando si hay algun filtro seleccionado en el local storage y si lo hay lo recoge para cargar el componente con el filtro previamente aplicado
    const storedProvinciaFilter = localStorage.getItem("provinciaFilter");
    const storedCausaProbableFilter = localStorage.getItem(
      "causaProbableFilter"
    );
    const storedSituacionActualFilter = localStorage.getItem(
      "situacionActualFilter"
    );
    const storedNivelMaximoFilter = localStorage.getItem("nivelMaximoFilter");

    if (storedProvinciaFilter) {
      setProvinciaFilter(storedProvinciaFilter);
    }
    if (storedCausaProbableFilter) {
      setCausaProbableFilter(storedCausaProbableFilter);
    }
    if (storedSituacionActualFilter) {
      setSituacionActualFilter(storedSituacionActualFilter);
    }
    if (storedNivelMaximoFilter) {
      setNivelMaximoFilter(storedNivelMaximoFilter);
    }

    //Llamo a la api para traer todos los incendios
    let apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;

    //Llamo a la API para filtrar por provinicia Ávila
    if (provinciaFilter === "ÁVILA") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20provincia%20%3D%20%22%C3%81VILA%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por provinicia LEÓN
    if (provinciaFilter === "LEÓN") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20provincia%20%3D%20%22LE%C3%93N%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por provincias
    else if (provinciaFilter) {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20provincia%20%3D%20%22${provinciaFilter}%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable EN INVESTIGACIÓN
    if (causaProbableFilter === "EN INVESTIGACIÓN") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22EN%20INVESTIGACI%C3%93N%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable ACCIDENTAL (MOTORES Y MÁQUINAS)
    if (causaProbableFilter === "ACCIDENTAL (MOTORES Y MÁQUINAS)") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22ACCIDENTAL%20(MOTORES%20Y%20M%C3%81QUINAS)%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable NEGLIGENCIAS (LÍNEAS ELÉCTRICAS)
    if (causaProbableFilter === "NEGLIGENCIAS (LÍNEAS ELÉCTRICAS)") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22NEGLIGENCIAS%20(L%C3%8DNEAS%20EL%C3%89CTRICAS)%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable NEGLIGENCIAS (QUEMA AGRÍCOLA)
    if (causaProbableFilter === "NEGLIGENCIAS (QUEMA AGRÍCOLA)") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22NEGLIGENCIAS%20(QUEMA%20AGR%C3%8DCOLA)%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable NEGLIGENCIAS (LIMPIEZAS DE VEGETACIÓN)
    if (causaProbableFilter === "NEGLIGENCIAS (LIMPIEZAS DE VEGETACIÓN)") {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22NEGLIGENCIAS%20(LIMPIEZAS%20DE%20VEGETACI%C3%93N)%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable NEGLIGENCIAS (ELIMINACIÓN DE BASURAS Y RESTOS)
    if (
      causaProbableFilter === "NEGLIGENCIAS (ELIMINACIÓN DE BASURAS Y RESTOS)"
    ) {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22NEGLIGENCIAS%20(ELIMINACI%C3%93N%20DE%20BASURAS%20Y%20RESTOS)%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por causa probable
    else if (causaProbableFilter) {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20causa_probable%20%3D%20%22${causaProbableFilter}%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por situacion actual
    if (situacionActualFilter) {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20situacion_actual%20%3D%20%22${situacionActualFilter}%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Llamo a la API para filtrar por nivel máximo
    if (nivelMaximoFilter) {
      apiURL = `https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/incendios-forestales/records?where=fecha_del_parte%20%3E%202021%20and%20nivel_maximo_alcanzado%20%3D%20%22${nivelMaximoFilter}%22&order_by=fecha_del_parte%20asc&limit=10&offset=${offset}`;
    }

    //Conecto con la API para traer los datos
    axios
      .get(apiURL)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la API data", error);
      });
  }, [
    offset,
    provinciaFilter,
    causaProbableFilter,
    situacionActualFilter,
    nivelMaximoFilter,
  ]);

  //Esta función me pagina hacia delante los incendios
  function paginadohaciadelante() {
    setOffset(offset + 10);
  }

  //Esta función me pagina hacia atrás los incendios
  function paginadohaciadetras() {
    if (offset != 0) {
      setOffset(offset - 10);
    }
  }

  //Esta función me muestra el mapa al hacer click en el botón mostras mapa
  function mostrarMapa(incendio) {
    setMapVisible(true);
    setIncendioSeleccionado(incendio);
  }

  return (
    <>
      <div className="apiCentral">
        <h1 className="h1">Incendios en Castilla y Leon desde el año 2022</h1>
        <div className="select">
          <select value={provinciaFilter} onChange={handleProvinciaFilter}>
            <option value="">Filtrar por provincia</option>
            <option value="ÁVILA">ÁVILA</option>
            <option value="BURGOS">BURGOS</option>
            <option value="LEÓN">LEÓN</option>
            <option value="PALENCIA">PALENCIA</option>
            <option value="SALAMANCA">SALAMANCA</option>
            <option value="SEGOVIA">SEGOVIA</option>
            <option value="SORIA">SORIA</option>
            <option value="VALLADOLID">VALLADOLID</option>
            <option value="ZAMORA">ZAMORA</option>
          </select>
          <select
            value={causaProbableFilter}
            onChange={handleCausaProbableFilter}
          >
            <option value="">Filtrar por causa probable</option>
            <option value="EN INVESTIGACIÓN">EN INVESTIGACIÓN</option>
            <option value="RAYO">RAYO</option>
            <option value="ACCIDENTAL (MOTORES Y MÁQUINAS)">
              ACCIDENTAL (MOTORES Y MÁQUINAS)
            </option>
            <option value="NEGLIGENCIAS (ACTIVIDADES MILITARES)">
              NEGLIGENCIAS (ACTIVIDADES MILITARES)
            </option>
            <option value="NEGLIGENCIAS (LÍNEAS ELÉCTRICAS)">
              NEGLIGENCIAS (LÍNEAS ELÉCTRICAS)
            </option>
            <option value="NEGLIGENCIAS (QUEMA AGRÍCOLA)">
              NEGLIGENCIAS (QUEMA AGRÍCOLA)
            </option>
            <option value="INTENCIONADO">INTENCIONADO</option>
            <option value="NEGLIGENCIAS (LIMPIEZAS DE VEGETACIÓN)">
              NEGLIGENCIAS (LIMPIEZAS DE VEGETACIÓN)
            </option>
            <option value="NEGLIGENCIAS (OTRAS ACTIVIDADES O USOS DEL MONTE)">
              NEGLIGENCIAS (OTRAS ACTIVIDADES O USOS DEL MONTE)
            </option>
            <option value="NEGLIGENCIAS (ELIMINACIÓN DE BASURAS Y RESTOS)">
              NEGLIGENCIAS (ELIMINACIÓN DE BASURAS Y RESTOS)
            </option>
            <option value="NEGLIGENCIAS (FUMADORES)">
              NEGLIGENCIAS (FUMADORES)
            </option>
            <option value="ACCIDENTAL (FERROCARRIL)">
              ACCIDENTAL (FERROCARRIL)
            </option>
            <option value="REPRODUCIDO">REPRODUCIDO</option>
          </select>
          <select
            value={situacionActualFilter}
            onChange={handleSituacionActualFilter}
          >
            <option value="">Filtrar por situación actual</option>
            <option value="EXTINGUIDO">EXTINGUIDO</option>
            <option value="CONTROLADO">CONTROLADO</option>
          </select>
          <select value={nivelMaximoFilter} onChange={handleNivelMaximoFilter}>
            <option value="">Filtrar por nivel máximo</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <table className="table table-dark tabla">
          <thead>
            <tr>
              <th>Causa probable</th>
              <th>Codigo municipio ine</th>
              <th>Fecha del parte</th>
              <th>Fecha extinguido</th>
              <th>Fecha de inicio</th>
              <th>Hora del parte</th>
              <th>Hora extinguido</th>
              <th>Hora de inicio</th>
              <th>Medios de extinción</th>
              <th>Nivel</th>
              <th>Nivel maximo</th>
              <th>Posicion</th>
              <th>Provincia</th>
              <th>Situacion actual</th>
              <th>Termino municipal</th>
              <th>Tipo y has de superficie afectada</th>
              <th>Mapa</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((incendio, index) => (
              <tr key={index}>
                <td>{incendio.causa_probable}</td>
                <td>{incendio.codigo_municipio_ine}</td>
                <td>{incendio.fecha_del_parte}</td>
                <td>{incendio.fecha_extinguido}</td>
                <td>{incendio.fecha_inicio}</td>
                <td>{incendio.hora_del_parte}</td>
                <td>{incendio.hora_extinguido}</td>
                <td>{incendio.hora_ini}</td>
                <td>{incendio.medios_de_extincion}</td>
                <td>{incendio.nivel}</td>
                <td>{incendio.nivel_maximo_alcanzado}</td>
                <td>
                  Latitud:{incendio.posicion?.lat.toFixed(2)} Longitud:
                  {incendio.posicion?.lon.toFixed(2)}
                </td>
                <td>{incendio.provincia}</td>
                <td>{incendio.situacion_actual}</td>
                <td>{incendio.termino_municipal}</td>
                <td>{incendio.tipo_y_has_de_superficie_afectada}</td>
                <td>
                  {incendio.posicion ? (
                    <button onClick={() => mostrarMapa(incendio)}>
                      Mostrar Mapa
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mapVisible && (
          <Map
            lat={incendioSeleccionado.posicion?.lat}
            lon={incendioSeleccionado.posicion?.lon}
            onClose={() => setMapVisible(false)}
          />
        )}
        <div className="botones">
          <button
            onClick={() => paginadohaciadetras()}
            className="btn btn-dark"
          >
            {"<"}
          </button>
          <h3 className="pagina">Pagina {offset / 10 + 1}</h3>
          <button
            onClick={() => paginadohaciadelante()}
            className="btn btn-dark"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};
