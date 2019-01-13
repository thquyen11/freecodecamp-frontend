import * as React from "react";



interface IDrumPad{
    id: string,
    keyCode: number,
    audioSrc:string,
    clipId:string,
    updateClipId:any,
}

export class DrumPad extends React.Component<IDrumPad>{
    constructor(props:IDrumPad){
        super(props);
    }

    private playSound=(node:any)=>{
        const sound = node.childNodes[1];
        sound.currentTime = 0;
        sound.play();
    }
    
    private playSoundOnClick=(e:any)=>{
        const node = e.target;
        this.playSound(node);
        this.props.updateClipId(this.props.clipId);
    }
    
    private playSoundWhenKeyPress=(e:any)=>{
        if(e.keyCode===this.props.keyCode){
            const node = document.getElementById(this.props.id);
            this.playSound(node);
            this.props.updateClipId(this.props.clipId);
        }
    }

    componentDidMount(){
        document.addEventListener('keypress', this.playSoundWhenKeyPress);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.playSoundWhenKeyPress);
    }

    render(){
        return(
            <div id={this.props.id} className="drum-pad" onClick={this.playSoundOnClick} style={{ width: "6rem", height: "6rem", margin: "5px 5px" }}>
                <h2>{this.props.id}</h2>
                <audio id={this.props.id}  src={this.props.audioSrc} className="clip"></audio>
            </div>
        )
    }
}