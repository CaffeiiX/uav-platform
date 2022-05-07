import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { isSiderVisualAtom } from "../../store/view";
import { useRecoilState } from "recoil";
import "./visualSider.css";
const VisualSider: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isSiderVisualAtom);
  return (
    <>
      <Sider
        collapsedWidth={0}
        collapsible
        collapsed={!visible}
        width={240}
        className="content-sider"
      >
        {visible ? (
          <>
            <article className="sider-article">
              <header className="sider-header">
                <div className="header-content">
                  <h3 className="heading">图表信息</h3>
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
export default VisualSider;