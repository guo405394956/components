import React, { Component } from "react";
import { Collapse } from "antd";
import PropTypes from "prop-types";
import FormItem from "../FormItem/index";

import "./index.less";
const Panel = Collapse.Panel;

export default class CollapsePanel extends Component {
  state = {
    active: true
  };
  static contextTypes = {
    formRef: PropTypes.object
  };
  componentDidMount() {
    this.setActiveStatus();
  }
  componentWillReceiveProps() {
    this.setActiveStatus();
  }
  setActiveStatus() {
    const { control } = this.props;
    this.setState({
      active: this.isExtraIsReactDom(control) ? this.fieldValueChange() : true
    });
  }
  fieldValueChange() {
    const { formRef } = this.context;
    const { control, closeValues } = this.props;
    /**
     * closeValues 关闭值数组【默认为空数组】
     * 若closeValues 传入则判断值是否在该数组中 存在则返回false
     * 若未传入则值转boolean
     */
    return closeValues.length
      ? closeValues.filter(
          it => it === formRef.getFieldValue(control.props.name)
        ).length === 0
      : Boolean(formRef.getFieldValue(control.props.name));
  }
  isExtraIsReactDom(extra) {
    return typeof extra === "object" && typeof extra.$$typeof === "symbol";
  }

  renderHeader() {
    let { title } = this.props;
    return (
      <div className="CollapsePanel-header">
        <h5 className="CollapsePanel-title">
          {title}
          <div className="CollapsePanel-extra">{this.renderExtra()}</div>
        </h5>
      </div>
    );
  }
  renderExtra() {
    let { control } = this.props;
    return this.isExtraIsReactDom(control)
      ? React.createElement(FormItem, {}, control)
      : control;
  }
  render() {
    const { children, title, control, ...otherProps } = this.props;
    let { active } = this.state;
    /**
     * fixed ：如果children 没传  则不论active为什么  都不显示body
     */
    return (
      <Panel
        header={this.renderHeader()}
        {...otherProps}
        isActive={children ? active : false}
      >
        {children}
      </Panel>
    );
  }
}

CollapsePanel.propTypes = {
  closeValues: PropTypes.array
};
CollapsePanel.defaultProps = {
  closeValues: [],
  prefixCls: "ant-collapse"
};
