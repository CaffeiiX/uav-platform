// pie visual interaction

import { atom, selector } from "recoil";

// 无人机对应的面积大小
type uavAreaType = {
  name: string,
  value: number
};
const uavPlanPathAreaAtom = atom<uavAreaType[]>({
  key: 'uavPlanPathArea',
  default: []
});
//无人机对应的boundary
type uavBoundaryType = {
  name: string,
  boundary: number[][]
};
const uavPlanPathBoundaryAtom = atom<uavBoundaryType[]>({
  key: 'uavPlanPathBoundary',
  default: []
});
//visual选择的无人机name
const selectUavInPieAtom = atom<string>({
  key: 'selectUavInPie',
  default: ''
});
const selectUavBoundarySelector = selector({
  key: 'selectUavBoundary',
  get: ({get}) => {
    const selectUavName = get(selectUavInPieAtom);
    const uavPlanPathBoundary = get(uavPlanPathBoundaryAtom);
    if(selectUavName === '') return [];
    else{
      if(uavPlanPathBoundary.length === 0) return [];
      else return uavPlanPathBoundary.filter(item => item.name === selectUavName)[0].boundary;
    }
  }
});
export {uavPlanPathAreaAtom,uavPlanPathBoundaryAtom, selectUavInPieAtom, selectUavBoundarySelector};


