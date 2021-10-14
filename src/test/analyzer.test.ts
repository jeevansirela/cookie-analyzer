import { analyzeFile } from "@handlers/analyzer";
import * as fs from "fs";
import { mocked } from "ts-jest/utils";

jest.mock("fs");

describe("Check Frequency with just one cookie two times with same date", () => {
  it("should show return 2", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-08")
    ).resolves.toMatchObject({
      frequentCookies: ["fbcn5UAVanZf6UtG"],
      frequency: 2,
    });
  });
});

describe("Check Frequency with same cookie but different dates", () => {
  it("should show return 1", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-08")
    ).resolves.toMatchObject({
      frequency: 1,
      frequentCookies: ["fbcn5UAVanZf6UtG"],
    });
  });
});

describe("Check Frequency with multiple cookies with same date", () => {
  it("should return 2 with both cookies", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\n4sMM2LxV07bPJzwf,2018-12-08T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\n4sMM2LxV07bPJzwf,2018-12-08T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-08")
    ).resolves.toMatchObject({
      frequency: 2,
      frequentCookies: ["fbcn5UAVanZf6UtG", "4sMM2LxV07bPJzwf"],
    });
  });
});

describe("Check Frequency with cookie happening on different dates", () => {
  it("should consider the frequency of only query date", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\n4sMM2LxV07bPJzwf,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-09")
    ).resolves.toMatchObject({
      frequency: 2,
      frequentCookies: ["fbcn5UAVanZf6UtG"],
    });
  });
});

describe("Check Frequency with cookie if dates are in unsorted order", () => {
  it("would neglect the remaining file once the date goes below query date", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-09")
    ).resolves.toMatchObject({
      frequency: 1,
      frequentCookies: ["fbcn5UAVanZf6UtG"],
    });
  });
});

describe("Check once the date goes below query date", () => {
  it("wont consider cookie frequency below it returning zero", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-09")
    ).resolves.toMatchObject({
      frequency: 0,
      frequentCookies: [],
    });
  });
});

describe("Check if always top frequency cookie is coming", () => {
  it("should give the most frequent cookie", async () => {
    const mockStream = require("stream").Readable.from([
      "fbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\n4sMM2LxV07bPJzwf,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\nfbcn5UAVanZf6UtG,2018-12-09T09:30:00+00:00\n4sMM2LxV07bPJzwf,2018-12-09T09:30:00+00:00",
    ]);
    mocked(fs).createReadStream.mockReturnValue(mockStream);
    await expect(
      analyzeFile("any-file-name", "2018-12-09")
    ).resolves.toMatchObject({
      frequency: 3,
      frequentCookies: ["fbcn5UAVanZf6UtG"],
    });
  });
});
