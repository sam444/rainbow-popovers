import { Component } from "rainbowui-core";
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';
export default class Popovers extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.cls = 'btn'
    }
    render() {
        if (this.cls == 'btn btn-secondary') {
            return (
                <button id={this.componentId} type="button" class={this.cls} data-container="body" data-toggle="popover" title={this.props.title} data-html="true"
                    data-placement={this.props.direction} data-content={this.props.content}>
                    {this.props.value}
                </button>
            );
        } else {
            return (
                <button id={this.componentId} type="button" class={this.cls} data-toggle="popover" title={this.props.title} data-html="true"
                    data-content={this.props.content}>{this.props.value}</button>
            );
        }
    }
    componentDidMount() {
        if (this.cls == 'btn btn-secondary') {
            $("#" + this.componentId).popover({
                container: 'body',
                html:true
            })
        } else {
            $("#" + this.componentId).popover({
                html:true
            })
        }
        this.togglePopover();

    }
    togglePopover() {
        $('body').on('click', function (event) {
            var target = $(event.target);
            if (!target.hasClass('popover') //弹窗内部点击不关闭
                && target.parent('.popover-content').length === 0
                && target.parent('.popover-title').length === 0
                && target.parent('.popover').length === 0
                && target.data("toggle") !== "popover") {
                $('.btn').popover('hide');
            }
        });
        $(".btn").click(function (event) {
            $('.btn').popover('hide');          // 当点击一个按钮的时候把其他的所有内容先关闭。
            $(this).popover('toggle');          // 然后只把自己打开。
        });
    }
    componentWillMount() {
        const { size, styleClass, direction, custom } = this.props;
        if (size == 'big') {
            this.cls += ' btn-lg';
        } else if (size == 'small') {
            this.cls += ' btn-sm';
        }
        if (styleClass == 'primary') {
            this.cls += ' btn-primary';
        }
        if (styleClass == 'success') {
            this.cls += ' btn-success';
        }
        if (styleClass == 'warning') {
            this.cls += ' btn-warning';
        }
        if (styleClass == 'danger') {
            this.cls += ' btn-danger';
        }
        if (Util.parseBool(custom)) {
            this.cls += ' btn-secondary';
        }
    }
};


/**
 * ButtonGroup component prop types
 */
Popovers.propTypes = $.extend({}, Component.propTypes, {
    direction: PropTypes.string,
    custom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    content: PropTypes.string,
});

/**
 * Get ButtonGroup component default props
 */
Popovers.defaultProps = $.extend({}, Component.defaultProps, {
    direction: 'right',
    custom: false
});