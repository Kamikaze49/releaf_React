import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import StartCampaign from './components/StartCampaign'
import MyCampaigns from './components/MyCampaigns'
import Joined from './components/Joined'
import Login from './components/Login'
import Home from './components/Home'
import Footer from './components/Footer'
import user from './images/user.svg'
import pen from './images/pen.svg'
import search from './images/search.svg'
import icon from './images/icon.svg'
import login from './images/login.svg'
import logout from './images/logout.svg'
import * as firebase from 'firebase'
import "firebase/auth";
import CampaignView from './components/CampaignView'
import $ from 'jquery'
import ScrollToTop from './components/ScrollToTop'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:"",
      email:"",
      photoURL:false,
      emailVerified:"",
      uid:"",
      isLoggedIn: false,
      campaigns:[],
      searchVal:""
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onInput = this.onInput.bind(this);
    this.value = this.value.bind(this);

  }

  componentDidMount(){
    this.db = firebase.database();
    this.changeListener();
    
    if(localStorage.getItem('user')){
      let user = JSON.parse(localStorage.getItem('user'));
      this.setState({
        isLoggedIn:true,
        name : user.displayName,
        email : user.email,
        photoUrl : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid
      });
    }
}


changeListener(){
    this.db.ref('campaigns').on('child_added',snap=>{
        let campaign = {
            id: snap.key,
            userID:snap.val().userID,
            name:snap.val().name,
            location:snap.val().location,
            sDate:snap.val().sDate,
            sTime:snap.val().sTime,
            eDate:snap.val().eDate,
            eTime:snap.val().eTime,
            Desc:snap.val().Desc,
            organizer:snap.val().organizer,
            category:snap.val().category,
            bgurl:snap.val().bgurl

        }

        let campaigns = this.state.campaigns;
        campaigns.push(campaign);
        this.setState({
            campaigns:campaigns
        })
    })
}

searchValReset=()=>{
  this.setState({
    searchVal:""
  })
}

