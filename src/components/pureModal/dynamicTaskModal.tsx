import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  isShowCreateTaskModalAtom, isShowDynamicTaskModalAtom, isCreateTaskModalAtom, isStopReceiveMessageAtom, isShowRelateTaskModalAtom} from "../../store/modal";
import { taskStatusAtom } from "../../store/task";
import { inUseUavListAtom, uavListAtom, uavWebsocketJsonMessageSelector } from "../../store/uav";

const DynamicTaskModal: React.FC<{}> = () => {
  // const isShowDynamicTaskCreateModal = useRecoilValue(isShowDynamicTaskCreateModalSelector);
  const [isShowDynamicTaskModal,setIsShowDynamicTaskModal] = useRecoilState(isShowDynamicTaskModalAtom);
  const uavWebsocketJsonMessage = useRecoilValue(uavWebsocketJsonMessageSelector);
  const [uavList, setUavList] = useRecoilState(inUseUavListAtom);
  const taskStatus = useRecoilValue(taskStatusAtom);
  const [isStopReceiveMessage, setIsStopReceiveMessage] = useRecoilState(isStopReceiveMessageAtom);
  const setIsCreateTaskModalShow = useSetRecoilState(isShowCreateTaskModalAtom);
  const setIsCreateTaskModal = useSetRecoilState(isCreateTaskModalAtom);
  const setIsShowRelateTaskModal = useSetRecoilState(isShowRelateTaskModalAtom);
  // const [newUav, setNewUav] = useState('');
  useEffect(() => {
    if(uavWebsocketJsonMessage){
      if (!uavList.includes(uavWebsocketJsonMessage.UAV_id) && taskStatus === 1 && !isStopReceiveMessage){
        setIsShowDynamicTaskModal(true);
        setUavList([...uavList, uavWebsocketJsonMessage.UAV_id]);
        setIsStopReceiveMessage(true);
        setIsCreateTaskModal(true);
      }
    }
  },[uavWebsocketJsonMessage])
  const onCreateTaskButtonClick = () => {
    setIsShowDynamicTaskModal(false);
    setIsCreateTaskModalShow(true);
  }
  const onRelateTaskButtonClick = () => {
    setIsShowDynamicTaskModal(false);
    setIsShowRelateTaskModal(true);
  }
  return (
    <Modal visible={isShowDynamicTaskModal}
    title={'无人机信息'}
    okText={'创建任务'}
    cancelText={'关联任务'}
    onOk={onCreateTaskButtonClick}
    onCancel={onRelateTaskButtonClick}>
      <div>{`有新无人机：${uavList[uavList.length - 1]}`}</div>
      <div>{'请选择具体方案'}</div>
    </Modal>
  )
}

export default DynamicTaskModal;