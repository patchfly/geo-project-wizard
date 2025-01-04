import "ol/ol.css";
import { useEffect, useRef } from "react";
import { Feature, Map } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import View from "ol/View";
import { Style, Fill, Stroke } from "ol/style";
import { boundingExtent } from "ol/extent";

interface MapProps {
  data: GeoJSON;
  className?: string;
}

export const MapPreview = ({ data, className }: MapProps) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.5)",
        }),
        stroke: new Stroke({
          color: "#ff0000",
          width: 2,
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current ?? undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View(),
    });

    const features = vectorSource.getFeatures();
    if (features.length > 0) {
      const extents = features.map((feature: Feature) => {
        const geometry = feature.getGeometry();
        return geometry?.getExtent();
      });

      const extent = extents
        .filter((extent) => !!extent)
        .reduce((acc, curr) => {
          return boundingExtent([acc, curr]);
        });

      map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 12 });
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [data]);

  return <div className={className} ref={mapRef} />;
};
