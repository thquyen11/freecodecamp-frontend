import * as React from 'react';
import { Redirect } from 'react-router';
require('dotenv').config();


interface Props {
    isSignedIn: boolean;
    onSignedIn:any;
}

export class SignIn extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
        }
    }

    private onInputChange = (e: any) => {
        switch (e.target.id) {
            case 'userName':
                this.setState({ userName: e.target.value });
            case 'userPassword':
                this.setState({ userPassword: e.target.value });
        }
    }

    private saveAuthTokenInSessions=(data:any)=>{
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('userId', data.userId);
    }

    private handleSignIn=(event:any, user:any)=>{
        event.preventDefault();

        
        fetch('http://localhost:3001/api/exercise/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: user.userName,
                userPassword: user.userPassword
            })
        })
        .then((res:any)=> res.json())
        .then((data:any)=> {
            console.log(data.sucess);
            if(data && data.sucess==='true'){
                console.log(data.userId);
                this.saveAuthTokenInSessions(data);
                this.props.onSignedIn();
            }else{
                alert('username or password is not correct');
            }
        })
        .catch((err:any)=> console.log(err));
    }

    render() {
        return this.props.isSignedIn ? <Redirect to='/' />
            : <div id="wrapper-signin" className="container col-md-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input onChange={(e) => this.onInputChange(e)} type="text" className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your user name with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input onChange={(e) => this.onInputChange(e)} type="password" className="form-control" id="userPassword" placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSignIn(e, this.state)}>Sign In</button>
                </form>
            </div>
    }
}