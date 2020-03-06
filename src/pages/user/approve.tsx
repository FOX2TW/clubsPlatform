import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import dayjs from "dayjs";
import { AtIcon } from "taro-ui";
import "./approve.scss";

type PageStateProps = {};
type PageDispatchProps = {};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface Approve {
  props: IProps;
}

class Approve extends Component {
  config: Config = {
    navigationBarTitleText: "我的审批"
  };

  state = {
    list: [
      {
        type: 1,
        id: "1",
        approve_menber: "Bob",
        clubs: {
          id: "11",
          name: "足球俱乐部",
          description:
            "力争软甲冠军,替代中超，进军欧冠,力争软甲冠军,替代中超，进军欧冠"
        },
        date: 1583461237040
      },
      {
        type: 2,
        id: "2",
        approve_menber: "迪丽热巴",
        reson: "能歌善舞又漂亮",
        date: 1583461237040,
        clubs: {
          id: "222",
          name: "羽毛球俱乐部"
        }
      }
    ]
  };

  renderClubApproveCard = item => {
    return (
      <View className="card">
        <View className="card-title-wrap">
          <View>
            <AtIcon
              prefixClass="icon"
              value="chuangjian"
              size="15"
              color="#F00"
            />
            <Text className="title">俱乐部创建</Text>
          </View>
          <Text className="extra">{dayjs(item.date).format("YYYY-MM-DD")}</Text>
        </View>
        <View className="card-content">
          <View className="text-wrapper">
            <Text className="label">创建人：</Text>
            <Text className="text">{item.approve_menber}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">俱乐部名称：</Text>
            <Text className="text">{item.clubs.name}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">俱乐部描述：</Text>
            <Text className="text">{item.clubs.description}</Text>
          </View>
        </View>
        <View className="card-actions">
          <Button className="btn">拒绝</Button>
          <Button className="btn">同意</Button>
        </View>
      </View>
    );
  };

  renderMemberApproveCard = item => {
    return (
      <View className="card">
        <View className="card-title-wrap">
          <View>
            <AtIcon
              prefixClass="icon"
              value="jiaru"
              size="15"
              color="#6190E8"
            />
            <Text className="title">会员加入</Text>
          </View>
          <Text className="extra">{dayjs(item.date).format("YYYY-MM-DD")}</Text>
        </View>
        <View className="card-content">
          <View className="text-wrapper">
            <Text className="label">申请人：</Text>
            <Text className="text">{item.approve_menber}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">申请俱乐部：</Text>
            <Text className="text">{item.clubs.name}</Text>
          </View>
          <View className="text-wrapper">
            <Text className="label">申请理由：</Text>
            <Text className="text">{item.reson}</Text>
          </View>
        </View>
        <View className="card-actions">
          <Button className="btn">拒绝</Button>
          <Button className="btn">同意</Button>
        </View>
      </View>
    );
  };

  render() {
    const { list } = this.state;
    return (
      <View className="approve-container">
        {list.map(item => (
          <View key={item.id}>
            {item.type === 1 && this.renderClubApproveCard(item)}
            {item.type === 2 && this.renderMemberApproveCard(item)}
          </View>
        ))}
      </View>
    );
  }
}

export default Approve as ComponentClass<PageOwnProps, PageState>;
