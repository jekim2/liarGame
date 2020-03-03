import React, { Component } from 'react';
import Select from 'react-select';


const people_options = [];
  // { value: '3', label: '3_people' },
  // { value: 'strawberry', label: 'Strawberry' },
  // { value: 'vanilla', label: 'Vanilla' },

const title_options = [
  { value: 'movie', label: '영화', option: 'title' },
  { value: 'sing', label: '가요' ,  option: 'title'},
  { value: 'cookies', label: '과자' , option: 'title'},
];

const setting_infos = {
  // type : '1',           // 0 : 그림맞추기 , 1 : 단어맞추기,
  people : 3,           // 인원 수
  title : '',           // 게임 주제 : movie, cupNoodle, cookie, iceCream , food , fruit , exercise, singer, actor , title_song
  info : "",            // 주제어,
  spy : false           // true : spy , false : spy X
}


// const people_options = test.map(v => ({
//   label: v,
//   value: v
// }));



class SettingGames extends Component {
  state = {
    selectedOption_people: null,
    movieList : []

  };

  handleChange = selectedOption_people => {
    this.httpGet("movie","20191215");
    console.log("selectedOption_people >>> " , selectedOption_people);
      this.setState(
        { selectedOption_people },
        () => console.log(`Option selected:`, this.state.selectedOption_people)
      );
  };

  httpGet(type , addInfo) {

    const that = this;

    const request = require('request');
    let CLIENT_KEY = "";
    let aInfo = addInfo;
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
          // console.log(res);
          console.log(body);
        });
        // cf. http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do
        break;
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
    // setting_infos
    this.setting_infos = {
      // type : '1',           // 0 : 그림맞추기 , 1 : 단어맞추기,
      people :this.state.selectedOption_people,           // 인원 수
      title : '',           // 게임 주제 : movie, cupNoodle, cookie, iceCream , food , fruit , exercise, singer, actor , title_song
      info : "",            // 주제어,
      spy : false
    }

    console.log("setting_Infos >>> ", JSON.stringify(this.setting_infos));
  }

  render() {
    const { selectedOption_people } = this.state;

    // const { selectedOption_title } = this.state;

    for (let i = 3; i< 21; i++) {
      people_options.push({
        'value' : i,
        'label' : i + "명",
        'option' : 'people'
      });
    }

    return (

      <div className="lg_container01">
        <p className="lg_title01">Liar Games</p>
        <div className="lg_btn01">
          <button>그림 맞추기</button>
          <button>단어 맞추기</button>
        </div>
        {/* <div className="lg_btn01">
          <button>단어 맞추기</button>
        </div> */}
        <div className="lg_slectbox">
          <Select readonly 
            value={selectedOption_people}
            name="people_number"
            onChange={this.handleChange}
            options={ people_options }
            placeholder="인원 수"
          />
          <Select
            placeholder="게임 주제"
            onChange={this.handleChange}
            options = {title_options}
          />
          {/* <Select
            value={ selectedOption_title }
            name="game_title"
            onChange={ this.handleChange }
            options={ title_options }
            placeholder="게임 주제"
          /> */}
        </div>
        {/* 스파이모드 선택 */}
        <div className="lg_round">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            <p>스파이모드</p>
            <span className="lg_question"></span>
          </label>
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
