import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

// import "./index.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Approve {
  props: IProps;
}

class Approve extends Component {
  config: Config = {
    navigationBarTitleText: "我的审批"
  };

  render() {
    return (
      <View className="index">
        <View>
          <Text>我的审批</Text>
        </View>
      </View>
    );
  }
}

export default Approve as ComponentClass<PageOwnProps, PageState>;
