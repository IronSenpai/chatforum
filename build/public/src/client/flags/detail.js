"use strict";define("forum/flags/detail",["forum/flags/list","components","translator"],function(t,a,e){var s={};s.init=function(){$("#state").val(ajaxify.data.state).removeAttr("disabled");$("#assignee").val(ajaxify.data.assignee).removeAttr("disabled");$("[data-action]").on("click",function(){var t=this.getAttribute("data-action");switch(t){case"update":socket.emit("flags.update",{flagId:ajaxify.data.flagId,data:$("#attributes").serializeArray()},function(t,a){if(t){return app.alertError(t.message)}app.alertSuccess("[[flags:updated]]");s.reloadHistory(a)});break;case"appendNote":socket.emit("flags.appendNote",{flagId:ajaxify.data.flagId,note:document.getElementById("note").value},function(t,a){if(t){return app.alertError(t.message)}app.alertSuccess("[[flags:note-added]]");s.reloadNotes(a.notes);s.reloadHistory(a.history)});break}});t.enableFilterForm();t.enableChatButtons()};s.reloadNotes=function(t){templates.parse("flags/detail","notes",{notes:t},function(t){var e=a.get("flag/notes");e.empty();e.html(t);e.find("span.timeago").timeago();document.getElementById("note").value=""})};s.reloadHistory=function(t){templates.parse("flags/detail","history",{history:t},function(t){e.translate(t,function(t){var e=a.get("flag/history");e.empty();e.html(t);e.find("span.timeago").timeago()})})};return s});
//# sourceMappingURL=public/src/client/flags/detail.js.map