import * as React from "react";
import { connect } from "react-redux";
import { DrumPad } from "../../components/Drum/DrumPad";
import { updateClipId } from "./aDrum";
import "./cDrum.scss";



interface StateProps{
    clipId:string
}

const mapStateToProps=(state:any): StateProps =>{
    return{
        clipId: state.Drum.clipId,
    }
}

interface DispatchProps{
    updateClipId: typeof updateClipId,
}

const mapDispatchToProps=(dispatch:any):DispatchProps =>{
    return{
        updateClipId: (clipId)=> dispatch(updateClipId(clipId)),
    }
}

interface IDrum extends StateProps, DispatchProps{

}

class Drum extends React.Component<IDrum>{
    constructor(props:IDrum){
        super(props);
    }

    render(){
        const listKeys = [
            {
                id: "Q",
                keyCode: 81,
                clipId: 'Heater-1',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
            },
            {
                id: "W",
                keyCode: 87,
                clipId: 'Heater-2',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
            },
            {
                id: "E",
                keyCode: 69,
                clipId: 'Heater-3',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
            },
            {
                id: "A",
                keyCode: 65,
                clipId: 'Heater-4',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
            },
            {
                id: "S",
                keyCode: 83,
                clipId: 'Clap',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
            },
            {
                id: "D",
                keyCode: 68,
                clipId: 'Open-HH',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
            },
            {
                id: "Z",
                keyCode: 90,
                clipId: "Kick-n'-Hatt",
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
            },
            {
                id: "X",
                keyCode: 88,
                clipId: 'Kick',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
            },
            {
                id: "C",
                keyCode: 67,
                clipId: 'Closed-HH',
                audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
            },
        ]

        const listDrumPad = listKeys.map((key, index)=>{
            return(
                <DrumPad id={key.id} keyCode={key.keyCode} audioSrc={key.audio} clipId={key.clipId} updateClipId={this.props.updateClipId}/>
            )
        })
    
        return(
            <div className="container" id="page-wrapper-drum">
                <div className="container text-center" id="display">{this.props.clipId}</div>
                <div className="row justify-content-center mx-auto" id="drum-machine" style={{ width:"20rem", }}>
                    {listDrumPad}
                </div>
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drum);