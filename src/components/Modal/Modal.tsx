import * as React from 'react';
import * as ReactDom from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component{
    private el: any
    constructor(props:any){
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount(){
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount(){
        modalRoot.removeChild(this.el);
    }

    render(){
        return ReactDom.createPortal(this.props.children, this.el)
    }

}