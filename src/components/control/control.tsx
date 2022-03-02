import ControlPanel from "./controlPanel";
import PluginsTab from "./pluginsTab";
import { Plugins } from "../../interface/plugin";
import { useState } from "react";

const plugin : Plugins = {
    '基础组件': [{'任务信息':[true, false]}],
    '火灾组件': [{
        "火灾信息": [false, true]
    },
    {
        '火灾模拟': [false, true]
    }
]
}

const Control : React.FC<{}> = () => {
    const [pluginsStatus, setPluginsStatus] = useState(plugin);
    const [optionValue, setOptionValue] = useState('基础组件');
    const changeCheckable = (value: string, checked: boolean, optionValue: string) => {
        setPluginsStatus({
            ...pluginsStatus,
            [optionValue]: 
                pluginsStatus[optionValue].map((v, i) => {
                    if(Object.keys(v)[0] === value) {
                        return {[value]: [!checked, true]};
                    } else {
                        return v;
                    }
                })
        })
    }
    return (
        <>
        <ControlPanel plugin={pluginsStatus} 
                      optionValue={optionValue} 
                      onCheckedChange={(e) => {
                          changeCheckable(e.target.value, !e.target.checked, optionValue)
                          }}
                      onSelectedChange={(value)=>{
                        setOptionValue(value)
                      }}
                      ></ControlPanel>
        <PluginsTab plugins={pluginsStatus}></PluginsTab>
        </>
    )
}

export default Control;
