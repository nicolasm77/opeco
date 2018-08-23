function removeHeadTag(){}

removeHeadTag.prototype.apply = function (compiler) {
	compiler.hooks.compilation.tap('removeHeadTag', (compilation) => {
		compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
			'removeHeadTag',
			(data, cb) => {
				data.html = data.html.replace(new RegExp("<head>", "g"), "").replace(new RegExp("</head>", "g"), "");

				cb(null, data)
			}
		)
	})
}

module.exports = removeHeadTag