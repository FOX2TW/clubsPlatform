import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {ComponentClass} from "react";
import {AtButton, AtForm, AtInput, AtTextarea} from "taro-ui";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {
  // users: Array<User>
  isManager: boolean
};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ClubInfoEdit {
  props: IProps
}

class ClubInfoEdit extends Component {

  config: Config = {
    navigationBarTitleText: "俱乐部信息编辑"
  };

  state={
    name: '',
    // picture: '',
    type: '',
    introduction: ''
  };

  isManager = true;

  baseInfo={
    name: '篮球俱乐部',
    type:'运动',
    introduction: '篮球是中国青少年最喜爱的体育运动之一,中国有着不错的的篮球迷数量，他们关注篮球，并投身到火热的篮球场上去，亲身体验篮球运动带来的快乐，尤其是广大青少年朋友，更是篮球运动的爱好者，因此，篮球在我们国家有着良好的青少年群众基础。'
  };

  handleChange (value) {
    this.setState({
      value
    });
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  render() {
    return (
      <View className='users-container'>
          <AtForm>
            <AtInput
              name='value1'
              title='俱乐部名称'
              type='text'
              placeholder={this.baseInfo.name}
              value={this.state.name}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name='value1'
              title='类型'
              type='text'
              placeholder={this.baseInfo.type}
              value={this.state.type}
              onChange={this.handleChange.bind(this)}
            />
            <View style='padding: 15px 0 15px 15px;'>简介</View>
            <AtTextarea
              placeholder={this.baseInfo.introduction}
              value={this.state.introduction}
              onChange={this.handleChange.bind(this)}
            />
          </AtForm>
        <AtButton type='primary' customStyle='margin-top: 10px;'>提交</AtButton>
      </View>
    )
  }
}

export default ClubInfoEdit as ComponentClass<PageOwnProps, PageState>
