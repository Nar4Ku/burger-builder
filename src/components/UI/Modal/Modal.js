import React from 'react';

import classes from './Modal.module.scss';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextPros, nextState) {
        return nextPros.show !== this.props.show || nextPros.children !== this.props.children;
    }
   
    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'tranlateY(0)' : 'tranlateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        display: this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;