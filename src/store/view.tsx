import { atom } from "recoil";

const isSiderShow = atom({
  key: 'siderShow',
  default: true
});
const isVisualItemAtom = atom({
  key: 'isVisualItem',
  default: false
});
const isSiderVisualAtom = atom({
  key: 'isSiderVisual',
  default: false
});
const isControlSiderVisualAtom = atom({
  key: 'isControlSiderVisual',
  default: false
})
const isUavSiderVisualAtom = atom({
    key: 'isUavSiderVisual',
    default: false
});
export {isSiderShow, isVisualItemAtom, isSiderVisualAtom, isControlSiderVisualAtom,isUavSiderVisualAtom}