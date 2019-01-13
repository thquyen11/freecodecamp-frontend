import * as React from 'react';

interface Props{
    profile: any;
    closeProfile: any;
}

export class Profile extends React.Component<Props>{
    constructor(props:Props){
        super(props)
    }

    private closeProfile=(event:any)=>{
        event.preventDefault();
        this.props.closeProfile();
    }

    render(){
        return(
            <div id="wrapper-profile" className="container col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userName">{this.props.profile.userId}</label>
                        {/* <h5 className="form-control" id="userId" aria-describedby="help-tip">{this.props.profile.userId}</h5>
                        <small id="help-tip" className="form-text text-muted">We'll never share your user name with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">{this.props.profile.userName}</label>
                        {/* <h5 className="form-control" id="userName">{this.props.profile.userName}</h5> */}
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(event:any) => this.closeProfile(event)}>Close</button>
                </form>
            </div>
        )
    }
}