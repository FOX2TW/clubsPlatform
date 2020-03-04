import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./index.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Clubs {
  props: IProps;
}

class Clubs extends Component {
  config: Config = {
    navigationBarTitleText: "俱乐部"
  };

  render() {
    return (
      <View className="index">
        <View>
          <Text>俱乐部</Text>
        </View>
      </View>
    );
  }
}

export default Clubs as ComponentClass<PageOwnProps, PageState>;
