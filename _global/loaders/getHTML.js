/*jshint esversion: 6 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (relative, files, same) {
	let templates = [];

	files.forEach(function (file, index) {
		let options = {};

		options.template = relative + "/" + path.basename(file);
		options.filename = (path.dirname(path.dirname(relative)).split(path.sep).pop() == "vivre-mieux") ? relative.split(path.sep).pop()+".html" : path.basename(file);
		options.inject = 'body';

		if (path.basename(file).indexOf('ajax') !== -1) {
			options.chunks = [];
		} else if (!same) {
			options.chunks = [path.basename(file, ".js")];
		}

		templates.push(new HtmlWebpackPlugin(options));

	});

	return templates;
};