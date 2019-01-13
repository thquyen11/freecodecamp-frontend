import * as React from "react";



interface IButton{
    value: string,
    id: string,
    className?: string,
    onClick?: any,
}

export const Button: React.FunctionComponent<IButton> = (props: IButton) =>{

        if(props.className){
            return <input type="button" className={props.className} value={props.value} id={props.id} style={{height: '4rem',}} onClick={props.onClick}></input>
        } else{
            return <input type="button" className="btn btn-secondary col-3" value={props.value} id={props.id} onClick={props.onClick}></input>
        }
}