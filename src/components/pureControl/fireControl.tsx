import { Checkbox } from "antd";
// import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { firePluginsMapAtom, isFireInfoSiderShowAtom, isFireSimulationShowAtom } from "../../store/plugins";

const FireControl: React.FC<{}> = () => {
  const [firePlugins, setFirePlugins] = useRecoilState(firePluginsMapAtom);
  const setIsFireInfoSiderShow = useSetRecoilState(isFireInfoSiderShowAtom);
  const setIsFireSimulationShow = useSetRecoilState(isFireSimulationShowAtom);
  return (
    <>

      {firePlugins.map((item) => {
        return (
          <div style={{ margin: '10px 0 10px 10px' }}>
            <Checkbox
              key={item.key}
              checked={item.checkable}
              onClick={() => {
                setFirePlugins(firePlugins.map(tempItem => {
                  if (tempItem.key === item.key) {
                    return {
                      name: item.name,
                      key: item.key,
                      checkable: !item.checkable
                    }
                  } else {
                    return tempItem;
                  }
                }))
                let visible = item.checkable;
                if (item.name == '火灾信息') {
                  setIsFireInfoSiderShow(!visible);
                  setIsFireSimulationShow(visible);
                }
                if (item.name == '火灾模拟') {
                  setIsFireSimulationShow(!visible);
                  setIsFireInfoSiderShow(visible);
                }
              }}
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
