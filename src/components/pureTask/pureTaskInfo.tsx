import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { querySelectUavListInTask, selectTaskAtom } from "../../store/task";
import './pureTaskInfo.css';
import TaskInfo from "./TaskInfo/TaskInfo";
import UavInfo from "./TaskInfo/UavInfo";

const PureTaskInfo: React.FC<{}> = () => {
  const selectTask = useRecoilValue(selectTaskAtom);
  // const uavList = useRecoilValue(selectUavList);
  const selectUavListInTaskAble = useRecoilValueLoadable(querySelectUavListInTask);
  switch(selectUavListInTaskAble.state){
    case 'hasValue':
      return (
        <>
        <TaskInfo selectTask={selectTask} selectUavListInTask={selectUavListInTaskAble.contents}></TaskInfo>
        <UavInfo isChecked={false} selectUavListInTask={selectUavListInTaskAble.contents.map(item => item.droneId)}></UavInfo>
        </>
      );
    case 'loading':
      return (
        <>
        <TaskInfo selectTask={selectTask} selectUavListInTask={[]}></TaskInfo>
        <UavInfo isChecked={false} selectUavListInTask={[]}></UavInfo>
        </>
      );
    case 'hasError':
      throw selectUavListInTaskAble.contents;
  }
};
export default PureTaskInfo;
