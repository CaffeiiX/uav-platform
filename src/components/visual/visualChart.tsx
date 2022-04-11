import "./visualChart.css";
import { Button, Layout } from "antd";
import { useEffect, useState } from "react";
import Index from "./chart";
import Pie from "./pie";
const { Sider } = Layout;

const VisualChart: React.FC<{
  isShowChart: boolean;
  setIsShowChart: (c: boolean) => void;
}> = ({ isShowChart, setIsShowChart }) => {
  const [lineState, setLineState] = useState({
    lineChartData: {
      //折线图模拟数据
      xData: [
        "2021/08/13",
        "2021/08/14",
        "2021/08/15",
        "2021/08/16",
        "2021/08/17",
        "2021/08/18",
      ],
      seriesData: [5, 19, 43, 65, 87, 90],
    },
  });
  const [count, setCount ]= useState<number>(0);
  const [isVisiual, setIsVisual] = useState<boolean>(false);
  useEffect(()=>{
    setCount(count + 1);
    setIsVisual(true);
  }, [isShowChart]);

  return (
    <>
    {
      isShowChart ? (
      <><Sider
      className="mainview-sider-visual"
      // collapsible
      // collapsed={!isShowChart}
      // collapsedWidth={0}
      width={560}
      reverseArrow={true}
    >
      <article className="article-visual">
        <header className="header-visual">
          <div className="header-content-visual">
            <h3 className="heading-visual">统计信息</h3>
          </div>
          <div className="close-button-visual">
            <Button
              type="text"
              onClick={() => {
                setIsShowChart(false);
              }}
            >
              X
            </Button>
          </div>
        </header>
          <div className="visual-charts" key={'123'}>
            {
              isVisiual? (<>
              <div className="visual-pie" key="shows">
              <Index
              props={{
                title: " ",
                xData: lineState.lineChartData.xData,
                seriesData: lineState.lineChartData.seriesData
              }
              }
                count={count}
              />
            </div>
            <div className="visual-pie-rose" key="show-pie">
              <Pie
                title=""
                xData={lineState.lineChartData.xData}
                seriesData={lineState.lineChartData.seriesData}
                key={String(count)}
              />
            </div>
              </>) : (<></>)
            }
          </div>
      </article>
    </Sider></>) : (<>/</>)
    }
    </>
  );
};

export default VisualChart;
