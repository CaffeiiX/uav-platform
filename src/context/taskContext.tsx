import Cartesian3 from "cesium/Source/Core/Cartesian3";
import { createContext} from "react";
import { TaskInfoType } from "../interface/taskType";

type CreateContext = {
    isCreateTaskModal: boolean;
    setIsCreateTaskModal: (c: boolean) => void;
}

type IsDrawContext = {
    isDrawPolygon: boolean;
    setIsDrawPolygon: (c: boolean) => void;
}

const IsCreateTaskContext = createContext<CreateContext>({
    isCreateTaskModal: false,
    setIsCreateTaskModal: () => {},
});

const isDrawPolygonContext = createContext<IsDrawContext>({
    isDrawPolygon: false,
    setIsDrawPolygon: () => {},
})



type ModalAndDrawContext = {
    modalAndDrawStatus: boolean[],
    setModalAndDrawStatus: (c: boolean[]) => void;
}

const ModalAndDrawStatusContext = createContext<ModalAndDrawContext>({
    modalAndDrawStatus: [false, false],
    setModalAndDrawStatus: () => {},
});

type SelectTaskContext = {
    selectTask: TaskInfoType,
    setSelectTask: (c: TaskInfoType) => void;
}
const SelectTaskContext = createContext<SelectTaskContext>({
    selectTask: {
        'name': '名称',
      'Id': '',
      'date': '时间',
      'status': '',
      'boundary': []
    },
    setSelectTask: () => {}
}
)
type SelectUavId = {
    selectUavId: string,
    setSelectUavId: (c: string) => void;
}
const SelectUavIdContext = createContext<SelectUavId>({
    selectUavId: '',
    setSelectUavId: ()=> {}
})

// type TargetPointStatusType = {
//     targetPointStatus: TargetPointType | undefined
//     setTargetPointStatus: (c: TargetPointType | undefined) => void
// }

// const TargetPointContext = createContext<TargetPointStatusType>({
//     targetPointStatus: undefined,
//     setTargetPointStatus: () => {}
// })
export {IsCreateTaskContext, isDrawPolygonContext, SelectTaskContext,SelectUavIdContext};
