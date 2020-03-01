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


// const people_options = test.map(v => ({
//   label: v,
//   value: v
// }));



class SettingGames extends Component {
  state = {
    selectedOption_people: null,
    // selectedOption_title: null,


  };

  handleChange = selectedOption_people => {
    this.httpGet("movie");
    console.log("selectedOption_people >>> " , selectedOption_people);
      // this.setState(
      //   { selectedOption_people },
      //   () => console.log(`Option selected:`, this.state.selectedOption_people)
      // );

    // if (e.option === "title") {
    //   this.setState(
    //     // { selectedOption_title },
    //     () => console.log(`Option selected:`, this.state.selectedOption_title)
    //   );
    // } else {
    // }
  };

  httpGet(type) {


    const request = require('request');
    // const querystring = require('querystring');

    // let str = '과일 종류';
    // // let encodedStr = querystring.escape(str);

    // let kakaoOptions = {
    //   // uri:`https://dapi.kakao.com/v2/local/search/keyword.json?query=${str}`,
    //   // uri:`https://dapi.kakao.com/v2/search/web?query=${str}`,
    //   method:'GET',
    //   headers:{
    //           'Authorization': 'KakaoAK ef5135ef7fc05129d26e9d4d61d63363'
    //   },
    //   encoding:'utf-8'
    // }

    const uri ='http://openapi.jbfood.go.kr:8080/openapi/service/FoodDictionaryService/getFoodDictionary?ServiceKey=mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw';

    let foodOption = {
      // uri : 'http://openapi.jbfood.go.kr:8080/openapi/service/FoodDictionaryService/getFoodDictionary?ServiceKey=mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw',	
      method : 'GET',
      // key : "mvg2sTC9kU65ua19lKF4rKgRUqciZrN4f6GzpZlijmhUDAQWN9Jboi1HwvFBuJ2a6ylNdmKNhOHQlHJJdulBqw%3D%3D"
    }

    
 


    function callback(error,res, body){
      console.log(res);
      console.log(body)
    }
    request(uri,callback);
    // const KEY  = "ef5135ef7fc05129d26e9d4d61d63363";
    // switch (type) {
    //   case "movie":
    //     const uri = "https://dapi.kakao.com/v2/search/web?query=" + type + "?Authorization="  + KEY ;
    //     https.get(uri, {
    //       // hostname: 'api.cognitive.microsoft.com',
    //       // path:     '/bing/v7.0/search?q=' + encodeURIComponent(query),
    //       // headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
    //     }, res => {
    //       let body = ''
    //       res.on('data', part => body += part)
    //       res.on('end', () => {
    //         for (var header in res.headers) {
    //           if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
    //             console.log(header + ": " + res.headers[header])
    //           }
    //         }
    //         console.log('\nJSON Response:\n')
    //         console.dir(JSON.parse(body), { colors: false, depth: null })
    //       })
    //       res.on('error', e => {
    //         console.log('Error: ' + e.message)
    //         throw e
    //       })
    //     })
        
    //     break;
    
    //   default:
    //     break;
    // }
  }

  render() {
    const { selectedOption_people } = this.state;

    // const { selectedOption_title } = this.state;

    for (var i = 3; i< 21; i++) {
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
          <button>시작하기</button>
        </div>
      </div>
    );
  }
}
export default SettingGames;
