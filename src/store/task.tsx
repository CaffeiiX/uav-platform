import { useState } from "react";
import { atom, selector } from "recoil";
import { getTaskInfo, getUavListInTask } from "../api/taskAPI";
import { TaskInfoType } from "../interface/taskType";

// 实现对于任务的更新部分
// 任务状态部分
const taskStatusAtom = atom({
  key: "taskStatus",
  default: 0,
});
//pageNum
const taskPageNumAtom = atom({
  key: "taskPageNum",
  default: 1,
});
//selector get task
const isUpdateTaskListAtom = atom({
  key: 'isUpdateTaskListAtom',
  default: false
})
const uuid = () => Math.random();
const forceUpdateTaskAtom = atom({
  key: 'forceUpdateTask',
  default: uuid()
})
const queryCurrentTaskList = selector({
  key: "CurrentTaskList",
  get: async ({ get }) => {
    get(forceUpdateTaskAtom);
    const status = get(taskStatusAtom);
    const pageNum = get(taskPageNumAtom);
    console.log(pageNum);
    const taskData = await getTaskInfo(pageNum, 3, status);
    return taskData;
  },
});
// 选择的任务
const selectTaskAtom = atom<TaskInfoType>({
  key: "selectTask",
  default: {
    Id: "random",
    name: "任务名",
    status: "0",
    date: "日期",
    boundary: [],
  },
});

// 判断是否绘制任务的范围
const isDrawSelectTaskBoundarySelector = selector({
  key: "isDrawSelectTaskBoundary",
  get: ({ get }) => {
    const selectTask : TaskInfoType = get(selectTaskAtom);
    if (selectTask.boundary.length === 0) return false;
    else return true;
  },
});
// 任务对应的无人机Id列表
const querySelectUavListInTask = selector({
  key: "selectUavList",
  get: async ({ get }) => {
    const selectTask = get(selectTaskAtom);
    if (selectTask) {
      const selectUavListInTask = await getUavListInTask(selectTask?.Id);
      return selectUavListInTask;
    }
    return [];
  },
});
//是否结束任务
const ifEndTaskButtonStatus = selector({
  key: "endTask",
  get: ({ get }) => {
    const selectTask = get(selectTaskAtom);
    if (selectTask) {
      if (selectTask.Id === "random") return true;
      return selectTask.status === "进行中" ? false : true;
    } else {
      return true;
    }
  },
});
const planPathMethodAtom = atom({
  key: 'planPathMehtod',
  default: ""
})
// const selectUavList = selector({
//   key: 'uavList',
//   get: ({get}) => {
//     const selectUavInTask = get(querySelectUavListInTask);
//     return selectUavInTask.map((item) => item.droneId);
//   }
// })
export {
  taskStatusAtom,
  taskPageNumAtom,
  queryCurrentTaskList,
  selectTaskAtom,
  querySelectUavListInTask,
  ifEndTaskButtonStatus,
  isDrawSelectTaskBoundarySelector,
  isUpdateTaskListAtom,
  forceUpdateTaskAtom,
  planPathMethodAtom
};
