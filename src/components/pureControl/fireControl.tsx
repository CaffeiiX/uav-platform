import { Checkbox} from "antd";
// import { useState } from "react";
import { useRecoilState } from "recoil";
import { firePluginsMapAtom } from "../../store/plugins";

const FireControl: React.FC<{}> = () => {
  const [firePlugins, setFirePlugins] = useRecoilState(firePluginsMapAtom);
  return (
    <>

        {firePlugins.map((item) => {
          return (
            <div style={{margin: '10px 0 10px 10px'}}>
            <Checkbox
              key={item.key}
              checked={item.checkable}
              onClick={() => {setFirePlugins(firePlugins.map(tempItem=> {
                if(tempItem.key === item.key){
                  return {
                    name: item.name,
                    key: item.key,
                    checkable: !item.checkable
                  }
                } else {
                  return tempItem;
                }
              }))}}
            >
              {item.name}
            </Checkbox>
            </div>
          );
        })}
    </>
  );
};
export default FireControl;
