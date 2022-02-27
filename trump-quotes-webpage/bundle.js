/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _removeMobileHover = __webpack_require__(1);

var _removeMobileHover2 = _interopRequireDefault(_removeMobileHover);

var _wireSocialButtons = __webpack_require__(3);

var _wireSocialButtons2 = _interopRequireDefault(_wireSocialButtons);

var _main = __webpack_require__(4);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _removeMobileHover2.default)();

// Add class to html if JS is loaded
document.querySelector('html').classList.add('js-is-loaded');

// Wire header social if present
if (document.querySelectorAll('.g-header__share').length) {
	(0, _wireSocialButtons2.default)({
		facebook: '.g-header__share-button--fb',
		twitter: '.g-header__share-button--tw',
		mail: '.g-header__share-button--ma'
	});
}
new _main2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = removeMobileHover;

var _isMobile = __webpack_require__(2);

var _isMobile2 = _interopRequireDefault(_isMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Inspired by: https://gist.github.com/rcmachado/7303143 and http://mvartan.com/2014/12/20/fixing-sticky-hover-on-mobile-devices/

function removeMobileHover() {
	if (_isMobile2.default.any()) {
		// Loop through each stylesheet
		for (var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
			var sheet = document.styleSheets[sheetI];

			// Verify if cssRules exists in sheet
			if (sheet.cssRules) {
				// Loop through each rule in sheet
				for (var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
					var rule = sheet.cssRules[ruleI];

					// Verify rule has selector text
					if (rule.selectorText) {
						// Replace hover psuedo-class with active psuedo-class
						rule.selectorText = rule.selectorText.replace(':hover', ':active');
					}
				}
			}
		}
	}
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var isMobile = {
	android: function android() {
		return navigator.userAgent.match(/Android/i);
	},

	blackberry: function blackberry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},

	ios: function ios() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},

	opera: function opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},

	windows: function windows() {
		return navigator.userAgent.match(/IEMobile/i);
	},

	any: function any() {
		return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
	}
};

