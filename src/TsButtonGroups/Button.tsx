import * as React from 'react';
// import Button from 'antd/es/button';
import {BaseButtonProps} from 'antd/es/button/button';
import {Button} from 'antd';

type CustomButtonProps = BaseButtonProps & {
  actionkey: string;
  tip?: string;
  confirm?: string;
  confirmTitle?: string;
  permission?: boolean;
  disabled?: any;
};

export default class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    const {
      actionkey,
      tip,
      confirm,
      confirmTitle,
      permission,
      ...otherProps
    } = this.props;
    //@ts-ignore
    return <Button {...otherProps} />;
  }
}
