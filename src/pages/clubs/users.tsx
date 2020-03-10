import Taro, {Component, Config} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {ComponentClass} from "react";
import {AtButton, AtModal} from "taro-ui";
import "./users.scss";
import {connect} from "@tarojs/redux";
import {ClubDetail} from "@/types/index";
import {deleteClubMember} from "@/actions/clubs";

type PageStateProps = {
  clubDetail: ClubDetail
};
type PageDispatchProps = {
  deleteClubMember: (userId, clubId) => void
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Users {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    clubDetail: clubs.clubDetail,
  }),dispatch => ({
    deleteClubMember(userId, clubId){
      dispatch(deleteClubMember(userId, clubId))
    }
  })
)
class Users extends Component {
  config: Config = {
    navigationBarTitleText: "用户列表"
  };

  state = {
    selectedUserId: null,
    isOpened: false
  }

  deleteClubMember = () => {
    this.props.deleteClubMember(this.state.selectedUserId, this.props.clubDetail.id);
    this.setState({
      selectedUserId: null,
      isOpened: false
    })
  };

  render() {
    const isManager = this.$router.params["isManager"];
    const users = this.props.clubDetail.members;
    return (
      <View className="users-container">
        {users.map(user => (
          <View key={user.id} className="user">
            <View className="avatar">
              {/* <AtAvatar image={require(`./../../assets/images/user/${user.photo}.png`)} circle/> */}
            </View>
            <View className="user-name">{user.username}</View>
            {isManager && (
              <View className="action">
                <AtButton
                  type="secondary"
                  customStyle="color:red;border-color:red;"
                  size="small"
                  onClick={()=>this.setState({
                    selectedUserId: user.id,
                    isOpened: true
                  })}
                >
                  踢出
                </AtButton>
              </View>
            )}
          </View>
        ))}
        <AtModal
          isOpened={this.state.isOpened}
          title='标题'
          cancelText='取消'
          confirmText='确认'
          onClose={() => this.setState({selectedUserId: null, isOpened: false})}
          onCancel={() => this.setState({selectedUserId: null, isOpened: false})}
          onConfirm={this.deleteClubMember}
          content='是否踢出该会员'
        />
      </View>
    );
  }
}

export default Users as ComponentClass<PageOwnProps, PageState>;
