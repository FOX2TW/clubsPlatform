import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import "./change.scss";

type IProps = {};
interface Setting {
  props: IProps;
}

class Setting extends Component {
  config: Config = {
    navigationBarTitleText: "切换用户"
  };
  state = {
    value: ""
  };
  onChange = value => {
    this.setState({ value });
  };

  submit = () => {
    Taro.setStorageSync("userId", this.state.value);
    Taro.navigateBack();
  };
  render() {
    return (
      <View className="change-container">
        <Text>当前用户：1，2，3</Text>
        <AtInput
          name="value"
          value={this.state.value}
          onChange={this.onChange}
          type="text"
          style={{ border: "1px solid red" }}
        />
        <AtButton type="primary" onClick={this.submit}>
          切换
        </AtButton>
      </View>
    );
  }
}

export default Setting as ComponentClass<IProps>;
