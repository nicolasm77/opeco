function removeHeadTag(){}

removeHeadTag.prototype.apply = function (compiler) {
	compiler.hooks.compilation.tap('removeHeadTag', (compilation) => {
		compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
			'removeHeadTag',
			(data, cb) => {
				data.html = data.html.replace(new RegExp("<head>", "g"), "").replace(new RegExp("</head>", "g"), "");
				data.html = data.html.replace(new RegExp("https://www.boulanger.com/", "g"), "/");
				data.html = data.html.replace(new RegExp("https://m.boulanger.com/", "g"), "/");

				cb(null, data)
			}
		)
	})
}

module.exports = removeHeadTag