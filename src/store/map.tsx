import { Cartesian3 } from "cesium";
import { atom } from "recoil";

//管理同map相关的状态
const isDrawPolygonAtom = atom<boolean>({
  key: 'IsDrawPolygon',
  default: false
});
const drawPolygonRegionAtom = atom<Cartesian3[]>({
  key: 'drawPolygonRegion',
  default: []
});
const isDrawTargetPointAtom = atom<boolean>({
  key: 'isDrawTargetPoint',
  default: false
});
const targetPointColAtom = atom<Cartesian3[]>({
  key: 'targetPointCol',
  default: []
});
const isTargetPointShowAtom = atom<boolean>({
  key: "isTargetPointShow",
  default: false
})
const isDrawPlatformAtom = atom<boolean>({
  key: 'isDrawPlatformAtom',
  default: false
});
const platformPointColAtom = atom<Cartesian3[]>({
  key: 'platformPointCol',
  default: []
});
const isPlatformPointShowAtom = atom<boolean>({
  key: 'isPlatformShow',
  default: false
});

const uavPlanPathPointColAtom = atom<number[][]>({
  key: 'uavPlanPathPointCol',
  default: []
});

export {isDrawPolygonAtom, drawPolygonRegionAtom, isDrawPlatformAtom, isDrawTargetPointAtom, platformPointColAtom, targetPointColAtom, isTargetPointShowAtom, isPlatformPointShowAtom, uavPlanPathPointColAtom};