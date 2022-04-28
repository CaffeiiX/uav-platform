
import {MapboxStyleImageryProvider, OpenStreetMapImageryProvider } from "cesium";
import { Viewer, ImageryLayer} from "resium";


const osm = new OpenStreetMapImageryProvider({
  url: "https://a.tile.openstreetmap.org/",
});
const osmStyle = new MapboxStyleImageryProvider({
  url: "https://api.mapbox.com/styles/v1/",
  styleId: "cjgyyb8pp006x2rqkh6of7yjs",
  // mapbox://styles/caiw0421/cl2hoz4s2004z14rzzz3w7ctm
  username: "caiw0421",
  accessToken:
    "pk.eyJ1IjoiY2FpdzA0MjEiLCJhIjoiY2tyNTkycTdrMzA4MzJ1cWg5ajhmczhmOSJ9.BB9GKYcs2TrLbM_koPoIbQ",
});

const NewMapViewer : React.FC<{}> = () => {
  return (
    <>
    <Viewer
      imageryProvider={osm}
      style={{ height: window.innerHeight }}
      onMouseDown={(e) => {}}
      infoBox={false}
    >
      <ImageryLayer imageryProvider={osmStyle}></ImageryLayer>
    </Viewer>
    </>
  )
}

export default NewMapViewer;