import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { isFireSimulationShowAtom } from "../../../store/plugins";
import { useRecoilState } from "recoil";
import "./fireSimulationSider.css";
import FireInoTable from "./fireInfoTable";
import { isFireAniShowAtom } from "../../../store/map"
import FireSimAlgoSelect from "./fireSimAlgoSelcet";

const FireSimulationSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isFireSimulationShowAtom);
  const [aniVisible, setAniVisible] = useRecoilState(isFireAniShowAtom);
  console.log(aniVisible);
  return (
    <>
      <Sider
        collapsedWidth={0}
        collapsible
        collapsed={!visible}
        width={240}
        className="content-sider"
        zeroWidthTriggerStyle={{ visibility: "hidden" }}
      >
        {visible ? (
          <>
            <article className="sider-article">
              <header className="sider-header">
                <div className="header-content">
                  <h3 className="heading">火灾模拟</h3>
                  <Button
                    className="close-button"
                    type="text"
                    onClick={() => setVisible(false)}
                  >
                    X
                  </Button>
                </div>
              </header>
            </article>
          </>
        ) : (
          <></>
        )}
        {/* {children} */}
        {visible ? <>
          <div>
            <FireInoTable />
          </div>
          <div>
            <FireSimAlgoSelect />
            <br/>
            <Button className="simulation-button" disabled={false} onClick={() => setAniVisible(true)}>
              火灾模拟
            </Button>
            <Button className="simulation-button" disabled={false} onClick={() => setAniVisible(false)}>
              清除模拟
            </Button>
          </div>
        </> : (<></>)}
      </Sider>
    </>
  );
};
export default FireSimulationSider;
