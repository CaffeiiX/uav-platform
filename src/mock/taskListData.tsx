const columns = [
    {
        'title': '任务名',
        'dataIndex': 'name',
        'key': 'name',
        'className': 'table-task-col'
    },
    {
        'title': '任务时间',
        'dataIndex': 'date',
        'key': 'date',
        'className': 'table-task-col'
    },
    {
        'title': '状态',
        'dataIndex': 'status',
        'key': 'status',
        'className': 'table-task-col'
    },
]

const dataSource = [
    {
        key: '1',
        name: '任务1',
        time: '2022-02-20',
        status: '静态任务'
    },
    {
        key: '2',
        name: '任务2',
        time: '2022-02-21',
        status: "动态任务"
    }
]

const fireColumns = [
    {
        'title': '任务名',
        'dataIndex': 'taskName',
        'key': 'taskName',
        'className': 'table-task-col'
    },
    {
        'title': '无人机Id',
        'dataIndex': 'uavId',
        'key': 'uavId',
        'className': 'table-task-col'
    },
    {
        'title': '火灾时间',
        'dataIndex': 'fireTime',
        'key': 'fireTime',
        'className': 'table-task-col'
    },


]

export { columns, dataSource,fireColumns };