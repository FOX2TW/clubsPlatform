import Taro, {Component, Config} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import {ComponentClass} from "react";
import {AtAvatar, AtTag} from "taro-ui";
import './item.scss'
import {Club} from "./model/clubs";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {
  club: Club
  isNotMyClub: boolean
  onClick: () => void
};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface ClubItem {
  props: IProps
}

class ClubItem extends Component {

  config: Config = {
    navigationBarTitleText: "详情"
  };

  render() {
    const club = this.props.club;
      return (
        <View className='item-container' onClick={this.props.onClick}>
          {club.picture
            ? <AtAvatar className='avatar' circle image={require(`./../../assets/images/club/${club.picture}.jpg`)} />
            : <AtAvatar circle text='俱乐部' />}
          <View className='body'>
            <View className='top'>
              <Text className='name'>{club.name}</Text>
              <View className='tags'>
                {club.isJoin && this.props.isNotMyClub ?
                  <AtTag className='tag' size='small' circle type='primary' active disabled>已加入</AtTag> : null}
                {club.isManager ?
                  <AtTag className='tag' size='small' circle type='primary' active disabled>管理员</AtTag> : null}
              </View>
            </View>
            <View className='bottom'>
              <Text className='desc'>
                {club.introduction}
              </Text>
            </View>
          </View>
        </View>

      );
  }
}

export default ClubItem as ComponentClass<PageOwnProps, PageState>
