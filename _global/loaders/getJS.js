const path = require('path');

module.exports = function (relative, files) {
	const entry = {};

	files.forEach(function (file, index) {
		if(path.basename(file) !== "webpack.config.js") entry[path.basename(file, ".js")] = relative + "/" + path.basename(file);
	});

    return entry;
};
