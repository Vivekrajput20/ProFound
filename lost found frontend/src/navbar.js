import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
  state = {}
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <div className="nav-left">ProFound</div>
        </Link>
        <button className="nav-right" onClick={this.props.logout}>Logout</button>
      </div>
    )
  }
}