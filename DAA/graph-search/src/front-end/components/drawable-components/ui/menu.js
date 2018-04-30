import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuBar extends Component {
    render() {
        return (
          
            <ul className="list-inline bg-light pl-5 mx-auto " style={{overflowX:"auto",whiteSpace:"nowrap"}}>
            
            <li className=" list-inline-item" style={{display:'inline-block',float:'none'}}>
              <a className="nav-link text-dark " href="#">File</a>
            </li>
            <li className=" list-inline-item" style={{display:'inline-block',float:'none'}}>
              <a className="nav-link text-dark " href="#">Save</a>
            </li>
            <li className=" list-inline-item" style={{display:'inline-block',float:'none'}}>
              <a className="nav-link text-dark " href="#">Redo</a>
            </li>
            <li className=" list-inline-item" style={{display:'inline-block',float:'none'}}>
              <a className="nav-link text-dark " href="#">Undo</a>
            </li>
            
            
          </ul>
          
          
        );
    }
}

MenuBar.propTypes = {

};

export default MenuBar;