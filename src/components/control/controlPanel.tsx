import { Layout, Collapse, Select, Checkbox} from "antd";
import { useState } from "react";
import './controlPanel.css'
import { Plugins } from "../../interface/plugin";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
const {Panel} = Collapse;
const {Option} = Select;



const ControlPanel : React.FC <{plugin: Plugins, 
                                optionValue: string, 
                                onCheckedChange: (e: CheckboxChangeEvent) => void
                                onSelectedChange: (value: string) => void }> = ({plugin, optionValue, onCheckedChange, onSelectedChange}) => {

    const [isCollapse, setCollpse ]  = useState(false);

    const changeCollpse = () => {
        setCollpse(!isCollapse);
    }

    const checkBoxList : JSX.Element[] = [];
    
    plugin[optionValue].map((item) : void => {
        const value: string = Object.keys(item)[0];
        const [isUse, isChangeable] = [...item[value]]
        checkBoxList.push(
        <Checkbox value={value} key={value} defaultChecked={isUse} disabled={!isChangeable} onChange={onCheckedChange}>
            {value}
        </Checkbox>);
    });

    return (
        <>
        <Layout className="panel" style={{left: window.innerWidth / 2 - 150, height: 48}} >
          <Collapse defaultActiveKey={['']} onChange={changeCollpse}>
          <Panel key = "1" header="插件管理" className="panel-collapse">
              <div className="control-div">
                  <span>组件类型：</span>
                  <Select defaultValue={optionValue} onChange={onSelectedChange}>
                      {Object.keys(plugin).map((item) => <Option key = {item}>{item}</Option>)}
                  </Select>
                  <div style={{marginTop: 20}}>
                  {checkBoxList}
                  </div>
              </div>
          </Panel>
          </Collapse>
        </Layout>
        </>
    )
}
export default ControlPanel;