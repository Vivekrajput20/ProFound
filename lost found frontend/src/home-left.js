import React from 'react';
import { Link } from 'react-router-dom';
export default class HomeLeft extends React.Component {
    render() {
        return (
            <div className="left-panel">
                <a href='/profile'>
                    <div className="left-btn">
                        Profile
                        </div>
                </a>
                <a href='/'>
                <div className="left-btn">
                    Home
                        </div>
            </a>
                <a href='/additem'>
                    <div className="left-btn">
                        Lost Something?
                        </div>
                </a>

            </div>
        )
    }
}