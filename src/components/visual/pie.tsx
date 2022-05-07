import React, { useEffect, useRef } from 'react';
import { IProps } from '../../types/IProps';
import * as echarts from "echarts";

const Pie: React.FC<IProps> = (props) => {

    const chartRef:any = useRef();  //拿到DOM容器
    // 每当props改变的时候就会实时重新渲染
    useEffect(()=>{
        const chart = echarts.init(chartRef.current);   //echart初始化容器
        let option = {  //配置项(数据都来自于props)
          
          title: {
            text: '',
            subtext: '无人机覆盖率',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: [
              'rose1',
              'rose2',
              'rose3',
              'rose4',
              'rose5',
              'rose6',
              'rose7',
              'rose8'
            ]
          },
          series: [
            {
              name: '覆盖度',
              type: 'pie',
              radius: [20, 80],
              center: ['25%', '50%'],
              roseType: 'radius',
              itemStyle: {
                borderRadius: 5
              },
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: [
                { value: 40, name: '无人机1' },
                { value: 33, name: '无人机2' },
                { value: 28, name: '无人机3' },
                { value: 22, name: '无人机4' },
                { value: 20, name: 'rose 5' },
                { value: 15, name: 'rose 6' },
                { value: 12, name: 'rose 7' },
                { value: 10, name: 'rose 8' }
              ]
            }
          ]
        };
        chart.setOption(option);
        return () => {
          chart.dispose();
        }
    }, [props]);

    return <div ref={chartRef} className="chart" style={{height: '100%'}}></div>
}

export default Pie;
