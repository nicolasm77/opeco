/*jshint esversion: 6 */

const loaderUtils = require("loader-utils");

module.exports = function (content) {

    const {
        path
    } = loaderUtils.getOptions(this);

    content = content.replace(new RegExp('../fichierAtrouver.html', "g"), "../../evenements/" + path + "/" + this._compilation.compiler.options.output.filename);

    return content;
};