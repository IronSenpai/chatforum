"use strict";define("forum/notifications",["components"],function(t){var i={};i.init=function(){var i=$(".notifications-list");i.on("click",'[component="notifications/item/link"]',function(){var t=$(this).parents("[data-nid]").attr("data-nid");socket.emit("notifications.markRead",t,function(t){if(t){return app.alertError(t)}})});$(".timeago").timeago();t.get("notifications/mark_all").on("click",function(){socket.emit("notifications.markAllRead",function(i){if(i){return app.alertError(i.message)}t.get("notifications/item").removeClass("unread")})})};return i});
//# sourceMappingURL=public/src/client/notifications.js.map