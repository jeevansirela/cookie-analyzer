#!/usr/bin/env node
import "module-alias/register";
import { Command } from "commander";
import { analyzeFile } from "@handlers/analyzer";

/**
 *
 */
export const processCookieFile = () => {
  const program = new Command();
  program
    .option("-de, --debug", "output extra debugging")
    .option("-f, --file <string>", "cookie file")
    .option("-d, --date <string>", "date");

  program.parse(process.argv);
  const options = program.opts();

  analyzeFile(options.file, options.date)
    .then((result: any) => {
      for (let cookie of result.frequentCookies) {
        console.log(cookie);
      }
      console.log(`File processed in ${result.timeElapsed}`);
    })
    .catch((err) => console.log(err.message));
};

if (require.main === module) {
  processCookieFile();
}

// catch any uncaught exceptions here
process.on("uncaughtException", function (err) {
  console.log(err.message);
});
