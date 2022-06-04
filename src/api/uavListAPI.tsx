import axios from "axios";
import { Cartesian3 } from "cesium";
import { UavInfoType,UavInfoApiType,TaskInfoType} from "../interface/uavManaType";
import {TaskInfoApiType} from "../interface/taskType"
import qs from 'qs'

const baseUrl = 'http://192.168.61.91:30094/web/';

// 查询 uav 的 array
const getUavInfo = async (num: number, pageSize: number = 3) => {
    const response = await axios.get(`${baseUrl}droneinfo/queryDroneInfo`, {
        params: {
            pageNum: num,
            pageSize: 3,
        }
    });
    const uavData: UavInfoApiType[] = response.data['data'];
    // const uavData: UavInfoApiType[] = response.data;
    const uavInfoList : UavInfoType[] = [];
    for(let i = 0; i < uavData.length; i ++) {
        const tempTaskInfo: UavInfoType = {
            "key":uavData[i].droneId,
            "droneId": uavData[i].droneId,
            'droneName': uavData[i].droneName,
            'droneStatus': uavData[i].droneStatus === 0 ? '可用' : '不可用',
            "registrationDate":uavData[i].registrationDate === null ? "": uavData[i].registrationDate,
        }

        uavInfoList.push(tempTaskInfo);
    }
    return uavInfoList;
}

// 编辑 uav
type editParamsType = {
    'droneId': string,
    "droneName": string,
    'droneStatus': number,
}
const postEditUav = async (postParams: editParamsType) => {
    const response = await axios.post(`${baseUrl}droneinfo/registerOrUpdateDrone`,{
        droneId: postParams.droneId,
        droneName: postParams.droneName,
        droneStatus:postParams.droneStatus,
    })
    if(response.data.msg === "操作成功") return 'success';
    else return 'fail';
}

// 增加 uav
type addParamsType = {
    "droneName": string,
    'droneStatus': number,
}
const postAddUav = async (postParams: addParamsType) => {
    const response = await axios.post(`${baseUrl}droneinfo/registerOrUpdateDrone`,{
        droneName: postParams.droneName,
        droneStatus:postParams.droneStatus,
    })
    if(response.data.msg === "操作成功") return 'success';
    else return 'fail';
}

// 删除 uav
type deleteParamsType = {
    "droneId":string,
}
const postDeleteUav = async (postParams: deleteParamsType) => {
    const response = await axios.delete(`${baseUrl}droneinfo/delDrone`,{
        params:{droneId: postParams.droneId},
    })
    if(response.data.msg === "操作成功") return 'success';
    else return 'fail';
}


// 查询 某一 uav 对应的 相关任务 array
type queryTaskOfUavParamsType = {
    "droneId": string,
}
const queryTaskListOfUav = async(queryParams: queryTaskOfUavParamsType) =>{
    const response = await axios.get(`${baseUrl}droneinfo/queryTaskByDroneId`, {
        params: {
            droneId: queryParams.droneId,
        }
    });
    const taskData: TaskInfoApiType[] = response.data['data'];
    // const taskData: TaskInfoApiType[] = response.data;
    const taskList : TaskInfoType[] = [];
    for(let i = 0; i < taskData.length; i ++) {
        const boundary: number[][] = taskData[i].taskBounary.substring("SRID=4326;POLYGON((".length,
        taskData[i].taskBounary.length - 2)
        .split(",")
        .map((i) => (i.split(' ').map(i => parseFloat(i))));

        const tempTaskInfo: TaskInfoType = {
            "key":taskData[i].taskId,
            "taskId":taskData[i].taskId,
            "taskName":taskData[i].taskName,
            "taskStatus":taskData[i].taskStatus === 1 ? '进行中' : '已完成',
            "taskType":taskData[i].taskType === 0 ? '静态' : '动态',
            "taskTime":new Date(taskData[i].taskTime.time).toLocaleString(),
            "taskBounary":boundary,
        }

        taskList.push(tempTaskInfo);
    }
    // if(taskList.length % 3 === 0 && taskList.length !== 0){

    // }else{
    //     for(let j = 0;j<(3 - taskList.length % 3);j++){
    //         const tempTaskInfo: TaskInfoType = {
    //             "key":'',
    //             "taskId":'',
    //             "taskName":'',
    //             "taskStatus":'',
    //             "taskType":'',
    //             "taskTime":'',
    //         }
    //         taskList.push(tempTaskInfo);
    //     }     
    // }
    return taskList;
}



export {getUavInfo, postEditUav, postAddUav,postDeleteUav,queryTaskListOfUav};
