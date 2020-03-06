import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import {
  AtIcon,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput
} from "taro-ui";

import "./setting.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Setting {
  props: IProps;
}

class Setting extends Component {
  config: Config = {
    navigationBarTitleText: "设置"
  };

  state = {
    isShowModal: false,
    nickName: ""
  };

  openModal = () => {
    this.setState({ isShowModal: true });
  };

  closeModal = () => {
    this.setState({
      isShowModal: false
    });
  };

  onChange = nickName => {
    this.setState({ nickName });
  };

  render() {
    return (
      <View className="setting-container">
        <View className="item" onClick={this.openModal}>
          <Text className="title">昵称</Text>
          <View className="extra">
            <Text>Jiaxin</Text>

            <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
          </View>
        </View>
        <View className="item">
          <Text className="title"> 头像</Text>
          <View className="extra">
            <Image src={""} className="thumb" />
            <AtIcon value="chevron-right" size="20" color="#c8c8c8" />
          </View>
        </View>
        <AtModal isOpened={this.state.isShowModal}>
          <AtModalHeader>修改昵称</AtModalHeader>
          <AtModalContent>
            <AtInput
              clear
              type="text"
              name=""
              placeholder="请输入昵称"
              value={this.state.nickName}
              onChange={this.onChange}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeModal}>取消</Button>{" "}
            <Button>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}

export default Setting as ComponentClass<PageOwnProps, PageState>;
