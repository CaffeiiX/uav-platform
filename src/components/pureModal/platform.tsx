import { Radio, Button, Select } from "antd";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isDrawPlatformAtom, platformPointColAtom } from "../../store/map";
import { isModalShowAtom } from "../../store/modal";
import { platformSelectUavListAtom, uavListAtom } from "../../store/uav";
import { fliterUavList } from "../../utils/utils";
const { Option } = Select;
const Platform: React.FC<{}> = () => {
  const [platformMode, setPlatformMode] = useState(0);
  const setIsDrawPlatform = useSetRecoilState(isDrawPlatformAtom);
  const setIsModalShow = useSetRecoilState(isModalShowAtom);

  const [platformSelectUavList, setPlatformSelectUavList] = useRecoilState(platformSelectUavListAtom);
  const platformPointCol =  useRecoilValue(platformPointColAtom);
  const [selectPlatform, setSelectPlatform] = useState<number>(-1);
  const uavList = useRecoilValue(uavListAtom);

  return (
    <>
      <div style={{ width: "100%", marginTop: 10 }}>
        <span>{"平台区位: "}</span>
        <Radio.Group
          onChange={(e) => {
            setPlatformMode(e.target.value);
          }}
          value={platformMode}
          disabled={false}
        >
          <Radio value={0}>绘制</Radio>
          <Radio value={1}>实时获取</Radio>
        </Radio.Group>
        <Button
          type="primary"
          style={{ marginTop: 20 }}
          onClick={()=> {setIsDrawPlatform(true);setIsModalShow(false);}}
          disabled={false}
        >
          确定
        </Button>
      </div>
      <div>
        <span>{"指定区位: "}</span>
        <Select
          style={{ width: "20%", marginTop: 5 }}
          onChange={(e) => {
            setSelectPlatform(e);
          }}
        >
          {
            platformPointCol.map((item, index) =>{
              return(
                <Option value= {index} key={index}>{`飞行平台${index}`}</Option>
              )
            })
          }
        </Select>

        <span style={{ marginLeft: "15%" }}>{"选择无人机："}</span>
        <Select
          mode="multiple"
          style={{ width: "20%", marginTop: 10 }}
          onChange={(e) => {
            setPlatformSelectUavList({
              ...platformSelectUavList,
              [selectPlatform]: e,
            });
          }}
          value = {platformSelectUavList[String(selectPlatform)]}
        >
          {
            selectPlatform !== -1 ? (
              fliterUavList(
                uavList,
                platformSelectUavList,
                String(selectPlatform)
              ).map((item, index) => {
                return(
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                )
              })
            ): (<></>)
          }
        </Select>
      </div>
    </>
  );
};

export default Platform;
