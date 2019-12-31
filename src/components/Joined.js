import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import Campaign from './Campaign'
import firebase from 'firebase'

class Joined extends React.Component{
    constructor(props){
        super(props)
        this.joinedCampaigns=this.joinedCampaigns.bind(this);
        this.delete = this.delete.bind(this);

        this.state={
            campaigns:[]
        }
    }


    componentDidMount(){
        if(!this.props.uid){
            this.setRedirect()
        }
        this.db = firebase.database();
        this.joinedCampaigns();
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

    joinedCampaigns(){
        this.db.ref("registered").orderByChild("user").equalTo(this.props.uid).on("child_added", (snapshot)=> {
            let key =snapshot.key;
            let campaign = snapshot.val().campaign;
            this.db.ref(`campaigns`).child(campaign)
            .once('value')
            .then((snap)=>{
                if(snap.val()!=null){
                let value = {
                    key: key,
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
                    bgurl:snap.val().bgurl
    
                };
                let campaigns = this.state.campaigns;
                campaigns.push(value);

                this.setState({
                    campaigns:campaigns
                })
            }
            });
        
          })

    }

     delete(e){
        firebase.database().ref(`registered/${e.target.id}`).remove();
        let campaigns = this.state.campaigns;
        campaigns = campaigns.filter((campaign)=>{
            return campaign.key != e.target.id;
        })
        this.setState({
            campaigns:campaigns
        })
        alert("Campaign Deleted Successfully")
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
                <div className="container Joined">
                
                <h2>Joined Campaigns</h2>
                <hr/>
                <div className="CampaignBox">
                {
                       this.state.campaigns.map(campaign=>(
                        <Campaign
                        date = {campaign.sDate}
                        name = {campaign.name}
                        location = {campaign.location}
                        category ={campaign.category}
                        bg = {campaign.bgurl}
                        uid = {this.props.uid}
                        id = {campaign.id}
                        regKey = {campaign.key}
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

export default Joined


