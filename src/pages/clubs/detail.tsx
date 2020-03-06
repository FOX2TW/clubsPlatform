import Taro, {Component, Config} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {ComponentClass} from "react";
import {AtAvatar, AtCard, AtFab, AtList, AtListItem} from "taro-ui";
import "./detail.scss";

class Detail extends Component {

  config: Config = {
    navigationBarTitleText: "详情"
  };

  render() {
    return (
      <View className='detail-container'>
        <Image className='at-row' src={require('./../../assets/images/club/clubBackground.jpg')} />

        <AtCard className='base-info'
          note='篮球是中国青少年最喜爱的体育运动之一
            中国有着不错的的篮球迷数量，他们关注篮球，并投身到火热的篮球场上去，亲身体验篮球运动带来的快乐，
            尤其是广大青少年朋友，更是篮球运动的爱好者，因此，篮球在我们国家有着良好的青少年群众基础。'
          title='篮球俱乐部'
          thumb={require('./../../assets/images/club/avatar.jpg')}
        >
        </AtCard>

        <AtCard
          title='会员'
          extra='所有会员'
          // thumb={require('./../../assets/images/club/avatar.jpg')}
        >
          <View className='avatars'>
            <AtAvatar className='avatar' circle image={require('./../../assets/images/club/avatar.jpg')} />
            <AtAvatar className='avatar' circle image={require('./../../assets/images/club/avatar_java.jpg')} />
            <AtAvatar className='avatar' circle image={require('./../../assets/images/club/avatar.jpg')} />
            <AtAvatar className='avatar' circle image={require('./../../assets/images/club/avatar_java.jpg')} />
          </View>
        </AtCard>

        <AtCard
          title='活动'
          extra='历史活动'
          // thumb={require('./../../assets/images/club/avatar.jpg')}
        >
          <View className='activity'>
            <AtList>
              <AtListItem title='活动1' onClick={()=> console.log("跳转到活动详情")} />
              <AtListItem title='活动2' arrow='right' />
              <AtListItem title='活动2' extraText='详细信息' />
              <AtListItem title='活动2' disabled extraText='详细信息' />
            </AtList>
          </View>
        </AtCard>
        <View className='add'>
          <AtFab  onClick={()=> console.log("点击申请加入")}>
            <Text className='at-fab__icon at-icon at-icon-add'></Text>
          </AtFab>
        </View>
      </View>

    );
  }
}

export default Detail as ComponentClass
