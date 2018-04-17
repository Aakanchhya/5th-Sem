import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rectangle from '../Components/Rectangle';

function mapStateToProps(state) {
    return {

    };
}

class DrawBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        setInterval(() => {
            let heights = Array(100).fill(1).map((val,index) => val*index);
            let temp = [];
            for (let i = 1; i < 100; i++) {
               temp.push({
                   mode: Math.floor(Math.random()*6),
                   pos: i-1,
                   height: heights.splice( Math.floor(Math.random()* heights.length),1)

                });
            } 
            this.setState({data:temp});
        },100 )
    }
    render() {
        const data =[];
        this.state.data.forEach(val => {
            data.push(
                <Rectangle mode={val.mode} pos={val.pos} height={val.height} />
            ) 
        })
        
        return (
            <svg 
            width="100%" 
            viewBox="0 0 1100 550"
            style={{background:"black"}}
            >
                {data}
            </svg>
        );
    }
}

// export default connect(
//     mapStateToProps,
// )(DrawBoard);
export default DrawBoard;