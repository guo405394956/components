import React from 'react'
import PropTypes from 'prop-types'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
// import Transfer from 'antd/lib/Transfer'
import message from 'antd/lib/message'
import Select from 'antd/lib/select'
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver'
import classNames from 'classnames'
import SubmitForm from '../BaseForm'
import FormItem from '../FormItem'
import Permission from '../Permission'
// import './AdvancedSearch.less'

const Option = Select.Option


export default class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    defKeyType:null,
    placeHolder:"",
    items:[],
    show:false,
    displayItem:[]
  }

  constructor(props) {
    super(props);
    this.state.loading=props.loading
  }

  handleSearch = (e,values) => {
    e.preventDefault()
    let {filterSubmitHandler} = this.props
    if(values){
      filterSubmitHandler.call(this,values);
    }else{
      this.form.validateFieldsAndScroll((err, values) => {
        // console.log(this.form.getFieldsValue())
        // console.log(values)
        filterSubmitHandler.call(this,values);
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loading !== this.props.loading){
      this.setState({
        loading:nextProps.loading
      })
    }
  }

  handleReset = () => {
    const form=this.form
    const values=form.getFieldsValue();
    let emptyValue={}
    // this.form.resetFields();
    for(var v in values){
      // console.log(v)
      if(values.hasOwnProperty(v)){
        emptyValue[v]=undefined
      }
    }
    // console.log(emptyValue)
    form.setFieldsValue(emptyValue)
  }

  toggleExpand = () => {
    const {expand} = this.state;
    this.setState({
      expand: !expand
    });
  }

  // To generate mock Form.Item
  getFields() {
    const {children,layout,classNames} = this.props
    let renderChildren;
    const formItemLayout = layout && layout!=='inline'? {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    }:{};
    if(React.Children.count(children)===0){
      return (null)
    }
    // if(this.state.expand==false ){
    //   renderChildren = children.filter((ch,idx)=>idx<3)
    // }else if(this.props.showConfig){  //高级配置后，前三固定 后四配置
    if(this.props.showConfig){  //高级配置后，前三固定 后四配置
      renderChildren = React.Children.toArray(children).filter((ch,idx)=>{
        //return this.state.displayItem.indexOf(ch.props.name)>=0 || idx<3
        return this.state.displayItem.indexOf(ch.props.name)>=0 || idx < this.props.showExpand
      })
    }else{
      renderChildren = React.Children.toArray(children).filter((ch,idx)=>idx< (this.props.showExpand + 4) )
    }
    return renderChildren.map((it, i) => {
      return (
        <Col span={8} key={i}>
          <FormItem colon={true} {...formItemLayout} containerTo={false} className={classNames}>
            {React.cloneElement(it) }
          </FormItem>
        </Col>
      )
    })
    //return children;
  }

  onTypeChange(value,option){
    this.setState({
      placeHolder:option.props.placeholder
    })
  }
  handleAdvancedMenu(obj) {
    if (obj.key === 'advanced') {
      alert("call advanced")
    } else if (obj.key === 'clear') {
      this.handleReset()
    } else if (obj.key === 'preview') {
      alert("call restore")
    }
  }

  handleClose(){
    this.setState({
      show:false
    })
  }
  saveFormRef(insta) {
    if(insta){
      this.form = insta.props.form;
    }
  }

  renderKeyword(){
    return (
      <Row gutter={20}>
        {/* this.renderKeyCatalog() */}
        { this.getFields()}
      </Row>
    )
  }
  render() {
    let {showConfig,children,className,autoSubmitForm,layout,locale} = this.props
    let {loading} = this.state
    return (
      <div className={classNames("advanced-search-panel",className)}>
        <SubmitForm layout={layout} autoSubmitForm={autoSubmitForm} className="advanced-search-form" onSubmit={this.handleSearch.bind(this)} wrappedComponentRef={this.saveFormRef.bind(this)}>
          { this.renderKeyword() }
          <div className="advanced-search-toolbar">
							<Button htmlType="submit" disabled={loading} onClick={this.handleSearch.bind(this)} type="primary">{locale.searchText}</Button>
							<Button htmlType="reset" onClick={this.handleReset.bind(this)}>{locale.resetText}</Button>
          </div>
        </SubmitForm>
      </div>
    );
  }
}

AdvancedSearchForm.propTypes = {
  filterSubmitHandler: PropTypes.func,
  showConfig:PropTypes.bool,
  loading:PropTypes.bool,
  footer:PropTypes.element,
  locale:PropTypes.object,
  showExpand:PropTypes.number
}

AdvancedSearchForm.defaultProps = {
  autoSubmitForm:false,
  showConfig:false,
  loading:false,
  locale:{
    searchText:"搜索",
    resetText:"重置"
  },
  filterSubmitHandler: function() {},
	showExpand:3,
	layout:'horizontal'
}

//export default AdvancedSearchForm = Form.create()(AdvancedSearchForm)
