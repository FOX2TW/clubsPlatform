import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {connect} from "@tarojs/redux";
import {ComponentClass} from "react";
import {AtAvatar, AtButton, AtCard, AtList, AtListItem} from "taro-ui";
import {getClubDetail} from "./store/actions/clubs.action";
import "./detail.scss";
import {ClubDetail} from "./model/clubs";

type PageStateProps = {
  clubs: {
    clubDetail: ClubDetail
  }
};
type PageDispatchProps = {
  getClubDetail: (id) => void
};
type PageOwnProps = {};
type PageState = {
  isManager: boolean
};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Detail {
  props: IProps
}


@connect(
  ({clubs}) => ({
    clubs
  }),
  dispatch => ({
    getClubDetail(id) {
      dispatch(getClubDetail(id));
    }
  })
)
class Detail extends Component {

  config: Config = {
    navigationBarTitleText: "俱乐部详情"
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

  componentWillMount(): void {
    this.props.getClubDetail(parseInt(this.$router.params['clubId']))
  }


  render() {
    const detail = this.props.clubs.clubDetail;
    console.log(detail);
    return (
      <View className='detail-container'>
        <Image className='at-row' src={require(`./../../assets/images/club/${detail.picture}.jpg`)} />

        <View>
          <AtButton type='secondary'
            onClick={() => this.setState({isManager: !this.state.isManager})}
          >{this.state.isManager ? '我是管理员' : '我是普通会员'}</AtButton>
        </View>
        <AtCard className='base-info'
          title={detail.name}
          // thumb={require(`./../../assets/images/club/${detail.photo}.jpg`)}
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
                >{detail.type}</AtButton>
              </View>
            </View>
            <View className='text-wrapper'>
              <View className='label'>创建时间：</View>
              <View className='text'>{detail.createDate}</View>
            </View>
            <View className='text-wrapper'>
              <View className='label'>简介：</View>
              <View className='text'>{detail.introduction}</View>
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
            {detail.users ? detail.users.map((user, i) => this.User(user, i)) : '还没有会员'}
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
