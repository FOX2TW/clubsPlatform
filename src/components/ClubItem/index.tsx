import Taro, { Component, Config } from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtAvatar, AtTag } from "taro-ui";
import { Club } from "@/types/index";
import { get } from "@/utils/tools";

import "./index.scss";

type IProps = {
  club: Club;
  isNotMyClub: boolean;
  onClick: () => void;
};
interface ClubItem {
  props: IProps;
}

class ClubItem extends Component {
  config: Config = {
    navigationBarTitleText: "详情"
  };

  render() {
    const club = get(this.props, "club", {});
    const { isJoin, isManager } = club;
    return (
      <View className="item-container" onClick={this.props.onClick}>
        <AtAvatar image={club.picture} text="俱" />
        <View className="body">
          <View className="top">
            <Text className="name">{club.name}</Text>
            <View className="tags">
              {isJoin &&
                this.props.isNotMyClub &&
                !get(club, "isManager", false) && (
                  <AtTag className="tag" size="small" circle active>
                    已加入
                  </AtTag>
                )}
              {isManager && (
                <AtTag className="tag" size="small" circle active>
                  管理员
                </AtTag>
              )}
            </View>
          </View>
          <View className="bottom">
            <Text className="desc">{club.introduction}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ClubItem as ComponentClass<IProps>;
