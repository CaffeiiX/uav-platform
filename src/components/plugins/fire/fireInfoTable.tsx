/* eslint-disable no-empty-pattern */
import { Table,Descriptions, Select } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { fireColumns } from "../../../mock/taskListData";
import { forceUpdateFireTaskAtom, queryCurrentFireTaskList, selectFireTaskAtom, fireTaskPageNumAtom, fireTaskListAtom } from "../../../store/fireTask";
import './fireInfoTable.css'
import {calculatePolygonArea,getSelectUavList} from '../../../utils/utils'
import FireDetailTable from "./fireDetailTable";
import { selectTaskAtom } from "../../../store/task";
import { isFireBillBoardShowAtom } from "../../../store/map";

const FireInoTable: React.FC<{}> = ({ children }) => {
    const dataDetail = useRecoilValue(selectTaskAtom);
    const setPageNum = useSetRecoilState(fireTaskPageNumAtom);
    let taskListAble = useRecoilValueLoadable(queryCurrentFireTaskList);
    const [selectTask, setSelectTask] = useRecoilState(selectFireTaskAtom);
    const setForceUdpateTask = useSetRecoilState(forceUpdateFireTaskAtom);
    const [billBoardVisible,setBillBoradVisible]=useRecoilState(isFireBillBoardShowAtom)
    switch (taskListAble.state) {
        case 'hasValue':
            return (
                <>
                    <Table className="table-task-list" size="small" dataSource={taskListAble.contents} columns={fireColumns}
                    // {/* <Table className="table-task-list" size="small" dataSource={taskList} columns={columns} */}
                        pagination={{ pageSize: 3, total: 20, onChange: (e) => { setPageNum(e); setForceUdpateTask(Math.random()); } }}
                        onRow={record => {
                            return {
                                onClick: event => { 
                                 },
                                onDoubleClick: event => { setSelectTask(record); setBillBoradVisible(true);},
                                onMouseEnter: event => { event.stopPropagation() }
                            }
                        }}
                        rowClassName={record => {
                            if (selectTask) return record.fireEntiId === selectTask.fireEntiId ? 'table-task-row' : '';
                            return '';
                        }}
                        rowKey={record => record.fireEntiId}></Table>
                </>
            );
        case 'loading':
            return (
                <Table className="table-task-list" size="small" dataSource={[]} columns={fireColumns}
                    pagination={{ pageSize: 3, total: 20 }}
                ></Table>
            );
        case 'hasError':
            throw taskListAble.contents;
    }
}



export default FireInoTable;