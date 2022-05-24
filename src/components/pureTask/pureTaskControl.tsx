import { Radio,Button } from "antd"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getInUseUavListAPI, PostFinishTaskAPI } from "../../api/taskAPI";
import { isModalShowAtom } from "../../store/modal";
import { forceUpdateTaskAtom, ifEndTaskButtonStatus, selectTaskAtom, taskStatusAtom } from "../../store/task";
import { inUseUavListAtom } from "../../store/uav";
import './pureTaskControl.css'
const PureTaskControl : React.FC<{}> = ({}) => {
  const [taskStatus, setTaskStatus] = useRecoilState(taskStatusAtom);
  const ifEndTaskButton = useRecoilValue(ifEndTaskButtonStatus);
  const setIsModalShow = useSetRecoilState(isModalShowAtom);
  const [selectTask, setSelectTask] = useRecoilState(selectTaskAtom);
  const setInUseUavList = useSetRecoilState(inUseUavListAtom);
//   const [IsUpdateTask, setIsUpdateTask] = useRecoilState(isUpdateTaskListAtom);
  const setForceUpdateTask = useSetRecoilState(forceUpdateTaskAtom);
  const onEndTaskClick = () => {
      const status =async () => {
          await PostFinishTaskAPI(selectTask.Id);
          const data = await getInUseUavListAPI();
          setInUseUavList(data.map(item => item.droneName));
      };
      let isEndTask = window.confirm(`是否结束任务：${selectTask.name}`);
      if(isEndTask){
          status();
          setSelectTask({
            Id: "random",
            name: "任务名",
            status: "0",
            date: "日期",
            boundary: [],
          });
        //   setIsUpdateTask(!IsUpdateTask);
        setForceUpdateTask(Math.random());
      };
  }
  return (
      <>
      <Radio.Group onChange={(e)=>{setTaskStatus(e.target.value)}} value={taskStatus} className="task-control-radio">
          <Radio className="radio" value={0} key={'static'}>静态任务</Radio>
          <Radio className="radio" value={1} key={'dynamic'}>动态任务</Radio>
      </Radio.Group>
      <Button className="task-button" disabled={taskStatus === 0 ? false: true} onClick={()=>{setIsModalShow(true);}}>
          创建任务
      </Button>
      <Button className="task-button" disabled={ifEndTaskButton} onClick={onEndTaskClick}>
          结束任务
      </Button>
      <hr/>
      </>
  )
}

export default PureTaskControl;