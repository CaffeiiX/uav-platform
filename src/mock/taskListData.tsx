const columns = [
    {
        'title': '任务名称',
        'dataIndex': 'name',
        'key': 'name'
    },
    {
        'title': '任务时间',
        'dataIndex': 'time',
        'key': 'time'
    },
    {
        'title': '任务状态',
        'dataIndex': 'status',
        'key': 'status'
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

export {columns, dataSource};