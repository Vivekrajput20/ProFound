import React from 'react';
import { serverurl ,apikey } from "./config"
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
var axios = require('axios');
class Addi extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {
                location: {
                    lat: 0, lng: 0
                }
            },
            currentLocation: {
                lat: 0,
                lng: 0
            },
            objectLocation: {
                lat: 0,
                lng: 0
            },
            itemname: '',
            details: '',
            radius: '',
            success:''
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let url = serverurl + '/lostfound/item/';
        let name = this.state.itemname;
        let detail = this.state.details;
        let radius = this.state.radius;
        let user = this.props.user.id;
        let lat = this.state.fields.location.lat()
        let long = this.state.fields.location.lng()
        axios({
            method: 'post',
            url: url,
            headers: { 'Authorization': 'Token ' + this.props.token },
            data: {
                name: name,
                details: detail,
                radius: radius,
                username: user,
                lat: lat,
                long: long 
            }
        })
            .then((response) => {
                this.setState({
                    success:"Item Added Successfully"
                })
            })
            .catch((error) => {
            });
    };
    async componentDidMount() {
        const { lat, lng } = await this.getcurrentLocation();
        this.setState(prev => ({
            fields: {
                ...prev.fields,
                location: {
                    lat,
                    lng
                }
            },
            currentLocation: {
                lat,
                lng
            }
        }));
    }

    getcurrentLocation() {
        if (navigator && navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    resolve({
                        lat: coords.latitude,
                        lng: coords.longitude
                    });
                });
            });
        }
        return {
            lat: 0,
            lng: 0
        };
    }
    addMarker = (location, map) => {
        this.setState(prev => ({
            fields: {
                ...prev.fields,
                location
            },
            objectLocation: {
                ...prev.fields,
                location
            }
        }));
        map.panTo(location);
    };

    render() {

        return (

            <div className='map'>
                <div className="add-item-head">
                    Add a lost Item!
                </div>
                <form className="add-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="element-label">Name</label>
                        <input name="itemname" type="text" onChange={(e) => this.handleChange(e)} placeholder="Name of lost item" className="form-element" />
                    </div>
                    <div className="form-group">
                        <label className="element-label">Details</label>
                        <input name="details" type="text" onChange={(e) => this.handleChange(e)} placeholder="Details of lost item" className="form-element" />
                    </div>
                    <div className="form-group">
                        <label className="element-label">Surrounding Radius</label>
                        <div>
                        <input name="radius" type="text" onChange={(e) => this.handleChange(e)} placeholder="Radius you want to search" className="form-element" />
                        <span className="element-detail">(in meters)</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="element-label ele-l">Mark Location on map</label>
                    </div>
                        <div className="form-map" style={{
                            width: "350px",
                            height: "200px",
                            position: "relative",
                        }}>
                            <Map
                                google={this.props.google}
                                style={{
                                    width: "350px",
                                    height: "200px",
                                }}
                                initialCenter={this.state.fields.location}
                                center={this.state.fields.location}
                                zoom={20}
                                onClick={(t, map, c) => this.addMarker(c.latLng, map)}
                            >
                                <Marker position={this.state.fields.location} />

                            </Map>
                        </div>
                    
                    <button type='submit' className="item-submit">Add Item</button>
                    {this.state.success? <div className="success-box">{this.state.success}</div>
                    :null}

                </form>


            </div>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: (apikey)
})(Addi)