import Platform from "./platform";
import Target from "./target";

const MethodModal: React.FC<{methodMode: string}> = (props) => {
  switch(props.methodMode){
    case '1':
      return(
        <Platform/>
      );
    case '2':
      return (
        <Platform/>
      );
    case '3':
      return (
        <Platform/>
      );
    case '4':
      return (
        <>
        <Platform/>
        <Target/>
        </>
      );
    default:
      return (
        <>
        </>
      ) 
  }
};

export default MethodModal;