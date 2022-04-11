import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useRecoilState } from "recoil";
import { isSiderShow } from "../store/view";
import "./siderContext.css";
const SiderContent: React.FC<{}> = ({ children }) => {
  const [visible, setVisible] = useRecoilState(isSiderShow);
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
                  <h3 className="heading">任务信息</h3>
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

export default SiderContent;
