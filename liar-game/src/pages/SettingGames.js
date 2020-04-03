import React, { Component } from 'react';
import Select from 'react-select';
import { mobileCheck,showKeywordPlugin, openPaintPlugin } from '../assets/liarGameUtil';
import { DRAMA, ENTERTAINER, FRUIT, JOB, EXERCISE, FOOD, ICECREAME, COOKIES, KITCHEN } from './data';

let people_options = [];

const title_options = [
  { label: '영화', value: 'movie', option: 'title' },
  { label: '과자', value: 'cookies' , option: 'title'},
  { label: '드라마', value: 'drama' , option: 'title'},
  { label: '아이스크림', value: 'iceCream' , option: 'title'},
  { label: '음식', value: 'food' , option: 'title'},
  { label: '과일', value: 'fruit' , option: 'title'},
  { label: '운동', value: 'exercise' , option: 'title'},
  { label: '연예인', value: 'entertainer' , option: 'title'},
  { label : '직업' , value : 'job', option : 'title'},
  { label : '부엌' , value: 'kitchen' , option: 'title'}
  // { label: '가요', value: 'popularSong' ,  option: 'title'},
  // { label: '채소', value: 'vegetable', option: 'title'},
];

class SettingGames extends Component {
  state = {
    selectedOption_people: null,
    sampleList : [],
    total : 0,
    value: '',
    category : '',
    keyword : '',
    showLoading : true,
    spy : false,
    isDraw : false,
  };

  moveNmList = [];

  constructor(props) {
    super(props);
    this.settingInfos = this.settingInfos.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    window["SettingGames"] = this;
  }

  componentDidMount() {
    console.log('componentDidMount >>> ');
    setTimeout(() => {
      this.setState({ showLoading: false });
    }, 500);
  }

  componentWillUnmount() {
    this.setState({ showLoading: false });
  }


  toggleChange () {
    this.setState({ isChecked: !this.state.isChecked });
  }

  keywordCallback(res) {
    console.log('keywordCallback >>> ');

    if(!res.result) {
      var data = {
        id : "APP_EXIT",
        param : {
          callback : "",
          type : "restart" //restart , exit
        }
      }
      window.YBridge.callPlugin(JSON.stringify(data))

    } else {
      this.setState({ showLoading: true });

      console.log('keywordCallback >> ' ,  JSON.stringify(res));
      localStorage.setItem('keywordCallback', JSON.stringify(res));
      if (!this.state.isDraw) {
        this.props.history.push('/selectform');
        this.setState({ showLoading : false });
      } else {
        openPaintPlugin(this.setting_infos);
      }
    }
  }

  paintCallback(res) {
    if(!res.result) {
      var data = {
        id : "APP_EXIT",
        param : {
          callback : "",
          type : "restart" //restart , exit
        }
      }
      window.YBridge.callPlugin(JSON.stringify(data))
    } else {
      this.setState({ showLoading: true });
      console.log('paintCallback res >>> ' ,  JSON.stringify(res));
      if (res.result) {
        this.props.history.push('/selectform');
        this.setState({ showLoading : false });
      }
    }
  }

  httpGet(type) {

    const request = require('request');
    let CLIENT_KEY = "";
    let data = {};
    let result = false;
    const that = this;
    return new Promise(function (callback) {
      switch (type) {
        case 'movie':
          CLIENT_KEY = '4a7dad029a526f561f97b23a72f1f410';
          let date = that.randomDate(new Date(2010, 0, 1), new Date());
          date = date.toISOString().slice(0,10).replace(/-/g,"");
          console.log('date >>. ' , date);
          request({
            url : `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${CLIENT_KEY}&targetDt=${date}&weekGb=0`,
            type : 'get',
          }, function(error,res, body){
            data = JSON.parse(body);

            console.log('data >>> ' , JSON.stringify(data));
            // let moveNmList = [];
            if (data.boxOfficeResult.weeklyBoxOfficeList.length > 0) {
              for(var i = 0; i < data.boxOfficeResult.weeklyBoxOfficeList.length; i++) {
                if (that.state.sampleList.length <= 25) {
                  console.log('movieNm >>  ' , data.boxOfficeResult.weeklyBoxOfficeList[i].movieNm);
                  that.state.sampleList.push(data.boxOfficeResult.weeklyBoxOfficeList[i].movieNm);
                }
              }
            }
            if (that.state.sampleList.length >= 25) {
              that.setting_infos = {
                people :that.state.total,           // 인원 수
                category : that.state.category,     // 게임 주제 : movie, cupNoodle, cookie, iceCream , food , fruit , exercise, singer, actor , title_song
                keyword :  that.state.sampleList[0],       // 주제어,
                spy : that.state.spy,
                isDraw : that.state.isDraw,
                sampleList : that.state.sampleList
              }
              that.setState({keyword : that.state.sampleList[0] , sampleList :  that.state.sampleList});
              console.log(that.state.sampleList);
  
              localStorage.setItem('setting_infos', JSON.stringify(that.setting_infos));
              if(mobileCheck()) {
                showKeywordPlugin(that.setting_infos);
              } else {
                that.props.history.push('/selectform');
              }
            } else {
              that.httpGet('movie');
            }
          });
          break;
        case "drama":
          result = true;
          that.setState({ keyword: that.randomItem(DRAMA) });
          callback(result);
          break;
        case "entertainer" :
          result = true;
          that.setState({ keyword: that.randomItem(ENTERTAINER) });
          callback(result);
          break;
        case "fruit" :
          result = true;
          that.setState({ keyword: that.randomItem(FRUIT) });
          callback(result);
          break;
        case "job" :
          result = true;
          that.setState({ keyword: that.randomItem(JOB) });
          callback(result);
          break;
        case "exercise" :
          result = true;
          that.setState({ keyword: that.randomItem(EXERCISE) });
          callback(result);
          break;
        case "food" :
          result = true;
          that.setState({ keyword: that.randomItem(FOOD) });
          callback(result);
          break;
        case "iceCream" :
          result = true;
          that.setState({ keyword: that.randomItem(ICECREAME) });
          callback(result);
          break;
        case "cookies" :
          result = true;
          that.setState({ keyword: that.randomItem(COOKIES) });
          callback(result);
          break;
        case "kitchen" :
          result = true;
          that.setState({ keyword: that.randomItem(KITCHEN) });
          callback(result);
          break;
        default:
          break;
      }
    });
  }

