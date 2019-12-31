import React from 'react';
import Campaign from './Campaign'
import SideNav from "./SideNav"
import * as firebase from 'firebase'

class Home extends React.Component{
    constructor(props){
        super(props)

        this.state={
            uid: this.props.uid,
            campaigns:[],
            visible: 25,
            category:"Upcoming Campaigns",
            searchVal:"",
            reset:false
        }
    }
    componentDidUpdate(){
        if(this.props.searchVal!==this.state.searchVal)
            this.search();
    }


    componentDidMount(){
        this.setState({
            campaigns:this.props.campaigns,
        })
        //console.log(this.props.searchVal)

    }

    search(){
        if(this.props.searchVal==""&&this.state.reset){
            this.changeListener()
            this.setState({
                searchVal:this.props.searchVal,
                reset:false
            })
        }else{
            let campaigns = this.state.campaigns;
            campaigns = campaigns.filter((campaign)=>{
                return(
                    campaign.name.includes(this.state.searchVal)||
                    campaign.location.includes(this.state.searchVal)||
                    campaign.category.includes(this.state.searchVal)
                );
            })
        //console.log(this.state.campaigns)
        this.setState({
            campaigns:campaigns,
            searchVal:this.props.searchVal,
            reset:true
        })
    }
    }

    category=(e)=>{
        let campaigns = [];
        firebase.database().ref('campaigns').orderByChild("category").equalTo(e.target.id).on('child_added',snap=>{
          let campaign = {
              id: snap.key,
              userID:snap.val().userID,
              name:snap.val().name,
              location:snap.val().location,
              sDate:snap.val().sDate,
              sTime:snap.val().sTime,
              eDate:snap.val().eDate,
              eTime:snap.val().eTime,
              organizer:snap.val().organizer,
              Desc:snap.val().Desc,
              category:snap.val().category,
              bgurl:snap.val().bgurl
             
          }
    
          campaigns.push(campaign);
          this.setState({
            campaigns:campaigns,
            category:e.target.id
        })  
    
      })
      this.props.searchValReset();
    }

    changeListener=()=>{
        this.setState({
            campaigns:this.props.campaigns,
            category:"Upcoming Campaigns"
        }) 
        this.props.searchValReset();
    }
    loadMore=()=>{
        this.setState((prev) => {
          return {visible: prev.visible + 25};
        });
      }

    

    render(){
        return(
            <div className="HomeDiv">
                <SideNav category={this.category} changeListener={this.changeListener}/>
                <div className="Campaigns">
                
                <div className="jumbo">
                <img src='rlf4.png'/>
                <h3>“Never doubt that a small group of thoughtful, committed citizens can change the world;
                     indeed, it is the only thing that ever has.”<br/><em>—Margaret Mead</em></h3>
                </div>
                <h1>{this.state.category}</h1>
                <div className="Cdiv">
                   
                   {
                       this.state.campaigns.slice(0, this.state.visible).map(campaign=>(
                        <Campaign
                        date = {campaign.sDate}
                        name = {campaign.name}
                        location = {campaign.location}
                        category ={campaign.category}
                        bg = {campaign.bgurl}
                        uid = {this.props.uid}
                        id = {campaign.id}
                        />
                       ))
                   }
                </div>
                {
                    this.state.visible<this.props.campaigns.length&&
                    <button class="btn loadMore" onClick={this.loadMore}>See More</button>
                }
                
                </div>
            </div>
        )
    }

}

export default Home