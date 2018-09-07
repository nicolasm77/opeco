module.exports = function (content) {

    var entities = [
        ['Á', '&Aacute;'],
        ['Â', '&Acirc;'],
        ['Ã', '&Atilde;'],
        ['Ä', '&Auml;'],
        ['Å', '&Aring;'],
        ['Æ', '&AElig;'],
        ['Ç', '&Ccedil;'],
        ['È', '&Egrave;'],
        ['É', '&Eacute;'],
        ['Ê', '&Ecirc;'],
        ['Ë', '&Euml;'],
        ['Ì', '&Igrave;'],
        ['Í', '&Iacute;'],
        ['Î', '&Icirc;'],
        ['Ï', '&Iuml;'],
        ['Ð', '&ETH;'],
        ['Ñ', '&Ntilde;'],
        ['Ò', '&Ograve;'],
        ['Ó', '&Oacute;'],
        ['Ô', '&Ocirc;'],
        ['Õ', '&Otilde;'],
        ['Ö', '&Ouml;'],
        ['Ø', '&Oslash;'],
        ['Ù', '&Ugrave;'],
        ['Ú', '&Uacute;'],
        ['Û', '&Ucirc;'],
        ['Ü', '&Uuml;'],
        ['Ý', '&Yacute;'],
        ['Þ', '&THORN;'],
        ['ß', '&szlig;'],
        ['à', '&agrave;'],
		['À', '&Agrave;'],
        ['á', '&aacute;'],
        ['â', '&acirc;'],
        ['ã', '&atilde;'],
        ['ä', '&auml;'],
        ['å', '&aring;'],
        ['æ', '&aelig;'],
        ['ç', '&ccedil;'],
        ['è', '&egrave;'],
        ['é', '&eacute;'],
        ['ê', '&ecirc;'],
        ['ë', '&euml;'],
        ['ì', '&igrave;'],
        ['í', '&iacute;'],
        ['î', '&icirc;'],
        ['ï', '&iuml;'],
        ['ð', '&eth;'],
        ['ñ', '&ntilde;'],
        ['ò', '&ograve;'],
        ['ó', '&oacute;'],
        ['ô', '&ocirc;'],
        ['õ', '&otilde;'],
        ['ö', '&ouml;'],
        ['ø', '&oslash;'],
        ['ù', '&ugrave;'],
        ['ú', '&uacute;'],
        ['û', '&ucirc;'],
        ['ü', '&uuml;'],
        ['ý', '&yacute;'],
        ['þ', '&thorn;'],
        ['ÿ', '&yuml;'],
        ['®', '&reg;'],
        ['™', '&trade;'],
        ['°', '&deg;'],
        ['œ', '&oelig;'],
        ['µ', '&micro;'],
        ['’', '&rsquo;'],
        ['‚', '&sbquo;'],
        ['“', '&ldquo;'],
        ['„', '&bdquo;'],
        ['•', '&bull;'],
        ['”', '&rdquo;'],
		["€", "&euro;"],
		["…", "..."],
		["«", "&laquo;"],
		["»", "&raquo;"],


		//emojis
		['💘', '&#128152;'],
		['👩‍👩‍👧‍👧', '&#128105;&zwj;&#128105;&zwj;&#128103;&zwj;&#128103;'],
		['👩‍👩‍👧‍👦', '&#128105;&zwj;&#128105;&zwj;&#128103;&zwj;&#128102;'],
		['👩‍👩‍👦‍👦', '&#128105;&zwj;&#128105;&zwj;&#128102;&zwj;&#128102;'],
		['👨‍👩‍👧‍👧', '&#128104;&zwj;&#128105;&zwj;&#128103;&zwj;&#128103;'],
		['👨‍👩‍👧‍👦', '&#128104;&zwj;&#128105;&zwj;&#128103;&zwj;&#128102;'],
		['👨‍👩‍👦‍👦', '&#128104;&zwj;&#128105;&zwj;&#128102;&zwj;&#128102;'],
		['👨‍👨‍👧‍👧', '&#128104;&zwj;&#128104;&zwj;&#128103;&zwj;&#128103;'],
		['👨‍👨‍👧‍👦', '&#128104;&zwj;&#128104;&zwj;&#128103;&zwj;&#128102;'],
		['👨‍👨‍👦‍👦', '&#128104;&zwj;&#128104;&zwj;&#128102;&zwj;&#128102;'],
		['👩‍👩‍👧', '&#128105;&zwj;&#128105;&zwj;&#128103;'],
		['👩‍👩‍👦', '&#128105;&zwj;&#128105;&zwj;&#128102;'],
		['👩‍👧‍👧', '&#128105;&zwj;&#128103;&zwj;&#128103;'],
		['👩‍👧‍👦', '&#128105;&zwj;&#128103;&zwj;&#128102;'],
		['👩‍👦‍👦', '&#128105;&zwj;&#128102;&zwj;&#128102;'],
		['👨‍👩‍👧', '&#128104;&zwj;&#128105;&zwj;&#128103;'],
		['👨‍👨‍👧', '&#128104;&zwj;&#128104;&zwj;&#128103;'],
		['👨‍👨‍👦', '&#128104;&zwj;&#128104;&zwj;&#128102;'],
		['👨‍👧‍👧', '&#128104;&zwj;&#128103;&zwj;&#128103;'],
		['👨‍👧‍👦', '&#128104;&zwj;&#128103;&zwj;&#128102;'],
		['👨‍👦‍👦', '&#128104;&zwj;&#128102;&zwj;&#128102;'],
		['👩‍👧', '&#128105;&zwj;&#128103;'],
		['👩‍👦', '&#128105;&zwj;&#128102;'],
		['👨‍👧', '&#128104;&zwj;&#128103;'],
		['👨‍👦', '&#128104;&zwj;&#128102;'],
		['😂', '&#128514;'],
		['❤️', '&#10084;'],
		['♥️', '&hearts;️'],
		['😍', '&#128525;'],
		['😭', '&#128557;'],
		['😊', '&#128522;'],
		['😒', '&#128530;'],
		['😘', '&#128536;'],
		['💕', '&#128149;'],
		['☺️', '&#9786;'],
		['😩', '&#128553;'],


		['👌🏿', '&#128076;&#127999;'],
		['👌🏾', '&#128076;&#127998;'],
		['👌🏽', '&#128076;&#127997;'],
		['👌🏼', '&#128076;&#127996;'],
		['👌🏻', '&#128076;&#127995;'],
		['👌', '&#128076;'],
		['😔', '&#128532;'],
		['😏', '&#128527;'],
		['😁', '&#128513;'],
		['♻', '&#9851;'],
		['😉', '&#128521;'],
		['👍🏿', '&#128077;&#127999;'],
		['👍🏾', '&#128077;&#127998;'],
		['👍🏽', '&#128077;&#127997;'],
		['👍🏼', '&#128077;&#127996;'],
		['👍🏻', '&#128077;&#127995;'],
		['👍', '&#128077;'],
		['🙏🏿', '&#128591;&#127999;'],
		['🙏🏾', '&#128591;&#127998;'],
		['🙏🏽', '&#128591;&#127997;'],
		['🙏🏼', '&#128591;&#127996;'],
		['🙏🏻', '&#128591;&#127995;'],
		['🙏', '&#128591;'],
		['😌', '&#128524;'],
		['🎶', '&#127926;'],
		['😳', '&#128563;'],
		['🙌🏿', '&#128588;&#127999;'],
		['🙌🏾', '&#128588;&#127998;'],
		['🙌🏽', '&#128588;&#127997;'],
		['🙌🏼', '&#128588;&#127996;'],
		['🙌🏻', '&#128588;&#127995;'],
		['🙌', '&#128588;'],
		['🙈', '&#128584;'],
		['😢', '&#128546;'],
		['😎', '&#128526;'],
		['✌🏿', '&#9996;&#127999;'],
		['✌🏾', '&#9996;&#127998;'],
		['✌🏽', '&#9996;&#127997;'],
		['✌🏼', '&#9996;&#127996;'],
		['✌🏻', '&#9996;&#127995;'],
		['✌️', '&#9996;'],
		['👀', '&#128064;'],
		['😅', '&#128517;'],
		['✨', '&#10024;'],
		['😴', '&#128564;'],
		['😄', '&#128516;'],
		['💜', '&#128156;'],
		['💔', '&#128148;'],
		['💯', '&#128175;'],
		['😑', '&#128529;'],
		['💖', '&#128150;'],
		['💙', '&#128153;'],
		['😕', '&#128533;'],
		['💁🏿‍♂', '&#128129;&#127999;&zwj;&#9794;'],
		['💁🏾‍♂', '&#128129;&#127998;&zwj;&#9794;'],
		['💁🏽‍♂', '&#128129;&#127997;&zwj;&#9794;'],
		['💁🏼‍♂', '&#128129;&#127996;&zwj;&#9794;'],
		['💁🏻‍♂', '&#128129;&#127995;&zwj;&#9794;'],
		['💁‍♂', '&#128129;&zwj;&#9794;'],
		['💁🏿', '&#128129;&#127999;'],
		['💁🏾', '&#128129;&#127998;'],
		['💁🏽', '&#128129;&#127997;'],
		['💁🏼', '&#128129;&#127996;'],
		['💁🏻', '&#128129;&#127995;'],
		['💁', '&#128129;'],
		['😜', '&#128540;'],
		['😞', '&#128542;'],
		['😋', '&#128523;'],
		['😐', '&#128528;'],
		['😪', '&#128554;'],
		['👏🏿', '&#128079;&#127999;'],
		['👏🏾', '&#128079;&#127998;'],
		['👏🏽', '&#128079;&#127997;'],
		['👏🏼', '&#128079;&#127996;'],
		['👏🏻', '&#128079;&#127995;'],
		['👏', '&#128079;'],
		['💘', '&#128152;'],
		['💗', '&#128151;'],
		['💞', '&#128158;'],
		['⬅️', '&#11013;'],
		['🙊', '&#128586;'],
		['✋🏿', '&#9995;&#127999;'],
		['✋🏾', '&#9995;&#127998;'],
		['✋🏽', '&#9995;&#127997;'],
		['✋🏼', '&#9995;&#127996;'],
		['✋🏻', '&#9995;&#127995;'],
		['✋', '&#9995;'],
		['💋', '&#128139;'],
		['👉🏿', '&#128073;&#127999;'],
		['👉🏾', '&#128073;&#127998;'],
		['👉🏽', '&#128073;&#127997;'],
		['👉🏼', '&#128073;&#127996;'],
		['👉🏻', '&#128073;&#127995;'],
		['👉', '&#128073;'],
		['🌸', '&#127800;'],
		['😱', '&#128561;'],
		['🔥', '&#128293;'],
		['😡', '&#128545;'],
		['😃', '&#128515;'],
		['🎉', '&#127881;'],
		['👊🏿', '&#128074;&#127999;'],
		['👊🏾', '&#128074;&#127998;'],
		['👊🏽', '&#128074;&#127997;'],
		['👊🏼', '&#128074;&#127996;'],
		['👊🏻', '&#128074;&#127995;'],
		['👊', '&#128074;'],
		['😫', '&#128555;'],
		['📷', '&#128247;'],
		['🌹', '&#127801;'],
		['😝', '&#128541;'],
		['💪🏿', '&#128170;&#127999;'],
		['💪🏾', '&#128170;&#127998;'],
		['💪🏽', '&#128170;&#127997;'],
		['💪🏼', '&#128170;&#127996;'],
		['💪🏻', '&#128170;&#127995;'],
		['💪', '&#128170;'],
		['💀', '&#128128;'],
		['☀️', '&#9728;'],
		['💛', '&#128155;'],
		['😤', '&#128548;'],
		['🌚', '&#127770;'],
		['😆', '&#128518;'],
		['😓', '&#128531;'],
		['👈🏿', '&#128072;&#127999;'],
		['👈🏾', '&#128072;&#127998;'],
		['👈🏽', '&#128072;&#127997;'],
		['👈🏼', '&#128072;&#127996;'],
		['👈🏻', '&#128072;&#127995;'],
		['👈', '&#128072;'],
		['✔️', '&#10004;'],
		['😻', '&#128571;'],
		['😀', '&#128512;'],
		['😷', '&#128567;'],
		['💚', '&#128154;'],
		['👋🏿', '&#128075;&#127999;'],
		['👋🏾', '&#128075;&#127998;'],
		['👋🏽', '&#128075;&#127997;'],
		['👋🏼', '&#128075;&#127996;'],
		['👋🏻', '&#128075;&#127995;'],
		['👋', '&#128075;'],
		['😣', '&#128547;'],
		['💓', '&#128147;'],
		['▶️', '&#9654;'],
		['◀️', '&#9664;'],
		['↪️', '&#8618;'],
		['↩️', '&#8617;'],
		['👑', '&#128081;'],
		['😚', '&#128538;'],
		['😛', '&#128539;'],
		['😥', '&#128549;'],
		['😇', '&#128519;'],
		['🎧', '&#127911;'],
		['✅', '&#9989;'],
		['😖', '&#128534;'],
		['➡', '&#10145;'],
		['😠', '&#128544;'],
		['😬', '&#128556;'],
		['🌟', '&#127775;'],
		['🔫', '&#128299;'],
		['🙋🏿‍♂', '&#128587;&#127999;&zwj;&#9794;'],
		['🙋🏾‍♂', '&#128587;&#127998;&zwj;&#9794;'],
		['🙋🏽‍♂', '&#128587;&#127997;&zwj;&#9794;'],
		['🙋🏼‍♂', '&#128587;&#127996;&zwj;&#9794;'],
		['🙋🏻‍♂', '&#128587;&#127995;&zwj;&#9794;'],
		['🙋‍♂', '&#128587;&zwj;&#9794;'],
		['🙋🏿', '&#128587;&#127999;'],
		['🙋🏾', '&#128587;&#127998;'],
		['🙋🏽', '&#128587;&#127997;'],
		['🙋🏼', '&#128587;&#127996;'],
		['🙋🏻', '&#128587;&#127995;'],
		['🙋', '&#128587;'],
		['👎🏿', '&#128078;&#127999;'],
		['👎🏾', '&#128078;&#127998;'],
		['👎🏽', '&#128078;&#127997;'],
		['👎🏼', '&#128078;&#127996;'],
		['👎🏻', '&#128078;&#127995;'],
		['👎', '&#128078;'],
		['💃🏿', '&#128131;&#127999;'],
		['💃🏾', '&#128131;&#127998;'],
		['💃🏽', '&#128131;&#127997;'],
		['💃🏼', '&#128131;&#127996;'],
		['💃🏻', '&#128131;&#127995;'],
		['💃', '&#128131;'],
		['🎵', '&#127925;'],
		['😶', '&#128566;'],
		['💫', '&#128171;'],
		['✊🏿', '&#9994;&#127999;'],
		['✊🏾', '&#9994;&#127998;'],
		['✊🏽', '&#9994;&#127997;'],
		['✊🏼', '&#9994;&#127996;'],
		['✊🏻', '&#9994;&#127995;'],
		['✊', '&#9994;'],
		['👇🏿', '&#128071;&#127999;'],
		['👇🏾', '&#128071;&#127998;'],
		['👇🏽', '&#128071;&#127997;'],
		['👇🏼', '&#128071;&#127996;'],
		['👇🏻', '&#128071;&#127995;'],
		['👇', '&#128071;'],
		['🔴', '&#128308;'],
		['🙅🏿‍♂', '&#128581;&#127999;&zwj;&#9794;'],
		['🙅🏾‍♂', '&#128581;&#127998;&zwj;&#9794;'],
		['🙅🏽‍♂', '&#128581;&#127997;&zwj;&#9794;'],
		['🙅🏼‍♂', '&#128581;&#127996;&zwj;&#9794;'],
		['🙅🏻‍♂', '&#128581;&#127995;&zwj;&#9794;'],
		['🙅‍♂', '&#128581;&zwj;&#9794;'],
		['🙅🏿', '&#128581;&#127999;'],
		['🙅🏾', '&#128581;&#127998;'],
		['🙅🏽', '&#128581;&#127997;'],
		['🙅🏼', '&#128581;&#127996;'],
		['🙅🏻', '&#128581;&#127995;'],
		['🙅', '&#128581;'],
		['💥', '&#128165;'],
		['©️', '&copy;️'],
		['💭', '&#128173;'],
		['👅', '&#128069;'],
		['💩', '&#128169;'],
		['😰', '&#128560;'],
		['💎', '&#128142;'],
		['🙆🏿‍♂', '&#128582;&#127999;&zwj;&#9794;'],
		['🙆🏾‍♂', '&#128582;&#127998;&zwj;&#9794;'],
		['🙆🏽‍♂', '&#128582;&#127997;&zwj;&#9794;'],
		['🙆🏼‍♂', '&#128582;&#127996;&zwj;&#9794;'],
		['🙆🏻‍♂', '&#128582;&#127995;&zwj;&#9794;'],
		['🙆‍♂', '&#128582;&zwj;&#9794;'],
		['🙆🏿', '&#128582;&#127999;'],
		['🙆🏾', '&#128582;&#127998;'],
		['🙆🏽', '&#128582;&#127997;'],
		['🙆🏼', '&#128582;&#127996;'],
		['🙆🏻', '&#128582;&#127995;'],
		['🙆', '&#128582;'],
		['🍕', '&#127829;'],
		['😹', '&#128569;'],
		['🌞', '&#127774;'],
		['🍃', '&#127811;'],
		['💦', '&#128166;'],
		['🐧', '&#128039;'],
		['💤', '&#128164;'],
		['🚶🏿‍♀', '&#128694;&#127999;&zwj;&#9792;'],
		['🚶🏾‍♀', '&#128694;&#127998;&zwj;&#9792;'],
		['🚶🏽‍♀', '&#128694;&#127997;&zwj;&#9792;'],
		['🚶🏼‍♀', '&#128694;&#127996;&zwj;&#9792;'],
		['🚶🏻‍♀', '&#128694;&#127995;&zwj;&#9792;'],
		['🚶‍♀', '&#128694;&zwj;&#9792;'],
		['🚶🏿', '&#128694;&#127999;'],
		['🚶🏾', '&#128694;&#127998;'],
		['🚶🏽', '&#128694;&#127997;'],
		['🚶🏼', '&#128694;&#127996;'],
		['🚶🏻', '&#128694;&#127995;'],
		['🚶', '&#128694;'],
		['✈️', '&#9992;'],
		['🎈', '&#127880;'],
		['⭐', '&#11088;'],
		['🎀', '&#127872;'],
		['☑️', '&#9745;'],
		['😟', '&#128543;'],
		['🔞', '&#128286;'],
		['😨', '&#128552;'],
		['🍀', '&#127808;'],
		['🌺', '&#127802;'],
		['🎤', '&#127908;'],
		['👐🏿', '&#128080;&#127999;'],
		['👐🏾', '&#128080;&#127998;'],
		['👐🏽', '&#128080;&#127997;'],
		['👐🏼', '&#128080;&#127996;'],
		['👐🏻', '&#128080;&#127995;'],
		['👐', '&#128080;'],
		['👻', '&#128123;'],
		['🌴', '&#127796;'],
		['‼️', '&#8252;'],
		['💅🏿', '&#128133;&#127999;'],
		['💅🏾', '&#128133;&#127998;'],
		['💅🏽', '&#128133;&#127997;'],
		['💅🏼', '&#128133;&#127996;'],
		['💅🏻', '&#128133;&#127995;'],
		['💅', '&#128133;'],
		['❌', '&#10060;'],
		['👽', '&#128125;'],


		['🙇🏿‍♀', '&#128583;&#127999;&zwj;&#9792;'],
		['🙇🏾‍♀', '&#128583;&#127998;&zwj;&#9792;'],
		['🙇🏽‍♀', '&#128583;&#127997;&zwj;&#9792;'],
		['🙇🏼‍♀', '&#128583;&#127996;&zwj;&#9792;'],
		['🙇🏻‍♀', '&#128583;&#127995;&zwj;&#9792;'],
		['🙇‍♀', '&#128583;&zwj;&#9792;'],
		['🙇🏿', '&#128583;&#127999;'],
		['🙇🏾', '&#128583;&#127998;'],
		['🙇🏽', '&#128583;&#127997;'],
		['🙇🏼', '&#128583;&#127996;'],
		['🙇🏻', '&#128583;&#127995;'],
		['🙇', '&#128583;'],
		['☁', '&#9729;'],
		['⚽', '&#9917;'],
		['👼🏿', '&#128124;&#127999;'],
		['👼🏾', '&#128124;&#127998;'],
		['👼🏽', '&#128124;&#127997;'],
		['👼🏼', '&#128124;&#127996;'],
		['👼🏻', '&#128124;&#127995;'],
		['👼', '&#128124;'],
		['👯‍♂', '&#128111;&zwj;&#9794;'],
		['👯', '&#128111;'],
		['❗', '&#10071;'],
		['❄️', '&#10052;'],
		['☝🏿', '&#9757;&#127999;'],
		['☝🏾', '&#9757;&#127998;'],
		['☝🏽', '&#9757;&#127997;'],
		['☝🏼', '&#9757;&#127996;'],
		['☝🏻', '&#9757;&#127995;'],
		['☝️', '&#9757;'],
		['😙', '&#128537;'],
		['🌈', '&#127752;'],
		['🌙', '&#127769;'],
		['💟', '&#128159;'],
		['💝', '&#128157;'],
		['🎁', '&#127873;'],
		['🍻', '&#127867;'],
		['😧', '&#128551;'],
		['🌍', '&#127757;'],
		['🎥', '&#127909;'],
		['⚓', '&#9875;'],
		['⚡', '&#9889;'],
		['♣️', '&clubs;️'],
		['✖️', '&#10006;'],
		['🏃🏿‍♀', '&#127939;&#127999;&zwj;&#9792;'],
		['🏃🏾‍♀', '&#127939;&#127998;&zwj;&#9792;'],
		['🏃🏽‍♀', '&#127939;&#127997;&zwj;&#9792;'],
		['🏃🏼‍♀', '&#127939;&#127996;&zwj;&#9792;'],
		['🏃🏻‍♀', '&#127939;&#127995;&zwj;&#9792;'],
		['🏃‍♀', '&#127939;&zwj;&#9792;'],
		['🏃🏿', '&#127939;&#127999;'],
		['🏃🏾', '&#127939;&#127998;'],
		['🏃🏽', '&#127939;&#127997;'],
		['🏃🏼', '&#127939;&#127996;'],
		['🏃🏻', '&#127939;&#127995;'],
		['🏃', '&#127939;'],
		['🌻', '&#127803;'],
		['🌎', '&#127758;'],
		['💐', '&#128144;'],
		['🐶', '&#128054;'],
		['💰', '&#128176;'],
		['🌿', '&#127807;'],
		['👫', '&#128107;'],
		['🍂', '&#127810;'],
		['🌷', '&#127799;'],
		['🎂', '&#127874;'],
		['🐱', '&#128049;'],
		['☕', '&#9749;'],
		['😵', '&#128565;'],
		['👆🏿', '&#128070;&#127999;'],
		['👆🏾', '&#128070;&#127998;'],
		['👆🏽', '&#128070;&#127997;'],
		['👆🏼', '&#128070;&#127996;'],
		['👆🏻', '&#128070;&#127995;'],
		['👆', '&#128070;'],
		['😮', '&#128558;'],
		['😯', '&#128559;'],
		['🏀', '&#127936;'],
		['🎄', '&#127876;'],
		['💍', '&#128141;'],
		['🌝', '&#127773;'],
		['😲', '&#128562;'],
		['👭', '&#128109;'],
		['💸', '&#128184;'],
		['😿', '&#128575;'],
		['🙉', '&#128585;'],
		['💨', '&#128168;'],
		['🌵', '&#127797;'],
		['♨️', '&#9832;'],
		['☎️', '&#9742;'],
		['🍁', '&#127809;'],
		['👸🏿', '&#128120;&#127999;'],
		['👸🏾', '&#128120;&#127998;'],
		['👸🏽', '&#128120;&#127997;'],
		['👸🏼', '&#128120;&#127996;'],
		['👸🏻', '&#128120;&#127995;'],
		['👸', '&#128120;'],
		['💆🏿‍♂', '&#128134;&#127999;&zwj;&#9794;'],
		['💆🏾‍♂', '&#128134;&#127998;&zwj;&#9794;'],
		['💆🏽‍♂', '&#128134;&#127997;&zwj;&#9794;'],
		['💆🏼‍♂', '&#128134;&#127996;&zwj;&#9794;'],
		['💆🏻‍♂', '&#128134;&#127995;&zwj;&#9794;'],
		['💆‍♂', '&#128134;&zwj;&#9794;'],
		['💆🏿', '&#128134;&#127999;'],
		['💆🏾', '&#128134;&#127998;'],
		['💆🏽', '&#128134;&#127997;'],
		['💆🏼', '&#128134;&#127996;'],
		['💆🏻', '&#128134;&#127995;'],
		['💆', '&#128134;'],
		['💌', '&#128140;'],
		['🏆', '&#127942;'],
		['🙍🏿‍♂', '&#128589;&#127999;&zwj;&#9794;'],
		['🙍🏾‍♂', '&#128589;&#127998;&zwj;&#9794;'],
		['🙍🏽‍♂', '&#128589;&#127997;&zwj;&#9794;'],
		['🙍🏼‍♂', '&#128589;&#127996;&zwj;&#9794;'],
		['🙍🏻‍♂', '&#128589;&#127995;&zwj;&#9794;'],
		['🙍‍♂', '&#128589;&zwj;&#9794;'],
		['🙍🏿', '&#128589;&#127999;'],
		['🙍🏾', '&#128589;&#127998;'],
		['🙍🏽', '&#128589;&#127997;'],
		['🙍🏼', '&#128589;&#127996;'],
		['🙍🏻', '&#128589;&#127995;'],
		['🙍', '&#128589;'],
		['🇺🇸', '&#127482;'],
		['🎊', '&#127882;'],
		['🌼', '&#127804;'],
		['🔪', '&#128298;'],
		['👄', '&#128068;'],
		['🍟', '&#127839;'],
		['🍩', '&#127849;'],
		['😦', '&#128550;'],
		['🌊', '&#127754;'],
		['💣', '&#128163;'],
		['🆗', '&#127383;'],
		['🌀', '&#127744;'],
		['🚀', '&#128640;'],
		['☔', '&#9748;'],
		['💏', '&#128143;'],
		['👩‍❤️‍💋‍👩', '&#128105;&zwj;&#10084;&zwj;&#128139;&zwj;&#128105;'],
		['👨‍❤️‍💋‍👨', '&#128104;&zwj;&#10084;&zwj;&#128139;&zwj;&#128104;'],
		['💑', '&#128145;'],
		['👩‍❤️‍👩', '&#128105;&zwj;&#10084;&zwj;&#128105;'],
		['👨‍❤️‍👨', '&#128104;&zwj;&#10084;&zwj;&#128104;'],
		['🍭', '&#127853;'],
		['🎬', '&#127916;'],
		['🐷', '&#128055;'],
		['😈', '&#128520;'],
		['👿', '&#128127;'],
		['🐝', '&#128029;'],
		['😽', '&#128573;'],
		['💢', '&#128162;'],
		['🎼', '&#127932;'],
		['🎅🏿', '&#127877;&#127999;'],
		['🎅🏾', '&#127877;&#127998;'],
		['🎅🏽', '&#127877;&#127997;'],
		['🎅🏼', '&#127877;&#127996;'],
		['🎅🏻', '&#127877;&#127995;'],
		['🎅', '&#127877;'],
		['🌏', '&#127759;'],
		['🏈', '&#127944;'],
		['🎸', '&#127928;'],
		['♦️', '&diams;️'],
		['🐼', '&#128060;'],
		['💬', '&#128172;'],
		['🍓', '&#127827;'],
		['😼', '&#128572;'],
		['🍌', '&#127820;'],
		['🍉', '&#127817;'],
		['⛄', '&#9924;'],
		['😸', '&#128568;'],
		['♠️', '&spades;️'],
		['🔝', '&#128285;'],
		['🍆', '&#127814;'],
		['🔮', '&#128302;'],
		['🍴', '&#127860;'],
		['📲', '&#128242;'],
		['📱', '&#128241;'],
		['⛅', '&#9925;'],
		['⚠️', '&#9888;'],
		['🙀', '&#128576;'],
		['🔸', '&#128312;'],
		['👶🏿', '&#128118;&#127999;'],
		['👶🏾', '&#128118;&#127998;'],
		['👶🏽', '&#128118;&#127997;'],
		['👶🏼', '&#128118;&#127996;'],
		['👶🏻', '&#128118;&#127995;'],
		['👶', '&#128118;'],
		['🐾', '&#128062;'],
		['👣', '&#128099;'],
		['🍺', '&#127866;'],
		['🍷', '&#127863;'],
		['⭕', '&#11093;'],
		['📹', '&#128249;'],
		['🐰', '&#128048;'],
		['🍹', '&#127865;'],
		['🚬', '&#128684;'],
		['👾', '&#128126;'],
		['🍑', '&#127825;'],
		['🐍', '&#128013;'],
		['🐢', '&#128034;'],
		['🍒', '&#127826;'],
		['😗', '&#128535;'],
		['🐸', '&#128056;'],
		['🌌', '&#127756;'],
		['🚨', '&#128680;'],
		['🐣', '&#128035;'],
		['📕', '&#128213;'],
		['🍬', '&#127852;'],
		['🍔', '&#127828;'],
		['🐻', '&#128059;'],
		['🐯', '&#128047;'],
		['🚗', '&#128663;'],
		['⏩', '&#9193;'],
		['🍦', '&#127846;'],
		['🍍', '&#127821;'],
		['🌾', '&#127806;'],
		['💉', '&#128137;'],
		['🚮', '&#128686;'],
		['🍫', '&#127851;'],
		['▪️', '&#9642;'],
		['📺', '&#128250;'],
		['💊', '&#128138;'],
		['🐙', '&#128025;'],
		['🎃', '&#127875;'],
		['🍇', '&#127815;'],
		['😺', '&#128570;'],
		['💿', '&#128191;'],
		['🍸', '&#127864;'],
		['🍰', '&#127856;'],
		['🎮', '&#127918;'],
		['™️', '&trade;️'],
		['⬇️', '&#11015;'],
		['🚫', '&#128683;'],
		['💄', '&#128132;'],
		['🐳', '&#128051;'],
		['📝', '&#128221;'],
		['®️', '&reg;️'],
		['🍪', '&#127850;'],
		['🐬', '&#128044;'],
		['🔊', '&#128266;'],
		['👨🏿', '&#128104;&#127999;'],
		['👨🏾', '&#128104;&#127998;'],
		['👨🏽', '&#128104;&#127997;'],
		['👨🏼', '&#128104;&#127996;'],
		['👨🏻', '&#128104;&#127995;'],
		['👨', '&#128104;'],
		['🐥', '&#128037;'],
		['🐒', '&#128018;'],
		['📚', '&#128218;'],
		['👹', '&#128121;'],
		['💂🏿‍♀', '&#128130;&#127999;&zwj;&#9792;'],
		['💂🏾‍♀', '&#128130;&#127998;&zwj;&#9792;'],
		['💂🏽‍♀', '&#128130;&#127997;&zwj;&#9792;'],
		['💂🏼‍♀', '&#128130;&#127996;&zwj;&#9792;'],
		['💂🏻‍♀', '&#128130;&#127995;&zwj;&#9792;'],
		['💂‍♀', '&#128130;&zwj;&#9792;'],
		['💂🏿', '&#128130;&#127999;'],
		['💂🏾', '&#128130;&#127998;'],
		['💂🏽', '&#128130;&#127997;'],
		['💂🏼', '&#128130;&#127996;'],
		['💂🏻', '&#128130;&#127995;'],
		['💂', '&#128130;'],
		['📢', '&#128226;'],
		['✂️', '&#9986;'],
		['👧🏿', '&#128103;&#127999;'],
		['👧🏾', '&#128103;&#127998;'],
		['👧🏽', '&#128103;&#127997;'],
		['👧🏼', '&#128103;&#127996;'],
		['👧🏻', '&#128103;&#127995;'],
		['👧', '&#128103;'],
		['🎓', '&#127891;'],
		['🇫🇷', '&#127467;'],
		['⚾️', '&#9918;'],
		['🚦', '&#128678;'],
		['👩🏿', '&#128105;&#127999;'],
		['👩🏾', '&#128105;&#127998;'],
		['👩🏽', '&#128105;&#127997;'],
		['👩🏼', '&#128105;&#127996;'],
		['👩🏻', '&#128105;&#127995;'],
		['👩', '&#128105;'],
		['🎆', '&#127878;'],
		['🌠', '&#127776;'],
		['🆘', '&#127384;'],
		['🍄', '&#127812;'],
		['😾', '&#128574;'],
		['🛅', '&#128709;'],
		['👠', '&#128096;'],
		['🎯', '&#127919;'],
		['🏊🏿‍♀', '&#127946;&#127999;&zwj;&#9792;'],
		['🏊🏾‍♀', '&#127946;&#127998;&zwj;&#9792;'],
		['🏊🏽‍♀', '&#127946;&#127997;&zwj;&#9792;'],
		['🏊🏼‍♀', '&#127946;&#127996;&zwj;&#9792;'],
		['🏊🏻‍♀', '&#127946;&#127995;&zwj;&#9792;'],
		['🏊‍♀', '&#127946;&zwj;&#9792;'],
		['🏊🏿', '&#127946;&#127999;'],
		['🏊🏾', '&#127946;&#127998;'],
		['🏊🏽', '&#127946;&#127997;'],
		['🏊🏼', '&#127946;&#127996;'],
		['🏊🏻', '&#127946;&#127995;'],
		['🏊', '&#127946;'],
		['🔑', '&#128273;'],
		['👙', '&#128089;'],
		['👪', '&#128106;'],
		['✏', '&#9999;'],
		['🐘', '&#128024;'],
		['💧', '&#128167;'],
		['🌱', '&#127793;'],
		['🍎', '&#127822;'],
		['🆒', '&#127378;'],
		['📞', '&#128222;'],
		['💵', '&#128181;'],
		['🏡', '&#127969;'],
		['📖', '&#128214;'],
		['💇🏿‍♂', '&#128135;&#127999;&zwj;&#9794;'],
		['💇🏾‍♂', '&#128135;&#127998;&zwj;&#9794;'],
		['💇🏽‍♂', '&#128135;&#127997;&zwj;&#9794;'],
		['💇🏼‍♂', '&#128135;&#127996;&zwj;&#9794;'],
		['💇🏻‍♂', '&#128135;&#127995;&zwj;&#9794;'],
		['💇‍♂', '&#128135;&zwj;&#9794;'],
		['💇🏿', '&#128135;&#127999;'],
		['💇🏾', '&#128135;&#127998;'],
		['💇🏽', '&#128135;&#127997;'],
		['💇🏼', '&#128135;&#127996;'],
		['💇🏻', '&#128135;&#127995;'],
		['💇', '&#128135;'],
		['💻', '&#128187;'],
		['💡', '&#128161;'],
		['❓', '&#10067;'],
		['🔙', '&#128281;'],
		['👦🏿', '&#128102;&#127999;'],
		['👦🏾', '&#128102;&#127998;'],
		['👦🏽', '&#128102;&#127997;'],
		['👦🏼', '&#128102;&#127996;'],
		['👦🏻', '&#128102;&#127995;'],
		['👦', '&#128102;'],
		['🔐', '&#128272;'],
		['🙎🏿‍♂', '&#128590;&#127999;&zwj;&#9794;'],
		['🙎🏾‍♂', '&#128590;&#127998;&zwj;&#9794;'],
		['🙎🏽‍♂', '&#128590;&#127997;&zwj;&#9794;'],
		['🙎🏼‍♂', '&#128590;&#127996;&zwj;&#9794;'],
		['🙎🏻‍♂', '&#128590;&#127995;&zwj;&#9794;'],
		['🙎‍♂', '&#128590;&zwj;&#9794;'],
		['🙎🏿', '&#128590;&#127999;'],
		['🙎🏾', '&#128590;&#127998;'],
		['🙎🏽', '&#128590;&#127997;'],
		['🙎🏼', '&#128590;&#127996;'],
		['🙎🏻', '&#128590;&#127995;'],
		['🙎', '&#128590;'],
		['🍊', '&#127818;'],
		['↔️', '&harr;️'],
		['🌅', '&#127749;'],
		['🍗', '&#127831;'],
		['🔵', '&#128309;'],
		['🚘', '&#128664;'],
		['🍧', '&#127847;'],
		['🇮🇹', '&#127470;'],
		['🐦', '&#128038;'],
		['🇬🇧', '&#127468;'],
		['🌛', '&#127771;'],
		['👓', '&#128083;'],
		['🐐', '&#128016;'],
		['🌃', '&#127747;'],
		['👵🏿', '&#128117;&#127999;'],
		['👵🏾', '&#128117;&#127998;'],
		['👵🏽', '&#128117;&#127997;'],
		['👵🏼', '&#128117;&#127996;'],
		['👵🏻', '&#128117;&#127995;'],
		['👵', '&#128117;'],
		['⚫', '&#9899;'],
		['🌑', '&#127761;'],
		['👬', '&#128108;'],
		['⚪', '&#9898;'],
		['🛃', '&#128707;'],
		['🐠', '&#128032;'],
		['🏠', '&#127968;'],
		['🔃', '&#128259;'],
		['🌜', '&#127772;'],
		['📍', '&#128205;'],
		['🌕', '&#127765;'],
		['👟', '&#128095;'],
		['🍋', '&#127819;'],
		['🍼', '&#127868;'],
		['🎨', '&#127912;'],
		['✉️', '&#9993;'],
		['🍝', '&#127837;'],
		['🎐', '&#127888;'],
		['🍥', '&#127845;'],
		['🌲', '&#127794;'],
		['🆙', '&#127385;'],
		['⬆️', '&#11014;'],
		['↗️', '&#8599;'],
		['↘️', '&#8600;'],
		['↙️', '&#8601;'],
		['🎭', '&#127917;'],
		['👃🏿', '&#128067;&#127999;'],
		['👃🏾', '&#128067;&#127998;'],
		['👃🏽', '&#128067;&#127997;'],
		['👃🏼', '&#128067;&#127996;'],
		['👃🏻', '&#128067;&#127995;'],
		['👃', '&#128067;'],
		['🐽', '&#128061;'],
		['🐟', '&#128031;'],
		['👳🏿‍♀', '&#128115;&#127999;&zwj;&#9792;'],
		['👳🏾‍♀', '&#128115;&#127998;&zwj;&#9792;'],
		['👳🏽‍♀', '&#128115;&#127997;&zwj;&#9792;'],
		['👳🏼‍♀', '&#128115;&#127996;&zwj;&#9792;'],
		['👳🏻‍♀', '&#128115;&#127995;&zwj;&#9792;'],
		['👳‍♀', '&#128115;&zwj;&#9792;'],
		['👳🏿', '&#128115;&#127999;'],
		['👳🏾', '&#128115;&#127998;'],
		['👳🏽', '&#128115;&#127997;'],
		['👳🏼', '&#128115;&#127996;'],
		['👳🏻', '&#128115;&#127995;'],
		['👳', '&#128115;'],
		['🐨', '&#128040;'],
		['👂🏿', '&#128066;&#127999;'],
		['👂🏾', '&#128066;&#127998;'],
		['👂🏽', '&#128066;&#127997;'],
		['👂🏼', '&#128066;&#127996;'],
		['👂🏻', '&#128066;&#127995;'],
		['👂', '&#128066;'],
		['✳️', '&#10035;'],
		['🔹', '&#128313;'],
		['🚿', '&#128703;'],
		['🐛', '&#128027;'],
		['🍜', '&#127836;'],
		['🎩', '&#127913;'],
		['👰🏿', '&#128112;&#127999;'],
		['👰🏾', '&#128112;&#127998;'],
		['👰🏽', '&#128112;&#127997;'],
		['👰🏼', '&#128112;&#127996;'],
		['👰🏻', '&#128112;&#127995;'],
		['👰', '&#128112;'],
		['⛽', '&#9981;'],
		['🏁', '&#127937;'],
		['🐴', '&#128052;'],
		['⌚', '&#8986;'],
		['🐵', '&#128053;'],
		['🚼', '&#128700;'],
		['🆕', '&#127381;'],
		['🆓', '&#127379;'],
		['🎇', '&#127879;'],
		['🌽', '&#127805;'],
		['🎾', '&#127934;'],
		['⏰', '&#9200;'],
		['🔋', '&#128267;'],
		['❕', '&#10069;'],
		['🐺', '&#128058;'],
		['🗿', '&#128511;'],
		['🐮', '&#128046;'],
		['📣', '&#128227;'],
		['👴🏿', '&#128116;&#127999;'],
		['👴🏾', '&#128116;&#127998;'],
		['👴🏽', '&#128116;&#127997;'],
		['👴🏼', '&#128116;&#127996;'],
		['👴🏻', '&#128116;&#127995;'],
		['👴', '&#128116;'],
		['👗', '&#128087;'],
		['🔗', '&#128279;'],
		['🐔', '&#128020;'],
		['🍳', '&#127859;'],
		['🐋', '&#128011;'],
		['↖', '&#8598;'],
		['🌳', '&#127795;'],
		['🍱', '&#127857;'],
		['📌', '&#128204;'],
		['🔜', '&#128284;'],
		['🔁', '&#128257;'],
		['🐉', '&#128009;'],
		['🐹', '&#128057;'],
		['⛳', '&#9971;'],
		['🏄🏿‍♀', '&#127940;&#127999;&zwj;&#9792;'],
		['🏄🏾‍♀', '&#127940;&#127998;&zwj;&#9792;'],
		['🏄🏽‍♀', '&#127940;&#127997;&zwj;&#9792;'],
		['🏄🏼‍♀', '&#127940;&#127996;&zwj;&#9792;'],
		['🏄🏻‍♀', '&#127940;&#127995;&zwj;&#9792;'],
		['🏄‍♀', '&#127940;&zwj;&#9792;'],
		['🏄🏿', '&#127940;&#127999;'],
		['🏄🏾', '&#127940;&#127998;'],
		['🏄🏽', '&#127940;&#127997;'],
		['🏄🏼', '&#127940;&#127996;'],
		['🏄🏻', '&#127940;&#127995;'],
		['🏄', '&#127940;'],
		['🐭', '&#128045;'],
		['🌒', '&#127762;'],
		['🚙', '&#128665;'],
		['🅰️', '&#127344;'],
		['⁉️', '&#8265;'],
		['🈹', '&#127545;'],
		['🔌', '&#128268;'],
		['🌓', '&#127763;'],
		['♋', '&#9803;'],
		['🔱', '&#128305;'],
		['🍞', '&#127838;'],
		['👮🏿‍♀', '&#128110;&#127999;&zwj;&#9792;'],
		['👮🏾‍♀', '&#128110;&#127998;&zwj;&#9792;'],
		['👮🏽‍♀', '&#128110;&#127997;&zwj;&#9792;'],
		['👮🏼‍♀', '&#128110;&#127996;&zwj;&#9792;'],
		['👮🏻‍♀', '&#128110;&#127995;&zwj;&#9792;'],
		['👮‍♀', '&#128110;&zwj;&#9792;'],
		['👮🏿', '&#128110;&#127999;'],
		['👮🏾', '&#128110;&#127998;'],
		['👮🏽', '&#128110;&#127997;'],
		['👮🏼', '&#128110;&#127996;'],
		['👮🏻', '&#128110;&#127995;'],
		['👮', '&#128110;'],
		['🍵', '&#127861;'],
		['🎣', '&#127907;'],
		['🌔', '&#127764;'],
		['🚲', '&#128690;'],
		['👤', '&#128100;'],
		['🍚', '&#127834;'],
		['📻', '&#128251;'],
		['🐤', '&#128036;'],
		['⤵️', '&#10549;'],
		['🌘', '&#127768;'],
		['↕', '&#8597;'],
		['🇪', '&#127466;'],
		['🌗', '&#127767;'],
		['🔘', '&#128280;'],
		['🐑', '&#128017;'],
		['👱🏿‍♀', '&#128113;&#127999;&zwj;&#9792;'],
		['👱🏾‍♀', '&#128113;&#127998;&zwj;&#9792;'],
		['👱🏽‍♀', '&#128113;&#127997;&zwj;&#9792;'],
		['👱🏼‍♀', '&#128113;&#127996;&zwj;&#9792;'],
		['👱🏻‍♀', '&#128113;&#127995;&zwj;&#9792;'],
		['👱‍♀', '&#128113;&zwj;&#9792;'],
		['👱🏿', '&#128113;&#127999;'],
		['👱🏾', '&#128113;&#127998;'],
		['👱🏽', '&#128113;&#127997;'],
		['👱🏼', '&#128113;&#127996;'],
		['👱🏻', '&#128113;&#127995;'],
		['👱', '&#128113;'],
		['🌖', '&#127766;'],
		['🔒', '&#128274;'],
		['🍏', '&#127823;'],
		['👺', '&#128122;'],
		['➰', '&#10160;'],
		['🚩', '&#128681;'],
		['🔄', '&#128260;'],
		['🐎', '&#128014;'],
		['🍤', '&#127844;'],
		['🌄', '&#127748;'],
		['🌋', '&#127755;'],
		['🐓', '&#128019;'],
		['📥', '&#128229;'],
		['💒', '&#128146;'],
		['🍣', '&#127843;'],
		['〰', '&#12336;'],
		['🍨', '&#127848;'],
		['⏪', '&#9194;'],
		['🍅', '&#127813;'],
		['🐇', '&#128007;'],
		['✴️', '&#10036;'],
		['🔺', '&#128314;'],
		['🔆', '&#128262;'],
		['➕', '&#10133;'],
		['👲🏿', '&#128114;&#127999;'],
		['👲🏾', '&#128114;&#127998;'],
		['👲🏽', '&#128114;&#127997;'],
		['👲🏼', '&#128114;&#127996;'],
		['👲🏻', '&#128114;&#127995;'],
		['👲', '&#128114;'],
		['🏪', '&#127978;'],
		['👥', '&#128101;'],
		['🐞', '&#128030;'],
		['🔻', '&#128315;'],
		['🇩🇪', '&#127465;'],
		['⤴️', '&#10548;'],
		['📛', '&#128219;'],
		['🛀🏿', '&#128704;&#127999;'],
		['🛀🏾', '&#128704;&#127998;'],
		['🛀🏽', '&#128704;&#127997;'],
		['🛀🏼', '&#128704;&#127996;'],
		['🛀🏻', '&#128704;&#127995;'],
		['🛀', '&#128704;'],
		['⛔', '&#9940;'],
		['🐊', '&#128010;'],
		['🌰', '&#127792;'],
		['🐕', '&#128021;'],
		['🐈', '&#128008;'],
		['🔨', '&#128296;'],
		['🍖', '&#127830;'],
		['🐚', '&#128026;'],
		['❇️', '&#10055;'],
		['⛵', '&#9973;'],
		['🅱️', '&#127345;'],
		['Ⓜ️', '&#9410;'],
		['🐩', '&#128041;'],
		['♒', '&#9810;'],
		['🍲', '&#127858;'],
		['👖', '&#128086;'],
		['🍯', '&#127855;'],
		['🎹', '&#127929;'],
		['🔓', '&#128275;'],
		['✒', '&#10002;'],
		['🗽', '&#128509;'],
		['💲', '&#128178;'],
		['🏂', '&#127938;'],
		['💮', '&#128174;'],
		['👔', '&#128084;'],
		['💠', '&#128160;'],
		['♈', '&#9800;'],
		['🚺', '&#128698;'],
		['🐜', '&#128028;'],
		['♏', '&#9807;'],
		['🌇', '&#127751;'],
		['⏳', '&#9203;'],
		['🅾️', '&#127358;'],
		['🐲', '&#128050;'],
		['🐌', '&#128012;'],
		['📀', '&#128192;'],
		['👕', '&#128085;'],
		['🎲', '&#127922;'],
		['➖', '&#10134;'],
		['🎎', '&#127886;'],
		['♐', '&#9808;'],
		['🎱', '&#127921;'],
		['🚌', '&#128652;'],
		['🍮', '&#127854;'],
		['🎌', '&#127884;'],
		['〽️', '&#12349;'],
		['🐫', '&#128043;'],
		['🍛', '&#127835;'],
		['🚂', '&#128642;'],
		['🏥', '&#127973;'],
		['🇯🇵', '&#127471;'],
		['🔷', '&#128311;'],
		['🎋', '&#127883;'],
		['🔔', '&#128276;'],
		['♌', '&#9804;'],
		['♊', '&#9802;'],
		['🍐', '&#127824;'],
		['🔶', '&#128310;'],
		['♉', '&#9801;'],
		['🌐', '&#127760;'],
		['🚪', '&#128682;'],
		['🕕', '&#128341;'],
		['🚔', '&#128660;'],
		['📩', '&#128233;'],
		['🌂', '&#127746;'],
		['🎷', '&#127927;'],
		['⛪', '&#9962;'],



		['🚴🏿‍♀', '&#128692;&#127999;&zwj;&#9792;'],
		['🚴🏾‍♀', '&#128692;&#127998;&zwj;&#9792;'],
		['🚴🏽‍♀', '&#128692;&#127997;&zwj;&#9792;'],
		['🚴🏼‍♀', '&#128692;&#127996;&zwj;&#9792;'],
		['🚴🏻‍♀', '&#128692;&#127995;&zwj;&#9792;'],
		['🚴‍♀', '&#128692;&zwj;&#9792;'],
		['🚴🏿', '&#128692;&#127999;'],
		['🚴🏾', '&#128692;&#127998;'],
		['🚴🏽', '&#128692;&#127997;'],
		['🚴🏼', '&#128692;&#127996;'],
		['🚴🏻', '&#128692;&#127995;'],
		['🚴', '&#128692;'],
		['♓', '&#9811;'],
		['🍡', '&#127841;'],
		['♑', '&#9809;'],
		['🏢', '&#127970;'],
		['🚣🏿‍♀', '&#128675;&#127999;&zwj;&#9792;'],
		['🚣🏾‍♀', '&#128675;&#127998;&zwj;&#9792;'],
		['🚣🏽‍♀', '&#128675;&#127997;&zwj;&#9792;'],
		['🚣🏼‍♀', '&#128675;&#127996;&zwj;&#9792;'],
		['🚣🏻‍♀', '&#128675;&#127995;&zwj;&#9792;'],
		['🚣‍♀', '&#128675;&zwj;&#9792;'],
		['🚣🏿', '&#128675;&#127999;'],
		['🚣🏾', '&#128675;&#127998;'],
		['🚣🏽', '&#128675;&#127997;'],
		['🚣🏼', '&#128675;&#127996;'],
		['🚣🏻', '&#128675;&#127995;'],
		['🚣', '&#128675;'],
		['👒', '&#128082;'],
		['👞', '&#128094;'],
		['🏩', '&#127977;'],
		['🗻', '&#128507;'],
		['🐪', '&#128042;'],
		['👜', '&#128092;'],
		['⌛', '&#8987;'],
		['❎', '&#10062;'],
		['🎺', '&#127930;'],
		['🏫', '&#127979;'],
		['🐄', '&#128004;'],
		['🌆', '&#127750;'],
		['👷🏿‍♀', '&#128119;&#127999;&zwj;&#9792;'],
		['👷🏾‍♀', '&#128119;&#127998;&zwj;&#9792;'],
		['👷🏽‍♀', '&#128119;&#127997;&zwj;&#9792;'],
		['👷🏼‍♀', '&#128119;&#127996;&zwj;&#9792;'],
		['👷🏻‍♀', '&#128119;&#127995;&zwj;&#9792;'],
		['👷‍♀', '&#128119;&zwj;&#9792;'],
		['👷🏿', '&#128119;&#127999;'],
		['👷🏾', '&#128119;&#127998;'],
		['👷🏽', '&#128119;&#127997;'],
		['👷🏼', '&#128119;&#127996;'],
		['👷🏻', '&#128119;&#127995;'],
		['👷', '&#128119;'],
		['🚽', '&#128701;'],
		['🐖', '&#128022;'],
		['❔', '&#10068;'],
		['🔰', '&#128304;'],
		['🎻', '&#127931;'],
		['🔛', '&#128283;'],
		['💳', '&#128179;'],
		['🆔', '&#127380;'],
		['㊙', '&#12953;'],
		['🎡', '&#127905;'],
		['🎳', '&#127923;'],
		['♎', '&#9806;'],
		['♍', '&#9805;'],
		['💈', '&#128136;'],
		['👛', '&#128091;'],
		['🎢', '&#127906;'],
		['🐀', '&#128000;'],
		['📅', '&#128197;'],
		['🏉', '&#127945;'],
		['🐏', '&#128015;'],
		['🔼', '&#128316;'],
		['🔲', '&#128306;'],
		['📴', '&#128244;'],
		['🗼', '&#128508;'],
		['㊗', '&#12951;'],
		['👘', '&#128088;'],
		['🇷🇺', '&#127479;'],
		['🚢', '&#128674;'],
		['🔎', '&#128270;'],
		['🔍', '&#128269;'],
		['🚒', '&#128658;'],
		['🕦', '&#128358;'],
		['🚓', '&#128659;'],
		['🃏', '&#127183;'],
		['🌉', '&#127753;'],
		['📦', '&#128230;'],
		['🚖', '&#128662;'],
		['📆', '&#128198;'],
		['🏇', '&#127943;'],
		['🐅', '&#128005;'],
		['👢', '&#128098;'],
		['🚑', '&#128657;'],
		['🔳', '&#128307;'],
		['🐗', '&#128023;'],
		['🎒', '&#127890;'],
		['➿', '&#10175;'],
		['💷', '&#128183;'],
		['ℹ', '&#8505;'],
		['🐂', '&#128002;'],
		['🍙', '&#127833;'],
		['🆚', '&#127386;'],
		['🔚', '&#128282;'],
		['🅿️', '&#127359;'],
		['👡', '&#128097;'],
		['⛺', '&#9978;'],
		['💺', '&#128186;'],
		['🚕', '&#128661;'],
		['◾', '&#9726;'],
		['💼', '&#128188;'],
		['📰', '&#128240;'],
		['🎪', '&#127914;'],
		['🔯', '&#128303;'],
		['🚹', '&#128697;'],
		['🏰', '&#127984;'],
		['🔦', '&#128294;'],
		['🌁', '&#127745;'],
		['⏫', '&#9195;'],
		['🎍', '&#127885;'],
		['🎫', '&#127915;'],
		['🚁', '&#128641;'],
		['💽', '&#128189;'],
		['🚍', '&#128653;'],
		['🍈', '&#127816;'],
		['▫', '&#9643;'],
		['🏤', '&#127972;'],
		['🔟', '&#128287;'],
		['📓', '&#128211;'],
		['🔕', '&#128277;'],
		['🍢', '&#127842;'],
		['🎏', '&#127887;'],
		['🎠', '&#127904;'],
		['🐡', '&#128033;'],
		['📈', '&#128200;'],
		['🍠', '&#127840;'],
		['🎿', '&#127935;'],
		['🕛', '&#128347;'],
		['📶', '&#128246;'],
		['🚧', '&#128679;'],
		['#', '&#35;'],
		['◼', '&#9724;'],
		['📡', '&#128225;'],
		['💶', '&#128182;'],
		['👚', '&#128090;'],
		['📒', '&#128210;'],
		['🐆', '&#128006;'],
		['🔅', '&#128261;'],
		['🕒', '&#128338;'],
		['🏬', '&#127980;'],
		['🚚', '&#128666;'],
		['🍶', '&#127862;'],
		['🚃', '&#128643;'],
		['🚤', '&#128676;'],
		['🇰🇷', '&#127472;'],
		['📼', '&#128252;'],
		['🕐', '&#128336;'],
		['⏬', '&#9196;'],
		['🐃', '&#128003;'],
		['🔽', '&#128317;'],
		['💴', '&#128180;'],
		['🔇', '&#128263;'],
		['🎽', '&#127933;'],
		['⬜', '&#11036;'],
		['♿', '&#9855;'],
		['🕑', '&#128337;'],
		['📎', '&#128206;'],
		['🏧', '&#127975;'],
		['🎦', '&#127910;'],
		['🔭', '&#128301;'],
		['🎑', '&#127889;'],
		['📘', '&#128216;'],
		['◻️', '&#9723;'],
		['📮', '&#128238;'],
		['📧', '&#128231;'],
		['🐁', '&#128001;'],
		['🚄', '&#128644;'],
		['🉐', '&#127568;'],
		['🔩', '&#128297;'],
		['🆖', '&#127382;'],
		['🏨', '&#127976;'],
		['🚾', '&#128702;'],
		['🏮', '&#127982;'],
		['🔂', '&#128258;'],
		['📬', '&#128236;'],
		['📉', '&#128201;'],
		['📗', '&#128215;'],
		['🚜', '&#128668;'],
		['⛲', '&#9970;'],
		['🚇', '&#128647;'],
		['📋', '&#128203;'],
		['📵', '&#128245;'],
		['🕓', '&#128339;'],
		['🚭', '&#128685;'],
		['⬛', '&#11035;'],
		['🎰', '&#127920;'],
		['🕔', '&#128340;'],
		['🛁', '&#128705;'],
		['📜', '&#128220;'],
		['🚉', '&#128649;'],
		['🍘', '&#127832;'],
		['🏦', '&#127974;'],
		['🔧', '&#128295;'],
		['🈯️', '&#127535;'],
		['🚛', '&#128667;'],
		['📄', '&#128196;'],
		['⛎', '&#9934;'],
		['📊', '&#128202;'],
		['🚷', '&#128695;'],
		['🇨🇳', '&#127464;'],
		['📳', '&#128243;'],
		['🕙', '&#128345;'],
		['🕘', '&#128344;'],
		['🚅', '&#128645;'],
		['🚐', '&#128656;'],
		['🚊', '&#128650;'],
		['🕗', '&#128343;'],
		['🈳', '&#127539;'],
		['🚥', '&#128677;'],
		['🚵🏿‍♀', '&#128693;&#127999;&zwj;&#9792;'],
		['🚵🏾‍♀', '&#128693;&#127998;&zwj;&#9792;'],
		['🚵🏽‍♀', '&#128693;&#127997;&zwj;&#9792;'],
		['🚵🏼‍♀', '&#128693;&#127996;&zwj;&#9792;'],
		['🚵🏻‍♀', '&#128693;&#127995;&zwj;&#9792;'],
		['🚵‍♀', '&#128693;&zwj;&#9792;'],
		['🚵🏿', '&#128693;&#127999;'],
		['🚵🏾', '&#128693;&#127998;'],
		['🚵🏽', '&#128693;&#127997;'],
		['🚵🏼', '&#128693;&#127996;'],
		['🚵🏻', '&#128693;&#127995;'],
		['🚵', '&#128693;'],
		['🔬', '&#128300;'],
		['🏯', '&#127983;'],
		['🔖', '&#128278;'],
		['📑', '&#128209;'],
		['👝', '&#128093;'],
		['🆎', '&#127374;'],
		['📃', '&#128195;'],
		['🎴', '&#127924;'],
		['🕚', '&#128346;'],
		['📠', '&#128224;'],
		['🕖', '&#128342;'],
		['◽', '&#9725;'],
		['💱', '&#128177;'],
		['🔉', '&#128265;'],
		['💹', '&#128185;'],
		['🆑', '&#127377;'],
		['💾', '&#128190;'],
		['🏣', '&#127971;'],
		['🔈', '&#128264;'],
		['🗾', '&#128510;'],
		['🈺', '&#127546;'],
		['🀄', '&#126980;'],
		['📨', '&#128232;'],
		['📙', '&#128217;'],
		['🚻', '&#128699;'],
		['🈚️', '&#127514;'],
		['🈶', '&#127542;'],
		['📐', '&#128208;'],
		['🚋', '&#128651;'],
		['🈸', '&#127544;'],
		['🚎', '&#128654;'],
		['🈷', '&#127543;'],
		['🔢', '&#128290;'],
		['📔', '&#128212;'],
		['🈲', '&#127538;'],
		['🈵', '&#127541;'],
		['📯', '&#128239;'],
		['🏭', '&#127981;'],
		['🚸', '&#128696;'],
		['🚆', '&#128646;'],
		['📏', '&#128207;'],
		['📟', '&#128223;'],
		['🉑', '&#127569;'],
		['🈴', '&#127540;'],
		['🔏', '&#128271;'],
		['🕜', '&#128348;'],
		['🈂️', '&#127490;'],
		['📤', '&#128228;'],
		['🔀', '&#128256;'],
		['📫', '&#128235;'],
		['🚈', '&#128648;'],
		['🕤', '&#128356;'],
		['🚏', '&#128655;'],
		['📂', '&#128194;'],
		['📁', '&#128193;'],
		['🚰', '&#128688;'],
		['📇', '&#128199;'],
		['🕝', '&#128349;'],
		['🚝', '&#128669;'],
		['🕧', '&#128359;'],
		['🕥', '&#128357;'],
		['🔤', '&#128292;'],
		['📪', '&#128234;'],
		['🕟', '&#128351;'],
		['🚞', '&#128670;'],
		['🚯', '&#128687;'],
		['🕞', '&#128350;'],
		['➗', '&#10135;'],
		['🕢', '&#128354;'],
		['🕠', '&#128352;'],
		['🔠', '&#128288;'],
		['📭', '&#128237;'],
		['🔣', '&#128291;'],
		['🚡', '&#128673;'],
		['🕣', '&#128355;'],
		['🕡', '&#128353;'],
		['🔡', '&#128289;'],
		['🚠', '&#128672;'],
		['🈁', '&#127489;'],
		['🛂', '&#128706;'],
		['🚱', '&#128689;'],
		['🚟', '&#128671;'],
		['🛄', '&#128708;'],
		['🚳', '&#128691;'],



		['🏳‍🌈', '&#127987;&zwj;&#127752;'],

		['☹', '&#9785;'],
		['☠', '&#9760;'],
		['🤗', '&#129303;'],
		['🤖', '&#129302;'],
		['🤕', '&#129301;'],
		['🤔', '&#129300;'],
		['🤓', '&#129299;'],
		['🤒', '&#129298;'],
		['🤑', '&#129297;'],
		['🤐', '&#129296;'],
		['🙄', '&#128580;'],
		['🙃', '&#128579;'],
		['🙂', '&#128578;'],
		['🙁', '&#128577;'],
		['🤘🏿', '&#129304;&#127999;'],
		['🤘🏾', '&#129304;&#127998;'],
		['🤘🏽', '&#129304;&#127997;'],
		['🤘🏼', '&#129304;&#127996;'],
		['🤘🏻', '&#129304;&#127995;'],
		['🤘', '&#129304;'],
		['🖖🏿', '&#128406;&#127999;'],
		['🖖🏾', '&#128406;&#127998;'],
		['🖖🏽', '&#128406;&#127997;'],
		['🖖🏼', '&#128406;&#127996;'],
		['🖖🏻', '&#128406;&#127995;'],
		['🖖', '&#128406;'],
		['🖕🏿', '&#128405;&#127999;'],
		['🖕🏾', '&#128405;&#127998;'],
		['🖕🏽', '&#128405;&#127997;'],
		['🖕🏼', '&#128405;&#127996;'],
		['🖕🏻', '&#128405;&#127995;'],
		['🖕', '&#128405;'],
		['🖐🏿', '&#128400;&#127999;'],
		['🖐🏾', '&#128400;&#127998;'],
		['🖐🏽', '&#128400;&#127997;'],
		['🖐🏼', '&#128400;&#127996;'],
		['🖐🏻', '&#128400;&#127995;'],
		['🖐', '&#128400;'],
		['✍🏿', '&#9997;&#127999;'],
		['✍🏾', '&#9997;&#127998;'],
		['✍🏽', '&#9997;&#127997;'],
		['✍🏼', '&#9997;&#127996;'],
		['✍🏻', '&#9997;&#127995;'],
		['✍', '&#9997;'],
		['🕶', '&#128374;'],
		['👁‍🗨', '&#128065;&zwj;&#128488;'],
		['👁', '&#128065;'],
		['🏋🏿‍♀', '&#127947;&#127999;&zwj;&#9792;'],
		['🏋🏾‍♀', '&#127947;&#127998;&zwj;&#9792;'],
		['🏋🏽‍♀', '&#127947;&#127997;&zwj;&#9792;'],
		['🏋🏼‍♀', '&#127947;&#127996;&zwj;&#9792;'],
		['🏋🏻‍♀', '&#127947;&#127995;&zwj;&#9792;'],
		['🏋‍♀', '&#127947;&zwj;&#9792;'],
		['🏋🏿', '&#127947;&#127999;'],
		['🏋🏾', '&#127947;&#127998;'],
		['🏋🏽', '&#127947;&#127997;'],
		['🏋🏼', '&#127947;&#127996;'],
		['🏋🏻', '&#127947;&#127995;'],
		['🏋', '&#127947;'],
		['⛹🏿‍♀', '&#9977;&#127999;&zwj;&#9792;'],
		['⛹🏾‍♀', '&#9977;&#127998;&zwj;&#9792;'],
		['⛹🏽‍♀', '&#9977;&#127997;&zwj;&#9792;'],
		['⛹🏼‍♀', '&#9977;&#127996;&zwj;&#9792;'],
		['⛹🏻‍♀', '&#9977;&#127995;&zwj;&#9792;'],
		['⛹‍♀', '&#9977;&zwj;&#9792;'],
		['⛹🏿', '&#9977;&#127999;'],
		['⛹🏾', '&#9977;&#127998;'],
		['⛹🏽', '&#9977;&#127997;'],
		['⛹🏼', '&#9977;&#127996;'],
		['⛹🏻', '&#9977;&#127995;'],
		['⛹', '&#9977;'],
		['🕴', '&#128372;'],
		['🏌', '&#127948;'],
		['🏌‍♀', '&#127948;&zwj;&#9792;'],

		['❣️', '&#10083;'],
		['✡️', '&#10017;'],
		['✝️', '&#10013;'],
		['⚜', '&#9884;'],
		['⚛', '&#9883;'],
		['☸', '&#9784;'],
		['☯', '&#9775;'],
		['☮', '&#9774;'],
		['☪', '&#9770;'],
		['☦', '&#9766;'],
		['☣', '&#9763;'],
		['☢', '&#9762;'],
    ];

    entities.forEach(function (tab, i) {
        content = content.replace(new RegExp(tab[0], "g"), tab[1]);
    });

    return content;
};
