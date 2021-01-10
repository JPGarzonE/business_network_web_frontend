import RequestService from '../requests/request.service.js';

export default class ProfilesService extends RequestService {
  constructor() {
    super();
  }

  getBuyersProfilePath(accountname) {
    return `buyers/${accountname}/profile/`;
  }

  getBuyersUpdateProfilePath(accountname) {
    return `buyers/${accountname}/`;
  }

  getBuyerProfile(accountname, accessToken) {
    if (!accountname)
      throw new Error(
        'accountname is required in ProfilesService.getBuyerProfile'
      );

    let headers = { 'Content-Type': 'application/json' };

    if (accessToken) headers['Authorization'] = 'Token ' + accessToken;

    return this.get(
      this.getBuyersProfilePath(accountname),
      headers,
      null,
      null
    );
  }

  updateBuyerProfile(userData, accountname, accessToken) {
    let headers = { 'Content-Type': 'application/json' };

    if (accessToken) headers['Authorization'] = 'Token ' + accessToken;
    return this.patch(
      this.getBuyersUpdateProfilePath(accountname),
      headers,
      userData
    );
  }
}
