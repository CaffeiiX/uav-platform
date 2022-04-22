import { Radio, Button, Select, RadioChangeEvent} from "antd";
import { Cartesian3 } from "cesium";
import { useContext, useState } from "react";
import { IsCreateTaskContext } from "../../context/taskContext";
import { IsDrawPointType, PlatformUav } from "../../interface/taskType";
import { fliterUavList } from "../../utils/utils";
/**
 * 根据不同的方案传回不同的下选界面
 */
const {Option} = Select;
const MethodModal: React.FC<{method: string;
  isPlatformPoint: IsDrawPointType;
  platformPoint: Cartesian3[];
  uavList: string[];
  isDrawPoint: IsDrawPointType;
  platformSelectUavList: PlatformUav;
  setPlatformSelectUavList: (c: PlatformUav) => void}> = ({method, isPlatformPoint, platformPoint, uavList, isDrawPoint, platformSelectUavList, setPlatformSelectUavList}) => {
  const createTaskContext = useContext(IsCreateTaskContext);
  const [platformMode, setPlatformMode] = useState<number>(0);
  //每个无人机可选的无人机
  // const [platformSelectUavList, setPlatformSelectUavList] = useState<PlatformUav>({});
  const [selectPlatform, setSelectPlatform] = useState<number>(-1);

  const [areaValue,setAreaValue] = useState(1);
  const onPlatformClick = () => {
    if(platformMode === 0){
      createTaskContext.setIsCreateTaskModal(false);
      isPlatformPoint.setIsDrawPoint(true);
    } else {
        //导入文件部分逻辑
    }
  }
  const onAreaChange = (e:RadioChangeEvent) => {
    console.log('指定目标', e.target.value);
    setAreaValue(e.target.value);
};
const handleOnClick = () => {
  createTaskContext.setIsCreateTaskModal(false);
  isDrawPoint.setIsDrawPoint(true);
}
  // 仅创建无人机部分
  if(method === '1'){
    return (
    <>
    <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"平台区位: "}</span>
          <Radio.Group onChange={(e)=>{setPlatformMode(e.target.value)}} value={platformMode} disabled={isPlatformPoint.isDrawPoint}>
            <Radio value={0}>绘制</Radio>
            <Radio value={1}>实时获取</Radio>
          </Radio.Group>
          <Button type="primary" style={{ marginTop: 20 }} onClick={onPlatformClick} disabled={isPlatformPoint.isDrawPoint}>
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
                  platformPoint.map((item, index) => { return(
                      <Option value={index} key={index}>{`平台区位${index}`}</Option>
                  )})
              }
          </Select>
          <span style={{marginLeft: '15%'}}>{"选择无人机："}</span>
          <Select
            mode="multiple"
            style={{ width: "20%", marginTop: 10 }}
            onChange={(e) => {
                setPlatformSelectUavList({
                    ...platformSelectUavList, 
                    [selectPlatform]: e
                })
            }}
            value={platformSelectUavList[String(selectPlatform)]}
          >
            {selectPlatform !== -1? (
            fliterUavList(uavList, platformSelectUavList, String(selectPlatform)).map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })) : (<></>)}
          </Select>
        </div>
    </>)
  }
  //无人机单扫部分
  if(method === '2'){
    return (
    <>
    <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"平台区位: "}</span>
          <Radio.Group onChange={(e)=>{setPlatformMode(e.target.value)}} value={platformMode} disabled={isPlatformPoint.isDrawPoint}>
            <Radio value={0}>绘制</Radio>
            <Radio value={1}>实时获取</Radio>
          </Radio.Group>
          <Button type="primary" style={{ marginTop: 20 }} onClick={onPlatformClick} disabled={isPlatformPoint.isDrawPoint}>
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
                  platformPoint.map((item, index) => { return(
                      <Option value={index} key={index}>{`平台区位${index}`}</Option>
                  )})
              }
          </Select>
          <span style={{marginLeft: '15%'}}>{"选择无人机："}</span>
          <Select
            mode="multiple"
            style={{ width: "20%", marginTop: 10 }}
            onChange={(e) => {
                setPlatformSelectUavList({
                    ...platformSelectUavList, 
                    [selectPlatform]: e
                })
            }}
            value={platformSelectUavList[String(selectPlatform)]}
          >
            {selectPlatform !== -1? (
            fliterUavList(uavList, platformSelectUavList, String(selectPlatform)).map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })) : (<></>)}
          </Select>
        </div>
    </>)
  }
  //无人机单扫部分
  if(method === '3'){
    return (
    <>
    <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"平台区位: "}</span>
          <Radio.Group onChange={(e)=>{setPlatformMode(e.target.value)}} value={platformMode} disabled={isPlatformPoint.isDrawPoint}>
            <Radio value={0}>绘制</Radio>
            <Radio value={1}>实时获取</Radio>
          </Radio.Group>
          <Button type="primary" style={{ marginTop: 20 }} onClick={onPlatformClick} disabled={isPlatformPoint.isDrawPoint}>
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
                  platformPoint.map((item, index) => { return(
                      <Option value={index} key={index}>{`平台区位${index}`}</Option>
                  )})
              }
          </Select>
          <span style={{marginLeft: '15%'}}>{"选择无人机："}</span>
          <Select
            mode="multiple"
            style={{ width: "20%", marginTop: 10 }}
            onChange={(e) => {
                setPlatformSelectUavList({
                    ...platformSelectUavList, 
                    [selectPlatform]: e
                })
            }}
            value={platformSelectUavList[String(selectPlatform)]}
          >
            {selectPlatform !== -1? (
            fliterUavList(uavList, platformSelectUavList, String(selectPlatform)).map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })) : (<></>)}
          </Select>
        </div>
    </>)
  }
  //多无人机扫描
  if(method === '4'){
    return (
    <>
    <div style={{ width: "100%", marginTop: 10 }}>
          <span>{"平台区位: "}</span>
          <Radio.Group onChange={(e)=>{setPlatformMode(e.target.value)}} value={platformMode} disabled={isPlatformPoint.isDrawPoint}>
            <Radio value={0}>绘制</Radio>
            <Radio value={1}>实时获取</Radio>
          </Radio.Group>
          <Button type="primary" style={{ marginTop: 20 }} onClick={onPlatformClick} disabled={isPlatformPoint.isDrawPoint}>
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
                  platformPoint.map((item, index) => { return(
                      <Option value={index} key={index}>{`平台区位${index}`}</Option>
                  )})
              }
          </Select>
          <span style={{marginLeft: '15%'}}>{"选择无人机："}</span>
          <Select
            mode="multiple"
            style={{ width: "20%", marginTop: 10 }}
            onChange={(e) => {
                setPlatformSelectUavList({
                    ...platformSelectUavList, 
                    [selectPlatform]: e
                })
            }}
            value={platformSelectUavList[String(selectPlatform)]}
          >
            {selectPlatform !== -1? (
            fliterUavList(uavList, platformSelectUavList, String(selectPlatform)).map((item, index) => {
              return (
                <Option value={item} key={index}>
                  {item}
                </Option>
              );
            })) : (<></>)}
          </Select>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
        <span>{"指定目标: "}</span>
        <Radio.Group onChange={onAreaChange} value={areaValue}>
          <Radio value={1}>绘制</Radio>
          <Radio value={2}>导入</Radio>
          <Button type="primary" onClick={handleOnClick}>
            确定
          </Button>
        </Radio.Group>
      </div>
    </>)
  }
  //多无人机多目标部分

  return (
    <>
    </>
  )
}

export default MethodModal;