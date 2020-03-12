import React, { Component } from 'react';


class SelectForm extends Component {

    constructor(props) {
        super(props);
        window["SelectForm"] = this;
    }

    keywordCallback(res){
        console.log('callback res >>> ' , JSON.stringify(res));
        if (res.result) {
        //   this.props.history.push("/selectform");
        }
        // createBrowserHistory.push('/selectPage');
        // 페이지 이동 , keyword랑 함께
    }
    render() {
        return(
            <div>SelectForm</div>
        );
    }

}

export default SelectForm;