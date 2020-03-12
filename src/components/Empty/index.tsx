import Taro, { PureComponent } from "@tarojs/taro";
import { Text, View, Image } from "@tarojs/components";
import { ComponentClass } from "react";

import "./index.scss";

type IProps = {
  text?: string;
};
interface Empty {
  props: IProps;
}

class Empty extends PureComponent {
  render() {
    return (
      <View className="empty">
        <Image className="img" src={require("@/images/empty.png")} />
        <Text>{this.props.text || "还没有列表哟"}</Text>
      </View>
    );
  }
}

export default Empty as ComponentClass<IProps>;
