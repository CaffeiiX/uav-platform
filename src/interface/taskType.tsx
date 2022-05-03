import { Cartesian3 } from "cesium";

// 任务信息类型
type TaskInfoType = {
  Id: string;
  date: string;
  name: string;
  status: string;
  boundary: number[][];
};
//
// let a : TaskInfoType | undefined;

type TaskDatetime = {
  date: number;
  hours: number;
  seconds: number;
  month: number;
  timezoneOffset: number;
  year: number;
  minutes: 18;
  time: number;
  day: number;
};
type TaskInfoApiType = {
  taskBounary: string;
  taskId: string;
  taskName: string;
  taskRoute: string;
  taskStatus: number;
  taskTime: TaskDatetime;
  taskType: number;
};

//无人机类型
type UavInfoType = {
  Id: string;
  name: string;
  status: string;
};

type CreateTaskType = {
  droneIds: string[];
  task_bounary: string;
  task_name: string;
  task_status: 0 | 1 | 2 | 3;
  task_type: 0 | 1;
};

type UavWsDataType = {
  GPSPosition_altitude: number;
  GPSPosition_latitude: number;
  GPSPosition_longitude: number;
  PedUnion_x1: number;
  PedUnion_x2: number;
  PedUnion_y1: number;
  PedUnion_y2: number;
  UAV_id: string;
  UAV_time: number;
  vx: number;
  vy: number;
  vz: number;
  PedUnionNums: string;
  PedUnionRes: string;
  leftBattery: string;
};

type uavPositionAndTimeType = {
  longtitude: number;
  latitute: number;
  height: number;
  time: number;
};

type SelectUavIdType = {
  selectUavId: string;
  setSelectUavId: (c: string) => void;
};
type TargetPointColType = {
  targetPoint: Cartesian3[],
  setTargetPoint: (c: Cartesian3[]) => void;
}

type IsDrawPointType ={
  isDrawPoint: boolean,
  setIsDrawPoint: (c: boolean) => void
}
type PlatformUav = {
  [name: string]: string[]
}

type UavListInTaskType = {
  droneId: string,
  droneName: string,
  droneStatus: string
}
export type {
  TaskInfoType,
  TaskInfoApiType,
  UavInfoType,
  CreateTaskType,
  UavWsDataType,
  uavPositionAndTimeType,
  SelectUavIdType,
  TargetPointColType,
  IsDrawPointType,
  PlatformUav,
  UavListInTaskType
};
