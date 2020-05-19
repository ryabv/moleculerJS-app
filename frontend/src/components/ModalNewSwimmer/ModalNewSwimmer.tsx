import React from 'react';
import './ModalNewSwimmer.scss';

interface IProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

function ModalNewSwimmer({ show = false, setShow }: IProps) {

    const handleClick = function() {
        setShow(false);
    };

    return (
        <div className={show ? "modal fade show modal_show" : "modal fade"} role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Добавление нового пловца</h5>
                        <button onClick={handleClick} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form action="/add-swimmer">
                            <div className="form-group">
                                <label htmlFor="addSwimmer">Добавить нового пловца</label>
                                <input type="text" className="form-control" id="addSwimmer" />
                            </div>
                            <button className="btn btn-primary" type="submit">Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNewSwimmer;