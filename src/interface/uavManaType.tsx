//无人机 表格 信息 类型
type UavInfoType = {
  key:string;
  droneId: string;
  droneName: string;
  droneStatus: string;
  registrationDate:string;
};

// 请求 无人机 array 返回的初始类型
type UavInfoApiType = {
  droneId: string;
  droneName: string;
  droneStatus: number;
  registrationDate:string;
};

type TaskDatetime = {
    date: number;
    hours: number;
    seconds: number;
    month: number;
    timezoneOffset: number;
    year: number;
    minutes: number;
    time: number;
    day: number;
};

// 请求 无人机相关的任务的 返回的初始类型
// type TaskInfoApiType = {
//     taskBounary: string;
//     taskId:string;
//     taskName:string;
//     taskRoute: string;
//     taskStatus: number;
//     taskTime:TaskDatetime;
//     taskType:number;
// }

// 无人机相关的任务 表格的类型
type TaskInfoType = {
    key: string;
    taskId:string;
    taskName:string;
    taskStatus: string;
    taskTime:string;
    taskType:string;
    taskBounary:number[][];
}


export type {
    UavInfoType,UavInfoApiType,TaskInfoType
};
