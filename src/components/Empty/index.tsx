import Taro, { PureComponent } from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import { ComponentClass } from "react";

import "./index.scss";

type IProps = {};
interface Empty {
  props: IProps;
}

class Empty extends PureComponent {
  render() {
    return (
      <View className="empty">
        <Text>还没有列表哟</Text>
      </View>
    );
  }
}

export default Empty as ComponentClass<IProps>;
