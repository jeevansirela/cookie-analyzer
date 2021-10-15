#!/usr/bin/env node
import "module-alias/register";
import { Command, OptionValues } from "commander";
import { analyzeFile } from "@handlers/analyzer";

/**
 * Handler function for the command analayze-cookie
 *
 * TODO:
 * Add -n flag to just give n number of files as output
 * Add -k flag to get top k most frequent cookies
 * With -n flag if the output lines are high, save it to a file
 */
export const processCookieFile = () => {
  const program = new Command();
  program
    .option("-de, --debug", "output extra debugging")
    .option("-f, --file <string>", "cookie file")
    .option("-d, --date <string>", "date");

  program.parse(process.argv);
  const options: OptionValues = program.opts();

  analyzeFile(options.file, options.date)
    .then((result: any) => {
      for (let cookie of result.frequentCookies) {
        console.log(cookie);
      }
      console.log(`File processed in ${result.timeElapsed}`);
    })
    .catch((err) => console.log(err.message));
};
// restricting callable through this module not by importing to other modules
if (require.main === module) {
  processCookieFile();
}

// catch any uncaught exceptions here
process.on("uncaughtException", function (err) {
  console.log(err.message);
});
