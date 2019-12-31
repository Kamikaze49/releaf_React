import React from 'react';
import Campaign from './Campaign'
import {Link, Redirect} from 'react-router-dom'
import * as firebase from 'firebase'

class MyCampaigns extends React.Component{
    constructor(props){
        super(props)
        this.myCampaigns = this.myCampaigns.bind(this)
        this.delete = this.delete.bind(this)
        this.state={
            campaigns:[]
        }
    }

    componentDidMount(){
        if(!this.props.uid){
            this.setRedirect()
        }
        this.db = firebase.database();
        this.myCampaigns();
    }
    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/'/>
        }
      }
    
    myCampaigns(){
        this.db.ref("campaigns").orderByChild("userID").equalTo(this.props.uid).on("child_added", (snap)=> {

            firebase.database().ref("registered").orderByChild("campaign").equalTo(snap.key)
            .once("value")
            .then((snapshot)=>{
                var a = snapshot.numChildren();
                return a;
            }).then((num)=>{
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
                    category:snap.val().category,
                    bgurl:snap.val().bgurl,
                    regNum: num
    
                }
                let campaigns = this.state.campaigns;
                campaigns.push(campaign);
                this.setState({
                    campaigns:campaigns
                })
            })
          });

    }

    delete(e){
        firebase.database().ref(`campaigns/${e.target.id}`).remove();
        let campaigns = this.state.campaigns;
        campaigns = campaigns.filter((campaign)=>{
            return campaign.id !==e.target.id;
        })
        this.setState({
            campaigns:campaigns
        })
        // firebase.database().ref("registered").orderByChild("campaign").equalTo(e.target.id).remove();
        firebase.database().ref("registered").orderByChild("campaign").equalTo(e.id).on("child_added", (snap)=> {
            let key = snap.key;
            //console.log("Key:" +key);
            firebase.database().ref(`registered/${key}`).remove();
 
           })
        alert("Campaign Deleted Successfully");
     }


    render(){
        return(
            <div>
                <div className= "AccountDiv">
                    <ul>
                    <li><Link to={'/Account'}>
                    <p>Joined</p>
                    </Link></li>
                    <li><Link to={'/MyCampaigns'}>
                    <p>My Campaigns</p>
                    </Link></li>
                    </ul>
                </div>
            <div className = "container MyCampaigns">
                <h2>My Campaigns</h2>
                <hr/>
                <div className="CampaignBox">
                {
                       this.state.campaigns.map(campaign=>(
                        <Campaign
                        date = {campaign.sDate}
                        name = {campaign.name}
                        num = {campaign.regNum}
                        location = {campaign.location}
                        category ={campaign.category}
                        bg = {campaign.bgurl}
                        uid = {this.props.uid}
                        id = {campaign.id}
                        edit = {true}
                        delete = {true}
                        ondelete = {this.delete}
                        />
                       ))
                   }
                </div>
                </div>
                {this.renderRedirect()}
            </div>
        )
    }

}

export default MyCampaigns