"use strict";define("forum/topic/images",["forum/topic/postTools","navigator","components"],function(t,a,e){var i={_imageLoaderTimeout:undefined};i.unloadImages=function(t){var a=t.find('[component="post/content"] img:not(.not-responsive)');if(config.delayImageLoading){a.each(function(){$(this).attr("data-src",$(this).attr("src"))}).attr("data-state","unloaded").attr("src","about:blank")}else{a.attr("data-state","loaded");i.wrapImagesInLinks(t);$(window).trigger("action:images.loaded")}};i.loadImages=function(t){if(i._imageLoaderTimeout){clearTimeout(i._imageLoaderTimeout)}if(!config.delayImageLoading){return}i._imageLoaderTimeout=setTimeout(function(){var a=e.get("post/content").find('img[data-state="unloaded"]');var n=a.filter(function(){return utils.isElementInViewport(this)});var o=$.unique(n.map(function(){return $(this).parents('[component="post"]').get(0)}));var r=$(window).scrollTop();var s=false;var d=[];var c;var l;function u(){s=true;c=document.body.clientHeight;$(this).attr("data-state","loaded");l=document.body.clientHeight;var a=this.getBoundingClientRect();if(a.top<t){r+=l-c;$(window).scrollTop(r)}if(d.length){d.pop()()}else{s=false;i.wrapImagesInLinks(o);$(window).trigger("action:images.loaded");o.length=0}}n.attr("data-state","loading");n.each(function(t,a){a=$(a);a.on("load",function(){if(!s){u.call(this)}else{d.push(u.bind(this))}});a.attr("src",a.attr("data-src"));a.removeAttr("data-src")})},250)};i.wrapImagesInLinks=function(t){t.find('[component="post/content"] img:not(.emoji)').each(function(){var t=$(this);var a=t.attr("src")||"";var e=t.attr("alt")||"";var i=/-resized(\.[\w]+)?$/;if(a==="about:blank"){return}if(utils.isRelativeUrl(a)&&i.test(a)){a=a.replace(i,"$1")}var n=a.split(".").slice(1).pop();var o=e.split("/").pop();var r=o.split(".").slice(1).pop();if(!t.parent().is("a")){t.wrap('<a href="'+a+'" '+(!n&&r?' download="'+o+'" ':"")+' target="_blank" >')}})};return i});
//# sourceMappingURL=public/src/client/topic/images.js.map