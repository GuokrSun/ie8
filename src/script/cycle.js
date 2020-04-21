(function($) {
	$.fn.svgCircle = function(i) {
		i = $.extend({
			parent: null,
			w: 75,
			R: 30,
			sW: 20,
			color: ["#000", "#000"],
			perent: [180, 180],
			speed: 0,
			delay: 1000
		}, i);
		return this.each(function() {
			var e = i.parent;
			if (!e) return false;
			var w = i.w;
			var r = Raphael(e, w, w),
				R = i.R,
				init = true,
				param = {
					stroke: "#0088cc"
				},
				hash = document.location.hash,
				marksAttr = {
					fill: hash || "#444",
					stroke: "none"
				};
			r.customAttributes.arc = function(b, c, R) {
				var d = 360 / c * b,
					a = (90 - d) * Math.PI / 180,
					x = w / 2 + R * Math.cos(a),
					y = w / 2 - R * Math.sin(a),
					color = i.color,
					path;
				if (c == b) {
					path = [
						["M", w / 2, w / 2 - R],
						["A", R, R, 0, 1, 1, w / 2 - 0.01, w / 2 - R]
					]
				} else {
					path = [
						["M", w / 2, w / 2 - R],
						["A", R, R, 0, +(d > 180), 1, x, y]
					]
				}
				return {
					path: path
				}
			};
			var f = r.path().attr({
				stroke: "#2AB1E9",
				"stroke-width": i.sW
			}).attr({
				arc: [180, 180, R]
			});
			var g = r.path().attr({
				stroke: "#ff0000",
				"stroke-width": i.sW
			}).attr(param).attr({
				arc: [0.01, i.speed, R]
			});
			var h;
			if (i.perent[1] > 0) {
				setTimeout(function() {
					g.animate({
						stroke: i.color[1],
						arc: [i.perent[1], 100, R]
					}, 900, ">")
				}, i.delay)
			} else {
				g.hide()
			}
		})
	}
})(jQuery);
$(function() {
	var c = $('#processingbar');
	animateEle();
	$(window).scroll(function() {
		animateEle()
	});

	function animateEle() {
		var b = {
			top: $(window).scrollTop(),
			bottom: $(window).scrollTop() + $(window).height()
		};
		c.each(function() {
			if (b.top <= $(this).offset().top && b.bottom >= $(this).offset().top && !$(this).data('bPlay')) {
				$(this).data('bPlay', true);
				var a = $(this).attr('val').replace(/\%/, '');
				if ($(this).attr("val") !== "0%") {
					$(this).svgCircle({
						parent: $(this)[0],
						w: 180,
						R: 80,
						sW: 6,
						color: ["#4D555A", "#4D555A", "#4D555A"],
						perent: [100, a],
						speed: 150,
						delay: 400
					})
				}
				if ($(this).attr("font") == "0%") {
					$(this).svgCircle({
						parent: $(this)[0],
						w: 180,
						R: 47,
						sW: 6,
						color: ["#d1d1d1", "#d1d1d1", "#d1d1d1"],
						perent: [100, a],
						speed: 150,
						delay: 400
					})
				}
			}
		})
	}
});