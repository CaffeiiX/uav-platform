import "./visualChart.css";
import { Button, Layout } from "antd";
import { useEffect, useState } from "react";
import Index from "./chart";
import Pie from "./pie";
const { Sider } = Layout;

const VisualChart: React.FC<{
  isShowChart: boolean;
}> = ({ isShowChart}) => {
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
      <>
  
          <div className="visual-charts-2" key={'123'}>
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
    </>) : (<>/</>)
    }
    </>
  );
};

export default VisualChart;
