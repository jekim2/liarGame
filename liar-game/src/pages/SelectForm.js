import React, { Component } from 'react';


class SelectForm extends Component {

    constructor(props) {
        super(props);
        window["SelectForm"] = this;
        console.log('SelectForm >>>>>>>>>>');
    }

    componentDidMount(){
        const { myKey } = this.props.match.params;
        console.log("myKey >>> " ,  JSON.stringify(myKey));
    }

    render() {
        return(
            <div className="lg_container01 lg_container02">
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
        );
    }
}

export default SelectForm;