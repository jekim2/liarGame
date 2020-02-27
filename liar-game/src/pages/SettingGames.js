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
      this.setState(
        { selectedOption_people },
        () => console.log(`Option selected:`, this.state.selectedOption_people)
      );

    // if (e.option === "title") {
    //   this.setState(
    //     // { selectedOption_title },
    //     () => console.log(`Option selected:`, this.state.selectedOption_title)
    //   );
    // } else {
    // }
  };

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
          <Select
            value={selectedOption_people}
            name="people_number"
            onChange={this.handleChange}
            options={ people_options }
            placeholder="인원 수"
          />
          <Select
            placeholder="게임 주제"
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
