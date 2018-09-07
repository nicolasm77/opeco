const loaderUtils = require("loader-utils");

module.exports = function (content) {

	const { path } = loaderUtils.getOptions(this);

    content = content.replace(new RegExp('../fichierAtrouver.html', "g"), "../../evenements/"+ path +"/index.html");

    return content;
};
