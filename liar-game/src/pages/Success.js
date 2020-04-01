import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { mobileCheck } from '../assets/liarGameUtil';
class Success extends Component {

    state = {
        liarNum : 3,
        keyword : '',
        select_keyword : '',
        spyNum : 0,
        isSpy : false
    }


    componentDidMount(){

        let { myKey } = this.props.match.params;
        myKey = myKey.replace(':', '');
        console.log(myKey)

        let setting_infos = JSON.parse(localStorage.getItem('setting_infos'));
        let keywordCallback = JSON.parse(localStorage.getItem('keywordCallback'));
        console.log('keywordCallback >> ' ,  JSON.stringify(keywordCallback));

        //web test
        if (!mobileCheck()) {
            setting_infos = {"people":3,"category":"드라마","keyword":"옥탑방 고양이","spy":true,"isDraw":false,"sampleList":["옥탑방 고양이","마더","또! 오해영","쾌도홍길동","골든타임","최고의 한방","남자친구","응답하라 1988","대장금","알함브라궁전의 추억","식샤를 합시다","미스터션샤인","그저바라보다가","나의 아저씨","아버지가 이상해","시그널","넝쿨째 굴러온 당신","태양의 여자","추노","검색어를 입력하세요 WWW","미생","대장금","사랑하는 은동아","시크릿 가든","동백꽃 필 무렵"]};
            keywordCallback = {"result":true,"keyword":"옥탑방 고양이","liar_num":3,"spy_num":1};
        }

        if (keywordCallback.hasOwnProperty("spy_num")) {
            this.setState({liarNum: keywordCallback.liar_num, keyword : keywordCallback.keyword , spyNum : keywordCallback.spy_num , isSpy : setting_infos.spy , select_keyword : myKey});
        } else {
            this.setState({liarNum: keywordCallback.liar_num, keyword : keywordCallback.keyword, isSpy : setting_infos.spy , select_keyword : myKey});
        }
    }

    render() {
        return (
            <div className="lg_container01">
                <p className="lg_title01">라이어 : <span>{ this.state.liarNum }</span>번째 순서</p>
                <p className={"lg_title01 font20 " + (!this.state.isSpy ? 'lg_none' : '')}>( 스파이 : <span>{ this.state.spyNum }</span>번째 순서 )</p>
                <div className="lg_box01">
                    <span>제시어</span>
                    <p  className="lg_box01_redcolor">{ this.state.keyword }</p>
                </div>
                <div className="lg_box01">
                    <span>선택한 단어</span>
                    <p>{ this.state.select_keyword }</p>
                </div>
                <Link to="/">
                    <button className="lg_btn_revert"></button>
                    <span className="lg_btn_restart">다시하기</span>
                </Link>
            </div>
        );
    }
}

export default Success;