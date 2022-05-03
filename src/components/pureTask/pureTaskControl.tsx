import { Radio,Button } from "antd"
import { useRecoilState, useRecoilValue } from "recoil";
import { ifEndTaskButtonStatus, taskStatusAtom } from "../../store/task";
import './pureTaskControl.css'
const PureTaskControl : React.FC<{}> = ({}) => {
  const [taskStatus, setTaskStatus] = useRecoilState(taskStatusAtom);
  const ifEndTaskButton = useRecoilValue(ifEndTaskButtonStatus);
  return (
      <>
      <Radio.Group onChange={(e)=>{setTaskStatus(e.target.value)}} value={taskStatus} className="task-control-radio">
          <Radio className="radio" value={0} key={'static'}>静态任务</Radio>
          <Radio className="radio" value={1} key={'dynamic'}>动态任务</Radio>
      </Radio.Group>
      <Button className="task-button" disabled={taskStatus === 0 ? false: true} onClick={()=>{}}>
          创建任务
      </Button>
      <Button className="task-button" disabled={ifEndTaskButton} onClick={() => {}}>
          结束任务
      </Button>
      <hr/>
      </>
  )
}

export default PureTaskControl;