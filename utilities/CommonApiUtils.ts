import type { APIRequestContext } from "@playwright/test";

import apiPathData from "../data/api-data/api-path-data.json";
import Commonutils from "./CommonUtils";

export default class CommonApiUtils {
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  public async createToken({}) {
    const utils = new Commonutils();
    const decryptUserName = utils.decryptData(process.env.USERNAME_TOKEN!);
    const decryptPassword = utils.decryptData(process.env.PASSWORD_TOKEN!);

    const respData = await this.request.post(apiPathData.auth_path, {
      data: {
        username: decryptUserName,
        password: decryptPassword,
      },
    });
    const tokenJson = await respData.json();
    console.log("Token:", await respData.json());
    return tokenJson.token;
  }
}
