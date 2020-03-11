import React, { Component } from 'react';
import Select from 'react-select';
import { showKeywordPlugin, openPaintPlugin } from '../assets/liarGameUtil';
import { DRAMA } from './data';


let people_options = [];

const title_options = [
  { label: '영화', value: 'movie', option: 'title' },
  { label: '가요', value: 'popularSong' ,  option: 'title'},
  { label: '과자', value: 'cookies' , option: 'title'},
  { label: '드라마', value: 'drama' , option: 'title'},
  { label: '컵라면', value: 'cupNoodle' , option: 'title'},
  { label: '아이스크림', value: 'iceCream' , option: 'title'},
  { label: '음식', value: 'food' , option: 'title'},
  { label: '과일', value: 'fruit' , option: 'title'},
  { label: '운동', value: 'exercise' , option: 'title'},
  { label: '가수', value: 'singer' , option: 'title'},
  { label: '배우', value: 'actor' , option: 'title'},
];

class SettingGames extends Component {
  state = {
    selectedOption_people: null,
    movieList : [],
    total : 3,
    category : '',
    keyword : '',
    spy : false,
    isDraw : false,
  };

  constructor(props) {
    super(props);
    this.settingInfos = this.settingInfos.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
  }

  toggleChange () {
    this.setState({ isChecked: !this.state.isChecked });
  }

  httpGet(type , addInfo) {

    const request = require('request');
    let CLIENT_KEY = "";
    let aInfo = addInfo;
    let data = {};
    switch (type) {
      case "movie":
        CLIENT_KEY = '4a7dad029a526f561f97b23a72f1f410';
        request({
          // url : `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=4a7dad029a526f561f97b23a72f1f410&openStartDt=2018&openEndDt=2019`,
          url : `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${CLIENT_KEY}&targetDt=${aInfo}&weekGb=0`,
          type : 'get',
        }, function(error,res, body){
          // if (body !== null  && body !== undefined) {
          //   // that.setMovieList(body.boxOfficeResult.weeklyBoxOfficeList);
          // }
          // console.log(res);pr
          data = JSON.parse(body);
          console.log(data.boxOfficeResult.weeklyBoxOfficeList[0].movieNm);
         this.setState({keyword : data.boxOfficeResult.weeklyBoxOfficeList[0].movieNm});
        }.bind(this));
        // cf. http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do
        break;
      case "drama":
        this.setState({ keyword: this.randomItem(DRAMA) });
        break
      default:
        break;
    }
  }

  setMovieList (list) {

    if (list.length > 0) {
      list = list.filter((x) => list.movieNm);
    }

    console.log('list >>> ' , JSON.stringify(list));
    // body

  }


  sendInfo () {
    this.setting_infos = {
      people :this.state.total,           // 인원 수
      category : this.state.category,     // 게임 주제 : movie, cupNoodle, cookie, iceCream , food , fruit , exercise, singer, actor , title_song
      keyword : this.state.keyword,       // 주제어,
      spy : this.state.spy,
      isDraw : this.state.isDraw
    }

    console.log("setting_Infos >>> ", JSON.stringify(this.setting_infos));
    // native plugin 호출
    if (this.state.isDraw) {      // 그리기 모드
      openPaintPlugin(this.setting_infos);
      // liarGameUtil.showSettingViewPlugin();
    } else {
      showKeywordPlugin(this.setting_infos);
      // liarGameUtil.showKeywordPlugin(this.setting_infos);
    }
  }

  // 선택된 정보 setting
  settingInfos (e) {
    // console.log('e >> ' , e);
    if (e.option === 'people') {
      this.setState({ total: e.value });
    } else if (e.option === 'title') {
      this.setState({ category: e.label });
      switch (e.value) {
        case 'movie':
          let date = this.randomDate(new Date(2010, 0, 1), new Date());
          date = date.toISOString().slice(0,10).replace(/-/g,"");
          this.httpGet('movie' , date);
          break;
        case 'drama':
          this.httpGet('drama' , '20191201');
          break;
        default:
          break;
      }
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
    console.log('randomData >>> ' , a[Math.floor(Math.random() * a.length)]);
    return a[Math.floor(Math.random() * a.length)];
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
        
      <div id="loading" class="lg_loadingWrap">
        <div>
          <em class="lg_load"><span></span></em>
        </div>
      </div>
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
          <button onClick={this.sendInfo}>시작하기</button>
        </div>
      </div>
    );
  }
}
export default SettingGames;

// 선택 안된 경우 시작하기 disabled 처리
// loading bar





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
