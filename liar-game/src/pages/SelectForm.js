import React, { Component } from 'react';
// import { SAMPLELIST } from './data';


class SelectForm extends Component {

    state = {
        currentCount : 0,
        isShowSelect : false,
        sampleList : []
    }

    constructor(props) {
        super(props);
        window["SelectForm"] = this;
        console.log('SelectForm >>>>>>>>>>');
        this.timer = this.timer.bind(this);
        this.checkScreen = this.checkScreen.bind(this);
        this.selectInfo = this.selectInfo.bind(this);
    }

    componentDidMount(){                        // 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행
        // const { myKey } = this.props.match.params;
        // console.log("myKey >>> " ,  JSON.stringify(myKey));
        const sampleList = JSON.parse(localStorage.getItem('sampleList'));
        console.log('sampleList >> ' ,  JSON.stringify(sampleList));

        const randomList = [];
        for (var i = 0; i < 25; i ++ ) {
            randomList.push(sampleList[Math.floor(Math.random() * sampleList.length)]);
        }
        var intervalId = setInterval(this.timer, 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId, sampleList : randomList});
    }

    selectInfo (e) {
        console.log('selectInfo >> ' , e.target.innerText);

        this.props.history.push('/success' ,e.target.innerText);
    }
 
 
    // randomItem(a) {
    //     // console.log('randomData >>> ' , a[Math.floor(Math.random() * a.length)]);
    //     let randomList = [];
    //     for (var i = 0; i < 25; i ++ ) {
    //         randomList.push(a[Math.floor(Math.random() * a.length)]);
    //     }
    //     this.setState({'sampleList' : randomList});
    //     // console.log('randomList >> ' , randomList);
    //     // console.log('randomData >> ' , randomList[0]);
    //     return randomList[0];
    // }

    // 이벤트, setTimeout, 외부 라이브러리 인스턴스 제거
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    timer() {
        var newCount = this.state.currentCount - 1;
        if(newCount >= 0) {
            this.setState({ currentCount: newCount });
        } else {
            clearInterval(this.state.intervalId);
        }
    }

    checkScreen() {
        this.setState({ isShowSelect : true });
    }

    createTable = () =>{
        let table = []
        // Outer loop to create parent
        let index = 0;
        for (let i = 0; i < 5; i++) {
            let children = [];
            if (i !== 0) index += 5;
            for (let j = index; j < index + 5; j++) { 
                children.push(<td>{ this.state.sampleList[j] }</td>)
            }
            table.push(<tr>{ children }</tr>)
        }
        return table;
    }

    render() {
        return(
            <div className="lg_container01 lg_container02">
                <div className={"lg_search_wrap " + (!this.state.isShowSelect ? '' : 'lg_none')}>
                    <button className={this.state.currentCount !== 0 ? 'lg_search_loading' : 'lg_none'}></button>
                    <p className={"lg_title02 " + (this.state.currentCount !== 0 ? '' : 'lg_none')}>라이어를 찾아라!!</p>
                    <div className={"lg_title02 lg_new_line " + (this.state.currentCount === 0 ? '' : 'lg_none')}> 시간 초과!! </div>
                    <span>{ this.state.currentCount } 초</span>
                    <p className={"lg_title03 " + (this.state.currentCount === 0 ? '' : 'lg_none')}>※ 제시어를 골라주세요.</p>
                    <div className="lg_btn03">
                        <button onClick={ this.checkScreen }>제시어 고르기</button>
                    </div>
                </div>
                <div className={this.state.isShowSelect ? '' : 'lg_none' }>
                    <p className="lg_title02">라이어는 선택하세요</p>
                    <table>
                        <tbody onClick={this.selectInfo}>
                            { this.createTable() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SelectForm;