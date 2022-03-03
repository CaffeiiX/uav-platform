import { createContext} from "react";

type CreateContext = {
    isCreateTaskModal: boolean;
    setIsCreateTaskModal: (c: boolean) => void;
}

const IsCreateTaskContext = createContext<CreateContext>({
    isCreateTaskModal: false,
    setIsCreateTaskModal: () => {},
});

export {IsCreateTaskContext};
