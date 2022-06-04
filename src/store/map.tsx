import { Cartesian3 } from "cesium";
import { atom } from "recoil";
import { entitiesControlType } from "../types/Entity";

//管理同map相关的状态
const isDrawPolygonAtom = atom<boolean>({
  key: "IsDrawPolygon",
  default: false,
});
const drawPolygonRegionAtom = atom<Cartesian3[]>({
  key: "drawPolygonRegion",
  default: [],
});
const isDrawTargetPointAtom = atom<boolean>({
  key: "isDrawTargetPoint",
  default: false,
});
const targetPointColAtom = atom<Cartesian3[]>({
  key: "targetPointCol",
  default: [],
});
const isTargetPointShowAtom = atom<boolean>({
  key: "isTargetPointShow",
  default: false,
});
const isDrawPlatformAtom = atom<boolean>({
  key: "isDrawPlatformAtom",
  default: false,
});
const platformPointColAtom = atom<Cartesian3[]>({
  key: "platformPointCol",
  default: [],
});
const isPlatformPointShowAtom = atom<boolean>({
  key: "isPlatformShow",
  default: false,
});
const isDrawCreateTaskRegionAtom = atom<boolean>({
  key: "isDrawCreateTaskRegion",
  default: false,
});

const isFireAniShowAtom = atom<boolean>({
  key: "isFireAniShow",
  default: false,
});
const isFireBillBoardShowAtom = atom<boolean>({
  key: "isFireBillBoardShow",
  default: false,
});

const uavPlanPathPointColAtom = atom<number[][]>({
  key: "uavPlanPathPointCol",
  default: [],
});
const isClearMapEntitiesAtom = atom<boolean>({
  key: "isClearMapEntities",
  default: false,
});
const cameraLookAtAtom = atom<Cartesian3>({
  key: "camerLookAt",
  default: Cartesian3.fromDegrees(114.360734, 30.541093, 5000),
});
const entitiesPropertiesAtom = atom<entitiesControlType>({
  key: 'entiteisProperties',
  default: {
    clockIsCurrent: true,
    camerIsFlyTo: false,
    camerFlyToPosition: [],
    entitiesProperties: [
      {
        key:'taskBoundaryComponent',
        visual: false,
        track: false
      },
      {
        key: 'platformPointsComponent',
        visual: false,
        track: false
      },
      {
        key: 'targetPointsComponent',
        visual: false,
        track: false
      },
      {
        key: 'uavInTimePathComponent',
        visual: false,
        track: false
      },
      {
        key: 'selectPlanAreaComponent',
        visual: false,
        track: false
      },
      {
        key: 'viewUavVisualColComponent',
        visual: false,
        track: false
      },
      {
        key: 'fireAniEntityComponent',
        visual: false,
        track: false
      },
      {
        key: 'fireBillboard',
        visual: false,
        track: false
      }
    ]
  }
})
export {
  isDrawPolygonAtom,
  drawPolygonRegionAtom,
  isDrawPlatformAtom,
  isDrawTargetPointAtom,
  platformPointColAtom,
  targetPointColAtom,
  isTargetPointShowAtom,
  isPlatformPointShowAtom,
  uavPlanPathPointColAtom,
  cameraLookAtAtom,
  isClearMapEntitiesAtom,
  isDrawCreateTaskRegionAtom,
  isFireAniShowAtom,
  isFireBillBoardShowAtom,
  entitiesPropertiesAtom
};
