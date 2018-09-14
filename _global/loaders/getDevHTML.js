const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (relative, files, same, isSim) {
	let templates = [];

	files.forEach(function (file, index) {
		let options = {};

		options["template"] = (isSim == true)? './_global/structure_site/template_sim.html' : './_global/structure_site/template_desk.html';
		options["filename"] = path.basename(file);
		options["inject"] = true;
		if(!same) options["chunks"] = [path.basename(file, ".js")];

		templates.push(
			new HtmlWebpackPlugin(options)
		)
	});

	return templates;
};
