import React from 'react';
import { serverurl } from "./config"
var axios = require('axios');

export default class Trusted extends React.Component {

    render() {
        return (
            <div className="trusted">
                <div className="trusted-head">
                    Add Trusted Users
                </div>
                {this.props.users.map(x => {
                    return (
                        <div className="t-user" key={x.id}>
                            <button onClick={(e) => {
                                axios({
                                    method: 'patch',
                                    url: serverurl + "/lostfound/usr/" + this.props.user.id + "/",
                                    headers: { 'Authorization': 'Token ' + this.props.token },
                                    data: {
                                        users: [...this.props.cusrs, x.id],
                                    }
                                })
                                    .then((response) => {
                                        this.props.getUser(this.props.token)
                                        this.props.getAllUser()
                                    })
                                    .catch((error)=>{
                                    });
                            }} className="t-username">Add {x.username}</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}