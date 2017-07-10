$(function () {
    // different intervals for carousels
    $('#generic-carousel').carousel({interval: 1000 * 2});
    $('#myCarousel').carousel({interval: 1000 * 6});
    var firstScroll = 1;

    // menu highlight on scroll
    // Cache selectors
    var lastId,
            topMenu = $("#mainNav"),
            topMenuHeight = topMenu.outerHeight() + 1,
            // All list items
            menuItems = topMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var href = $(this).attr("href") ||
                        $(this).attr("ref");
                href = href === "#" ? null : href;
                var item = $(href);
                if (item.length) {
                    return item;
                }
            });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            var curSection = menuItems.parent().removeClass("active")
                    .end().filter('[href="#' + id + '"],[ref="#' + id + '"]');
            curSection.parent().addClass("active");
            if (curSection && $(curSection).attr("href") === "#about") {
                // slider scroll
                if (firstScroll) {
                    $(".progress-bar").each(function () {
                        //$(this).width(Math.floor(Math.random()*500));
                        var width = $(this).children("span").html();
                        $(this).css({width: width});

                    });

                    firstScroll = 0;
                }
            }
        }
    });
});


