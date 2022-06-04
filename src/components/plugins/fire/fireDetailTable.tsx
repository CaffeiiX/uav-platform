/* eslint-disable no-empty-pattern */
import { Descriptions } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { forceUpdateTaskAtom, queryCurrentTaskList, selectTaskAtom, taskPageNumAtom } from "../../../store/task";
import './fireInfoTable.css'
import {calculatePolygonArea,getSelectUavList} from '../../../utils/utils'
import { Cartesian3 } from "cesium";
import { number } from "echarts";

const FireDetailTable: React.FC<{}> = ({ children }) => {
    const dataDetail = useRecoilValue(selectTaskAtom);
    let taskId = dataDetail.Id;
    let taskName = dataDetail.name;
    let taskDate = dataDetail.date;
    let taskBoundary=dataDetail.boundary;
    let taskArea = 0;
    let taskStatus = dataDetail.status;
    useEffect(() => {
        taskId = dataDetail.Id;
        taskName = dataDetail.name;
        taskDate = dataDetail.date;
        // let lonlat:number[][]=[];
        // for(let index in taskBoundary){
        //     let tmpPpoint=Cartesian3.fromDegrees(taskBoundary[index][0],taskBoundary[index][1])
        //     lonlat.push([tmpPpoint.x,tmpPpoint.y])
        // }
        // taskArea = calculatePolygonArea(lonlat);
        taskArea = calculatePolygonArea(taskBoundary);
        taskStatus = dataDetail.status;
    }, [dataDetail.Id])
    return(
        <div>
            <Descriptions title="Task Detail" bordered column={1} contentStyle={{fontSize:4}} labelStyle={{fontSize:4}}>
                <Descriptions.Item label="任务ID">{taskId}</Descriptions.Item>
                <Descriptions.Item label="任务状态">{taskStatus}</Descriptions.Item>
                <Descriptions.Item label="任务名称">{taskName}</Descriptions.Item>
                <Descriptions.Item label="任务日期">{taskDate}</Descriptions.Item>
                <Descriptions.Item label="巡航面积">{taskArea}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default FireDetailTable;