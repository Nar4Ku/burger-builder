import React from 'react';

import classes from './Modal.module.scss';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'tranlateY(0)' : 'tranlateY(-100vh)',
                    display: props.show ? 'block' : 'none'
                }}>
                {props.children}
            </div>
        </Auxiliary>
    );
}

export default React.memo(
    modal,
    (prevProps, nextPros) =>
        nextPros.show === prevProps.show &&
        nextPros.children === prevProps.children
);