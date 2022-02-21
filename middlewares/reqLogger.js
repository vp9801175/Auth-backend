const chalk = require("chalk");
const _ = require("lodash");

const reqLogger =async (req,res,next) =>{

    const opt = {
        separator: " | ",
        format: [
          "timestamp",
          "username",
          "email",
          "url",
          "host",
          "method",
          "status",
          "responseTime",
        ],
      };

    const startTime = Date.now();
    await next();
    const endTime = Date.now();

    const statusColor = res.statusCode >= 400 ? "redBright" : "greenBright";

    const fieldsAvailable = {
        timestamp: chalk.gray(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`),
        host: chalk.blueBright(req.headers.host),
        method: chalk.greenBright(req.method),
        url: chalk.blueBright(req.url),
        responseTime: `${endTime - startTime} ms`,
        status: chalk[statusColor](res.statusCode),
        email: (req.user ? req.user.email : "email_missing"),
        username:(req.user ? req.user.username : "username_missing"),
      };

      const log = opt.format.reduce((log, field, index, array) => {
        log += `${field}: ${fieldsAvailable[field]}`;
        if (index + 1 !== array.length) {
          log += opt.separator;
        }
        return log;
      }, "");

      console.log(log)

}

module.exports = reqLogger