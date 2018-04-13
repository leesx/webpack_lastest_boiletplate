import React, {Component} from "react";

class MyInputNumber extends Component {
    state ={

    }
    render() {
        return (
            <div class="ant-input-number-input-wrap" role="spinbutton">
                <input
                    step="1"
                    min="0"
                    max="999999"
                    class="ant-input-number-input"
                    autocomplete="off"
                    id="skus[0].stock"
                    value="1"/>
            </div>
        )
    }
}