import React, { Component } from 'react';


class SelectForm extends Component {

    state = {
        currentCount : 80,
        isShowSelect : false
    }

    constructor(props) {
        super(props);
        window["SelectForm"] = this;
        console.log('SelectForm >>>>>>>>>>');
        this.timer = this.timer.bind(this);
        this.checkScreen = this.checkScreen.bind(this);
    }

    componentDidMount(){
        const { myKey } = this.props.match.params;
        console.log("myKey >>> " ,  JSON.stringify(myKey));
        var intervalId = setInterval(this.timer, 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});

    }

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
                        <tbody>
                            <tr>
                                <td>Lorem</td>
                                <td>Ipsum</td>
                                <td>Dolor</td>
                                <td>test</td>
                                <td>test1</td>
                            </tr>
                            <tr>
                                <td>Lorem</td>
                                <td>Ipsum</td>
                                <td>Dolor</td>
                                <td>test</td>
                                <td>test1</td>
                            </tr>
                            <tr>
                                <td>Lorem</td>
                                <td>Ipsum</td>
                                <td>Dolor</td>
                                <td>test</td>
                                <td>test1</td>
                            </tr>
                            <tr>
                                <td>Lorem</td>
                                <td>Ipsum</td>
                                <td>Dolor</td>
                                <td>test</td>
                                <td>test1</td>
                            </tr>
                            <tr>
                                <td>Lorem</td>
                                <td>Ipsum</td>
                                <td>Dolor</td>
                                <td>test</td>
                                <td>test1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SelectForm;