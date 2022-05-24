import { atom, selector } from "recoil";
import { taskStatusAtom } from "./task";
import { uavListAtom, uavWebsocketJsonMessageSelector } from "./uav";

const isModalShowAtom = atom<boolean>({
  key: "isModalShow",
  default: false,
});
const isShowDynamicTaskCreateModalSelector = selector({
  key: "isShowDynamicTaskCreateModal",
  get: ({ get }) => {
    const uavWebsocketJsonMessage = get(uavWebsocketJsonMessageSelector);
    const uavList = get(uavListAtom);
    const taskStatus = get(taskStatusAtom);
    if (uavWebsocketJsonMessage) {
      if (!(uavWebsocketJsonMessage.UAV_id in uavList) && taskStatus === 1) {
        return true;
      } else return false;
    }
    return false;
  },
});
const isShowDynamicTaskModalAtom = atom({
  key: "isShowDynamicTaskModal",
  default: false,
});
const isShowCreateTaskModalAtom = atom({
  key: "isShowCreateTaskModal",
  default: false,
});
const isCreateTaskModalAtom = atom({
  key: "isCreateTaskModal",
  default: false,
});
const isStopReceiveMessageAtom = atom({
  key: "isStopReceiveMessage",
  default: false,
});
const isShowRelateTaskModalAtom = atom({
  key: "isShowRelateTaskModal",
  default: false,
});
export {
  isModalShowAtom,
  isShowDynamicTaskCreateModalSelector,
  isShowDynamicTaskModalAtom,
  isShowCreateTaskModalAtom,
  isCreateTaskModalAtom,
  isStopReceiveMessageAtom,
  isShowRelateTaskModalAtom,
};
