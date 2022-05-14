import React, { useEffect } from "react";
import { Entity, PolygonGraphics, useCesium } from "resium";
import { useRecoilValue} from "recoil";
import { Cartesian3, Color, ColorMaterialProperty } from "cesium";
import { selectUavBoundarySelector } from "../../store/visual";
const SelectPlanArea: React.FC<{}> = () => {

  // const cesiumRef = useCesium();
  const selectUavBoundary = useRecoilValue(selectUavBoundarySelector);
  useEffect(()=>{
    console.log(selectUavBoundary);
  })
  return selectUavBoundary.length > 0 ? (
    <>
      <Entity>
        <PolygonGraphics
          hierarchy={
            Cartesian3.fromDegreesArray(selectUavBoundary.flat()) as any
          }
          height={0}
          material={new ColorMaterialProperty(Color.RED.withAlpha(0.3))}
        />
      </Entity>
    </>
  ) : (
    <></>
  );
};

export default SelectPlanArea;
