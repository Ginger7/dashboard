
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
;(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


/* 	Инициализация переменных	 */
var browserDetect = {
		isIE10_11: false,
		mobileDevice: device.mobile() || device.tablet(),

	/* Определение версии IE, взято с http://www.majas-lapu-izstrade.lv/useful/cross-browser-grayscale-image-example-using-css3-js */
		getIEVersion: function(){
			var rv = -1;
			if (navigator.appName == 'Microsoft Internet Explorer'){
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
			}
			else if (navigator.appName == 'Netscape'){
				var ua = navigator.userAgent;
				var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
					rv = parseFloat( RegExp.$1 );
			};
			return rv;
		}
};
if (browserDetect.getIEVersion() == 11){
		document.querySelector('html').className += ' ie11';
		browserDetect.isIE10_11 = true;
};


function injectJS(url, async, integrity, crossorigin, callback){
	if(url !== "undefined"){
		var s = document.createElement('script');
		s.src = url;
		if(async) s.setAttribute('async', true);
		if(integrity) s.setAttribute('integrity', integrity);
		if(crossorigin) s.setAttribute('crossorigin', crossorigin);

		if (typeof callback == "function") {
				s.onload = function (e){
					if (e.type == 'load') setTimeout(callback, 0)
				}
		};

		document.head.appendChild(s);
	}
};


// Переменные для определения текущего размера экрана
var mqBreakPoints = {
	smartphoneMax: 479.98,
	screenXsMin: 480,
	screenXsMax: 575.98,
	screenSmMin: 576,
	screenSmMax: 767.98,
	screenMdMin: 768,
	screenMdMax: 991.98,
	screenLgMin: 992,
	screenLgMax: 1199.98,
	screenXlMin: 1200,
	screenXlMax: 1599.98,
	screenXXlMin: 1600,
	screenXXlMax: 1819.98,
	screenXXXlMin: 1820,
}
var mqMatches = {
	smartphoneMax: false,
	screenXsMin: false,
	screenXsMax: false,
	screenSmMin: false,
	screenSmMax: false,
	screenMdMin: false,
	screenMdMax: false,
	screenLgMin: false,
	screenLgMax: false,
	screenXlMin: false,
	screenXlMax: false,
	screenXXlMin: false,
	screenXXlMax: false,
	screenXXXlMin: false
};

// Текущий Breakpoint храним в mqMatches
for (let bp in mqBreakPoints) {
	let minmax = (bp.indexOf('Max') !== -1) ? 'max' : 'min';
	enquire.register('('+minmax+'-width: '+mqBreakPoints[bp]+'px)', {
		match: function () { mqMatches[bp] = true },
		unmatch: function(){	mqMatches[bp] = false	}
	})
};

// Поддержка элемента picture
if( !Modernizr.picture ){
	injectJS("https://cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js", true, 'sha256-iT+n/otuaeKCgxnASny7bxKeqCDbaV1M7VdX1ZRQtqg=', 'anonymous');
};
// Поддержка fetch для IE11
if( !Modernizr.fetch ){
	injectJS("https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/dist/fetch.umd.js", false, 'sha256-mgxDAbboBKeoCOtpaU7QhWdgWBGum+8dPxnIjiC97JI=', 'anonymous');
};
// Поддержка SVG некоторыми браузерами
injectJS("https://cdn.jsdelivr.net/npm/svg4everybody@2.1.9/dist/svg4everybody.min.js", true, 'sha256-kTezPOsOi5ZsWUKr7/D/EWcONq/hdrc0gPwk5/IUYy0=', 'anonymous');

// Поддержка position: sticky
if (!Modernizr.csspositionsticky) {
	injectJS("https://cdn.jsdelivr.net/npm/stickyfilljs@2.1.0/dist/stickyfill.min.js");
}
