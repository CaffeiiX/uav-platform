import { atom } from "recoil";

const isModalShowAtom = atom<boolean>({
  key: 'isModalShow',
  default: false
})

export {isModalShowAtom};