import { CookieAnalytics } from "@models/cookie_analytics";
import { CookieAnalyticsBuilder } from "@builders/CookieAnalyticsBuilder";

test("Check Cookie Analysis object initialization with correct attributes", () => {
  let cookieAnalytics = new CookieAnalytics(11234);
  expect(cookieAnalytics.epoch).toBe(11234);
});

test("Add One Cookie and check FrequencyMap and maxFrequency", () => {
  let cookieAnalytics = new CookieAnalytics(1234);
  cookieAnalytics.addCookie("test-cookie");
  expect(cookieAnalytics.getMaxFrequencyList()).toContain("test-cookie");
  expect(cookieAnalytics.getMaxFrequencyList()).toHaveLength(1);
  expect(cookieAnalytics.getFrequencyMap()).toHaveProperty("test-cookie");
  expect(cookieAnalytics.getFrequencyMap()).toMatchObject({ "test-cookie": 1 });
});

test("Add cookie with less frequency than max frequency and check the frequency map updation and no change in frequency list", () => {
  let customCookieAnalytics = new CookieAnalyticsBuilder(123)
    .AddCookie("test-cookie1", 2)
    .AddCookie("test-cookie2", 3)
    .AddCookie("test-cookie3", 4)
    .build();
  customCookieAnalytics.addCookie("test-cookie0");
  expect(customCookieAnalytics.getMaxFrequency()).toEqual(4);
  expect(customCookieAnalytics.getMaxFrequencyList()).toContain("test-cookie3");
  expect(customCookieAnalytics.getMaxFrequencyList()).toHaveLength(1);
  expect(customCookieAnalytics.getFrequencyMap()).toHaveProperty(
    "test-cookie0"
  );
  expect(customCookieAnalytics.getFrequencyMap()).toMatchObject({
    "test-cookie0": 1,
  });
});

test("Add cookie with same frequency as max frequency and check the frequency map updation and change in frequency list", () => {
  let customCookieAnalytics = new CookieAnalyticsBuilder(123)
    .AddCookie("test-cookie1", 1)
    .AddCookie("test-cookie2", 2)
    .build();
  customCookieAnalytics.addCookie("test-cookie3");
  customCookieAnalytics.addCookie("test-cookie3");
  expect(customCookieAnalytics.getMaxFrequency()).toEqual(2);
  expect(customCookieAnalytics.getMaxFrequencyList()).toHaveLength(2);
  expect(customCookieAnalytics.getMaxFrequencyList()).toContain("test-cookie3");
  expect(customCookieAnalytics.getMaxFrequencyList()).toContain("test-cookie2");
  expect(customCookieAnalytics.getFrequencyMap()).toMatchObject({
    "test-cookie3": 2,
  });
});

test("Add cookie with higher frequency than max frequency and check the frequency map updation and change in frequency list", () => {
  let customCookieAnalytics = new CookieAnalyticsBuilder(123)
    .AddCookie("test-cookie1", 1)
    .AddCookie("test-cookie2", 2)
    .build();
  customCookieAnalytics.addCookie("test-cookie3");
  customCookieAnalytics.addCookie("test-cookie3");
  customCookieAnalytics.addCookie("test-cookie3");
  expect(customCookieAnalytics.getMaxFrequency()).toEqual(3);
  expect(customCookieAnalytics.getMaxFrequencyList()).toHaveLength(1);
  expect(customCookieAnalytics.getMaxFrequencyList()).toContain("test-cookie3");
  expect(customCookieAnalytics.getFrequencyMap()).toMatchObject({
    "test-cookie3": 3,
  });
});
