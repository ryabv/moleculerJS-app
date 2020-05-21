import React, { createRef, FormEvent } from 'react';
import './ModalResult.scss';
import { ISwimmer } from '../Table/Table';
import { updateSwimmer } from '../../api';

interface IProps {
    swimmer: ISwimmer;
    show: boolean;
    setShow: (show: boolean) => void;
}

function ModalResult({ swimmer, show = false, setShow }: IProps) {
    const input = createRef<HTMLInputElement>();

    const handleClick = function() {
        setShow(false);
    };

    const handleSubmit = function(e: FormEvent) {
        e.preventDefault();
        const params = {
            swimmer_id: swimmer._id,
            result: input.current?.value,
        };

        setShow(false);
        updateSwimmer(params);
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
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="swimmer_id" value={swimmer._id}/>
                            <div className="form-group">        
                                <label htmlFor="addResult">Добавить результат</label>
                                <input ref={input} type="number" className="form-control" name="result" id="addResult" />
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