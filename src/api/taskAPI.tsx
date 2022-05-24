import axios from "axios";
import { Cartesian3 } from "cesium";
import {
  InUseUavListType,
  TaskInfoApiType,
  TaskInfoType,
  UavInfoType,
  UavListInTaskType,
} from "../interface/taskType";
import { findDroneInPolygonVoroni, polygonToWKTString } from "../utils/utils";
import qs from "qs";
const baseUrl = "http://192.168.61.91:30094/web/";
const getTaskInfo = async (
  num: number,
  pageSize: number = 3,
  taskType: number
) => {
  let taskData: TaskInfoApiType[] = [];
  if (pageSize === -1) {
    const response = await axios.get(`${baseUrl}/queryTaskList`, {
      params: {
        taskType: taskType,
      },
    });
    taskData = response.data["data"];
  } else {
    const response = await axios.get(`${baseUrl}/queryTaskList`, {
      params: {
        pageNum: num,
        pageSize: 3,
        taskType: taskType,
      },
    });
    taskData = response.data['data'];
  }
  //   const taskData: TaskInfoApiType[] = response.data["data"];
  const taskInfoList: TaskInfoType[] = [];
  for (let i = 0; i < taskData.length; i++) {
    const boundary: number[][] = taskData[i].taskBounary
      .substring(
        "SRID=4326;POLYGON((".length,
        taskData[i].taskBounary.length - 2
      )
      .split(",")
      .map((i) => i.split(" ").map((i) => parseFloat(i)));

    const tempTaskInfo: TaskInfoType = {
      Id: taskData[i].taskId,
      date: new Date(taskData[i].taskTime.time).toLocaleString(),
      name: taskData[i].taskName,
      status: taskData[i].taskStatus === 1 ? "进行中" : "已完成",
      boundary: boundary,
    };

    taskInfoList.push(tempTaskInfo);
  }
  return taskInfoList;
};
const getTaskUavInfo = async (taskId: string) => {
  const response = await axios.get(`${baseUrl}/queryStatusOfDrone`, {
    params: {
      taskId: taskId,
    },
  });
  const uavList: UavInfoType[] = response.data.data;
  return uavList;
};
const getInUseUavListAPI =async () => {
  const response = await axios.get(`${baseUrl}/queryDroneInTask`);
  const inUseUavList: InUseUavListType[] = response.data.data;
  return inUseUavList;
}
const getTaskUavList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/queryDroneStatus`);
    const uavList: UavListInTaskType[] = response.data.data;
    return uavList;
  } catch (error) {
    return [];
  }
};

type postParamsType = {
  task_name: string;
  droneIds: string[];
  task_bounary: Cartesian3[];
  task_status: string;
  task_type: string;
};
const postCreateTask = async (postParams: postParamsType) => {
  const wktString = polygonToWKTString(postParams.task_bounary);
  const response = await axios.post(`${baseUrl}/createDroneTask`, {
    task_name: postParams.task_name,
    droneIds: postParams.droneIds,
    task_bounary: wktString,
    task_status: postParams.task_status,
    task_type: postParams.task_type,
  });
  if (response.data.msg === "操作成功") return "success";
  else return "fail";
};

const PostNormalPathAPI = async (
  polygonRegion: number[][],
  uavPoint: number[][]
) => {
  let points: string = "";
  let drones: string = "";
  const voronoiPolygon = findDroneInPolygonVoroni(polygonRegion, uavPoint);

  const voronoiPolygonRegionList = voronoiPolygon.map((item) => {
    return item["geometry"]["coordinates"];
  });
  console.log(voronoiPolygonRegionList);
  for (let polygonRegionPoint of polygonRegion) {
    points += String(polygonRegionPoint[0]);
    points += ",";
    points += String(polygonRegionPoint[1]);
    points += ";";
  }
  points = points.slice(0, points.length - 1);
  for (let uav of uavPoint) {
    drones += String(uav[0]);
    drones += ",";
    drones += String(uav[1]);
    drones += ";";
  }
  drones = drones.slice(0, drones.length - 1);
  const postData = {
    points: points,
    height: "0.0005",
    sight: "1.5278",
    drones: drones,
    voronoiLines: voronoiPolygonRegionList,
  };
  const response = await axios.post(
    `http://192.168.31.218:8080/find/multiple`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const pathResList: number[][][] = response.data;
  const pathLonLatRes: number[][] = [];
  for (let path of pathResList) {
    let temp: number[] = [];
    for (let point of path) {
      temp = [...temp, point[0], point[1]];
    }
    pathLonLatRes.push(temp);
  }
  return pathLonLatRes;
};
const getUavListInTask = async (taskId: string) => {
  const response = await axios.get(`${baseUrl}/queryStatusOfDrone`, {
    params: {
      taskId: taskId,
    },
  });
  const uavList: UavListInTaskType[] = response.data.data;
  return uavList;
};
// type PostPlanPathType = {
//     polygonCoods: number[][],
//     targetCoods: number[][],
//     droneNum: number
// }
const PostPathPlanDataAPI = async (
  uavCount: number,
  targetPointList: number[][],
  polygonRegion: number[][],
  uavPoint: number[][]
) => {
  const response = await axios.post(`${baseUrl}/droneRoutePlanning`, {
    polygonCoods: polygonRegion,
    targetCoods: targetPointList,
    droneNum: uavCount,
    droneCoods: uavPoint,
  });
  const pathResList: number[][] = response.data.data;
  return pathResList;
};

const PostFinishTaskAPI = async (taskId: string) => {
  const response = await axios.post(
    `${baseUrl}/finishTask`,
    qs.stringify({
      task_id: taskId,
    })
  );
  if (response.data.msg === "操作成功") return "success";
  else return "fail";
};
const PostAddUavToTaskAPI = async (taskId: string, uavId: string) => {
  const response = await axios.post(`${baseUrl}/addDroneToTask`, {
    taskId: taskId,
    droneId: uavId,
  });
};

export {
  getTaskInfo,
  getTaskUavInfo,
  getTaskUavList,
  postCreateTask,
  getUavListInTask,
  PostPathPlanDataAPI,
  PostFinishTaskAPI,
  PostNormalPathAPI,
  PostAddUavToTaskAPI,
  getInUseUavListAPI
};
