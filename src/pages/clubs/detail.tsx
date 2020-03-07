import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {ComponentClass} from "react";
import {AtAvatar, AtButton, AtCard, AtList, AtListItem} from "taro-ui";
import "./detail.scss";
import {ClubList} from "./model/clubs";

type PageStateProps = {
  clubs: {
    clubs: ClubList
  }
};
type PageDispatchProps = {
  getClubs: () => void
};
type PageOwnProps = {};
type PageState = {
  isManager: boolean
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps
}

class Detail extends Component {

  config: Config = {
    navigationBarTitleText: "详情"
  };

  users = [
    {
      id: 1,
      photo: "jun_li",
      displayName: "Jun Li"
    }, {
      id: 1,
      photo: "hao_lin",
      displayName: "Hao Lin"
    }, {
      id: 1,
      photo: "jiaxin_li",
      displayName: "Jiaxin Li"
    }, {
      id: 1,
      photo: "jiawei_chen",
      displayName: "Jiawei Chen"
    },
  ];

  baseInfo = {
    // 俱乐部名称、定位、创建时间、简介
    name: "篮球俱乐部",
    type: "运动",
    createDate: "2020-3-6",
    introduction: "篮球是中国青少年最喜爱的体育运动之一,中国有着不错的的篮球迷数量，他们关注篮球，并投身到火热的篮球场上去，亲身体验篮球运动带来的快乐，尤其是广大青少年朋友，更是篮球运动的爱好者，因此，篮球在我们国家有着良好的青少年群众基础。"
  };

  navigate = url => () => {
    Taro.navigateTo({url});
  };

  User(user, i) {
    return (
      <View key={i} className='user'>
        <AtAvatar className='avatar' circle
          image={require(`./../../assets/images/user/${user.photo}.png`)}
        />
        <View className='name'>{user.displayName}</View>
      </View>

    )
  }

  state = {
    isManager: true
  };


  render() {
    return (
      <View className='detail-container'>
        <Image className='at-row' src={require('./../../assets/images/club/clubBackground.jpg')} />

        <View>
          <AtButton type='secondary'
            onClick={() => this.setState({isManager: !this.state.isManager})}
          >{this.state.isManager ? '我是管理员' : '我是普通会员'}</AtButton>
        </View>
        <AtCard className='base-info'
          title={this.baseInfo.name}
          thumb={require('./../../assets/images/club/avatar.jpg')}
          extra={this.state.isManager ? '编辑' : ''}
          onClick={() => {
                  console.log("编辑");
                  this.state.isManager ? Taro.navigateTo({url: "/pages/clubs/edit"}) : null
                }}
        >
          <View className='info-list'>
            <View className='text-wrapper'>
              <View className='label' style='align-self: center;'>类别：</View>
              <View className='text' style='align-self: center;'>
                <AtButton type='secondary' customStyle='height: 20px; padding-top:0; line-height: 40rpx;'
                  size='small'
                >{this.baseInfo.type}</AtButton>
              </View>
            </View>
            <View className='text-wrapper'>
              <View className='label'>创建时间：</View>
              <View className='text'>{this.baseInfo.createDate}</View>
            </View>
            <View className='text-wrapper'>
              <View className='label'>简介：</View>
              <View className='text'>{this.baseInfo.introduction}</View>
            </View>

          </View>

        </AtCard>

        <AtCard
          title='会员'
          extra='所有会员'
          // thumb={require('./../../assets/images/club/avatar.jpg')}
          onClick={this.navigate("/pages/clubs/users")}
        >
          <View className='users'>
            {this.users.map((user, i) => this.User(user, i))}
          </View>
        </AtCard>

        <AtCard
          title='活动'
          extra='历史活动'
          // thumb={require('./../../assets/images/club/avatar.jpg')}
        >
          <View className='activity'>
            <AtList>
              <AtListItem title='活动1' onClick={() => console.log("跳转到活动详情")} />
              <AtListItem title='活动2' arrow='right' />
              <AtListItem title='活动2' extraText='详细信息' />
              <AtListItem title='活动2' disabled extraText='详细信息' />
            </AtList>
          </View>
        </AtCard>

      </View>

    );
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>
