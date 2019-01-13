import * as React from "react";
import { connect } from "react-redux";
import accurateInterval from "./accurateInterval";
import { onClick, decreaseTimer, dispatchIntervalID, switchTimerType, updateTimer } from "./aClock";
import "./cClock.scss";



interface StateProps{
    runStatus: string,
    sessionLength: number,
    timerType: string,
    breakLength: number,
    intervalID: any,
    timer: number,
}

const mapStateToProps = (state: any):StateProps => {
    return{
        runStatus: state.Clock.runStatus,
        sessionLength: state.Clock.sessionLength,
        timerType: state.Clock.timerType,
        breakLength: state.Clock.breakLength,
        intervalID: state.Clock.intervalID,
        timer: state.Clock.timer,
    }
}

interface DispatchProps{
    onClick: typeof onClick;
    decreaseTimer: typeof decreaseTimer;
    dispatchIntervalID: typeof dispatchIntervalID;
    switchTimerType: typeof switchTimerType;
    updateTimer: typeof updateTimer;
}

const mapDispatchToProps = (dispatch: any):DispatchProps => {
    return{
        onClick: (event, runStatus)=> dispatch(onClick(event, runStatus)),
        decreaseTimer: (time)=> dispatch(decreaseTimer(time)),
        dispatchIntervalID: (intervalID) => dispatch(dispatchIntervalID(intervalID)),
        switchTimerType: (type, length)=> dispatch(switchTimerType(type, length)),
        updateTimer: ()=> dispatch(updateTimer()),
    }
}

interface IClock extends StateProps, DispatchProps{

}

class Calculator extends React.Component<IClock> {
    audioBeep: any;
    constructor(props: IClock){
        super(props);
    }

    render() {
       
        const beginCountdown =()=>{
            let intervalID = accurateInterval(()=>{
                this.props.decreaseTimer(1);
                buzzer(this.props.timer);
                if(this.props.timer<0){
                    timerControl(undefined, 'loop'); //stop interval, beginCountdown()
                    switchTimerType(this.props.timerType);
                }
            }, 1000);
            this.props.dispatchIntervalID(intervalID);
        }

        const buzzer=(timer: number)=> {
            if (timer === 0) {
              this.audioBeep.play();
            }
        }

        const switchTimerType=(type: string)=>{
            if(type==="session"){
                this.props.switchTimerType("break", this.props.breakLength);
            } else{
                this.props.switchTimerType("session", this.props.sessionLength);
            }
        }

        const timerControl=(event: any, loop?: string)=>{
            
            //start/ resume clock
            if(this.props.runStatus!=="running"){
                if(this.props.runStatus==="stop"){  //new start: reset the timer to sessionLength
                    this.props.updateTimer();
                }
                beginCountdown();
                this.props.onClick(event, "running");
            } else{
                //pause clock
                if(this.props.runStatus==="running" && !loop){
                    stopInterval(this.props.intervalID);
                    this.props.onClick(event, "pause");
                } else{
                    //continue new loop (session <-> break)
                    stopInterval(this.props.intervalID);
                    beginCountdown();
                }
            }
            //  else if(event && event.target.id==="reset"){
            //     //reset clock
            //     if(this.props.runStatus==="running") stopInterval(this.props.intervalID);
            //     this.props.onClick(event);
            // }
        }

        const stopInterval=(id: any)=>{
            console.log("stop interval");
            id.cancel();
        }

        const display=()=>{
            const minute:number = Math.floor(this.props.timer/60);
            const second:number = this.props.timer%60;
            return formatTime(minute)+":"+formatTime(second);
        }

        const formatTime=(time: number)=>{
            if(time<10){
                return "0"+time.toString();
            }
            return time.toString();
        }

        const resetClock=(event: any)=>{
            if(this.props.runStatus==="running") stopInterval(this.props.intervalID);
            this.props.onClick(event);
            this.audioBeep.pause();
            this.audioBeep.currentTime=0;
        }

        return (
            <div className="container" id="page-wrapper-clock">
                <div className="container col-md-9">
                    <div className="text-center mb-4"><h1>Pomodoro Clock</h1></div>
                    <div className="row">
                        <div className="container col-6 text-center">
                            <h3 id="break-label">Break Length</h3>
                            <div className="row justify-content-center">
                                <i className="fas fa-arrow-up" id="break-increment" onClick={this.props.onClick}></i>
                                <h4 id="break-length">{this.props.breakLength}</h4>
                                <i className="fas fa-arrow-down" id="break-decrement" onClick={this.props.onClick}></i>
                            </div>
                        </div>
                        <div className="container col-6 text-center">
                            <h3 id="session-label">Session Length</h3>
                            <div className="row justify-content-center">
                                <i className="fas fa-arrow-up" id="session-increment" onClick={this.props.onClick}></i>
                                <h4 id="session-length">{this.props.sessionLength}</h4>
                                <i className="fas fa-arrow-down" id="session-decrement" onClick={this.props.onClick}></i>
                            </div>
                        </div>
                    </div>
                    <div className="container col-9">
                        <div className="text-center">
                            <h4 id="timer-label">{this.props.timerType}</h4>
                            <div className="row justify-content-center" id="time-left">{display()}</div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                            {this.props.runStatus==="running"?
                                    <i id="start_stop" onClick={(event)=>timerControl(event)} className="fas fa-pause"></i>
                                    : <i id="start_stop" onClick={(event)=>timerControl(event)} className="fas fa-play"></i>
                                }
                            <i id="reset" onClick={(event)=>resetClock(event)} className="fas fa-undo-alt ml-4"></i>
                    </div>
                </div>
                <audio id="beep" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }}></audio>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
