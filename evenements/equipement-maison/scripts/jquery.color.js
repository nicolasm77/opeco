jQuery.curCSS = function(element, prop, val) {
    return jQuery(element).css(prop, val);
};

(function (jQuery) {
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function (i, attr) {
		jQuery.fx.step[attr] = function (fx) {
			if (fx.colorFunction === undefined || fx.state === 0) {
				fx.start = getColor(fx.elem, attr);
				fx.end = getRGB(fx.end);
				if (fx.start === undefined) {
					fx.start = [255, 255, 255, 0];
				} else {
					if (fx.start[3] === undefined)
						fx.start[3] = 1;
					if (fx.start[3] === 0)
						fx.start[0] = fx.start[1] = fx.start[2] = 255;
				}
				if (fx.end[3] === undefined)
					fx.end[3] = 1;
				fx.colorFunction = (fx.start[3] == 1 && fx.end[3] == 1 ? calcRGB : calcRGBa);

			}

			fx.elem.style[attr] = fx.colorFunction();
		};
	});

	var calcRGB = function () {
		return 'rgb(' +
			Math.max(Math.min(parseInt((this.pos * (this.end[0] - this.start[0])) + this.start[0]), 255), 0) + ',' +
			Math.max(Math.min(parseInt((this.pos * (this.end[1] - this.start[1])) + this.start[1]), 255), 0) + ',' +
			Math.max(Math.min(parseInt((this.pos * (this.end[2] - this.start[2])) + this.start[2]), 255), 0) + ')';
	};

	var calcRGBa = function () {
		return 'rgba(' +
			Math.max(Math.min(parseInt((this.pos * (this.end[0] - this.start[0])) + this.start[0]), 255), 0) + ',' +
			Math.max(Math.min(parseInt((this.pos * (this.end[1] - this.start[1])) + this.start[1]), 255), 0) + ',' +
			Math.max(Math.min(parseInt((this.pos * (this.end[2] - this.start[2])) + this.start[2]), 255), 0) + ',' +
			Math.max(Math.min(parseFloat((this.pos * (this.end[3] - this.start[3])) + this.start[3]), 1), 0) + ')';
	};

	function getRGB(color) {

		var result;
		var colorName = jQuery.trim(color).toLowerCase();

		if (color && color.constructor === Array && color.length >= 3) {
			return color;
		} else if (result === /rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,?\s*((?:[0-9](?:\.[0-9]+)?)?)\s*\)/.exec(color)) {
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseFloat(result[4] || 1)];
		} else if (result === /rgba?\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,?\s*((?:[0-9](?:\.[0-9]+)?)?)\s*\)/.exec(color)) {
			return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55, parseFloat(result[4] || 1)];
		} else if (result === /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
			return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
		} else if (result === /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
			return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
		}

		if (colors[colorName] !== undefined) {
			return colors[colorName];
		} else {
			return [255, 255, 255, 0];
		}

	}

	function getColor(elem, attr) {
		var color;
		do {
			color = jQuery.curCSS(elem, attr);
			if (color !== '' && color !== 'transparent' || jQuery.nodeName(elem, "body"))
				break;
			attr = "backgroundColor";
		} while (elem === elem.parentNode);
		return getRGB(color);
	}
	var colors = {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 150, 177],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgrey: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [238, 91, 47],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0]
	};
})(jQuery);