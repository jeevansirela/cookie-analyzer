import { CookieAnalytics } from "@models/cookie_analytics";

/**
 * CookieAnalyticsBuilder - Builder Class to help testing
 *
 * Helps by generating custom cookie_analytics objects
 */
export class CookieAnalyticsBuilder {
  private readonly _cookieAnalytics: CookieAnalytics;

  constructor(epoch: number) {
    this._cookieAnalytics = new CookieAnalytics(epoch);
  }

  /**
   *
   * @param cookie input cookie
   * @param frequency add cookie these many times
   * @returns cookie_analytics object
   */
  AddCookie(cookie: string, frequency: number) {
    for (let counter = 0; counter < frequency; counter++) {
      this._cookieAnalytics.addCookie(cookie);
    }
    return this;
  }

  build(): CookieAnalytics {
    return this._cookieAnalytics;
  }
}
