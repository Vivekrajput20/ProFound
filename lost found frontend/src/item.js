import React from 'react';
import { serverurl } from "./config"
var axios = require('axios');
export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj : {},
            usr:{}
        }
    }
    componentDidMount() {
        let url = window.location.href;
        let obj = url.split("/")
        let n = obj.length;
        let objid = obj[n - 1]
        this.getIt(objid)
    }

    getIt = (oid) => {
        let url = serverurl + '/lostfound/i/' + oid +"/"
        axios.get(url)
            .then((response) => {
                this.setState({obj:response.data,
                usr:response.data.username})
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error.response)
            })
    }

    render() {


        return (
            <div className="item-class">
            <div className="item-name">
            {this.state.obj.name}
            </div>
            <div className="item-grp">
                <div className="itm-label">Details</div>
                <div className="item-detail">{this.state.obj.details}</div>
            </div>
            <div className="item-grp">
                <div className="itm-label">Owner</div>
                <div className="item-detail">{this.state.usr.username}</div>
            </div>
            <div className="item-grp">
                <div className="itm-label">Contact</div>
                <div className="item-detail">{this.state.usr.phone}</div>
            </div>
            
            <div className="item-grp">
                <div className="itm-label"></div>
                <div className="item-detail"></div>
            </div>
            <div className="item-grp">
            <img src={this.state.obj.upload} className="img-item" />
            </div>
            
            </div>
        )
    }
}