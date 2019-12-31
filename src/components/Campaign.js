import React from 'react'
import pen from '../images/pen.svg'
import {Link} from 'react-router-dom';


function Campaign(props){

    return(
        <div className="Campaign">
            <div className="CampaignBg" style={{backgroundImage:`url(${props.bg})`}}>
            <div className="camph"> 
                { props.delete&&<button className="ci btn btn-danger" id={props.regKey?props.regKey:props.id} onClick={props.ondelete?props.ondelete:null}>X</button>}
                {props.edit&&
                <Link to={`/Campaign/${props.id}/edit`}><div className="ci cicon btn btn-success">
                <img style={{width:'20px'}} src={pen} />
                </div></Link>}
                {props.num>0?<small>{props.num}</small>:null}
            </div>
            </div>
            <small style={{color:"#137547",margin:"0 10px "}}>{props.date}</small>
            <Link to={`/CampaignView/${props.id}`}><h6 style={{textAlign:"center"}}>{props.name.length>20?props.name.slice(0,20)+"...":props.name}</h6></Link>
            <div style={{float:"left",width:"100%", borderBottom:"1px solid rgba(160,240,80,0.1)"}}>
            <small style={{color:"#137547", margin:"0 10px ",fontSize:"12px"}}>Location:</small><p>{` ${props.location}`}</p>
            </div>
            <small style={{color:"#137547",margin:"0 10px "}}>{` ${props.category}`}</small>        
        </div>
    );
}
export default Campaign