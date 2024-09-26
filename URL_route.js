$.views.converters({
    urlForJsTmpl: function(name) {
        return window._debug ? `/t/jst/${name}` : `//static-basket-01.wbbasket.ru/vol0/t/jst/${name}`;
    }
});
Object.defineProperty($.views.helpers, "globalSettings", {
    get: function() {
        return wb.global.settings;
    }
});
$.views.helpers({
    wbSettings: wb.settings,
    urlSignIn: function(returnUrl) {
        let signInUrl = "/security/login";
        if (returnUrl)
            return `${signInUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;
        else if (window.location.pathname === signInUrl) {
            if (window.location.search.indexOf("returnUrl=") === -1)
                return signInUrl;
            return window.location.href;
        }
        return `${signInUrl}?returnUrl=${encodeURIComponent(window.location.href)}`;
    },
    getCustomPromoPanelStyle: function(panelPromoId) {
        const panelPromo = WbSpaModel.prototype.$promotionsHelper.getById(panelPromoId);
        if (panelPromo)
            return panelPromo.style;
        return null;
    },
    getCustomPromoPanel: function(panelPromoId) {
        return WbSpaModel.prototype.$promotionsHelper.getById(panelPromoId);
    }
});
wb.urlHelper = {
    alsoBuyCatalog: function(nmId) {
        return 'recommendation/catalog?type=alsobuy&amp;excludeNms=true&forproduct=' + nmId;
    },
    bestSellerCatalog: function() {
        return 'recommendation/catalog?type=bestsallers&amp;excludeNms=false';
    },
    recommendedByNmCatalog: function(nmId) {
        return 'recommendation/catalog?type=recommendedbynm&amp;excludeNms=false&forproduct=' + nmId;
    },
    promoCatalogByNm: function(nmId) {
        return 'recommendation/catalog?type=promo&amp;excludeNms=false&forproduct=' + nmId;
    },
    promotions: function() {
        return '';
    },
    xSearchBase: '/catalog/0/search.aspx'
};
document.addEventListener('DOMContentLoaded', function() {
    let templatesDictionary = {
        preview_General: '<div class="general-preloader"></div>',
    };
    $.templates(templatesDictionary);
    $.views.helpers({
        emailRegExp: /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@(?:([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,7})$/,
        innRegExp: /^(\d{12}|\d{14})$/,
        passportNumberRegExp: /^(\d{4}\s\d{6})$/,
        passportIssuedByRegExp: /^[а-яА-ЯёЁўЎіІ`.\s\-0-9№\":\,]+$/,
        dateRegExp: /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/
    });
    try {
        const routesDictionary = {
            "SubscriptionPageEntrypoint": {
                "tmpl": true,
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/subscription-page-v3.min.d19a95321cda0292.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/subscriptionPage.min.f56abce341b1cb25.js",
                "requiredData": {
                    "path": "subscription/data",
                    "name": "SubscriptionPageData"
                },
                "path": "subscription",
                "name": "SubscriptionPageEntrypoint"
            },
            "SpaWlArrivedEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/wlArrivedCatalog.min.32a97286b9342dff.js",
                "requiredData": {
                    "path": "webapi/lk/wlarrived/data",
                    "name": "SpaWlArrivedData"
                },
                "path": "lk/wlarrived",
                "name": "SpaWlArrivedEntrypoint",
                "tmpl": "SpaRecommendationsCatalog"
            },
            "SpaWalletPurchaseEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.dropDown.min.1316c63e19c2f8c2.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/imask.tag.min.bf6479023cb57023.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/orders-history-v3.min.46ef4c008bb50e17.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/walletTable.min.58cf4b86fcb5df61.js",
                "requiredData": {
                    "path": "webapi/lk/mywallet/purchases/data",
                    "name": "SpaWalletPurchaseData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/mywallet/purchases",
                "name": "SpaWalletPurchaseEntrypoint",
                "tmpl": true
            },
            "SpaWalletHistoryEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/orders-history-v3.min.46ef4c008bb50e17.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/walletTable.min.58cf4b86fcb5df61.js",
                "requiredData": {
                    "path": "webapi/lk/mywallet/history/data",
                    "name": "SpaWalletHistoryData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/mywallet/history",
                "name": "SpaWalletHistoryEntrypoint",
                "tmpl": true
            },
            "SpaCourierRefunds": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/refund-v3.min.f213cc9d0308761b.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/refund.min.cf75a0312e1079cf.js",
                "requiredData": {
                    "path": "webapi/lk/refunds/data",
                    "name": "SpaRefundData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/myrefunds",
                "name": "SpaCourierRefunds",
                "tmpl": true
            },
            "SpaMyClaimsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/refund-v3.min.f213cc9d0308761b.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/refund.min.cf75a0312e1079cf.js",
                "requiredData": {
                    "path": "webapi/lk/refunds/data",
                    "name": "SpaRefundData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/claims",
                "name": "SpaMyClaimsEntrypoint",
                "tmpl": "SpaCourierRefunds"
            },
            "SpaTravelLkEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/travel-v3.min.301b26c787972636.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/travelLk.min.5e74f8aaa46a8c86.js",
                "requiredData": {
                    "path": "webapi/lk/travel/data",
                    "name": "SpaTravelLkData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/travel",
                "name": "SpaTravelLkEntrypoint",
                "tmpl": true
            },
            "SpaSignInEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.dropDown.min.1316c63e19c2f8c2.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/imask.tag.min.bf6479023cb57023.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/sign-in-v3.min.fb3bd8d0c109883e.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/signIn.min.256e98eb3a8ddc28.js",
                "requiredData": {
                    "path": "webapi/security/login/data",
                    "name": "SpaSignInData"
                },
                "path": "security/login",
                "name": "SpaSignInEntrypoint",
                "tmpl": true
            },
            "SpaNotTemplatePromoPages": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/servicePages/service-page-v3.min.2706135958e863dd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/brandPromo.min.13d880e6c8af8890.js",
                "requiredData": {
                    "path": "webapi/productinfo/{brandName}/{cod1S:regex(^(\\d{{1,9}})$)}/data",
                    "name": "SpaNotTemplatePromoPagesData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "productinfo"
                    }, {
                        "name": "brandName",
                        "isParameter": true
                    }, {
                        "name": "cod1S",
                        "isParameter": true
                    }, {
                        "content": "data"
                    }]
                },
                "path": "productinfo/{brandName}/{cod1S:regex(^(\\d{{1,9}})$)}",
                "name": "SpaNotTemplatePromoPages",
                "routePathSegments": [{
                    "content": "productinfo"
                }, {
                    "name": "brandName",
                    "isParameter": true
                }, {
                    "name": "cod1S",
                    "isParameter": true
                }],
                "tmpl": true
            },
            "ServicePages": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/servicePages/service-page-v3.min.2706135958e863dd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/servicesPage.min.5182acb4c762ff64.js",
                "requiredData": {
                    "path": "webapi/servicesdata/{*ufuName}",
                    "name": "ServicePagesData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "servicesdata"
                    }, {
                        "name": "ufuName",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "path": "services/{*ufuName}",
                "name": "ServicePages",
                "routePathSegments": [{
                    "content": "services"
                }, {
                    "name": "ufuName",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": "ServicePages"
            },
            "SpaPromoPage": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/servicePages/service-page-v3.min.2706135958e863dd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/servicesPage.min.5182acb4c762ff64.js",
                "requiredData": {
                    "path": "webapi/servicesdata/{*ufuName}",
                    "name": "ServicePagesData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "servicesdata"
                    }, {
                        "name": "ufuName",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "path": "promo/{*ufuName}",
                "name": "SpaPromoPage",
                "routePathSegments": [{
                    "content": "promo"
                }, {
                    "name": "ufuName",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": "ServicePages"
            },
            "PressCenterMain": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/servicePages/service-page-v3.min.2706135958e863dd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/servicesPage.min.5182acb4c762ff64.js",
                "requiredData": {
                    "path": "webapi/presservice/data",
                    "name": "PressCenterData"
                },
                "path": "presservice",
                "name": "PressCenterMain",
                "tmpl": "ServicePages"
            },
            "SpaSellerCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/sellerCatalog.min.78437303ab034348.js",
                "requiredData": {
                    "path": "webapi/seller/data/{sellerId:int}/{*sellerUrlPart}",
                    "name": "SpaSellerCatalogData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "seller"
                    }, {
                        "content": "data"
                    }, {
                        "name": "sellerId",
                        "isParameter": true
                    }, {
                        "name": "sellerUrlPart",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "useSSR": true,
                "path": "seller/{sellerId:int}/{*sellerUrlPart}",
                "name": "SpaSellerCatalogEntrypoint",
                "routePathSegments": [{
                    "content": "seller"
                }, {
                    "name": "sellerId",
                    "isParameter": true
                }, {
                    "name": "sellerUrlPart",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": true
            },
            "SpaSearchEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/searchCatalog.min.3b6550038dede748.js",
                "requiredData": {
                    "path": "webapi/search/data",
                    "name": "SpaSearchData"
                },
                "path": "catalog/0/search.aspx",
                "name": "SpaSearchEntrypoint",
                "tmpl": true
            },
            "SpaSearchByImageEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/searchByImage.min.b72e65d09085e7b9.js",
                "requiredData": {
                    "path": "webapi/search/image/data/{imageId}",
                    "name": "SpaSearchByImageData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "search"
                    }, {
                        "content": "image"
                    }, {
                        "content": "data"
                    }, {
                        "name": "imageId",
                        "isParameter": true
                    }]
                },
                "path": "search/image/{imageId}",
                "name": "SpaSearchByImageEntrypoint",
                "routePathSegments": [{
                    "content": "search"
                }, {
                    "content": "image"
                }, {
                    "name": "imageId",
                    "isParameter": true
                }],
                "tmpl": true
            },
            "SpaRecommendationsSearchCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/recommendationsSearchCatalog.min.ee40f0d4fd62cdcf.js",
                "requiredData": {
                    "path": "webapi/recommendationssearch/data",
                    "name": "SpaRecommendationsSearchCatalogData"
                },
                "path": "recommendationssearch",
                "name": "SpaRecommendationsSearchCatalogEntrypoint",
                "tmpl": true
            },
            "SpaRecentCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/recommendationsCatalog.min.3706db494a498447.js",
                "requiredData": {
                    "path": "webapi/catalog/recent/data",
                    "name": "SpaRecentCatalogData"
                },
                "path": "catalog/recent",
                "name": "SpaRecentCatalogEntrypoint",
                "tmpl": "SpaRecommendationsCatalog"
            },
            "SpaRecommendationsCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/recommendationsCatalog.min.3706db494a498447.js",
                "requiredData": {
                    "path": "webapi/recommendation/catalog/data",
                    "name": "SpaRecommendationsCatalogData"
                },
                "path": "recommendation/catalog",
                "name": "SpaRecommendationsCatalogEntrypoint",
                "tmpl": true
            },
            "SpaPromotionsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-v3.min.e47cb9888a0b7f11.css"],
                "metaTagsUrl": "webapi/promotions/metatags",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/promotions.min.69201c26716bf412.js",
                "requiredData": {
                    "path": "webapi/promotions/data",
                    "name": "SpaPromotionsData"
                },
                "path": "promotions",
                "name": "SpaPromotionsEntrypoint",
                "tmpl": true
            },
            "SpaProductCardEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/collapsibleBlock.min.f764c196fe08866a.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/video.min.30e2aa8c55ae167d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.hlsPlayer.min.cbdcc3ec95625b2e.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/product-page-v3.min.2fe0d9db2a340446.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/productCardPopup.min.251d60c66b2c5c96.css"],
                "metaTagsUrl": "webapi/spa/product/metatags/{*nm}",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/product.min.e282e9466bc02c88.js",
                "requiredData": {
                    "path": "webapi/ru/{cod1S:regex(^(\\d{{1,9}})$)}.json",
                    "name": "SpaProductCardData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "ru"
                    }, {
                        "name": "cod1S",
                        "isParameter": true
                    }, {
                        "content": ".json"
                    }]
                },
                "useSSR": true,
                "targetContainer": 1,
                "path": "catalog/{cod1S:regex(^(\\d{{1,9}})$)}/detail.aspx",
                "name": "SpaProductCardEntrypoint",
                "routePathSegments": [{
                    "content": "catalog"
                }, {
                    "name": "cod1S",
                    "isParameter": true
                }, {
                    "content": "detail.aspx"
                }],
                "tmpl": true
            },
            "SpaProductCardOtherSellersEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/other-sellers-page-v3.min.d13cf154374de048.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/productCardOtherSellers.min.42f248c80a898647.js",
                "requiredData": {
                    "path": "webapi/catalog/{cod1S:regex(^(\\d{{1,9}})$)}/other-sellers/data",
                    "name": "SpaProductCardOtherSellersData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "catalog"
                    }, {
                        "name": "cod1S",
                        "isParameter": true
                    }, {
                        "content": "other-sellers"
                    }, {
                        "content": "data"
                    }]
                },
                "path": "catalog/{cod1S:regex(^(\\d{{1,9}})$)}/other-sellers",
                "name": "SpaProductCardOtherSellersEntrypoint",
                "routePathSegments": [{
                    "content": "catalog"
                }, {
                    "name": "cod1S",
                    "isParameter": true
                }, {
                    "content": "other-sellers"
                }],
                "tmpl": true
            },
            "SpaProductCardQuestionsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/product-card-feedbacks-page-v3.min.6b90329c85a7302a.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/productCardQuestions.min.6bae3c64fd9bbbea.js",
                "requiredData": {
                    "path": "webapi/catalog/{cod1S:regex(^(\\d{{1,9}})$)}/questions/data",
                    "name": "SpaProductCardQuestionsData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "catalog"
                    }, {
                        "name": "cod1S",
                        "isParameter": true
                    }, {
                        "content": "questions"
                    }, {
                        "content": "data"
                    }]
                },
                "path": "catalog/{cod1S:regex(^(\\d{{1,9}})$)}/questions",
                "name": "SpaProductCardQuestionsEntrypoint",
                "routePathSegments": [{
                    "content": "catalog"
                }, {
                    "name": "cod1S",
                    "isParameter": true
                }, {
                    "content": "questions"
                }],
                "tmpl": true
            },
            "SpaProductCardFeedbacksEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/product-card-feedbacks-page-v3.min.6b90329c85a7302a.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/productCardFeedbacks.min.c347eed2a07d68ad.js",
                "requiredData": {
                    "path": "webapi/catalog/feedbacks/{cod1S:regex(^(\\d{{1,9}})$)}/data",
                    "name": "SpaProductCardFeedbacksData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "catalog"
                    }, {
                        "content": "feedbacks"
                    }, {
                        "name": "cod1S",
                        "isParameter": true
                    }, {
                        "content": "data"
                    }]
                },
                "path": "catalog/{cod1S:regex(^(\\d{{1,9}})$)}/feedbacks",
                "name": "SpaProductCardFeedbacksEntrypoint",
                "routePathSegments": [{
                    "content": "catalog"
                }, {
                    "name": "cod1S",
                    "isParameter": true
                }, {
                    "content": "feedbacks"
                }],
                "tmpl": true
            },
            "SpaPersonalCabinetEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/lk-main-v3.min.0420445d9e442fcd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/personalcabinet.min.dfe0acdd674b3f22.js",
                "requiredData": {
                    "path": "webapi/lk/personalcabinet/data",
                    "name": "SpaPersonalCabinetData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk",
                "name": "SpaPersonalCabinetEntrypoint",
                "tmpl": true
            },
            "SpaPaymentSuccessEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/pay-success.min.361b15bbf38094ca.css"],
                "path": "lk/payment/success",
                "name": "SpaPaymentSuccessEntrypoint",
                "tmpl": true
            },
            "SpaPaymentReturnEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/order-fail-v3.min.04ae2cea266994cd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/payment/paymentStatusCheck.min.46ccd831b4cde544.js",
                "path": "lk/payment/return",
                "name": "SpaPaymentReturnEntrypoint",
                "tmpl": true
            },
            "SpaPaymentFailEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/order-fail-v3.min.04ae2cea266994cd.css"],
                "requiredData": {
                    "path": "webapi/lk/payment/fail/data",
                    "name": "SpaPaymentFailData"
                },
                "path": "lk/payment/fail",
                "name": "SpaPaymentFailEntrypoint",
                "tmpl": true
            },
            "SpaOrderThankYouEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/order-confirmed-v3.min.4fb446cd5ae1af91.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/orderThankYou.min.73bc12e66a8fd0f1.js",
                "path": "lk/orders/thankyou",
                "name": "SpaOrderThankYouEntrypoint",
                "tmpl": true
            },
            "SpaOrderConfirmedEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/order-confirmed-v3.min.4fb446cd5ae1af91.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/orderConfirmation.min.7742ac1a5db6504f.js",
                "requiredData": {
                    "path": "webapi/lk/order/confirmed/data",
                    "name": "SpaOrderConfirmedData"
                },
                "path": "lk/basket/orderconfirmed",
                "name": "SpaOrderConfirmedEntrypoint",
                "tmpl": true
            },
            "SpaOAuthSignInEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/oauth-v3.min.8a4abb90c05a6f14.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/oauth.min.a9135f5b5e7715ed.js",
                "path": "oauth/login",
                "name": "SpaOAuthSignInEntrypoint",
                "tmpl": true,
                "requiredData": {
                    "path": "webapi/oauth/login/data",
                    "name": "SpaOAuthSignInData"
                }
            },
            "SpaNotificationsEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/notification-page-v3.min.1d0bf2967e6bbd1d.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/notifications.min.97f2ff49936bfcf7.js",
                "requiredData": {
                    "path": "webapi/lk/newsfeed/events/data",
                    "name": "SpaNotificationsData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/newsfeed/events",
                "name": "SpaNotificationsEntrypoint",
                "tmpl": true
            },
            "SpaMyFeedbacksEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/feedback-page-v3.min.f323d14e91a89c46.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/myFeedbacks.min.ba65fd5ce7d85433.js",
                "requiredData": {
                    "path": "webapi/lk/discussion/feedback/data",
                    "name": "SpaMyFeedbacksData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/discussion/feedback",
                "name": "SpaMyFeedbacksEntrypoint",
                "tmpl": true
            },
            "SpaMyCommunicationsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/communications-v3.min.808a6605e1b6114d.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/communications.min.6814d90e32523ff7.js",
                "requiredData": {
                    "path": "webapi/lk/communications/data",
                    "name": "SpaMyCommunicationsData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/communications",
                "name": "SpaMyCommunicationsEntrypoint",
                "tmpl": true
            },
            "SpaInstallmentLandingEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/installment-landing-v3.min.e5f6ef7561a9d138.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/installmentLanding.min.16027cf98a8ae598.js",
                "path": "landings/installment",
                "name": "SpaInstallmentLandingEntrypoint",
                "tmpl": true
            },
            "Apple2024Entrypoint": {
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/apple2024/apple2024.min.421c10dd28b62fcc.js",
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/apple2024-v3.min.1850d22513cc5007.css"],
                "path": "apple2024",
                "name": "Apple2024Entrypoint",
                "tmpl": true
            },
            "SpaHomeEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.shortDeliveries.min.c607dfc58413af9a.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/main-page-v3.min.0dbe3aba865477cc.css"],
                "metaTagsUrl": "/webapi/home/metatags",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/home.min.2f1da95c8d06156f.js",
                "useSSR": true,
                "path": "",
                "name": "SpaHomeEntrypoint",
                "tmpl": true
            },
            "SpaGiftCertificatesEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.countdown.min.fdc8c6305971b0c3.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/cert-page-v3.min.09d502ea8e34f2a6.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/giftCertificates.min.f02f757a1a1a382c.js",
                "path": "gift/certificates",
                "name": "SpaGiftCertificatesEntrypoint",
                "tmpl": true
            },
            "SpaWbWallet": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/wbwallet-page-v3.min.99ccf6496cc2af81.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/wbwallet.min.7a8bf0730dd01105.js",
                "path": "landings/wbwallet",
                "name": "SpaWbWallet",
                "tmpl": true
            },
            "SpaGiftCertificatesThankYouEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/cert-page-thank-you-v3.min.da8cff0258a08298.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/giftCertificatesThankYou.min.836cebb8bae8121f.js",
                "path": "gift/certificates/thankyou",
                "name": "SpaGiftCertificatesThankYouEntrypoint",
                "tmpl": true
            },
            "SpaFavoritesEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/favorite-goods-page-v3.min.7bf87801fc9a5a2e.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/favoriteGoods.min.e667fba94022ea46.js",
                "requiredData": {
                    "path": "webapi/lk/favorites/data",
                    "name": "SpaFavoritesData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/favorites",
                "name": "SpaFavoritesEntrypoint",
                "tmpl": true
            },
            "SpaFavoriteBrandsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/favorite-brands-page-v3.min.be63cc8922c0d548.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/favoriteBrands.min.804c12d7034e7736.js",
                "requiredData": {
                    "path": "webapi/lk/favoritebrands/data",
                    "name": "SpaFavoriteBrandsData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/favoritebrands",
                "name": "SpaFavoriteBrandsEntrypoint",
                "tmpl": true
            },
            "SpaDeliveryService": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/modules/pickups.min.85c0142bd8f1f6d2.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/addresses-v3.min.0e8fd97f02b67bd3.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/geoBlock.min.975f9eb8c4e82905.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/servicePages/service-page-v3.min.2706135958e863dd.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/serviceDelivery.min.d0ae589dea3f30ab.js",
                "useSSR": true,
                "pageType": 1,
                "path": "services/besplatnaya-dostavka",
                "name": "SpaDeliveryService",
                "tmpl": true
            },
            "SpaCustomerReceiptEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/receipt-page-v3.min.bbd888a10425d865.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/customerReceipts.min.ca5724fdc0cfd25f.js",
                "requiredData": {
                    "path": "webapi/lk/receipts/data",
                    "name": "SpaCustomerReceiptData"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/receipts/get",
                "name": "SpaCustomerReceiptEntrypoint",
                "tmpl": true
            },
            "SpaConfirmEmailedEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/email",
                "name": "SpaConfirmEmailedEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaChangeEmailEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/changeemail",
                "name": "SpaChangeEmailEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaEmailChangeConfirmedEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/emailchanged",
                "name": "SpaEmailChangeConfirmedEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaEmailChangeFailedEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/emailchangefailed",
                "name": "SpaEmailChangeFailedEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaEmailConfirmedEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/emailsuccess",
                "name": "SpaEmailConfirmedEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaEmailFailedEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/email-confirmed-v3.min.7fdb528f17601997.css"],
                "requiredData": {
                    "path": "webapi/confirm/email/data",
                    "name": "SpaEmailedConfirmData"
                },
                "path": "confirm/emailfailed",
                "name": "SpaEmailFailedEntrypoint",
                "tmpl": "SpaConfirmEmail"
            },
            "SpaBrandsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "metaTagsUrl": "webapi/spa/brands/metatags/{brandBasePath}/{*category}",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/brandCatalog.min.507338509d91e6e5.js",
                "requiredData": {
                    "path": "webapi/brands/data/{brandBasePath}/{*category}",
                    "name": "SpaBrandsData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "brands"
                    }, {
                        "content": "data"
                    }, {
                        "name": "brandBasePath",
                        "isParameter": true
                    }, {
                        "name": "category",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "useSSR": true,
                "path": "brands/{brandBasePath}/{*category}",
                "name": "SpaBrandsEntrypoint",
                "routePathSegments": [{
                    "content": "brands"
                }, {
                    "name": "brandBasePath",
                    "isParameter": true
                }, {
                    "name": "category",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": true
            },
            "SpaBrandsPreviewEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/brandCatalog.min.507338509d91e6e5.js",
                "requiredData": {
                    "path": "webapi/brands/preview/data/{brandBasePath}/{*category}",
                    "name": "SpaBrandsPreviewData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "brands"
                    }, {
                        "content": "preview"
                    }, {
                        "content": "data"
                    }, {
                        "name": "brandBasePath",
                        "isParameter": true
                    }, {
                        "name": "category",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "useSSR": true,
                "path": "preview/brands/{brandBasePath}/{*category}",
                "name": "SpaBrandsPreviewEntrypoint",
                "routePathSegments": [{
                    "content": "preview"
                }, {
                    "content": "brands"
                }, {
                    "name": "brandBasePath",
                    "isParameter": true
                }, {
                    "name": "category",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": "SpaBrands"
            },
            "SpaBrandByLetterEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/brands-letter-page-v3.min.ffebfb23e144676f.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/brandByLetter.min.0a890807a6af84b0.js",
                "requiredData": {
                    "path": "webapi/wildberries/brandlist/data",
                    "name": "SpaBrandByLetterData"
                },
                "path": "wildberries/brandlist.aspx",
                "name": "SpaBrandByLetterEntrypoint",
                "tmpl": true
            },
            "SpaBrandlistEntrypoint": {
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/brands-list-page-v3.min.4daa2b9ed58e015f.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/brandlist.min.6aa8cb7fbd3dd353.js",
                "requiredData": {
                    "path": "webapi/brandlist/data/{subCatalogId}",
                    "name": "SpaBrandlistData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "brandlist"
                    }, {
                        "content": "data"
                    }, {
                        "name": "subCatalogId",
                        "isParameter": true,
                        "isOptional": true
                    }]
                },
                "path": "brandlist/all/{subCatalogId}",
                "name": "SpaBrandlistEntrypoint",
                "routePathSegments": [{
                    "content": "brandlist"
                }, {
                    "content": "all"
                }, {
                    "name": "subCatalogId",
                    "isParameter": true,
                    "isOptional": true
                }],
                "tmpl": true
            },
            "SpaBasketEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.moneyFormatter.min.ae44a376748bb93f.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/maskedInput.min.739959121bce30a9.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/imask.tag.min.bf6479023cb57023.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.datetimepicker.min.2567d7aa0b5dbdef.js", "//static-basket-01.wbbasket.ru/vol0/j/ymaps.min.22278958241c41e4.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/basket-v3.min.4b223307439f26cb.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popup-choose-pay.min.6319cdc20fedd668.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/basket.min.857c00e06be24cf5.js",
                "requiredData": {
                    "path": "webapi/lk/basket/data",
                    "name": "SpaBasketData"
                },
                "targetContainer": 2,
                "path": "lk/basket",
                "name": "SpaBasketEntrypoint",
                "tmpl": true
            },
            "SpaArchivePositionsEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/video.min.30e2aa8c55ae167d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/archive-page-v3.min.82f371fb28b1db57.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/archivePositions.min.4e0ee95bf9f7fea9.js",
                "requiredData": {
                    "path": "webapi/lk/myorders/archive/head",
                    "name": "SpaHeadArchivePositions"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/myorders/archive",
                "name": "SpaArchivePositionsEntrypoint",
                "tmpl": true
            },
            "SpaActiveOrdersEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/ymaps.min.22278958241c41e4.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/my-orders-v3.min.993460544307284e.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/activeOrders.min.cf76d62e0d758157.js",
                "requiredData": {
                    "path": "webapi/lk/myorders/delivery/get",
                    "name": "SpaGetGroupedDeliveries"
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/myorders/delivery",
                "name": "SpaActiveOrdersEntrypoint",
                "tmpl": true
            },
            "SpaAccountEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/glDatePicker.min.591b6be9e136af1f.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/imask.tag.min.bf6479023cb57023.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.dropDown.min.1316c63e19c2f8c2.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/lk/personal-data-v3.min.f9b5fe8104a5ac11.css"],
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/details.min.1725ef8f212316b9.js",
                "requiredData": {
                    "path": "webapi/lk/details/data/{addnewcard}",
                    "name": "SpaAccountData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "lk"
                    }, {
                        "content": "details"
                    }, {
                        "content": "data"
                    }, {
                        "name": "addnewcard",
                        "isParameter": true,
                        "isOptional": true
                    }]
                },
                "lkMenuOptions": {
                    "visible": true
                },
                "path": "lk/details/{addnewcard}",
                "name": "SpaAccountEntrypoint",
                "routePathSegments": [{
                    "content": "lk"
                }, {
                    "content": "details"
                }, {
                    "name": "addnewcard",
                    "isParameter": true,
                    "isOptional": true
                }],
                "tmpl": true
            },
            "SpaCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-category-v3.min.a8bfb580ca155c85.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-menu-v3.min.27638ee7602792fa.css"],
                "metaTagsUrl": "webapi/spa/catalog/metatags/{*category}",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/categoryCatalog.min.f72fb5edc40e6ee0.js",
                "requiredData": {
                    "path": "webapi/catalogdata/{*category}",
                    "name": "SpaCatalogData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "catalogdata"
                    }, {
                        "name": "category",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "useSSR": true,
                "path": "catalog/{*category}",
                "name": "SpaCatalogEntrypoint",
                "routePathSegments": [{
                    "content": "catalog"
                }, {
                    "name": "category",
                    "isParameter": true,
                    "isOptional": false,
                    "isCatchAll": true
                }],
                "tmpl": true
            },
            "SpaPromotionCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-category-v3.min.a8bfb580ca155c85.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/faq-v3.min.ce3a13c35917ad82.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-menu-v3.min.27638ee7602792fa.css"],
                "metaTagsUrl": "webapi/spa/promotions/metatags/{promoBasePath}/{*category}",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/promotionsCatalog.min.b472ad3176111240.js",
                "requiredData": {
                    "path": "webapi/promotionscatalogdata/{promoBasePath}/{*category}",
                    "name": "SpaPromotionsCatalogData",
                    "routePathSegments": [{
                        "content": "webapi"
                    }, {
                        "content": "promotionscatalogdata"
                    }, {
                        "name": "promoBasePath",
                        "isParameter": true
                    }, {
                        "name": "category",
                        "isParameter": true,
                        "isCatchAll": true
                    }]
                },
                "path": "promotions/{promoBasePath}/{*category}",
                "name": "SpaPromotionCatalogEntrypoint",
                "routePathSegments": [{
                    "content": "promotions"
                }, {
                    "name": "promoBasePath",
                    "isParameter": true
                }, {
                    "name": "category",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": true
            },
            "SpaKurskCatalogEntrypoint": {
                "requiredJs": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "requiredCss": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/catalog-page-v3.min.47304cd93e2857a2.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/promotion-category-v3.min.a8bfb580ca155c85.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/faq-v3.min.ce3a13c35917ad82.css"],
                "metaTagsUrl": "webapi/spa/promotions/metatags/{promoBasePath}/{*category}",
                "requiredModel": "//static-basket-01.wbbasket.ru/vol0/j/spa/models/promotionsCatalog.min.b472ad3176111240.js",
                "path": "sitepromo/{promoBasePath}/{*category}",
                "name": "SpaPromotionCatalogEntrypoint",
                "routePathSegments": [{
                    "content": "sitepromo"
                }, {
                    "name": "promoBasePath",
                    "isParameter": true
                }, {
                    "name": "category",
                    "isParameter": true,
                    "isCatchAll": true
                }],
                "tmpl": true
            }
        };
        const modules = {
            "fixedPanel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/domElements/fixedPanel.min.d443e613a1407bb5.js"
            },
            "smartSearch": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/domElements/smartSearch.min.a940f2e55f2eef86.js"
            },
            "stickyPanel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/domElements/stickyPanel.min.0413a8aa0105df12.js"
            },
            "spaTabs": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/domElements/spaTabs.min.daee3af3337352b4.js"
            },
            "wbTableSpa": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/wbTableSpa.min.695b2a3801daaa8e.js"
            },
            "productCardPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/productCardPopup.min.251d60c66b2c5c96.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/collapsibleBlock.min.f764c196fe08866a.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.videoPlayer.min.02122f393b349aae.js", "//static-basket-01.wbbasket.ru/vol0/j/video.min.30e2aa8c55ae167d.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardPopup.min.f01380ecddf77dfd.js"
            },
            "userAddresses": {
                "dataPath": "/webapi/spa/modules/useraddresses",
                "isDynamic": true,
                "apiName": "basket",
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/userAddress/userAddresses.min.7d2c5d3de7067aa0.js"
            },
            "deliveryPoints": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/userAddress/deliveryPoints.min.13991402ec4879a3.js"
            },
            "deliveryPointsChoosePopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popup-choose-address.min.5fb38bd2cbf24125.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.useraddresses.min.971a769014084690.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/userAddress/deliveryPointsChoosePopup.min.b8adc06e1fe97518.js"
            },
            "spaMobileController": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/spaMobileController.min.fe4b8a4acca29a0a.js"
            },
            "lazyImageLoader": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/lazyImageLoader.min.e6d3de5ac67e10ea.js"
            },
            "photoGalleryViewer": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/photoGalleryViewer.min.2679f326948cf29e.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/video-gallery-feedback.min.4145da99c23d4704.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/video.min.30e2aa8c55ae167d.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.hlsPlayer.min.cbdcc3ec95625b2e.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/photoGalleryViewer.min.ed6c082d66359f21.js"
            },
            "cropper": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/libs/new-cropper.min.506ce51101dc8d1b.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/newCropper.min.8273cdc3ee1885a7.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/cropper.min.722cddab13869f17.js"
            },
            "imageUploader": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/imageUploader.min.ff9da64173049eab.js"
            },
            "lazyBlockLoader": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/lazyBlockLoader.min.a7cbda8388394104.js"
            },
            "searchTags": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/searchTags.min.8c7d2490c6d2a149.js"
            },
            "swiper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"
            },
            "suggestionsHelper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/searchInput/suggestionsHelper.min.a628e18f1417cac6.js"
            },
            "queryHelper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/queryHelper.min.87ece211ffa5dc84.js"
            },
            "xCatalogData": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/xCatalogData.min.bd310568b29ac023.js"
            },
            "sorterModel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/sorterModel/sorterModel.min.1acc91eedebec62c.js"
            },
            "bottomNotificationPanel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/bottomNotificationPanel.min.bbe95b60b75d8cf0.js"
            },
            "basketInputExtended": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/favorites/basketInputExtended.min.07fa7dd9beab6b80.js"
            },
            "basketAdderHelper": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/sizesPopup.min.20417a3176af4602.css"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basketAdderHelper.min.0091956cbd4181f3.js"
            },
            "hoverIntent": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/hoverIntent.min.b49a25949f8f8201.js"
            },
            "pooMapModule": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/elementsMap.min.a60006ab37e7e049.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popupMap.min.1c9aaef2ee1bd288.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/ymaps.min.22278958241c41e4.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/collapsibleBlock.min.f764c196fe08866a.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/userAddress/pooMapModule.min.d3be967e3185a7a6.js"
            },
            "subMenuShower": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/subMenuShower.min.b3793d0fcd34db75.js"
            },
            "promisifiedFileReader": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/promisifiedFileReader.min.bbf9152a03d16013.js"
            },
            "pagerHelper": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/pagerHelper.min.bf9aa8c49473ced5.js"
            },
            "xCatalogGoodsLoader": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/xCatalogGoodsLoader.min.d95ee9e5c0831055.js"
            },
            "mobilePopupSorter": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/mobilePopupSorter.min.c3324099c7762ae8.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/sorterModel/mobilePopupSorter.min.b8955e480a22a947.js"
            },
            "basketAdderAdapter": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/basketAdderAdapter.min.dc9cc06b9da56788.js"
            },
            "spaWbxAuthController": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/spaWbxAuthController.min.65764f6a33b2e605.js"
            },
            "qrGenerator": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/qrGenerator.min.8edae492afdd344c.js"
            },
            "adultConfirmedPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/adultConfirmed.min.b6d8477c95081ff1.css"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/adultConfirmedPopup.min.cffee9ed918fbdf5.js"
            },
            "recommendationsList": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/recommendations/recommendationsList.min.e1546014dd318841.js",
                "tmpls": ["catalogCard"]
            },
            "agreeTermsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/agreeTermsPopup.min.4fcb2acfe662d9e1.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/agreeTermsPopup.min.8af2cd1f86fb0562.js"
            },
            "installmentTermsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/installmentTermsPopup.min.b29c637c9a85cbce.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/installmentTermsPopup.min.9e235fd417d7a127.js"
            },
            "authExportKey": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/authExportKey.min.96705243a05d2283.js"
            },
            "cabinetMenuPreview": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/personalCabinet/cabinetMenuPreview.min.cf2e314ff35881c7.js"
            },
            "discussionsDetails": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/discussions/discussionsDetails.min.30ecf798012ff7e8.js"
            },
            "communicationCreatorSpa": {
                "dataPath": "/webapi/spa/modules/communications/communicationCreator",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/discussions/communicationCreator.min.ecc0e5498c61bdbe.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/discussions/communicationCreatorSpa.min.88ac20b50a64eb06.js"
            },
            "claimAdder": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/leaveClaimPopup.min.ca818da0d66cc81d.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/myClaims/claimAdder.min.c237adce16ac2055.js"
            },
            "officeRefundPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/officeRefundPopup.min.84c7a0ee41792ca8.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/refund/officeRefundPopup.min.8c43ca96684ea24c.js"
            },
            "courierRefundPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/leaveClaimPopup.min.ca818da0d66cc81d.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.useraddresses.min.971a769014084690.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.datetimepicker.min.2567d7aa0b5dbdef.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/myClaims/courierRefundPopup.min.8ebf3910d31b82e3.js"
            },
            "claimComplaintPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/myClaims/claimComplaintPopup.min.48e58b4019b02e70.js"
            },
            "requisiteEditor": {
                "dataPath": "/webapi/spa/modules/userrequisite",
                "isDynamic": true,
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/maskedInput.min.739959121bce30a9.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/requisiteEditor.min.c62c1637df52fd73.js"
            },
            "captcha": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/captcha.min.672ea41abd69b6b5.js"
            },
            "signInWbaHelper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/signInWbaHelper.min.02ccabb107f5ef4b.js"
            },
            "recaptcha": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/recaptcha.min.dd193d5c9715b969.js"
            },
            "signinCall": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/signinCall.min.5ad514ab4ba7ba1c.js"
            },
            "deliveryInfoHelper": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/deliveryInfoHelper.min.47ec3803380e7c8f.js"
            },
            "suppliersInfoHelper": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/suppliersInfoHelper.min.1015f2a5561a5383.js"
            },
            "multipleSellerHelper": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/multipleSellerHelper.min.3ec43a2a23e7f697.js"
            },
            "postsModel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCardComments/postsModel.min.96803445543165e8.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardComments/postsModel.min.e67b0063de52b6a2.js"
            },
            "priceHistoryChart": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/priceHistoryChart.min.f945c6eab274ce63.js"
            },
            "socialSharePopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCard/socialSharePopup.min.5f90efb9c9c56151.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/socialSharePopup.min.a0d21dad3b326357.js"
            },
            "productCardSizes": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardSizes.min.1e115523629ee3c7.js"
            },
            "sizeTable": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/sizesPopup.min.20417a3176af4602.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/sizeTable.min.4576d1877a4a85de.js"
            },
            "productCardPrice": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardPrice.min.efa72b3caeba503b.js"
            },
            "productCardColors": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productSelectionManager/productCardColors.min.2339b0f171f1f9a9.js"
            },
            "productPopupViewModel": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardPopup/productPopupViewModel.min.31ad4263595b0efa.js"
            },
            "productCardOrderGood": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardOrderGood.min.ba5a7f229da7a4ae.js"
            },
            "productCardImageGallery": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.zoomImage.min.e3bfbb9cf250d5c5.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.videoPlayer.min.02122f393b349aae.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.imageTags.min.3e29e039e3f14a17.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardImageGallery.min.1f91d3766dcb1951.js"
            },
            "productCardPoned": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardPoned.min.21341b58ccf65b1f.js"
            },
            "productCardVideo": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardVideo.min.ae4a03cf9091179d.js"
            },
            "productCard360": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCard360.min.165053e5edab0e07.js"
            },
            "productPopupImageGallery": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.zoomImage.min.e3bfbb9cf250d5c5.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardPopup/productPopupImageGallery.min.d21abafcbfcf4c83.js"
            },
            "productCardDescribtionError": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardDescribtionError.min.f7a55a5d0d2eb7f4.js"
            },
            "productDescribtionErrorInformer": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.dropDown.min.1316c63e19c2f8c2.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productDescribtionErrorInformer.min.9237e8e99801455e.js"
            },
            "productCardStats": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productCardStats.min.70a4c49a0f07f8b7.js"
            },
            "productShareHelper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productShareHelper.min.a8d7463ad848d1ee.js"
            },
            "productGalleryViewer": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popupGalleryMain.min.037c80d9c240c82c.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.zoomImage.min.e3bfbb9cf250d5c5.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productGalleryViewer.min.29643f5e002418a7.js"
            },
            "claimsReporter": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/claims/claimsReporter.min.7f4cfb33998505b7.js"
            },
            "productSelectionManager": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/productSelectionManager.min.ea8b715aa60070ef.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productSelectionManager/productSelectionManager.min.05f77bb0c86bad15.js"
            },
            "goodPricePopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/goodPricePopup.min.25e1edf8e854278a.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/goodPricePopup.min.eec57f15d7c9c94e.js"
            },
            "productDetailsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/productDetailsPopup.min.69580fcfa393af09.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/productDetailsPopup.min.98aaa31281157755.js"
            },
            "originalGoodPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/originalGoodPopup.min.e06b43170f01ab97.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/originalGoodPopup.min.19c756d81fd13011.js"
            },
            "premiumSellerPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/premiumSellerPopup.min.10f52cef015c3ef3.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/premiumSellerPopup.min.ce17593c9f76a97f.js"
            },
            "feedbacksForPointsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/feedbacksForPointsPopup.min.60b1830d22810ca1.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/feedbacksForPointsPopup.min.505f6f7ee24a892c.js"
            },
            "chooseColorPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/chooseColorPopup.min.124882fe49c8dfca.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/chooseColorPopup.min.86759b2291236d79.js"
            },
            "deliveryInfoPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/deliveryInfoPopup.min.1d3286022bd19b76.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/deliveryInfoPopup.min.b48212bb64159136.js"
            },
            "expressDeliveryInfoPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/expressDeliveryInfoPopup.min.ee214e744fed61f7.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/expressDeliveryInfoPopup.min.4570de2f70958bed.js"
            },
            "imageTagsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/imageTagsPopup.min.a0adb692c44ad86e.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/imageTagsPopup.min.4e23f34186d592e8.js"
            },
            "premiumUserPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/premiumUserPopup.min.d540b1ecf852c1e6.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/premiumUserPopup.min.a21f393202bd158e.js"
            },
            "tecDocAuto": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/catalog/tecDocAuto/tecDocAuto.min.447f48a9507fad3e.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/tecDocAuto/tecDocAuto.min.404b45bb0aa00985.js"
            },
            "menuPromoSideBar": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/menuPromoSideBar/menuPromoSideBar.min.c0359c0187762976.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/menuPromoSideBar/menuPromoSideBar.min.da1af3b8baade8ae.js"
            },
            "mainCatalogConfig": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/mainCatalogConfig.min.f9996fd24f87c004.js"
            },
            "catalogSitePath": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/shared/catalogSitePath.min.768783c3566b0e14.js"
            },
            "catalogCore": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.searchTags.min.30a7905c462b8772.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/goodsCatalog/catalogCore.min.27e28257a43307f2.js",
                "tmpls": ["catalogCard"]
            },
            "filterItem": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/filtres/filterItem.min.ecf62425003327d0.js"
            },
            "desktopFiltresPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/filtres/desktopFiltresPopup.min.ba632c388d30796f.js"
            },
            "mobileFiltresPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/filtres/mobileFiltresPopup.min.ef0cd105f95b959e.js"
            },
            "mobilePopupFilter": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/filtres/mobilePopupFilter.min.9ae8f56e055d755b.js",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/mobilePopupFilter.min.d0f202312be6f62f.css"]
            },
            "xCatalogProvider": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/providers/xCatalogProvider.min.9efde43c9c704989.js"
            },
            "videoReviewProvider": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/providers/videoReviewProvider.min.a011e4d10e5ae9a6.js"
            },
            "mainCategoryV3": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/main-catalog-v3.min.d65c6c49d5fbe805.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/mainCategoryV3.min.f53a906d082c62a1.js"
            },
            "categoryMainLeftMenu": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/categoryMainLeftMenu.min.93ff968187821185.js"
            },
            "catalogBannersAndRecommendations": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/catalogBannersAndRecommendations.min.64c42de6263e661d.js"
            },
            "catalogMainSport": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/main-catalog-v3.min.d65c6c49d5fbe805.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/main-catalog-sport-v3.min.a1e0a71a4daf7cfe.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/catalogMainSport.min.6e0aad0644796d39.js"
            },
            "catalogTopMenu": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/catalogTopMenu.min.8a185989aa958ece.js"
            },
            "catalogMainSeasonBanners": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/catalogMainSeasonBanners.min.8d25590419dbddb7.js"
            },
            "catalogMainAuto": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/main-catalog-v3.min.d65c6c49d5fbe805.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recommendations.min.8882257f1b3921cc.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/catalogMainAuto.min.21d3099f8f20e83d.js"
            },
            "catalogTopBrands": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/topBrands/catalogTopBrands.min.7990d9bc25231004.js"
            },
            "bannersCarousel": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/categoryMain/bannersCarousel.min.b9f971d2e2a816c6.js"
            },
            "imageChip": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/searchByImage/imageChip.min.e6e550403519cc9d.js"
            },
            "catalogSellerBlocks": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.brandsConstructorPreviews.min.89a52625d75f7468.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/sellerCatalog/catalogSellerBlocks.min.92f40d126d87d1ce.js"
            },
            "catalogBrandLikes": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/brands/catalogBrandLikes.min.b13c89225a9d5663.js"
            },
            "brandConstructorBlocks": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/brands-constructor-v3.min.2e9faa71c5ef227b.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.brandsConstructorPreviews.min.89a52625d75f7468.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog_v2/brandConstructor/brandConstructorBlocks.min.567287b55d4694c7.js"
            },
            "brandConstructorConfig": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/brands-constructor-v3.min.2e9faa71c5ef227b.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/banners.min.fcd8e3dfc76fb2bb.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.brandsConstructorPreviews.min.89a52625d75f7468.js"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/brandConstructorConfig.min.0c572d4849b742aa.js"
            },
            "brandConstructorCatalogConfig": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/brands-constructor-v3.min.2e9faa71c5ef227b.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.recentItems.min.23f7765e3049589d.js"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/catalog/brandConstructorCatalogConfig.min.0b64c743f48287a3.js"
            },
            "wbStories": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/home/wbStories.min.1b09738c1141d43c.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/home/wbStories.min.5d62f5608f2ef802.js"
            },
            "paymentPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popup-choose-pay.min.6319cdc20fedd668.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/paymentPopup.min.21b3a0c6741b7d0a.js"
            },
            "bindNewCardPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/bindNewCardPopup.min.1b91619381a0b928.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/imask.tag.min.bf6479023cb57023.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/bindNewCardPopup.min.e2eb943875730cad.js"
            },
            "balancePaymentPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/balancePaymentPopup.min.604c87645fc23c8c.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/balancePaymentPopup.min.962eae4da51b4747.js"
            },
            "installmentChart": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/installmentChart.min.708c3ae842ae7807.js"
            },
            "walletLimitPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/walletLimitPopup.min.9263e9a952afc2fe.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/walletLimitPopup.min.8a5ba85e7312b464.js"
            },
            "commissionInstallmentChart": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/commissionInstallmentChart.min.c1965226077abf54.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/commissionInstallmentChart.min.e6233b3d1e554574.js"
            },
            "brokerInstallment": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/brokerInstallment.min.f8abdcd274d1706c.js"
            },
            "brokerInstallmentPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/brokerInstallmentPopup.min.fba094ef8e433e34.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/maskedInput.min.739959121bce30a9.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.countdown.min.fdc8c6305971b0c3.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/brokerInstallmentPopup.min.fa2abfba6b0d8db2.js"
            },
            "bplInstallmentChart": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.countdown.min.fdc8c6305971b0c3.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/bplInstallmentChart.min.cb9a6d80a9eb0c51.js"
            },
            "courierDeliveryOptionPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popup-choose-pay.min.6319cdc20fedd668.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/activeOrders/courierDeliveryOptionPopup.min.a36ef63f89c7ef5a.js"
            },
            "nspkPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/nspkPopup.min.9eb4412a00bf5f59.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/nspkPopup.min.5081292383e48141.js"
            },
            "basketSellerHelper": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/basketSellerHelper.min.3e9c3e556ca8b11d.js"
            },
            "productCourierOnlyMiniPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/productCourierOnlyMiniPopup.min.31d0d401b23ac54a.js"
            },
            "productCourierOnlyPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/productCourierOnlyPopup.min.bf6cf66ac035eeab.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/productCourierOnlyPopup.min.2b0d2a8795479a9a.js"
            },
            "similarProductsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/similarProductsPopup.min.3abe5d5bab2550b0.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/similarProductsPopup.min.6470b89262f9498e.js",
                "tmpls": ["catalogCard"]
            },
            "qrcPaymentPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/qrcPaymentPopup.min.52d7f7243ae008ac.css"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/qrcPaymentPopup.min.078068db028c0bd2.js"
            },
            "bindNewSbp": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/bindNewSbp.min.5da6a601f0aae873.js"
            },
            "productPrepayOnlyPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/productCourierOnlyPopup.min.bf6cf66ac035eeab.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/productPrepayOnlyPopup.min.8b37cc79c91e6e34.js"
            },
            "basketProductModel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/basketProductModel.min.de8808b2759e411b.js"
            },
            "paymentTypeModel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/paymentTypeModel.min.5c64dbc10120dc0c.js"
            },
            "infoWbPayPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/infoWbPayPopup.min.4dd022a29c08cef7.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/infoWbPayPopup.min.86c1aa77f7c76bad.js"
            },
            "wbWalletPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/wbWalletPopup.min.bdfd5c0934c990ae.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/wbWalletPopup.min.de5d8c6157faccef.js"
            },
            "walletPaymentPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/walletPaymentPopup.min.f383c4a2f6d22f5a.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/walletPaymentPopup.min.80f75c8162e35fef.js"
            },
            "walletCrypto": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/crypt/walletCrypto.min.c39d0f9b39bf11bd.js"
            },
            "deliveryCalendarPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/deliveryCalendarPopup.min.2a0ed24419ad3cda.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basket/deliveryCalendarPopup.min.892d30a00233d523.js"
            },
            "cargoDeliveryDatePicker": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/popup-delivery-confirm.min.dcfd34c5a1e0d08d.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/cargoDeliveryDatePicker.min.7469c433f1226c00.js"
            },
            "offerRateProducts": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/offerRateProducts.min.88e0106d32fc408d.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/offerRateProducts.min.0fa20bbac16366d0.js"
            },
            "trackingPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/trackingStatusPopup.min.9697afbf7b037e24.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/trackingPopup.min.9cd752483f6322c4.js"
            },
            "deliveriesPreview": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/trackingStatusPopup.min.9697afbf7b037e24.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/deliveriesPreview.min.b11fc1e1968eaf08.js"
            },
            "courierRoutePopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/courierRoutePopup.min.824be5c507b1bb44.js"
            },
            "changePickUpPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/delivery/changePickUpPopup.min.f461d45bb044ad1b.js"
            },
            "archiveItemRefundPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/archiveItemRefundPopup.min.609fbd68eedd3435.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/archiveOrders/archiveItemRefundPopup.min.3ba01f2b70d10e99.js"
            },
            "newlyArrivedGoods": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/favorites/newlyArrivedGoods.min.e06c318d55a27eab.js"
            },
            "pickups": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/pickups.min.85c0142bd8f1f6d2.js"
            },
            "userInfoRequester": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/userInfo/userInfoRequester.min.10d3c0295d23cfb0.js"
            },
            "onlineChatPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/onlineChat/onlineChatPopup.min.bf90dc87f457cd88.js"
            },
            "onlineChat": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/chatSlider.min.86bec7d19f108d59.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.contextMenu.min.4dde0d001ff4f5a3.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/onlineChat/onlineChat.min.a800701f6eb0249c.js"
            },
            "sellerOnlineChat": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/chatSlider.min.86bec7d19f108d59.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.tooltip.min.844040509b1e4ceb.js", "//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.contextMenu.min.4dde0d001ff4f5a3.js"],
                "tmpls": ["onlineChat"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/onlineChat/sellerOnlineChat.min.00657ccb89596256.js"
            },
            "sideMenu": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/sideMenu/sideMenu.min.5029467182fed95f.js"
            },
            "favoriteGoodsModel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/favoriteGoods/favoriteGoodsModel.min.79cb3ababc64d94b.js"
            },
            "multipleSellerList": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/multipleSellers.min.0ea281ec57f153ce.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/multipleSeller/multipleSellerList.min.dd01d70bce413c97.js"
            },
            "findOtherSellerPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/findOtherSellerPopup.min.03baea24345a11c8.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/multipleSeller/findOtherSellerPopup.min.f1ee90a0f45681a3.js"
            },
            "miniProductCard": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/miniProductCard.min.407599190039263c.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/miniProductCard/miniProductCard.min.4de6023e66715ef8.js"
            },
            "miniCardCarousel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/miniCardCarousel.min.65c9ee0a910c0a4e.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/miniProductCard/miniCardCarousel.min.83c0d46a24b8eb63.js"
            },
            "questionsModel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCardComments/questionsModel.min.97b7aebd53f4bdfc.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardQuestions/questionsPage/questionsModel.min.2804260a7ce0bc3d.js"
            },
            "questionsEditor": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/questionsEditor.min.5c17775c527bf68c.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardQuestions/shared/questionsEditor.min.d630131677daa53a.js"
            },
            "productQuestionsModel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCardComments/commentsModel.min.ec5327ee195a0197.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardQuestions/productPage/productQuestionsModel.min.b66464d00df1afc4.js"
            },
            "feedbacksModel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCardComments/commentsModel.min.ec5327ee195a0197.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/feedbacksPage/feedbacksModel.min.e05e806a04b28853.js"
            },
            "mobileFilterPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/mobileFilterPopup.min.1d79d5b463214b77.js"
            },
            "summaryModel": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/summaryModel.min.e82a7df2f3d35a6d.js"
            },
            "productFeedbacksModel": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/productCardComments/commentsModel.min.ec5327ee195a0197.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/productPage/productFeedbacksModel.min.412aa27f4b6c4e63.js"
            },
            "mobileSummaryPopup": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/mobileSummaryPopup.min.25062bf97500e0a3.js"
            },
            "feedbackComplaintPopup": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/feedbackComplaintPopup.min.af2271635a0d3a38.js"
            },
            "feedbacksEditor": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/feedbacksEditor.min.94aa1b1a470c7d16.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.validate.min.8677358aa9ea4b39.js", "//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.dropDown.min.1316c63e19c2f8c2.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/feedbacksEditor.min.b0ac7ff952094dbd.js"
            },
            "feedbacksPhotoGallery": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/libs/swiper.min.36c4420545df4a2d.css", "//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/feedbacksPhotoGallery.min.75be32ebfa950991.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/swiper.min.6535e786e6ca57ab.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/feedbacksPhotoGallery.min.f37d0d05b6f6f8cd.js"
            },
            "feedbacksPhotoGalleryList": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/photoGalleryViewer.min.2679f326948cf29e.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/feedbacksPhotoGalleryList.min.929b28cb0dce4a2c.js"
            },
            "feedbacksPhotoGalleryViewer": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCardFeedbacks/shared/feedbacksPhotoGalleryViewer.min.d79b1ab0618d40b6.js"
            },
            "error404": {
                "dataPath": "/webapi/spa/modules/error404",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/views/site/error404-v3.min.60b93721fe241b89.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/error/error404.min.c3f80ab82fed45e9.js"
            },
            "loadingError": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/errors/loadingError.min.627297f16185a4af.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/error/loadingError.min.7336500851157304.js"
            },
            "financialOperationsHistory": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/wallet/financialOperationsHistory.min.1e466b6134d53e0e.js"
            },
            "balanceOperationsHistory": {
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/lazyBlockLoader.min.bb1e21f3852d0977.js"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/wallet/balanceOperationsHistory.min.0b99da14d9f21589.js"
            },
            "wbWalletManager": {
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/wallet/wbWalletManager.min.fc14fde17d2a4fe9.js"
            },
            "sellerLoyaltyProgramPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/sellerLoyaltyProgramPopup.min.9b4f20b6f290f5a4.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/seller/sellerLoyaltyProgramPopup.min.17c0ba3d8610d87a.js"
            },
            "relatedGoods": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/relatedGoods/relatedGoods.min.65ae275587a39b74.js"
            },
            "offer0724": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/newOfferPopup.min.6dc6861b5c331b0d.css"],
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/newOfferPopups/offer0724.min.5c01bbccae48f774.js"
            },
            "offerContent0724": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/newOfferContentPopup.min.d4bbf300e499a666.css"],
                "templateId": "10140",
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/newOfferPopups/offerContent0724.min.c970aedc3ebf8526.js"
            },
            "animationHelper": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/helper/animationHelper.min.ed81cc88995f9d3c.js"
            },
            "uaparser": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/helper/uaparser.min.ba63a73de0e59fb8.js"
            },
            "svgElementClassListPolyfill": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/polyfills/svgElementClassListPolyfill.min.77151f02832f9cbf.js"
            },
            "abortControllerPolyfill": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/polyfills/abortControllerPolyfill.min.facc99a058df63cb.js"
            },
            "formDataPolyfill": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/polyfills/formDataPolyfill.min.169ab3817e343a22.js"
            },
            "navigatorLocksPolyfill": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/polyfills/navigatorLocksPolyfill.min.c74c569ed057c2d1.js"
            },
            "basketRecommendationService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/basketRecommendationService.min.b2beed7436c726e1.js"
            },
            "travelModule": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/travel/travelModule.min.20a8e749c28a6044.js",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/spa/modules/travel/travelModule.min.417a7abdfe8f8c56.css"],
                "hasTmpl": true
            },
            "signinEsia": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/signinEsia.min.5e1d027cde7fd3a6.js"
            },
            "signinSberid": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/signinSberid.min.6c0fc6d87ef7797e.js"
            },
            "confirmCodePopup": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/signin/confirmCodePopup.min.6e7abc5bd1fa900b.js",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/confirmCodeCustom.min.c933b2c3d36f0d0a.css"],
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/charinput.tag.min.57f253d87dbf3a39.js"],
                "hasTmpl": true
            },
            "installmentCardsPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/installmentCardsPopup.min.9decbd6a28e37d1c.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/payment/installmentCardsPopup.min.31fdee48cbbf8916.js"
            },
            "customChargesPopup": {
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/customChargesPopup.min.bd77eceea55be456.css"],
                "hasTmpl": true,
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/customCharges/customChargesPopup.min.374f3941d1e64d17.js"
            },
            "promotionKurskPopup": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/promotionKurskPopup/promotionKurskPopup.min.39e5317d38a54364.js",
                "cssPaths": ["//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/popups/promotionKurskPopup.min.1f9616473a9849c2.css"],
                "hasTmpl": true,
                "jsPaths": ["//static-basket-01.wbbasket.ru/vol0/j/spa/customTags/spa.moneyFormatter.min.ae44a376748bb93f.js"]
            },
            "richContentHandler": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/modules/productCard/richContentHandler.min.6396186646479f7c.js"
            }
        };
        const services = {
            "multipleSellersService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/multipleSellersService/multipleSellersService.min.aefbc5733e96df09.js"
            },
            "suppliersService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/suppliersService/suppliersService.min.17ec497d9c621c40.js"
            },
            "deliveryInfoService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/deliveryInfoService/deliveryInfoService.min.59b5b4491be7905c.js"
            },
            "productFeedbacksService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/productFeedbacksService/productFeedbacksService.min.5c52c09874dba1c4.js"
            },
            "productQuestionsService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/productQuestionsService/productQuestionsService.min.e28e89164728a4f3.js"
            },
            "productArticlesService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/productArticles/productArticlesService.min.ecf09dc6347a9593.js"
            },
            "searchByImageService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/searchByImage/searchByImageService.min.e3be9812b9df4b6a.js"
            },
            "recommendationsCatalogService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/recommendationsCatalogService/recommendationsCatalogService.min.c068b2d82b576c6f.js"
            },
            "lotteryService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/lottery/lotteryService.min.5ac8baaed66c2797.js"
            },
            "digitalServicesService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/digitalServicesService/digitalServicesService.min.b656996ce5271fc2.js"
            },
            "similarService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/similar/similarService.min.852c1b6fd8dbeefa.js"
            },
            "brandConstructorService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/brandConstructorService/brandConstructorService.min.ea21f392cc55bd49.js"
            },
            "storageService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/storageService.min.7a07069ba62ca73d.js"
            },
            "groupedDeliveriesService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/groupedDeliveriesService.min.75504919719dcad4.js"
            },
            "passportService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/passport/passportService.min.b7a3887071e9419e.js"
            },
            "wbxSessionService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/wbxSessionService.min.7f20370b2090b788.js"
            },
            "feedbacksService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/feedbacks/feedbacksService.min.8c1e9b1aa73d0016.js"
            },
            "certificateService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/giftCertificate/certificateService.min.0eb62a3321146b57.js"
            },
            "trackingService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/trackingService.min.a95e71823c0e2328.js"
            },
            "wbxOrderService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/wbxOrderService.min.c66218beef1d65b0.js"
            },
            "orderService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/orderService.min.0aa6db69cc610df6.js"
            },
            "claimsService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/refunds/claimsService.min.9f7865b173f0cd47.js"
            },
            "courierRefundsService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/refunds/courierRefundsService.min.d54c6e16d9a04176.js"
            },
            "metacardService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/multicardService/metacardService.min.5403345653610e5a.js"
            },
            "promotionsService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/promotions/promotionsService.min.5e976f252852b704.js"
            },
            "ordersSyncService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/ordersSyncService.min.271d14218cd0fb7f.js"
            },
            "archiveOrdersService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/archiveOrdersService.min.6ca39f3496b03bd7.js"
            },
            "brokerInstallmentService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/installment/brokerInstallmentService.min.5d651b461725eb04.js"
            },
            "feedbacksPaymentService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/feedbacks/feedbacksPaymentService.min.e6a49777d11d3764.js"
            },
            "sbpBanksSelector": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/wallet/sbpBanksSelector.min.c838ac082d2e6a38.js"
            },
            "installmentAggregatorService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/installment/installmentAggregatorService.min.a229050b8cc3fa8f.js"
            },
            "bplInstallmentService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/installment/bplInstallmentService.min.e97046ec7a922142.js"
            },
            "premiumSubscriptionService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/premiumSubscription/premiumSubscriptionService.min.41cf4ead463fd8d2.js"
            },
            "parseTokenService": {
                "physicalPath": "//static-basket-01.wbbasket.ru/vol0/j/spa/services/parseToken/parseTokenService.min.8040937678c95d39.js"
            }
        };
        const tmplHashes = deepFreeze({
            "jstemplates-ru-ru.json": "16bc4a6bb788a8e6",
            "servicepages-ru-ru.json": "b47905ec76682c2c",
            "spaaccount-ru-ru.json": "ec95cf0c07e1858e",
            "spaactiveorders-ru-ru.json": "088aea8d037954ae",
            "spaarchivepositions-ru-ru.json": "5cdba4f5d45898fc",
            "spabasket-ru-ru.json": "f37a73847a269061",
            "spabrandbyletter-ru-ru.json": "9452d3166f9acb14",
            "spabrandlist-ru-ru.json": "0f3f9ab65da8255f",
            "spabrandpromo-ru-ru.json": "d7171345100161b1",
            "spabrands-ru-ru.json": "2e14bd974d5ecbb4",
            "spacatalog-ru-ru.json": "4a58fa0073746103",
            "spaconfirmemail-ru-ru.json": "ab6dccba25ec5147",
            "spacourierrefunds-ru-ru.json": "c79c2283125e580e",
            "spacustomerreceipt-ru-ru.json": "6d76b82742fac3f3",
            "spadeliveryservice-ru-ru.json": "27f9cba358b3134b",
            "spafavoritebrands-ru-ru.json": "6ac9a79500e639ce",
            "spafavorites-ru-ru.json": "cc3b40b006f21e9b",
            "spagiftcertificates-ru-ru.json": "11c3b301c2fa0980",
            "spagiftcertificatesthankyou-ru-ru.json": "c2a12acbdfaad2a5",
            "spahome-ru-ru.json": "34c9e63907252df4",
            "spainstallmentlanding-ru-ru.json": "44d0e5cda3458952",
            "spamycommunications-ru-ru.json": "a830e8756380b3e4",
            "spamyfeedbacks-ru-ru.json": "d0766eeca3c3a52e",
            "spanotifications-ru-ru.json": "d8ef8f955e64684e",
            "spaoauthsignin-ru-ru.json": "07fd76fdb91b0321",
            "spaorderconfirmed-ru-ru.json": "ec412f721414eeec",
            "spaorderthankyou-ru-ru.json": "592ba71e7e7e5b0c",
            "spapaymentfail-ru-ru.json": "c1dd6f3e114fea90",
            "spapaymentreturn-ru-ru.json": "155d0e2147eef307",
            "spapaymentsuccess-ru-ru.json": "899841d441a4b820",
            "spapersonalcabinet-ru-ru.json": "92a62dd2681e43b9",
            "spaproductcard-ru-ru.json": "b7b385e2cfeeec7a",
            "spaproductcardfeedbacks-ru-ru.json": "cd985c1b808cd379",
            "spaproductcardothersellers-ru-ru.json": "4bd1b1fa29ca88dd",
            "spaproductcardquestions-ru-ru.json": "16ddb88676288dd7",
            "spaprofile-ru-ru.json": "fc6438f062e9a746",
            "spapromotioncatalog-ru-ru.json": "1248bdf228e83613",
            "spapromotions-ru-ru.json": "6df5ea49c00fa939",
            "sparecommendationscatalog-ru-ru.json": "534742d0682ba02e",
            "sparecommendationssearchcatalog-ru-ru.json": "edad36477f02093c",
            "spasearch-ru-ru.json": "3237da6379d4d02a",
            "spasearchbyimage-ru-ru.json": "7648d5717f16b42f",
            "spasellercatalog-ru-ru.json": "5c5590668bd812e7",
            "spasignin-ru-ru.json": "2eb1c3556c994bb0",
            "spatravellk-ru-ru.json": "a937fcb6a528a07e",
            "spawallethistory-ru-ru.json": "533d64193d46098f",
            "spawalletpurchase-ru-ru.json": "2e9179bd8a2bfdc8",
            "spawbwallet-ru-ru.json": "0ec81cae552816e4",
            "subscriptionpage-ru-ru.json": "d4abbcf2d8eba6a0",
            "agreetermspopup-ru-ru.json": "6c5c7cfe60736f88",
            "cropper-ru-ru.json": "f64deec62c2dd3a5",
            "installmenttermspopup-ru-ru.json": "4d83afc14357841a",
            "premiumuserpopup-ru-ru.json": "fbed44f79cdef79e",
            "productcardpopup-ru-ru.json": "f72919975fc6bbc3",
            "requisiteeditor-ru-ru.json": "15a59236036c431d",
            "searchtags-ru-ru.json": "aa83d960cee5d9c9",
            "courierdeliveryoptionpopup-ru-ru.json": "b1a79a1659bccfd4",
            "apple2024-ru-ru.json": "f48ab4afef038cf0",
            "archiveitemrefundpopup-ru-ru.json": "8a7096d1ab492d47",
            "basketsellerhelper-ru-ru.json": "83804c0acf2293f8",
            "bindnewsbp-ru-ru.json": "9a0e4d853fffcd6b",
            "deliverycalendarpopup-ru-ru.json": "41faf7aae1579b9b",
            "infowbpaypopup-ru-ru.json": "0781815ec05400cc",
            "nspkpopup-ru-ru.json": "7c0de6abe9e3eac6",
            "paymentqrcpopup-ru-ru.json": "df2972b10342503c",
            "paymentsberpaypopup-ru-ru.json": "61bf2e844422b20d",
            "productcourieronlyminipopup-ru-ru.json": "7b4385343a76cc6e",
            "productcourieronlypopup-ru-ru.json": "c716bc58c774c64b",
            "productprepayonlypopup-ru-ru.json": "d082a6cc2f3c4dd6",
            "similarproductspopup-ru-ru.json": "d614cf6980c35a26",
            "wbwalletpopup-ru-ru.json": "2bf0db264a0d96d2",
            "customchargespopup-ru-ru.json": "f462387cc033323b",
            "choosesizetmpl-ru-ru.json": "b01b6d748c36ad19",
            "maincatalogconfig-ru-ru.json": "23713c20a95d19a2",
            "maincatalogmenumobilefronttmpl-ru-ru.json": "83a650d5c8faa6f0",
            "maincatalogmenumobiletmpl-ru-ru.json": "12a25e4475cc7350",
            "pagerhelper-ru-ru.json": "28fecad09b1ad5de",
            "cargodeliverydatepicker-ru-ru.json": "bab00376e9945af2",
            "changepickuppopup-ru-ru.json": "7f6582a3b315072a",
            "courierroutepopup-ru-ru.json": "5d12e5f8ed65954f",
            "deliveriespreview-ru-ru.json": "6f92273c37563273",
            "offerrateproducts-ru-ru.json": "5d5069664b4d4baf",
            "trackingpopup-ru-ru.json": "8727e5d3d7e9bda4",
            "communicationcreatorspa-ru-ru.json": "65c42b25dc687a83",
            "discussionsdetails-ru-ru.json": "2f3823c1d141f0f1",
            "error404-ru-ru.json": "a899b2967307f697",
            "loadingerror-ru-ru.json": "5fbb0252ad3a09a4",
            "wbstories-ru-ru.json": "1e683ce6f8704d9e",
            "selectionpreferedlocationtmpl-ru-ru.json": "ebd31e6571c67e89",
            "menupromosidebar-ru-ru.json": "74c851c579e542c7",
            "minicardcarousel-ru-ru.json": "59fcd2bca470eb17",
            "findothersellerpopup-ru-ru.json": "ed272009608916be",
            "miniproductcard-ru-ru.json": "6f0fa33fd2692705",
            "multiplesellerlist-ru-ru.json": "f5c00691e645e613",
            "reportwrongotherseller-ru-ru.json": "bf16348534b26882",
            "claimadder-ru-ru.json": "ce51cd0c7078811f",
            "claimcomplaintpopup-ru-ru.json": "f29ff5d1d22c64b2",
            "claimdetailedinfo-ru-ru.json": "e770adb425d52730",
            "claimphotorequirements-ru-ru.json": "95e9525be37db002",
            "courierrefundpopup-ru-ru.json": "d8d336bbbe02b5ff",
            "createdclaimpopup-ru-ru.json": "3dbed6ef5d7a670e",
            "newoffercontent0724-ru-ru.json": "3f853ab1b98eaf76",
            "onlinechat-ru-ru.json": "09a3d92694ecfce7",
            "onlinechatpopup-ru-ru.json": "ffbd04588de9ecbc",
            "popupratetmpl-ru-ru.json": "efa23f3ccdf7d18c",
            "tooltipratetmpl-ru-ru.json": "a0fa2494e4e15703",
            "cabinetmenupreview-ru-ru.json": "1ad2113335d0019e",
            "userimageaddpopup-ru-ru.json": "a2b36d5c527a0b33",
            "spaeditbankcards-ru-ru.json": "d1d01d8b576ce1b1",
            "photogalleryviewer-ru-ru.json": "bf559ff2eb1d27bf",
            "photogalleryvieweritem-ru-ru.json": "2637c27a7e32d6e4",
            "balancepaymentpopup-ru-ru.json": "9f7ea27c33820d47",
            "bindnewcardpopup-ru-ru.json": "aa5b2975849b564b",
            "bplinstallmentchart-ru-ru.json": "e5ee09bb5c76be43",
            "brokerinstallment-ru-ru.json": "a256fd1625f206b6",
            "brokerinstallmentpopup-ru-ru.json": "f272d5dfc2a38c5a",
            "commissioninstallmentchart-ru-ru.json": "7a6a34544b83fbab",
            "installmentcardspopup-ru-ru.json": "f88db211a5a4fe54",
            "installmentchart-ru-ru.json": "627e1556c953ed6a",
            "paymentpopup-ru-ru.json": "2a482ea541b39f09",
            "walletlimitpopup-ru-ru.json": "a609effc732ee281",
            "walletpaymentpopup-ru-ru.json": "01be43ce548dc059",
            "postsmodel-ru-ru.json": "3b2e6990ea3eda17",
            "productpopupimagegallery-ru-ru.json": "4705ee8e21b5c320",
            "productpopupviewmodel-ru-ru.json": "d860bec594d5a862",
            "feedbackseditor-ru-ru.json": "c4fcb4e54874cced",
            "mobilefilterpopup-ru-ru.json": "e9b568d8fd235a56",
            "faqkurskpopup-ru-ru.json": "a9170d4b759b7225",
            "promotionkurskpopup-ru-ru.json": "5a5affbbb9726d6b",
            "recommendationslist-ru-ru.json": "60b4824744a99689",
            "officerefundpopup-ru-ru.json": "9d849fbad9d8dd8f",
            "choosecolorpopup-ru-ru.json": "b9d43845591d285e",
            "deliveryinfohelper-ru-ru.json": "15664af417de45fe",
            "deliveryinfopopup-ru-ru.json": "884bd15c6b2c356c",
            "feedbacksforpointspopup-ru-ru.json": "4b5d9cfc53ca7b90",
            "expressdeliveryinfopopup-ru-ru.json": "8847f55070ac8d3f",
            "goodpricepopup-ru-ru.json": "d838fcac944aa1a8",
            "imagetagspopup-ru-ru.json": "4e6c2ae8b33c1d36",
            "multiplesellerhelper-ru-ru.json": "356059610831d7aa",
            "originalgoodpopup-ru-ru.json": "b3c51bcd16e3d030",
            "premiumsellerpopup-ru-ru.json": "e6acbd172484a51b",
            "pricehistorychart-ru-ru.json": "321f155b9cdc36b0",
            "productcardimagegallery-ru-ru.json": "d6ce8b6d2e4ba15b",
            "productcarddescribtionerror-ru-ru.json": "5c18e3f78e0cd476",
            "productcardordergood-ru-ru.json": "c8de4ddd210839a3",
            "productcardponed-ru-ru.json": "ae2c6eee27dd49f7",
            "productcardprice-ru-ru.json": "d41a6178f58d592d",
            "productcardsizes-ru-ru.json": "7c9e7e04e915ac3a",
            "productdescribtionerrorinformer-ru-ru.json": "03955b4868f09535",
            "productdetailspopup-ru-ru.json": "2df3fe27e4be6433",
            "productgalleryviewer-ru-ru.json": "c3446ee351934316",
            "sizetable-ru-ru.json": "8c0015318c538549",
            "socialsharepopup-ru-ru.json": "1f0013d6c8b7fa71",
            "suppliersinfohelper-ru-ru.json": "3173f7f86028b12f",
            "suppliersinfotooltipster-ru-ru.json": "98abbf7ee39902e5",
            "sellerloyaltyprogrampopup-ru-ru.json": "c8321be729578ee9",
            "captcha-ru-ru.json": "315652e4693c00c6",
            "confirmcodepopup-ru-ru.json": "d66ba512db14becb",
            "recaptcha-ru-ru.json": "77532c357fd75fd2",
            "signincall-ru-ru.json": "2d3f7e0446f7bd6a",
            "travelmodule-ru-ru.json": "fda3fc6fb42a0e76",
            "deliverypointschoosepopup-ru-ru.json": "438af42e2adff510",
            "edityandexuseraddresstmpl-ru-ru.json": "607f4ed500591dd1",
            "poomapmodule-ru-ru.json": "b1d2f0fe6d8913af",
            "spaeditpoo-ru-ru.json": "52308e780a0ea0fa",
            "spaedityandexuseraddress-ru-ru.json": "92e1101401735654",
            "spauseraddresspopup-ru-ru.json": "47fd11b663ab7841",
            "balanceoperationshistory-ru-ru.json": "5984cdfcb8260d47",
            "financialoperationshistory-ru-ru.json": "eea57641a2765cbc",
            "wbwalletmanager-ru-ru.json": "2460cf1fc56d7e25",
            "mobilepopupsorter-ru-ru.json": "c6c40e5a2df82d9d",
            "tecdocauto-ru-ru.json": "00319c5ff01eee92",
            "brandconstructorblocks-ru-ru.json": "b0be4fd9e3855b84",
            "catalogbrandlikes-ru-ru.json": "56c5c2d08de1dbc8",
            "catalogbannersandrecommendations-ru-ru.json": "dee5df9529490347",
            "catalogmainauto-ru-ru.json": "1539be269984d960",
            "catalogmainseasonbanners-ru-ru.json": "360a28cd77c1212f",
            "catalogmainsport-ru-ru.json": "6973df6b2eca4e99",
            "catalogtopmenu-ru-ru.json": "2a8f7c2c3b4651e4",
            "categorymainleftinnermenu-ru-ru.json": "92b66358f8fa9767",
            "categorymainleftmenu-ru-ru.json": "a51db7c6e8c48247",
            "maincategoryv3-ru-ru.json": "5b902b66ee413e7d",
            "desktopfiltrespopup-ru-ru.json": "5c9cad6f1377373e",
            "filteritem-ru-ru.json": "6be66106ba231687",
            "mobilefiltrespopup-ru-ru.json": "a94ed933aab24cd6",
            "mobilepopupfilter-ru-ru.json": "b0d871a474c04dee",
            "catalogcore-ru-ru.json": "5b2f3329ad156490",
            "imagechip-ru-ru.json": "e8d25b86273ef24f",
            "catalogsellerblocks-ru-ru.json": "5c056be5e2bd9fee",
            "catalogsitepath-ru-ru.json": "82bb2a30e309e655",
            "catalogtopbrands-ru-ru.json": "8470c724edae03b0",
            "spaaccounteditemail-ru-ru.json": "4f225ba2de67a4af",
            "spaaccounteditfio-ru-ru.json": "06de4ee2e191c806",
            "spaaccounteditinn-ru-ru.json": "4a9a239b9a7b7b40",
            "spaaccounteditpassport-ru-ru.json": "b9eac1ce2768ef86",
            "spaaccounteditpassportuz-ru-ru.json": "76283d3b5ee8af5f",
            "spaaccounteditphone-ru-ru.json": "0a06e0a3c42a542c",
            "spaaccounteditsettings-ru-ru.json": "76a5af5f3c8a7667",
            "spadeleteaccountpopup-ru-ru.json": "92a4819f94616e46",
            "spaeditpersonaldatapopup-ru-ru.json": "ea9b5555318ee7c4",
            "menutoptmpl-ru-ru.json": "d7da992fc1c000da",
            "afterfeedbackmsgpopup-ru-ru.json": "8de9529f3a485e74",
            "confirmadultpopup-ru-ru.json": "f2632f6c78af986c",
            "certificatedetailspopup-ru-ru.json": "79381e391b114f33",
            "creditinfotooltip-ru-ru.json": "071326261c92063e",
            "currencyusdinfotooltipster-ru-ru.json": "e296d620a959ac74",
            "feedbackcommentform-ru-ru.json": "5de02a0737c1ece8",
            "feedbacksubmiterror-ru-ru.json": "8b8f539754a10f1f",
            "periodpricetmpl-ru-ru.json": "bc5f5ce318cf6d78",
            "installmenttooltipster-ru-ru.json": "832f4e310446fd62",
            "minorderpricetooltip-ru-ru.json": "b633e0fceb69e816",
            "productcardpricebottompanel-ru-ru.json": "a9ce2fc3986a9502",
            "productcomments-ru-ru.json": "81db2f0a6df02713",
            "productpubliccomments-ru-ru.json": "fb4c3dc17a3542d9",
            "productsubpageheadertooltip-ru-ru.json": "7b9752ae3f07411b",
            "questiongoodrules-ru-ru.json": "31c07f39e08a518b",
            "sizeinfotooltiptmpl-ru-ru.json": "ebcccbcaa073de9d",
            "spanotcommentpopup-ru-ru.json": "bfdb825884d3ad93",
            "spaquestionsubmited-ru-ru.json": "281fb73c0c52a503",
            "supplierinfo-ru-ru.json": "c599f6b9f046aa2c",
            "tooltipsellerparams-ru-ru.json": "11550050e83aa072",
            "searchmobilepopuptmpl-ru-ru.json": "220c8ab338ab4a76",
            "searchsuggestionstmpl-ru-ru.json": "5bf744f2811f5251",
            "spasmsconfirmationpopup-ru-ru.json": "c3602aff8d092c12",
            "commentanswercomplaint-ru-ru.json": "50ec8989eeb793ac",
            "feedbackmenutooltipster-ru-ru.json": "b5a595e1f1534cae",
            "feedbacksmodel-ru-ru.json": "6147cd1499735d51",
            "feedbackstimertooltip-ru-ru.json": "eb731b097cd0e4ac",
            "popuperrorunbuy-ru-ru.json": "db410255aacd7c5a",
            "popupfeedbackrules-ru-ru.json": "0874172db2c51f04",
            "sizematchdistribution-ru-ru.json": "ff450428281d0714",
            "feedbackcomplaintpopup-ru-ru.json": "39913d797877f13b",
            "productfeedbacksmodel-ru-ru.json": "f12e708b24628b40",
            "feedbacksphotogallery-ru-ru.json": "bac236be65d0471f",
            "feedbacksphotogallerylist-ru-ru.json": "cafa825edcad87de",
            "feedbacksphotogalleryviewer-ru-ru.json": "8b8a2656c1b9a8d0",
            "mobilesummarypopup-ru-ru.json": "26409974743d5ff2",
            "productquestionsmodel-ru-ru.json": "9937d6f0619f56ca",
            "questionsmodel-ru-ru.json": "5c1e1750a563114b",
            "spacomplaintaboutasnwerpopup-ru-ru.json": "44074af3c70f6937",
            "questionseditor-ru-ru.json": "fac62880a09c88b3",
            "claimsreporter-ru-ru.json": "10817bccfabbb5b4",
            "productcardcolors-ru-ru.json": "d2f7d453204e1248",
            "productselectionmanager-ru-ru.json": "8a5a8dae4c583799",
            "catalogcard-ru-ru.json": "480d926c25a04680"
        });
        wb.spa.init({
            router: {
                routesDictionary: routesDictionary,
                modules: modules,
                services: services,
                ssrModel: null,
                appVersion: '10.0.39',
                tmplHashes: tmplHashes
            },
            seoHelper: {
                items: [{
                    "tagName": "title",
                    "htmlContent": "Интернет-магазин Wildberries: широкий ассортимент товаров - скидки каждый день!"
                }],
                defaultTitle: 'Интернет-магазин Wildberries: широкий ассортимент товаров - скидки каждый день!'
            },
            menuLkHelper: {
                stylesLink: '//static-basket-01.wbbasket.ru/vol0/s/desktop/style/modules/menuLk.min.6f9280206cbc6943.css'
            }
        });
    } catch (e) {
        console.error(e);
        $.link.criticalError("#app");
        wb.spa.logError(e, {
            method: "spaEntrypoint",
            current: window.location.toString()
        });
    }
});
function deepFreeze(obj) {
    Object.keys(obj).forEach(function(prop) {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop]))
            deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
}
