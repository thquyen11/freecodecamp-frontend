import * as React from "react";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import QuoteMachine from "../QuoteMachine/cQuoteMachine";
import MarkdownPreviewer from "../MarkdownPreviewer/cMarkdownPreviewer";
import Calculator from "../Calculator/cCalculator";
import Drum from "../Drum/cDrum";
import {BarChart} from "../D3-BarChart/cBarChart";
import {ScatterPlot} from "../D3-ScatterPlot/cScatterPlot";
import {HeatMap} from "../D3-HeatMap/cHeatMap";
import { Choropleth } from 'containers/D3-ChoroplethMap/cChoropleth';
import { Navbar } from "../../components/Navbar/Navbar";
import { SignIn } from '../../components/Authenticate/SignIn';
import { Register } from '../../components/Authenticate/Register';
import { Profile } from '../../components/Authenticate/Profile';
import Clock from "../Clock/cClock";
import { TreeMap } from 'containers/D3-TreeMap/cTreeMap';
import { connect } from "react-redux";
import { onSignedIn, loadUser, onRegistered, openProfile, closeProfile, updateProfile } from './aFCCProjects';
import { Modal } from '../../components/Modal/Modal';

interface StateProps{
  isSignedIn: boolean;
  user: any;
  isRegistered:boolean;
  isProfileOpen: boolean;
  profile:any;
}

const mapStateToProps = (state: any): StateProps => {
  return{
    isSignedIn: state.Authenticate.isSignedIn,
    user: state.Authenticate.user,
    isRegistered: state.Authenticate.isRegistered,  
    isProfileOpen: state.Profile.isProfileOpen,
    profile: state.Profile.profile,
  }
}

interface DispatchProps{
  onSignedIn: typeof onSignedIn;
  loadUser: typeof loadUser;
  onRegistered: typeof onRegistered;
  openProfile: typeof openProfile;
  closeProfile: typeof closeProfile;
  updateProfile: typeof updateProfile;
}

const mapDispatchToProps = (dispatch:any): DispatchProps => {
  return{
    onSignedIn: ()=> dispatch(onSignedIn()),
    loadUser: (user:any)=> dispatch(loadUser(user)),
    onRegistered: ()=> dispatch(onRegistered()),
    openProfile: ()=> dispatch(openProfile()),
    closeProfile: ()=> dispatch(closeProfile()),
    updateProfile: (profile:any)=> dispatch(updateProfile(profile))
  }
}

interface Props extends StateProps, DispatchProps{

}

class FCCProjects extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  //Check if user session already signin?
  componentDidMount(){
    console.log('componentDidMount');
    const token:string = window.localStorage.getItem('token');
    console.log(token);
    if(token){
      fetch('http://localhost:3001/api/exercise/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then((resp:any)=> resp.json())
      .then((data:any)=> {
        if(data.sucess==='true'){
          this.props.loadUser(()=>{ data.userId, data.userName }); //userId + userName
          this.props.onSignedIn();
        }
      })
      .catch((err:any)=> console.log(err));
    }
  }

  render() {
    const listProjects = [
      { id: "quote-machine", name: "Quote Machine", picture: "" },
      { id: "markdown-previewer", name: "Markdown Previewer", picture: "" },
      { id: "drum-machine", name: "Drum Machine", picture: "" },
      { id: "javascript-calculator", name: "Javascript Calculator", picture: "" },
      { id: "pomodoro-clock", name: "Pomodoro Clock", picture: "" },
      { id: "bar-chart", name: "Bar Chart", picture: "" },
      { id: "scatter-plot", name: "Scatter Plot", picture: "" },
      { id: "heat-map", name: "Heat Map", picture: "" },
      { id: "choro-map", name: "Choro Map", picture: "" },
      { id: "tree-map", name: "Tree Map", picture: "" },
    ];

    return (
      <BrowserRouter>
        <Switch>
          { this.props.isProfileOpen && <Modal><Profile profile={this.props.profile} closeProfile={this.props.closeProfile}/></Modal>}
          <div className="container">
            <Navbar isSignedIn={this.props.isSignedIn} user={this.props.user} openProfile={this.props.openProfile} updateProfile={this.props.updateProfile} />
            <div className="row justify-content-center">
              <Route exact path="/" render={() => listProjects.map((project: any, index: number) => {
                  const linkTo = "/fcc-projects/" + project.id;
                  return (
                    <Link to={linkTo} key={index}>
                      <div className="card col-sx-4" style={{ width: "10rem", margin: "2rem 1rem" }}>
                        <img className="card-img-top" src={project.picture} alt="Card image cap"/>
                        <div className="card-body">
                          <h5 className="card-title">{project.name}</h5>
                        </div>
                      </div>
                    </Link>)}
                  )} />
            </div>
            <div className="container">
              <Route exact path="/fcc-projects/quote-machine" component={(QuoteMachine)} />
              <Route exact path="/fcc-projects/markdown-previewer" component={MarkdownPreviewer} />
              <Route exact path="/fcc-projects/drum-machine" component={Drum} />
              <Route exact path="/fcc-projects/javascript-calculator" component={Calculator} />
              <Route exact path="/fcc-projects/pomodoro-clock" component={Clock} />
              <Route exact path="/fcc-projects/bar-chart" component={BarChart} />
              <Route exact path="/fcc-projects/scatter-plot" component={ScatterPlot} />
              <Route exact path="/fcc-projects/heat-map" component={HeatMap} />
              <Route exact path="/fcc-projects/choro-map" component={Choropleth} />
              <Route exact path="/fcc-projects/tree-map" component={TreeMap} />
              <Route exact path='/fcc-projects/signin' render={()=> <SignIn isSignedIn={this.props.isSignedIn} onSignedIn={this.props.onSignedIn}/>} />
              <Route exact path='/fcc-projects/register' render={()=> <Register isRegistered={this.props.isRegistered} onRegistered={this.props.onRegistered} />} />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FCCProjects);