import React, { Component } from 'react';

class Rectangle extends Component {
    render() {
        const {mode,pos,height} = this.props;
        
        let color = this.selectColor(mode);
        return (
            <g>
                <rect width="10" height={height*5+5} x={pos*10+10} y={505-height*5 } style={{fill:color,stroke:"black"}} />
            </g>
        );
    }

    selectColor(mode) {
        switch(mode) {
            case 1:
                return "#29b632"
            case 2:
                return "#a32733"
            case 3:
                return "#508dce"
            case 4:
                return "#1e1c1c"
            case 5:
                return "#b229b6"
            case 6:
                return "#b69629"
            default:
                return "#ffffff"
                
            
        }
    }
}

export default Rectangle;