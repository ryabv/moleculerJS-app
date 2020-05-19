import React from 'react';
import './ModalResult.scss';
import { ISwimmer } from '../Table/Table';

interface IProps {
    swimmer: ISwimmer;
    show: boolean;
    setShow: (show: boolean) => void;
}

function ModalResult({ swimmer, show = false, setShow }: IProps) {

    const handleClick = function() {
        setShow(false);
    };

    return (
        <div className={show ? "modal fade show modal_show" : "modal fade"} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{`Обновление результата для ${swimmer.name}`}</h5>
                        <button onClick={handleClick} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="/update-result">
                            <input type="hidden" name="swimmer_id" value={swimmer.id}/>
                            <div className="form-group">
                                <label htmlFor="addResult">Добавить результат</label>
                                <input type="number" className="form-control" id="addResult" />
                            </div>
                            <button className="btn btn-primary" type="submit">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalResult;