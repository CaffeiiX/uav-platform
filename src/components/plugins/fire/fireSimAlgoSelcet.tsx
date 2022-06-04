import React from 'react';
import { Select } from 'antd';
import { fireSimAlgoAtom } from "../../../store/fireTask";
import { useRecoilState } from 'recoil';
import "./fireInfoSider.css";

const { Option } = Select;

const FireSimAlgoSelect: React.FC<{}> = ({ children }) => {
    const [fireSimAlgo, setFireSimAlgo] = useRecoilState(fireSimAlgoAtom);
    return (
        <Select
            className='task-simalgo-select'
            showSearch
            placeholder="请选择模拟算法"
            optionFilterProp="algorithm"
            onChange={(value: string) => {
                console.log(`selected ${value}`);
                setFireSimAlgo(value);
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

export default FireSimAlgoSelect;