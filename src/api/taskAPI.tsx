import axios from "axios";
import { Cartesian3 } from "cesium";
import { TaskInfoApiType, TaskInfoType, UavInfoType } from "../interface/taskType";
import { polygonToWKTString } from "../utils/utils";

const baseUrl = 'http://192.168.61.91:30094/web/';
const getTaskInfo = async (num: number, pageSize: number = 3,taskType: number, ) => {
    const response = await axios.get(`${baseUrl}/queryTaskList`, {
        params: {
            pageNum: num,
            pageSize: 3,
            taskType: taskType
        }
    });
    const taskData: TaskInfoApiType[] = response.data['data'];
    const taskInfoList : TaskInfoType[] = [];
    for(let i = 0; i < taskData.length; i ++) {
        const boundary: number[][] = taskData[i].taskBounary.substring("SRID=4326;POLYGON((".length,
        taskData[i].taskBounary.length - 2)
        .split(",")
        .map((i) => (i.split(' ').map(i => parseFloat(i))));

        const tempTaskInfo: TaskInfoType = {
            "Id": taskData[i].taskId,
            'date': new Date(taskData[i].taskTime.time).toLocaleString(),
            'name': taskData[i].taskName,
            'status': taskData[i].taskStatus === 1 ? '进行中' : '已完成',
            'boundary': boundary,
        }

        taskInfoList.push(tempTaskInfo);
    }
    return taskInfoList;
}
const getTaskUavInfo = async (taskId: string) => {
    const response = await axios.get(`${baseUrl}/queryStatusOfDrone`,{
        params: {
            'taskId' : taskId
        }
    });
    const uavList: UavInfoType[] = response.data.data;
    return uavList;
}


const getTaskUavList =async () => {
    const response = await axios.get(`${baseUrl}/queryDroneStatus`);
    const uavList : string[] = response.data.data;
    return uavList;
}

type postParamsType = {
    'task_name': string,
    'droneIds': string[],
    'task_bounary': Cartesian3[],
    'task_status': string,
    'task_type': string
}
const postCreateTask = async (postParams: postParamsType) => {
    const wktString = polygonToWKTString(postParams.task_bounary);
    const response = await axios.post(`${baseUrl}/createDroneTask`,{
        task_name: postParams.task_name,
        droneIds: postParams.droneIds,
        task_bounary: wktString,
        task_status: postParams.task_status,
        task_type: postParams.task_type
    })
    if(response.data.msg === "操作成功") return 'success';
    else return 'fail';
}

const getUavListInTask = async (taskId: string) => {
    const response = await axios.get(`${baseUrl}/queryStatusOfDrone`, {
        params: {
            taskId: taskId
        }
    })
    const uavList : string[] = response.data.data;
    return uavList;
}


export {getTaskInfo, getTaskUavInfo, getTaskUavList, postCreateTask, getUavListInTask};
