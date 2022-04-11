import { Radio,Button } from "antd"
import { useState } from "react"
import './pureTaskControl.css'
const PureTaskControl : React.FC<{}> = ({}) => {
  const [value, setValue] = useState(0);
  return (
      <>
      <Radio.Group onChange={(e)=>{setValue(e.target.value)}} value={value} className="task-control-radio">
          <Radio className="radio" value={0} key={'static'}>静态任务</Radio>
          <Radio className="radio" value={1} key={'dynamic'}>动态任务</Radio>
      </Radio.Group>
      <Button className="task-button" disabled={value === 0 ? false: true} onClick={()=>{}}>
          创建任务
      </Button>
      <Button className="task-button" disabled={true} onClick={() => {}}>
          结束任务
      </Button>
      <hr/>
      </>
  )
}

export default PureTaskControl;