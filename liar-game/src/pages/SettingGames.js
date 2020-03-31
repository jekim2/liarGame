import React, { Component } from 'react';
import Select from 'react-select';
import { showKeywordPlugin, openPaintPlugin } from '../assets/liarGameUtil';
import { DRAMA, ENTERTAINER, FRUIT } from './data';
// import { SelectForm } from '../pages/SelectForm';


let people_options = [];

const title_options = [
  { label: '영화', value: 'movie', option: 'title' },
  { label: '가요', value: 'popularSong' ,  option: 'title'},
  { label: '과자', value: 'cookies' , option: 'title'},
  { label: '드라마', value: 'drama' , option: 'title'},
  { label: '채소', value: 'vegetable', option: 'title'},
  { label: '아이스크림', value: 'iceCream' , option: 'title'},
  { label: '음식', value: 'food' , option: 'title'},
  { label: '과일', value: 'fruit' , option: 'title'},
  { label: '운동', value: 'exercise' , option: 'title'},
  { label: '연예인', value: 'entertainer' , option: 'title'},
  { label : '직업' , value : 'job', option : 'title'}
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
    this.setState({ showLoading: true });

    console.log('keywordCallback >> ' ,  JSON.stringify(res));
    if (res.result) {
      localStorage.setItem('keywordCallback', JSON.stringify(res));
    }
  }


  httpGet(type) {

    const request = require('request');
    let CLIENT_KEY = "";
    // let aInfo = addInfo;
    let data = {};
    let result = false;
    const that = this;
    return new Promise(function (callback) {
      switch (type) {
        case 'movie':
          CLIENT_KEY = '4a7dad029a526f561f97b23a72f1f410';
          let date = that.randomDate(new Date(2010, 0, 1), new Date());
          date = date.toISOString().slice(0,10).replace(/-/g,"");
          request({
            url : `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${CLIENT_KEY}&targetDt=${date}&weekGb=0`,
            type : 'get',
          }, function(error,res, body){
            data = JSON.parse(body);
            let moveNmList = [];
            if (data.boxOfficeResult.weeklyBoxOfficeList.length > 0) {
              data.boxOfficeResult.weeklyBoxOfficeList.map((x) => moveNmList.push(x.movieNm));
            }
            console.log(data.boxOfficeResult.weeklyBoxOfficeList)
            console.log(data.boxOfficeResult.weeklyBoxOfficeList[0].movieNm);
            that.setState({keyword : data.boxOfficeResult.weeklyBoxOfficeList[0].movieNm , sampleList : moveNmList});
            console.log(that.state.sampleList);
           result = true;
           callback(result);
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
        default:
          break;
      }
    });
  }

  async sendInfo () {
    this.setState({ showLoading : true });

    const result = await this.httpGet(this.state.value);

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

    if (result) {
      // native plugin 호출
      if (this.state.isDraw) {      // 그리기 모드
        openPaintPlugin(this.setting_infos);
      } else {
        showKeywordPlugin(this.setting_infos);
      }
      this.setState({ showLoading : false });
      console.log('current path >>> ' , this.props.location.pathname);
      setTimeout(() => {
        this.props.history.push('/selectform');
      }, 1000);
    }
  }

  // 선택된 정보 setting
  settingInfos (e) {
    // console.log('e >> ' , e);
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
    // console.log('randomData >>> ' , a[Math.floor(Math.random() * a.length)]);
    let randomList = [];
    for (var i = 0; i < 25; i ++ ) {
      randomList.push(a[Math.floor(Math.random() * a.length)]);
    }
    this.setState({'sampleList' : randomList});
    // console.log('randomList >> ' , randomList);
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
                <p>스파이모드</p>
                <span className="lg_question"></span>
              </label>
            </div>
            <div className="lg_round lg_round_02">
              <input type="checkbox" name="explainmode" onChange={this.settingInfos} checked={this.state.isDraw}  />
              <label onClick={this.settingInfos} htmlFor="checkbox">
                <p>그림으로 설명하기</p>
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



    // // const querystring = require('querystring');

    // let str = '베테랑';
    // // let encodedStr = querystring.escape(str);

    // let kakaoOptions = {
    //   // uri:`https://dapi.kakao.com/v2/local/search/keyword.json?query=${str}`,
    //   uri:`https://dapi.kakao.com/v2/search/web?query=${str}`,
    //   method:'GET',
    //   headers:{
    //           'Authorization': 'KakaoAK ef5135ef7fc05129d26e9d4d61d63363'
    //   },
    //   encoding:'utf-8'
    // }

    //  function callback(error,res, body){
    //   console.log(res);
    //   console.log(body)
    // }
    // request(kakaoOptions,callback);


    // const option = {
    //   uri : `https://openapi.naver.com/v1/search/movie.json?query=${str}`,
    //   method: 'GET',
    //   headers : {
    //     'X-Naver-Client-Id' : 'H0CLikr465hhOVkwJm2Q',
    //     'X-Naver-Client-Secret' : 'yXJORf7cvO'
    //   },
    // }

    // function callback(error,res, body){
    //   console.log(JSON.stringify(res));
    //   console.log(JSON.stringify(body));
    //   console.log(JSON.stringify(error));
    // }
    // request(option,callback);

    
    // // 영화 client id
    // // const mClient_id = "4a7dad029a526f561f97b23a72f1f410";

    // const option = {
    //   url : 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=4a7dad029a526f561f97b23a72f1f410&targetDt=20191201&weekGb=0',
    //   type : 'get',
    // }

    // function callback(error,res, body){
    //   console.log(JSON.stringify(res));
    //   // console.log(JSON.stringify($.parseJSON(body)));
    //   // console.log(JSON.stringify(error));
    // }
    // request(option,callback);





    // const uri ='http://openapi.jbfood.go.kr:8080/openapi/service/FoodDictionaryService/getFoodDictionary?ServiceKey=mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw';

    // let foodOption = {
    //   // uri : 'http://openapi.jbfood.go.kr:8080/openapi/service/FoodDictionaryService/getFoodDictionary?ServiceKey=mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw',	
    //   method : 'GET',
    //   // key : "mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw%3D%3D"
    // }

    // const client_id = "la9V3Vf9ibIJhOS5r5aa";
    // const client_secret = "gajYALWiMV";

    // const uri = `https://openapi.naver.com/v1/search/movie.json?query=${str}`;
 
    // const option = {
    //   uri : uri,
    //   method: 'GET',
    //   headers : {
    //     'X-Naver-Client-Id' : client_id,
    //     'X-Naver-Client-Secret' : client_secret
    //   }
    // }

    // function callback(error,res, body){
    //   console.log(res);
    //   console.log(body)
    // }
    // request(option,callback);


    // const request = require('request');
    // const NAVER_CLIENT_ID     = 'la9V3Vf9ibIJhOS5r5aa';
    // const NAVER_CLIENT_SECRET = 'gajYALWiMV';
    // // const option = {
    // //   query  :'최신 영화', //이미지 검색 텍스트
    // //   start  :1, //검색 시작 위치
    // //   display:50, //가져올 이미지 갯수
    // // }

    // let str = '베테랑';
    
    // request.get({
    //   uri:`https://openapi.naver.com/v1/search/movie.json?query=${str}`,
    //   // qs :option,
    //   headers:{
    //     'X-Naver-Client-Id':NAVER_CLIENT_ID,
    //     'X-Naver-Client-Secret':NAVER_CLIENT_SECRET,
    //   },
    //   mode : 'no-cors',
    //   encoding:'utf-8'
    // }, function(err, res, body) {
    //   // let json = JSON.parse(body) //json으로 파싱
    //   console.log(JSON.stringify(res));
    // });

    // const express = require('express');
    // const app = express();
//     const client_id = 'la9V3Vf9ibIJhOS5r5aa';
//     const client_secret = 'gajYALWiMV';
//     const str ='베테랑';
//   // app.get('/search/blog', function (req, res) {
//    const api_url = `https://openapi.naver.com/v1/search/movie.json?query=${str}`; // json 결과
// //   const api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
//    const request = require('request');
//    const options = {
//        url: api_url,
//       //  mode : 'no-cors',
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    request.get(options, function (error, response, body) {
//      console.log(error);
//      console.log(response);
//      console.log(body);
//     //  if (!error && response.statusCode == 200) {
//     //    res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//     //    res.end(body);
//     //  } else {
//     //    res.status(response.statusCode).end();
//     //    console.log('error = ' + response.statusCode);
//     //  }
//    });
//  });
