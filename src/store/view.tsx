import { atom } from "recoil";

const isSiderShow = atom({
  key: 'siderShow',
  default: true
});

export {isSiderShow}