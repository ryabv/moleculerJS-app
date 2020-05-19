import React from 'react';
import { ISwimmer } from '../Table/Table';

interface IProps {
    index: number,
    swimmer: ISwimmer;
    handleClick: (swimmer: ISwimmer) => void;
}

function TableRow({ index, swimmer, handleClick }: IProps) {

    const handleInnerClick = () => {
        handleClick(swimmer);
    };

    return (
        <tr>
            <th className="align-middle" scope="row">{index}</th>
            <td className="align-middle">{swimmer.name}</td>
            <td className="align-middle">{swimmer.result}</td>
            <td className="text-right"><button className="btn btn-primary" onClick={handleInnerClick}>Обновить результат</button></td>
        </tr>
    );
}

export default TableRow;