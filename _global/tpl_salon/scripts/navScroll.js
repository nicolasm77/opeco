$j(function(){

	var navScroll = {
		init : function(){
			var self = this;

			self.nav = $j(".sidebar__root");
			self.menua = $j(".sidebar__menu-a");
			self.submenua = $j(".sidebar__submenu-a");

			self.currentSection = "categorie-1";

			self.events();
			if(!location.hash) {
				self.menua.eq(0).next().css({display:"block"}).parent().addClass("current");
			}else{
				$j(window).on("load", function(){
					$j(window).trigger("hashchange");
				})
			}
		},

		events : function(){
			var self = this;

			$j(window).on('hashchange', $j.proxy(self.doTheThing, self));
			$j(window).on('scroll', $j.proxy(self.checkScroll, self));
		},

		doTheThing : function(){
			var self = this;

			if(location.hash.indexOf("#categorie") > -1){
				self.changeSection(self.menua.filter("[href="+ location.hash +"]"));
			}else{
				var link = self.submenua.filter("[href="+ location.hash +"]");
				var newSection = link.closest(".sidebar__item").children(".sidebar__menu-a");
				if(self.currentSection != newSection.attr("href").substring(1)){
					self.changeSection(newSection, link);
				}else{
					newSection.next().css({display:"block"})
					self.scrollTo(link);
				}
			}
		},

		changeSection : function(elm, subElm){
			//e.preventDefault();
			var self = this;
			// var elm = $j(e.currentTarget);

			$j(".sidebar__item.current").removeClass("current").children(".sidebar__submenu").slideUp(300);

			elm.parent().addClass("current").children(".sidebar__submenu").slideDown(300);

			$j(".press__section#_" + elm.attr("href").substring(1)).css({opacity:0}).show();
			$j(".press__section#_" + self.currentSection).fadeOut(300,function(){
				if($j(window).scrollTop() > $j(".press__block-articles").offset().top) $j(window).scrollTop($j(".press__block-articles").offset().top)
				$j(".press__section#_" + elm.attr("href").substring(1)).fadeTo(1,300);

				setTimeout(function(){
					subElm = subElm || elm.parent().find(".sidebar__submenu-a").eq(0);
					if(subElm.length){
						self.scrollTo(subElm, true);
					}else{
						$j('html, body').animate({
							scrollTop: $j('.press__root').offset().top +1
						}, 250);
					}
				},100)
			});

			self.currentSection = elm.attr("href").substring(1);
		},

		scrollTo : function(elm, fast){
			var self = this;
			var speed = (fast)? 250 : 500;

			$j('html, body').animate({
				scrollTop: $j("#_"+elm.attr("href").substring(1)).offset().top +1
			}, speed);
		},

		checkScroll : function(){
			var self = this;

			var limitTop = $j('.press__root').offset().top;
			var limitBottom = ($j('.others__root').length)? $j('.others__root').offset().top : $j('#footer').offset().top;
			var scroll = $j(window).scrollTop();
			var navHeight = $j('.sidebar__nav').outerHeight();

			var current = $j("#_"+self.currentSection);
			var articles = current.find('.press__article');

			if( scroll >= limitTop ) {
				self.nav.addClass('fixed');
			} else {
				self.nav.removeClass('fixed');
			}

			if( scroll + navHeight >= limitBottom ) {
				self.nav.addClass('fixed-bottom');
			} else {
				self.nav.removeClass('fixed-bottom');
			}

			articles.each(function(){
				var current = $j(this).attr('id').substring(1);

				if ($j(this).offset().top <= (scroll+40) && ($j(this).offset().top + $j(this).outerHeight()) > scroll){
					$j('.sidebar__submenu-a[href*="'+current+'"]').parent().addClass('current');
				}else{
					$j('.sidebar__submenu-a[href*="'+current+'"]').parent().removeClass('current');
				}
			});
		}
	};

	navScroll.init();
});

