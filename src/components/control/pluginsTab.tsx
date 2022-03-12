import { Tabs } from "antd";
import { ReactElement } from "react";
import { Plugins } from "../../interface/plugin";
import "./pluginsTab.css"
const {TabPane} = Tabs;

const getAllkeys = (plugins: Plugins) => {
    const keys : string[] = [];
    for(let key of Object.keys(plugins)) {
        plugins[key].map((item) => {
            let tempKey = Object.keys(item)[0];
            if(item[tempKey][0] && item[tempKey][1]) {
                keys.push(tempKey);
            }
        })
    }
    return keys;
}


const PluginsTab : React.FC <{plugins: Plugins}> = ({plugins}) => {
    const pluginKeys = getAllkeys(plugins);
    if(pluginKeys.length === 0) return (<></>)    
    return (
        <>
        <Tabs defaultActiveKey={pluginKeys[0]} className='TabPlane' tabPosition="left" >  
            {pluginKeys.map((item) => 
                <TabPane key={item} tab={item}>
                    
                </TabPane>
            )}
        </Tabs>
        </>
    )
}
export default PluginsTab;
