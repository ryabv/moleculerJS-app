import React from 'react';
import TableRow from '../TableRow/TableRow';

export type ISwimmer = {
    _id: string;
    name: string;
    result: number;
    position?: number;
};

interface IProps {
    swimmers: ISwimmer[];
    modalResultClick: (swimmer: ISwimmer) => void;
    modalNewSwimmerClick: () => void;
    className: string;
}

function Table({ swimmers, className, modalResultClick, modalNewSwimmerClick }: IProps) {
    console.log(swimmers);
    function getSwimmers() {
        const rows: React.ReactNode[] = [];

        swimmers.forEach((swimmer, i) => {
            rows.push(
                <TableRow
                    key={i}
                    handleClick={modalResultClick}
                    swimmer={swimmer}
                    index={i + 1}
                />
            );
        });

        return rows;
    }

    return (
        <table className={`table ${className}`}>
            <thead>
                <tr>
                    <th className="align-middle" scope="col">#</th>
                    <th className="align-middle" scope="col">Имя</th>
                    <th className="align-middle" scope="col">Результат</th>
                    <th className="text-right" scope="col"><button onClick={modalNewSwimmerClick} className="btn btn-success">Добавить спортсмена</button></th>
                </tr>
            </thead>
            <tbody>
                {getSwimmers()}
            </tbody>
        </table>
    );
}

export default Table;