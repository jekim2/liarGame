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
            // if (i === 0) {
            //     this.state.sampleList.slice(0,)
            // }
            //Inner loop to create children
            for (let j = index; j < index + 5; j++) { 
                children.push(<td>{ this.state.sampleList[j] }</td>)
            }
            //Create the parent and add the children
            table.push(<tr>{ children }</tr>)
        }
        return table;
    }

    render() {
        // const SampleComponent = (endIndex) => {

        //     // return this.state.sampleList.map((data, index) => {
        //     // /*     switch (endIndex) {
        //     //         case 5:
        //     //             if (index > 0 && index < 5) return ( <td>{data}</td>);
        //     //             break;
        //     //         case 10:
        //     //             if (index >= 5 && index < 10) return ( <td>{data}</td>);
        //     //             break;
        //     //         case 15:
        //     //             if (index >= 10 && index < 15) return ( <td>{data}</td>);
        //     //             break;
        //     //         case 20:
        //     //             if (index >= 15 && index < 20) return ( <td>{data}</td>);
        //     //             break;
        //     //         case 25:
        //     //             if (index >= 20 && index < 25) return ( <td>{data}</td>);
        //     //             break;
        //     //         default:
        //     //             break;
        //     //     } */
        //     // });
        // }
        // const SampleComponent = data => {
        //     return this.state.sampleList.map((person, i) => {
        //         return ( <td>{person}</td>);
        //     });
        //   };
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
                            { this.createTable() }
                            {/* <tr>
                                <SampleComponent endIndex={5}></SampleComponent>
                            </tr>
                            <tr>
                                <SampleComponent endIndex={10}></SampleComponent>
                            </tr>
                            <tr>
                                <SampleComponent endIndex={15}></SampleComponent>
                            </tr>
                            <tr>
                                <SampleComponent endIndex={20}></SampleComponent>
                            </tr>
                            <tr>
                                <SampleComponent endIndex={25}></SampleComponent>
                            </tr> */}
                            {/* <tr>
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
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SelectForm;