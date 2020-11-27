/**
 * API constants - API constants, url end points etc.
 */

const ApiConstants = {
  BASE_URL: 'http://119.82.97.221/HotlineApi/api/Hotline/', //UEMSS02883
  BASE_URL_LOGIN: 'https://uetracksg.com/hpbs/sso_uat/api/user/',
  BASE_URL_AUTH: 'http://119.82.97.221/HotlineApi/',

  LOGIN: 'loginmobile',
  VALIDATEUSER: 'ValidateUser',
  EMAILLOGIN: 'emailloginmobile',
  GETJOB: 'GetJob',
  GETLOCATION: 'GetPreferredLocations',
  GETBLOCK: 'GetBlock',
  GETCATEGORY: 'GetCategories',
  GETLEVEL: 'GetLevel',
  GETAREA: 'GetArea',
  GETROOM: 'GetRoom',
  DEFECTJOB: 'SaveDefectjobs',
  HOTLINEJOB: 'SaveHotlinejobs',
  DELETEJOB: 'DeleteJob',
  FAVJOB: 'HighlightJob',
  GETQRLOC: 'getLocationsbyQRCode',
  SENDEMAIL: 'SendEmail',
  NOTIFICATION: 'GetNotificationsList',
  COMMENTLIST: 'GetCommentsbyJob',
  POSTCOMMENT: 'SaveComment',
  UPDATEJOBSTATUS: 'UpdateJobStatus',
  GETSTAFFLIST: 'GetStaffforJob',
  COMPLETEHOTLINEJOB: 'CompleteHotlineJob',
  ACK: 'AcknoledgeHotlineJob',
  AUTHTOKEN: 'token',
  GETSTATISTICS: 'GetStatisticData',
  GETDASHBOARD: 'GetUserDashboardDetails',
  USERIMAGE: 'UpdateUserImage',
  LOGOUT: 'Logout',
};

export default ApiConstants;
