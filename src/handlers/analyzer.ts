import { parseLine, parseQueryDate } from "@helpers/parser";
import { CookieAnalytics } from "@models/cookie_analytics";
import { once } from "events";
import { createReadStream, read } from "fs";
import path from "path";
import { createInterface, Interface } from "readline";
import * as csv from "@fast-csv/parse";
/**
 *
 * @param fileName input filename
 * @param queryDate QueryDate for which we have to check frequency
 * @returns json object of time taken to process, max frequency found for the given query and list of cookies
 *
 * `Ignoring headers validation for now`
 * Using file streams to process the file
 * Break the stream when the processed line date goes below the query date
 * since dates will be in descending order
 */
export async function analyzeFile(fileName: string, queryDate: string) {
  try {
    const readLine: Interface = createInterface({
      input: createReadStream(fileName),
      crlfDelay: Infinity,
    });
    let startTime: number = new Date().getTime();
    let queryEpoch: number = parseQueryDate(queryDate);
    let cookieAnalyzer: CookieAnalytics = new CookieAnalytics(queryEpoch);
    readLine.on("line", (line) => {
      try {
        let [cookie, epoch]: any[] = parseLine(line);
        // add cookie if epoch matches with queryEpoch
        if (epoch === queryEpoch) {
          cookieAnalyzer.addCookie(cookie);
        }

        // remove listeners after epoch goes below queryEpoch
        if (epoch < queryEpoch) {
          readLine.close();
          readLine.removeAllListeners();
        }
      } catch {
        // ignore the line with wrong timestamp
      }
    });
    await once(readLine, "close");
    let completionTime: number = new Date().getTime();
    let [frequency, frequentCookies] =
      cookieAnalyzer.getTopCookiesByFrequency();
    return {
      timeElapsed: completionTime - startTime,
      frequency: frequency,
      frequentCookies: frequentCookies,
    };
  } catch (err) {
    throw new Error("File Issue");
  }
}
