import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { View, Text } from "@tarojs/components";
import dayjs from "dayjs";
import {
  AtForm,
  AtInput,
  AtButton,
  AtImagePicker,
  AtRadio,
  AtTextarea,
  AtSwitch,
  AtMessage
} from "taro-ui";

import { ClubList, Activity, Club, ActivityDetail } from "@/types/index";
import { createActivity, editActivity } from "@/actions/activity";
import DatePicker from "@/components/DatePicker/index";

import "./form.scss";

const dateFormat = (value, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(format);
};

type PageStateProps = {
  myClubs: ClubList;
  activity: {
    [key: string]: ActivityDetail;
  };
};
type PageDispatchProps = {
  createActivity: (data: Activity) => any;
  editActivity: (data: Activity) => any;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface ActivityForm {
  props: IProps;
}

@connect(
  ({ clubs, activity }) => ({
    myClubs: clubs.myClubs,
    activity: activity.activity
  }),
  dispatch =>
    bindActionCreators(
      { createActivity, editActivity } as PageDispatchProps,
      dispatch
    )
)
class ActivityForm extends Component {
  config: Config = {
    navigationBarTitleText: "活动发布"
  };

  state = {
    clubId: Infinity,
    clubName: "",
    open: 1,
    isLimit: false,
    picture: "",
    name: "",
    type: "",
    description: "",
    address: "",
    files: [],
    startDate: 0,
    endDate: 0,
    endJoinDate: 0,
    limit: 0
  };

  componentDidMount() {
    this.initEditPage();
  }

  getCurrentClub = () => {
    const { clubId } = this.$router.params;
    const { myClubs } = this.props;
    const club = myClubs.find(club => club.id === Number(clubId)) as Club;

    this.setState({
      clubName: club.name,
      clubId: club.id
    });
  };

  initEditPage = () => {
    const { activityId } = this.$router.params;
    if (activityId) {
      const activityDetail = this.props.activity[activityId];
      this.setState({
        clubId: activityDetail.clubId,
        clubName: activityDetail.clubName,
        name: activityDetail.name,
        picture: activityDetail.picture,
        endJoinDate: dayjs(activityDetail.endJoinDate).valueOf(),
        startDate: dayjs(activityDetail.startDate).valueOf(),
        endDate: dayjs(activityDetail.endDate).valueOf(),
        limit: activityDetail.limit,
        description: activityDetail.description,
        open: activityDetail.open,
        thumbsUp: activityDetail.thumbsUp,
        isLimit: activityDetail.limit === 0,
        files: [
          {
            url: activityDetail.picture
          }
        ]
      });
    } else {
      this.getCurrentClub();
    }
  };

  onSubmit = async () => {
    const { activityId } = this.$router.params;
    const { isLimit, limit } = this.state;
    Taro.showLoading({ title: "loading..." });
    const data: Activity = {
      clubId: this.state.clubId,
      clubName: this.state.clubName,
      name: this.state.name,
      picture: this.state.picture,
      endJoinDate: dateFormat(this.state.endJoinDate),
      startDate: dateFormat(this.state.startDate),
      endDate: dateFormat(this.state.endDate),
      limit: isLimit ? Number(!isLimit) : limit,
      description: this.state.description,
      open: this.state.open,
      thumbsUp: 0
    };

    if (activityId) {
      const newData = { ...data, activityId };
      await this.props.editActivity(newData);
      Taro.hideLoading();
      Taro.atMessage({
        message: "编辑活动成功",
        type: "success",
        duration: 1000
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 1000);
    } else {
      await this.props.createActivity(data);
      Taro.hideLoading();
      Taro.atMessage({
        message: "发布活动成功",
        type: "success",
        duration: 1000
      });
      setTimeout(() => {
        Taro.switchTab({
          url: "/pages/activity/index"
        });
      }, 1000);
    }
  };
  nameInputChange = name => {
    this.setState({ name });
  };

  introInputChange = e => {
    this.setState({ description: e.target.value });
  };

  switchChange = () => {
    this.setState({ isLimit: !this.state.isLimit });
  };

  radioChange = open => {
    this.setState({ open });
  };

  startDateChange = startDate => {
    this.setState({ startDate });
  };

  endDateChange = endDate => {
    this.setState({ endDate });
  };

  endJoinDateChange = endJoinDate => {
    this.setState({ endJoinDate });
  };

  limitInputChange = limit => {
    this.setState({ limit });
  };

  onFileChange = files => {
    if (files.length > 0) {
      this.setState({
        files,
        picture: files[0].url
      });
    } else {
      this.setState({
        files,
        picture: ""
      });
    }
  };

  onFileFail = mes => {
    console.log(mes);
  };

  render() {
    const {
      name,
      description,
      files,
      open,
      limit,
      isLimit,
      clubName,
      startDate,
      endDate,
      endJoinDate
    } = this.state;
    const { activityId } = this.$router.params;
    return (
      <View className="activity-form-container">
        <AtMessage />
        <AtForm onSubmit={this.onSubmit}>
          <View className="form-extra">
            <Text className="label">俱乐部：</Text>
            <Text className="text">{clubName}</Text>
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">活动名称：</Text>
            </View>
            <AtInput
              name="value"
              type="text"
              placeholder="请输入名称"
              value={name}
              onChange={this.nameInputChange}
            />
          </View>
          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">活动介绍：</Text>
            </View>
            <AtTextarea
              count={true}
              value={description}
              onChange={this.introInputChange}
              maxLength={400}
              placeholder="请输入介绍"
            />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">开始时间：</Text>
            </View>
            <DatePicker onChange={this.startDateChange} value={startDate} />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">结束时间：</Text>
            </View>
            <DatePicker onChange={this.endDateChange} value={endDate} />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">报名截止时间：</Text>
            </View>
            <DatePicker onChange={this.endJoinDateChange} value={endJoinDate} />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">人数限制：</Text>
            </View>
            <View className="limit-wrap">
              <AtInput
                name="value"
                type="number"
                placeholder="请输入人数"
                value={String(limit)}
                onChange={this.limitInputChange}
                disabled={isLimit}
              />
              <View>
                <AtSwitch
                  border={false}
                  title="不限制"
                  checked={isLimit}
                  onChange={this.switchChange}
                />
              </View>
            </View>
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">活动公开：</Text>
            </View>
            <AtRadio
              options={[
                { label: "公开", value: 1 },
                { label: "不公开", value: 0 }
              ]}
              value={open}
              onClick={this.radioChange}
            />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">封面上传：</Text>
            </View>
            <AtImagePicker
              mode="aspectFit"
              length={2}
              showAddBtn={files.length === 0}
              files={this.state.files}
              onChange={this.onFileChange}
              onFail={this.onFileFail}
            />
          </View>

          <AtButton formType="submit" type="primary">
            {activityId ? "编辑活动" : "发布活动"}
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default ActivityForm as ComponentClass<PageOwnProps, PageState>;
