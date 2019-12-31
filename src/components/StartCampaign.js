import React from 'react';
import * as firebase from 'firebase';
import {Redirect} from 'react-router-dom';


class StartCampaign extends React.Component{
    constructor(props){
        super(props)

        this.onInput = this.onInput.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onImg = this.onImg.bind(this)
        this.onEdit = this.onEdit.bind(this);

        this.state = {
            userID:this.props.uid,
            name:"",
            location:"",
            sDate:"",
            sTime:"",
            eDate:"",
            eTime:"",
            organizer:"",
            Desc:"",
            category:"",
            bgurl:"",
            redirect:false
        }

        this.setRef = ref=>{
            this.file = ref;
        }
    }
    onCheck=()=>{
        if(
        this.state.name!==""&&
        this.state.location!==""&&
        this.state.sDate!==""&&
        this.state.sTime!==""&&
        this.state.eDate!==""&&
        this.state.eTime!==""&&
        this.state.organizer!==""&&
        this.state.Desc!==""&&
        this.state.category!==""&&
        this.state.bgurl!=="")
            return true
        else return false
    }

    componentDidMount(){
        if(!this.props.uid){
            console.log("Hacked")
        this.setState({
            homeRedirect:true
        })
        }
        if(this.props.edit){
            this.setState({
                name:this.props.campaign.name,
                location:this.props.campaign.location,
                sDate:this.props.campaign.sDate,
                sTime:this.props.campaign.sTime,
                eDate:this.props.campaign.eDate,
                eTime:this.props.campaign.eTime,
                organizer:this.props.campaign.organizer,
                Desc:this.props.campaign.Desc,
                category:this.props.campaign.category,
                bgurl:this.props.campaign.bgurl
            })
        }
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/MyCampaigns'/>
        }
        if(this.state.homeRedirect){
            return <Redirect to='/'/>
        }
      }

    onInput(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    onSubmit(){
        const DB = firebase.database().ref("campaigns");
        if(this.state.name!==""&&
        this.state.location!==""&&
        this.state.sDate!==""&&
        this.state.sTime!==""&&
        this.state.eDate!==""&&
        this.state.eTime!==""&&
        this.state.organizer!==""&&
        this.state.Desc!==""&&
        this.state.category!==""&&
        this.state.bgurl!==""){
        DB.push({
            userID:this.state.userID,
            name:this.state.name,
            location:this.state.location,
            sDate:this.state.sDate,
            sTime:this.state.sTime,
            eDate:this.state.eDate,
            eTime:this.state.eTime,
            organizer:this.state.organizer,
            Desc:this.state.Desc,
            category:this.state.category,
            bgurl:this.state.bgurl
       });
       this.setRedirect();
    }else alert("Please fill out all fields")

    }

    onImg(){
        // const DB = firebase.database().ref("campaigns");
        const file = this.file.files[0];
        const storageRef = firebase.storage().ref();
        const img = storageRef.child(this.file.files[0].name);
        img.put(file).then((snapshot)=>{
           return snapshot.ref.getDownloadURL()})
            .then((url)=>{
                this.setState({
                    bgurl:url
                })
            })
    }

    onEdit(){
        if(this.state.name!==""&&
        this.state.location!==""&&
        this.state.sDate!==""&&
        this.state.sTime!==""&&
        this.state.eDate!==""&&
        this.state.eTime!==""&&
        this.state.organizer!==""&&
        this.state.Desc!==""&&
        this.state.category!==""&&
        this.state.bgurl!==""){
        firebase.database().ref(`campaigns/${this.props.campaign.id}`).set({
            userID:this.state.userID,
            name:this.state.name,
            location:this.state.location,
            sDate:this.state.sDate,
            sTime:this.state.sTime,
            eDate:this.state.eDate,
            eTime:this.state.eTime,
            organizer:this.state.organizer,
            Desc:this.state.Desc,
            category:this.state.category,
            bgurl:this.state.bgurl
        })
        this.setRedirect();
    }else alert("Please fill out all fields")

    }
    
    render(){
        return(
            <div className="container StartCampaign">{
                !this.props.edit?
                <h2>Start An Environment Protection Campaign</h2>:<h2>Edit Your Campaign</h2>
            }
                <hr/>
                <div className="FormDiv">
                    <div className="field">
                        <label htmlFor="eventName">Campaign Title</label><br/>
                        <input type="text" name="name" id="eventName" onChange = {this.onInput} value={this.state.name} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="eventLoc">Campaign Location</label><br/>
                        <input type="text" name="location" id="eventLoc"   onChange = {this.onInput} value={this.state.location} required/>
                    </div>
                    <div className="timing">
                        <label htmlFor="starts">Starts:</label>
                        <small>Date:</small>
                        <input type="date" name="sDate" id="starts" onChange = {this.onInput} value={this.state.sDate} required/><br/>
                        <small>Time:</small>
                        <input type="time" name="sTime" id="stime" onChange = {this.onInput} value={this.state.sTime} required/><br/>
                        <label htmlFor="ends">Ends: </label>
                        <small>Date:</small>
                        <input type="date" name="eDate" id="ends"  onChange = {this.onInput} value={this.state.eDate} required/><br/>
                        <small>Time:</small>
                        <input type="time" name="eTime" id="etime"  onChange = {this.onInput} value={this.state.eTime} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="org">Organizer</label><br/>
                        <input type="text" id="org" name="organizer" onChange = {this.onInput} value={this.state.organizer} required/>
                    </div>
                    <div className="field">
                        <label htmlFor="desc" style={{margin:"50px 0 10px 0"}}>Description </label><br/>
                        <textarea id="desc" rows="10" cols="50" name="Desc" onChange = {this.onInput} value={this.state.Desc} required > 
                        </textarea>
                    </div>
                    <div className="field">
                        <label htmlFor="cat">Category</label><br/>
                        <select id="cat" required name="category" onChange = {this.onInput} value={this.state.category} required>
                            <option>-:-</option>
                            <option value="Sanitation" >Sanitation</option>
                            <option value="Collaboration Activity" >Collaboration Activity</option>
                            <option value="Conference" >Conference</option>
                            <option value="Parade" >Parade</option>
                            <option value="Forestry">Forestry</option>
                            <option value="Wildlife" >Wildlife</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    </div>
                    <div className="my-img" style={{border:"1px solid #CCC",background:`url(${this.state.bgurl}) center center`}}>
                       
                    </div>
                    <div style={{width:"375px"}}><input className="finput" type ="file" ref={this.setRef} onChange={this.onImg} required style={{height:"32px",margin:"0",padding:"0",background:"#fff"}}/></div>
                    </div>
                </div>
                <hr/>
                    <h2 id="abs">Nice Job. Now you can post your Campaign to the public</h2>
                    {this.renderRedirect()}
                    <input className="btn" id="submit" type="submit" value="Post" onClick={this.props.edit?this.onEdit:this.onSubmit}/>
            </div>
        )
    }

}

export default StartCampaign