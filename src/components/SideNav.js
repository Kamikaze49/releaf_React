import React from 'react'
import $ from 'jquery'
import menu from './menu-button.svg';

class SideNav extends React.Component{
    constructor(props){
        super(props)
        this.state={
            snShow:true
        }

    }

    componentDidMount(){
        $(".snToggle").click(function(){
            $(".snList").animate({
              width: "toggle"
            });
          });
    }

    render(){
        return(
            <div className="SideNav"> 
            <a className="btn snToggle" style={{zIndex:2, position:"fixed",}} onClick={this.snToggle}>
                <img src={menu}/>
            </a>
            <div className="snList">
                <h5>Categories</h5>
              <ul>
                  <li id="Collaboration Activity" onClick={this.props.changeListener}>All</li>
                  <li id="Sanitation" onClick={this.props.category}>Sanitation</li>
                  <li id="Collaboration Activity" onClick={this.props.category}>Collaboration Activity</li>
                  <li id="Conference" onClick={this.props.category}>Conference</li>
                  <li id="Parade" onClick={this.props.category}>Parade</li>
                  <li id="Forestry" onClick={this.props.category}>Forestry</li>
                  <li id="Wildlife" onClick={this.props.category}>Wildlife</li>
              </ul>
            </div>  
          </div>
        )
    }
}

export default SideNav