import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography,Button } from 'antd';
import './uavManaTable.css'
import { columns,dataSource} from "../../mock/uavListData";
import { postEditUav,postAddUav, postDeleteUav,getUavInfo } from "../../api/uavListAPI";
import {UavInfoType} from "../../interface/uavManaType"
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {uavPageNumAtom,forceUpdateUavListAtom,queryUavList,selectUavAtom} from "../../store/uavMana";

interface Item{
    key:string;
  droneId: string;
  droneName: string;
  droneStatus: string;
  registrationDate:string;
}

const originData: UavInfoType[] = dataSource;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input style={{ fontSize: "4px" }}/>;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable: React.FC<{}> = ({}) => {

    console.log("hi")
  const [pageNum,setPageNum] = useRecoilState(uavPageNumAtom);
  const uavListAble = useRecoilValueLoadable(queryUavList);
    const [selectUav, setSelectUav] = useRecoilState(selectUavAtom);
  const setForceUdpateTask = useSetRecoilState(forceUpdateUavListAtom);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
//   let data = originData;
  useEffect(()=>{
    async function initData(){
        const uavData = await getUavInfo(pageNum,3);
        console.log(uavData)
        setData(uavData);
        // dataRef.current = uavData;
    }
    initData();
    // data = uavListAble.contents;
    //     dataRef.current = uavListAble.contents;
  },[pageNum])

  const dataRef = useRef<UavInfoType[] | null>(null);
  const [operation,setOperation] = useState("edit");
  const [editingKey, setEditingKey] = useState('');
//   const data = useRef(null);
  switch(uavListAble.state){
    case 'hasValue':
        // setData([...uavListAble.contents]);
        
        const isEditing = (record: Item) => record.droneId === editingKey;
        const editUav = (record: Item) => {
            form.setFieldsValue({...record });
            setEditingKey(record.droneId);
        };

        const cancel = () => {
            setEditingKey('');
        };

        const save = async (key: string,operation:string) => {
            try {
                const row = (await form.validateFields()) as Item;

                const newData = [...data];
                const index = newData.findIndex(item => key === item.droneId);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setData([...newData]);
                    // data = newData;
                    // dataRef.current = newData;
                    setEditingKey('');

                    const editedData = newData.filter(item => key === item.droneId)[0];

                    if(operation === "edit"){
                        const postData = {
                            droneId:editedData.droneId,
                            droneName: editedData.droneName,
                            droneStatus: editedData.droneStatus  === "可用"? 0:1,
                        }

                        const status =async () => {
                            await postEditUav(postData).then(()=>{
                                setForceUdpateTask(Math.random());
                            });;
                        };
                        status();
                    }else{
                        const postData = {
                            droneName: editedData.droneName,
                            droneStatus: editedData.droneStatus  === "可用"? 0:1,
                        }

                        const status =async () => {
                            await postAddUav(postData).then(()=>{
                                setForceUdpateTask(Math.random());
                            });;
                        };
                        status();
                        setOperation("edit");
                    }
                } else {
                    newData.push(row);
                    setData([...newData]);
                    // data = newData;
                    // dataRef.current = newData;
                    setEditingKey('');
                }
            } catch (errInfo) {
                console.log('Validate Failed:', errInfo);
            }
        };

        const addUav = () => {
            const newData: Item = {
                key:"default",
                droneId: "default",
                droneName:"default",
                droneStatus: '可用',
                registrationDate:"",
            };
            
            let temp = [newData,...data].slice(0,-1);
            // data = temp;
            // dataRef.current = temp;
            // setData([...data, newData]);
            setData([...temp]);
            editUav(newData);
            setOperation("add");
        };

        const deleteUav = (key: string) => {
            const dataSource = [...data];
            // setData(dataSource.filter(item => item.droneId !== key) );
            // data = dataSource.filter(item => item.droneId !== key);
            const deleteParams = {
                droneId:key
            }
            const status =async () => {
                await postDeleteUav(deleteParams).then(()=>{
                    setForceUdpateTask(Math.random());
                });
            };
            status();
        };


        const columns = [
            {
            title: '名称',
            dataIndex: 'droneName',
            editable: true,
            className: 'table-task-col',
            width:80,
            },
            {
            title: '状态',
            dataIndex: 'droneStatus',
            editable: false,
            className: 'table-task-col',
            width:80,
            },
            {
            title: '操作',
            dataIndex: 'operation',
            className: 'table-task-col',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                <span>
                    <Typography.Link onClick={() => save(record.droneId,operation)} style={{ marginRight: 8 }}>
                    保存
                    </Typography.Link>
                    <Popconfirm title="确定取消?" onConfirm={cancel}>
                    <a>取消</a>
                    </Popconfirm>
                </span>
                ) : (
                    <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => editUav(record) } style={{ marginRight: 8 }}>
                    编辑
                </Typography.Link>
                <Popconfirm title="确定删除?" onConfirm={()=>deleteUav(record.droneId)}>
                    <a>删除</a>
                    </Popconfirm>
                </span>
                );
            },
            },
        ];

        const mergedColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
            };
        });

        return (
            <div>
                <Form form={form} component={false} style={{ fontSize: "4px"}}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        size="small"
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        pagination={{pageSize: 3, total: 20, current:pageNum, onChange: (e)=>{setPageNum(e);setForceUdpateTask(Math.random());}}}
                        onRow={record => {
                            return {
                                onClick: event => {},
                                onDoubleClick: event => {setSelectUav(record);console.log(record)},
                                onMouseEnter: event => {event.stopPropagation()}
                            }
                        }}
                        rowClassName={record => {
                            if(selectUav) return record.droneId === selectUav.droneId ? 'table-task-row' : '';
                            return '';
                        }}  
                    />
                </Form>
                <hr></hr>
                <Button className='uav-button' onClick={addUav} >
                    新增
                </Button>
            </div>
        );
    case 'loading':
        return (
            <Table className="table-task-list" size="small" dataSource={[]} columns={[]}
                    pagination={{pageSize: 3, total: 20}} 
            ></Table>
        );
    case 'hasError':
        throw uavListAble.contents;
  }  
  
};

export default EditableTable;