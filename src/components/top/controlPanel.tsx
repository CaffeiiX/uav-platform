import { Layout, Collapse, Select, Checkbox} from "antd";
import { useState } from "react";
import './controlPanel.css'

const {Panel} = Collapse;
const {Option} = Select;

interface checkPlugin  {
    [name: string] : boolean[]
}

interface Plugins {
    [name: string] : string[]
}

const plugin : Plugins = {
    '基础组件': ['任务信息'],
    '火灾组件': ['火灾信息','火灾模拟']
}

const getObjectKeys = (obj: Plugins) : string[] => {
    const keys : string[] = []
    for(let key in obj) keys.push(key);
    return keys
}

const ControlPanel : React.FC <{}> = () => {
    const [isCollapse, setCollpse ]  = useState(false);
    const [optionValue, setOptionValue] = useState('基础组件');
    const changeCollpse = () => {
        setCollpse(!isCollapse);
    }
    return (
        <>
        <Layout className="panel" style={{left: window.innerWidth / 2 - 150, height: 48}} >
          <Collapse defaultActiveKey={['']} onChange={changeCollpse}>
          <Panel key = "1" header="控制面板" className="panel-collapse">
              <div className="control-div">
                  <span>组件类型：</span>
                  <Select defaultValue={optionValue} onChange={(value)=> {setOptionValue(value)}}>
                      {getObjectKeys(plugin).map((item) => <Option key = {item}>{item}</Option>)}
                  </Select>
                  <div style={{marginTop: 20}}>
                  {plugin[optionValue].map((item) => <Checkbox value={item} key={item}> {item} </Checkbox>)}
                  </div>
              </div>
          </Panel>
          </Collapse>
        </Layout>
        </>
    )
}
export default ControlPanel;