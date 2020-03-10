export default {
  ping: "/api/ping",
  getClubs: "/api/club",
  createClub: "/api/club",
  updateClub: "/api/club",
  getClubType: "/api/club/type",
  deleteClubMember: "/api/club/<clubId>/member/<userId>",
  getClubDetailInfo: "/api/club/<clubId>",
  getInvolvedClubs: "/api/club/user/<userId>",
  getInvolvedActivities: "/api/activity/user/<userId>",
  getUserInfo: "/api/user/<userId>",
  createActivity: "/api/activity",
  getActivities: "/api/activity/list/visible",
  getActivityDetail: "/api/activity/<activityId>",
  // 我的申请
  getClubApply: "/api/club/application",
  getJoinClubApply: "/api/club/join/application",
  // 我的审批
  getClubApprove: "/api/club/application/admin",
  getJoinClubApprove: "/api/club/application/manager",
  approveClub: "/api/club/process",
  approveJoinClub: "/api/club/member",

  joinClub: "/api/club/join",
  joinActivity: "/api/activity/<activityId>/join",
  cancelJoinActivity: "/api/activity/<activityId>/cancelJoining"
};
