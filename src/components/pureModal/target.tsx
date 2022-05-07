import { Radio, Button } from "antd";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isDrawTargetPointAtom } from "../../store/map";
import { isModalShowAtom } from "../../store/modal";
const Target: React.FC<{}> = () => {
  const [targetMode, setTargetMode] = useState(0);
  const setIsDrawTarget = useSetRecoilState(isDrawTargetPointAtom);
  const setIsModalShow = useSetRecoilState(isModalShowAtom);
  return (
    <div style={{ width: "100%", marginTop: 10 }}>
      <span>{"指定目标: "}</span>
      <Radio.Group
        onChange={(e) => {
          setTargetMode(e.target.value);
        }}
        value={targetMode}
        disabled={false}
      >
        <Radio value={0}>绘制</Radio>
        <Radio value={1}>导入</Radio>
        <Button type="primary" onClick={() => {setIsDrawTarget(true);setIsModalShow(false);}}>
          确定
        </Button>
      </Radio.Group>
    </div>
  );
};

export default Target;
