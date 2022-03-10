import { useCesium } from "resium";


const ViewerTestComponent : React.FC<{}> = () => {
    const viewer = useCesium();
    return (
        <>
        <p>this is {console.log(viewer)}</p>
        </>
    )
}

export default ViewerTestComponent;