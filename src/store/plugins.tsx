import { atom, selector } from "recoil";

const firePluginsMapAtom = atom({
  key: 'firePlugins',
  default:
  [
  {
    key: "fireInfo",
    name: "火灾信息",
    checkable: false,
  },
  {
    key: "fireSim",
    name: "火灾模拟",
    checkable: false,
  },
 ]});
const isShowPluginSiderSelector = selector({
  key: 'isShowPluginSider',
  get: ({get}) => {
    const firePlugins = get(firePluginsMapAtom);
    const checkTotal = firePlugins.reduce((prev, cur) => {
      if(cur.checkable) return prev + 1;
      else return prev;
    }, 0);
    return checkTotal > 0 ? true: false;
  }
})

const isFireInfoSiderShowAtom = atom({
  key: 'isFireInfoSiderShow',
  default: false
})
export {firePluginsMapAtom, isShowPluginSiderSelector, isFireInfoSiderShowAtom}