// 任务信息类型
type TaskInfoType = {
    'Id': string,
    'date': string,
    'name': string,
    'status': string,
    'boundary': number[]
}

type TaskDatetime = {
    'date': number,
    'hours': number,
    'seconds': number,
    'month': number,
    'timezoneOffset': number,
    'year': number,
    'minutes': 18,
    'time': number,
    'day': number
}
type TaskInfoApiType = {
    "taskBounary": string,
    'taskId': string,
    'taskName': string,
    'taskRoute': string,
    'taskStatus': number,
    'taskTime': TaskDatetime,
    'taskType': number
}

//无人机类型
type UavInfoType = {
    'Id' : string,
    'name' : string,
    'status': string
}

type CreateTaskType = {
    droneIds: string[],
    task_bounary: string,
    task_name: string,
    task_status: 0|1|2|3,
    task_type: 0|1
}

export type {TaskInfoType, TaskInfoApiType, UavInfoType, CreateTaskType}