import React from 'react'
import Comments from './Comments.js'
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';

class CampaignView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect:false,
            returnToLogin:false,

        }
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    onRegisterClick(){
        firebase.database().ref("registered").orderByChild("campaign").equalTo(this.props.campaign.id)
        .once("value")
        .then((snap)=>{
            var exists;
            snap.forEach((childSnap)=> {
                if(childSnap.val().user===this.props.uid) return(exists = true)
                else return(exists=false)
                })
            return exists
        }).then((exists)=>{
            if(exists){
                return(alert("You have already registered for this campaign"))
            }else{
                const DB = firebase.database().ref("registered");
                DB.push({
                    user:this.props.uid,
                    campaign: this.props.campaign.id
                });
                this.setRedirect();
            }
        })
 
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/Account'/>
        }
        if(this.state.returnToLogin){
            return <Redirect to='/Login'/>
        }
      }




    render(){
        return(
            <div className="CampaignView">
                <div className="cvheader" style={{background:`url(${this.props.campaign.bgurl}) center center no-repeat`, backgroundSize:'cover'}}>
                    <button className="btn btn-success float-right rbtn" onClick={
                        this.props.uid!=""?this.onRegisterClick:()=>{
                                this.setState({returnToLogin:true})
                                alert("Please Login to register for Campaigns")
                                }}>Register</button>
                    <h2>{this.props.campaign.name}</h2>
                </div>
                <div className="container">
                    <h4 style={{margin:'20px 0 0 20px'}}>Category: {this.props.campaign.category}</h4>
                    <div className="row d-flex justify-content-center">
                    <div className="cvdesc col-md-10 text-justify col-md-offset-1">
                        {this.props.campaign.Desc}                   
                    </div>
                    </div>

                    <div className="cvrow row">
                        <div className="col-md-6">
                            <h6>Starts:</h6>
                            <p><i>{this.props.campaign.sDate}</i></p>
                            <p><i>{this.props.campaign.sTime}</i></p>
                        </div>
                        <div className="col-md-6">
                            <h6>Ends:</h6>
                            <p><i>{this.props.campaign.eDate}</i></p>
                            <p><i>{this.props.campaign.eTime}</i></p>
                        </div>    
                    </div>

                    <div className="cvrow row">
                        <div className="col-md-6">
                            <h6>Location:</h6>
                            <p><i>{this.props.campaign.location}</i></p>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
                {/* <Comments/> */}
            </div>
        );
    }

}

export default CampaignView