value(){
  this.db.ref('campaigns').once('value').then(snap=>{
      let campaign = {
          id: snap.key,
          userID:snap.val().userID,
          name:snap.val().name,
          location:snap.val().location,
          sDate:snap.val().sDate,
          sTime:snap.val().sTime,
          eDate:snap.val().eDate,
          eTime:snap.val().eTime,
          Desc:snap.val().Desc,
          organizer:snap.val().organizer,
          category:snap.val().category,
          bgurl:snap.val().bgurl

      }

      let campaigns = this.state.campaigns;
      campaigns.push(campaign);
      this.setState({
          campaigns:campaigns
      })
  })
}



  login(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(googleAuthProvider).then((result)=> {
      var token = result.credential.accessToken;
      var user = result.user;

      this.setState({
        name : user.displayName,
        email : user.email,
        photoUrl : user.photoURL,
        emailVerified : user.emailVerified,
        uid : user.uid,
        isLoggedIn:true
      }) 
      return user;
    }).then(  firebase.auth().onAuthStateChanged(user => {
      user
        ? localStorage.setItem('user', JSON.stringify(user))
        : localStorage.removeItem('user')
    })
    )
    }

    loginWithEmailPassword=(email,password)=>{
      firebase.auth().signInWithEmailAndPassword(email, password).then((result)=> {
        //var token = result.credential.accessToken;
        var user = result.user;
        var myUser;
        // console.log(user);
        firebase.database().ref("users").orderByChild("user").equalTo(user.uid).on("child_added", (snapshot)=> {
          //let key =snapshot.key;
          let username = snapshot.val().username;

          this.setState({
            name : username,
            email : user.email,
            photoUrl : user.photoURL,
            emailVerified : user.emailVerified,
            uid : user.uid,
            isLoggedIn:true
          })

          myUser = {
            displayName : username,
            email : user.email,
            photoUrl : user.photoURL,
            emailVerified : user.emailVerified,
            uid : user.uid,
          }
          console.log(myUser)
          localStorage.setItem('user', JSON.stringify(myUser))
        });
      //  return myUser;

      })
      // .then(  firebase.auth().onAuthStateChanged(myUser => {
      //   console.log(myUser);
      //   myUser
      //     ? localStorage.setItem('user', JSON.stringify(user))
      //     : localStorage.removeItem('user')

      // })
      // )
      .catch((error)=>{
        return(alert("Invalid Login Credientials"))
      })
      }

    createAccount = (email,password,username)=>{
      if(username!=""&&password!=""&&email!=""){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res)=>{
        if(res.user){
          firebase.database().ref('users').push({
            user:res.user.uid,
            username:username
          })
          alert("Signup successful. Please proceed to login")
        }
      })
    }else return(alert("Something went wrong. Please check your details."))
      }


    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/ '/>
      }
    }

  logout(){
    // firebase.auth.signOut();
    localStorage.removeItem('user');
    this.setState({
        name : "",
        email : "",
        photoUrl : "",
        emailVerified : "",
        uid : "",
        isLoggedIn:false,
    })
    alert("Logged out successfully")
    // this.setRedirect();
  }

  onInput(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}


  render(){
    return (
      <Router>
        <ScrollToTop>
        <div>

            <ul className="navbar">
              <Link to={'/'} id="logodiv">
                <img id="rlficon" src='./rlf.png'/>
                <h5>Releaf</h5>
              </Link>
              {/* <h5 id="snControl">+</h5> */}
              <input id="searchTop" type="search" name="searchVal"  onChange={this.onInput} value={this.state.searchVal} placeholder="Search for Campaigns..."/>
              <div id="searchIcon"><img  src={search} style={{width:"25px"}} onClick={this.search}/></div>
              {
              this.state.isLoggedIn?

              <div className="Navicons">
              <li><Link to={'/'}><div className="licons linkC"><img className="licons" src={icon} style={{width:"16px",margin:"4px 0 0 2px"}} /></div>
                </Link></li>
              <li><Link to={'/StartCampaign'}><div className="linkC"><img src={pen} style={{width:"18px"}} /></div>
              </Link></li> 
              <li><Link to='/Account'>
              <div>
                <div className="linkC avatarDiv">
                  <img className="avatar" src={this.state.photoURL?this.state.photoURL:user} style={{width:"18px"}} />
                </div>
                <p id="aname">{this.state.name}</p>
              </div>
              </Link>
              </li>
              <Link to={'/'}><li onClick={this.logout}><div className="linkC"><img src={logout} style={{width:"17px"}} /></div>
                </li></Link>
              </div>
              :
              <div className="Navicons">
                <li><Link to={'/'}>
                <div className="licons linkC"><img className="licons" src={icon} style={{width:"16px",margin:"4px 0 0 2px"}} /></div>
                </Link></li>
                <li><Link to={'/Login'}>
                <div className="linkC"><img src={login} style={{width:"17px"}} /></div>
                </Link></li> 
              </div>
              }
            </ul>
         
          <Switch>
            <Route exact path = '/' render={(props) => <Home {...props} uid={this.state.uid} campaigns={this.state.campaigns}
                    searchVal={this.state.searchVal} searchValReset={this.searchValReset} />} />

            <Route  path ='/StartCampaign' render={() => <StartCampaign uid={this.state.uid} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route  path ='/MyCampaigns' render={(props) => <MyCampaigns uid={this.state.uid} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route  path ='/Account'  render={(props) => <Joined uid={this.state.uid}  isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route  path ='/Login'  render={(props) => <Login  google={this.login} login={this.loginWithEmailPassword} createAccount={this.createAccount} isLoggedIn={this.state.isLoggedIn}/>}/>
            {
              this.state.campaigns.map(campaign=>(
                <Route path ={`/CampaignView/${campaign.id}`} render={(props) => <CampaignView {...props} uid={this.state.uid} campaign={campaign} login={this.login}/>}/>
              ))
            }{
              this.state.campaigns.map(campaign=>(
                <Route path ={`/Campaign/${campaign.id}/edit`} render={(props) => <StartCampaign {...props} uid={this.state.uid} campaign={campaign} edit={true}/>}/>
              ))
            }
              ))
            }

            
          </Switch>
           <Footer/>
           {this.renderRedirect()}
        </div>
        </ScrollToTop>
      </Router>
    );
  }
}
export default App;
