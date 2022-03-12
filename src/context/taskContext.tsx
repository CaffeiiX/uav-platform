import { createContext} from "react";

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

export {IsCreateTaskContext, isDrawPolygonContext};
