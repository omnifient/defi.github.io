require(["gitbook", "jquery"], function (gitbook, $) {
  var SITES = {
    twitter: {
      label: "Twitter",
      icon: "fa fa-twitter",
      onClick: function (e) {
        e.preventDefault();
        window.open(
          "http://twitter.com/home?status=" +
            encodeURIComponent(document.title + " " + location.href)
        );
      },
    },

    telegram: {
      label: "Telegram",
      icon: "fa fa-telegram",
      onClick: function (e) {
        e.preventDefault();
        window.open("https://t.me");
      },
    },

    weibo: {
      label: "Weibo",
      icon: "fa fa-weibo",
      onClick: function (e) {
        e.preventDefault();
        window.open(
          "http://service.weibo.com/share/share.php?content=utf-8&url=" +
            encodeURIComponent(location.href) +
            "&title=" +
            encodeURIComponent(document.title)
        );
      },
    },

    vk: {
      label: "VK",
      icon: "fa fa-vk",
      onClick: function (e) {
        e.preventDefault();
        window.open(
          "http://vkontakte.ru/share.php?url=" +
            encodeURIComponent(location.href)
        );
      },
    },
  };

  gitbook.events.bind("start", function (e, config) {
    var opts = config.sharing;

    // Create dropdown menu
    var menu = $.map(opts.all, function (id) {
      var site = SITES[id];

      return {
        text: site.label,
        onClick: site.onClick,
      };
    });

    // Create main button with dropdown
    if (menu.length > 0) {
      gitbook.toolbar.createButton({
        icon: "fa fa-share-alt",
        label: "Share",
        position: "right",
        dropdown: [menu],
      });
    }

    // Direct actions to share
    $.each(SITES, function (sideId, site) {
      if (!opts[sideId]) return;

      var onClick = site.onClick;

      // override target link with provided link
      var side_link = opts[`${sideId}_link`];
      if (side_link !== undefined && side_link !== "") {
        onClick = function (e) {
          e.preventDefault();
          window.open(side_link);
        };
      }

      gitbook.toolbar.createButton({
        icon: site.icon,
        label: site.text,
        position: "right",
        onClick: onClick,
      });
    });
  });
});
