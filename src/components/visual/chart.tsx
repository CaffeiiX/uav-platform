import React, { useEffect, useRef } from 'react';
import { IProps } from '../../types/IProps';
import * as echarts from "echarts";

const Index: React.FC<{
    props: IProps,
    count: number
}> = ({props, count}) => {

    const chartRef:any = useRef();  //拿到DOM容器s

    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {  //配置项(数据都来自于props)
            title: {
                text: props.title ? props.title : "暂无数据",
                subtext: "随时间覆盖度"
            },
            xAxis: {
                type: 'category',
                data: props.xData,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: props.seriesData,
                type: 'line'
            }]
        };
        chart.setOption(option);
        return () => {
            chart.dispose();
            // chart.clear();
        }
    });

    return <div ref={chartRef} className="chart" style={{height: '100%'}} key={String(count)}></div>
}

export default Index;
