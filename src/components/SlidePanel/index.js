/**
 * Created by leesx on 2018/3/7.
 */
import React,{Component} from 'react';
import ReactDOM from "react-dom";
import './index.less';

class RootNode extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}


class SlidePanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShow:false,
        }
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.el);

    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }
    
    render() {
        //const {isShow} = this.state;
        return (
            <RootNode>
                <div className="slide-panel-wrap" style={{height:this.props.isShow ? '100%' : 0}}>
                    <div className="panel-header">
                        <div className="title">{this.props.title}</div>
                        <div className="close-btn" onClick={this.props.onClose}>
                            <span>×</span>
                        </div>
                    </div>
                    <div className="panel-content">{this.props.children}</div>
                </div>
            </RootNode>
        )
    }
}
export default SlidePanel;