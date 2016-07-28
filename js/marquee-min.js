(function (a) {
    a.fn.kxbdSuperMarquee = function (b) {
        var c = a.extend({}, a.fn.kxbdSuperMarquee.defaults, b);
        return this.each(function () {
            var K = a(this);
            var r = K.get(0);
            var A = K.width();
            var g = K.height();
            var v = K.children();
            var G = v.children();
            var h = 0;
            var F = (c.direction == "left" || c.direction == "right") ? 1 : 0;
            var w, f, y, l;
            var s, L, J, I, H;
            var k, M;
            var z, N;
            var B = [];
            var n = 0;
            var u = 0;
            var o = 0;
            v.css(F ? "width" : "height", 10000);
            var E = "<ul>";
            if (c.isEqual) {
                k = G[F ? "outerWidth" : "outerHeight"]();
                M = G.length;
                h = k * M;
                for (var D = 0; D < M; D++) {
                    B.push(D * k);
                    E += "<li>" + (D + 1) + "</li>"
                }
            } else {
                G.each(function (d) {
                    B.push(h);
                    h += a(this)[F ? "outerWidth" : "outerHeight"]();
                    E += "<li>" + (d + 1) + "</li>"
                })
            }
            E += "</ul>";
            if (h < (F ? A : g)) {
                return
            }
            v.append(G.clone()).css(F ? "width" : "height", h * 2);
            if (c.navId) {
                z = a(c.navId).append(E).hover(x, m);
                N = a("li", z);
                N.each(function (d) {
                    a(this).bind(c.eventNav, function () {
                        if (y) {
                            return
                        }
                        if (n == d) {
                            return
                        }
                        j(B[d]);
                        N.eq(n).removeClass("navOn");
                        n = d;
                        a(this).addClass("navOn")
                    })
                });
                N.eq(n).addClass("navOn")
            }
            if (c.direction == "right" || c.direction == "down") {
                r[F ? "scrollLeft" : "scrollTop"] = h
            } else {
                r[F ? "scrollLeft" : "scrollTop"] = 0
            }
            if (c.isMarquee) {
                l = setTimeout(C, c.scrollDelay);
                K.hover(function () {
                    clearInterval(l)
                }, function () {
                    clearInterval(l);
                    l = setTimeout(C, c.scrollDelay)
                });
                if (c.controlBtn) {
                    a.each(c.controlBtn, function (d, e) {
                        a(e).bind(c.eventA, function () {
                            c.direction = d;
                            c.oldAmount = c.scrollAmount;
                            c.scrollAmount = c.newAmount
                        }).bind(c.eventB, function () {
                            c.scrollAmount = c.oldAmount
                        })
                    })
                }
            } else {
                if (c.isAuto) {
                    m();
                    K.hover(x, m)
                }
                if (c.btnGo) {
                    a.each(c.btnGo, function (d, e) {
                        a(e).bind(c.eventGo, function () {
                            if (y == true) {
                                return
                            }
                            c.direction = d;
                            j();
                            if (c.isAuto) {
                                x();
                                m()
                            }
                        })
                    })
                }
            }
            function C() {
                var e = (c.direction == "left" || c.direction == "right") ? "scrollLeft" : "scrollTop";
                if (c.isMarquee) {
                    if (c.loop > 0) {
                        o += c.scrollAmount;
                        if (o > h * c.loop) {
                            r[e] = 0;
                            return clearInterval(l)
                        }
                    }
                    var d = r[e] + (c.direction == "left" || c.direction == "up" ? 1 : -1) * c.scrollAmount
                } else {
                    if (c.duration) {
                        if (s++ < I) {
                            y = true;
                            var d = Math.ceil(q(s, L, J, I));
                            if (s == I) {
                                d = H
                            }
                        } else {
                            d = H;
                            clearInterval(w);
                            y = false;
                            return
                        }
                    } else {
                        var d = H;
                        clearInterval(w)
                    }
                }
                if (c.direction == "left" || c.direction == "up") {
                    if (d >= h) {
                        d -= h
                    }
                } else {
                    if (d <= 0) {
                        d += h
                    }
                }
                r[e] = d;
                if (c.isMarquee) {
                    l = setTimeout(C, c.scrollDelay)
                } else {
                    if (s < I) {
                        if (w) {
                            clearTimeout(w)
                        }
                        w = setTimeout(C, c.scrollDelay)
                    } else {
                        y = false
                    }
                }
            }

            function j(i) {
                y = true;
                var t = (c.direction == "left" || c.direction == "right") ? "scrollLeft" : "scrollTop";
                var e = c.direction == "left" || c.direction == "up" ? 1 : -1;
                u = u + e;
                if (i == undefined && c.navId) {
                    N.eq(n).removeClass("navOn");
                    n += e;
                    if (n >= M) {
                        n = 0
                    } else {
                        if (n < 0) {
                            n = M - 1
                        }
                    }
                    N.eq(n).addClass("navOn");
                    u = n
                }
                var d = u < 0 ? h : 0;
                s = 0;
                L = r[t];
                H = (i != undefined) ? i : d + (c.distance * u) % h;
                if (e == 1) {
                    if (H > L) {
                        J = H - L
                    } else {
                        J = H + h - L
                    }
                } else {
                    if (H > L) {
                        J = H - h - L
                    } else {
                        J = H - L
                    }
                }
                I = c.duration;
                if (w) {
                    clearTimeout(w)
                }
                w = setTimeout(C, c.scrollDelay)
            }

            function m() {
                f = setInterval(function () {
                    j()
                }, c.time * 1000)
            }

            function x() {
                clearInterval(f)
            }

            function q(i, e, P, O) {
                return -P * (i /= O) * (i - 2) + e
            }

            function p(i, e, P, O) {
                return P * ((i = i / O - 1) * i * i * i * i + 1) + e
            }
        })
    };
    a.fn.kxbdSuperMarquee.defaults = {
        isMarquee: false,
        isEqual: true,
        loop: 0,
        newAmount: 3,
        eventA: "mousedown",
        eventB: "mouseup",
        isAuto: true,
        time: 5,
        duration: 50,
        eventGo: "click",
        direction: "left",
        scrollAmount: 1,
        scrollDelay: 10,
        eventNav: "click"
    };
    a.fn.kxbdSuperMarquee.setDefaults = function (b) {
        a.extend(a.fn.kxbdSuperMarquee.defaults, b)
    }
})(jQuery);

