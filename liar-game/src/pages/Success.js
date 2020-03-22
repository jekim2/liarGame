import React, { Component } from 'react';

class Success extends Component {

    constructor(props) {
        super(props);
        console.log('props >>> ' , props.location.state);
    }

    render() {
        return (
            <div className="lg_container01">
                <p className="lg_title01">라이어 : <span>3</span>번째 순서</p>
                <p className="lg_title01 font20">( 스파이 : <span>2</span>번째 순서 )</p>
                <div className="lg_box01">
                    <span>제시어</span>
                    <p>망고</p>
                </div>
                <div className="lg_box01">
                    <span>선택한 단어</span>
                    <p>{ this.props.location.state }</p>
                </div>
            </div>
        );
    }
}

export default Success;