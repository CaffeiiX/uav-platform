import { useState } from "react";
import { atom, selector, useRecoilValue } from "recoil";
import { getFireTaskInfo,getUavListInTask } from "../api/taskAPI";
import { FireTaskInfoType} from "../interface/taskType";
import { selectTaskAtom } from "./task";


const fireTaskListAtom=atom<FireTaskInfoType[]>({
    key:"fireTaskList",
    default:[]
})
// 实现对于任务的更新部分
// 任务状态部分
const fireTaskStatusAtom = atom({
    key: "fireTaskStatus",
    default: 0,
});
//pageNum
const fireTaskPageNumAtom = atom({
    key: "fireTaskPageNum",
    default: 1,
});
//selector get task
const isUpdateFireTaskListAtom = atom({
    key: 'isUpdateFireTaskListAtom',
    default: false
})
const uuid = () => Math.random();
const forceUpdateFireTaskAtom = atom({
    key: 'forceUpdateFireTask',
    default: uuid()
})
const queryCurrentFireTaskList = selector({
    key: "CurrentFireTaskList",
    get: async ({ get }) => {
        const task=get(selectTaskAtom);
        get(forceUpdateFireTaskAtom);
        // const status = get(fireTaskStatusAtom);
        // const pageNum = get(fireTaskPageNumAtom);
        // console.log(pageNum);
        const taskData = await getFireTaskInfo(task.Id,task.name);
        return taskData;
    },
});
//选择任务
const selectFireTaskAtom = atom<FireTaskInfoType>({
    key: "selectFireTask",
    default: {
        Id:"random",
        taskName: "任务名",
        uavId: 0,
        fireEntiId:"ID",
        fireLocalTime:"",
        fireTime:"",
        currFire:[],
        nextFire:[
            114.350167, 30.535468, 114.346287, 30.534504, 114.343448, 30.531674,
            114.344598, 30.528843, 114.347616, 30.52595, 114.351856, 30.527412,
            114.354911, 30.529372, 114.353797, 30.532265,
        ]
    }
})
// 任务对应的无人机Id列表
const queryFireSelectUavListInTask = selector({
    key: "selectFireUavList",
    get: async ({ get }) => {
      const selectTask = get(selectFireTaskAtom);
      if (selectTask) {
        const selectUavListInTask = await getUavListInTask(selectTask?.Id);
        return selectUavListInTask;
      }
      return [];
    },
  });

const fireSimAlgoAtom=atom({
    key:"fireSimAlgo",
    default:""
})

const fireDetAlgoAtom=atom({
    key:"fireDetAlgo",
    default:""
})

export {
    fireTaskStatusAtom,
    fireTaskPageNumAtom,
    isUpdateFireTaskListAtom,
    forceUpdateFireTaskAtom,
    queryCurrentFireTaskList,
    selectFireTaskAtom,
    queryFireSelectUavListInTask,
    fireTaskListAtom,
    fireSimAlgoAtom,
    fireDetAlgoAtom
}