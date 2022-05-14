import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { isFireInfoSiderShowAtom } from "../../../store/plugins";
import { useRecoilState } from "recoil";
import "./fireInfoSider.css";
const FireInfoSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isFireInfoSiderShowAtom);
  return (
    <>
      <Sider
        collapsedWidth={0}
        collapsible
        collapsed={!visible}
        width={240}
        className="content-sider"
        zeroWidthTriggerStyle={{visibility:"hidden"}}
      >
        {visible ? (
          <>
            <article className="sider-article">
              <header className="sider-header">
                <div className="header-content">
                  <h3 className="heading">火灾信息</h3>
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
        {visible ? children : (<></>)}
      </Sider>
    </>
  );
};
export default FireInfoSider;