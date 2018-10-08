import React from 'react';
import { Link } from 'react-router-dom';
export default class HomeLeft extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <Link to='/profile'>
                    <div className="left-btn">
                        Profile
                        </div>
                </Link>
                <Link to='/'>
                <div className="left-btn">
                    Home
                        </div>
            </Link>
                <Link to='/additem'>
                    <div className="left-btn">
                        Lost Something?
                        </div>
                </Link>

            </div>
        )
    }
}