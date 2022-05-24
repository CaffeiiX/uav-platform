import { Cartesian3, JulianDate } from "cesium";
import { atom, selector } from "recoil";
import { PlatformUav, UavWsDataType } from "../interface/taskType";

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
});
const inUseUavListAtom = atom<string[]>({
  key: 'inUseUavList',
  default: []
});
const uavWebsocketHistoryMessageAtom = atom<any[]>({
  key: 'uavWebscoketHistoryMessage',
  default: []
});
const uavWebsocketMessageAtom = atom<string>({
  key: 'uavWebsocketMessage',
  default: ''
})
const uavWebsocketJsonMessageSelector = selector<UavWsDataType | null>({
  key: 'uavWebsocketJsonMessage',
  get: ({get}) => {
    let tempMessage = get(uavWebsocketMessageAtom);
    if(tempMessage.length === 0){
      return null;
    }
    const uavWebscoketMessageJson : UavWsDataType = JSON.parse(tempMessage.slice(0, tempMessage.length-1));
    uavWebscoketMessageJson.UAV_time = uavWebscoketMessageJson.UAV_time * 1000;
    return uavWebscoketMessageJson;
  }
})
type uavInTimePathDictType = {
  [name: string]: {
    time: JulianDate[],
    position: Cartesian3[],
  }
}
const uavInTimePathDictAtom = atom<uavInTimePathDictType>({
  key: 'uavInTimePathDict',
  default:{

  }
});
export {selectUavIdAtom, platformSelectUavListAtom, uavListAtom, uavWebsocketMessageAtom, uavWebsocketJsonMessageSelector, inUseUavListAtom, uavInTimePathDictAtom};