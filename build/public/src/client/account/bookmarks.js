"use strict";define("forum/account/bookmarks",["forum/account/header","forum/account/posts"],function(o,n){var t={};t.init=function(){o.init();$('[component="post/content"] img:not(.not-responsive)').addClass("img-responsive");n.handleInfiniteScroll("posts.loadMoreBookmarks","account/bookmarks")};return t});
//# sourceMappingURL=public/src/client/account/bookmarks.js.map