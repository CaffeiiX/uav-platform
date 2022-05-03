import PureTaskControl from "./pureTaskControl"
import PureTaskInfo from "./pureTaskInfo";
import PureTaskList from "./pureTaskList";
import React from "react";
const PureTask : React.FC<{}> = () => {
  return (
  <>
  <PureTaskControl></PureTaskControl>
  <PureTaskList></PureTaskList>
  <hr></hr>
  <PureTaskInfo></PureTaskInfo>
  </>)
}

export default PureTask;