exports.default = isMobile;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = wireSocialButtons;
function wireSocialButtons(params) {
	var href = window.location.href;
	var text = document.title;
	var encodedText = encodeURIComponent(text);

	var mail = 'mailto:?subject=' + encodedText + '&body=' + encodedText + '%0A%0A' + href;
	var mailNode = document.querySelectorAll(params.mail);

	for (var m = 0; m < mailNode.length; m++) {
		mailNode[m].setAttribute('href', mail);
	}

	var facebook = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(href);
	var facebookNode = document.querySelectorAll(params.facebook);

	for (var f = 0; f < facebookNode.length; f++) {
		facebookNode[f].setAttribute('href', facebook);
	}

	var twitter = 'https://twitter.com/intent/tweet?text=' + encodedText + '&via=BostonGlobe&url=' + encodeURI(href);
	var twitterNode = document.querySelectorAll(params.twitter);

	for (var t = 0; t < twitterNode.length; t++) {
		twitterNode[t].setAttribute('href', twitter);
	}
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// import d3Tooltip from './d3-tip'
var mainGraphic = function mainGraphic() {

    // graphic code
    var format = d3.format(",");

    var s = 1;

    // // Set tooltips
    // var tip = d3.tip()
    //             // .attr('class', 'd3-tip')
    //             .offset([-10, 0])
    // 						.direction('s');
    // .direction(direction.bind(this));

    // Get bounds of div enclosing the graphic
    var bounds = d3.select('.world_map').node().getBoundingClientRect();

    var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
        wth = window.innerWidth || window.documentElment.clientWidth || window.getElementsByTagName('.world_map')[0].clientWidth,
        ht = window.innerHeight || window.documentElment.clientHeight || window.getElementsByTagName('.world_map')[0].clientHeight,
        width = wth - margin.left - margin.right,
        height = ht - margin.top - margin.bottom;

    var path = d3.geoPath();

    var mapZoom = d3.zoom().on("zoom", freeZoom);

    function freeZoom() {
        g.attr("transform", d3.event.transform);
    }

    var svg = d3.select(".world_map").append("svg")
    // .call(mapZoom)
    // .append("#instructions")
    .call(mapZoom).attr("width", width).attr("height", height).classed("svg-content-responsive", true);

    svg.append("rect").attr("class", "map_background").attr("width", width).attr("height", height).style("fill", "none");

    // .on("click", clicked);


    var scaleNum = 200;
    var scaleDiv = 9;
    var center = [width / 3.2, 0.7 * height];

    var projection = d3.geoMercator().scale(scaleNum).translate(center);

    var path = d3.geoPath().projection(projection);

    // svg.call(tip);


    var g = svg.append("g").attr('class', 'map');

    // var map_instructions = svg.append("text")
    //                  .attr("x", width*0.5)
    //                  .attr("y", height*0.98)
    //                  .text("Click on country to zoom. Click on background to reset view.")
    //                  .attr("font-family", "sans-serif")
    //                  .attr("font-size", "0.7em")
    //                  .attr("fill", "black");

    function update_map(map_choice) {

        //  svg.selectAll("*").remove();

        var adv_map = map_choice == 'adv';

        var colorArray = ["#d7191c", "#2c7bb6", "#fdae61", "#F2F27A", "#e9e9e9"];

        var color = d3.scaleOrdinal().domain(["Negative", "Positive", "Unsure", "Both", "N/A"]).range(colorArray);

        queue().defer(d3.json, "https://raw.githubusercontent.com/dashee87/dashee87.github.io/master/_includes/world_topo.json")
        // .defer(d3.tsv, "./assets/world_trump7.tsv")
        .defer(d3.csv, "./assets/world_trump1.csv").await(ready);

        function ready(error, data, country_info) {
            if (error) throw error;
            var byCountries = {},
                byYear = {},
                byComments = {},
                byQuotes = {};

            country_info.forEach(function (d) {

                byCountries[d.countryCode] = d.country;
                byYear[d.countryCode] = d.year;
                byComments[d.countryCode] = d.comments;
                byQuotes[d.countryCode] = d.quotes;
                // ByRank[d.countryID] = parseInt(d.home_adv_rank) + 1;
                // ByLeague[d.countryCode] = d.league;
            });

            data.objects.countries.geometries.forEach(function (d) {
                if (typeof byYear[d.properties.countryCode] == 'undefined') {
                    // alert(d.properties.countryCode);
                    byYear[d.properties.countryCode] = "";
                    byComments[d.properties.countryCode] = "N/A";
                    byQuotes[d.properties.countryCode] = "No public comment";
                    // ByLeague[d.properties.countryCode] = "N/A";
                }
                // d.avg_goals = byYear[d.properties.countryCode];
            });

            d3.selectAll(".countries").remove();

            g.append("g").attr("class", "countries").selectAll("path").data(topojson.feature(data, data.objects.countries).features).enter().append("path").attr("d", path).style("fill", null).style("fill", function (d) {
                return color(byComments[d.properties.countryCode]);
            }).style('stroke', 'black').style('stroke-width', 1.5).style("opacity", 0.8)
            // tooltips
            .style("stroke", "white").style('stroke-width', 0.3)
            // displayInst(d);
            // .on("click", clicked)
            .text(function (d) {
                displayInst(d);
            }).on('mouseover', function (d) {

                // displayInst(d);
                //
                // tip.html(function(d) {
                //
                //
                // 					// return "<strong>Country: </strong><span class='details'>" + d.properties.country  + "<br></span>" + "<strong>Year: </strong><span class='details'>" + byYear[d.properties.countryCode] + "<br></span>" + "<strong>Quotes: </strong><span class='details'>" + byQuotes[d.properties.countryCode] + "</span>" ;
                // 					return "<span class='details'>" + d.properties.country  + "<br><br></span>" + "<span class='detailsQuotes'>" + byQuotes[d.properties.countryCode] + "<br><br></span>" + "<span class='detailsYear'>" + byYear[d.properties.countryCode] + "</span>" ;
                //
                //   })
                // .show(d);

                d3.select(this).style("opacity", 1).style("stroke", "black").style("stroke-width", 1.2 / parseFloat(Math.pow(s, 1.2)));
                // .style("stroke-width", 4.0 / parseFloat(Math.pow(s, 1.6)));
            }).on('click', function (d) {
                hideInst(d);
                displayData(d);
            }).on('mouseout', function (d) {
                // tip.hide(d);

                // hideData();

                d3.select(this).style("opacity", 0.8).style("stroke", "white").style("stroke-width", 0.3);
            });

            svg.append("path").datum(topojson.mesh(data, data.objects.countries.geometries, function (a, b) {
                return a !== b;
            }))
            // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
            .attr("class", "names").attr("d", path);

            function displayInst(d) {
                d3.select("#instructions").text("Hover over and click the countries to see what Trump said about them.");
            }
            function hideInst(d) {
                d3.select("#instructions").text("");
            }
            function displayData(d) {
                d3.select("#country").text(d.properties.country);

                d3.select("#quote").html(byQuotes[d.properties.countryCode]);

                d3.select("#year").text(byYear[d.properties.countryCode]);
            }

            function hideData() {
                d3.select("#country").text("");

                d3.select("#quote").html("");

                d3.select("#year").text("");
            }
        }
    }

    d3.select("#zoom_in").on("click", function () {
        mapZoom.scaleBy(svg.transition().duration(500), 1.5);
    });

    d3.select("#zoom_out").on("click", function () {
        mapZoom.scaleBy(svg.transition().duration(500), 0.7);
    });

    update_map("adv");
    // // run code
    // init();

};

exports.default = mainGraphic;

/***/ })
/******/ ]);