import { Cartesian3, Viewer, Cartesian2, defined } from "cesium";
import { useRecoilValue } from "recoil";
import { drawPolygonRegionAtom } from "../store/map";
import { IsPointInPolygon } from "../utils/utils";

const useUpdatePointCol = (viewer: Viewer, position: Cartesian2, positionCol: Cartesian3[], setPositionCol: (c: Cartesian3[]) => void) => {
  const ray = viewer.camera.getPickRay(position);
  const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
  const polygonRegion = useRecoilValue(drawPolygonRegionAtom);
  if (defined(earthPosition)) {
    if (earthPosition) {
      if (
        IsPointInPolygon(earthPosition, polygonRegion)
      ) {
        setPositionCol([
          ...positionCol,
          earthPosition,
        ]);
      }
    }
  }
}

export default useUpdatePointCol;