import {Space } from 'antd';

const columns = [
    {
        'title': '无人机ID',
        'dataIndex': 'id',
        'key': 'id',
        'className': 'table-task-col'
    },
    {
        'title': '状态',
        'dataIndex': 'status',
        'key': 'status',
        'className': 'table-task-col'
    },
    {
        'title': '操作',
        'dataIndex': 'action',
        'key': 'action',
        'className': 'table-task-col',
        'render': () => (
            <Space size="middle">
              <a>编辑</a>
              <a>删除</a>
            </Space>
          ),
    },
]

const dataSource = [
    {key: '2',droneId: '2', droneName: '2', droneStatus: '可用', registrationDate: ''},
    {key: '60f836f355334dc19f65f876d9c942b1',droneId: '60f836f355334dc19f65f876d9c942b1', droneName: '无人机2号', droneStatus: '不可用', registrationDate: ''},
    {key:'3',droneId: '3', droneName: '3', droneStatus: '可用', registrationDate: ''},
]

const taskInfoOfUavCol = [
    {
        'title': '任务名',
        'dataIndex': 'taskName',
        'key': 'taskName',
        'className': 'table-task-col',
        "width": 70,
    },
    {
        'title': '状态',
        'dataIndex': 'taskStatus',
        'key': 'taskStatus',
        'className': 'table-task-col',
        "width": 70,
    },
    {
        'title': '类型',
        'dataIndex': 'taskType',
        'key': 'taskType',
        'className': 'table-task-col',
        "width": 50,
    },
    {
        'title': '时间',
        'dataIndex': 'taskTime',
        'key': 'taskTime',
        'className': 'table-task-col'
    },
]

export {columns, dataSource, taskInfoOfUavCol};