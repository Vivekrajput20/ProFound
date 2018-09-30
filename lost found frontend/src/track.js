import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { stat } from 'fs';
export default class Track extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            selectedItem: '',
            location: {
                lat: 0,
                lng: 0
            },
            track: 0,
            id: 0,
            lost: [],
            noti:'',
        };
    }
    componentDidMount() {
    }

    disableTrack = () => {
        clearInterval(this.state.id);
        this.setState({ track: 0, id: 0 });

    }
    getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2, dmax, item) => {

        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        if (d <= dmax) {
            let flag = true;
            if (this.state.lost.length > 0) {
                this.state.lost.map(obj => {
                    if (obj === item) flag = false
                })
                if (flag) {
                    item.username.users.map(usr => {
                        if (this.props.user.id == usr)
                            this.setState({ lost: this.state.lost.concat(item) });
                    })

                }
            }
            else {
                item.username.users.map(usr => {
                    if (this.props.user.id == usr)
                        item["flag"] = false
                        this.setState({ lost: this.state.lost.concat(item) });
                })
            }
        }

    }

    deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude
                let lng = position.coords.longitude
                // console.log("getCurrentPosition Success " + lat + " and " + lng) // logs position correctly
                this.setState({
                    location: {
                        lat: lat,
                        lng: lng
                    }, track: 1
                }, () => {
                    this.props.obj.map(obj => {
                        this.getDistanceFromLatLonInKm(this.state.location.lat, this.state.location.lng,
                            obj.lat, obj.long, obj.radius / 1000, obj
                        );
                    }
                    )
                    let newlost = []
                    this.state.lost.map((item)=>{
                          if(!item.flag){
                             this.sendnotif(item)
                             item.flag=true
                         }
                         newlost.push(item)
                    })
                    // // this.setState({lost:[...newlost]})
                    // console.log(this.state.lost)
                }
                )
            },
            (error) => {
                this.props.displayError("Error dectecting your location");
                console.error(JSON.stringify(error))
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }
    sendnotif = (obj) => {
        var that = this;
        var options = { body: 'Click To View' };
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification(
                "Your friend " + obj.username.username + " has lost " + obj.name + " nearby. Help him find it.", options);
            notification.onclick = (event) => {
                event.preventDefault();
                this.setState({ redirect: true ,
                    noti: obj.id 
                 });
                console.log(this.state.redirect)
            }
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification("Hi there!", options);
                    notification.onclick = function (event) {
                        event.preventDefault();
                        console.log('On CLick');
                        this.setState({ redirect: true });

                    }
                }
            });
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={'/item/'+ this.state.noti + ''} ></Redirect>
        }
        const location = this.state.location
        if (this.state.track === 0)
            return (
                <div className="center-panel">
                    <div className="center-text">
                    Lost something? Fret not! We are here to help you out. Find Your lost items with the assurance that they will be found by someone you trust.
                    <br/><br></br>
                    We need your location permission to help you!
                    </div>
                    <button className="item-submit" onClick={() => {
                        var id = setInterval(this.getLocation, 5000);
                        this.setState({ id: id });
                    }} >Track Location</button>
                </div>
            )
        else {
            return (
                <div className="center-panel">
                <div className="center-text">
                    Lost something? Fret not! We are here to help you out. Find Your lost items with the assurance that they will be found by someone you trust.
                    <br/><br></br>
                    We need your location permission to help you!
                    </div>
                <button className="item-submit" onClick={this.disableTrack}>Stop Tracking</button></div>
            )
        }
    }
}