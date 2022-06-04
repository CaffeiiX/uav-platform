import React from 'react';
import { Select } from 'antd';
import { fireDetAlgoAtom } from "../../../store/fireTask";
import { useRecoilState } from 'recoil';
import "./fireInfoSider.css";

const { Option } = Select;

const FireDetAlgoSelect: React.FC<{}> = ({ children }) => {
    const [fireDetAlgo, setFireDetAlgo] = useRecoilState(fireDetAlgoAtom);
    return (
        <Select
            className='task-detalgo-select'
            showSearch
            placeholder="请选择探测算法"
            optionFilterProp="algorithm"
            onChange={(value: string) => {
                console.log(`selected ${value}`);
                setFireDetAlgo(value);
            }}
            onSearch={(value: string) => {
                console.log('search:', value);
            }}
            filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            dropdownMatchSelectWidth
        >
            <Option value="算法1">算法1</Option>
            <Option value="算法2">算法2</Option>
            <Option value="算法3">算法3</Option>
        </Select>
    );
}

export default FireDetAlgoSelect;