"use strict";define("admin/general/dashboard",["semver","Chart","translator"],function(a,e,t){var s={};var r={rooms:false,graphs:false};var n=false;var o=/^v?\d+\.\d+\.\d+-.+$/;var i={rooms:{},traffic:{}};var d={units:"hours",until:undefined};var l={roomInterval:1e4,graphInterval:15e3,realtimeInterval:1500};var c=[];$(window).on("action:ajaxify.start",function(){clearInterval(r.rooms);clearInterval(r.graphs);r.rooms=null;r.graphs=null;i.rooms=null;i.traffic=null;c.length=0});s.init=function(){app.enterRoom("admin");n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);$.get("https://api.github.com/repos/NodeBB/NodeBB/tags",function(e){e=e.sort(function(e,t){e=e.name.replace(/^v/,"");t=t.name.replace(/^v/,"");return a.lt(e,t)?1:-1}).filter(function(a){return!o.test(a.name)});var s=$("#version").html();var r=e[0].name.slice(1);var n=$(".version-check");var i;if(a.eq(r,s)){n.removeClass("alert-info").addClass("alert-success");i="[[admin/general/dashboard:up-to-date]]"}else if(a.gt(r,s)){n.removeClass("alert-info").addClass("alert-warning");if(!o.test(s)){i="[[admin/general/dashboard:upgrade-available, "+r+"]]"}else{i="[[admin/general/dashboard:prerelease-upgrade-available, "+r+"]]"}}else if(o.test(s)){n.removeClass("alert-info").addClass("alert-info");i="[[admin/general/dashboard:prerelease-warning]]"}t.translate(i,function(a){n.append(a)})});$('[data-toggle="tooltip"]').tooltip();y();f(function(){socket.emit("admin.rooms.getAll",s.updateRoomUsage);B()})};s.updateRoomUsage=function(a,e){if(a){return app.alertError(a.message)}if(JSON.stringify(i.rooms)===JSON.stringify(e)){return}i.rooms=e;var t='<div class="text-center pull-left">'+'<span class="formatted-number">'+e.onlineRegisteredCount+"</span>"+'<div class="stat">[[admin/general/dashboard:active-users.users]]</div>'+"</div>"+'<div class="text-center pull-left">'+'<span class="formatted-number">'+e.onlineGuestCount+"</span>"+'<div class="stat">[[admin/general/dashboard:active-users.guests]]</div>'+"</div>"+'<div class="text-center pull-left">'+'<span class="formatted-number">'+(e.onlineRegisteredCount+e.onlineGuestCount)+"</span>"+'<div class="stat">[[admin/general/dashboard:active-users.total]]</div>'+"</div>"+'<div class="text-center pull-left">'+'<span class="formatted-number">'+e.socketCount+"</span>"+'<div class="stat">[[admin/general/dashboard:active-users.connections]]</div>'+"</div>";h(e.onlineRegisteredCount,e.onlineGuestCount);b(e.users);C(e.topics);$("#active-users").translateHtml(t)};var u={traffic:null,registered:null,presence:null,topics:null};var g=["#bf616a","#5B90BF","#d08770","#ebcb8b","#a3be8c","#96b5b4","#8fa1b3","#b48ead","#ab7967","#46BFBD"];function p(a,e){var t=false;if(a[0]==="#"){a=a.slice(1);t=true}var s=parseInt(a,16);var r=(s>>16)+e;if(r>255)r=255;else if(r<0)r=0;var n=(s>>8&255)+e;if(n>255)n=255;else if(n<0)n=0;var o=(s&255)+e;if(o>255)o=255;else if(o<0)o=0;return(t?"#":"")+(o|n<<8|r<<16).toString(16)}function f(a){a=a||function(){};var r=document.getElementById("analytics-traffic");var o=document.getElementById("analytics-registered");var i=document.getElementById("analytics-presence");var d=document.getElementById("analytics-topics");var l=r.getContext("2d");var c=o.getContext("2d");var g=i.getContext("2d");var p=d.getContext("2d");var f=utils.getHoursArray();if(n){e.defaults.global.tooltips.enabled=false}var h=t.Translator.create();Promise.all([h.translateKey("admin/general/dashboard:graphs.page-views",[]),h.translateKey("admin/general/dashboard:graphs.unique-visitors",[]),h.translateKey("admin/general/dashboard:graphs.registered-users",[]),h.translateKey("admin/general/dashboard:graphs.anonymous-users",[]),h.translateKey("admin/general/dashboard:on-categories",[]),h.translateKey("admin/general/dashboard:reading-posts",[]),h.translateKey("admin/general/dashboard:browsing-topics",[]),h.translateKey("admin/general/dashboard:recent",[]),h.translateKey("admin/general/dashboard:unread",[])]).then(function(t){var n={labels:f,datasets:[{label:t[0],backgroundColor:"rgba(220,220,220,0.2)",borderColor:"rgba(220,220,220,1)",pointBackgroundColor:"rgba(220,220,220,1)",pointHoverBackgroundColor:"#fff",pointBorderColor:"#fff",pointHoverBorderColor:"rgba(220,220,220,1)",data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{label:t[1],backgroundColor:"rgba(151,187,205,0.2)",borderColor:"rgba(151,187,205,1)",pointBackgroundColor:"rgba(151,187,205,1)",pointHoverBackgroundColor:"#fff",pointBorderColor:"#fff",pointHoverBorderColor:"rgba(151,187,205,1)",data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]};r.width=$(r).parent().width();u.traffic=new e(l,{type:"line",data:n,options:{responsive:true,legend:{display:false},scales:{yAxes:[{ticks:{beginAtZero:true}}]}}});u.registered=new e(c,{type:"doughnut",data:{labels:t.slice(2,4),datasets:[{data:[1,1],backgroundColor:["#F7464A","#46BFBD"],hoverBackgroundColor:["#FF5A5E","#5AD3D1"]}]},options:{responsive:true,legend:{display:false}}});u.presence=new e(g,{type:"doughnut",data:{labels:t.slice(4,9),datasets:[{data:[1,1,1,1,1],backgroundColor:["#F7464A","#46BFBD","#FDB45C","#949FB1","#9FB194"],hoverBackgroundColor:["#FF5A5E","#5AD3D1","#FFC870","#A8B3C5","#A8B3C5"]}]},options:{responsive:true,legend:{display:false}}});u.topics=new e(p,{type:"doughnut",data:{labels:[],datasets:[{data:[],backgroundColor:[],hoverBackgroundColor:[]}]},options:{responsive:true,legend:{display:false}}});m();$(window).on("resize",v);v();$('[data-action="updateGraph"]:not([data-units="custom"])').on("click",function(){var a=new Date;var e=$(this).attr("data-amount");if($(this).attr("data-units")==="days"){a.setHours(0,0,0,0)}a=a.getTime();m($(this).attr("data-units"),a,e);$('[data-action="updateGraph"]').removeClass("active");$(this).addClass("active");require(["translator"],function(a){a.translate("[[admin/general/dashboard:page-views-custom]]",function(a){$('[data-action="updateGraph"][data-units="custom"]').text(a)})})});$('[data-action="updateGraph"][data-units="custom"]').on("click",function(){var a=$(this);templates.parse("admin/partials/pageviews-range-select",{},function(e){var t=bootbox.dialog({title:"[[admin/general/dashboard:page-views-custom]]",message:e,buttons:{submit:{label:"[[global:search]]",className:"btn-primary",callback:s}}});function s(){var e=t.find("form").serializeObject();var s=/\d{4}-\d{2}-\d{2}/;if(!e.startRange&&!e.endRange){m("days");$('[data-action="updateGraph"]').removeClass("active");$('[data-action="updateGraph"][data-units="days"]').addClass("active");return}else if(!s.test(e.startRange)||!s.test(e.endRange)){t.find(".alert-danger").removeClass("hidden");return false}var r=new Date(e.endRange);r.setDate(r.getDate()+1);r=r.getTime();var n=(r-new Date(e.startRange).getTime())/(1e3*60*60*24);m("days",r,n);$('[data-action="updateGraph"]').removeClass("active");a.addClass("active");a.html(e.startRange+" &ndash; "+e.endRange)}})});socket.emit("admin.rooms.getAll",s.updateRoomUsage);B();a()})}function v(){$(".pie-chart.legend-up").each(function(){var a=$(this);if(a.width()<320){a.addClass("compact")}else{a.removeClass("compact")}})}function m(a,e,t){if(!app.isFocused){return}socket.emit("admin.analytics.get",{graph:"traffic",units:a||"hours",until:e,amount:t},function(s,r){if(s){return app.alertError(s.message)}if(JSON.stringify(i.traffic)===JSON.stringify(r)){return}i.traffic=r;if(a==="days"){u.traffic.data.xLabels=utils.getDaysArray(e,t)}else{u.traffic.data.xLabels=utils.getHoursArray();$("#pageViewsThirty").html(r.summary.thirty);$("#pageViewsSeven").html(r.summary.seven);$("#pageViewsPastDay").html(r.pastDay);utils.addCommasToNumbers($("#pageViewsThirty"));utils.addCommasToNumbers($("#pageViewsSeven"));utils.addCommasToNumbers($("#pageViewsPastDay"))}u.traffic.data.datasets[0].data=r.pageviews;u.traffic.data.datasets[1].data=r.uniqueVisitors;u.traffic.data.labels=u.traffic.data.xLabels;u.traffic.update();d.units=a;d.until=e;d.amount=t})}function h(a,e){u.registered.data.datasets[0].data[0]=a;u.registered.data.datasets[0].data[1]=e;u.registered.update()}function b(a){u.presence.data.datasets[0].data[0]=a.categories;u.presence.data.datasets[0].data[1]=a.topics;u.presence.data.datasets[0].data[2]=a.category;u.presence.data.datasets[0].data[3]=a.recent;u.presence.data.datasets[0].data[4]=a.unread;u.presence.update()}function C(a){if(!Object.keys(a).length){a={0:{title:"No users browsing",value:1}}}var e=Object.keys(a);u.topics.data.labels=[];u.topics.data.datasets[0].data=[];u.topics.data.datasets[0].backgroundColor=[];u.topics.data.datasets[0].hoverBackgroundColor=[];for(var t=0,s=e.length;t<s;t+=1){u.topics.data.labels.push(a[e[t]].title);u.topics.data.datasets[0].data.push(a[e[t]].value);u.topics.data.datasets[0].backgroundColor.push(g[t]);u.topics.data.datasets[0].hoverBackgroundColor.push(p(g[t],10))}function r(){var t=$("#topics-legend").html("");for(var s=0,r=e.length;s<r;s+=1){var n=a[e[s]];var o=n.value==="0"?n.title:'<a title="'+n.title+'"href="'+RELATIVE_PATH+"/topic/"+e[s]+'" target="_blank"> '+n.title+"</a>";t.append("<li>"+'<div style="background-color: '+g[s]+';"></div>'+"<span>"+o+"</span>"+"</li>")}}r();u.topics.update()}function y(){$("#toggle-realtime .fa").on("click",function(){var a=$(this);if(a.hasClass("fa-toggle-on")){a.removeClass("fa-toggle-on").addClass("fa-toggle-off");a.parent().find("strong").html("OFF");B(false)}else{a.removeClass("fa-toggle-off").addClass("fa-toggle-on");a.parent().find("strong").html("ON");B(true)}})}function B(a){clearInterval(r.rooms);clearInterval(r.graphs);r.rooms=setInterval(function(){if(app.isFocused&&app.isConnected){socket.emit("admin.rooms.getAll",s.updateRoomUsage)}},a?l.realtimeInterval:l.roomInterval);r.graphs=setInterval(function(){m(d.units,d.until,d.amount)},a?l.realtimeInterval:l.graphInterval)}return s});
//# sourceMappingURL=public/src/admin/general/dashboard.js.map