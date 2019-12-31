import React from 'react'

class Comments extends React.Component{

    render(){
        return(
        <div className="row bootstrap snippets">
            <div className="col-md-8 col-md-offset-2 col-sm-12">
                <div className="comment-wrapper">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            Comment panel
                        </div>
                        <div className="panel-body">
                            <textarea className="form-control" placeholder="write a comment..." rows="3"></textarea>
                            <br/>
                            <button type="button" class="btn btn-info pull">Post</button>
                            <div className="clearfix"></div>
                            <hr/>
                            <ul className="media-list">
                                <li className="media">
                                    <a href="#" className="pull-left">
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle"/>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right">
                                            <small className="text-muted">30 min ago</small>
                                        </span>
                                        <strong className="text-success">@MartinoMont</strong>
                                        <p className="text-left">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                                        </p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="#" className="pull-left">
                                        <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle"/>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right">
                                            <small className="text-muted">30 min ago</small>
                                        </span>
                                        <strong className="text-success">@LaurenceCorreil</strong>
                                        <p className="text-left">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Lorem ipsum dolor <a href="#">#ipsumdolor </a>adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                                <li className="media">
                                    <a href="#" className="pull-left">
                                        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle"/>
                                    </a>
                                    <div className="media-body">
                                        <span className="text-muted pull-right">
                                            <small className="text-muted">30 min ago</small>
                                        </span>
                                        <strong className="text-success">@JohnNida</strong>
                                        <p className="text-left">
                                            Lorem ipsum dolor <a href="#">#sitamet</a> sit amet, consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}

export default Comments