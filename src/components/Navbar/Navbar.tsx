import * as React from 'react';
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
require('dotenv').config();

interface Props {
  isSignedIn: boolean,
  user: any,
  openProfile: any,
  updateProfile: any
}

export class Navbar extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }

  private onProfileRequest = () => {
    const id: string = window.localStorage.getItem('userId');
    const token: string = window.localStorage.getItem('token');
    console.log(id);
    console.log(token);
    fetch('http://localhost:3001/api/fcc-projects/profile/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then((resp: any) => resp.json())
      .then((data: any) => {
        if (data.sucess === 'true') {
          this.props.openProfile();
          this.props.updateProfile(()=>{ data.userId, data.userName });
          return <Redirect to="/fcc-projects/profile" />
        } else {
          alert('Please sign in first');
          return <Redirect to="/fcc-projects/signin" />
        }
      })
      .catch((err: any) => console.log(err));
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id="navbar">
        <Link to="/"><a className="navbar-brand" href="">Home</a></Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
              FCC Projects
                </a>
            <div className="dropdown-menu">
              <Link to="/fcc-projects/quote-machine"><a className="dropdown-item" href="">Random Quote Machine</a></Link>
              <Link to="/fcc-projects/markdown-previewer"><a className="dropdown-item" href="">Markdown Previewer</a></Link>
              <Link to="/fcc-projects/drum-machine"><a className="dropdown-item" href="">Drum Machine</a></Link>
              <Link to="/fcc-projects/javascript-calculator"><a className="dropdown-item" href="">Calculator</a></Link>
              <Link to="/fcc-projects/pomodoro-clock"><a className="dropdown-item" href="">Promodo Clock</a></Link>
            </div>
          </li>
        </ul>
        <div className="navbar-nav">
          {this.props.isSignedIn ?
            <div>
              <div className="nav-item mr-4" style={{ display: 'inline-block', color: 'white' }}><p>Welcome Back {this.props.user.userName}</p></div>
              <button type="button" onClick={() => this.onProfileRequest()}>Profile</button>
              <button type="button">Signout</button>
            </div> :
            <div>
              <Link to="/fcc-projects/signin"><button type="button">Sign In</button></Link>
              <Link to="/fcc-projects/register"><button type="button">Register</button></Link>
            </div>
          }
        </div>
      </nav>
    )
  }
}

