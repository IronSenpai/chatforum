"use strict";define("admin/appearance/themes",["translator"],function(e){var t={};t.init=function(){$("#installed_themes").on("click",function(e){var t=$(e.target);var n=t.attr("data-action");if(n&&n==="use"){var s=t.parents("[data-theme]");var r=s.attr("data-type");var i=s.attr("data-css");var m=s.attr("data-theme");socket.emit("admin.themes.set",{type:r,id:m,src:i},function(e){if(e){return app.alertError(e.message)}config["theme:id"]=m;a(m);app.alert({alert_id:"admin:theme",type:"info",title:"[[admin/appearance/themes:theme-changed]]",message:"[[admin/appearance/themes:restart-to-activate]]",timeout:5e3,clickfn:function(){socket.emit("admin.restart")}})})}});$("#revert_theme").on("click",function(){bootbox.confirm("[[admin/appearance/themes:revert-confirm]]",function(e){if(e){socket.emit("admin.themes.set",{type:"local",id:"nodebb-theme-persona"},function(e){if(e){return app.alertError(e.message)}a("nodebb-theme-persona");app.alert({alert_id:"admin:theme",type:"success",title:"[[admin/appearance/themes:theme-changed]]",message:"[[admin/appearance/themes:revert-success]]",timeout:3500})})}})});socket.emit("admin.themes.getInstalled",function(t,n){if(t){return app.alertError(t.message)}var s=$("#installed_themes");if(!n.length){s.append($("<li/ >").addClass("no-themes").translateHtml("[[admin/appearance/themes:no-themes]]"))}else{templates.parse("admin/partials/theme_list",{themes:n},function(t){e.translate(t,function(e){s.html(e);a(config["theme:id"])})})}})};function a(t){e.translate("[[admin/appearance/themes:select-theme]]  ||  [[admin/appearance/themes:current-theme]]",function(e){e=e.split("  ||  ");var a=e[0];var n=e[1];$("[data-theme]").removeClass("selected").find('[data-action="use"]').html(a).removeClass("btn-success").addClass("btn-primary");$('[data-theme="'+t+'"]').addClass("selected").find('[data-action="use"]').html(n).removeClass("btn-primary").addClass("btn-success")})}return t});
//# sourceMappingURL=public/src/admin/appearance/themes.js.map