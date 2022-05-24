import React, {useEffect} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSetRecoilState } from 'recoil';
import { uavWebsocketMessageAtom } from '../../store/uav';
import { getUuid } from '../../utils/utils';
const socketUrl = `ws://192.168.61.91:30094/web/websocket/${getUuid()}`
const WebsocketInfo: React.FC<{}> = () => {
  const setUavWebsocketMessage = useSetRecoilState(uavWebsocketMessageAtom);

  const { lastMessage, readyState, sendMessage} = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      if(lastMessage.data !== 'pong'){
        setUavWebsocketMessage(lastMessage.data);
      }
    }
    // console.log(lastMessage);
  }, [lastMessage, setUavWebsocketMessage]);

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl('wss://demos.kaazing.com/echo'),
  //   []
  // );
  // useEffect(() => {
  //   sendMessage('ping');
  // }, [])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  return (
    <>
    </>
  );
}
export default WebsocketInfo;
