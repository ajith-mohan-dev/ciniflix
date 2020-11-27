import ApiConstants from '../ApiConstants';
import Api from '../index';
export default function getJob(
  token,
  pageNo,
  size,
  facilityCode,
  blockId,
  levelId,
  statusId,
  search,
) {
  console.log(
    'getJob',
    'params = ' +
      ApiConstants.GETJOB +
      '?pageNo=' +
      pageNo +
      '&size=' +
      size +
      '&FacilityCode=' +
      facilityCode +
      '&BlockId=' +
      blockId +
      '&LevelIds=' +
      JSON.stringify(levelId) +
      '&StatusIds=' +
      JSON.stringify(statusId) +
      '&Search=' +
      search,
    null,
    'get',
    token,
  );
  return Api(
    ApiConstants.GETJOB +
      '?pageNo=' +
      pageNo +
      '&size=' +
      size +
      '&FacilityCode=' +
      facilityCode +
      '&BlockId=' +
      blockId +
      '&LevelIds=' +
      JSON.stringify(levelId) +
      '&StatusIds=' +
      JSON.stringify(statusId) +
      '&Search=' +
      search,
    null,
    'get',
    token,
  );
}
