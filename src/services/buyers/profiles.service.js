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

  getBuyerProfile( accountname, session ) {
    if (!accountname)
      throw new Error("accountname is required in ProfilesService.getBuyerProfile");

    if(!session)
      throw new Error("session is required in ProfilesService.getBuyerProfile");

    return this.get({
      endpoint: this.getBuyersProfilePath(accountname),
      session: session
    });
  }

  updateBuyerProfile( userData, accountname, session ) {
    if(!userData)
      throw new Error("userData is required in ProfilesService.updateBuyerProfile")

    if (!accountname)
      throw new Error("accountname is required in ProfilesService.updateBuyerProfile");

    if(!session)
      throw new Error("session is required in ProfilesService.updateBuyerProfile");

    return this.patch({
      endpoint: this.getBuyersUpdateProfilePath(accountname),
      data: userData,
      session: session
    });
  }
}
