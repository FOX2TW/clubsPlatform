import Taro, { Component, Config } from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import { ComponentClass } from "react";
import { AtAvatar, AtTag } from "taro-ui";
import { Club } from "@/types/index";

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
    const club = this.props.club;
    return (
      <View className="item-container" onClick={this.props.onClick}>
        {club.photo ? (
          <AtAvatar
            className="avatar"
            circle
            image={require(`./../../assets/images/club/${club.photo}.jpg`)}
          />
        ) : (
          <AtAvatar circle text="俱乐部" />
        )}
        <View className="body">
          <View className="top">
            <Text className="name">{club.name}</Text>
            <View className="tags">
              {club.isJoin && this.props.isNotMyClub ? (
                <AtTag
                  className="tag"
                  size="small"
                  circle
                  type="primary"
                  active
                  disabled
                >
                  已加入
                </AtTag>
              ) : null}
              {club.isManager && (
                <AtTag
                  className="tag"
                  size="small"
                  circle
                  type="primary"
                  active
                  disabled
                >
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
