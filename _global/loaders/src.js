module.exports = function (content) {

    const imgs = content.match(new RegExp("<img([^>]*[^/])(lazyload)([^>]*[^/])>", "g"))

    if(imgs && imgs.length){
        const srcs = imgs.map(function(tag){
            return tag
                .replace(new RegExp('src=\"(.*?)(.jpg|.png)\"', "g"), 'src="${require(\''+ tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] +'?lazy\').trace}" data-lazy="${require(\''+ tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] +'?lazy\').src}"')
                .replace(new RegExp('src=\"(.*?)(scene7)(.*?)\"', "g"), 'data-lazy="'+ tag.match(new RegExp("(?<=src=\")(.*?)(?=\")", "g"))[0] +'"');
        })

        let index = 0;
        content = content.replace(new RegExp("<img([^>]*[^/])(lazyload)([^>]*[^/])>", "g"), function(){
            return srcs[index++];
        });
    }

    return content;
};
