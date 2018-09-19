/*jshint esversion: 6 */

const loaderUtils = require("loader-utils");

module.exports = function (content) {

	let { path, isVMarticle } = loaderUtils.getOptions(this);

	if(isVMarticle) path = "/vivre-mieux/articles/" + path;

    content = content.replace(new RegExp('../fichierAtrouver.html', "g"), "../../evenements/" + path + "/" + this._compilation.compiler.options.output.filename);

    return content;
};