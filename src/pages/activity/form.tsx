import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { bindActionCreators } from "redux";
import { View, Text, Picker } from "@tarojs/components";
import {
  AtForm,
  AtInput,
  AtButton,
  AtImagePicker,
  AtRadio,
  AtTextarea,
  AtIcon,
  AtSwitch
} from "taro-ui";
import cls from "classnames";
import { find } from "lodash";
import { ClubList, Activity, Club } from "@/types";
import { createActivity } from "@/actions/activity";

import "./form.scss";

type PageStateProps = {
  myClubs: ClubList;
};
type PageDispatchProps = {
  createActivity: (data: Activity) => void;
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
  dispatch => bindActionCreators({ createActivity }, dispatch)
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
    limit: ""
  };

  get currentClub(): Club {
    const { id } = this.$router.params;
    const { myClubs } = this.props;
    return find(myClubs, club => club.id === Number(id));
  }

  onSubmit = () => {
    const { id, name } = this.currentClub;
    const data = {
      clubId: id,
      clubName: name,
      name: this.state.name,
      picture: this.state.picture,
      endJoinDate: this.state.endJoinDate,
      startDate: this.state.startDate,
      endDate: this.state.startDate,
      limit: this.state.limit,
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

  startDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

  endDateChange = e => {
    this.setState({ endDate: e.target.value });
  };

  endJoinDateChange = e => {
    this.setState({ endJoinDate: e.target.value });
  };

  limitInputChange = limit => {
    this.setState({ limit });
  };

  onFileChange = files => {
    this.setState({
      files
    });
  };
  onFileFail = mes => {
    console.log(mes);
  };

  render() {
    const {
      name,
      description,
      files,
      endDate,
      endJoinDate,
      startDate,
      open,
      limit,
      isLimit
    } = this.state;

    return (
      <View className="activity-form-container">
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
            <Picker
              mode="date"
              start="1999-01-01"
              end="2100-01-01"
              value={startDate}
              onChange={this.startDateChange}
            >
              <View className="date-picker">
                <Text className={cls({ placeholder: !startDate })}>
                  {startDate || "请选择时间"}
                </Text>
                <AtIcon value="calendar" size="20" color="#6190E8" />
              </View>
            </Picker>
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">结束时间：</Text>
            </View>
            <Picker
              mode="date"
              start="1999-01-01"
              end="2100-01-01"
              value={endDate}
              onChange={this.endDateChange}
            >
              <View className="date-picker">
                <Text className={cls({ placeholder: !endDate })}>
                  {endDate || "请选择时间"}
                </Text>
                <AtIcon value="calendar" size="20" color="#6190E8" />
              </View>
            </Picker>
          </View>

          <View className="form-item">
            <View className="label-wrap">
              <Text className="required">*</Text>
              <Text className="label">截止时间：</Text>
            </View>
            <Picker
              mode="date"
              start="1999-01-01"
              end="2100-01-01"
              value={endJoinDate}
              onChange={this.endJoinDateChange}
            >
              <View className="date-picker">
                <Text className={cls({ placeholder: !endJoinDate })}>
                  {endJoinDate || "请选择时间"}
                </Text>
                <AtIcon value="calendar" size="20" color="#6190E8" />
              </View>
            </Picker>
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
                value={limit}
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
