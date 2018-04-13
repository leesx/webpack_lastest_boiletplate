/**
 * Created by leesx on 2018/3/7.
 */
import React, {Component} from "react";
import JSONFormat from "utils/JSONFormat";
import JSONLint from "utils/JSONLint";

export default class JsonFormatBox extends Component {
    state = {
        json : '{}',
        error: null,
    }

    componentWillMount() {
        this.setState({
            json : this.props.jsonData || '{}',
            error: null,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.jsonData !== this.props.jsonData) {
            this.setState({
                json: nextProps.jsonData || '{}',
            })
        }
    }

    handleChangeJsonArea = (e) => {
        const value = e.target.value;
        this.setState({
            json : value,
            error: null,
        }, () => {
            this.props.onChange(value)
        })
    }

    render() {

        const json = this.state.json;
        let result = null;
        let newJson = '';

        try {
            const current_json = JSONLint.parse(json);
            newJson = JSON.stringify(current_json, '', 4);
            result = new JSONFormat(JSON.parse(JSON.stringify(json)), 4).toString();
        } catch (e) {
            newJson = json;
            result = `<div class="format-error">${e.message}</div>`;
        };

        const {showType} = this.props;

        return (
            <div className="jsonview-formater">
                <div className="formater-box">
                    {
                        showType === 'all' || showType === 'left' ?
                            <div className="formater-box-left">
                                <textarea
                                    onChange={this.handleChangeJsonArea}
                                    value={newJson}
                                />
                            </div> : null
                    }
                    {
                        showType === 'all' || showType === 'right' ?
                            <div
                                className="formater-box-right"
                                dangerouslySetInnerHTML={{__html: result}}
                            /> : null
                    }
                </div>
            </div>
        )
    }
}