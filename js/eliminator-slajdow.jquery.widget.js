(function ($) {
    $.widget("info_raszewski.eliminatorSlajdow", {
        options: {
            imageBaseUrl: "",
            scrollableImageContainer: false,
            spinningIconUrl: "ajax-loader.gif",
            esLogoUrl: "es_logo.svg",
            cssPath: "",
            facebookUrl: "https://www.facebook.com/eliminator-slajdow?ref=chrome.extension",
            bugReportUrl: "https://eliminator-slajdow.sugester.pl/",
            trackingCallback: function (category, action) {
            }
        },
        pageOptions: {
            sectionToBeEmptySelector: ".navigation div, .navigation span.page, #gal_navi_wrp, #gazeta_article_image_overlay",
            sectionToBeRemovedSelector: "#gazeta_article_image div.overlayBright",
            navigationNextULRSelector: ".navigation .next:first",
            navigationPageNumberSelector: ".navigation .page:first",
            articleBodySelector: "#gazeta_article_body",
            sectionToBeAttached: "#gazeta_article_image img,#gazeta_article_body",
            headerSectionSelector: ".navigation:first h1 span",
            sectionToBeRemovedFromAttachedSlidesSelector: "",
            hasSlideNumbers: true,
            visitedSlideURLs: [],
            classesToBeRemoved: [],
            pageType: "Default",
            customStyle: {},
            preIncludeCallback: function () {
            }
        },
        pages: [
            {   trigger: "body#pagetype_photo",
                name: "galeria #pagetype_photo (1)",
                regressionUrls: ["http://deser.pl/deser/51,111858,15435006.html?i=1",
                    "http://wyborcza.pl/51,75248,12537285.html?i%3a0&piano_t=1"],
                sectionToBeEmptySelector: "#gazeta_article_miniatures",
                sectionToBeRemovedSelector: "#gazeta_article_top .navigation, #gazeta_article .navigation, #gazeta_article_image .overlayBright",
                pageType: "1",
                customStyle: {"#col_left": "width:auto", "#columns_wrap": "background:none",
                    ".path_duzy_kadr .imageContainerEliminatorSlajdow p.headerLogo, .path_duzy_kadr .slideTitle": "color: white"},
                preIncludeCallback: function () {
                    $("#col_left").width($("#gazeta_article_image div a img").width());
                }
            },
            {   trigger: "body#pagetype_art_blog",
                name: "galeria #pagetype_art_blog (2)",
                regressionUrls: ["http://www.plotek.pl/plotek/56,78649,13096942,Kaja_Paschalska,,1.html",
                    "http://www.plotek.pl/plotek/56,79592,12829011,Jako_dzieci_byli_gwiazdami_seriali__Co_dzis_robia.html",
                    "http://wiadomosci.gazeta.pl/wiadomosci/5,114944,14025881,Turcja__Tysiace_ludzi_na_ulicach__starcia_z_policja.html?i=17",
                    "http://lublin.gazeta.pl/lublin/56,35640,13282657,I_plug_nie_dawal_rady,,2.html"],
                sectionToBeAttached: "#gazeta_article_image img,#gazeta_article_body, div[id*='gazeta_article_image_']:not('#gazeta_article_image_overlay')",
                pageType: "2",
                customStyle: {".path_duzy_kadr #col_left": "width:auto",
                    ".path_duzy_kadr .imageContainerEliminatorSlajdow p.headerLogo, .path_duzy_kadr .slideTitle": "color: white"},
                classesToBeRemoved: ["gazetaVideoPlayer"],
                preIncludeCallback: function () {
                    this._updateGalleryLink();
                }
            },
            {   trigger: "body#pagetype_art #gazeta_article_tools",
                name: "galeria body#pagetype_art #gazeta_article_image (3)",
                regressionUrls: ["http://gazetapraca.pl/gazetapraca/56,90443,12057502,10_najdziwniejszych_powodow__dla_ktorych_rzucamy_prace.html"],
                sectionToBeAttached: "#gazeta_article_image,#gazeta_article_body, div[id*='gazeta_article_image_']:not('#gazeta_article_image_overlay')",
                sectionToBeRemovedSelector: "#gazeta_article_image div.overlayBright",
                pageType: "3",
                preIncludeCallback: function () {
                    this._updateGalleryLink();
                }
            },
            {   trigger: "div#art div#container_gal",
                name: "gazetapraca.pl ",
                regressionUrls: [],
                articleBodySelector: "#art",
                navigationPageNumberSelector: ".paging:first",
                sectionToBeEmptySelector: "div#gal_navi_wrp, #gal_navi_wrp",
                navigationNextULRSelector: "#gal_btn_next a:first",
                sectionToBeAttached: "div#container_gal",
                pageType: "4"
            },
            {   trigger: "div#article div#article_body",
                name: "galeria div#article div#article_body (5)",
                regressionUrls: ["http://wyborcza.pl/duzy_kadr/56,97904,12530404,Najlepsze_zdjecia_tygodnia.html"],
                articleBodySelector: "#article_body",
                navigationNextULRSelector: "#gal_btn_next a:first",
                sectionToBeEmptySelector: "#gal_navi_wrp", // div#article ul,
                sectionToBeAttached: "div#container_gal",
                navigationPageNumberSelector: "#gal_navi .paging",
                pageType: "5"

            },
            {   trigger: "div#k1 div#k1p div#gal_outer",
                name: "galeria bez typu ('div#k1 div#k1p div#gal_outer') (6)",
                regressionUrls: ["http://wyborcza.pl/51,75248,12537285.html?i:0"],
                articleBodySelector: "div#gal_outer .description",
                navigationNextULRSelector: "li.btn_next a:first",
                sectionToBeEmptySelector: "div#article ul, #gal_navi_wrp, div#gal_miniatures",
                sectionToBeAttached: "div#gal_picture, div.description, p.description",
                navigationPageNumberSelector: "#gal_navi .paging",
                hasSlideNumbers: false,
                pageType: "6"

            },
            {   trigger: "div.PopupWielkosc div.ZdjecieGaleriaMaxWielkosc",
                name: "autotrader.pl - galeria zdjec samochodu - 2013",
                regressionUrls: [],
                articleBodySelector: "div#Zawartosc div.Detale",
                navigationNextULRSelector: "div:not(.ZjecieZaznaczone).ZdjecieGaleriaMini a",
                sectionToBeEmptySelector: "div.DetaleZdjeciaMiniOdstep, div.GaleriaPopupNastepne, div.FloatRight.PopupReklamaPoPrawej, div.TextAlignCenter.PopupReklamaNaDole",
                sectionToBeAttached: "div.ZdjecieGaleriaMaxWielkosc",
                navigationPageNumberSelector: "div.PasekZjecieOdstep",
                hasSlideNumbers: false,
                classesToBeRemoved: ["ZdjecieGaleriaMaxWielkosc"],
                pageType: "7"
            },
            {   trigger: "#multiGallery #multiGalleryContent #gallery",
                name: "MultiGallery na ONET.PL",
                regressionUrls: [],
                articleBodySelector: "#multiGallery #multiGalleryContent #galleryText",
                sectionToBeEmptySelector: "*[id='mediaList'], script, .onet-ad, .navBox .navBoxContainer, .imageContainerEliminatorSlajdow .navBoxClose, .ad_adInfo, .ad_adInfoEnd",
                sectionToBeRemovedSelector: ".imageContainerEliminatorSlajdow .navBoxClose, .ad_adInfo, .ad_adInfoEnd, #multiGalleryContent .navBox",
                navigationNextULRSelector: ".navBox .navBoxContainer a.nextFixed",
                navigationPageNumberSelector: "",
                sectionToBeAttached: "#multiGalleryContent #galleryText", // sekcja komentarza i obrazek
                headerSectionSelector: "",
                hasSlideNumbers: false,
                customStyle: {"body": "height:auto"},
                pageType: "8"

            },
            {   trigger: "div#page div#pageWrapper div#photo div#photoContainer div.nav a",
                name: "Galeria MediaRegionalne ",
                regressionUrls: ["http://www.wspolczesna.pl/apps/pbcs.dll/gallery?Site=GW&Date=20140209&Category=GALERIA01&ArtNo=209009997&Ref=PH&Params=Itemnr=1"],
                pageType: "9",
                articleBodySelector: "div#photo",
                sectionToBeEmptySelector: "script",
                sectionToBeRemovedSelector: "div#tngallery, p#photoNavigation, .imageContainerEliminatorSlajdow div#photoRelatedArticles, .imageContainerEliminatorSlajdow div#photo p.photoMeta",
                navigationNextULRSelector: "p#photoNavigation a#photoNavigationNext",
                navigationPageNumberSelector: "span#photoNavigationPages",
                sectionToBeAttached: "div#photo",
                headerSectionSelector: "",
                hasSlideNumbers: true
            },
            {   trigger: "div#page div#pageWrapper div#article.photostory p.photoNavigation a.photoNavigationNext",
                name: "Galeria MediaRegionalne - artykul",
                regressionUrls: [],
                pageType: "10",
                articleBodySelector: "div#article",
                sectionToBeEmptySelector: "script",
                sectionToBeRemovedSelector: "p.photoNavigation, div#photoContainer div.nav, div#photoElement div.nav, h2",
                navigationNextULRSelector: "p.photoNavigation a.photoNavigationNext",
                navigationPageNumberSelector: "span.photoNavigationPages:first",
                sectionToBeAttached: "div#article div.intextAd",
                headerSectionSelector: "",
                hasSlideNumbers: true
            },
            {   trigger: "div#main-column div#photo.common-box div.inner div.photo-item div.photoElem a.next",
                name: "Galeria MojeMiasto",
                regressionUrls: ["http://www.mmbydgoszcz.pl/photo/1886182/Photo+Walk+Koronowo+2013"],
                pageType: "11",
                articleBodySelector: "div#photo div.photo-item",
                sectionToBeEmptySelector: "script",
                sectionToBeRemovedSelector: "div.photoElem a",
                navigationNextULRSelector: "div#main-column div#photo.common-box div.inner div.photo-item div.photoElem a.next",
                navigationPageNumberSelector: "div#photo.common-box div.top-slider div.slider",
                sectionToBeAttached: "div.photo-item",
                headerSectionSelector: "",
                hasSlideNumbers: true

            },
            {   trigger: "body#pagetype_art #content_wrap .photostoryNextPage",
                name: "galeria #pagetype_art .photostoryNextPage NOWA GALERIA GAZETY (12)",
                regressionUrls: ["http://technologie.gazeta.pl/internet/56,104530,14940595,Panel_sterowania__gdzie_ja_do_diaska_jestem,,1.html"],
                sectionToBeAttached: "#content_wrap",
                articleBodySelector: "#columns_wrap",
                sectionToBeEmptySelector: "script:not([src])",
                sectionToBeRemovedSelector: "#banP1, #banP2, #banP3, #banP4,#banP62,  .photostoryNextPage, .photostoryPrevPage, #gazeta_article_image div.overlayBright, #gazeta_article .nextSlideWrapper",
                sectionToBeRemovedFromAttachedSlidesSelector: "#photo_comments, #article_comments",
                navigationNextULRSelector: "div#content .nextSlideButton",
                navigationPageNumberSelector: "",
                headerSectionSelector: "",
                hasSlideNumbers: false,
                pageType: "12",
                preIncludeCallback: function () {
                    this._updateGalleryLink();
                }
            },
            {   trigger: "div#page div#pageWrapper div#photo p#photoNavigation a#photoNavigationNext",
                name: "MediaRegionalne 1",
                regressionUrls: ["http://www.wspolczesna.pl/apps/pbcs.dll/gallery?Site=GW&Date=20140131&Category=GALERIA01&ArtNo=131009996&Ref=PH",
                    "http://www.gazetalubuska.pl/apps/pbcs.dll/gallery?Site=GL&Date=20140201&Category=galeria&ArtNo=201009994&Ref=PH&Params=Itemnr=1"],
                pageType: "13",
                articleBodySelector: "div#photo",
                sectionToBeEmptySelector: "script",
                sectionToBeRemovedSelector: "#tngallery, #photoRelatedArticles, #photoNavigation, #photoElement div.nav",
                navigationNextULRSelector: "p#photoNavigation a#photoNavigationNext",
                navigationPageNumberSelector: "span#photoNavigationPages",
                sectionToBeAttached: "div#photo img, div#photo p:nth-child(7)", // sekcja komentarza i obrazek
                headerSectionSelector: "",
                hasSlideNumbers: true

            },
            {   trigger: "div#wrapper > div > div#photo p#galleryNav a#galleryNavNext",
                name: "MediaRegionalne 2",
                regressionUrls: ["http://www.nowiny24.pl/apps/pbcs.dll/gallery?Site=NW&Date=20140126&Category=IMPREZY07&ArtNo=126009999&Ref=PH&Params=Itemnr=1"],
                pageType: "14",
                articleBodySelector: "div#photo",
                sectionToBeEmptySelector: "script",
                sectionToBeRemovedSelector: "#galleryNav, #tngalleryScroll",
                navigationNextULRSelector: "p#galleryNav a#galleryNavNext",
                navigationPageNumberSelector: "p#galleryNav",
                sectionToBeAttached: "div#photo img, #photo p:first", // sekcja komentarza i obrazek
                headerSectionSelector: "",
                hasSlideNumbers: true

            },
            {   trigger: "div#LeftContent div#MainGallery img#PhotoInMainGallery",
                name: "Autotrader Legacy",
                regressionUrls: [],
                articleBodySelector: "div#MainGallery",
                navigationNextULRSelector: "div:not(.ZjecieZaznaczone).ZdjecieGaleriaMini a",
                sectionToBeEmptySelector: "div.DetaleZdjeciaMiniOdstep, div.GaleriaPopupNastepne, div.FloatRight.PopupReklamaPoPrawej, div.TextAlignCenter.PopupReklamaNaDole",
                sectionToBeAttached: "div.ZdjecieGaleriaMaxWielkosc",
                navigationPageNumberSelector: "div.PasekZjecieOdstep",
                hasSlideNumbers: false,
                classesToBeRemoved: ["ZdjecieGaleriaMaxWielkosc"],
                pageType: "15"
            },
            {   trigger: "div#bxGaleria div.podpisDuzaFotka div.przewijakZdjec div.slider",
                name: "Wiadomosci Wp.pl",
                regressionUrls: ["http://wiadomosci.wp.pl/gid,16390562,gpage,4,img,16391154,kat,1356,title,Igrzyska-w-Soczi-i-nie-tylko,galeria.html"],
                articleBodySelector: "div#bxGaleria",
                navigationNextULRSelector: "div#bxGaleriaOpis a.stgGaleriaNext",
                sectionToBeEmptySelector: "div.podpisDuzaFotka",
                sectionToBeAttached: "div.bxGaleria div.kol2",
                sectionToBeRemovedSelector: "#bxGaleriaOpis .stro, .przewijakGalerii, div.duzaFotka > a",
                navigationPageNumberSelector: "div#bxGaleriaOpis span.status",
                sectionToBeRemovedFromAttachedSlidesSelector: "script",
                hasSlideNumbers: true,
                customStyle: {"*[id='bxGaleriaOpis']": "margin-top:0 !important"},
                pageType: "16"

            },
            {   trigger: "div#stgGaleria div.stgGaleriaCnt .stgGaleriaNext",
                name: "Facet wp.pl",
                articleBodySelector: "div.bxArt",
                navigationNextULRSelector: "div#stgGaleria a.stgGaleriaNext",
                sectionToBeEmptySelector: "",
                sectionToBeAttached: "#stgGaleria",
                sectionToBeRemovedSelector: ".stgGaleriaCnt > a",
                navigationPageNumberSelector: ".bxArt .strGallery.pageInfo > span",
                sectionToBeRemovedFromAttachedSlidesSelector: "script",
                hasSlideNumbers: true,
                regressionUrls: ["http://facet.wp.pl/gid,16327903,kat,1007873,page,7,galeriazdjecie.html"],
                pageType: "17"

            },
            {   trigger: "div#stgMain article.stampGaleria div.stampBxNaglowek div.stampStronicowanie div.pIndex a.pNext",
                name: "Finanse wp.pl",
                articleBodySelector: "#stgMain article.stampGaleria",
                navigationNextULRSelector: "div.stampStronicowanie div.pIndex a.pNext",
                sectionToBeEmptySelector: "",
                sectionToBeAttached: "article.stampGaleria div.articleRow",
                sectionToBeRemovedSelector: ".stampGlowneFoto .stampGlowneFotoMain > a, div.stampStronicowanie div.pIndex",
                navigationPageNumberSelector: ".stampStronicowanie:first .pIndex span",
                sectionToBeRemovedFromAttachedSlidesSelector: "script, .stampBxStopka",
                customStyle: {".stampGlowneFoto": "overflow: visible"},
                hasSlideNumbers: true,
                pageType: "18",
                regressionUrls: ["http://finanse.wp.pl/gid,16374104,title,Oto-najwieksze-stolice-hazardu,galeria.html",
                    "http://finanse.wp.pl/gid,16350579,kat,1033695,title,Polska-wsrod-najatrakcyjniejszych-rynkow-Europy,galeria.html",
                    "http://kobieta.wp.pl/gid,16425464,img,16425465,kat,26405,title,Obledna-kreacja-Jennifer-Lopez,galeriazdjecie.html?ticaid=1124c8"],
                preIncludeCallback: function () {
                }
            },
            {   trigger: "div#content div#largepic_wrapper div#largepic",
                name: "kwejk.pl",
                articleBodySelector: "div#content div.content",
                navigationNextULRSelector: "div#largepic_wrapper a.next_image",
                sectionToBeEmptySelector: "",
                sectionToBeAttached: "div#content div.content",
                sectionToBeRemovedSelector: ".image_carousel, div#largepic_wrapper > a",
                navigationPageNumberSelector: "",
                sectionToBeRemovedFromAttachedSlidesSelector: ".image_carousel, script, div.share",
                customStyle: {},
                hasSlideNumbers: false,
                pageType: "19",
                regressionUrls: ["http://kwejk.pl/article/2054448/20/caa",
                    "http://kwejk.pl/article/2054452/0/co-mozna-zmiescic-w-c-5-galaxy.html#gallerypic"],
                preIncludeCallback: function () {
                }
            },
            {   trigger: "body#strona-artykulu div#glowna-kolumna div#galeria-material-zdjecie",
                name: "gazetawroclawska.pl",
                articleBodySelector: "#galeria-material",
                navigationNextULRSelector: "#galeria-nastepne-2",
                sectionToBeEmptySelector: "#miniatury-kontener, #galeria-poprzednie-2, #galeria-nastepne-2, .iloscZdjec",
                sectionToBeAttached: "#galeria-material",
                sectionToBeRemovedSelector: "#miniatury-kontener",
                navigationPageNumberSelector: ".iloscZdjec",
                sectionToBeRemovedFromAttachedSlidesSelector: "script, #miniatury-kontener, #galeria-poprzednie-2, #galeria-nastepne-2, .iloscZdjec",
                customStyle: {},
                hasSlideNumbers: true,
                pageType: "20",
                regressionUrls: ["http://www.gazetawroclawska.pl/artykul/3424383,ruszyl-remont-minskiej-od-rana-utrudnienia-i-gigantyczne-korki-na-muchoborze-zdjecia,1,4,id,t,sm,sg.html#galeria-material",
                    "http://www.gloswielkopolski.pl/artykul/3431295,oceniamy-pilkarzy-po-meczu-lech-poznan-gornik-zabrze-sprawdz,id,t.html"],
                preIncludeCallback: function () {
                    $(".lazy.powiekszenie").attr("src", $(".lazy.powiekszenie").attr("data-original")).removeClass("lazy");
                }
            },
            {   trigger: "div#main_container div.demotivator.pic #royalSliderExtraNavigation a.navigate_right",
                name: "demotywatory.pl",
                articleBodySelector: "#main_container .demotivator .demot_pic",
                navigationNextULRSelector: "#royalSliderExtraNavigation a.navigate_right",
                sectionToBeEmptySelector: "",
                sectionToBeAttached: ".demotivator .demot_pic .rsSlideContent:first",
                sectionToBeRemovedSelector: "#pics_gallery_slider, #royalSliderExtraNavigation, .share-widgets, .demot_info_stats",
                navigationPageNumberSelector: "#royalSliderExtraNavigation .paginator_data",
                sectionToBeRemovedFromAttachedSlidesSelector: "script, .share-widgets, .rsTmb",
                headerSectionSelector: ".demotivator .demot_pic .rsSlideContent:first h3",
                customStyle: {'rsSlideContent h3': 'display:none', '#main_container article, #main_container .demotivator': 'float:left'},
                hasSlideNumbers: false,
                pageType: "21",
                regressionUrls: ["http://demotywatory.pl/4339879/Najciekawsze-fakty-o-ktorych-prawdopodobnie-nie-miales-pojecia#obrazek-1"],
                preIncludeCallback: function () {
                    if(typeof this.loopCounter == 'undefined'){
                        this.loopCounter = 0;
                    }else if(this.loopCounter < 10){
                        this.loopCounter++;
                    }
                    this.nextPageURL = document.location.protocol + "//" + document.location.host + document.location.pathname + "#obrazek-" + this.loopCounter;
                }
            }

        ],
        spinner: $("<div>", {"class": "eliminatorSlajdowSpinner"}).append($("<i>", {class: 'icon-spin3 animate-spin'})),
        imageContainer: null,
        _start: function () {
            $("head").append($("<link>", {href: this.options.cssPath, type: "text/css", rel: "stylesheet"}));
            $("body").addClass("eliminatorSlajdow");
            // FIXME
            if ($(this.pageOptions.sectionToBeAttached).width() > 620) {
                $("#content_wrap").find("#columns_wrap #col_right").css("cssText", "float:none; position: inherit !important;");
            }
            this.nextPageURL = $(this.pageOptions.navigationNextULRSelector).attr("href");
            this._logger("link do nastepnej storny", this.nextPageURL, this.pageOptions.navigationNextULRSelector);
            this.pageOptions.preIncludeCallback.call(this);
            if (this.nextPageURL) {
                this._tracking("ES_start", this.pageOptions.pageType);
                $(this.pageOptions.sectionToBeEmptySelector).empty();
                $(this.pageOptions.sectionToBeRemovedSelector).remove();
                this._createImageContainer();
                this._bind();
                this._showSpinnier();
                this.pageOptions.visitedSlideURLs.push(document.location.pathname + document.location.search);
                this._requestNextSlide(this.nextPageURL);
            } else {
                this._logger("Brak slajdow. Galeria typu " + this.pageOptions.pageType);
            }
        },
        _buildHeader: function (pageNumberLabel, pageNumber, url) {
            return $("<div>", {
                "class": "slideHeader slideHeader_" + pageNumber
            }).append($("<p>", {
                    "class": "headerBar shadow"
                }).append($("<span>", {
                        "class": "pageNumber",
                        text: pageNumberLabel
                    })).append($("<span>", {
                        "class": "esLogo",
                        style: "background:url('" + this.options.imageBaseUrl + this.options.esLogoUrl + "') no-repeat 0 0 /16px"
                    })).append($("<i>", {
                        "class": "scrollSwitch icon-resize-vertical " + (this.options.scrollableImageContainer ? "esIconEnabled" : "esIconDisabled"),
                        title: "Pasek przewijania"
                    })).append(
                        $("<i>", {
                            "class": "icon-bug",
                            title: "Zgłoś problem"
                        })).append(
                        $("<span>", {
                            "class": "directLink"
                        }).append($("<a>", {
                                target: "_blank",
                                href: this._appendDisableEsFlag(url),
                                title: "Bezpośredni link"
                            }).append($("<i>", {"class": 'icon-link-ext'}))

                            )).append(
                        $("<i>", {
                            "class": "icon-right-circle",
                            title: "Następny Slajd"
                        })).append(
                        $("<i>", {
                            "class": "icon-left-circle",
                            title: "Poprzedni Slajd"
                        })).append(
                        $("<i>", {
                            "class": "icon-up-circle",
                            title: "Pierwszy Slajd"
                        })).append(
                        $("<i>", {
                            "class": "icon-down-circle",
                            title: "Ostatni Slajd"
                        }))).append($("<p>", {
                    "class": "headerLogo",
                    text: 'Eliminator Slajdów'
                }).append($("<i>", {"class": 'icon-facebook-squared'})))
        },
        _appendNextSlide: function (galleryPage, url) {
            var that = this;
            this._hideSpinner();
            var articleSection = $(galleryPage).find(this.pageOptions.sectionToBeAttached);
            if ($(articleSection).length > 0) {

                this.nextPageURL = $(galleryPage).find(this.pageOptions.navigationNextULRSelector).attr("href");
                if (typeof url === "undefined" || url === this.nextPageURL || $.inArray(url, this.pageOptions.visitedSlideURLs) > -1) {
                    this._logger("Chyba cos jest zle. URL do nastepnego slajdu zostal juz dodany do listy lub jest UNDEFINED:/", url, this.nextPageURL);
                    return;
                }
                var pageNumber = $(galleryPage).find(this.pageOptions.navigationPageNumberSelector).text().match(/(\d+)/g);
                if (this.pageOptions.hasSlideNumbers) {
                    this._logger("numer strony", pageNumber);
                }
                var pageNumberLabel = "Ostatni slajd";
                if (pageNumber && pageNumber.length === 2) {
                    pageNumberLabel = "Slajd " + pageNumber[0] + " z " + pageNumber[1];
                } else if (!this.pageOptions.hasSlideNumbers) {
                    pageNumberLabel = "Slajd";
                }

                var slideHeader = this._buildHeader(pageNumberLabel, pageNumber, url);

                $(this.imageContainer).append(slideHeader);

                $(articleSection).find(this.pageOptions.sectionToBeEmptySelector).empty();
                $(articleSection).find(this.pageOptions.sectionToBeRemovedSelector).remove();
                $(articleSection).find(this.pageOptions.sectionToBeRemovedFromAttachedSlidesSelector).remove();

                var slideWrapper = $(this.imageContainer).append($("<div>", {
                    "class": "slide_" + pageNumber + " es_slide"
                })).children().last();

                if ($(galleryPage).find(this.pageOptions.headerSectionSelector).length === 1) {
                    var desc = $(galleryPage).find(this.pageOptions.headerSectionSelector).html();
                    $(slideWrapper).append($("<p>", {
                        "class": "slideTitle",
                        text: desc
                    }));
                }

                $(slideWrapper).append(articleSection);

                for (var selector in this.pageOptions.customStyle) {
                    var elements = $(articleSection).find(selector);
                    if (elements.length == 0) {
                        elements = $(selector);
                    }
                    if (elements.length == 0) {
                        continue;
                    }
                    elements.each(function () {
                        var current = $(this).attr("style") ? $(this).attr("style") + ";" : "";
                        $(this).attr("style", current + that.pageOptions.customStyle[selector]);
                    });
                }

                for (var i in this.pageOptions.classesToBeRemoved) {
                    $("." + this.pageOptions.classesToBeRemoved[i]).removeClass(this.pageOptions.classesToBeRemoved[i]);
                }

                // FIXME:
                if (this.imageContainer.width() > 950 && this.pageOptions.pageType !== "8" && this.pageOptions.pageType !== "12") {
                    this.imageContainer.width(950);
                }

                this.pageOptions.visitedSlideURLs.push(url);

                this.pageOptions.preIncludeCallback.call(this);

                if ((pageNumber && pageNumber.length === 2 && pageNumber[0] !== pageNumber[1]) || (!this.pageOptions.hasSlideNumbers && document.location.href.indexOf(this.nextPageURL) === -1)) {
                    this._logger("link do nastepnej storny", this.nextPageURL);
                    this._showSpinnier();
                    this._requestNextSlide(this.nextPageURL);
                } else {
                    this._logger("Ostatni Slajd");
                    this._hideSpinner();
                }

            } else {
                this._logger("Article section not found");
            }
        },
        _getPaywallRedirectUrl: function (nextPage) {
            if (nextPage.length > 1000 && nextPage.length < 1500
                && $(nextPage).length == 11
                && $($(nextPage)[3]).is("meta")
                && $($(nextPage)[3]).attr("http-equiv") == "refresh"
                && $($(nextPage)[3]).attr("content")
                && $($(nextPage)[3]).attr("content").indexOf("5;URL=") === 0) {
                var c = $($(nextPage)[3]).attr("content");
                return c.substring(7, c.length - 1)
            }
            return "";
        },
        _requestNextSlide: function (nextPageURL) {
            var that = this;
            $.get(nextPageURL,function (nextPage) {
                var redirectUrl = that._getPaywallRedirectUrl(nextPage);
                if (redirectUrl) {
                    that._requestNextSlide(redirectUrl);
                } else {
                    that._appendNextSlide(nextPage, nextPageURL);
                }
            }).fail(function () {
                    this._tracking("ES_error", this.pageOptions.pageType, nextPageURL);
                    console.log("ES - Blad pobierania nastepnego slajud: " + nextPageURL);
                    that._hideSpinner();
                });
        },
        _bind: function () {
            var that = this;
            var imageContainer = $("div.imageContainerEliminatorSlajdow");
            imageContainer.on("click", "i.icon-resize-vertical", function () {
                var currentOffset = $(this)[0].getBoundingClientRect().bottom - $(this)[0].getBoundingClientRect().height;
                imageContainer.toggleClass("noScroll").toggleClass("scroll");
                if (that.options.scrollableImageContainer) {
                    that._logger("scroll switch OFF");
                    $('html, body').animate({
                        scrollTop: $(this).offset().top - currentOffset
                    }, 500);
                    that.options.scrollableImageContainer = false;
                } else {
                    that._logger("scroll switch ON");
                    $('html, body').animate({
                        scrollTop: $(".imageContainerEliminatorSlajdow").offset().top - 25
                    }, 500);
                    imageContainer.animate({
                        scrollTop: 0
                    }, 0);
                    imageContainer.animate({
                        scrollTop: $(this).offset().top - imageContainer.offset().top - currentOffset + 25
                    }, 500);
                    that.options.scrollableImageContainer = true;
                }
                imageContainer.find("i.icon-resize-vertical").toggleClass("esIconEnabled").toggleClass("esIconDisabled");
                that._tracking("scroll_ui", that.options.scrollableImageContainer ? "ON" : "OFF");
            });

            imageContainer.on("click", "i.icon-bug", function () {
                window.open(that.options.bugReportUrl);
                that._tracking("bug_report_ui", "click");
            });

            imageContainer.on("click", "p.headerLogo", function () {
                window.open(that.options.facebookUrl);
                that._tracking("facebook_ui", "click");
            });

            imageContainer.on("click", "span.directLink a", function () {
                that._tracking("direct_link_ui", "click");
            });

            imageContainer.on("click", "i.icon-up-circle", function () {
                $("body").animate({
                    scrollTop: 0
                }, 500);
                that._tracking("go_top_link", "click");
            });

            imageContainer.on("click", "i.icon-down-circle", function () {
                $("body").animate({
                    scrollTop: imageContainer.offset().top + imageContainer.height() - 50
                }, 500);
                that._tracking("go_end_link", "click");
            });

            imageContainer.on("click", "i.icon-right-circle", function () {
                if (that.options.scrollableImageContainer) {
                    // maybe will implement it one day
                } else {
                    var offset = imageContainer.offset().top + imageContainer.height() - 50;
                    var thisSlide = $(this).parent().parent();
                    if (thisSlide.next().length > 0 && thisSlide.next().next().length > 0) {
                        offset = thisSlide.next().next().offset().top - thisSlide[0].getBoundingClientRect().bottom - thisSlide[0].getBoundingClientRect().height + 62;
                    }
                    $("body").animate({
                        scrollTop: offset
                    }, 500);
                }
                that._tracking("go_next_link", "click");
            });

            imageContainer.on("click", "i.icon-left-circle", function () {
                if (that.options.scrollableImageContainer) {
                    // maybe will implement it one day
                } else {
                    var offset = 0;
                    var thisSlide = $(this).parent().parent();
                    if (thisSlide.prev().length > 0) {
                        offset = thisSlide.prev().prev().offset().top - thisSlide[0].getBoundingClientRect().bottom - thisSlide[0].getBoundingClientRect().height + 62;
                    }
                    $("body").animate({
                        scrollTop: offset
                    }, 500);

                }
                that._tracking("go_prev_link", "click");
            });


        },
        _create: function (customOptions) {
            $.extend(true, this, this, customOptions);
            for (var i in this.pages) {
                if ($(this.pages[i].trigger).length > 0) {
                    $.extend(true, this.pageOptions, this.pageOptions, this.pages[i]);
                    this._logger("ES START konfiguracja " + this.pageOptions.pageType + " dla " + this.pageOptions.name);
                    this._start();
                    break;
                }
            }
        },
        _createImageContainer: function () {
            var icClass = this.options.scrollableImageContainer ? 'scroll' : 'noScroll';
            this.imageContainer = $("<div>", {"class": icClass + ' imageContainerEliminatorSlajdow'});
            $(this.pageOptions.articleBodySelector).after(this.imageContainer);
        },
        _showSpinnier: function () {
            $("div.imageContainerEliminatorSlajdow").append(this.spinner);
        },
        _hideSpinner: function () {
            $("div.imageContainerEliminatorSlajdow div.eliminatorSlajdowSpinner").remove();
        },
        _appendDisableEsFlag: function (url) {
            if (url.indexOf("?") > -1) {
                return url.replace("?", "?es=off&");
            } else {
                return url + "?es=off";
            }
        },
        _updateGalleryLink: function () {
            var galleryLink = $("#gazeta_article_miniatures .moreImg a");
            if (galleryLink.length === 1) {
                var href = galleryLink.attr("href");
                var suffix = "?i=1";
                if (href && (href.indexOf(suffix, href.length - suffix.length) !== -1)) {
                    galleryLink.attr("href", href.substring(0, href.length - suffix.length));
                }
            }
        },
        regression: function () {
            var setTimeoutFunction = function (urlToOpen, pi) {
                console.log("url", urlToOpen);
                console.log("delay", 10 * 1000 * pi);
                setTimeout(function () {
                    window.open(urlToOpen);
                }, 10 * 1000 * (pi));
            }

            var self = this;

            $("#start").click(function () {
                console.log("Start button");
                var counter = 1;
                for (var pi in  self.pages) {
                    var page = self.pages[pi];
                    var urls = page.regressionUrls;
                    for (var index in urls) {
                        $("body").append("<a href=' " + urls[index] + "'>" + page.pageType + " -- " + page.name + " -- " + urls[index] + "</a><br />");
                        var urlToOpen = urls[index] + '#TYPE_' + page.pageType;
                        counter = counter + 1;
                        setTimeoutFunction(urlToOpen, counter);
                    }
                }
            });

            this.pageOptions.sectionToBeAttached = "#toBeAttached";
            this.pageOptions.articleBodySelector = "#articleBodySelector"
            this._createImageContainer();
            this._appendNextSlide("body", "regression");
            this._create();
            this._showSpinnier();
        },
        _tracking: function (category, action, comment) {
            if ($.isFunction(this.options.trackingCallback)) {
                comment = comment || window.location.host;
                this.options.trackingCallback.call(this, category, action, comment)
            }
        },
        _logger: function () {
            console.log.apply(console, arguments);
        }
    })
    ;
})(jQuery);