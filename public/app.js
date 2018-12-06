$(function () {

    var paths = {
        img: './assets/img/'
    }

    var locals = {
        "app": {
            "name": "browser title",
            "description": "meta description",
            "keywords": "meta keywords"
        },
        "home_categories": ["美术", "技术", "音频", "本地化", "资质"],
        "home_display1": {
            "title": "热门资源",
            "learn_more": true,
            "col": "2",
            "body": [
              {
                  "title": "著名大师若昕，欧美魔幻画风",
                  "image": "home-thumb-1.jpg",
                  "price": "5000",
                  "days": "45",
                  "comments": "26",
                  "stars_image": "ic-stars-1.png"
              },
              {
                  "title": "大师zhangji曾服务世界顶级项目",
                  "image": "home-thumb-2.jpg",
                  "price": "5000",
                  "days": "45",
                  "comments": "26",
                  "stars_image": "ic-stars-2.png"
              }
            ]
        },
        "home_display2": {
            "title": "热门推荐",
            "learn_more": true,
            "col": "2",
            "body": [
              {
                  "title": "现代风格3D角色，韩国作者",
                  "image": "home-thumb-3.jpg",
                  "price": "12000",
                  "days": "45",
                  "comments": "54",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "大师zhangji曾服务世界顶级项目",
                  "image": "home-thumb-4.jpg",
                  "price": "5000",
                  "days": "45",
                  "comments": "26",
                  "stars_image": "ic-stars-4.png"
              }
            ],
            "other": "查看更多同类资源"
        },
        "home_display3": {
            "title": "猜你喜欢",
            "learn_more": true,
            "col": "1",
            "body": [
              {
                  "title": "水墨风格/国产武侠原画，超高精度，包满意",
                  "image": "home-thumb-5.jpg",
                  "price": "¥30000-50000",
                  "days": "45",
                  "comments": "1012",
                  "author": "home-author-thumb-1.jpg"
              },
              {
                  "title": "游戏美术风格的归类与划分",
                  "image": "home-thumb-6.jpg",
                  "price": "¥30000-50000",
                  "days": "45",
                  "comments": "2091",
                  "author": "home-author-thumb-2.jpg"
              },
              {
                  "title": "游戏美术风格的归类与划分",
                  "image": "home-thumb-7.jpg",
                  "price": "¥ 30000-50000",
                  "days": "45",
                  "comments": "2091",
                  "author": "home-author-thumb-3.jpg"
              }
            ]
        },
        "list_display1": {
            "title": "",
            "learn_more": false,
            "col": "1",
            "hasFavorite": true,
            "body": [
              {
                  "title": "蒸汽朋克风格场景设计，多款成功项目经验，顶级水平",
                  "image": "list-thumb-1.jpg",
                  "price": "¥599",
                  "days": "1",
                  "comments": "1001",
                  "author": "list-author-thumb-1.jpg",
                  "stars_image": "ic-stars-4.png"
              },
              {
                  "title": "中国水墨风格/国产武侠原画，超高精度，包满意",
                  "image": "home-thumb-5.jpg",
                  "price": "¥599",
                  "days": "1",
                  "comments": "2091",
                  "author": "home-author-thumb-1.jpg",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "3D/支持虚幻4引擎/欧美竞速，模型设计，全球顶级制作水准",
                  "image": "list-thumb-2.jpg",
                  "price": "¥599",
                  "days": "1",
                  "comments": "2091",
                  "author": "list-author-thumb-2.jpg",
                  "stars_image": "ic-stars-2.png"
              },
              {
                  "title": "3D/支持虚幻4引擎/欧美竞速，模型设计，全球顶级制作水准",
                  "image": "home-thumb-6.jpg",
                  "price": "¥599",
                  "days": "1",
                  "comments": "2091",
                  "author": "home-author-thumb-3.jpg",
                  "stars_image": "ic-stars-1.png"
              },
              {
                  "title": "3D/支持虚幻4引擎/欧美竞速，模型设计，全球顶级制作水准",
                  "image": "list-thumb-3.jpg",
                  "price": "¥599",
                  "days": "1",
                  "comments": "2091",
                  "author": "list-author-thumb-3.jpg"
              }
            ]
        },
        "search_history": ["美术外包", "3D游戏", "仙侠", "二次元", "配音", "程序外包", "角色外包", "场景设计", "UI外包", "游戏图标", "更多记录", "更多记录", "更多记录", "更多记录", "更多记录", "更多记录"],
        "main_menu": [
          {
              "icon": "ic--menu--search",
              "name": "搜索",
              "link": "./search.html"
          },
          {
              "icon": "ic--menu--share",
              "name": "分享",
              "link": "#"
          },
          {
              "icon": "ic--menu--selected",
              "name": "精选",
              "link": "#"
          },
          {
              "icon": "ic--menu--msg",
              "name": "消息",
              "link": "#"
          },
          {
              "icon": "ic--menu--me",
              "name": "我的",
              "link": "#"
          }
        ],
        "filter_menu": ["筛选条件", "筛选条件", "筛选条件", "筛选条件", "筛选条件"],
        "store_body": "水墨动漫成立于2016年（前身米卡工作室成立于2012年），座落与福州橘园洲创意广场，主营游戏美术外包设计，公司坚持以人为本的管理理念，以追求卓越为目标，以技术力量为核心，以市场需求为导向，以高质高效为基础，大力倡导提升内部制作团队和管理团队的综合实力与技术实力，团队设计师行业经验均在6年以上，专注于国内外游戏美术外包（cocos2d、android安卓、unity3D等游戏美术整包设计），与国内外多家游戏开发公司成功合作过多款大型网络游戏、网页游戏和手机游戏的开发制作，并在多年的游戏外包服务中整理出一套完整的服务管控体系。以量身定做为服务理念，为客户提供更专业、更高效、更严谨的服务，以诚信为本，向客户提供长期、稳定和优质的游戏美术服务，已完成100余款页游、手游整套美术设计，是国内游戏开发公司的优质合作服务商，欢迎长期定制与合作。",
        "store_comments": [
          {
              "author": "西西",
              "date": "1月 2017年",
              "thumb": "chat-thumb-1.jpg",
              "body": "最和气的服务商很多修改都积极配合，感谢感谢！"
          },
          {
              "author": "冰天雪地",
              "date": "2月 2017年",
              "thumb": "chat-thumb-2.jpg",
              "body": "最和气的服务商很多修改都积极配合，感谢感谢！",
              "reply": {
                  "author": "千代",
                  "body": "水准很高的团队，虽然时间上有点纠结，比原计划晚了5天，感谢您的喜欢！"
              }
          },
          {
              "author": "西西",
              "date": "1月 2017年",
              "thumb": "chat-thumb-1.jpg",
              "body": "团队设计师行业经验均在6年以上，专注于国内外游戏美术外包（cocos2d、android安卓、unity3D等游戏美术整包设计），与国内外多家游戏开发公司成功合作过多款大型网络游戏、网页游戏和手机游戏的开发制作，并在多年的游戏外包服务中整理出一套完整的服务管控体系。以量身定做为服务理念，为客户提供更专业、更高效、更严谨的服务，以诚信为本，向客户提供长期、稳定和优质的游戏美术服务，已完成100余款页游、手游整套美术设计，是国内游戏开发公司的优质合作服务商，很满意。"
          }
        ],
        "user_display": {
            "title": "",
            "col": "2",
            "body": [
              {
                  "title": "现代风格3D角色，韩国作者",
                  "image": "home-thumb-3.jpg",
                  "price": "12000",
                  "days": "45",
                  "comments": "54",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "现代风格3D角色，韩国作者",
                  "image": "home-thumb-3.jpg",
                  "price": "12000",
                  "days": "45",
                  "comments": "54",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "现代风格3D角色，韩国作者",
                  "image": "home-thumb-3.jpg",
                  "price": "12000",
                  "days": "45",
                  "comments": "54",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "现代风格3D角色，韩国作者",
                  "image": "home-thumb-3.jpg",
                  "price": "12000",
                  "days": "45",
                  "comments": "54",
                  "stars_image": "ic-stars-3.png"
              },
              {
                  "title": "大师zhangji曾服务世界顶级项目",
                  "image": "home-thumb-4.jpg",
                  "price": "5000",
                  "days": "45",
                  "comments": "26",
                  "stars_image": "ic-stars-4.png"
              }
            ]
        }
    };

    var body = $('body');

    $.fn.extend({
        $: function (e) {
            return $(this).append('<' + (e ? e : 'div') + '>').children().last();
        },
        c: $.fn.addClass,
        id: function (i) {
            return $(this).attr('id', i);
        },
        href: function (f) {
            return $(this).attr('href', '#').on('click touch', function () {
                f(body.empty());
            });
        }
    });

    function search_bar(l0, a) {
        var ifCancel = a == 0 ? false : true;
        var klass = ifCancel ? 'c-search--result' : '';
        var input_klass = a == 0 ? 'has-shadow' : 'bg--wild-sand has-corner--5';
        var l1, l2, l3, l4, l5;
        l1 = l0.$().c('c-search l-mgn--t-10').c(klass);
        l2 = l1.$('form').c('c-search--form').id('sf');
        l3 = l2.$().c('c-search--form--input').c(input_klass);
        l4 = l3.$().c('c-search--icon ic--search');
        l4 = l3.$('input').attr('type', 'text').attr('name', 'sf-wd').attr('placeholder', '点击搜索各类资源');
        if (ifCancel) {
            l4 = l3.c('c-search--form--cancel text--c');
            l5 = l4.$('a').attr('href', '#').text('取消');
        }
    }

    function display_projects(l0, data) {
        var title = data.title || '';
        var viewMore = data.learn_more ? true : false;
        var col = data.col;
        var shadow_klass = col == 2 ? '' : 'has-shadow';
        var hasFavorite = data.hasFavorite ? true : false;

        var l1, l2, l3, l4, l5, l6, l7;

        l1 = l0.$().c('m-display-projects');
        if (title) {
            l2 = l1.$().c('l-columns l-mgn--b-10');
            l3 = l2.$().c('txt--h1 txt--500 col l-v--m l-w--70p').text(title);
            l3 = l2.$().c('col l-v--m l-w--30p txt--r');
            if (viewMore) {
                l4 = l3.$('a').c('m-display-projects--more').href(project_list).text('查看更多');
            }
        }
        l2 = l1.$().c('l-columns');

        for (var i in data.body) {
            var item = data.body[i];
            var klass = col == 2 ? 'l-w--50p col-2' : 'l-w--100p col-1';
            var space_klass = (parseInt(i) + 1) % 2 == 0 ? 'l-pad--l-5' : 'l-pad--r-5';
            var _price = item.price + '/套';
            var _days = '制作周期: ' + item.days + '天';
            var _comments = item.comments + '人评价';
            var stars_img = item.stars_image || 'ic-stars-5.png';

            if (col == 2)
                klass = klass + ' ' + space_klass;

            l3 = l2.$('a').c('col m-display-projects--item').c(klass).href(store);
            if (data.hasFavorite) {
                l4 = l3.$().c('ic--favorite js-favorite');
            }
            l4 = l3.$('img').c('has-corner--5 l-w--100p').attr('src', paths.img + item.image).c(shadow_klass);
            l4 = l3.$().c('m-display-projects--item--name').text(item.title);
            if (col == 2) {
                l4 = l3.$().c('m-display-projects--item--price').text(_price);
                l4 = l3.$().c('m-display-projects--item--days').text(_days);
                l4 = l3.$().c('l-columns');
                l5 = l4.$().c('col l-w--30p');
                l6 = l5.$('img').c('l-w--100p').attr('src', paths.img + stars_img);
                l5 = l4.$().c('col l-w--60p l-pad--l-10 m-display-projects--item--comments').text(_comments);
            } else {
                l4 = l3.$().c('col l-w--70p l-v--t');
                l5 = l4.$().c('m-display-projects--item--price').text(_price);
                l5 = l4.$().c('m-display-projects--item--days').text(_days);
                l5 = l4.$().c('l-columns l-pad--l-5 l-pad--r-5');
                l6 = l5.$().c('col l-w--25p l-v--m');
                l7 = l6.$('img').c('l-w--100p').attr('src', paths.img + stars_img);
                l6 = l5.$().c('col l-w--70p l-pad--l-10 m-display-projects--item--comments l-v--m').text(_comments);
                l4 = l3.$().c('col l-w--30p l-pad--r-10');
                l5 = l4.$().c('m-display-projects--item--author');
                l6 = l5.$('img').c('has-corner--50p').attr('src', paths.img + item.author);
            }
        }
        if (data.other) {
            l3 = l2.$('a').c('btn-type-1 l-mgn--t-15 l-w--45p other txt--500').href(project_list).text(data.other);
        }
    }

    function menu(l0, n) {
        var l1, l2, l3;
        l1 = l0.$().c('c-menu l-columns');
        for (var i in locals.main_menu) {
            var item = locals.main_menu[i];
            var _klass = i == n ? 'active' : '';
            var icon_klass = item.icon + ' ' + _klass;

            l2 = l1.$('a').c('c-menu--item col l-w--20p').c(_klass).href(item.link);
            l3 = l2.$().c('c-menu--item--icon ic--menu').c(icon_klass);
            l3 = l2.$('span').c('c-menu--item--name').text(item.name);
        }
    }

    function index(l0) {
        var l1, l2, l3, sliderContainer;
        l1 = l0.$().c('c-content has-menu');
        search_bar(l1, 0);
        l2 = sliderContainer = l1.$().c('c-categories l-mgn--t-15 js-categories-slider');
        locals.home_categories.forEach(function (item) {
            l3 = l2.$('a').c('c-categories--btn').href(project_list).text(item);
        });
        l2 = l1.$().c('l-mgn--t-40');
        display_projects(l2, locals.home_display1);
        display_projects(l2, locals.home_display2);
        l2 = l1.$().c('l-mgn--t-30');
        display_projects(l2, locals.home_display3);

        menu(l0, 0);

        sliderContainer.slick({
            dots: false,
            infinite: false,
            slidesToShow: 4,
            arrows: false
        });

        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true
        })
    }

    function project_list(l0) {
        var l1;
        l1 = l0.$('a').href(index).text('return to index.html');
    }

    function store(l0) {

    }

    index(body);
});

