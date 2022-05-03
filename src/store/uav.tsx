import { atom } from "recoil";

//无人机相关部分
const selectUavIdAtom = atom<String>({
  key: 'selectTask',
  default: ''
});

export {selectUavIdAtom};