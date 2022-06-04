import { atom, selector } from "recoil";
import { getUavInfo,queryTaskListOfUav} from "../api/uavListAPI";
import { UavInfoType } from "../interface/uavManaType";

// 状态部分
const uavStatusAtom = atom({
  key: "uavStatus",
  default: "0",
});
//pageNum
const uavPageNumAtom = atom({
  key: "uavPageNum",
  default: 1,
});

const isUpdateUavListAtom = atom({
  key: 'isUpdateUavListAtom',
  default: false
})

const uuid = () => Math.random();

const forceUpdateUavListAtom = atom({
  key: 'forceUpdateUavList',
  default: uuid()
})

const queryUavList = selector({
  key: "queryUavList",
  get: async ({ get }) => {
    get(forceUpdateUavListAtom);
    const pageNum = get(uavPageNumAtom);
    
    // const pageNum = 1;
    console.log(pageNum);
    const uavListData = await getUavInfo(pageNum, 3);
    return uavListData;
  },
});

// 新增 无人机
const uavAddedAtom = atom({
    key: "uavAdded",
    default: 0,
});


// 选择某一行无人机
const selectUavAtom = atom<UavInfoType>({
  key: "selectUav",
  default: {
    key:"default",
    droneId: "default",
    droneName: "name",
    droneStatus: "可用",
    registrationDate:"",
  },
});

// 
const querySelectUavInfoList = selector({
    key: "querySelectUavInfoList",
    get: async ({ get }) => {
      const selectTask = get(selectUavAtom);
      if (selectTask) {
        const taskListOfUav = await queryTaskListOfUav({"droneId":selectTask.droneId});
        return taskListOfUav;
      }
      return [];
    },
  });

export {
    uavStatusAtom,
    uavPageNumAtom,
    isUpdateUavListAtom,
    forceUpdateUavListAtom,
    queryUavList,
    selectUavAtom,
    querySelectUavInfoList
};