  async sendInfo () {
    this.setState({ showLoading : true });

    const result = await this.httpGet(this.state.value);

    console.log('result >>> ' , result);

    if(result) {
      this.setting_infos = {
        people :this.state.total,           // 인원 수
        category : this.state.category,     // 게임 주제 : movie, cupNoodle, cookie, iceCream , food , fruit , exercise, singer, actor , title_song
        keyword : this.state.keyword,       // 주제어,
        spy : this.state.spy,
        isDraw : this.state.isDraw,
        sampleList : this.state.sampleList
      }
        localStorage.setItem('setting_infos', JSON.stringify(this.setting_infos));

        console.log("setting_Infos >>> ", JSON.stringify(this.setting_infos));

      if (mobileCheck()) {
        showKeywordPlugin(this.setting_infos);
      } else {
        this.props.history.push('/selectform');
      }
    }
  }

  // 선택된 정보 setting
  settingInfos (e) {
    console.log('e >> ' , e);
    if (e.option === 'people') {
      this.setState({ total: e.value });
    } else if (e.option === 'title') {
      this.setState({value : e.value , category: e.label})
    }
    else {
      if (e.target.className === "spy") {
        this.setState({spy : !this.state.spy });
      } else {
        this.setState({ isDraw: !this.state.isDraw });
      }
    }
  }

   randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  randomItem(a) {
    let randomList = [];
    for (var i = 0; i < 100; i ++ ) {
      console.log('randomData >>> ' , a[Math.floor(Math.random() * a.length)]);
      if (randomList.length <= 25 && randomList.indexOf(a[Math.floor(Math.random() * a.length)]) < 0) {
        randomList.push(a[Math.floor(Math.random() * a.length)]);
      }
      if (randomList.length === 25) {
        console.log('randomList.length ?>> ' , randomList.length);
        break;
      }
    }
    this.setState({'sampleList' : randomList});
    console.log('randomList >> ' , randomList);
    // console.log('randomData >> ' , randomList[0]);
    return randomList[0];
  }

  render() {

    people_options = [];
    for (let i = 3; i< 21; i++) {
      people_options.push({
        'value' : i,
        'label' : i + "명",
        'option' : 'people'
      });
    }

    return (
      <div className="lg_container01">
      {/* loading */}
        <div className={"lg_loadingWrap " + (this.state.showLoading  ? '' : 'lg_none')}>
          <div>
            <em className="lg_load"><span></span></em>
          </div>
        </div>
        <div className={ this.state.showLoading  ? 'lg_none' : '' }>
          <p className="lg_title01">라이어 게임</p>
          <div className="lg_slectbox">
            <Select
              isSearchable = {false}
              value={people_options.value}
              name="people_number"
              onChange={this.settingInfos}
              options={ people_options }
              placeholder="인원 수"
            />
            <Select
              isSearchable = {false}
              formatOptionLabel = "readonly"
              value={title_options.value}
              name="game_title"
              placeholder="게임 주제"
              onChange={this.settingInfos}
              options = {title_options}
            />
          </div>
          <div className="lg_round_wrap">
            {/* 스파이모드 선택 */}
            <div className="lg_round">
              <input type="checkbox" name="spymode" onChange={this.settingInfos}  checked={this.state.spy} />
              <label onClick={this.settingInfos} className="spy" htmlFor="checkbox">
                <p onClick={this.settingInfos} className="spy">스파이모드</p>
                <span className="lg_question"></span>
              </label>
            </div>
            <div className="lg_round lg_round_02">
              <input type="checkbox" name="explainmode" onChange={this.settingInfos} checked={this.state.isDraw}  />
              <label onClick={this.settingInfos} className="paint" htmlFor="checkbox">
                <p  onClick={this.settingInfos} className="paint">그림으로 설명하기</p>
              </label>
            </div>
          </div>
          <div className="lg_btn02">
            <button onClick={this.sendInfo} disabled={this.state.value === '' || this.state.total === 0} >시작하기</button>
          </div>

        </div>
      </div>
    );
  }
}
export default SettingGames;

