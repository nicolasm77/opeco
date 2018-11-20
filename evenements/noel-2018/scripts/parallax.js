/*jshint esversion: 6 */

$j(function(){
    var working = false;
    var scrollAction = function() {
        working = false;
    };

    var setDirection = {
        bgVertical: function (elem, bgOffset) {
            return elem.css({'background-position': 'center ' + -bgOffset + 'px'});
        },
        bgHorizontal: function (elem, bgOffset) {
            return elem.css({'background-position': -bgOffset + 'px' + ' center'});
        },
        vertical: function (elem, elemOffset, oldTransform) {
            (oldTransform === 'none' ? oldTransform = '' : true);
            return elem.css({
                '-webkit-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                '-moz-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                'transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
                'transition': 'transform linear',
                'will-change': 'transform'
            });
        },
        horizontal: function (elem, elemOffset, oldTransform) {
            (oldTransform === 'none' ? oldTransform = '' : true);
            return elem.css({
                '-webkit-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                '-moz-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                'transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
                'transition': 'transform linear',
                'will-change': 'transform'
            });
        }
    };

    var setMovement = {
        factor: function (elem, width, options) {
            var dataFactor = elem.data('paroller-factor');
            var factor = (dataFactor) ? dataFactor : options.factor;
            if (width < 576) {
                var dataFactorXs = elem.data('paroller-factor-xs');
                var factorXs = (dataFactorXs) ? dataFactorXs : options.factorXs;
                return (factorXs) ? factorXs : factor;
            }
            else if (width <= 768) {
                var dataFactorSm = elem.data('paroller-factor-sm');
                var factorSm = (dataFactorSm) ? dataFactorSm : options.factorSm;
                return (factorSm) ? factorSm : factor;
            }
            else if (width <= 1024) {
                var dataFactorMd = elem.data('paroller-factor-md');
                var factorMd = (dataFactorMd) ? dataFactorMd : options.factorMd;
                return (factorMd) ? factorMd : factor;
            }
            else if (width <= 1200) {
                var dataFactorLg = elem.data('paroller-factor-lg');
                var factorLg = (dataFactorLg) ? dataFactorLg : options.factorLg;
                return (factorLg) ? factorLg : factor;
            } else if (width <= 1920) {
                var dataFactorXl = elem.data('paroller-factor-xl');
                var factorXl = (dataFactorXl) ? dataFactorXl : options.factorXl;
                return (factorXl) ? factorXl : factor;
            } else {
                return factor;
            }
        },
        bgOffset: function (offset, factor) {
            return Math.round(offset * factor);
        },
        transform: function (offset, factor, windowHeight, height) {
            return Math.round((offset - (windowHeight / 2) + height) * factor);
        }
    };

    var clearPositions = {
        background: function (elem) {
            return elem.css({'background-position': 'unset'});
        },
        foreground: function (elem) {
            return elem.css({
                'transform' : 'unset',
                'transition' : 'unset'
            });
        }
    };

    $j.fn.paroller = function (options) {
        var windowHeight = $j(window).height();
        var windowWidth = $j(window).width();
        var documentHeight = $j(document).height();

        // default options
        var options = $j.extend({
            factor: 0, // - to +
            factorXs: 0, // - to +
            factorSm: 0, // - to +
            factorMd: 0, // - to +
            factorLg: 0, // - to +
            factorXl: 0, // - to +
            type: 'background', // foreground
            direction: 'vertical', // horizontal
            gap: 0 // horizontal
        }, options);

        return this.each(function () {
            var $jthis = $j(this);
            var width = $j(window).width();
            var offset = $jthis.offset().top;
            var height = $jthis.outerHeight();

            var dataType = $jthis.data('paroller-type');
            var dataDirection = $jthis.data('paroller-direction');
            var oldTransform = $jthis.css('transform');

            var type = (dataType) ? dataType : options.type;
            var direction = (dataDirection) ? dataDirection : options.direction;
            var factor = setMovement.factor($jthis, width, options);
            var bgOffset = setMovement.bgOffset(offset, factor);
            var transform = setMovement.transform(offset, factor, windowHeight, height);

            if (type === 'background') {
                if (direction === 'vertical') {
                    setDirection.bgVertical($jthis, bgOffset);
                }
                else if (direction === 'horizontal') {
                    setDirection.bgHorizontal($jthis, bgOffset);
                }
            }
            else if (type === 'foreground') {
                if (direction === 'vertical') {
                    setDirection.vertical($jthis, transform, oldTransform);
                }
                else if (direction === 'horizontal') {
                    setDirection.horizontal($jthis, transform, oldTransform);
                }
            }

            $j(window).on('resize', function () {
				windowWidth = $j(window).width();
				windowHeight = $j(window).height();
                width = $j(window).width();
                offset = $jthis.offset().top;
                height = $jthis.outerHeight();
                factor = setMovement.factor($jthis, width, options);

                bgOffset = Math.round(offset * factor)+(options.gap*windowWidth/1920);
                transform = Math.round((offset - (windowHeight / 2) + height) * factor);

                if (! working) {
                    window.requestAnimationFrame(scrollAction);
                    working = true;
                }

                if (type === 'background') {
                    // clearPositions.background($jthis);
                    if (direction === 'vertical') {
                        setDirection.bgVertical($jthis, bgOffset);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.bgHorizontal($jthis, bgOffset);
                    }
                }
                else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                    // clearPositions.foreground($jthis);
                    if (direction === 'vertical') {
                        setDirection.vertical($jthis, transform);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.horizontal($jthis, transform);
                    }
				}

				$j(window).trigger("scroll");
			});

			window.oldScroll = window.scrollY;
            $j(window).on('scroll', function () {
                var scrolling = $j(this).scrollTop();
                documentHeight = $j(document).height();

                bgOffset = Math.round((offset - scrolling) * factor)+(options.gap*windowWidth/1920);
                transform = Math.round(((offset - (windowHeight / 2) + height) - scrolling) * factor);

                if (! working) {
                    window.requestAnimationFrame(scrollAction);
                    working = true;
                }

                if (type === 'background') {
                    if (direction === 'vertical') {
                        setDirection.bgVertical($jthis, bgOffset);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.bgHorizontal($jthis, bgOffset);
                    }
                }
                else if ((type === 'foreground') && (scrolling <= documentHeight)) {
                    if (direction === 'vertical') {
                        setDirection.vertical($jthis, transform, oldTransform);
                    }
                    else if (direction === 'horizontal') {
                        setDirection.horizontal($jthis, transform, oldTransform);
                    }
				}

				if(this.scrollY < 5){
					$j(".gototop").removeClass("gototop--show");
				}else if(Math.abs(this.oldScroll - this.scrollY) > 1){
					if(this.oldScroll > this.scrollY){
						$j(".gototop").addClass("gototop--show");
					}else{
						$j(".gototop").removeClass("gototop--show");
					}
					this.oldScroll = this.scrollY;
				}
            });
        });
    };

    $j('.conversation__block').paroller({
        factor: 0.6,
        factorSm : 0.3,
        factorXs : 0.2,
        gap : 220
    });

    $j('.app__back-img').paroller({
        factor: 0.45,
        factorSm : 0.3,
        factorXs : 0.3,
        gap : 50
    });

    $j('.advent__header').paroller({
        factor: 0.45,
        factorMd : 0.6,
        factorSm : 0.6,
        gap : 90
    });

    // $j('.advent__title').paroller({
    //     factor: 0.1,
    //     factorMd : 0,
    //     factorSm : 0,
    //     factorXs : 0,
    //     type:"foreground"
    // });

    // $j('.app__phone--01').paroller({
    //     factor: 0.15,
    //     factorSm : 0.1,
    //     factorXs : 0,
    //     type:"foreground"
    // });

    // $j('.app__phone--02').paroller({
    //     factor: 0.3,
    //     factorSm : 0.2,
    //     factorXs : 0.1,
    //     type:"foreground"
    // });


});
