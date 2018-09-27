/*jshint esversion: 6 */

module.exports = function (content) {

    const imgs = content.match(new RegExp("<img([^>]*[^/])(lazyload)([^>]*[^/])>", "g"))

    if (imgs && imgs.length) {
        const srcs = imgs.map(function (tag) {
            return tag
                .replace(new RegExp('src=\"(.*?)(.jpg|.png)\"', "g"), 'src="${require(\'' + tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] + '?lazy\').trace}" data-lazy="${require(\'' + tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] + '?lazy\').src}"')
                .replace(new RegExp('src=\"(.*?)(scene7)(.*?)\"', "g"), 'data-lazy="' + tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] + '"');
        });

        let index = 0;
        content = content.replace(new RegExp("<img([^>]*[^/])(lazyload)([^>]*[^/])>", "g"), function () {
            return srcs[index++];
        });
	}

	const svgs = content.match(new RegExp("<img([^>]*[^/])(\.svg)([^>]*[^/])>", "g"))

	if (svgs && svgs.length) {
		const srcs2 = svgs.map(function (tag) {
			return tag
			.replace(new RegExp('src=\"(.*?)(.svg)\"', "g"), 'src="' + tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] + '?compress"')
		});

		let index = 0;
		content = content.replace(new RegExp("<img([^>]*[^/])(\.svg)([^>]*[^/])>", "g"), function () {
			return srcs2[index++];
		});
	}

    return content;
};