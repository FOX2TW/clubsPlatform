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

import { find } from "lodash";
import { ClubList, Activity, Club } from "@/types/index";
import { createActivity } from "@/actions/activity";
import DatePicker from "@/components/DatePicker/index";

import "./form.scss";

const dateFormat = (value, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(format);
};

type PageStateProps = {
  myClubs: ClubList;
};
type PageDispatchProps = {
  createActivity: (data: Activity) => any;
};
type PageOwnProps = {};
type PageState = {};
type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
interface ActivityForm {
  props: IProps;
}

@connect(
  ({ clubs }) => ({
    myClubs: clubs.myClubs
  }),
  dispatch =>
    bindActionCreators({ createActivity } as PageDispatchProps, dispatch)
)
class ActivityForm extends Component {
  config: Config = {
    navigationBarTitleText: "活动发布"
  };

  state = {
    open: true,
    isLimit: false,
    picture: "",
    name: "",
    type: "",
    description: "",
    address: "",
    files: [],
    startDate: "",
    endDate: "",
    endJoinDate: "",
    limit: Infinity
  };

  get currentClub() {
    const { id } = this.$router.params;
    const { myClubs } = this.props;
    return find(myClubs, club => club.id === Number(id)) as Club;
  }

  onSubmit = () => {
    const { id = Infinity } = this.currentClub;
    const { isLimit, limit } = this.state;
    const data: Activity = {
      clubId: id,
      name: this.state.name,
      picture: this.state.picture,
      endJoinDate: dateFormat(this.state.endJoinDate),
      startDate: dateFormat(this.state.startDate),
      endDate: dateFormat(this.state.startDate),
      limit: isLimit ? Number(!isLimit) : limit,
      description: this.state.description,
      open: this.state.open,
      thumbsUp: 0
    };
    this.props.createActivity(data);
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
    this.setState({ files, picture: files[0].url });
  };

  onFileFail = mes => {
    console.log(mes);
  };

  render() {
    const { name, description, files, open, limit, isLimit } = this.state;

    return (
      <View className="activity-form-container">
        <AtMessage />
        <AtForm onSubmit={this.onSubmit}>
          <View className="form-extra">
            <Text className="label">俱乐部：</Text>
            <Text className="text">{this.currentClub.name}</Text>
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
            <DatePicker onChange={this.startDateChange} />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">结束时间：</Text>
            </View>
            <DatePicker onChange={this.endDateChange} />
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">报名截止时间：</Text>
            </View>
            <DatePicker onChange={this.endJoinDateChange} />
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
                { label: "公开", value: true },
                { label: "不公开", value: false }
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
            发布活动
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default ActivityForm as ComponentClass<PageOwnProps, PageState>;
