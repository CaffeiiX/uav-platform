import { atom } from "recoil";
import { PlatformUav } from "../interface/taskType";

//无人机相关部分
const selectUavIdAtom = atom<string>({
  key: 'selectUavId',
  default: ''
});
const platformSelectUavListAtom = atom<PlatformUav>({
  key: 'platformSelectUavList',
  default: {}
});
const uavListAtom = atom<string[]>({
  key: 'uavList',
  default: []
})
export {selectUavIdAtom, platformSelectUavListAtom, uavListAtom};