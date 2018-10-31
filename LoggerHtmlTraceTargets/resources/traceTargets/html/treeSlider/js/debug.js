/*! file => jquery-1.7.2.min.js */
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement)cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)for (h in a.converters)typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*")k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g)i in d && (c[g[i]] = d[i]);
        while (f[0] === "*")f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)for (i in e)if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0]in d)j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b))f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        }); else if (!c && f.type(b) === "object")for (var e in b)b_(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++)l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++)h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? 1 : 0, g = 4;
        if (d > 0) {
            if (c !== "border")for (; e < g; e += 2)c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null)d = a.style[b];
        if (bt.test(d))return d;
        d = parseFloat(d) || 0;
        if (c)for (; e < g; e += 2)d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio")a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)for (d = 0, e = i[c].length; d < e; d++)f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement)while (b.length)c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b))return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType)return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b))return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b]))continue;
            if (b !== "toJSON")return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++)b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
            return new e.fn.init(a, b, h)
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
            return (b + "").toUpperCase()
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {
            constructor: e, init: function (a, d, f) {
                var g, h, j, k;
                if (!a)return this;
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2])return f.find(a);
                            this.length = 1, this[0] = h
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a))return f.ready(a);
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this)
            }, selector: "", jquery: "1.7.2", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return F.call(this, 0)
            }, get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            }, pushStack: function (a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            }, each: function (a, b) {
                return e.each(this, a, b)
            }, ready: function (a) {
                e.bindReady(), A.add(a);
                return this
            }, eq: function (a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: E, sort: [].sort, splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++)if ((a = arguments[j]) != null)for (c in a) {
                d = i[c], f = a[c];
                if (i === f)continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({
            noConflict: function (b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body)return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0)return;
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete")return setTimeout(e.ready, 1);
                    if (c.addEventListener)c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {
                        }
                        c.documentElement.doScroll && b && J()
                    }
                }
            }, isFunction: function (a) {
                return e.type(a) === "function"
            }, isArray: Array.isArray || function (a) {
                return e.type(a) === "array"
            }, isWindow: function (a) {
                return a != null && a == a.window
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a);
                return d === b || D.call(a, d)
            }, isEmptyObject: function (a) {
                for (var b in a)return !1;
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                if (typeof b != "string" || !b)return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse)return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))return (new Function("return " + b))();
                e.error("Invalid JSON: " + b)
            }, parseXML: function (c) {
                if (typeof c != "string" || !c)return null;
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            }, noop: function () {
            }, globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a)if (c.apply(a[f], d) === !1)break
                    } else for (; g < h;)if (c.apply(a[g++], d) === !1)break
                } else if (i) {
                    for (f in a)if (c.call(a[f], f, a[f]) === !1)break
                } else for (; g < h;)if (c.call(a[g], g, a[g++]) === !1)break;
                return a
            }, trim: G ? function (a) {
                return a == null ? "" : G.call(a)
            } : function (a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H)return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)if (c in b && b[c] === a)return c
                }
                return -1
            }, merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number")for (var f = c.length; e < f; e++)a[d++] = c[e]; else while (c[e] !== b)a[d++] = c[e++];
                a.length = d;
                return a
            }, grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++)e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d
            }, map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k)for (; i < j; i++)f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a)f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d
                }
                if (!e.isFunction(a))return b;
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            }, access: function (a, c, d, f, g, h, i) {
                var j, k = d == null, l = 0, m = a.length;
                if (d && typeof d == "object") {
                    for (l in d)e.access(a, c, l, d[l], 1, h, f);
                    g = 1
                } else if (f !== b) {
                    j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                        return j.call(e(a), c)
                    }) : (c.call(a, f), c = null));
                    if (c)for (; l < m; l++)c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                    g = 1
                }
                return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            }, browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++)g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
            for (; c && m < l; m++)if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
        }, p = {
            add: function () {
                if (c) {
                    var a = c.length;
                    n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                }
                return this
            }, remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++)for (var f = 0; f < c.length; f++)if (b[d] === c[f]) {
                        j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                        if (a.unique)break
                    }
                }
                return this
            }, has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++)if (a === c[b])return !0
                }
                return !1
            }, empty: function () {
                c = [];
                return this
            }, disable: function () {
                c = d = e = b;
                return this
            }, disabled: function () {
                return !c
            }, lock: function () {
                d = b, (!e || e === !0) && p.disable();
                return this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                return this
            }, fire: function () {
                p.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!i
            }
        };
        return p
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add, fail: c.add, progress: d.add, state: function () {
                    return e
                }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                    i.done(a).fail(b).progress(c);
                    return this
                }, always: function () {
                    i.done.apply(i, arguments).fail.apply(i, arguments);
                    return this
                }, pipe: function (a, b, c) {
                    return f.Deferred(function (d) {
                        f.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function () {
                                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                            }) : i[a](d[e])
                        })
                    }).promise()
                }, promise: function (a) {
                    if (a == null)a = h; else for (var b in h)a[b] = h[b];
                    return a
                }
            }, i = h.promise({}), j;
            for (j in g)i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        }, when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++)b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e)return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)for (n in{
            submit: 1,
            change: 1,
            focusin: 1
        })m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function")e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c])return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k])return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++)delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d))return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k]))return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b)return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h, i, j = this[0], k = 0, m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++)h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0)
                    }
                }
                return m
            }
            if (typeof a == "object")return this.each(function () {
                f.data(this, a)
            });
            d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
            return f.access(this, function (c) {
                if (c === b) {
                    m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                    return m === b && d[1] ? this.data(d[0]) : m
                }
                d[1] = c, this.each(function () {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                })
            }, null, c, arguments.length > 1, null, !1)
        }, removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        }, _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            var d = 2;
            typeof a != "string" && (c = a, a = "fx", d--);
            if (arguments.length < d)return f.queue(this[0], a);
            return c === b ? this : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        }, delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }

            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--)if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))h++, l.add(m);
            m();
            return d.promise(c)
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a))return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)if (!e.className && b.length === 1)e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++)~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g)
                    }
                }
            }
            return this
        }, removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a))return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++)h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h)
                    } else g.className = ""
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a))return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++])i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean")this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        }, hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++)if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)return !0;
            return !1
        }, val: function (a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set"in c) || c.set(this, h, "value") === b)this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                    if (c && "get"in c && (d = c.get(g, "value")) !== b)return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0)return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j)return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length)return f(i[g]).val();
                    return h
                }, set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn)return f(a)[c](d);
                if (typeof a.getAttribute == "undefined")return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set"in h && i && (g = h.set(a, d, c)) !== b)return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get"in h && i && (g = h.get(a, c)) !== null)return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; i < g; i++)e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode)f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            }, value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button"))return w.get(a, b);
                    return b in a ? a.value : null
                }, set: function (a, b, c) {
                    if (w && f.nodeName(a, "button"))return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set"in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get"in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {name: !0, id: !0, coords: !0}, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        }, set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get, set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b))return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /(?:^|\s)hover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b
    }, H = function (a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }, I = function (a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
    };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: g && G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1)a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o)f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++)s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered))return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h])return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j)j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1)return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode)r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++)m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
            g[0] = c, c.delegateTarget = this;
            if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                if (e && (!c.button || c.type !== "click")) {
                    n = f(this), n.context = this.ownerDocument || this;
                    for (m = c.target; m != this; m = m.parentNode || this)if (m.disabled !== !0) {
                        p = {}, r = [], n[0] = m;
                        for (k = 0; k < e; k++)s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                        r.length && j.push({elem: m, matches: r})
                    }
                }
                d.length > e && j.push({elem: this, matches: d.slice(e)});
                for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                    q = j[k], c.currentTarget = q.elem;
                    for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                        s = q.matches[l];
                        if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
                i.postDispatch && i.postDispatch.call(this, c);
                return c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando])return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;)e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {setup: f.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event))return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
    }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d))a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form"))return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), d._submit_attached = !0)
            })
        }, postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
        }, teardown: function () {
            if (f.nodeName(this, "form"))return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio")f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        }, handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")return a.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            }, teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (i in a)this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1)e = J; else if (!e)return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        }, off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a)this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function")d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        }, die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0])return f.event.trigger(a, b, this[0], !0)
        }, toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length)b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9)return [];
            if (!b || typeof b != "string")return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))if (w.length === 2 && o.relative[w[0]])j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length)b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length)q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")if (!u)e.push.apply(e, k); else if (d && d.nodeType === 1)for (t = 0; k[t] != null; t++)k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++)k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)for (var b = 1; b < a.length; b++)a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a)return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\")continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f)g = i = !0; else if (f === !0)continue
                    }
                    if (f)for (n = 0; (j = s[n]) != null; n++)j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g)return [];
                        break
                    }
                }
                if (a === q)if (g == null)m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string")return a.textContent;
                    if (typeof a.innerText == "string")return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)e += n(a)
                } else if (d === 3 || d === 4)return a.nodeValue
            } else for (b = 0; c = a[b]; b++)c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++)if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1);
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                    }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++)c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                }, "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                }, "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++)d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                }, TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined")return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f)return a;
                    for (var g = 0, h; (h = b[g]) != null; g++)h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                }, PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not")if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        d || e.push.apply(e, g);
                        return !1
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))return !0;
                    return b
                }, POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                }, radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                }, checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                }, file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                }, password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                }, image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f)return f(a, c, b, d);
                    if (e === "contains")return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++)if (g[h] === a)return !1;
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            while (l = l.previousSibling)if (l.nodeType === 1)return !1;
                            if (k === "first")return !0;
                            l = a;
                        case"last":
                            while (l = l.nextSibling)if (l.nodeType === 1)return !1;
                            return !0;
                        case"nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0)return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling)l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f)return f(a, c, b, d)
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match)o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]")Array.prototype.push.apply(d, a); else if (typeof a.length == "number")for (var e = a.length; c < e; c++)d.push(a[c]); else for (; a[c]; c++)d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i)return v(a, b);
            if (!g)return -1;
            if (!i)return 1;
            while (j)e.unshift(j), j = j.parentNode;
            j = i;
            while (j)f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)if (e[k] !== f[k])return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b)return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1])return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body)return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode)return s([], f);
                                if (i.id === h[3])return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p)return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a)m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a))try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11)return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a))f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.globalPOS, R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string")return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++)if (f.contains(b[c], this))return !0
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)for (h = g; h < e.length; h++)for (i = 0; i < g; i++)if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break
                }
            }
            return e
        }, has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++)if (f.contains(this, b[a]))return !0
            })
        }, not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++)f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11)break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        }, index: function (a) {
            if (!a)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string")return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return f.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        }, next: function (a) {
            return f.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return f.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return f.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return f.sibling(a.firstChild)
        }, contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        }, dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))g.nodeType === 1 && e.push(g), g = g[c];
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])if (a.nodeType === 1 && ++e === b)break;
            return a
        }, sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.access(this, function (a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        }, wrapAll: function (a) {
            if (f.isFunction(a))return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (f.isFunction(a))return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f
                    .clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        }, remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++)if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild)b.removeChild(b.firstChild)
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        }, html: function (a) {
            return f.access(this, function (a) {
                var c = this[0] || {}, d = 0, e = this.length;
                if (a === b)return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++)c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (g) {
                    }
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a))return this.each(function (b) {
                    var c = f(this), d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j))return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++)d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function (a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g)e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g)bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        }, clean: function (a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l; (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l)continue;
                if (typeof l == "string")if (!_.test(l))l = b.createTextNode(l); else {
                    l = l.replace(Y, "<$1></$2>");
                    var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
                    b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                    while (o--)p = p.lastChild;
                    if (!f.support.tbody) {
                        var s = $.test(l), t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                        for (i = t.length - 1; i >= 0; --i)f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                    }
                    !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                }
                var u;
                if (!f.support.appendChecked)if (l[0] && typeof (u = l.length) == "number")for (i = 0; i < u; i++)bn(l[i]); else bn(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))e.push(h.parentNode ? h.parentNode.removeChild(h) : h); else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
                }
            }
            return j
        }, cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()])continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events)e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get"in k && (g = k.get(a, !1, e)) !== b)return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d))return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set"in k) || (d = k.set(a, d)) !== b)try {
                    j[c] = d
                } catch (l) {
                }
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get"in g && (e = g.get(a, !0, d)) !== b)return e;
            if (by)return by(a, c)
        },
        swap: function (a, b, c) {
            var d = {}, e, f;
            for (f in b)d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b)a.style[f] = d[f];
            return e
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                if (c)return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                    return bB(a, b, d)
                })
            }, set: function (a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter)return
            }
            c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                return f.swap(a, {display: "inline-block"}, function () {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    }), f.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        f.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++)f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bR)return bR.apply(this, arguments);
            if (!this.length)return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        }, serialize: function () {
            return f.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {name: b.name, value: a.replace(bE, "\r\n")}
                }) : {name: b.name, value: c.replace(bE, "\r\n")}
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
            return a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified"))f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag"))f.etag[k] = z
                        }
                        if (a === 304)w = "notmodified", o = !0; else try {
                            r = cb(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a)w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }

            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function (a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a, l[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function () {
                    return s === 2 ? n : null
                },
                getResponseHeader: function (a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = bG.exec(n))o[c[1].toLowerCase()] = c[2]
                        }
                        c = o[a.toLowerCase()]
                    }
                    return c === b ? null : c
                },
                overrideMimeType: function (a) {
                    s || (d.mimeType = a);
                    return this
                },
                abort: function (a) {
                    a = a || "abort", p && p.abort(a), w(0, a);
                    return this
                }
            };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2)for (b in a)j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
            if (s === 2)return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bP, "$1_=" + x);
                    d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers)v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in{success: 1, error: 1, complete: 1})v[u](d[u]);
            p = bZ(bT, d, c, v);
            if (!p)w(-1, "No Transport"); else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2)w(-1, z); else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a))f.each(a, function () {
                e(this.name, this.value)
            }); else for (var g in a)b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }), f.extend({active: 0, lastModified: {}, etag: {}});
    var cc = f.now(), cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return f.expando + "_" + cc++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState))d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                }, abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ce = a.ActiveXObject ? function () {
        for (var a in cg)cg[a](0, 1)
    } : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ch() || ci()
    } : ch, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)for (j in c.xhrFields)h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e)h.setRequestHeader(j, e[j])
                    } catch (k) {
                    }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                                if (e)h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                    try {
                                        m.text = h.responseText
                                    } catch (a) {
                                    }
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cq;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0)return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++)d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none")d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        }, hide: function (a, b, c) {
            if (a || a === 0)return this.animate(ct("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++)d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++)this[g].style && (this[g].style.display = "none");
            return this
        }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c);
            return this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand"in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l)i in a || (a[i] = l[i])
                    }
                }
                for (g in a) {
                    h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d)return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a)j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }

            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a))return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        }, stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }

                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)for (b in g)g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;)e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0)d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        }, easing: {
            linear: function (a) {
                return a
            }, swing: function (a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        }, custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }

            var e = this, g = f.fx;
            this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        }, show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties)i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)for (b in i.animatedProperties)f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(co), co = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect"in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {
        }
        if (!d || !f.contains(c, a))return d ? {top: d.top, left: d.left} : {top: 0, left: 0};
        var g = b.body, h = cy(b), i = c.clientTop || g.clientTop || 0, j = c.clientLeft || g.clientLeft || 0, k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop, l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft, m = d.top + k - i, n = d.left + l - j;
        return {top: m, left: n}
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed")break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static")k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return {top: k, left: l}
    }, f.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0], d = c && c.ownerDocument;
        if (!d)return null;
        if (c === d.body)return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {top: b, left: c}
        }, setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using"in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0])return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {top: c.top - d.top, left: c.left - d.left}
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")a = a.offsetParent;
                return a
            })
        }
    }), f.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b)return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({Height: "height", Width: "width"}, function (a, c) {
        var d = "client" + a, e = "scroll" + a, g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e])return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);

/*! file => jquery.cookie.js */
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/*! file => jquery.ddslick.js */
//Title: Custom DropDown plugin by PC
//Documentation: http://designwithpc.com/Plugins/ddslick
//Author: PC 
//Website: http://designwithpc.com
//Twitter: http://twitter.com/chaudharyp
(function ($) {
    $.fn.ddslick = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exists.');
        }
    };

    var methods = {},

    //Set defauls for the control
        defaults = {
            data: [],
            keepJSONItemsOnTop: false,
            width: 247,
            height: null,
            background: "",
            selectText: "",
            defaultSelectedIndex: null,
            truncateDescription: true,
            imagePosition: "left",
            showSelectedHTML: false,
            clickOffToClose: true,
            indexForPPItem: [5, 4, 3, 2, 1, 0],
            onSelected: function () {
            }
        },

        ddSelectHtml = '<div class="dd-select unselectable"><input class="dd-selected-value" id="quick_buy_selected" type="hidden" /><span class="dd-selected"></span><a class="dd-pointer dd-pointer-down"></a></div>',
        ddOptionsHtml = '<ul class="dd-options"></ul>';
    //Public methods
    methods.init = function (options) {
        //Preserve the original defaults by passing an empty object as the target
        var options = $.extend({}, defaults, options);

        //Apply on all selected elements
        return this.each(function () {
            var obj = $(this), data = obj.data('ddslick');
            //If the plugin has not been initialized yet
            if (!data) {
                var ddSelect = [], ddJson = options.data;
                //Get data from HTML select options
                obj.find('option').each(function () {
                    var $this = $(this), thisData = $this.data();
                    ddSelect.push({
                        text: $.trim($this.text()),
                        value: $this.val(),
                        selected: $this.is(':selected'),
                        description: thisData.description,
                        imageSrc: thisData.imagesrc //keep it lowercase for HTML5 data-attributes
                    });
                });

                //Update Plugin data merging both HTML select data and JSON data for the dropdown
                if (options.keepJSONItemsOnTop)
                    $.merge(options.data, ddSelect);
                else options.data = $.merge(ddSelect, options.data);

                //Replace HTML select with empty placeholder, keep the original
                var original = obj, placeholder = $('<div id="' + obj.attr('id') + '"></div>');
                obj.replaceWith(placeholder);
                obj = placeholder;

                //Add classes and append ddSelectHtml & ddOptionsHtml to the container
                obj.addClass('dd-container').append(ddSelectHtml).append(ddOptionsHtml);

                //Get newly created ddOptions and ddSelect to manipulate
                var ddSelect = obj.find('.dd-select'),
                    ddOptions = obj.find('.dd-options');

                //Set widths
                ddOptions.css({width: options.width});
                ddSelect.css({width: options.width});
                obj.css({width: options.width});

                //Set height
                if (options.height != null)
                    ddOptions.css({height: options.height, overflow: 'auto'});

                var index_for_pp_item = [5, 4, 3, 2, 1, 0];
                //Add ddOptions to the container. Replace with template engine later.
                $.each(options.data, function (index, item) {
                    if (item.selected) options.defaultSelectedIndex = index;
                    ddOptions.append('<li>' +
                    '<a class="dd-option">' +
                    (item.value ? ' <input id="qb_opt' + options.indexForPPItem[index] + '" class="dd-option-value" type="hidden" value="' + item.value + '" />' : '') +
                    (item.imageSrc ? ' <img class="dd-option-image' + (options.imagePosition == "right" ? ' dd-image-right' : '') + '" src="' + item.imageSrc + '" />' : '') +
                    (item.text ? ' <label id="qb_opt' + options.indexForPPItem[index] + '_text" class="dd-option-text">' + item.text + '</label>' : '') +
                    (item.description ? ' <small class="dd-option-description dd-desc">' + item.description + '</small>' : '') +
                    '</a>' +
                    '</li>');
                });

                //Save plugin data.
                var pluginData = {
                    settings: options,
                    original: original,
                    selectedIndex: -1,
                    selectedItem: null,
                    selectedData: null
                };
                obj.data('ddslick', pluginData);

                //Check if needs to show the select text, otherwise show selected or default selection
                if (options.selectText.length > 0 && options.defaultSelectedIndex == null) {
                    obj.find('.dd-selected').html(options.selectText);
                }
                else {
                    var index = (options.defaultSelectedIndex != null && options.defaultSelectedIndex >= 0 && options.defaultSelectedIndex < options.data.length)
                        ? options.defaultSelectedIndex
                        : 0;
                    selectIndex(obj, index, false);
                }

                //EVENTS
                //Displaying options
                obj.find('.dd-pointer').on('click.ddslick', function () {
                    open(obj);
                });

                //Selecting an option
                obj.find('.dd-option').on('click.ddslick', function () {
                    selectIndex(obj, $(this).closest('li').index(), true);
                });

                //Click anywhere to close
                if (options.clickOffToClose) {
                    ddOptions.addClass('dd-click-off-close');
                    obj.on('click.ddslick', function (e) {
                        e.stopPropagation();
                    });
                    $('body').on('click', function () {
                        if ($(".dd-options").css("display") != 'none') {
                            $('.dd-click-off-close').slideUp(50, function () {
                                if ($("div#pp_maintenance").hasClass("hidden_element") && $("div#paypage_con").hasClass("hidden_element") && $("div#mobile_con").hasClass("hidden_element")) {
                                    hideFlashScreenshot(false);
                                }
                            }).siblings('.dd-select').find('.dd-pointer').removeClass('dd-pointer-up');
                            if (getGameSwf().sendPayPageClose) {
                                initCurrentPaypageFlow("buy_QB");
                                paypageTrackObject.transactionFlow = "buy_QB";
                                setTrackingFunnelID();
                                getGameSwf().sendPayPageClose(paypageTrackObject);
                            }
                        }
                    });
                }
            }
        });
    };

    //Public method to select an option by its index
    methods.select = function (options) {
        return this.each(function () {
            if (options.index)
                selectIndex($(this), options.index, true);
        });
    };

    //Public method to open drop down
    methods.open = function () {
        return this.each(function () {
            var $this = $(this),
                pluginData = $this.data('ddslick');

            //Check if plugin is initialized
            if (pluginData)
                open($this);
        });
    };

    //Public method to close drop down
    methods.close = function () {
        return this.each(function () {
            var $this = $(this),
                pluginData = $this.data('ddslick');

            //Check if plugin is initialized
            if (pluginData)
                close($this);
        });
    };

    //Public method to update options data.
    methods.update_options = function (data) {
        return this.each(function () {
            var $this = $(this),
                pluginData = $this.data('ddslick');

            //Check if plugin is initialized
            if (typeof data == 'object')
                updateOptions($(this), data);
        });
    };

    //Private: Select index
    function selectIndex(obj, index, buyOnSelect) {
        //Get plugin data
        var pluginData = obj.data('ddslick');

        //Get required elements
        var ddSelected = obj.find('.dd-selected'),
            ddSelectedValue = ddSelected.siblings('.dd-selected-value'),
            ddOptions = obj.find('.dd-options'),
            ddPointer = ddSelected.siblings('.dd-pointer'),
            selectedOption = obj.find('.dd-option').eq(index),
            selectedLiItem = selectedOption.closest('li'),
            settings = pluginData.settings,
            selectedData = pluginData.settings.data[index];

        //Highlight selected option
        obj.find('.dd-option').removeClass('dd-option-selected');
        selectedOption.addClass('dd-option-selected');

        //Update or Set plugin data with new selection
        pluginData.selectedIndex = index;
        pluginData.selectedItem = selectedLiItem;
        pluginData.selectedData = selectedData;

        //If set to display to full html, add html
        if (settings.showSelectedHTML) {
            ddSelected.html(
                (selectedData.imageSrc ? '<img class="dd-selected-image' + (settings.imagePosition == "right" ? ' dd-image-right' : '') + '" src="' + selectedData.imageSrc + '" />' : '') +
                (selectedData.text ? '<label class="dd-selected-text" id="quick_buy_selected_text">' + selectedData.text + '</label>' : '') +
                (selectedData.description ? '<small class="dd-selected-description dd-desc' + (settings.truncateDescription ? ' dd-selected-description-truncated' : '') + '" >' + selectedData.description + '</small>' : '')
            );

        }
        //Else only display text as selection
        else {
            ddSelected.html((selectedData.text ? '<label class="dd-selected-text" id="quick_buy_selected_text">' + selectedData.text + '</label>' : ''));
        }

        //Updating selected option value
        ddSelectedValue.val(selectedData.value);

        //BONUS! Update the original element attribute with the new selection
        pluginData.original.val(selectedData.value);
        obj.data('ddslick', pluginData);

        //open FB Pay dialog on select
        if (buyOnSelect) {
            buyFromQB();
        }

        //Close options on selection
        close(obj, true);

        //Callback function on selection
        if (typeof settings.onSelected == 'function') {
            settings.onSelected.call(this, pluginData);
        }
    }

    //Private: Close the drop down options
    function open(obj) {

        var $this = obj.find('.dd-select'),
            ddOptions = $this.siblings('.dd-options'),
            ddPointer = $this.find('.dd-pointer'),
            wasOpen = ddOptions.is(':visible');

        //Close all open options (multiple plugins) on the page
        $('.dd-click-off-close').not(ddOptions).slideUp(50, function () {
            if ($(".dd-options").css("display") != 'none' && $("div#pp_maintenance").hasClass("hidden_element") && $("div#paypage_con").hasClass("hidden_element") && $("div#mobile_con").hasClass("hidden_element")) {
                hideFlashScreenshot(false);
            }
        });
        $('.dd-pointer').removeClass('dd-pointer-up');

        if (wasOpen) {
            ddOptions.slideUp('fast', function () {
                if ($("div#pp_maintenance").hasClass("hidden_element") && $("div#paypage_con").hasClass("hidden_element") && $("div#mobile_con").hasClass("hidden_element")) {
                    hideFlashScreenshot(false);
                }
            });
            ddPointer.removeClass('dd-pointer-up');
            trackQBElementSelect(false);
        } else {
            displayFlashScreenshot(true, 2);
            ddOptions.slideDown('fast');
            ddPointer.addClass('dd-pointer-up');
            trackQBElementSelect(true);
        }
    }

    //Private: Close the drop down options
    function close(obj, autoClose) {
        //Close drop down and adjust pointer direction
        if ($(".dd-options").css("display") != 'none') {
            obj.find('.dd-options').slideUp(50, function () {
                if ($("div#pp_maintenance").hasClass("hidden_element") && $("div#paypage_con").hasClass("hidden_element") && $("div#mobile_con").hasClass("hidden_element")) {
                    hideFlashScreenshot(false);
                }
            });
            trackQBElementSelect(false, autoClose);
        }
        obj.find('.dd-pointer').removeClass('dd-pointer-up').removeClass('dd-pointer-up');
    }

    //Private: Update Options Data
    function updateOptions(obj, data) {
        //Get plugin data
        var pluginData = obj.data('ddslick');
        pluginData.settings.data = data.opts;

        //Get required elements
        var ddSelected = obj.find('.dd-selected'),
            ddSelectedValue = ddSelected.siblings('.dd-selected-value'),
            settings = pluginData.settings;

        $.each(pluginData.settings.data, function (index, item) {
            obj.find("#qb_opt" + settings.indexForPPItem[index]).attr(item.value);
            obj.find("#qb_opt" + settings.indexForPPItem[index] + "_text").html(item.text);
            if (item.selected) {
                ddSelected.html('<label class="dd-selected-text" id="quick_buy_selected_text">' + item.text + '</label>');
                ddSelectedValue.val(item.value);
                pluginData.original.val(item.value);
            }
        });

        obj.data('ddslick', pluginData);
    }
})(jQuery);

/*! file => jquery.imagesloaded.min.js */
(function (c, q) {
    var m = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    c.fn.imagesLoaded = function (f) {
        function n() {
            var b = c(j), a = c(h);
            d && (h.length ? d.reject(e, b, a) : d.resolve(e));
            c.isFunction(f) && f.call(g, e, b, a)
        }

        function p(b) {
            k(b.target, "error" === b.type)
        }

        function k(b, a) {
            b.src === m || -1 !== c.inArray(b, l) || (l.push(b), a ? h.push(b) : j.push(b), c.data(b, "imagesLoaded", {
                isBroken: a,
                src: b.src
            }), r && d.notifyWith(c(b), [a, e, c(j), c(h)]), e.length === l.length && (setTimeout(n), e.unbind(".imagesLoaded",
                p)))
        }

        var g = this, d = c.isFunction(c.Deferred) ? c.Deferred() : 0, r = c.isFunction(d.notify), e = g.find("img").add(g.filter("img")), l = [], j = [], h = [];
        c.isPlainObject(f) && c.each(f, function (b, a) {
            if ("callback" === b)f = a; else if (d)d[b](a)
        });
        e.length ? e.bind("load.imagesLoaded error.imagesLoaded", p).each(function (b, a) {
            var d = a.src, e = c.data(a, "imagesLoaded");
            if (e && e.src === d)k(a, e.isBroken); else if (a.complete && a.naturalWidth !== q)k(a, 0 === a.naturalWidth || 0 === a.naturalHeight); else if (a.readyState || a.complete)a.src = m, a.src = d
        }) :
            n();
        return d ? d.promise(g) : g
    }
})(jQuery);

/*! file => jquery.form.js */
/*
 * jQuery Form Plugin
 * version: 2.01 (10/31/2007)
 * @requires jQuery v1.1 or later
 *
 * Examples at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
(function ($) {
    /**
     * ajaxSubmit() provides a mechanism for submitting an HTML form using AJAX.
     *
     * ajaxSubmit accepts a single argument which can be either a success callback function
     * or an options Object.  If a function is provided it will be invoked upon successful
     * completion of the submit and will be passed the response from the server.
     * If an options Object is provided, the following attributes are supported:
     *
     *  target:   Identifies the element(s) in the page to be updated with the server response.
     *            This value may be specified as a jQuery selection string, a jQuery object,
     *            or a DOM element.
     *            default value: null
     *
     *  url:      URL to which the form data will be submitted.
     *            default value: value of form's 'action' attribute
     *
     *  type:     The method in which the form data should be submitted, 'GET' or 'POST'.
     *            default value: value of form's 'method' attribute (or 'GET' if none found)
     *
     *  data:     Additional data to add to the request, specified as key/value pairs (see $.ajax).
     *
     *  beforeSubmit:  Callback method to be invoked before the form is submitted.
     *            default value: null
     *
     *  success:  Callback method to be invoked after the form has been successfully submitted
     *            and the response has been returned from the server
     *            default value: null
     *
     *  dataType: Expected dataType of the response.  One of: null, 'xml', 'script', or 'json'
     *            default value: null
     *
     *  semantic: Boolean flag indicating whether data must be submitted in semantic order (slower).
     *            default value: false
     *
     *  resetForm: Boolean flag indicating whether the form should be reset if the submit is successful
     *
     *  clearForm: Boolean flag indicating whether the form should be cleared if the submit is successful
     *
     *
     * The 'beforeSubmit' callback can be provided as a hook for running pre-submit logic or for
     * validating the form data.  If the 'beforeSubmit' callback returns false then the form will
     * not be submitted. The 'beforeSubmit' callback is invoked with three arguments: the form data
     * in array format, the jQuery object, and the options object passed into ajaxSubmit.
     * The form data array takes the following form:
     *
     *     [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * If a 'success' callback method is provided it is invoked after the response has been returned
     * from the server.  It is passed the responseText or responseXML value (depending on dataType).
     * See jQuery.ajax for further details.
     *
     *
     * The dataType option provides a means for specifying how the server response should be handled.
     * This maps directly to the jQuery.httpData method.  The following values are supported:
     *
     *      'xml':    if dataType == 'xml' the server response is treated as XML and the 'success'
     *                   callback method, if specified, will be passed the responseXML value
     *      'json':   if dataType == 'json' the server response will be evaluted and passed to
     *                   the 'success' callback, if specified
     *      'script': if dataType == 'script' the server response is evaluated in the global context
     *
     *
     * Note that it does not make sense to use both the 'target' and 'dataType' options.  If both
     * are provided the target will be ignored.
     *
     * The semantic argument can be used to force form serialization in semantic order.
     * This is normally true anyway, unless the form contains input elements of type='image'.
     * If your form must be submitted with name/value pairs in semantic order and your form
     * contains an input of type='image" then pass true for this arg, otherwise pass false
     * (or nothing) to avoid the overhead for this logic.
     *
     *
     * When used on its own, ajaxSubmit() is typically bound to a form's submit event like this:
     *
     * $("#form-id").submit(function() {
 *     $(this).ajaxSubmit(options);
 *     return false; // cancel conventional submit
 * });
     *
     * When using ajaxForm(), however, this is done for you.
     *
     * @example
     * $('#myForm').ajaxSubmit(function(data) {
 *     alert('Form submit succeeded! Server returned: ' + data);
 * });
     * @desc Submit form and alert server response
     *
     *
     * @example
     * var options = {
 *     target: '#myTargetDiv'
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc Submit form and update page element with server response
     *
     *
     * @example
     * var options = {
 *     success: function(responseText) {
 *         alert(responseText);
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc Submit form and alert the server response
     *
     *
     * @example
     * var options = {
 *     beforeSubmit: function(formArray, jqForm) {
 *         if (formArray.length == 0) {
 *             alert('Please enter data.');
 *             return false;
 *         }
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc Pre-submit validation which aborts the submit operation if form data is empty
     *
     *
     * @example
     * var options = {
 *     url: myJsonUrl.php,
 *     dataType: 'json',
 *     success: function(data) {
 *        // 'data' is an object representing the the evaluated json data
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc json data returned and evaluated
     *
     *
     * @example
     * var options = {
 *     url: myXmlUrl.php,
 *     dataType: 'xml',
 *     success: function(responseXML) {
 *        // responseXML is XML document object
 *        var data = $('myElement', responseXML).text();
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc XML data returned from server
     *
     *
     * @example
     * var options = {
 *     resetForm: true
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc submit form and reset it if successful
     *
     * @example
     * $('#myForm).submit(function() {
 *    $(this).ajaxSubmit();
 *    return false;
 * });
     * @desc Bind form's submit event to use ajaxSubmit
     *
     *
     * @name ajaxSubmit
     * @type jQuery
     * @param options  object literal containing options which control the form submission process
     * @cat Plugins/Form
     * @return jQuery
     */
    $.fn.ajaxSubmit = function (options) {
        if (typeof options == 'function')
            options = {success: options};

        options = $.extend({
            url: this.attr('action') || window.location.toString(),
            type: this.attr('method') || 'GET'
        }, options || {});

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        $.event.trigger('form.pre.serialize', [this, options, veto]);
        if (veto.veto) return this;

        var a = this.formToArray(options.semantic);
        if (options.data) {
            for (var n in options.data)
                a.push({name: n, value: options.data[n]});
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) return this;

        // fire vetoable 'validate' event
        $.event.trigger('form.submit.validate', [a, this, options, veto]);
        if (veto.veto) return this;

        var q = $.param(a);//.replace(/%20/g,'+');

        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;  // data is null for 'get'
        }
        else
            options.data = q; // data is the query string for 'post'

        var $form = this, callbacks = [];
        if (options.resetForm) callbacks.push(function () {
            $form.resetForm();
        });
        if (options.clearForm) callbacks.push(function () {
            $form.clearForm();
        });

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function () {
                };
            callbacks.push(function (data) {
                if (this.evalScripts)
                    $(options.target).attr("innerHTML", data).evalScripts().each(oldSuccess, arguments);
                else // jQuery v1.1.4
                    $(options.target).html(data).each(oldSuccess, arguments);
            });
        }
        else if (options.success)
            callbacks.push(options.success);

        options.success = function (data, status) {
            for (var i = 0, max = callbacks.length; i < max; i++)
                callbacks[i](data, status, $form);
        };

        // are there files to upload?
        var files = $('input:file', this).fieldValue();
        var found = false;
        for (var j = 0; j < files.length; j++)
            if (files[j])
                found = true;

        // options.iframe allows user to force iframe mode
        if (options.iframe || found) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if ($.browser.safari && options.closeKeepAlive)
                $.get(options.closeKeepAlive, fileUpload);
            else
                fileUpload();
        }
        else
            $.ajax(options);

        // fire 'notify' event
        $.event.trigger('form.submit.notify', [this, options]);
        return this;


        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUpload() {
            var form = $form[0];
            var opts = $.extend({}, $.ajaxSettings, options);

            var id = 'jqFormIO' + $.fn.ajaxSubmit.counter++;
            var $io = $('<iframe id="' + id + '" name="' + id + '" />');
            var io = $io[0];
            var op8 = $.browser.opera && window.opera.version() < 9;
            if ($.browser.msie || op8) io.src = 'javascript:false;document.write("");';
            $io.css({position: 'absolute', top: '-1000px', left: '-1000px'});

            var xhr = { // mock object
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function () {
                },
                getResponseHeader: function () {
                },
                setRequestHeader: function () {
                }
            };

            var g = opts.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && !$.active++) $.event.trigger("ajaxStart");
            if (g) $.event.trigger("ajaxSend", [xhr, opts]);

            var cbInvoked = 0;
            var timedOut = 0;

            // take a breath so that pending repaints get some cpu time before the upload starts
            setTimeout(function () {
                $io.appendTo('body');
                // jQuery's event binding doesn't work for iframe events in IE
                io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);

                // make sure form attrs are set
                var encAttr = form.encoding ? 'encoding' : 'enctype';
                var t = $form.attr('target');
                $form.attr({
                    target: id,
                    method: 'POST',
                    action: opts.url
                });
                form[encAttr] = 'multipart/form-data';

                // support timout
                if (opts.timeout)
                    setTimeout(function () {
                        timedOut = true;
                        cb();
                    }, opts.timeout);

                form.submit();
                $form.attr('target', t); // reset target
            }, 10);

            function cb() {
                if (cbInvoked++) return;

                io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

                var ok = true;
                try {
                    if (timedOut) throw 'timeout';
                    // extract the server response from the iframe
                    var data, doc;
                    doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
                    xhr.responseText = doc.body ? doc.body.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;

                    if (opts.dataType == 'json' || opts.dataType == 'script') {
                        var ta = doc.getElementsByTagName('textarea')[0];
                        data = ta ? ta.value : xhr.responseText;
                        if (opts.dataType == 'json')
                            eval("data = " + data);
                        else
                            $.globalEval(data);
                    }
                    else if (opts.dataType == 'xml') {
                        data = xhr.responseXML;
                        if (!data && xhr.responseText != null)
                            data = toXml(xhr.responseText);
                    }
                    else {
                        data = xhr.responseText;
                    }
                }
                catch (e) {
                    ok = false;
                    $.handleError(opts, xhr, 'error', e);
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (ok) {
                    opts.success(data, 'success');
                    if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
                }
                if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
                if (g && !--$.active) $.event.trigger("ajaxStop");
                if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

                // clean up
                setTimeout(function () {
                    $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }
            function toXml(s, doc) {
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                }
                else
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
            }
        }
    };
    $.fn.ajaxSubmit.counter = 0; // used to create unique iframe ids

    /**
     * ajaxForm() provides a mechanism for fully automating form submission.
     *
     * The advantages of using this method instead of ajaxSubmit() are:
     *
     * 1: This method will include coordinates for <input type="image" /> elements (if the element
     *    is used to submit the form).
     * 2. This method will include the submit element's name/value data (for the element that was
     *    used to submit the form).
     * 3. This method binds the submit() method to the form for you.
     *
     * Note that for accurate x/y coordinates of image submit elements in all browsers
     * you need to also use the "dimensions" plugin (this method will auto-detect its presence).
     *
     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
     * passes the options argument along after properly binding events for submit elements and
     * the form itself.  See ajaxSubmit for a full description of the options argument.
     *
     *
     * @example
     * var options = {
 *     target: '#myTargetDiv'
 * };
     * $('#myForm').ajaxSForm(options);
     * @desc Bind form's submit event so that 'myTargetDiv' is updated with the server response
     *       when the form is submitted.
     *
     *
     * @example
     * var options = {
 *     success: function(responseText) {
 *         alert(responseText);
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc Bind form's submit event so that server response is alerted after the form is submitted.
     *
     *
     * @example
     * var options = {
 *     beforeSubmit: function(formArray, jqForm) {
 *         if (formArray.length == 0) {
 *             alert('Please enter data.');
 *             return false;
 *         }
 *     }
 * };
     * $('#myForm').ajaxSubmit(options);
     * @desc Bind form's submit event so that pre-submit callback is invoked before the form
     *       is submitted.
     *
     *
     * @name   ajaxForm
     * @param  options  object literal containing options which control the form submission process
     * @return jQuery
     * @cat    Plugins/Form
     * @type   jQuery
     */
    $.fn.ajaxForm = function (options) {
        return this.ajaxFormUnbind().submit(submitHandler).each(function () {
            // store options in hash
            this.formPluginId = $.fn.ajaxForm.counter++;
            $.fn.ajaxForm.optionHash[this.formPluginId] = options;
            $(":submit,input:image", this).click(clickHandler);
        });
    };

    $.fn.ajaxForm.counter = 1;
    $.fn.ajaxForm.optionHash = {};

    function clickHandler(e) {
        var $form = this.form;
        $form.clk = this;
        if (this.type == 'image') {
            if (e.offsetX != undefined) {
                $form.clk_x = e.offsetX;
                $form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
                var offset = $(this).offset();
                $form.clk_x = e.pageX - offset.left;
                $form.clk_y = e.pageY - offset.top;
            } else {
                $form.clk_x = e.pageX - this.offsetLeft;
                $form.clk_y = e.pageY - this.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function () {
            $form.clk = $form.clk_x = $form.clk_y = null;
        }, 10);
    }
    function submitHandler() {
        // retrieve options from hash
        var id = this.formPluginId;
        var options = $.fn.ajaxForm.optionHash[id];
        $(this).ajaxSubmit(options);
        return false;
    }
    /**
     * ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
     *
     * @name   ajaxFormUnbind
     * @return jQuery
     * @cat    Plugins/Form
     * @type   jQuery
     */
    $.fn.ajaxFormUnbind = function () {
        this.unbind('submit', submitHandler);
        return this.each(function () {
            $(":submit,input:image", this).unbind('click', clickHandler);
        });

    };

    /**
     * formToArray() gathers form element data into an array of objects that can
     * be passed to any of the following ajax functions: $.get, $.post, or load.
     * Each object in the array has both a 'name' and 'value' property.  An example of
     * an array for a simple login form might be:
     *
     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * It is this array that is passed to pre-submit callback functions provided to the
     * ajaxSubmit() and ajaxForm() methods.
     *
     * The semantic argument can be used to force form serialization in semantic order.
     * This is normally true anyway, unless the form contains input elements of type='image'.
     * If your form must be submitted with name/value pairs in semantic order and your form
     * contains an input of type='image" then pass true for this arg, otherwise pass false
     * (or nothing) to avoid the overhead for this logic.
     *
     * @example var data = $("#myForm").formToArray();
     * $.post( "myscript.cgi", data );
     * @desc Collect all the data from a form and submit it to the server.
     *
     * @name formToArray
     * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
     * @type Array<Object>
     * @cat Plugins/Form
     */
    $.fn.formToArray = function (semantic) {
        var a = [];
        if (this.length == 0) return a;

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) return a;
        for (var i = 0, max = els.length; i < max; i++) {
            var el = els[i];
            var n = el.name;
            if (!n) continue;

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (!el.disabled && form.clk == el)
                    a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
                continue;
            }

            var v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (var j = 0, jmax = v.length; j < jmax; j++)
                    a.push({name: n, value: v[j]});
            }
            else if (v !== null && typeof v != 'undefined')
                a.push({name: n, value: v});
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle them here
            var inputs = form.getElementsByTagName("input");
            for (var i = 0, max = inputs.length; i < max; i++) {
                var input = inputs[i];
                var n = input.name;
                if (n && !input.disabled && input.type == "image" && form.clk == input)
                    a.push({name: n + '.x', value: form.clk_x}, {name: n + '.y', value: form.clk_y});
            }
        }
        return a;
    };


    /**
     * Serializes form data into a 'submittable' string. This method will return a string
     * in the format: name1=value1&amp;name2=value2
     *
     * The semantic argument can be used to force form serialization in semantic order.
     * If your form must be submitted with name/value pairs in semantic order then pass
     * true for this arg, otherwise pass false (or nothing) to avoid the overhead for
     * this logic (which can be significant for very large forms).
     *
     * @example var data = $("#myForm").formSerialize();
     * $.ajax('POST', "myscript.cgi", data);
     * @desc Collect all the data from a form into a single string
     *
     * @name formSerialize
     * @param semantic true if serialization must maintain strict semantic ordering of elements (slower)
     * @type String
     * @cat Plugins/Form
     */
    $.fn.formSerialize = function (semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };


    /**
     * Serializes all field elements in the jQuery object into a query string.
     * This method will return a string in the format: name1=value1&amp;name2=value2
     *
     * The successful argument controls whether or not serialization is limited to
     * 'successful' controls (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.
     *
     * @example var data = $("input").formSerialize();
     * @desc Collect the data from all successful input elements into a query string
     *
     * @example var data = $(":radio").formSerialize();
     * @desc Collect the data from all successful radio input elements into a query string
     *
     * @example var data = $("#myForm :checkbox").formSerialize();
     * @desc Collect the data from all successful checkbox input elements in myForm into a query string
     *
     * @example var data = $("#myForm :checkbox").formSerialize(false);
     * @desc Collect the data from all checkbox elements in myForm (even the unchecked ones) into a query string
     *
     * @example var data = $(":input").formSerialize();
     * @desc Collect the data from all successful input, select, textarea and button elements into a query string
     *
     * @name fieldSerialize
     * @param successful true if only successful controls should be serialized (default is true)
     * @type String
     * @cat Plugins/Form
     */
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) return;
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++)
                    a.push({name: n, value: v[i]});
            }
            else if (v !== null && typeof v != 'undefined')
                a.push({name: this.name, value: v});
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };


    /**
     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
     *
     *  <form><fieldset>
     *      <input name="A" type="text" />
     *      <input name="A" type="text" />
     *      <input name="B" type="checkbox" value="B1" />
     *      <input name="B" type="checkbox" value="B2"/>
     *      <input name="C" type="radio" value="C1" />
     *      <input name="C" type="radio" value="C2" />
     *  </fieldset></form>
     *
     *  var v = $(':text').fieldValue();
     *  // if no values are entered into the text inputs
     *  v == ['','']
     *  // if values entered into the text inputs are 'foo' and 'bar'
     *  v == ['foo','bar']
     *
     *  var v = $(':checkbox').fieldValue();
     *  // if neither checkbox is checked
     *  v === undefined
     *  // if both checkboxes are checked
     *  v == ['B1', 'B2']
     *
     *  var v = $(':radio').fieldValue();
     *  // if neither radio is checked
     *  v === undefined
     *  // if first radio is checked
     *  v == ['C1']
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If this value is false the value(s)
     * for each element is returned.
     *
     * Note: This method *always* returns an array.  If no valid value can be determined the
     *       array will be empty, otherwise it will contain one or more values.
     *
     * @example var data = $("#myPasswordElement").fieldValue();
     * alert(data[0]);
     * @desc Alerts the current value of the myPasswordElement element
     *
     * @example var data = $("#myForm :input").fieldValue();
     * @desc Get the value(s) of the form elements in myForm
     *
     * @example var data = $("#myForm :checkbox").fieldValue();
     * @desc Get the value(s) for the successful checkbox element(s) in the jQuery object.
     *
     * @example var data = $("#mySingleSelect").fieldValue();
     * @desc Get the value(s) of the select control
     *
     * @example var data = $(':text').fieldValue();
     * @desc Get the value(s) of the text input or textarea elements
     *
     * @example var data = $("#myMultiSelect").fieldValue();
     * @desc Get the values for the select-multiple control
     *
     * @name fieldValue
     * @param Boolean successful true if only the values for successful controls should be returned (default is true)
     * @type Array<String>
     * @cat Plugins/Form
     */
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
                continue;
            v.constructor == Array ? $.merge(val, v) : val.push(v);
        }
        return val;
    };

    /**
     * Returns the value of the field element.
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If the given element is not
     * successful and the successful arg is not false then the returned value will be null.
     *
     * Note: If the successful flag is true (default) but the element is not successful, the return will be null
     * Note: The value returned for a successful select-multiple element will always be an array.
     * Note: If the element has no value the return value will be undefined.
     *
     * @example var data = jQuery.fieldValue($("#myPasswordElement")[0]);
     * @desc Gets the current value of the myPasswordElement element
     *
     * @name fieldValue
     * @param Element el The DOM element for which the value will be returned
     * @param Boolean successful true if value returned must be for a successful controls (default is true)
     * @type String or Array<String> or null or undefined
     * @cat Plugins/Form
     */
    $.fieldValue = function (el, successful) {
        var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
        if (typeof successful == 'undefined') successful = true;

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
            (t == 'checkbox' || t == 'radio') && !el.checked ||
            (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
            tag == 'select' && el.selectedIndex == -1))
            return null;

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) return null;
            var a = [], ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    // extra pain for IE...
                    var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                    if (one) return v;
                    a.push(v);
                }
            }
            return a;
        }
        return el.value;
    };


    /**
     * Clears the form data.  Takes the following actions on the form's input fields:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     *
     * @example $('form').clearForm();
     * @desc Clears all forms on the page.
     *
     * @name clearForm
     * @type jQuery
     * @cat Plugins/Form
     */
    $.fn.clearForm = function () {
        return this.each(function () {
            $('input,select,textarea', this).clearFields();
        });
    };

    /**
     * Clears the selected form elements.  Takes the following actions on the matched elements:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     *
     * @example $('.myInputs').clearFields();
     * @desc Clears all inputs with class myInputs
     *
     * @name clearFields
     * @type jQuery
     * @cat Plugins/Form
     */
    $.fn.clearFields = $.fn.clearInputs = function () {
        return this.each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == 'text' || t == 'password' || tag == 'textarea')
                this.value = '';
            else if (t == 'checkbox' || t == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    };


    /**
     * Resets the form data.  Causes all form elements to be reset to their original value.
     *
     * @example $('form').resetForm();
     * @desc Resets all forms on the page.
     *
     * @name resetForm
     * @type jQuery
     * @cat Plugins/Form
     */
    $.fn.resetForm = function () {
        return this.each(function () {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
                this.reset();
        });
    };


    /**
     * Enables or disables any matching elements.
     *
     * @example $(':radio').enabled(false);
     * @desc Disables all radio buttons
     *
     * @name select
     * @type jQuery
     * @cat Plugins/Form
     */
    $.fn.enable = function (b) {
        if (b == undefined) b = true;
        return this.each(function () {
            this.disabled = !b
        });
    };

    /**
     * Checks/unchecks any matching checkboxes or radio buttons and
     * selects/deselects and matching option elements.
     *
     * @example $(':checkbox').selected();
     * @desc Checks all checkboxes
     *
     * @name select
     * @type jQuery
     * @cat Plugins/Form
     */
    $.fn.select = function (select) {
        if (select == undefined) select = true;
        return this.each(function () {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio')
                this.checked = select;
            else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').select(false);
                }
                this.selected = select;
            }
        });
    };

})(jQuery);


/*! file => jquery.json-2.2.js */
/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */

(function ($) {
    /** jQuery.toJSON( json-serializble )
     Converts the given argument into a JSON respresentation.

     If an object has a "toJSON" function, that will be used to get the representation.
     Non-integer/string keys are skipped in the object, as are keys that point to a function.

     json-serializble:
     The *thing* to be converted.
     **/
    $.toJSON = function (o) {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);

        var type = typeof(o);

        if (o === null)
            return "null";

        if (type == "undefined")
            return undefined;

        if (type == "number" || type == "boolean")
            return o + "";

        if (type == "string")
            return $.quoteString(o);

        if (type == 'object') {
            if (typeof o.toJSON == "function")
                return $.toJSON(o.toJSON());

            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();

                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;

                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;

                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;

                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }

            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push($.toJSON(o[i]) || "null");

                return "[" + ret.join(",") + "]";
            }

            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys

                if (typeof o[k] == "function")
                    continue;  //skip pairs where the value is a function.

                var val = $.toJSON(o[k]);

                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
     Evaluates a given piece of json source.
     **/
    $.evalJSON = function (src) {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };

    /** jQuery.secureEvalJSON(src)
     Evals JSON in a way that is *more* secure.
     **/
    $.secureEvalJSON = function (src) {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);

        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
     Returns a string-repr of a string, escaping quotes intelligently.
     Mostly a support function for toJSON.

     Examples:
     >>> jQuery.quoteString("apple")
     "apple"

     >>> jQuery.quoteString('"Where are we going?", she asked.')
     "\"Where are we going?\", she asked."
     **/
    $.quoteString = function (string) {
        if (string.match(_escapeable)) {
            return '"' + string.replace(_escapeable, function (a) {
                    var c = _meta[a];
                    if (typeof c === 'string') return c;
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
        }
        return '"' + string + '"';
    };

    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;

    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };
})(jQuery);


/*! file => swfobject.js */
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
 */
var swfobject = function () {
    var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function () {
        var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = !+"\v1", ag = [0, 0, 0], ab = null;
        if (typeof t.plugins != D && typeof t.plugins[S] == r) {
            ab = t.plugins[S].description;
            if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                T = true;
                X = false;
                ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof O.ActiveXObject != D) {
                try {
                    var ad = new ActiveXObject(W);
                    if (ad) {
                        ab = ad.GetVariable("$version");
                        if (ab) {
                            X = true;
                            ab = ab.split(" ")[1].split(",");
                            ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                        }
                    }
                } catch (Z) {
                }
            }
        }
        return {w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac}
    }(), k = function () {
        if (!M.w3) {
            return
        }
        if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
            f()
        }
        if (!J) {
            if (typeof j.addEventListener != D) {
                j.addEventListener("DOMContentLoaded", f, false)
            }
            if (M.ie && M.win) {
                j.attachEvent(x, function () {
                    if (j.readyState == "complete") {
                        j.detachEvent(x, arguments.callee);
                        f()
                    }
                });
                if (O == top) {
                    (function () {
                        if (J) {
                            return
                        }
                        try {
                            j.documentElement.doScroll("left")
                        } catch (X) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
            }
            if (M.wk) {
                (function () {
                    if (J) {
                        return
                    }
                    if (!/loaded|complete/.test(j.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    f()
                })()
            }
            s(f)
        }
    }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {success: false, id: Y};
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {success: false, id: X};
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            }
            if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {
        }
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv, X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }

    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({success: false, id: ab})
                }
            }
        }, getObjectById: function (X) {
            if (M.w3) {
                return z(X)
            }
        }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {success: false, id: ah};
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function () {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    }
                    if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        }, switchOffAutoHideShow: function () {
            m = false
        }, ua: M, getFlashPlayerVersion: function () {
            return {major: M.pv[0], minor: M.pv[1], release: M.pv[2]}
        }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        }, showExpressInstall: function (Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        }, removeSWF: function (X) {
            if (M.w3) {
                y(X)
            }
        }, createCSS: function (aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        }, expressInstallCallback: function () {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();

/*! file => fb_util.js */
var is_fb_init = false;
var waiting_graph = [];
var fb_access_token = false;
var fb_login_response = false;
var fb_request_buffer;
var failed_ids = [];
var granted_perms = [];
var opened_inapp_info = [];
var LP_perms_status = {
    "status": {
        "GRANTED": true,
        "NOT_GRANTED": false
    },
    "error_reason": {
        "NO_ERROR": 0,
        "ERROR": 1,
        "CANCEL": 2
    }
};

function callFBData(referer, call_id, command, params, method, recalls_count) {
    method = (typeof method == 'undefined') ? 'get' : method;
    if (command.indexOf('achievements') != -1 && method == 'post') {
        if (parseInt(granted_perms['publish_actions'], 10) != 1) {
            getFlashMovieObject(referer).fbDataCallback(call_id, $.parseJSON('{"error":{"message":"Permission error. Requires \'publish_actions\' permission","type":"OAuthException"}}'));
            return;
        }
        if (typeof (params) == 'object') {
            var ach = params.achievement.split(',');
            ach[0] = getAchievementGameId(ach[0]);
            params = 'achievement=' + escape(app_vars.achievement_path + ach.join(app_vars.achievement_delimiter) + '.html');
        }
    } else if (command.indexOf('scores') != -1 && method == 'post') {
        return;
    }
    if (params.hasOwnProperty('use_proxy')) {
        delete params.use_proxy;
    }
    if (!is_fb_init) {
        waiting_graph.push({
            'swf_name': referer,
            'call_id': call_id,
            'command': command,
            'params': params,
            'method': method
        });
        return;
    }
    recalls_count = typeof(recalls_count) != 'undefined' ? recalls_count : 0;
    if (typeof (params) == 'object') {
        params = '';
    }
    try {
        var processFunction = function () {
            FB.api("/" + command + "?" + params,
                method,
                {},
                function (response) {
                    logger({
                        "rel_url": command,
                        "method": method,
                        "get_params": params,
                        "post_params": {},
                        "response": response
                    });
                    if (!response || response.error) {
                        if (response.error.code == 803) { //code 803 - Some of the aliases you requested do not exist
                            var fb_err = response;
                            var start_failed_ids = response.error.message.indexOf(":");
                            var failed_ids_str = response.error.message.substr(start_failed_ids + 2);  // 2 - because ": " - 2 symbols
                            var failed_ids_arr = failed_ids_str.split(",");
                            if (failed_ids_str.length > 0) {
                                failed_ids = failed_ids.concat(failed_ids_arr);
                                for (var i in failed_ids_arr) {
                                    var pos = params.indexOf(failed_ids_arr[i]);
                                    if (pos != -1) {
                                        if (params.substr((pos - 1), 1) == ',') {
                                            params = params.replace("," + failed_ids_arr[i], "");
                                        } else if (params.substr((pos + failed_ids_arr[i].length), 1) == ',') {
                                            params = params.replace(failed_ids_arr[i] + ",", "");
                                        } else {
                                            params = params.replace(failed_ids_arr[i], "");
                                            var tmp_arr = params.split("&");
                                            if (tmp_arr[0].substr(tmp_arr[0].length - 1) == "=") {
                                                response = [];
                                                recalls_count = 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        //recall 1 time
                        if (recalls_count < 1) {
                            callFBData(referer, call_id, command, params, method, ++recalls_count);
                        } else {
                            //TODO
                            if (typeof referer == 'function') {//call from js
                                referer(response);
                            } else if (referer != "eng_bar_swf") {
                                getFlashMovieObject(referer).fbDataCallback(call_id, response.error.message.toString());
                            }
                        }
                    } else {
                        if (typeof referer == 'function') {//call from js
                            referer(response);
                        } else {
                            getFlashMovieObject(referer).fbDataCallback(call_id, response);
                        }
                    }
                });
        };

        //check login
        FB.getLoginStatus(function (res) {
            if (res.status == "connected") {
                processFunction();
            } else {
                FB.login(function (response) {
                    processFunction();
                });
            }
        });


    } catch (e) {
    }
}

function getAchievementGameId(in_game_id) {
    var game_id;
    if (in_game_id == 'game256' || in_game_id == 'game257') { // 1 achievement for 1 game with different amount of lines
        game_id = 'game251';
    } else if (in_game_id == 'game258') {
        game_id = 'game250';
    } else if (in_game_id == 'game259') {
        game_id = 'game252';
    } else if (in_game_id == 'game271') {
        game_id = 'game270';
    } else if (in_game_id == 'game266' || in_game_id == 'game265') {
        game_id = 'game37';
    } else if (in_game_id == 'game276') {
        game_id = 'game272';
    } else if (in_game_id == 'game284' || in_game_id == 'game285') {
        game_id = 'game45';
    } else if (in_game_id == 'game297') {
        game_id = 'game286';
    } else {
        game_id = in_game_id;
    }
    return game_id;
}

function logger(obj_params) {
    if (!obj_params.hasOwnProperty("rel_url") || !obj_params.hasOwnProperty("response") || !obj_params.hasOwnProperty("method")) {
        return;
    }

    //prepare data
    var access_token = (!!fb_login_response.authResponse && fb_login_response.authResponse.accessToken != 'undefined') ? fb_login_response.authResponse.accessToken : '';
    var response = (!obj_params.response || obj_params.response.error) ? $.toJSON(obj_params.response) : 'normal_response';
    var commonString = "//REL_URL=" + obj_params.rel_url + "//METHOD=" + obj_params.method + "//GET_PARAMS=" + obj_params.get_params
        + "//POST_PARAMS=" + $.toJSON(obj_params.post_params) + "//RESPONSE=" + response + "//ACCESS_TOKEN=" + access_token;

    for (var i in log_opt) {
        writeLog(obj_params.rel_url, "LOG_TYPE=all" + commonString);
    }
    if (!obj_params.response || obj_params.response === null || obj_params.response.error) {
        writeLog("fb_errors", "LOG_TYPE=fb_errors" + commonString);
    }
}

function getUsersInfo(referer, call_id, command, params, method) {
    var id_arr = [];
    id_arr = params.ids.split(',');
    var new_id_arr = [];
    var response_arr = [];
    var fields = params.hasOwnProperty("fields") ? '&fields=' + params.fields : '';
    var z = 50;
    if (id_arr.length > z) {
        for (var i = 0; i < id_arr.length - 1;) {
            new_id_arr.push(id_arr.slice(i, i + z));
            i = i + z;
        }
    } else {
        new_id_arr.push(id_arr);
    }
    var graphCallback = function (response) {
        if (!response || response.error) {
            getFlashMovieObject(referer).fbDataCallback(call_id, response.error.message.toString());
        } else {
            response_arr.push(response);
            if (new_id_arr.length == response_arr.length) {
                var result = [];
                for (var i in response_arr) {
                    for (var z in response_arr[i]) {
                        var elem = response_arr[i][z];
                        if (!elem.hasOwnProperty("id")) {
                            elem.id = z;
                        }
                        result.push(elem);
                    }
                }
                if (failed_ids.length > 0) {
                    for (var i in failed_ids) {
                        result.push({id: failed_ids[i], picture: null});
                    }
                }
                getFlashMovieObject(referer).fbDataCallback(call_id, result);
            }
        }
    };
    for (var i in new_id_arr) {
        callFBData(graphCallback, call_id, command, "ids=" + new_id_arr[i].join() + fields, method);
    }
}

function getAchievements(referer, call_id, command, params, method) {
    if (params.hasOwnProperty("limit")) {
        params.limit = 1000;
    }
    getFBPagedData(referer, call_id, command, params, method);
    return;
}

function getFBPagedData(referer, call_id, command, params, method) {
    var limit = params.limit;
    var offset = params.offset;
    var result = [];
    var graphCallback = function (response) {
        if (!response || response.error) {
            if (referer != "eng_bar_swf") {
                getFlashMovieObject(referer).fbDataCallback(call_id, response.error.message.toString());
            }
        } else {
            if (response.data.length > 0) {
                for (var i in response.data) {
                    result.push(response.data[i]);
                }
            }
            if (response.hasOwnProperty('paging') && response.paging.hasOwnProperty('next')) {
                offset = offset + limit;
                callFBData(graphCallback, call_id, command, "offset=" + offset + "&limit=" + limit, method);
            } else {
                var response_arr = {};
                response_arr.data = result;
                getFlashMovieObject(referer).fbDataCallback(call_id, response_arr);
            }
        }
    };
    callFBData(graphCallback, call_id, command, "offset=" + params.offset + "&limit=" + limit, method);
}

/**
 * call for facebook api fql.
 * this function was designed to work with swf's and js.
 * if referer is swf_name (string) it will return the result given swf using fqlCallback() inside game.
 * if referer is function() it will pass referer(response).
 */
function callFql(referer, call_id, fql, recalls_count) {
    // Multiquery
    if (typeof (fql) == 'object') {
        var queries = [];
        for (var i in fql) {
            queries.push(escape(fql[i]));
        }
        queries = $.toJSON(queries);
        var callback = function (response) {
            if (!response || response.error) {
                if (referer != "eng_bar_swf" && typeof referer != "function") {
                    getFlashMovieObject(referer).fqlCallbackError(call_id, response.error.message.toString());
                } else if (typeof referer == "function") {
                    referer(response);
                }
                return;
            } else {
                if (typeof referer == 'function') {//call from js
                    referer(response.data);
                } else {
                    getFlashMovieObject(referer).fqlCallback(call_id, response.data);
                }
            }
            logFriendsFQL(queries, response);
        };
        callFBData(callback, call_id, 'fql/', 'q=' + queries, 'get');

        // Singlequery
    } else if (typeof (fql) == 'string') {
        var query = escape(fql);
        var callback = function (response) {
            if (!response || response.error) {
                if (referer != "eng_bar_swf" && typeof referer != "function") {
                    getFlashMovieObject(referer).fqlCallbackError(call_id, response.error.message.toString());
                } else if (typeof referer == "function") {
                    referer(response);
                }
                return;
            } else {
                if (typeof referer == "function") {//call from js
                    referer(response.data);
                } else {
                    getFlashMovieObject(referer).fqlCallback(call_id, response.data);
                }
            }
            logFriendsFQL(query, response);
        };

        callFBData(callback, call_id, 'fql/', 'q=' + query, 'get');
    }
}

/**
 * Log friends FQL
 * @param string resultQuery
 * @param object response
 * @returns void
 */
function logFriendsFQL(resultQuery, response) {
    if (resultQuery.indexOf("friend") != -1 && resultQuery.indexOf("has_added_app") != -1) {
        var access_token = (!!fb_login_response.authResponse && fb_login_response.authResponse.accessToken != 'undefined') ? fb_login_response.authResponse.accessToken : '';
        writeLog("friends_requests", "user_session=" + userSessionData.userSessionID + (!response || typeof(response) == "undefined" ? "//errors=empty_response" : (response.error ? "//errors=" + $.toJSON(response.error) : "//friends_count=" + (response.data ? response.data.length : "no_data"))) + "//access_token=" + access_token);
    }
}

function dumpWaitingGraph() {
    if (waiting_graph.length > 0) {
        for (var i in waiting_graph) {
            var call = waiting_graph[i];
            callFBData(call.swf_name, call.call_id, call.command, call.params, call.method);
        }
        waiting_graph = [];
    }
}

function displayFlashScreenshot(isFBDialog) {
    // Call the Flash Actionscript method to create the dynamic screenshot data
    if (app_vars.paypage_displayed) {
        return;
    }
    var screenshotData = null;
    if (getGameSwf().exportScreenshot) {
        var blure = 0;
        if (isFBDialog) {
            if (arguments.length == 1) {
                blure = 3;
            } else {
                blure = arguments[1];
            }
        }
        try {
            screenshotData = getGameSwf().exportScreenshot(blure);
        } catch (e) {
        }
    } else {
        return;
    }

    if (!isFBDialog) {
        if (opened_inapp_info['count'] == 1) {
            // Set the screenshot image data as a base64 encoded data URI
            // in the img src attribute
            try {
                $("#screenshotObject2").attr("src", 'data:image/jpeg;base64,' + screenshotData.src);

                // Set the screenshot img dimensions to match the Flash object tag.
                $("#screenshotObject2").attr("width", screenshotData.width);
                $("#screenshotObject2").css("margin-left", "-" + (screenshotData.width / 2) + "px");
                $("#screenshotObject2").attr("height", app_vars.swf_height);
            } catch (e) {
            }
        }
        // Move the Flash object off the screen and place the screenshot img
        $("#inapp_like").css("display", "block");
        $("#imageLikeInapp").css("top", "0px");
        $("#imageContent").css("top", "-10000px");
        opened_inapp_info['count']++;
    } else {
        // Set the screenshot image data as a base64 encoded data URI
        // in the img src attribute
        try {
            $("#screenshotObject").attr("src", 'data:image/jpeg;base64,' + screenshotData.src);

            // Set the screenshot img dimensions to match the Flash object tag.
            $("#screenshotObject").attr("width", screenshotData.width);
            $("#screenshotObject").css("margin-left", "-" + (screenshotData.width / 2) + "px");
            $("#screenshotObject").attr("height", app_vars.swf_height);
        } catch (e) {
        }

        // Move the Flash object off the screen and place the screenshot img
        $("#imageContent").css("top", "0px");
        $("#imageLikeInapp").css("top", "-10000px");
    }
    $("#game_swf_con").css("top", "-10000px");
    if ($("#tabs_view_stack").hasClass("over_scroll")) {
        $("#tabs_view_stack").removeClass("over_scroll").addClass("over_scroll_off");
        $("#game_swf_con").removeClass("game_swf_con_zero_margin");
    } else if ($("#tabs_view_stack").hasClass("over_visible")) {
        $("#tabs_view_stack").removeClass("over_visible").addClass("over_visible_off");
    }
}

function hideFlashScreenshot(isFBDialog) {
    // Move the screenshot img off the screen and place the Flash object
    if (!isFBDialog) {
        $("#inapp_like").css("display", "none");
    } else if (app_vars.paypage_displayed) {
        return;
    }
    $("#game_swf_con").css("top", "0px");
    $("#imageContent").css("top", "-10000px");
    $("#imageLikeInapp").css("top", "-10000px");
    if ($("#tabs_view_stack").hasClass("over_scroll_off")) {
        $("#tabs_view_stack").removeClass("over_scroll_off").addClass("over_scroll");
        $("#game_swf_con").addClass("game_swf_con_zero_margin");
    } else if ($("#tabs_view_stack").hasClass("over_visible_off")) {
        $("#tabs_view_stack").removeClass("over_visible_off").addClass("over_visible");
    }
}

function onFlashHide(info) {
    if (info.state == 'opened') {
        displayFlashScreenshot(true);
    } else if (CIE.OneRewardPopup.isClosed) { //fix for TRS - SMFI-528
        hideFlashScreenshot(true);
    }
}

/**
 * perform FB.init & set app events and properties on Facebook
 */
function fbInit(app_id, complete_handler) {
    //init the facebook object
    FB.init({
        appId: app_id,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        frictionlessRequests: true, //enable users to send requests to specific friends without having to click on a pop-up confirmation dialog
        oauth: true, //enable OAuth 2.0
        hideFlashCallback: onFlashHide,
        xfbml: true // parse XFBML
    });

    //set canvas to be auto resized according to game height
    FB.Canvas.setAutoGrow(true);

    var onUrl = function (data) {
        if (data.path.indexOf("request_ids") != -1) {
            var tmp = data.path.split('&');
            tmp = tmp[0].split('=');
            if (getGameSwf().addSNRequests) {
                getGameSwf().addSNRequests(unescape(tmp[1]));
            }
        } else {
            // default behaviour
            top.location.href = app_vars.app_path + data.path;
        }
    };

    FB.Canvas.setUrlHandler(onUrl);

    //call for user session
    var loginErrorTimeOut = setTimeout("OnLoginErrorTimeOut()", 60 * 1000);
    FB.getLoginStatus(function (response) {
        //the response function will verify session and complete habdler
        clearTimeout(loginErrorTimeOut);
        if (!response.authResponse && app_vars.app_mode != 1 && app_vars.app_mode != 3) {
            logger({
                "rel_url": "FB_getLoginStatus",
                "method": "get",
                "get_params": "",
                "post_params": {},
                "response": response
            });
            OnLoginErrorTimeOut();
        } else if (app_vars.app_mode == 1 || app_vars.app_mode == 3) {
            if (complete_handler) {
                complete_handler();
            }
            return;
        } else {
            logger({
                "rel_url": "FB_getLoginStatus",
                "method": "get",
                "get_params": "",
                "post_params": {},
                "response": response
            });
            fb_login_response = response;
            var permsCallback = function (response) {
                if (response && response[0].hasOwnProperty("fql_result_set")) {
                    granted_perms = response[1].fql_result_set[0];
                }
            };
            getPermissionsAndLikes(permsCallback);
            is_fb_init = true;
            if (complete_handler) {
                complete_handler();
            }
            dumpWaitingGraph();
        }
    });
}

function fbLoginComplete() {
    FB.Event.subscribe("edge.create",
        function (response) {
            var like = (response.indexOf(app_vars.fan_page_id) != -1 || response.indexOf(app_vars.fan_page_url) != -1) ? 1 : 0;
            if (getGameSwf().pageLiked) {
                getGameSwf().pageLiked(like);
            }
            closeInAppMsg(false);
            $("div#like_page_con").hide();
        }
    );
    if (!app_vars.smid && app_vars.app_mode != 1) {
        initSupportFB();
    } else {
        return;
    }
}

function getPermissionsAndLikes(callback) {
    var query = {
        like: 'SELECT uid,page_id FROM page_fan WHERE uid = ' + app_vars.user_sn_id + ' AND page_id IN (' + app_vars.fan_page_id + ')',
        perms: 'SELECT ' + app_vars.fb_scope + ' FROM permissions WHERE uid=' + app_vars.user_sn_id
    };
    callFql(callback, 'callFql ' + $.toJSON(query), $.toJSON(query));
}

function OnLoginErrorTimeOut() {
    if (app_vars.app_mode == 1 || app_vars.smid) {
        return;
    }
    var msg = "js_login_error_timeout";
    if (getGameSwf().OnSNLoginErrorTimeOut) {
        getGameSwf().OnSNLoginErrorTimeOut();
        msg = msg + "_f_ready";
    } else {
        msg = msg + "_f_not_ready";
    }
    logEvent({"event": "soc_reconnect", "msg": msg});
}

/**
 * refresh page the php will ask for permissions
 */
function fbLoginRedirect() {
    if (app_vars.dest || app_vars.smid) {
        location.href = "dest.php" + location.search;
    } else {
        top.location.href = app_vars.app_path + location.search;
    }
//todo: on landing site we will initiate fb conect
}

function loadOffersPopup() {
    var obj = {
        method: 'pay',
        action: 'earn_currency',
        product: app_vars.web_server_path + 'og.php?ogt=inapp_currency'
    };
    var callbackFunc = function (response) {
        logger({
            "rel_url": "FB_ui_" + obj.method + "_" + obj.action,
            "method": "get",
            "get_params": $.toJSON(obj),
            "post_params": {},
            "response": response
        });
        if (response['order_id']) {
            // Handle completed offer
        } else if (response['error_code']) {
            // Handle error.
        } else {
            // Handle unknown error.
        }
        activateTab('play');
        hideFlashScreenshot(true);
        return true;
    };
    FB.ui(obj, callbackFunc);
}

function getFriendsWithAppIds(success_func, ids) {
    var query = 'SELECT uid FROM user WHERE has_added_app=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = ' + app_vars.user_sn_id + ')';
    var callback = function (response) {
        if (!response || response.error) {
            // TODO: some error handle 
            return;
        }
        var result = [];
        for (var i in response) {
            result.push(response[i].uid);
        }
        if (typeof ids == 'object') {
            $.merge(result, ids);
        }
        result = array_unique(result);
        success_func(result);
    };
    callFql(callback, 'callFql ' + query, query);
}

function getAllFriendsIds_toFilter(title, content, gift_type, event_type, gift_receivers) {
    var query = {
        firends: 'SELECT uid2 FROM friend WHERE uid1 = ' + app_vars.user_sn_id,
        app_friends: 'SELECT uid FROM user WHERE has_added_app=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = ' + app_vars.user_sn_id + ')'
    };
    var callback = function (response) {
        if (!response || response.error) {
            // TODO: some error handle 
            return;
        }
        var result = [];
        for (var i in response) {
            result.push(response[i].fql_result_set);
        }
        filterAlreadyGiftedFriends(result, title, content, gift_type, event_type, gift_receivers);
    };
    callFql(callback, 'callFql ' + $.toJSON(query), $.toJSON(query));
}

function streamPublish(params) {
    var post_data = {};
    post_data.event_type = params.event_type;
    post_data.post_id = Math.floor(Math.random() * 100000000) + '' + Math.floor(Math.random() * 100000000);
    if (post_data.post_id.length > 16) {
        post_data.post_id = post_data.post_id.substr(0, 16);
    }
    var description = (params.user_msg != null) ? params.user_msg : '  ';
    var gstid = '';
    if (params.gameSybTypeId != -1) {
        gstid = '&gstid=' + params.gameSybTypeId;
    }
    var src = 'in';
    if (params.event_type == 14) {
        src = 'megawin';
    }
    var coupon_token_str = (params.hasOwnProperty('token') && params.token != null) ? "&coupon_token=" + params.token : "";
    var share_link = app_vars.dest ? app_vars.dest_site_url : app_vars.app_path;
    //var share_link = app_vars.app_path;
    var stream_link_path = share_link + "?ch=fs&et=" + params.event_type + "&iid=" + app_vars.user_sn_id + "&pid=" + post_data.post_id + "&src=" + src + "&crt=0" + coupon_token_str + gstid;

    post_data.publish = {
        name: params.title,
        caption: params.caption,
        description: description,
        link: stream_link_path,
        actions: [{link: stream_link_path, name: "Play Slotomania"}]
    };
    if (params.hasOwnProperty("image_path") && params.image_path != "") {
        var cid = (params.image_path.indexOf("cid_") != -1) ? "" : "?c=19";
        post_data.publish.picture = params.image_path + cid;
    } else if (params.hasOwnProperty("image_id")) {
        post_data.publish.object_attachment = params.image_id;
    }

    if (granted_perms['publish_actions'] == 1 && (app_vars.one_click_share === true || params.backgroundPost === true)) {
        try {
            postWithoutDialog(post_data)
        } catch (e) {
            getGameSwf().publishCancel();
        }
    } else {
        showShareDialog(post_data);
    }
}

function postWithoutDialog(data) {
    FB.api("/me/feed",
        "post",
        data.publish,
        function (response) {
            logger({
                "rel_url": "me_feed",
                "method": "post",
                "get_params": "",
                "post_params": data.publish,
                "response": response
            });
            if (response && response.id) {
                getGameSwf().publishComplete(data.event_type, data.post_id, 0, true);
                getGameSwf().resumeGame();
            } else {
                if (response.hasOwnProperty("error")) {
                    showShareDialog(data);
                } else {
                    getGameSwf().publishCancel();
                }
            }
        });
}

function showShareDialog(data) {
    displayFlashScreenshot(true);
    var publish = data.publish;
    publish.method = 'feed';
    FB.ui(publish, function (response) {
        logger({
            "rel_url": "FB_ui_feed",
            "method": "get",
            "get_params": $.toJSON(publish),
            "post_params": {},
            "response": response
        });
        if (response && response.post_id) {
            getGameSwf().publishComplete(data.event_type, data.post_id, 0, false);
        } else {
            getGameSwf().publishCancel();
        }
        if (CIE.OneRewardPopup.isClosed) { //fix for TRS - SM-19940
            hideFlashScreenshot();
            getGameSwf().resumeGame();
        }
    });
}

function upgradePermissions(new_perms, callback) {
    var obj = {
        method: 'permissions.request',
        //scope: new_perms
        perms: new_perms
    };

    FB.ui(obj, callback);
    //FB.login(callback, {scope: new_perms});
}

function upgradeLoyaltyPermissions() {
    var granted = checkIfAllPermissionsGranted(app_vars.loyalty_perms, granted_perms);
    if (granted) {
        if (getGameSwf().showEnterEmailDialog) {
            getGameSwf().showEnterEmailDialog(LP_perms_status.status.GRANTED, LP_perms_status.error_reason.NO_ERROR);
        }
    } else {
        var callback = function (response) {
            try {
                if (typeof response == 'undefined') {
                    getGameSwf().showEnterEmailDialog(LP_perms_status.status.NOT_GRANTED, LP_perms_status.error_reason.CANCEL);
                } else if (response.hasOwnProperty("error") || !response.hasOwnProperty("perms")) {
                    getGameSwf().showEnterEmailDialog(LP_perms_status.status.NOT_GRANTED, LP_perms_status.error_reason.ERROR);
                } else {
                    updateGrantedPermissions(response);
                    if (checkIfAllPermissionsGranted(app_vars.loyalty_perms, response.perms)) {
                        getGameSwf().showEnterEmailDialog(LP_perms_status.status.GRANTED, LP_perms_status.error_reason.NO_ERROR);
                    } else {
                        getGameSwf().showEnterEmailDialog(LP_perms_status.status.NOT_GRANTED, LP_perms_status.error_reason.CANCEL);
                    }
                }
            } catch (e) {
            }
        };
        try {
            upgradePermissions(app_vars.loyalty_perms, callback);
        } catch (e) {
            getGameSwf().showEnterEmailDialog(LP_perms_status.status.NOT_GRANTED, LP_perms_status.error_reason.ERROR);
        }
    }
}

function checkIfAllPermissionsGranted(srch, stack) {
    srch = (typeof srch == 'string') ? srch.split(',') : srch;
    if (typeof stack == 'string') {
        if (stack == "") {
            stack = {};
        } else {
            var tmp = stack.split(',');
            stack = {};
            for (var i = 0; i < tmp.length; i++) {
                stack[tmp[i]] = 1;
            }
        }
    }
    var permsGranted = true;
    for (var i = 0; i < srch.length; i++) {
        if (!stack.hasOwnProperty(srch[i]) || stack[srch[i]] != 1) {
            permsGranted = false;
        }
    }
    return permsGranted;
}

function updateGrantedPermissions(response) {
    if (response.hasOwnProperty("perms")) {
        var perms_arr = response.perms.split(',');
        for (var i = 0; i < perms_arr.length; i++) {
            if (!granted_perms.hasOwnProperty(perms_arr[i]) || granted_perms[perms_arr[i]] != 1) {
                granted_perms[perms_arr[i]] = 1;
            }
        }
    }
}

function connectToSN() {
    // ADD SMID??
    if (app_vars.smid) {
        var enable_sn_features = false;
        if (arguments.length > 0) {
            if (arguments[0].hasOwnProperty("enable_sn_features")) {
                enable_sn_features = arguments[0].enable_sn_features;
            }
        }
        FB.getLoginStatus(function (response) {
            //the response function will verify session and complete habdler
            logger({
                "rel_url": "FB_getLoginStatus",
                "method": "get",
                "get_params": "",
                "post_params": {},
                "response": response
            });
            if (response && response.status === 'connected') {
                var post_params = {
                    "signed_request": response.authResponse.signedRequest,
                    "user_access_token": response.authResponse.accessToken
                };
                if (enable_sn_features) {
                    FB.api("me/?fields=first_name,last_name", 'get', {}, function (response) {
                        logger({
                            "rel_url": "me/?",
                            "method": "get",
                            "get_params": "fields=first_name,last_name",
                            "post_params": {},
                            "response": response
                        });
                        var params = {name: "Player"};
                        if (response.hasOwnProperty("last_name") && response.hasOwnProperty("first_name")) {
                            params.name = response.first_name + " " + response.last_name;
                        }
                        if (parent.setConnectedMode) {
                            parent.setConnectedMode('fb', params);
                        }
                        if (parent.loadFramePost) {
                            parent.loadFramePost({
                                "action": app_vars.web_server_path + "index.php?dest=1",
                                "target": "content_fr",
                                "method": "POST"
                            }, post_params);
                        }
                    });
                } else {
                    var obj = {};
                    obj.user_sn_id = response.authResponse.userID;
                    obj.signed_request = response.authResponse.signedRequest;
                    obj.sn = 2;
                    if (getGameSwf().snLoginStatusRecieved) {
                        getGameSwf().snLoginStatusRecieved(obj);
                        return true;
                    }
                }
            } else {
                var handleResponse = function (response) {
                    logger({
                        "rel_url": "FB_login",
                        "method": "get",
                        "get_params": "scope=" + app_vars.fb_scope,
                        "post_params": {},
                        "response": response
                    });
                    if (response && response.status == 'connected') {
                        if (enable_sn_features) {
                            var post_params = {
                                "signed_request": response.authResponse.signedRequest,
                                "user_access_token": response.authResponse.accessToken
                            };
                            FB.api("me/?fields=first_name,last_name", 'get', {}, function (response) {
                                logger({
                                    "rel_url": "fb_api_me",
                                    "method": "get",
                                    "get_params": "fields=first_name,last_name",
                                    "post_params": {},
                                    "response": response
                                });
                                var params = {name: "Player"};
                                if (response.hasOwnProperty("last_name") && response.hasOwnProperty("first_name")) {
                                    params.name = response.first_name + " " + response.last_name;
                                }
                                if (parent.setConnectedMode) {
                                    parent.setConnectedMode('fb', params);
                                }
                                if (parent.loadFramePost) {
                                    parent.loadFramePost({
                                        "action": app_vars.web_server_path + "index.php?dest=1",
                                        "target": "content_fr",
                                        "method": "POST"
                                    }, post_params);
                                }
                            });
                        } else {
                            var obj = {};
                            obj.user_sn_id = response.authResponse.userID;
                            obj.signed_request = response.authResponse.signedRequest;
                            obj.sn = 2;
                            if (getGameSwf().snLoginStatusRecieved) {
                                getGameSwf().snLoginStatusRecieved(obj);
                                return true;
                            }
                        }
                    } else {
                        if (getGameSwf().setPausePopupWithLoading) {
                            getGameSwf().setPausePopupWithLoading(false);
                        }
                    }
                };

                FB.login(handleResponse, {scope: app_vars.fb_scope});
            }
        });
    } else if (app_vars.dest) {
        var handleResponse = function (response) {
            logger({
                "rel_url": "FB_login",
                "method": "get",
                "get_params": "scope=" + app_vars.fb_scope,
                "post_params": {},
                "response": response
            });
            if (response && response.status == 'connected') {
                if (response.authResponse.signedRequest) {
                    var app_mode_pos = window.location.search.indexOf("app_mode");
                    var get_params = window.location.search;
                    if (app_mode_pos != -1) {
                        var str = get_params.substr(app_mode_pos, 10);
                        get_params = get_params.replace(str, '');
                    }
                    var post_params = {
                        "signed_request": response.authResponse.signedRequest,
                        "user_access_token": response.authResponse.accessToken
                    };
                    var location = app_vars.web_server_path + get_params;
                    FB.api("me/?fields=first_name,last_name", 'get', {}, function (response) {
                        logger({
                            "rel_url": "fb_api_me",
                            "method": "get",
                            "get_params": "fields=first_name,last_name",
                            "post_params": {},
                            "response": response
                        });
                        var params = {name: "Player"};
                        if (response.hasOwnProperty("last_name") && response.hasOwnProperty("first_name")) {
                            params.name = response.first_name + " " + response.last_name;
                        }
                        if (parent.setConnectedMode) {
                            parent.setConnectedMode('fb', params);
                        }
                        if (parent.loadFramePost) {
                            parent.loadFramePost({
                                "action": location,
                                "target": "content_fr",
                                "method": "POST"
                            }, post_params);
                        }
                    });
                } else {
                    if (getGameSwf().setPausePopupWithLoading) {
                        getGameSwf().setPausePopupWithLoading(false);
                    }
                    return false;
                }
            } else {
                if (getGameSwf().setPausePopupWithLoading) {
                    getGameSwf().setPausePopupWithLoading(false);
                }
                return false;
            }
        };

        FB.login(handleResponse, {scope: app_vars.fb_scope});
    } else {
        top.location.href = 'https://www.facebook.com/dialog/oauth?client_id=' + app_vars.app_id + '&redirect_uri=' + app_vars.redirect_uri + '&scope=' + app_vars.fb_scope + '&response_type=token';
    }
    return false;
}

var dialog_counter = 0;
// Facebook Requests 2.0
function addFBRequest(fb_user_id, message, data, title) {
    var params = {
        method: 'apprequests',
        message: message,
        data: data,
        title: title,
        filters: ['all', 'app_non_users', 'app_users']
    };

    if (typeof(fb_user_id) == "object") {
        if (typeof(fb_user_id.exclude_ids) != 'undefined') {
            params.exclude_ids = fb_user_id.exclude_ids;
        }
    } else if ((typeof(fb_user_id) == "number") || (typeof(fb_user_id) == "string")) {
        params.to = fb_user_id;
    } else {
        params.to = null;
    }
    displayFlashScreenshot(true);
    var local_counter1 = ++dialog_counter;
    FB.ui(params,
        function (response) {
            var local_counter2 = local_counter1;
            logger({
                "rel_url": "FB_ui_apprequests_gift",
                "method": "get",
                "get_params": $.toJSON(params),
                "post_params": {},
                "response": response
            });
            activateTab('play');
            if (response && !response.hasOwnProperty("error_code")) {
                if (!response.hasOwnProperty('to')) {
                    response.to = [];
                    if (typeof fb_user_id == 'object') {
                        response.to[0] = "";
                    } else {
                        response.to = fb_user_id.split(',');
                    }
                    response.request = "";
                    FBRequestSendCoupon(response, data);
                } else if (response.to.length > 1) {
                    FBRequestBatchSendCoupon(response, data);
                } else {
                    FBRequestSendCoupon(response, data);
                }
            } else {
                FBRequestSendCouponCancel(data);
                getGameSwf().resumeGame();
            }
            if (local_counter2 == dialog_counter) {
                hideFlashScreenshot();
            }
        }
    );
}

function FBInviteRequest(ids) {
    var post_id = Math.floor(Math.random() * 100000000) + '' + Math.floor(Math.random() * 100000000);
    if (post_id.length > 16) {
        post_id = post_id.substr(0, 16);
    }
    var data = {
        'event_type': 8,
        'crt': 0,
        'pid': post_id,
        'ch': 'gr',
        'iid': app_vars.user_sn_id,
        'src': 'invite_for_coins',
        'invite': 1
    };

    var params = {
        method: 'apprequests',
        message: app_vars.invite_text,
        data: data,
        title: app_vars.invite_title,
        filters: ['all']
    };
    if (typeof ids == 'object') {
        params.exclude_ids = ids;
    } else if (typeof ids == 'string') {
        params.to = ids;
    }

    displayFlashScreenshot(true);
    FB.ui(params,
        function (response) {
            logger({
                "rel_url": "FB_ui_apprequests_invite",
                "method": "get",
                "get_params": $.toJSON(params),
                "post_params": {},
                "response": response
            });
            hideFlashScreenshot();
            getGameSwf().resumeGame();
            activateTab('play');
            if (response && !response.hasOwnProperty("error_code")) {
                if (!response.hasOwnProperty('to')) {
                    response.to = [];
                    if (typeof ids == 'string') {
                        response.to = ids.split(',');
                    }
                    response.request = "";
                }
                for (var i in response.to) {
                    response.to[i] += "";
                }
                writeLog("invite", "//invited friends=" + response.to.length);
                getGameSwf().inviteSent(data.event_type, response.to, [response.request], data.crt);
            } else {
                getGameSwf().inviteSent('-1');
            }
        }
    );
}

function getFBRequest(request_id, callback) {
    FB.api("/" + request_id + "_" + app_vars.user_sn_id,
        'get',
        {},
        function (response) {
            logger({
                "rel_url": "get_apprequests",
                "method": "get",
                "get_params": "/" + request_id + "_" + app_vars.user_sn_id,
                "post_params": {},
                "response": response
            });
            if (callback) {
                callback(response);
            }
        });
}

var FBRequestsNotifyGameSwf = function (response) {
    getGameSwf().getFBRequestCallback(response);
};

var FBRequestSendCoupon = function (response, data) {
    var coupon_params = {};
    coupon_params.pregift_id = data.pregift_id;
    coupon_params.coupon_id = data.coupon_id;
    coupon_params.recieversCSL = response.to[0];
    coupon_params.request_id = [response.request];
    coupon_params.crt = data.crt;
    coupon_params.event_type = data.event_type;

    getGameSwf().sendCoupon(coupon_params);
    return;
};

var FBRequestBatchSendCoupon = function (response, data) {
    var coupon_params = {};
    coupon_params.coupon_id = data.coupon_id;
    coupon_params.recieversCSL = response.to.join();
    coupon_params.request_id = [response.request];
    coupon_params.crt = data.crt;
    coupon_params.event_type = data.event_type;

    getGameSwf().sendCoupon(coupon_params);
    return;
};

var FBRequestSendCouponCancel = function (data) {
    var coupon_params = {};
    coupon_params.coupon_id = data.coupon_id;
    coupon_params.pregift_id = data.pregift_id;
    coupon_params.recieversCSL = "";
    coupon_params.request_id = [];
    coupon_params.crt = data.crt;
    coupon_params.event_type = data.event_type;

    getGameSwf().sendCouponCancel(coupon_params);
    return;
};

function deleteFBRequest(request_id) {
    FB.api("/" + request_id + "_" + app_vars.user_sn_id,
        'delete',
        {},
        function (response) {
            logger({
                "rel_url": "delete_apprequests",
                "method": "delete",
                "get_params": "/" + request_id + "_" + app_vars.user_sn_id,
                "post_params": {},
                "response": response
            });
            getGameSwf().deleteFBRequestCallback(response);
        });
}

function passFBRequestData(resp) {
    if (typeof resp.error == 'object') {
        return;
    }
    var response_data = $.parseJSON(resp.data);
    var params = {};
    if (typeof response_data.event_type != 'undefined')  params.et = response_data.event_type;
    if (typeof response_data.crt != 'undefined')  params.crt = response_data.crt;
    if (typeof response_data.ch != 'undefined')  params.ch = response_data.ch;
    if (typeof response_data.iid != 'undefined')  params.iid = response_data.iid;
    if (typeof response_data.invite != 'undefined')  params.invite = response_data.invite;
    if (typeof response_data.invite != 'undefined')  params.src = response_data.src;

    var obj_str = "{\"channel\":\"" + params.ch + "\",\"et\":\"" + params.et + "\",\"iid\":\"" + params.iid + "\",\"crt\":\"" + params.crt + "\",\"src\":\"" + params.src + "\"}";

    var response_func = function (resp) {
        var cookie_val = $.parseJSON($.cookie("PRP"));
        delete cookie_val.request_id_c;
        cookie_val.iid_c = params.iid;
        cookie_val.et_c = params.et;
        cookie_val.crt_c = params.crt;
        cookie_val.src_c = params.src;

        var options = {};
        options.expires = app_vars.cookie_life_time;
        options.path = '/';
        options.domain = app_vars.cookie_domain;

        $.cookie("PRP", $.toJSON(cookie_val), options);
    };
    serverCallMediator('Common',
        'UPDATE_REGISTRATION_INFO',
        response_func,
        obj_str);
}

// Facebook Requests 2.0 
function initSupportFB() {
    FB.api('/me', function (response) {
        logger({"rel_url": "me/?", "method": "get", "get_params": "", "post_params": {}, "response": response});
        if (response) {
            var email = response.email ? response.email : '';
            var responseName = response.name ? encodeURIComponent(response.name) : '';
            if (!app_vars.dest) {
                prepareSupportLink({"name": responseName, "email": email});
            } else if (parent.showSupportLink) {
                app_vars.dest_email = email;
                var link_params = "name=" + responseName + "&sn_id=" + app_vars.user_sn_id + "&email=" + email + "&lang=" + app_vars.language;
                parent.showSupportLink(link_params + "&game_id=2&client_type_id=" + app_vars.client_type_id + "&user_id=" +
                    (typeof app_vars.int_user_id == 'undefined' ? '' : app_vars.int_user_id)
                );
            }
        }
    });
}

function prepareSupportLink(params) {
    var href = $("#support_tb").attr("href").replace("&name=", "&name=" + params.name).replace("&email=", "&email=" + params.email);
    $("#support_tb").attr("href", href).css({"display": "inline-block"});
}

// functions for work with tabs
function tabClick(tab) {
    if (app_vars.app_mode == 1) {
        if (!app_vars.is_swf_load_complete) {
            return false;
        }
        switch (tab) {
            case 'buy':
                if (getGameSwf().openPayPagePopup && app_vars.selected_tab != 'paypage_tab') getGameSwf().openPayPagePopup();
                break;
            case 'earn':
                if (getGameSwf().openPayPagePopup) getGameSwf().openPayPagePopup();
                break;
            case 'gift':
                if (getGameSwf().openGiftsPopup) getGameSwf().openGiftsPopup();
                break;
            case 'invite':
                if (getGameSwf().showGuestModeDialog) getGameSwf().showGuestModeDialog("invite");
                break;
            case 'mobile':
                activateTab('mobile');
                break;
            default:
                break;
        }
    } else {
        app_vars.tabClicksNum++;
        switch (tab) {
            case 'game':
                activateTab('play');
                break;
            case 'buy':
                if (app_vars.selected_tab != 'paypage_tab') {
                    app_vars.selected_tab = 'paypage_tab';
                    openPayPagePopup();
                }
                break;
            case 'earn':
                activateTab('offers');
                break;
            case 'gift':
                activateTab('gifts');
                break;
            case 'invite':
                activateTab('invites');
                break;
            case 'mobile':
                activateTab('mobile');
                break;
            case 'loyalty':
                activateTab('loyalty');
                break;
            default:
                break;
        }
    }
    return false;
}

function trackElementClick(tab) {
    if (getGameSwf().trackPage) {
        getGameSwf().trackPage(tab);
    }
}

function serverCallMediator(module, command, success_func, params, error_func) {
    if (app_vars.app_mode == 1) {
        return;
    }
    serverCall(module, command, success_func, params, error_func);
}

// functions for Like InApp
function openInAppMsg(message_id, type) {
    opened_inapp_info['message_id'] = message_id;
    opened_inapp_info['type'] = type;
    opened_inapp_info['count'] = 1;
    if (type == 'like') {
        displayFlashScreenshot(false);
    }
}

function closeInAppMsg(close_btn) {
    if (opened_inapp_info['type'] != 'like') {
        return;
    }
    if (getGameSwf().closeInAppMsg) {
        getGameSwf().closeInAppMsg(opened_inapp_info.message_id);
    }
    hideFlashScreenshot(false);
    opened_inapp_info = [];
}

function closeLikePopup() {
    if (getGameSwf().pageLiked) {
        getGameSwf().pageLiked(0);
    }
    $("div#like_page_con").hide();
}

//POST OG ACTIONS
function postOGAction(data) {
    if (parseInt(granted_perms['publish_actions'], 10) != 1) {
        return;
    }
    var link = app_vars.web_server_path + 'og.php';
    var post_data = '';
    if (data.og_action == 'play') {
        link = link + '?ogt=machine&m=' + data.gstid + (app_vars.dest ? '&site=1' : '');
        post_data = ':play?machine=' + escape(link);
    } else if (data.og_action == 'played_smart') {
        link = link + '?ogt=bonus_game&m=' + data.gstid + (data.hasOwnProperty("index_bonus_game") ? '&bonus_index=' + data.index_bonus_game : '') + (app_vars.dest ? '&site=1' : '');
        post_data = ':master?win_amount=' + data.win_amount + '&bonus_game=' + escape(link);
    } else if (data.og_action == 'rise') {
        link = link + '?ogt=level_up' + (app_vars.dest ? '&site=1' : '');
        post_data = ':rise?lvl=' + data.lvl + '&next_lvl_xp=' + data.next_lvl_xp + '&level_up=' + escape(link);
    } else if (data.og_action == 'wrapp_up') {
        link = link + '?ogt=free_spins' + (app_vars.dest ? '&site=1' : '');
        post_data = ':complete?win_amount=' + data.win_amount + '&free_spins_numb=' + data.free_spins_number + '&free_spins=' + escape(link);
    } else if (data.og_action == 'score') {
        link = link + '?ogt=big_win&m=' + data.gstid + (app_vars.dest ? '&site=1' : '');
        post_data = ':land?win_amount=' + data.win_amount + '&big_win=' + escape(link);
    } else if (data.og_action == 'grab') {
        var user_text = '';
        if (data.hasOwnProperty("user_text") && data.user_text != null) {
            user_text = "&message=" + data.user_text;
        }
        link = link + '?ogt=mega_win&m=' + data.gstid + (app_vars.dest ? '&site=1' : '');
        post_data = ':grab?win_amount=' + data.win_amount + '&mega_win=' + escape(link) + '&fb:explicitly_shared=true' + user_text;
    } else if (data.og_action == 'enter') {
        link = link + '?ogt=' + data.og_object + (app_vars.dest ? '&site=1' : '');
        post_data = ':enter?' + data.og_object + '=' + escape(link);
    } else if (data.og_action == 'compete') {
        link = link + '?ogt=tournament&action=compete' + (app_vars.dest ? '&site=1' : '');
        post_data = ':compete?tournament=' + escape(link);
    } else if (data.og_action == 'win') {
        link = link + '?ogt=tournament&action=win&amount=' + data.amount + (app_vars.dest ? '&site=1' : '');
        post_data = ':win?tournament=' + escape(link);
    } else if (data.og_action == 'finish') {
        link = link + '?ogt=tournament&action=finish' + (app_vars.dest ? '&site=1' : '');
        post_data = ':finish?tournament=' + escape(link);
    } else if (data.og_action == 'is_in_money') {
        link = link + '?ogt=tournament&action=is_in_money' + (app_vars.dest ? '&site=1' : '');
        post_data = ':is_in_money?tournament=' + escape(link);
    } else {
        return;
    }
    FB.api('/me/' + app_vars.app_namespace + post_data,
        'post',
        function (response) {
            logger({
                "rel_url": app_vars.app_namespace + "_" + data.og_action,
                "method": "post",
                "get_params": post_data,
                "post_params": {},
                "response": response
            });
        });
}


function uploadFileToSN(data) {
    data.access_token = fb_login_response.authResponse.accessToken;
    if (getGameSwf().FBUploadImage) {
        getGameSwf().FBUploadImage(data);
    }
}

function flashCallBack(data) {
    if (getGameSwf().responseJS) {

        data.error = {
            code: 0,
            message: ""
        };
        getGameSwf().responseJS(data.id, data);
    }
}

function logBrag(game_type_id) {
    var d = new Date();
    writeLog("brag", game_type_id + "//" + d.getTime());
}

/*! file => main.js */
function checkForceRefresh() {
    clearInterval(refresh_timer);
}

var app_vars = {
    'is_logedin': false,
    'waiting_for_login': [],
    'server_call_id': 0,
    'server_call_queue': [],
    'is_swf_load_complete': false,
    'fb_drp_waiting': null,
    'app_mode': 0, // SN mode
    'paypage_displayed': false,
    'tabClicksNum': 0,
    'selected_tab': 'game_tab',
    'user_tier': null,
    'userSRPoints': null,
    'depositor': null,
    'loyalty_tiers': ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'royal_diamond'],
    'card_payments_on': false,
    'preferred_payment_method': 0
};

var paypageTrackObject = {
    'transactionFunnelOld': {
        'buy_coins': 0,
        'buy_QB': 0,
        'buy_PO': 0,
    }
};
var timers = {
    'checkSessTimerSMID': null
};
var userSessionData = {
    "LPData": {},
    "LPServiceStatus": 0, // serviceStatus: 0 - all OFF, 1 - TRS ON, 2 - Loyalty ON
    "userSessionID": 0,
    "contestsBarStatus": 0,  // initial value - width of contests bar = 0
    "paypageImagesNotLoaded": {},
    "paypageImages": {},
    "paypageData": {},
    "paypageErrors": false,
    "paypageTRS": true,
    "paypageTREnabled": false,
    "paypageTierBase": 0,
    "paypageID": 0,
    "paypageCurrencyResponce": false,
    "currentPaypageFlow": "",
    "userInfo": {},
    "quickBuyEnabled": false,
    "chipsInfoReady": false,
    "payPageOpens": false
};

var currencyDataArray = [];
var convertCardInfo = null;
var updateQuickBuy;

/**
 * Prepare new buy options for PP and QB
 * @param object responceNPS Object with responce from NPS
 * @returns void
 */
function setPaymentPageInfo(responceNPS) {
    //check for "resultCode" : 1
    if (responceNPS.resultCode == 1) {
        // Payment Page doesn't changed
        return;
    }

    //set default PP tier image
    if (!!responceNPS.useDefaultImages && defaultPPImagesUrls) {
        var service = userSessionData.LPServiceStatus == 1 ? 0 : 1;
        responceNPS.result.paymentPage.localizedImagesUrls.tierIconUrl = defaultPPImagesUrls[service][responceNPS.result.userTier - userSessionData.paypageTierBase];
    }

    //set TRS available
    if (responceNPS.hasOwnProperty("paypageTRS")) {
        userSessionData.paypageTRS = responceNPS.paypageTRS;
    }

    currencyDataArray = [];
    var uniqueFlowID = app_vars.user_sn_id + "_" + (new CustomDate().getTimestamp());

    try {
        currencyDataArray = responceNPS.result.paymentPage.options;

        //sort options
        currencyDataArray.sort(function (par1, par2) {
            return (par2.optionId - par1.optionId);
        });

        for (var index in currencyDataArray) {
            $("#pp_rb_" + index).attr("value", $.toJSON(currencyDataArray[index]));
            $("#total_sum_" + index).html(separateWithComma(currencyDataArray[index]["quantity"]));

            var realPrice = parseFloat(currencyDataArray[index]["cost"], 10);
            $("#real_price_" + index).html("$" + realPrice + ' <span class="textUSD">USD</span>');

            //fill trs data
            if (currencyDataArray[index]["totalRewards"]) {
                $("#trs_" + index + " i").html(currencyDataArray[index]["cost"]);
                $("#trs_" + index + " strong > i").html(currencyDataArray[index]["totalRewards"]);
            } else {
                userSessionData.paypageTRS = false;
            }
        }

        updateTRSData();

        userSessionData.chipsInfoReady = true;
    } catch (e) {
        userSessionData.paypageErrors = uniqueFlowID;
        logPaypageErrorData(responceNPS, 'CDR_exception', e);
    }

    //something went wrong
    if (currencyDataArray.length < 6) {
        userSessionData.paypageErrors = uniqueFlowID;
        logPaypageErrorData(responceNPS, 'CDR_less_opt');
    } else {
        userSessionData.paypageErrors = false;
    }

    if (!app_vars.smid && !app_vars.dest && app_vars.app_mode != -1) {
        updateQuickBuyValues(currencyDataArray, responceNPS.result.paymentPage.localizedImagesUrls);
    }
    userSessionData.LPData.tierId = responceNPS.result.userTier;
    userSessionData.LPData.paypageTierURL = responceNPS.result.paymentPage.localizedImagesUrls.tierIconUrl;
    updatePaymentPage(responceNPS.result.paymentPage.localizedImagesUrls);
    updateTotalValueForLP();

    $("#content, .pp_buy_con").show();
    $("#loading_con").hide();

    if (app_vars.fb_drp_waiting != null) {
        convertCredits(app_vars.fb_drp_waiting.pin);
    }

    userSessionData.paypageID = responceNPS.result.paymentPage.pageId;
}

/**
 * Log paypage errors
 * @param object response Responce from payment server
 * @param string place Place, where log was called
 * @param object exc Error exception
 * @returns void
 */
function logPaypageErrorData(response, place, exc) {
    place = !!place ? place : "no place";
    exc = !!exc ? "//exception=" + (!!exc.message ? exc.message : "no message") : "";
    userSessionData.paypageCurrencyResponce = response;
    writeLog("payment_errors", userSessionData.paypageErrors + "//responce=" + $.toJSON(userSessionData.paypageCurrencyResponce) + "//place=" + place + exc);
}

function serverCall(module, command, success_func, params, error_func) {
    if (!app_vars.is_logedin) {
        app_vars.waiting_for_login.push({
            'module': module,
            'command': command,
            'success_func': success_func,
            'params': params,
            'error_func': error_func
        });
        return;
    }
    app_vars.server_call_id++;
    var call_id = 'call_' + app_vars.server_call_id;
    app_vars.server_call_queue[call_id] = {
        success_func: success_func,
        error_func: error_func
    };
    if (getGameSwf().crossDomainCall) {
        getGameSwf().crossDomainCall(call_id, module, command, params);
    }
}

/**
 * Process transaction result
 * @param int call_id Call identificator
 * @param object response Result data for transaction creation
 * @returns void
 */
function playticrossCallResult(call_id, response) {
    app_vars.server_call_queue[call_id].success_func(response);
    delete app_vars.server_call_queue[call_id];
}

/**
 * Called by flash after login complete
 * @param boolean is_first_login Is first login
 * @param int userID ID of user
 * @param int userSessionID Session ID for user
 * @returns void
 */
function loginComplete(is_first_login, userID, userSessionID) {
    loadExternalsAfterLogin();
    loadPaypage();
    if (app_vars.dest && app_vars.app_mode != 1) {
        try {
            parent.updateSupportLink(userID);
        } catch (e) {
        }
    }
    app_vars.is_logedin = true;

    userSessionData.userSessionID = userSessionID;

    if (app_vars.waiting_for_login.length > 0) {
        for (var i in app_vars.waiting_for_login) {
            var call = app_vars.waiting_for_login[i];
            serverCall(call.module, call.command, call.success_func, call.params, call.error_func);
        }
        app_vars.waiting_for_login = [];
    }

    app_vars.int_user_id = (typeof userID != 'undefined') ? userID : 0;

    if (app_vars.smid) {
        if ($.cookie("smidsessid") == 1) {
            timers.checkSessTimerSMID = setInterval(checkSMIDSessionCookie, 5000);
        } else {
            forceFlashSessionExpire();
        }
        cardPurchase.userEmail = app_vars.smid_email;
    } else if (app_vars.dest) {
        cardPurchase.userEmail = app_vars.dest_email;
    } else {
        $("#support_tb").attr("href", $("#support_tb").attr("href") + (!!userID ? userID : "")).css({"display": "inline-block"});
    }

    if (is_first_login && app_vars.app_mode != 1) {
        if (typeof updateRegInfo == 'function') {
            updateRegInfo();
        }

        $('#partners_pixel_install').attr('src', app_vars.partners_pixel_install_link + "&int_user_id=" + app_vars.int_user_id);
        $('#click_wall_pixels').attr('src', app_vars.click_wall_pixel_install_link + "user_sn_id=" + userID + "&int_user_id=" + userID);
        trackUserInstallApp();
    } else if (!is_first_login && app_vars.app_mode != 1) {
        loginPixels();
    }

    if (app_vars.is_swf_load_complete === true && app_vars.is_logedin === true) {
        creditCardsAbilityCheckout();
    }

    trackUserLoggedIn();
}

/**
 * Start FB promotion. Called from flash
 * @returns void
 */
function startFBPromotion() {
    var checkFBPromotionCaller = setInterval(function () {
        if (!!fb_login_response.authResponse) {
            checkFBPromotion({isLogin: true});
            clearInterval(checkFBPromotionCaller);
        }
    }, 500);
}

/**
 * Check FB promotion
 * @param object data {boolean onLogin Flag that function called on login; boolean showPopup Show popap or not (default TRUE); object paymentData Object with payment data (default NULL)}
 * @returns void
 */
function checkFBPromotion(data) {
    if ((app_vars.dest || app_vars.smid) && data.isLogin) {
        return;
    }

    callFBData(function (response) {
        if ((!response.is_eligible_promo || app_vars.dest || app_vars.smid) && data.isLogin) {
            return;
        }

        //show promotion popup on flash
        if (getGameSwf().fbPromotionStatus) {
            data.needShowPopup = typeof(data.needShowPopup) == 'undefined' || data.needShowPopup;
            data.buyData = typeof(data.buyData) == 'undefined' ? null : data.buyData;
            data.needShowError = typeof(data.needShowError) == 'undefined' ? true : data.needShowError;
            getGameSwf().fbPromotionStatus(!!response.is_eligible_promo, data);
        }
    }, 0, "me", "fields=is_eligible_promo", "get", 0);
}

function checkSMIDSessionCookie() {
    if ($.cookie("smidsessid") == 0) {
        forceFlashSessionExpire();
    }
}

function forceFlashSessionExpire() {
    if (getGameSwf().forceSessionExpired) {
        getGameSwf().forceSessionExpired(true);
        clearInterval(timers.checkSessTimerSMID);
    }
}

function embedSWF(div_id, game_swf_path, width, height, bgcolor, wmode, flash_vars, success_func) {
    flash_vars['swf_object_name'] = div_id;
    var params = {
        wmode: wmode,
        bgcolor: bgcolor,
        menu: "false",
        scale: "noscale",
        allowScriptAccess: "always",
        allowfullscreen: true,
        allowFullScreenInteractive: true
    };
    var attributes = {};
    swfobject.embedSWF(game_swf_path, div_id, width, height, "9.0.0", null, flash_vars, params, attributes, success_func);
}

function swf_load_complete() {
    app_vars.is_swf_load_complete = true;
    $('#html_menu a').attr({"class": "menu", "href": "#"});
    $('#game_tab').addClass("active");

    if (app_vars.is_swf_load_complete === true && app_vars.is_logedin === true) {
        creditCardsAbilityCheckout();
    }

    openTab(app_vars.open_tab);
}

function creditCardsAbilityCheckout() {
    if (app_vars.dest || app_vars.smid) {
        app_vars.card_payments_on = (getGameSwf().userCanPayByCreditCard() === true && window.parent.app_vars.allowedCountryCodeCardPayments)//allowedCountryCodeCardPayments
            ? true
            : false;

        if (app_vars.card_payments_on === true) {
            window.parent.settingsDialog_vsPayments.showSettingsMenuItem();
            getGameSwf().askPreferredPaymentMethod(); //watch getPreferredPaymentMethod()
        } else {
            if (app_vars.dest === true) {
                window.parent.settingsDialog_vsPayments.hideSettings();
            } else if (app_vars.smid === true) {
                window.parent.settingsDialog_vsPayments.showBasicSettings();
            }
        }
    }
}

function userDataReady() {
    if (app_vars.open_tab == 'buy') {
        openPayPagePopup();
    }
}

function tabClickHandler(tab_name, target_view_element) {
    $('#html_menu').children('.menu').attr("class", "menu");
    if (tab_name) $('#' + tab_name).attr("class", "menu active");
    setGameVisibility(false);
    $('.tabs_view_element').attr("class", "tabs_view_element hidden_element");
    $('#like_page_con').hide();
    resizeHeight(0);
    if (target_view_element != 'paypage_con' || target_view_element != 'pp_maintenance') {
        $("#tabs_view_stack").css("overflow-y", "hidden");
    }
    if (app_vars.paypage_displayed && getGameSwf().onPayPageClose && target_view_element != 'paypage_con') {
        app_vars.paypage_displayed = false;
        getGameSwf().onPayPageClose(paypageTrackObject);
    }
    var str = "";
    switch (target_view_element) {
        case 'game_swf_con':
            setGameVisibility(true);
            str = "nev_bar_game";
            target_view_element = 'gsc'; // fix
            hideFlashScreenshot(false);
            if ($("#tabs_view_stack").hasClass("over_scroll")) {
                $("#tabs_view_stack").scrollLeft(180);
            }
            break;
        case 'gifts_con':
            if (opened_inapp_info['type'] == 'like') {
                displayFlashScreenshot(false);
            }
            setGameVisibility(true);
            hideFlashScreenshot(false);
            darkeningPage(0);
            str = "nev_bar_free_gifts";
            break;
        case 'invites_con':
            if (opened_inapp_info['type'] == 'like') {
                displayFlashScreenshot(false);
            }
            setGameVisibility(true);
            str = "nev_bar_invite_friends";
            hideFlashScreenshot(false);
            darkeningPage(0);
            break;
        case 'paypage_preloader':
            setGameVisibility(true);
            displayFlashScreenshot(true, 0);
            darkeningPage(1);
            if (opened_inapp_info['type'] == 'like') {
                $("#inapp_like").css("display", "none");
                $("#imageLikeInapp").css("top", "-10000px");
            }
            break;
        case 'paypage_con':
            displayFlashScreenshot(true, 0);
            str = "nev_bar_buy_coins";
            app_vars.paypage_displayed = true;
            break;
        case 'pp_maintenance':
            str = "nev_bar_buy_coins";
            app_vars.paypage_displayed = true;
            break;
        case 'offers_con':
            setGameVisibility(true);
            loadOffersPopup();
            str = "nev_bar_earn_coins";
            hideFlashScreenshot(false);
            darkeningPage(0);
            break;
        case 'loyalty_tab':
            if (opened_inapp_info['type'] == 'like') {
                displayFlashScreenshot(false);
            }
            hideFlashScreenshot(false);
            darkeningPage(0);
            break;
        case 'mobile_con':
            str = "nev_bar_mobile";
            setGameVisibility(true);
            displayFlashScreenshot(true, 0);
            darkeningPage(1);
            if (opened_inapp_info['type'] == 'like') {
                $("#inapp_like").css("display", "none");
                $("#imageLikeInapp").css("top", "-10000px");
            }
            break;
    }
    if (getGameSwf().onExternalTrackerEvent && str != "") {
        getGameSwf().onExternalTrackerEvent(str);
    }

    $('#' + target_view_element).attr("class", "tabs_view_element");
}

function resizeHeight(height) {
    height = height ? height : app_vars.swf_height + "px";
    $('#tabs_view_stack').css("height", height);
}

function showInviteTab() {
    app_vars.selected_tab = 'invite_tab';
    tabClickHandler('invite_tab', 'invites_con');
}

function showFBInviteDialog(exclude_ids) {
    getFriendsWithAppIds(FBInviteRequest, exclude_ids);
}

function array_unique(inputArr) {
    var key = '', tmp_arr2 = [], val = '';
    var __array_search = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return true;
                }
            }
        }
        return false;
    };

    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key];
            if (false === __array_search(val, tmp_arr2)) {
                tmp_arr2.push(val);
            }
        }
    }
    return tmp_arr2;
}

function closePaypage() {
    initCurrentPaypageFlow("buy_coins");
    paypageTrackObject.is_closed_by_x_button = true;

    //send to flash info about paypage
    if (getGameSwf().sendPayPageClose) {
        paypageTrackObject.transactionFlow = "buy_coins";
        setTrackingFunnelID();
        getGameSwf().sendPayPageClose(paypageTrackObject);
    }
    activateTab('play');
}

function closePPMaintenance() {
    activateTab('play');
}

// DEPRECATED
function showGameTab() {
    activateTab('play');
}

function activateTab(tab, data) {
    if (!app_vars.is_swf_load_complete) {
        return false;
    }
    if (app_vars.selected_tab == 'paypage_tab' && tab != 'pay_loader' && tab != 'paypage' && (typeof data == 'undefined' || !data.hasOwnProperty("cancel"))) {
        userSessionData.paypageData = {};
    }
    switch (tab) {
        case 'loyalty':
            if (app_vars.selected_tab != 'loyalty_tab') {
                app_vars.selected_tab = tab + '_tab';
                if (getGameSwf().showLoyaltyPopup) {
                    getGameSwf().showLoyaltyPopup();
                }
                tabClickHandler(tab + '_tab', 'game_swf_con');
                if (userSessionData.LPServiceStatus == 1) {
                    displayFlashScreenshot(true);
                }
            }
            break;
        case 'play':
            app_vars.selected_tab = 'game_tab';
            if (getGameSwf().showGame) {
                getGameSwf().showGame();
            }
            tabClickHandler('game_tab', 'game_swf_con');
            if (opened_inapp_info['type'] == 'like') {
                displayFlashScreenshot(false);
            }
            break;
        case 'pay_loader':
            app_vars.selected_tab = 'paypage_tab';
            tabClickHandler('paypage_tab', 'paypage_preloader');
            break;
        case 'paypage':
            if (app_vars.selected_tab == 'paypage_tab')
                tabClickHandler('paypage_tab', 'paypage_con');
            break;
        case 'offers':
            app_vars.selected_tab = 'offers_tab';
            tabClickHandler('offers_tab', 'offers_con');
            break;
        case 'gifts':
            app_vars.selected_tab = 'gifts_tab';
            if (getGameSwf().showGame) {
                getGameSwf().showGame();
            }
            getGameSwf().openGiftsPopup();
            tabClickHandler('gifts_tab', 'gifts_con');
            break;
        case 'mobile':
            app_vars.selected_tab = 'mobile_tab';
            tabClickHandler('mobile_tab', 'mobile_con');
            break;
        default:
            return;
    }
}

/**
 * Manage loyalty tab
 * @param int state 0 - OFF, 1 - TRS, 2 - Loyalty
 * @returns void
 */
function manageLoyaltyTab(state) {
    if (!$("a#loyalty_tab").length && state) {
        var name = state == 1 ? app_vars.trsTabLable : app_vars.loyaltyTabLable;
        $("div#html_menu a").last().after('<a href="#" target="_top" id="loyalty_tab" class="menu" onclick="tabClick(\'loyalty\'); return false;">' + name + '</a>');
    } else if (!state) {
        $("a#loyalty_tab").remove();
    }
    $(".policy_tb").hide();
    $(".policy_tb_" + state).css("display", "inline-block");
}

function removeTab(tab) {
    $(tab).remove();
}

function openPayPagePopup() {
    if (!app_vars.is_swf_load_complete) {
        return false;
    }
    getGameSwf().openPayPagePopup();
    return false;
}

function loadPaypage() {
    userSessionData.payPageOpens = false;
    if (getGameSwf().getPaymentPageInfo) {
        getGameSwf().getPaymentPageInfo();
    }
}

/**
 * Update TR status flag
 * @param boolean statusFlag TR allowed/not allowed
 * @returns void
 */
function updateTRSStatusFlag(statusFlag) {
    userSessionData.paypageTREnabled = statusFlag;
    updateTRSData();
}

/**
 * Flash calls when user get new tier
 * @param object data Data about user tier
 * @param int serviceStatus 0 - all OFF, 1 - TRS ON, 2 - Loyalty ON
 * @param int userSRPoints Amount of user SR points
 * @returns void
 */
function updateUserTier(data, serviceStatus, userSRPoints) {
    var paypageChanged = data.tierId != userSessionData.LPData.tierId || userSessionData.LPServiceStatus != serviceStatus;
    data.paypageTierURL = userSessionData.LPData.paypageTierURL;
    userSessionData.LPData = data;
    userSessionData.LPServiceStatus = serviceStatus;

    if (!userSessionData.LPData.hasOwnProperty("tierId") || userSessionData.LPData.tierId == -1 || !userSessionData.LPServiceStatus) {
        app_vars.user_tier = 0 + userSessionData.paypageTierBase;
    } else {
        app_vars.user_tier = userSessionData.LPData.tierId;
    }

    updateTRSData();

    if (!!userSessionData.LPData.paypageTierURL && userSessionData.LPServiceStatus) {
        $("div.pp_lp_status").css("background-image", "url(" + userSessionData.LPData.paypageTierURL + ")");
        $(".pp_sr_points").css('display', 'block');
    } else {
        $("div.pp_lp_status").css("background-image", "none");
        $(".pp_sr_points").hide();
    }

    app_vars.userSRPoints = userSRPoints;
    ObserverObj.fireEvent('mythings_login');

    //manage footer links on sm.com
    if (app_vars.dest || app_vars.smid) {
        $(parent.document).find(".policy_tab").hide();
        $(parent.document).find(".policy_tab_" + serviceStatus).css('display', 'inline-block');
    }

    if (paypageChanged) {
        loadPaypage();
    }
}

/**
 * Update TRS data on the bottom of PP
 * @returns void
 */
function updateTRSData() {
    //TRS is OFF
    if (userSessionData.LPServiceStatus != 1 || !userSessionData.paypageTREnabled) {
        $(".pp_main_page .TRSsection").hide();
        return;
    } else {
        $(".pp_main_page .TRSsection").show();
    }

    if (userSessionData.paypageTRS) {
        $(".pp_main_page .TRSlogin").hide();
        $(".pp_main_page .TRSdata").show();
    } else {
        $(".pp_main_page .TRSlogin").show();
        $(".pp_main_page .TRSdata").hide();
    }
}

/**
 * Flash calls when user reaches new level
 * @param event trigger Event name (not used)
 * @param object data Data about user
 * @returns void
 */
function setUserInfo(trigger, data) {
    userSessionData.userInfo = data;
    loadPaypage();
    updateUserLevelOnPP();
}

/**
 * Updates PP (tier icon, images, user level)
 * @param object imagesData Object with PP images URLs
 * @returns void
 */
function updatePaymentPage(imagesData) {
    if (!userSessionData.LPData.paypageTierURL || !userSessionData.LPServiceStatus) {
        $(".pp_lp_status").css("background-image", "");
        $(".pp_sr_points").css('display', 'none');
    } else {
        $("div.pp_lp_status").css("background-image", "url(" + userSessionData.LPData.paypageTierURL + ")");
        $(".pp_sr_points").css('display', 'block');
    }
    updateUserLevelOnPP();

    userSessionData.paypageImages = {
        "bgImgUrl": imagesData.backgroundUrl,
        "closeImgUrl": imagesData.closeButtonUrl,
        "submitImgUrl": imagesData.buyButtonUrl
    };
    loadImages(userSessionData.paypageImages, paypageImgLoaded, paypageImgFailed);

    //something went wrong
    if (userSessionData.paypageErrors) {
        //log info about it
        logPaypageErrorData(userSessionData.paypageCurrencyResponce);
    }
}

/**
 * Update user level on Payment Page
 * @returns void
 */
function updateUserLevelOnPP() {
    $(".pp_top_text_lvl").html(userSessionData.userInfo.level);
}

function updateTotalValueForLP() {
    var opts = $("div.pp_content input[name='currency_opt']");
    var correctAmounts = true;

    for (var i = 0; i < opts.length; i++) {
        var ind = (opts.length - 1 - i);
        var cost_data = $.parseJSON(opts[i].value);
        $("span#sr_points_" + ind).html("+" + ("" + cost_data.srPoints).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') + " " + (userSessionData.LPServiceStatus == 1 ? "Status" : "SR") + " Points");
        if (!cost_data.srPoints) {
            correctAmounts = false;
        }
    }

    if (correctAmounts && userSessionData.LPServiceStatus) {
        $(".pp_content .pp_sr_points").show();
    } else {
        $(".pp_content .pp_sr_points").hide();
    }
}

function showPPLoader() {
    activateTab('pay_loader');
}

/**
 * Show payment page by flash call
 * @param object responseNPS Object with server responce
 * @returns void
 */
function showPayPage(responce) {
    var responceNPS = responce.paymentPageInfo;

    initCurrentPaypageFlow("buy_coins");
    fillTrackObject(responce);

    userSessionData.payPageOpens = true;
    app_vars.tabClicksNum++;

    //responceNPS.resultCode: 0 - success; -1 - at any error; 1 - if payment page has not changed for user
    if (responceNPS.resultCode == 0) {
        setPaymentPageInfo(responceNPS);
    } else if (!$.isEmptyObject(userSessionData.paypageImagesNotLoaded)) {
        loadImages(userSessionData.paypageImagesNotLoaded, paypageImgLoaded, paypageImgFailed);
    } else {
        sendPaypageTracking(false);
        activateTab('paypage');
    }
}

function fillTrackObject(data) {
    paypageTrackObject = {
        'transactionFunnelOld': {
            'buy_coins': 0,
            'buy_QB': 0,
            'buy_PO': 0,
        }
    };

    if (!!data) {
        paypageTrackObject = data;
        userSessionData.paypageData = !!data.impression_data ? data.impression_data : {};
    }
}

function showPaypageMaintenance() {
    tabClickHandler('paypage_tab', 'pp_maintenance');
}

function paypageImgLoaded(data) {
    sendPaypageTracking(false);
    var not_cached = {};
    data.each(function () {
        not_cached[this.id] = this.src;
    });
    $(".pp_girl").css("background-image", "url(" + (not_cached.hasOwnProperty('bgImgUrl') ? not_cached.bgImgUrl : userSessionData.paypageImages.bgImgUrl) + ")");
    $(".pp_close input").css("background-image", "url(" + (not_cached.hasOwnProperty('closeImgUrl') ? not_cached.closeImgUrl : userSessionData.paypageImages.closeImgUrl) + ")");
    $(".pp_buy_btn").css("background-image", "url(" + (not_cached.hasOwnProperty('submitImgUrl') ? not_cached.submitImgUrl : userSessionData.paypageImages.submitImgUrl) + ")");
    activateTab('paypage');
}

function paypageImgFailed(proper, broken) {
    sendPaypageTracking(true);
    userSessionData.paypageImagesNotLoaded = {};
    broken.each(function () {
        var c_pos = this.src.indexOf("?c=");
        var link = this.src;
        if (c_pos != -1) {
            link = link.replace(link.substr(c_pos, 16), '');
        }
        link += '?c=' + CustomDateObj.getTimestamp();
        userSessionData.paypageImagesNotLoaded[this.id] = link;
    });
    proper.each(function () {
        userSessionData.paypageImages[this.id] = this.src;
    });
    userSessionData.paypageData.pp_impression_success_event_id = ''; // when PP impression fails - pp impression event id should be empty
}

function sendPaypageTracking(errors) {
    if (!userSessionData.payPageOpens) {
        return;
    }

    //prepare data for flash
    paypageTrackObject.bgImgUrl = userSessionData.paypageImages.bgImgUrl;
    paypageTrackObject.submitImgUrl = userSessionData.paypageImages.submitImgUrl;
    paypageTrackObject.payPageErrors = !!paypageTrackObject.payPageErrors || userSessionData.paypageErrors || errors;
    paypageTrackObject.transactionFlow = "buy_coins";
    setTrackingFunnelID();

    //send to flash info about paypage
    if (getGameSwf().sendPayPageData) {
        getGameSwf().sendPayPageData(paypageTrackObject);
    }
}

function loadImages(images, successFunc, failFunc) {
    var holder = $('<div></div>');
    var img_tags = '';
    for (var i in images) {
        if (images.hasOwnProperty(i)) {
            img_tags += '<img id="' + i + '" src="' + images[i] + '" width="1" height="1">';
        }
    }
    holder.append(img_tags);
    holder.imagesLoaded(function (images, proper, broken) {
        if (broken.length == 0) {
            successFunc(images);
        } else {
            failFunc(proper, broken);
        }
    });
}

/**
 * Buy from quick buy
 * @param boolean buyButtonClick Is clicked on Buy button
 * @returns boolean FALSE
 */
function buyFromQB(buyButtonClick) {
    initCurrentPaypageFlow("buy_QB");
    if (getGameSwf().onExternalTrackerEvent) {
        getGameSwf().onExternalTrackerEvent("quick_buy");
    }
    qb_mousedown(false);
    displayFlashScreenshot(true, 0);
    darkeningPage(1);

    var tran_token = generateTranToken();
    var selectedOption = $("select#pay_selector").length ? $("select#pay_selector") : $("input#quick_buy_selected");
    var cost_data = $.parseJSON(selectedOption.val());

    var buyCoinsObject = {
        'paymentPageId': userSessionData.paypageID,
        'tran_token': tran_token,
        'paymentOptionId': cost_data["optionId"],
        'transactionSourceTypeId': 15 //ID for quick buy
    };

    var successTranansactionCreation = function (response) {
        setFBCoinsPurchaseParams(response, tran_token, cost_data);
    };
    var errorTransactionCreation = function (response) {
        if (response.response_code == -706) {
            getGameSwf().transactionFailed(response.response_str);
        }
    };

    //prepare data for flash
    paypageTrackObject.purchaseNumber = cost_data["optionId"];
    paypageTrackObject.purchaseCost = parseFloat(cost_data["cost"]);
    paypageTrackObject.purchaseAmount = cost_data['quantity'];
    paypageTrackObject.bgImgUrl = userSessionData.paypageImages.bgImgUrl;
    paypageTrackObject.submitImgUrl = userSessionData.paypageImages.submitImgUrl;
    paypageTrackObject.payPageErrors = !!paypageTrackObject.payPageErrors || userSessionData.paypageErrors;
    paypageTrackObject.transactionFlow = "buy_QB";
    paypageTrackObject.quickBuyButtonClick = !!buyButtonClick;
    setTrackingFunnelID();

    //send to flash info about paypage
    if (getGameSwf().sendPayPageBuyCoins) {
        getGameSwf().sendPayPageBuyCoins(paypageTrackObject);
    }

    createTransaction(buyCoinsObject, successTranansactionCreation, errorTransactionCreation);
    return false;
}

function updateQuickBuyValues(currencyDataArr, imagesData) {
    var data = [], c = 6; // 6 - number of payment options
    for (var index in currencyDataArr) {
        var paySelectorOption, currData = $.toJSON(currencyDataArr[index]);
        var html = separateWithComma(currencyDataArr[index]["quantity"]) + " Coins for $" + parseFloat(currencyDataArr[index]["cost"]) + " USD";

        if ($("select#pay_selector").length) {
            paySelectorOption = $("select#pay_selector #opt_" + index);
            paySelectorOption.attr("value", currData).html(html);
            if (currencyDataArr[index].defaultOption) {
                paySelectorOption.attr("selected", "selected");
            }
        } else {
            data[--c] = {
                text: $.trim(html),
                value: currData,
                selected: $("#qb_opt" + index).parent().hasClass("dd-option-selected"),
                description: undefined,
                imageSrc: undefined //keep it lowercase for HTML5 data-attributes
            };
        }
    }

    if ($("div#pay_selector").length == 0) {
        $("#pay_selector").ddslick({
            onSelected: function (selectedData) {
            }
        });
    } else {
        $("#pay_selector").ddslick('update_options', {opts: data});
    }

    if (userSessionData.quickBuyEnabled) {
        displayQuickBuy(true);
    }
    setOrResetUpdateQuickBuyTimer();
}

function displayQuickBuy(display) {
    var d = (display && userSessionData.chipsInfoReady) ? 'block' : 'none';
    $("div.pay_selector_con").css("display", d);
    userSessionData.quickBuyEnabled = display;
}

function setOrResetUpdateQuickBuyTimer() {
    if (typeof updateQuickBuy != 'undefined') {
        clearTimeout(updateQuickBuy);
    }
    updateQuickBuy = setTimeout("loadPaypage()", app_vars.quick_buy_update_interval * 1000);
}

function qb_mousedown(flag) {
    if (flag) {
        $("#quick_buy_submit").removeClass("quick_buy_submit").addClass("quick_buy_submit_down");
    } else {
        $("#quick_buy_submit").removeClass("quick_buy_submit_down").addClass("quick_buy_submit");
    }
}

var cardPurchase = {
    isPayment: false,
    isAblePopup: false,
    isBuyCoins: false,
    timeout: '',

    userEmail: '',
    paymentData: {},
    wnd: '',
    tran_pp_url: '',

    showPopup: function () {
        parent.displayFlashScreenshot();
        $('#game_wrapper_cover').hide();

        //eventStream Impression method
        cardPurchase.chosePaymentMethodDialogImpression();

        if (cardPurchase.isPayment === true) {
            cardPurchase.showBasicForm();
        } else {
            if (app_vars.dest === true) {
                cardPurchase.showFbSettingsForm();
            } else if (app_vars.smid === true) {
                cardPurchase.showEmailSettingsForm();
            }
        }

        $('#PayPal_Radio #Card_Radio', window.parent.document).change(function () {
            cardPurchase.rewriteSubmitClick();
        });

        $('#div_overlay', window.parent.document).show();
        $('#choosePayentType_div', window.parent.document).show();
        $('#rememberChoice', window.parent.document).attr('checked', true);

        $('#choosePayentType_div > .x_bttn_container > .x_bttn', window.parent.document).unbind('click');
        $('#choosePayentType_div > .x_bttn_container > .x_bttn', window.parent.document).click(function () {
            var preferredPaymentMethod = 0;
            if ($('#Card_Radio', window.parent.document).is(':checked') === true) {
                preferredPaymentMethod = 19;
            } else {
                preferredPaymentMethod = 2;
            }

            if (cardPurchase.isPayment === true) {
                cardPurchase.chosePaymentDialogUserAction(paypageTrackObject.transactionFunnel, preferredPaymentMethod, 0);
            }

            cardPurchase.hidePopup();
        });
    },

    hidePopup: function () {
        clearTimeout(cardPurchase.timeout);
        $('#choosePayentType_div', window.parent.document).hide();
        $('#div_overlay', window.parent.document).hide();
        $('#game_wrapper_cover').hide();
        $('#CardsPaymentModal_div > .container', window.parent.document).html('');

        parent.hideFlashScreenshot();

        cardPurchase.isPayment = false;
        activateTab('play');
    },

    settingsHidePopup: function () {
        $('#paymentChooseForm', window.parent.document).slideUp('slow');
        $('.settingsMenuFeedback', window.parent.document).slideDown('slow');
        cardPurchase.timeout = setTimeout(function () {
            if (app_vars.smid === true) {
                $('.settingsMenuFeedback', window.parent.document).slideUp('slow');
                $('#paymentChooseForm', window.parent.document).slideDown('slow');
            } else {
                cardPurchase.hidePopup();
            }
        }, 3000);
    },

    hideIframePopup: function (cancel) {
        $('#choosePayentType_div', window.parent.document).hide();
        $('#div_overlay', window.parent.document).hide();
        $('#game_wrapper_cover', window.parent.document).hide();
        $('#CardsPaymentModal_div', window.parent.document).hide();
        $('#CardsPaymentModal_div > #netBanxFrame', window.parent.document).removeAttr('src');
        parent.hideFlashScreenshot();

        if (!cancel) {
            getGameSwf().cancelTransaction(cardPurchase.paymentData.tran_id);
        }

        activateTab('play', {'cancel': false});
    },

    getPreferredPaymentMethod: function () {
        switch (app_vars.preferred_payment_method) {
            case 19:
                $('#Card_Radio', window.parent.document).attr('checked', true);
                cardPurchase.isPayment === true
                    ? cardPurchase.showNetbanxModal()
                    : cardPurchase.showPopup();
                break;
            case 2:
                $('#PayPal_Radio', window.parent.document).attr('checked', true);
                cardPurchase.isPayment === true
                    ? cardPurchase.showPayPalWindow()
                    : cardPurchase.showPopup();
                break;
            default :
                $('#PayPal_Radio', window.parent.document).attr('checked', true);
                cardPurchase.showPopup();
                break;
        }
    },

    rewriteSubmitClick: function () {
        $('#submitPaymentChooseForm', window.parent.document).unbind('click');
        $('#submitPaymentChooseForm', window.parent.document).click(function () {
            cardPurchase.isPayment === true
                ? cardPurchase.paymentSubmitAction()
                : cardPurchase.settingsSubmitAction();
        });
    },

    paymentSubmitAction: function () {
        if ($('#Card_Radio', window.parent.document).is(':checked') === true) {
            cardPurchase.showNetbanxModal();
            cardPurchase.chosePaymentDialogUserAction(paypageTrackObject.transactionFunnel, 19, 1);
            getGameSwf().onExternalTrackerEvent('standalone_credit_card');

            $('#rememberChoice', window.parent.document).is(':checked') ? setPreferredPaymentMethod(19) : setPreferredPaymentMethod(0);
        } else {
            cardPurchase.showPayPalWindow();
            cardPurchase.chosePaymentDialogUserAction(paypageTrackObject.transactionFunnel, 2, 1);
            getGameSwf().onExternalTrackerEvent('standalone_pay_pal');

            $('#rememberChoice', window.parent.document).is(':checked') ? setPreferredPaymentMethod(2) : setPreferredPaymentMethod(0);
        }

        cardPurchase.isBuyCoins = false;
    },

    settingsSubmitAction: function () {
        if ($('#Card_Radio', window.parent.document).is(':checked') === true) {
            getGameSwf().onExternalTrackerEvent('standalone_credit_card');
            setPreferredPaymentMethod(19);

        } else {
            getGameSwf().onExternalTrackerEvent('standalone_pay_pal');
            setPreferredPaymentMethod(2);
        }

        cardPurchase.settingsHidePopup();
        cardPurchase.isBuyCoins = false;
    },

    showPayPalWindow: function () {
        cardPurchase.wnd = window.open(cardPurchase.tran_pp_url, '', "width=960,height=600,scrollbars=yes");
        cardPurchase.hidePopup();
    },

    showNetbanxModal: function () {
        var apiUrl = app_vars.web_server_path + 'hosted_api.php';
        var postData = {
            'merchantRefNum': cardPurchase.paymentData.tran_id,
            'currencyCode': 'USD',
            'totalAmount': cardPurchase.paymentData.cost * 100,
            'redirect': [
                {
                    'rel': 'on_success',
                    'uri': app_vars.web_server_path + 'netbanx_success.php'
                },
                {
                    'rel': 'on_decline',
                    'uri': app_vars.web_server_path + 'netbanx_fail.php'
                },
                {
                    'rel': 'on_error',
                    'uri': app_vars.web_server_path + 'netbanx_fail.php'
                }
            ],
            'callback': cardPurchase.generateNetbanxCallbacks()
        };

        cardPurchase.checkUserEmail();
        if (cardPurchase.userEmail != '') {
            postData.customerNotificationEmail = cardPurchase.userEmail;
        }

        $.ajax({
            url: apiUrl,
            type: 'POST',
            cache: false,
            dataType: 'text',
            data: {
                'sentObj': JSON.stringify(postData)
            },
            success: cardPurchase.successResponse,
            error: cardPurchase.errorResponse
        }).done(function () {
        });

        cardPurchase.hidePopup();

        $('#CardsPaymentModal_div > .container', window.parent.document).html('<object type="application/x-shockwave-flash" data="' + window.parent.app_vars.flashLoader + '" width="64px" height="340px" style="visibility: visible;" ><param name="wmode" value="transparent" /></object>');

        $('#CardsPaymentModal_div > .x_bttn_container > .x_bttn', window.parent.document).unbind('click');
        $('#CardsPaymentModal_div > .x_bttn_container > .x_bttn', window.parent.document).click(function () {
            cardPurchase.hideIframePopup();
        });

        parent.displayFlashScreenshot();
        $('#div_overlay', window.parent.document).show();
        $('#CardsPaymentModal_div', window.parent.document).show();
    },

    generateNetbanxCallbacks: function () {
        var callbackConfig = [];
        var statuses = ['on_success', 'on_decline', 'on_hold'];

        var retries = 3;
        var format = 'json';
        var synchronous = true;

        /*
         create response URI
         */
        var serverPath = app_vars.server_path;
        var regExp = /.com\/\w+\//;
        var uri = serverPath.replace(regExp, '.com/ClientApi/paymentservice/providers/sa_optimal/callback.do');

        var returnKeys = [
            'id',
            'transaction.status',
            'transaction.merchantRefNum',
            'transaction.currencyCode',
            'transaction.amount',
            'transaction.errorCode'
        ];

        for (var status in statuses) {
            var configObj = {};
            configObj.rel = statuses[status];
            configObj.retries = retries;
            configObj.format = format;
            configObj.synchronous = synchronous;
            configObj.uri = uri;
            configObj.returnKeys = returnKeys;

            callbackConfig.push(configObj);
        }

        return callbackConfig;
    },

    //netBanx Success response
    successResponse: function (response) {
        response = jQuery.parseJSON(response);
        if (response.error) {
            getGameSwf().transactionFailed(response.error.code, response.error.message);
            cardPurchase.hideIframePopup();
        } else {
            $('#CardsPaymentModal_div > #netBanxFrame', window.parent.document).attr({'src': response.link[0].uri});
        }
        cardPurchase.isBuyCoins = false;
    },

    //netBanx Error response
    errorResponse: function (request, status, error) {
        getGameSwf().transactionFailed(response.error.code, response.error.message);
        activateTab('play', {'cancel': false});
    },

    //event stream methods
    chosePaymentMethodDialogImpression: function () {
        var image_url = $('#choosePayentType_div', window.parent.document).css('background-image');
        image_url = image_url.replace('url(', '').replace(')', '');

        if (cardPurchase.isPayment === true) {
            getGameSwf().chosePaymentMethodDialogImpression(paypageTrackObject.transactionFunnel, image_url, 0, true);
        }
    },

    chosePaymentDialogUserAction: function (funnelId, paymentId, isPayment) {
        getGameSwf().chosePaymentDialogUserAction(funnelId, paymentId, isPayment);
    },

    showBasicForm: function () {
        $('#paymentChooseForm', window.parent.document).show();

        $('#choosePayentType_div', window.parent.document).removeClass('payments_bigBg');
        $('.header', window.parent.document).removeClass('header_big_settings small_settings_chooser_header');
        $('.header_settings', window.parent.document).removeClass('header_settings_big header_settings_small');
        $('.x_bttn_container', window.parent.document).removeClass('x_bttn_settings_big x_bttn_settings_small');
        $('#submitPaymentChooseForm', window.parent.document).removeClass('submitPaymentChooseFormSave submitPaymentChooseFormSaveSettingsSmall');
        $('.header_settings', window.parent.document).hide();
        $('.basic_settings_container', window.parent.document).hide();
        $('.settingsMenuFeedback', window.parent.document).hide();

        $('#choosePayentType_div', window.parent.document).addClass('payments_smallBg');
        $('.x_bttn_container', window.parent.document).addClass('x_bttn_payment');
        $('.header', window.parent.document).addClass('header_chooser');
        $('#rememberChoice', window.parent.document).parent().show();
        $('.paymentChooseForm > .info', window.parent.document).show();
        $('.paymentChooseForm > .info_text', window.parent.document).show();
        $('#submitPaymentChooseForm', window.parent.document).addClass('submitPaymentChooseFormContinue');
        $('.paymentChooseForm > .poptopline7', window.parent.document).hide();

        cardPurchase.rewriteSubmitClick();
    },

    showFbSettingsForm: function () {
        $('#paymentChooseForm', window.parent.document).show();

        $('.choosePayentType_div', window.parent.document).removeClass('payments_bigBg');
        $('.header', window.parent.document).removeClass('header_big_settings');
        $('.header_settings', window.parent.document).removeClass('header_settings_big');
        $('.x_bttn_container', window.parent.document).removeClass('x_bttn_settings_big x_bttn_payment');
        $('#submitPaymentChooseForm', window.parent.document).removeClass('submitPaymentChooseFormContinue');
        $('.basic_settings_container', window.parent.document).hide();
        $('#rememberChoice', window.parent.document).parent().hide();
        $('.paymentChooseForm > .info', window.parent.document).hide();
        $('.paymentChooseForm > .info_text', window.parent.document).hide();
        $('.settingsMenuFeedback', window.parent.document).hide();

        $('#choosePayentType_div', window.parent.document).addClass('payments_smallBg');
        $('.x_bttn_container', window.parent.document).addClass('x_bttn_settings_small');
        $('.header_settings', window.parent.document).addClass('header_settings_small');
        $('.header', window.parent.document).addClass('header_chooser small_settings_chooser_header');
        $('#submitPaymentChooseForm', window.parent.document).addClass('submitPaymentChooseFormSave submitPaymentChooseFormSaveSettingsSmall');
        $('.header_settings', window.parent.document).show();

        $('.paymentChooseForm > .poptopline7', window.parent.document).hide();

        cardPurchase.rewriteSubmitClick();
    },

    showEmailSettingsForm: function () {
        $('#paymentChooseForm', window.parent.document).show();
        $('#choosePayentType_div', window.parent.document).removeClass('payments_smallBg');
        $('.header', window.parent.document).remove('header_big_settings small_settings_chooser_header');
        $('.x_bttn_container', window.parent.document).removeClass('x_bttn_settings_small x_bttn_payment');
        $('#submitPaymentChooseForm', window.parent.document).removeClass('submitPaymentChooseFormContinue submitPaymentChooseFormSaveSettingsSmall');
        $('.header_settings', window.parent.document).removeClass('header_settings_small');
        $('#rememberChoice', window.parent.document).parent().hide();
        $('.paymentChooseForm > .info', window.parent.document).hide();
        $('.paymentChooseForm > .info_text', window.parent.document).hide();
        $('.settingsMenuFeedback', window.parent.document).hide();

        $('#choosePayentType_div', window.parent.document).addClass('payments_bigBg');
        $('.x_bttn_container', window.parent.document).addClass('x_bttn_settings_big');
        $('.header_settings', window.parent.document).addClass('header_settings_big');
        $('.header', window.parent.document).addClass('header_chooser');
        $('#submitPaymentChooseForm', window.parent.document).addClass('submitPaymentChooseFormSave');
        $('.header_settings', window.parent.document).show();
        $('.basic_settings_container', window.parent.document).show();
        $('.paymentChooseForm > .poptopline7', window.parent.document).show();
        $('.header', window.parent.document).addClass('header_big_settings');

        $('.basic_settings_container > .change_email_button', window.parent.document).click(function () {
            $('#choosePayentType_div', window.parent.document).hide();
        });
        $('.basic_settings_container > .change_password_button', window.parent.document).click(function () {
            $('#choosePayentType_div', window.parent.document).hide();
        });

        cardPurchase.rewriteSubmitClick();
    },

    checkUserEmail: function () {
        if (app_vars.smid) {
            cardPurchase.userEmail = app_vars.smid_email;
        } else if (app_vars.dest) {
            cardPurchase.userEmail = app_vars.dest_email;
        } else {
            cardPurchase.userEmail = '';
        }
    }
};

function getPreferredPaymentMethod(response) {
    app_vars.preferred_payment_method = response;
    //return response;
}
function setPreferredPaymentMethod(paymentMethodID) {
    getGameSwf().setPreferredPaymentMethod(paymentMethodID);
    app_vars.preferred_payment_method = paymentMethodID;
}
function buyCoinsSubmit(pos) {
    initCurrentPaypageFlow("buy_coins");
    var tran_token = generateTranToken();
    var cost_data = $.parseJSON($("#pp_rb_" + pos, '#payment_paypal').val());
    var buyCoinsObject = {
        'paymentPageId': userSessionData.paypageID,
        'tran_token': tran_token,
        'paymentOptionId': cost_data["optionId"],
        'transactionSourceTypeId': paypageTrackObject.source_id
    };

    if (paypageTrackObject.source_id == 1) {
        buyCoinsObject.in_app_message_id = paypageTrackObject.addition_data.message_id;
    }
    var wnd;
    if (app_vars.dest || app_vars.smid) {
        cardPurchase.isBuyCoins = true;
        if (isPaymentMethodPayPal()) {
            wnd = window.open("pp_redirect.php", "pp_" + tran_token, "width=960,height=600,scrollbars=yes");
        }
    }

    var successTranansactionCreation = function (response) {
        //add data
        paypageTrackObject.purchaseNumber = cost_data["optionId"];
        paypageTrackObject.purchaseCost = parseFloat(cost_data['cost']);
        paypageTrackObject.purchaseAmount = cost_data['quantity'];
        setTrackingFunnelID();

        //send to flash info about paypage
        if (getGameSwf().sendPayPageBuyCoins) {
            getGameSwf().sendPayPageBuyCoins(paypageTrackObject);
        }

        if (app_vars.dest || app_vars.smid) {
            //prepare data
            var srPoints = userSessionData.LPServiceStatus ? " + " + separateWithComma(cost_data['srPoints']) + " " + (userSessionData.LPServiceStatus == 1 ? "Status" : "SR") + " Points (You got 25% More Coins compared to Facebook/Mobile version of the Game)" : "";
            var data = {
                "name": "Buy " + separateWithComma(cost_data['quantity']) + " Slotomania coins" + srPoints,
                "cardPurchasePackageName": cost_data['quantity'] + ' Slotomania coins',
                "cardPurchaseSRPoints": cost_data['srPoints'],
                "tran_id": response.result.transactionTicket,
                "cost": cost_data['cost']
            };

            if (getGameSwf().trackTransactionCreated) {
                getGameSwf().trackTransactionCreated({
                    transactionID: response.result.transactionTicket,
                    transactionFunnelID: paypageTrackObject.transactionFunnel
                });
            }

            callPaymentSystem(data, wnd);
            getGameSwf().waitForTransaction(tran_token, response.result.transactionTicket, null, paypageTrackObject.transactionFunnel, cost_data.srPoints, cost_data.totalRewards);

            if (getGameSwf().onExternalTrackerEvent) {
                getGameSwf().onExternalTrackerEvent("open_pay_dialog");
            }
        } else {
            setFBCoinsPurchaseParams(response, tran_token, cost_data);
        }
    };

    var errorTransactionCreation = function (response) {
        if (response.response_code == -706) {
            getGameSwf().transactionFailed(response.response_str);
        }
        activateTab('play', {'cancel': false});
    };

    createTransaction(buyCoinsObject, successTranansactionCreation, errorTransactionCreation);
}

function isPaymentMethodPayPal() {
    return (app_vars.card_payments_on === false) || (app_vars.preferred_payment_method == 2);
}

/**
 * Create transaction for NPS
 * @param object transactionData Prepared data for transaction creation
 * @param function successFunction Function in case of success
 * @param function errorFunction Function in case of error
 * @returns void
 */
function createTransaction(transactionData, successFunction, errorFunction) {
    if (app_vars.app_mode == 1) {
        return;
    }

    app_vars.server_call_id++;
    transactionData.callId = 'call_' + app_vars.server_call_id;
    app_vars.server_call_queue[transactionData.callId] = {
        success_func: successFunction,
        error_func: errorFunction
    };

    if (getGameSwf().createTransaction) {
        getGameSwf().createTransaction(transactionData);
    }
}

function setFBCoinsPurchaseParams(resp, tran_token, cost_data) {
    var callback = function (response) {
        logger({
            "rel_url": "FB_ui_pay_credits",
            "method": "get",
            "get_params": "",
            "post_params": {},
            "response": response
        });
        if (response['status'] == 'completed' || response['status'] == 'initiated') {
            getGameSwf().waitForTransaction(tran_token, resp.result.transactionTicket, null, paypageTrackObject.transactionFunnel, cost_data.srPoints, cost_data.totalRewards);
            trackPaymentProcessed(userSessionData.paypageData.transaction_type);
            activateTab('play', {'cancel': false});
        } else {
            getGameSwf().cancelTransaction(tran_token);
        }

        //track clicks on buttons
        if (getGameSwf().trackFacebookBuyWindow) {
            paypageTrackObject.buyClicked = !(!!response.error_code && response.error_code == 1383010); //1383010 - user cancel transaction
            setTrackingFunnelID();
            getGameSwf().trackFacebookBuyWindow(paypageTrackObject);
        }
    };
    if (getGameSwf().onExternalTrackerEvent) {
        getGameSwf().onExternalTrackerEvent("open_pay_dialog");
    }
    if (getGameSwf().trackTransactionCreated) {
        setTrackingFunnelID();
        getGameSwf().trackTransactionCreated({
            transactionID: resp.result.transactionTicket,
            transactionFunnelID: paypageTrackObject.transactionFunnel
        });
    }
    callFBBuyDialog(app_vars.web_server_path + 'og.php?ogt=inapp_currency&var=coins_package&coins=' + separateWithComma(cost_data['quantity'] + '') + getOGParams(cost_data), resp.result.transactionTicket, callback);
}

function setFBItemPurchaseParams(tranID, tranToken) {
    var callback = function (response) {
        logger({
            "rel_url": "FB_ui_pay_item",
            "method": "get",
            "get_params": '',
            "post_params": {},
            "response": response
        });
        if (response['status'] == 'completed' || response['status'] == 'initiated') {
            getGameSwf().waitForTransaction(tranToken, tranID, userSessionData.paypageData.transaction_type);
            trackPaymentProcessed(userSessionData.paypageData.transaction_type);
            hideFlashScreenshot();
        } else {
            getGameSwf().cancelTransaction(tranToken, userSessionData.paypageData.transaction_type);
        }

        //track clicks on buttons
        if (getGameSwf().trackFacebookBuyWindow) {
            paypageTrackObject.buyClicked = !(!!response.error_code && response.error_code == 1383010); //1383010 - user cancel transaction
            getGameSwf().trackFacebookBuyWindow(paypageTrackObject);
        }

        userSessionData.paypageData = {};
    };

    if (userSessionData.paypageData.transaction_type == 'buy_fb_promotion') {
        var productOG = app_vars.web_server_path + 'og.php?ogt=inapp_currency&var=buy_fb_promotion&coins=' + separateWithComma(userSessionData.paypageData.optionData.quantity + '') + '&cost=' + userSessionData.paypageData.optionData.cost + getOGParams();

        var obj = {
            method: 'fbpromotion',
            payment_type: userSessionData.paypageData.transaction_type,
            display: 'popup',
            quantity: 1,
            product: productOG,
            special: 'casino',
            request_id: tranID
        };

        FB.ui(obj, function () {
            getGameSwf().waitForTransaction(tranToken, tranID, userSessionData.paypageData.transaction_type);
            checkFBPromotion({isLogin: false, needShowPopup: false, needShowError: false});
        });
    } else {
        displayFlashScreenshot(true);
        var additional_params = (userSessionData.paypageData.transaction_type == 'buy_machine') ? '&m=' + userSessionData.paypageData.game_id : '';
        callFBBuyDialog(app_vars.web_server_path + 'og.php?ogt=inapp_currency&var=' + userSessionData.paypageData.transaction_type + additional_params + getOGParams(), tranID, callback);
    }
}

/**
 * Call buy dialog on appropriate payment system
 * @param object data Data about buyed object
 * @param object wnd Window object for payment system
 * @returns void
 */
function callPaymentSystem(data, wnd) {

    //make title preparations
    if (!!data['name']) {
        data['name'] = data['name'].replace("%%CREDITS%%", "").replace("%%POINTS%%", "");
    }

    //choosing payment system
    if (isPaymentMethodPayPal()) {
        callPayPal(data, wnd);
    } else {
        callCreditCard(data, wnd);
    }
}

function callCreditCard(paymentData, wnd) {
    var tran_pp_url = getTranPPUrl(paymentData);
    cardPurchase.isPayment = true;
    cardPurchase.paymentData = paymentData;
    cardPurchase.window = wnd;
    cardPurchase.tran_pp_url = tran_pp_url;
    cardPurchase.getPreferredPaymentMethod();
}

/**
 * Call buy dialog on PayPal with params
 * @param object data Data about buyed object
 * @param object wnd Window object for PayPal
 * @returns void
 */
function callPayPal(paymentData, wnd) {
    var tran_pp_url = getTranPPUrl(paymentData);
    try {
        if (wnd === null) {
            wnd = window.open(tran_pp_url, "pp_" + paymentData['tran_id'], "width=960,height=600,scrollbars=yes");
        } else {
            wnd.location = tran_pp_url;
        }
    } catch (e) {
    }
    activateTab('play');
}

function getTranPPUrl(paymentData) {
    var tran_pp_url = app_vars.paypal_url.replace("~{ITEM_NAME}~", encodeURIComponent(paymentData["name"]));
    tran_pp_url = tran_pp_url.replace("~{CUSTOM}~", paymentData['tran_id']);
    tran_pp_url = tran_pp_url.replace("~{AMOUNT}~", paymentData['cost']);
    return tran_pp_url;
}

/**
 * Call buy dialog on FB with params
 * @param string product Link to Open Graph that discribes buyed object
 * @param int order_info Transaction ID
 * @param function callback Callback function that processes FB response
 * @returns void
 */
function callFBBuyDialog(product, order_info, callback) {
    var obj = {
        method: 'pay',
        action: 'purchaseitem',
        product: product,
        request_id: order_info
    };
    FB.ui(obj, callback);
}

//function for DRP
function convertCredits(pin) {
    if (pin === undefined) {
        return;
    } else if (convertCardInfo === null) {
        app_vars.fb_drp_waiting = {pin: pin};
        return;
    }
    var tran_token = generateTranToken();
    var currency_id = convertCardInfo['currency_id'];
    var obj_str = "{\"type\":\"" + currency_id + "\",\"tran_token\":\"" + tran_token + "\",\"gift_card_pin\":\"" + pin + "\",\"tr_source_id\":\"4\"}";
    var success_func = function (response) {
        var order_info = response.result.transactionTicket;
        var obj = {
            method: 'pay',
            action: 'purchaseitem',
            product: app_vars.web_server_path + 'og.php?ogt=inapp_currency&var=coins_package&coins=' + cost_data['quantity'] + getOGParams(),
            request_id: order_info
        };
        FB.ui(obj, function (response) {
            logger({
                "rel_url": "FB_ui_pay_fb_drp",
                "method": "get",
                "get_params": "",
                "post_params": {},
                "response": response
            });
            if (response['order_id']) {
                getGameSwf().waitForTransaction(tran_token, order_info, 'fb_drp');
                activateTab('play');
                return true;
            } else {
                getGameSwf().cancelTransaction(tran_token, 'fb_drp');
                return false;
            }
        });
    };
    serverCallMediator('Payment', 'BUY_CHIPS',
        success_func,
        obj_str,
        function (response) {
            if (response.response_code == -706) {
                getGameSwf().transactionFailed(response.response_str);
            }
            activateTab('play');
            return false;
        });
}

/**
 * Buy personal offer. Called from Flash
 * @param int tran_id Transaction ID
 * @param string tran_token Transaction token
 * @param object params Info about buyed object
 * @param int amount Amount of buyed coins
 * @returns void
 */
function specialPaymentOffer(tran_id, tran_token, params, amount) {
    userSessionData.paypageData = params;
    //set tracking params
    initCurrentPaypageFlow("buy_PO");
    paypageTrackObject.transactionFunnelOld["buy_PO"] = 0;
    setTrackingFunnelID(params.transactionFunnel);

    var srPoints = userSessionData.LPServiceStatus && !!params['srPoints'] ? " + " + separateWithComma(params['srPoints']) + " " + (userSessionData.LPServiceStatus == 1 ? "Status" : "SR") + " Points (You got 25% More Coins compared to Facebook/Mobile version of the Game)" : "";
    var costs_data = {
        'currency_cost': params['cost'],
        'item_name': 'Buy ' + app_vars.inapp_currency['coins_package']['title'].replace("%%COINS%%", separateWithComma(amount)) + srPoints,
        'quantity': amount
    };

    if (app_vars.dest || app_vars.smid) {
        var wnd;
        if (isPaymentMethodPayPal()) {
            wnd = window.open("pp_redirect.php", "pp_" + tran_token, "width=960,height=600,scrollbars=yes");
        }

        //prepare data
        var data = {
            "name": costs_data['item_name'],
            "cardPurchasePackageName": app_vars.inapp_currency['coins_package']['title'].replace("%%COINS%%", amount),
            "cardPurchaseSRPoints": !!params['srPoints'] ? params['srPoints'] : 0,
            "tran_id": tran_id,
            "cost": costs_data['currency_cost']
        };

        if (getGameSwf().trackTransactionCreated) {
            getGameSwf().trackTransactionCreated({
                transactionID: tran_id,
                transactionFunnelID: paypageTrackObject.transactionFunnel
            });
        }

        callPaymentSystem(data, wnd);

        getGameSwf().waitForTransaction(tran_token, tran_id);
        if (getGameSwf().onExternalTrackerEvent) {
            getGameSwf().onExternalTrackerEvent("open_pay_dialog");
        }
    } else {
        setFBCoinsPurchaseParams({'result': {'transactionTicket': tran_id}}, tran_token, costs_data);
    }
}

/**
 * Buy item (machine, respin, promotion). Called from Flash
 * @param int tran_id Transaction ID
 * @param string tran_token Transaction token
 * @param object params Info about buyed object
 * @returns void
 */
function buyItem(tran_id, tran_token, params) {
    userSessionData.paypageData = params;
    paypageTrackObject.transactionFunnel = !!params.transactionFunnel ? params.transactionFunnel : null;

    if (app_vars.dest || app_vars.smid) {
        //prepare data
        var data = {
            "tran_id": tran_id,
            "cost": params['cost'],
            "cardPurchaseSRPoints": 0
        };

        if (userSessionData.paypageData.transaction_type == 'buy_machine') {
            data['name'] = app_vars.inapp_currency[userSessionData.paypageData.transaction_type][userSessionData.paypageData.game_id]['title'];
        } else {
            data['name'] = app_vars.inapp_currency[userSessionData.paypageData.transaction_type]['title'];
        }
        data['cardPurchasePackageName'] = data['name'];

        //add Buy
        data['name'] = "Buy " + data['name'];

        //add SR points
        if (!!params['srPoints']) {
            var srPoints = userSessionData.LPServiceStatus ? " + " + separateWithComma(params['srPoints']) + " " + (userSessionData.LPServiceStatus == 1 ? "Status" : "SR") + " Points" : "";
            data['name'] = data['name'] + srPoints;
            data['cardPurchaseSRPoints'] = params['srPoints'];

            //add 25% info
            switch (userSessionData.paypageData.transaction_type) {
                case "buy_respin":
                case "buy_machine":
                case "replay_bonus":
                    break;

                default:
                    data['name'] = data['name'] + " (You got 25% More Coins compared to Facebook/Mobile version of the Game)";
                    break;
            }
        }

        callPaymentSystem(data, null);

        getGameSwf().waitForTransaction(tran_token, tran_id);
        if (getGameSwf().onExternalTrackerEvent) {
            getGameSwf().onExternalTrackerEvent("open_pay_dialog");
        }
    } else {
        setFBItemPurchaseParams(tran_id, tran_token);
    }
}

function sendGift(title, content, gift_type, event_type, gift_recievers) {
    getAllFriendsIds_toFilter(title, content, gift_type, event_type, gift_recievers);
}

function filterAlreadyGiftedFriends(response, title, content, gift_type, event_type, gift_receivers) {
    // FB friend lists
    var all_friends = response[0];
    var friends_with_app = response[1];
    var all_friends_ids = [];
    for (var i in all_friends) {
        all_friends_ids.push(all_friends[i].uid2);
    }
    var friends_with_app_ids = [];
    for (var i in friends_with_app) {
        friends_with_app_ids.push(friends_with_app[i].uid);
    }
    var friends_without_app_ids = [];
    for (var k in all_friends_ids) {
        var found = null;
        for (var i = 0; i < friends_with_app_ids.length; i++) {
            if (all_friends_ids[k] == friends_with_app_ids[i]) {
                found = true;
                break;
            }
        }
        if (!found) {
            friends_without_app_ids.push(all_friends_ids[k]);
        }
    }
    var gift_receivers = (gift_receivers != null) ? gift_receivers.split(",") : [];
    for (var k in gift_receivers) {
        var idx = -1;
        for (var i = 0; i < all_friends_ids.length; i++) {
            if (all_friends_ids[i] == gift_receivers[k]) {
                idx = i;
                break;
            }
        }
        if (idx != -1) {
            all_friends_ids.splice(idx, 1);
        }
        var idx = -1;
        for (var i = 0; i < friends_with_app_ids.length; i++) {
            if (friends_with_app_ids[i] == gift_receivers[k]) {
                idx = i;
                break;
            }
        }
        if (idx != -1) {
            friends_with_app_ids.splice(idx, 1);
        }
        var idx = -1;
        for (var i = 0; i < friends_without_app_ids.length; i++) {
            if (friends_without_app_ids[i] == gift_receivers[k]) {
                idx = i;
                break;
            }
        }
        if (idx != -1) {
            friends_without_app_ids.splice(idx, 1);
        }
    }
    var fb_filters = [];
    if (all_friends_ids.length > 0) {
        fb_filters.push({
            name: 'All friends',
            user_ids: all_friends_ids
        });
    }
    if (friends_with_app_ids.length > 0) {
        fb_filters.push({
            name: 'Slotomania friends',
            user_ids: friends_with_app_ids
        });
    }
    if (friends_without_app_ids.length > 0) {
        fb_filters.push({
            name: 'Not on Slotomania yet',
            user_ids: friends_without_app_ids
        });
    }

    if (fb_filters.length == 0) {
        fb_filters = {};
        fb_filters.exclude_ids = gift_receivers;
    }
    createCoupon(title, content, gift_type, event_type, fb_filters);
}

// temporarily not used
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function createCoupon(title, description, gift_type, event_type, user_sn_id) {
    var coupon_params = {
        'user_sn_id': user_sn_id,
        'description': description,
        'title': title,
        'gift_type': gift_type,
        'event_type': event_type
    };
    getGameSwf().createCoupon(coupon_params);
}

function setGameVisibility(show) {
    moveFlash(show);
}

function moveFlash(show) {
    $('#game_swf_con').css('top', show ? '0px' : '-10000px');
}

function getGameSwf() {
    return getFlashMovieObject('game_swf');
}

function showLikePage() {
    $('#like_page_con').show();
    return false;
}

function getFlashMovieObject(movieName) {
    if (window.document[movieName]) {
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[movieName])
            return document.embeds[movieName];
    } else {
        return document.getElementById(movieName);
    }
    return null;
}

function changeLanguage(cookie_domain) {
    var selected_language = $("select#lang option:selected").val();
    var options = {};
    options.expires = 1825;
    options.path = '/';
    options.domain = cookie_domain;
    $.cookie('SGLang', selected_language, options);  // set cookie
    if (getGameSwf().onExternalTrackerEvent) {
        getGameSwf().onExternalTrackerEvent("nev_bar_language");
    }
    var params = location.search;
    if (app_vars.dest || app_vars.smid) {
        var lang_pos = params.indexOf("lang");
        if (lang_pos != -1) {
            var str = params.substr(lang_pos, 7);
            params = params.replace(str, 'lang=' + selected_language);
        } else {
            if (params.substr(params.length - 1) == '&') {
                params += 'lang=' + selected_language;
            } else {
                params += '&lang=' + selected_language;
            }
        }
        if (app_vars.app_mode == 1 || app_vars.app_mode == 3) {
            var post_params = (app_vars.smid) ? {
                "uid": app_vars.user_sn_id,
                "smid_token": app_vars.smid_token,
                "smid_email": app_vars.smid_email
            } : {};
        } else {
            var post_params = {"signed_request": app_vars.signed_request, "user_sn_id": app_vars.user_sn_id};
        }
        post_params.user_access_token = app_vars.access_token;
        if (parent.loadFramePost) {
            parent.loadFramePost({
                "action": app_vars.web_server_path + params,
                "target": "content_fr",
                "method": "POST"
            }, post_params);
        }
    } else {
        if (app_vars.app_mode == 1) {
            var lang_pos = params.indexOf("lang");
            if (lang_pos != -1) {
                var str = params.substr(lang_pos, 7);
                params = params.replace(str, 'lang=' + selected_language);
            } else {
                if (params.substr(params.length - 1) == '&') {
                    params += 'lang=' + selected_language;
                } else {
                    params += '&lang=' + selected_language;
                }
            }
            top.location.href = app_vars.app_path + params;
        } else {
            top.location.href = app_vars.app_path + '?lang=' + selected_language;
        }
    }
}

function openTab(tab) {
    if (tab == 'game') {
        return;
    } else if (tab == 'buy') {
        openPayPagePopup();
    } else if (tab == 'gifts') {
        activateTab('gifts');
    } else if (tab == 'friends') {
        activateTab('invites');
    }
}

function generatePixelIframe(link) {
    if (link.indexOf("LOCAL/") != -1) {
        link = link.replace('LOCAL/', app_vars.web_server_path + 'pixels/');
    }
    var pixel = '<iframe src="' + link + '" width="0" height="0" frameborder="0"></iframe>';
    $("#partners_pixel_install_div").append(pixel);
    return false;
}

function create_MythingsTag(data) {
    if (app_vars.dest || app_vars.smid || typeof data == 'undefined' || !data.hasOwnProperty('actionName') || data.actionName == null) {
        return false;
    }

    var action = data.actionName;
    var action_ts = CustomDateObj.getDate2();
    var LB = data.hasOwnProperty('lastBonus') ? data.lastBonus : 'null';
    if (action == 'Bonus_collect') {
        LB = CustomDateObj.getDate2();
    }

    var LD = data.hasOwnProperty('lastDeposit') ? data.lastDeposit : 'null';
    if (action == 'Approve_personalize_offer_purchase' || action == 'Approve_purchase') {
        LD = CustomDateObj.getDate2();
    }
    var TRX = data.hasOwnProperty('transactionID') ? data.transactionID : 'null';
    var LT = data.hasOwnProperty('loyaltyTier') ? data.loyaltyTier : 'null';

    var tag = '<iframe frameborder="0" style="width: 0px; height: 0px; overflow: hidden; border: medium none;" ' +
        'src="' + location.protocol + '//cdn-va-p.mythingsmedia.net/prod/Customized/PS/2455-100-us/mythingstag.html?' +
        'User_ID=' + app_vars.int_user_id +
        '&action=' + action +
        '&action_TS=' + action_ts +
        '&LB=' + LB +
        '&LD=' + LD +
        '&trx=' + TRX +
        '&LT=' + LT +
        '"></iframe>';

    $("body").append(tag);
    return false;
}

function myThingsLoginPixel() {
    if (app_vars.depositor === null && app_vars.user_tier === null) {
        return;
    }
    var link = 'https://rainbow-us.mythings.com/pix.aspx?atok=2996-100-us&eventtype=3&aid=1010&mode=html&r=' + CustomDateObj.getTimestamp() +
        '&_u_tier=' + app_vars.loyalty_tiers[app_vars.user_tier - userSessionData.paypageTierBase] + '&_u_dep=' + (app_vars.depositor ? 1 : 0);
    generatePixelIframe(link);
    ObserverObj.unsubscribe('mythings_login');
}

function updateRegInfo() {
    var cookie_val = null;
    var cookie_obj = null;
    cookie_val = $.cookie("PRP");
    if (cookie_val != null && cookie_val.indexOf("request_id_c") != -1) {
        cookie_obj = $.parseJSON(cookie_val);
        getFBRequest(cookie_obj.request_id_c, passFBRequestData);
    }
    return;
}

function disableTabMenu(lock) {
    app_vars.is_swf_load_complete = !lock;
}

function externalCallOpenTab(tab_id) {
    switch (tab_id) {
        case 4:
            openPayPagePopup();
            break;
        case 5:
            activateTab('offers');
            break;
        case 6:
            activateTab('gifts');
            break;
        case 12:
            activateTab('loyalty');
            break;
        default:
            return;
            break;
    }
}

function visibleMenuBar(vis) {
    vis ? $("#html_menu").css("display", "block") : $("#html_menu").css("display", "none");
}

// functions for Destination Site
function setContentHeight(height) {
    if (height == 0) {
        parent.setContentHeight(770);
    } else {
        parent.setContentHeight(height);
    }
}

function setBannersCookie(del) {
    var options = {};
    options.path = '/';
    options.domain = app_vars.cookie_domain;
    if ($.cookie("smbnr") === null && !del) {
        options.expires = 3560;
        $.cookie('smbnr', "true", options);
    } else if (del) {
        $.cookie('smbnr', null, options);
    }
    return;
}


function setUniqueSessionId() {
    var options = {};
    options.expires = 86400;
    options.path = '/';
    options.domain = app_vars.cookie_domain;
    var cookie_name = app_vars.var_prefix + 'tabid_' + app_vars.user_sn_id;
    var unique_session_id = Math.floor(Math.random() * 100000000) + '' + Math.floor(Math.random() * 100000000) + '';
    if (app_vars.allow_session_tabs) {
        $.cookie(cookie_name, unique_session_id, options);
    }
    return unique_session_id;
}

function isAllowedUniqueSessionId(unique_session_id) {
    if (app_vars.browser == 'Safari') {
        return true;
    }
    if (app_vars.allow_session_tabs) {
        var cookie_val = $.cookie(app_vars.var_prefix + 'tabid_' + app_vars.user_sn_id);
        if (cookie_val == unique_session_id) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function trackEvent(obj) {
    var clicked_element = "";
    var additional_param = "";
    switch (obj) {
        case 'btn_a':
            clicked_element = "nev_bar_mobile";
            additional_param = 'iphone';
            break;
        case 'btn_b':
            clicked_element = "nev_bar_mobile";
            additional_param = 'ipad';
            break;
        case 'btn_c':
            clicked_element = "nev_bar_mobile";
            additional_param = 'android';
            break;
        case 'btn_d':
            clicked_element = "nev_bar_mobile";
            additional_param = 'amazon';
            break;
        default:
            return;
            break;
    }

    if (getGameSwf().onExternalTrackerEvent && clicked_element != "") {
        getGameSwf().onExternalTrackerEvent(clicked_element, additional_param);
    }
    return;
}

/**
 * Log specific events
 * @param object data Data to log
 * @returns void
 */
function logEvent(data) {
    if (!data.hasOwnProperty("event")) {
        return;
    }

    var content = data.msg;
    var logName = data.event;

    switch (data.event) {
        case "flash_log":
            break;
        case "soc_reconnect":
            content = app_vars.sess_uniq_id + "::" + data.msg + "::" + app_vars.browser + "::" + app_vars.browser_version;
            break;
        case "registration":
            logName = "log_regs";
            break;
        default:
            return;
            break;
    }
    writeLog(logName, content);
}

/**
 * Function makes page darkened
 * @param int part 0 - disable darkening, 1 - background beside flash, 2 - background and flash screenshot
 * @returns void
 */
function darkeningPage(part) {
    if (typeof part == 'undefined') return;
    if (part == 0) {
        $("#game_wrapper_cover").css("display", "none");
    } else if (part == 1) {
        $("#game_wrapper_cover").css("display", "block");
    }
}

function separateWithComma(number) {
    return ("" + number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

function getScreenWidth() {
    return screen.width;
}
function generateTranToken() {
    var d = new Date();
    return app_vars.user_sn_id + '_' + d.getTime();
}


function getLoadingTimeData() {
    var timestamp2 = CustomDateObj.getTimestamp();
    return {"timerValue": (timestamp2 - app_vars.timestamp1), "currentTimestamp": timestamp2};
}

/**
 * Callback from flash for engagement bar
 * @returns void
 */
function setSurpiseGiftStatus() {
    var options = {};
    options.expires = 365 * 5;
    options.path = '/';
    options.domain = app_vars.cookie_domain;
    $.cookie(app_vars.var_prefix + "sg_" + app_vars.user_sn_id, "true", options);
}

/**
 * CustomDate class
 */
function CustomDate() {
    this.TimezoneOffset = this.getTimezoneOffset();
}
/**
 * @returns Returns client's timezone offset in hours
 * Ex.:   GMT +0200  =  2,  GMT -0600  =  -6
 */
CustomDate.prototype.getTimezoneOffset = function () {
    var d = new Date();
    var n = d.getTimezoneOffset() / (-60);
    return n;
};

CustomDate.prototype.getTimestamp = function () {
    var t = new Date();
    return t.getTime();
};

CustomDate.prototype.getDate = function () {
    var t = new Date();
    var date = t.getFullYear() + '-' + this.addZeroToDate(t.getMonth() + 1) + '-' + this.addZeroToDate(t.getDate()) + ' ' + this.addZeroToDate(t.getHours()) +
        ':' + this.addZeroToDate(t.getMinutes()) + ':' + this.addZeroToDate(t.getSeconds());
    return date;
};

CustomDate.prototype.getDate2 = function () {
    var t = new Date();
    var date = this.addZeroToDate(t.getDate()) + '/' + this.addZeroToDate(t.getMonth() + 1) + '/' + t.getFullYear() + ',' + this.addZeroToDate(t.getHours()) + ':' + this.addZeroToDate(t.getMinutes());
    return date;
};

CustomDate.prototype.addZeroToDate = function (z) {
    return (z < 10) ? '0' + z : z;
};

var CustomDateObj = new CustomDate();

function show_install_flash() {
    $("#game_loading").css("display", "none");
    $("#flash_detector").css("display", "block");
}

function setGuestModeCookie() {
    if ($.cookie("_sfbgm") === null) {
        var options = {};
        options.expires = 730;
        options.path = "/";
        options.domain = app_vars.cookie_domain;
        $.cookie("_sfbgm", app_vars.fb_gm_cookie, options);
    }
}

function initPromoTimer() {
    var obj_str = {};
    serverCallMediator("Common", "GET_PROMOTION_COUNTDOWN", getPromoTimerCallback, $.toJSON(obj_str));
}

function getPromoTimerCallback(response) {
    try {
        if (response && response.result) {
            var promo_timer = null;
            if (response.result.length > 0) {
                var time_left = response.result[0].time_left; // in milliseconds
                var timer_text = response.result[0].promotion_countdown_message;
                var d = new Date(time_left);
                var s = d.getUTCSeconds(), m = d.getUTCMinutes(), h = (time_left - m * 60000 - s * 1000) / (3600 * 1000);
                var promoTimer = function () {
                    time_left -= 1000; //
                    if ((time_left / 100) < 0) {
                        clearInterval(promo_timer);
                        $("#top_promo_timer").css("display", "none");
                    }
                    var d = new Date(time_left);
                    s = d.getUTCSeconds();
                    m = d.getUTCMinutes();
                    h = (time_left - m * 60000 - s * 1000) / (3600 * 1000);
                    updatePromoTimer(h, m, s);
                };
                $("div.pt_text").html(timer_text);
                updatePromoTimer(h, m, s);
                promo_timer = setInterval(function () {
                    promoTimer()
                }, 1000);
                $("#top_promo_timer").css("display", "block");
            }
        }
    } catch (e) {
    }
}

function updatePromoTimer(h, m, s) {
    h = Math.floor(h);
    $("div.pt_h").html(CustomDateObj.addZeroToDate(h));
    $("div.pt_m").html(CustomDateObj.addZeroToDate(m));
    $("div.pt_s").html(CustomDateObj.addZeroToDate(s));
}

function isBannersVisible() {
    var obj_str = {};
    serverCallMediator("Common", "USER_STATS", displayBanners, $.toJSON(obj_str));
}

function displayBanners(response) {
    if (response && response.result) {
        if (app_vars.dest || app_vars.smid || (app_vars.browser == 'Internet Explorer' && app_vars.browser_version == '7.0')) {
            $("#top_banner_con").css("display", "none");
            $("#bottom_banner_con").css("display", "none");
        }

        app_vars.depositor = (response.result.transaction_count >= 1);

        // set depositors cookie
        setBannersCookie(!app_vars.depositor);
        ObserverObj.fireEvent('mythings_login');
    }
}

function handleFlashAction(event, params) {
    switch (event) {
        case 'machine_loaded':
            EmbeddedPostVisible(false);
            break;
        case 'lobby_loaded':
            EmbeddedPostVisible(true);
            break;
        default:
            break;
    }
}

function EmbeddedPostVisible(vis) {
    (vis ? $("div#embedded_post_plugin").css("display", "block") : $("div#embedded_post_plugin").css("display", "none"));
}

var EventsObserver = function () {
};

EventsObserver.prototype.listeners = [];

EventsObserver.prototype.subscribe = function (event, callback) {
    this.listeners[event] = [];
    this.listeners[event].push(callback);
};

EventsObserver.prototype.unsubscribe = function (event) {
    delete this.listeners[event];
};

EventsObserver.prototype.fireEvent = function (event, data) {
    if (!this.listeners.hasOwnProperty(event)) return;
    if (typeof data == 'undefined') data = {};
    for (var i in this.listeners[event]) {
        this.listeners[event][i](data);
    }
};

var ObserverObj = new EventsObserver();

/**
 * Insert login pixels into iframe
 * @param array pixelsLinks Array of pixels links
 * @returns void
 */
function loginPixelsInsert(pixelsLinks) {
    var appendObject = !!document.getElementsByTagName("body")[0] ? document.getElementsByTagName("body")[0] : document.getElementsByTagName("frameset")[0];

    for (var item in pixelsLinks) {
        var pixelFrame = document.createElement("iframe");
        pixelFrame.src = pixelsLinks[item];
        pixelFrame.width = '0';
        pixelFrame.height = '0';
        pixelFrame.style = "border:0;width:1px;height:1px";
        appendObject.appendChild(pixelFrame);
    }
}

/**
 * Tracks QB when selector changes his state
 * @param boolean state Selector opened or closed
 * @param boolean autoClose Selector closed automatically
 * @returns void
 */
function trackQBElementSelect(state, autoClose) {
    initCurrentPaypageFlow("buy_QB");
    paypageTrackObject.isQuickBuyShown = state;
    paypageTrackObject.autoClose = !!autoClose;

    if (paypageTrackObject.isQuickBuyShown) {
        paypageTrackObject.transactionFunnel = 0;
    }
    setTrackingFunnelID();

    if (getGameSwf().quickBuyPayPageClicked) {
        getGameSwf().quickBuyPayPageClicked(paypageTrackObject);
    }
}

/**
 * Get random number between min and max
 * @param int min Minimum value of number
 * @param int max Maximum value of number
 * @returns int Random number between min and max
 */
function getRandomInRange(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
}

/**
 * Set tracking funnelID according to previous data
 * @returns void
 */
function setTrackingFunnelID(funnel) {
    var newFunnel = new CustomDate().getTimestamp() + "_" + getRandomInRange(1000, 9999);

    if (typeof (paypageTrackObject.transactionFunnelOld) == "undefined") {
        paypageTrackObject.transactionFunnelOld = {
            'buy_coins': 0,
            'buy_QB': 0,
            'buy_PO': 0
        };
    }

    if (!!funnel && userSessionData.currentPaypageFlow == "buy_PO") {
        if (paypageTrackObject.transactionFlow != userSessionData.currentPaypageFlow && paypageTrackObject.transactionFunnel) {
            paypageTrackObject.transactionFunnelOld[userSessionData.currentPaypageFlow] = paypageTrackObject.transactionFunnel;
        }
        paypageTrackObject.transactionFlow = userSessionData.currentPaypageFlow;
        paypageTrackObject.transactionFunnel = funnel;
    } else if (!paypageTrackObject.transactionFunnel || (paypageTrackObject.transactionFlow != userSessionData.currentPaypageFlow && (!paypageTrackObject.transactionFunnelOld || !paypageTrackObject.transactionFunnelOld[userSessionData.currentPaypageFlow]))) {
        //save funnel for previous flow
        if (paypageTrackObject.transactionFlow != userSessionData.currentPaypageFlow && paypageTrackObject.transactionFunnel) {
            paypageTrackObject.transactionFunnelOld[userSessionData.currentPaypageFlow] = paypageTrackObject.transactionFunnel;
        }
        //set new flow
        paypageTrackObject.transactionFlow = userSessionData.currentPaypageFlow;
        //set new funnel
        paypageTrackObject.transactionFunnel = newFunnel;
    } else if (paypageTrackObject.transactionFlow != userSessionData.currentPaypageFlow && paypageTrackObject.transactionFunnelOld && !!paypageTrackObject.transactionFunnelOld[userSessionData.currentPaypageFlow]) {
        //set new flow
        paypageTrackObject.transactionFlow = userSessionData.currentPaypageFlow;
        //restore funnel from array
        paypageTrackObject.transactionFunnel = paypageTrackObject.transactionFunnelOld[userSessionData.currentPaypageFlow];
        //reset old funnel
        paypageTrackObject.transactionFunnelOld[paypageTrackObject.transactionFlow] = 0;
    }
}

/**
 * Init current paypage flow
 * @param string flow New flow name
 * @returns void
 */
function initCurrentPaypageFlow(flow) {
    userSessionData.currentPaypageFlow = flow;
}

/**
 * Reload page. Called from flash
 * @param boolean withParamsGET Flag to reload page with GET params (for SM.COM)
 * @returns void
 */
function pageReload(withParamsGET) {
    if (!app_vars.dest && !app_vars.smid) {
        window.top.location = app_vars.app_path + (withParamsGET ? window.location.search : '');
    } else {
        location.href = location.href;
    }
}

/**
 * Tracking all machines unloked via Comufy code
 * @param int gameID Game ID
 * @param string gameName Game name
 * @returns void
 */
function trackMachineUnlocked(gameID, gameName) {
    try {
        var todayDate = new CustomDate().getDate();
        comufy.storeUser({"GameUnlock_id": gameID});
        comufy.storeUser({"GameUnlock_ts": todayDate});
    } catch (e) {
        writeLog("comufy_errors", "//exception=" + $.toJSON(e) + "//place=machine");
    }
}

/**
 * Tracking all payments via Comufy code
 * @param string paymentType Payment type
 * @returns void
 */
function trackPaymentProcessed(paymentType) {
    try {
        comufy.storeUser({"payments": "payments+1"});
    } catch (e) {
        writeLog("comufy_errors", "//exception=" + $.toJSON(e) + "//place=payment//type=" + paymentType);
    }
}

/**
 * Tracking all payments via Comufy code
 * @returns void
 */
function trackUserLoggedIn() {
    try {
        var trackUserCaller = setInterval(function () {
            if (app_vars.userSRPoints !== null && app_vars.user_tier !== null && !!userSessionData.userInfo.level) {
                comufy.storeUser({
                    "tier_id": app_vars.user_tier,
                    "level_today": userSessionData.userInfo.level,
                    "userSRPoints": app_vars.userSRPoints
                });
                clearInterval(trackUserCaller);
            }
        }, 500);
    } catch (e) {
        writeLog("comufy_errors", "//exception=" + $.toJSON(e) + "//place=user_login");
    }
}

/**
 * Tracking when user install application via Comufy code
 * @returns void
 */
function trackUserInstallApp() {
    try {
        comufy.storeUser({"installApp": ""});
    } catch (e) {
        writeLog("comufy_errors", "//exception=" + $.toJSON(e) + "//place=user_install_app");
    }
}

/**
 * Show pop-up with wrapper version on combination Ctrl+Alt+V
 * @returns void
 */
function versionPopUp() {
    $(document).ready(function () {
        $(document).keydown(function (e) {
            if (e.ctrlKey && e.altKey && e.keyCode == 86) {
                alert("Wrapper version " + $(document).find("html").attr("released_version"));
            }
        });
    });
}


/**
 * Get OG params
 * @param array ogData OG data
 * @returns string Part of get params for OG URL
 */
function getOGParams(ogData) {
    var result = "";
    ogData = !!ogData ? ogData : [];

    result += "&loyalty=" + userSessionData.LPServiceStatus;

    if (userSessionData.LPServiceStatus) {
        if (!!ogData['srPoints']) {
            result += "&points=" + separateWithComma(ogData['srPoints']);
        } else if (!!userSessionData.paypageData['srPoints']) {
            result += "&points=" + separateWithComma(userSessionData.paypageData['srPoints']);
        }

        if (userSessionData.paypageTREnabled && userSessionData.paypageTRS) {
            if (!!ogData['totalRewards']) {
                result += "&rewards=" + separateWithComma(ogData['totalRewards']);
            } else if (!!userSessionData.paypageData['totalRewards']) {
                result += "&rewards=" + separateWithComma(userSessionData.paypageData['totalRewards']);
            }
        }
    }

    return result;
}


/*! file => contests.js */
/**
 * Contests class
 */
function Contests() {
    this.screen_width = getScreenWidth();
}
// class' properties
Contests.prototype.contests_sizes = {
    "EXPANDED": 180,
    "MINIMIZED": 57,
    "ZERO": 0
};
Contests.prototype.current_active_class = '';
Contests.prototype.screen_width = 0;
Contests.prototype.min_screen_with = 1280;
Contests.prototype.style_variants = {
    'SCREEN_WIDE': 0,
    'SCREEN_1280': 1,
    'SCREEN_800': 2,
    'SCREEN_SMALL': 3
};

Contests.prototype.getStyleVariant = function () {
    if (this.screen_width <= 800) {
        return this.style_variants.SCREEN_800;
    } else if (this.screen_width <= 1280) {
        return this.style_variants.SCREEN_1280;
    } else {
        return this.style_variants.SCREEN_WIDE;
    }
};

Contests.prototype.resizeContests = function (size) {
    var style_variant = this.getStyleVariant();
    if (app_vars.features.hasOwnProperty("contests")) {
        switch (size) {
            case ContestsObj.contests_sizes.EXPANDED:
                try {
                    ContestsObj["setExpandedStyle" + style_variant]();
                    userSessionData.contestsBarStatus = ContestsObj.contests_sizes.EXPANDED;
                } catch (e) {
                }
                break;
            case ContestsObj.contests_sizes.ZERO:
            default:
                try {
                    ContestsObj.setHiddenStyle0();
                    userSessionData.contestsBarStatus = ContestsObj.contests_sizes.ZERO;
                } catch (e) {
                }
                break;
        }
    }
};

// Expanded styles
Contests.prototype.setExpandedStyle0 = function () {
    $("#tabs_view_stack").addClass("over_visible");
    $("#game_swf_con").removeClass("minimized_contests");
    $("#game_swf").removeClass("game_minimized_contests");
    $("#imageContent").removeClass("minimized_contests");
    $("#imageContent img").removeClass("game_minimized_contests");
    if ($("#game_swf_con").hasClass("hidden_game_minimized_contests") || $("#game_swf_con").hasClass("hidden_game_zero_contests")) {
        $("#game_swf_con").removeClass("hidden_game_minimized_contests").removeClass("hidden_game_zero_contests").addClass("hidden_game_expanded_contests");
    }
};

Contests.prototype.setExpandedStyle1 = function () {
    $("#game_wrapper").addClass("game_wrapper_height_scroll");
    $("#game_swf_con").removeClass("minimized_contests").addClass("game_swf_con_zero_margin");
    $("#tabs_view_stack").addClass("over_scroll");
    $("#tabs_view_stack").scrollLeft(180);
    $("#game_swf").removeClass("game_minimized_contests");
    $("#imageContent").removeClass("minimized_contests");
    $("#imageContent img").removeClass("game_minimized_contests");
    if ($("#game_swf_con").hasClass("hidden_game_minimized_contests") || $("#game_swf_con").hasClass("hidden_game_zero_contests")) {
        $("#game_swf_con").removeClass("hidden_game_minimized_contests").removeClass("hidden_game_zero_contests").addClass("hidden_game_expanded_contests");
    }
};

// Minimized styles
Contests.prototype.setMinimizedStyle0 = function () {
    $("#tabs_view_stack").addClass("over_visible");
    $("#game_swf_con").addClass("minimized_contests");
    $("#game_swf").addClass("game_minimized_contests");
    $("#imageContent").addClass("minimized_contests");
    $("#imageContent img").addClass("game_minimized_contests");
    if ($("#game_swf_con").hasClass("hidden_game_expanded_contests") || $("#game_swf_con").hasClass("hidden_game_zero_contests")) {
        $("#game_swf_con").removeClass("hidden_game_expanded_contests").removeClass("hidden_game_zero_contests").addClass("hidden_game_minimized_contests");
    }
};

// Hidden styles
Contests.prototype.setHiddenStyle0 = function () {
    $("#tabs_view_stack").removeClass("over_visible").removeClass("over_scroll");
    $("#game_swf_con").removeClass("minimized_contests").removeClass("game_swf_con_zero_margin");
    $("#game_swf").removeClass("game_minimized_contests");
    if ($("#game_swf_con").hasClass("hidden_game_expanded_contests") || $("#game_swf_con").hasClass("hidden_game_minimized_contests")) {
        $("#game_swf_con").removeClass("hidden_game_expanded_contests").removeClass("hidden_game_minimized_contests").addClass("hidden_game_zero_contests");
    }
};

var ContestsObj = new Contests();

/*! file => error_logger.js */
function logLoadingError() {
    writeLog("app_loading_issues", (app_vars.smid ? "sa_mode" : "sn_mode") + "::" + app_vars.os + "::" + app_vars.browser + "::" + app_vars.browser_version + "::FP_" + playerVersion.major + "." + playerVersion.minor);
}

function writeLog(component, msg) {
    if (!isLogTurnedON(component)) {
        return;
    }

    var data = {
        'msg': msg,
        'component': component,
        'userSNID': app_vars.user_sn_id
    };
    var logger = app_vars.error_log_path + 'log.php';

    try {
        //try to log
        if ($.browser.msie && window.XDomainRequest) {
            // Use Microsoft XDR
            var xdr = new XDomainRequest();
            xdr.open("get", logger + '?' + $.param(data));
            xdr.onload = function () {
            };
            xdr.send();
        } else {
            // Use jQuery
            $.ajax({
                type: 'POST',
                url: logger,
                data: data
            });
        }
    } catch (e) {
        console.log('Log writing failed!');
    }
}

function isLogTurnedON(component) {
    return component && !!log_opt[component];
}

/*! file => md5.js */
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}
function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}
function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}
function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
        + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = '';
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
    (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                0x80 | ( x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6 ) & 0x3F),
                0x80 | ( x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}


/*! file => banner.js */
window.onload = function () {
    try {
        var appendObject = document.getElementById("top_banner_con");
        if (appendObject != null && topBannerLink && window.screen.availHeight > 810) {
            var bannerlFrame = document.createElement("iframe");
            bannerlFrame.src = topBannerLink;
            bannerlFrame.width = '758';
            bannerlFrame.height = '72';
            bannerlFrame.name = 'promoselectorFrame';
            bannerlFrame.scrolling = 'no';
            bannerlFrame.frameBorder = '0';
            bannerlFrame.marginHeight = '0';
            bannerlFrame.marginWidth = '0';
            bannerlFrame.style = "border:0px #FFFFFF none;";
            appendObject.appendChild(bannerlFrame);
        }
    } catch (e) {
        console.log("Banner insertion interrupted by exception: ", e);
    }
};

/*! file => OneReward.js */
//Fixing IE9 console missing
if (!window.console) {
    window.console = {};
}
if (!window.console.log) {
    window.console.log = function () {
    };
}

var CIE = {};
CIE.ErrorCodes = {};

CIE.ErrorCodes.IO_ERROR = 1;
CIE.ErrorCodes.JSON_MALFORMED = 2;
CIE.ErrorCodes.APP_CREDENTIALS_NOT_SET = 3;
CIE.ErrorCodes.ONE_REWARD_DATA_MISSING = 4;
CIE.ErrorCodes.TR_DISABLED = 5;
CIE.ErrorCodes.TR_ACCOUNT_ID_NOT_FOUND = 6;
CIE.ErrorCodes.TR_DATA_ERROR = 7;
CIE.ErrorCodes.SERVER_MAINTENANCE = 8;

CIE.ErrorCodes.getDescription = function (errorCode) {
    switch (errorCode) {
        case 1:
            return "IO Error, there was a problem with the server, retry later.";
        case 2:
            return "Wrong JSON, JSON parser could not parse the response because it was malformed, retry later.";
        case 3:
            return "App credentials not set";
        case 4:
            return "One Reward Data is missing, before to call retrieveTotalRewardsData() wait for oneRewardData to be retrieved.";
        case 5:
            return "TR is disabled, call is not going to go through.";
        case 6:
            return "TR Account ID not found, make sure to register or login to TR before to make this call.";
        case 7:
            return "TR Data error, dispatched if the resultCode from TR is different than 0";
        case 8:
            return "Server returned 503 status and it is in maintenance mode.";
    }

    return "Error description missing...";
};
CIE.Event = function (type, data) {
    var _type = type;
    var _data = data;
    var _errorCode;

    this.addError = function (errorCode) {
        _errorCode = errorCode;
        return this;
    };

    this.getType = function () {
        return _type;
    };
    this.getData = function () {
        return _data;
    };
    this.getErrorCode = function () {
        return _errorCode;
    };
    this.getErrorDescription = function () {
        return "ERROR " + _errorCode + ": " + CIE.ErrorCodes.getDescription(_errorCode);
    };
};
CIE.EventCallback = function (holder, func) {
    var functionName = func;
    var classHolder = holder;
    this.passToCallback = function (e) {
        classHolder[functionName](e);
    };
};
CIE.EventDispatcher = function () {
    var _events = null;

    this.addListener = function (type, callback) {
        if (_events == null) {
            _events = [];
        }

        _events.push(new CIE.Pair(type, callback));
    };

    this.removeListener = function (type, callback) {
        if (_events != null) {
            for (var i = 0; i < _events.length; i++) {
                var pair = _events[i];
                if (pair.first == type && pair.second == callback) {
                    _events.splice(i, 1);
                    i--;
                }
            }
        }
    };

    this.dispatchEventToListeners = function (e) {
        if (_events != null) {
            for (var i = 0; i < _events.length; i++) {
                var pair = _events[i];
                if (pair.first == e.getType()) {
                    pair.second(e);
                }
            }
        }
    };
};
CIE.AppRewards = function (oneReward) {
    var _oneReward = oneReward;

    this.getLevelUpStatusPoints = function () {
        if (_oneReward.getOneRewardResponseData() && _oneReward.getOneRewardResponseData().getObj()["appRewards"] != null && _oneReward.getOneRewardResponseData().getObj()["appRewards"]["levelUp"] != null) {
            return _oneReward.getOneRewardResponseData().getObj()["appRewards"]["levelUp"]["statusPoints"];
        }
        else return 0;
    };
};
CIE.ExchangeRate = function (oneReward) {
    var _oneReward = oneReward;

    this.isExchangeRateExpired = function () {
        var timestampOnServer = _oneReward.getCurrentTimestampOnServer();
        return timestampOnServer >= _oneReward.getOneRewardResponseData().getExchangeRate().getExpiration();
    };

    var isPriceInBounds = function (amountSpent, lowerBound, upperBound) {
        return ( Math.floor(amountSpent * 100) >= Math.floor(lowerBound * 100) && Math.floor(amountSpent * 100) <= Math.floor(upperBound * 100) );
    };

    this.getStatusPointsForAmount = function (amountSpent) {
        //Status Points to be rewarded
        var X = 1 + _oneReward.getOneRewardResponseData().getExchangeRate().getStatusPoints().getBonusMultiplier();
        var length = _oneReward.getOneRewardResponseData().getExchangeRate().getStatusPoints().getRates().length;
        for (var i = 0; i < length; i++) {
            var pricePoint = _oneReward.getOneRewardResponseData().getExchangeRate().getStatusPoints().getRates()[i];
            if (isPriceInBounds(amountSpent, pricePoint.getLowerBound(), pricePoint.getUpperBound()) || i == length - 1) {
                X = (pricePoint.getBaseRate() * amountSpent) * X;
                break;
            }
        }
        return Math.round(X);
    };

    this.getRewardCreditsForAmount = function (amountSpent) {
        //Reward credits to be rewarded
        var X = 1 + _oneReward.getOneRewardResponseData().getExchangeRate().getRewardCredits().getBonusMultiplier();
        var length = _oneReward.getOneRewardResponseData().getExchangeRate().getRewardCredits().getRates().length;
        for (var i = 0; i < length; i++) {
            var pricePoint = _oneReward.getOneRewardResponseData().getExchangeRate().getRewardCredits().getRates()[i];
            if (isPriceInBounds(amountSpent, pricePoint.getLowerBound(), pricePoint.getUpperBound()) || i == length - 1) {
                X = (pricePoint.getBaseRate() * amountSpent) * X;
                break;
            }
        }

        var rcCap = _oneReward.getOneRewardResponseData().getConfig().getRewardCreditsCap();
        if (Math.round(X) > rcCap) {
            if (CIE.OneRewardPopup.onDataFromPopupCallback) {
                CIE.OneRewardPopup.onDataFromPopupCallback(CIE.OneRewardPopupEvent.RC_CAPPED);
            }
            return rcCap;
        }
        return Math.round(X);
    }
};
/** @extends {CIE.EventDispatcher} */
CIE.OneReward = function () {
    CIE.EventDispatcher.call(this); //extension

    var _self = this;

    var _serverClientTimeDiff = 0;

    var _currentRetry = 0;
    var _checkingForStatusChange = false;

    /** @type {CIE.OneRewardResponseModel} */
    var _oneRewardResponseData = null;

    /** @type {CIE.TotalRewardsResponseModel} */
    var _totalRewardsResponseData = null;

    var _appKey;
    var _userId;
    var _sessionId;
    var _currency; //ISO 4217
    var _platform;
    var _oneRewardUrl;

    var _exchangeRate = new CIE.ExchangeRate(this);
    var _appRewards = new CIE.AppRewards(this);

    var _isReady = false;

    var _version = "1.0";

    this.autoRetrieveTotalRewardsOnInit = true;


    this.openPopup = function (deeplink) {
        if (_oneRewardResponseData != null && _oneRewardResponseData.getConfig() != null) {
            CIE.OneRewardPopup.open(_oneRewardResponseData.getConfig().getCdnWebsiteUrl(), _oneRewardUrl, _appKey, _userId, _sessionId, _currency, _platform, deeplink);
        }
        else {
            console.log("Data not initialized for opening popup!");
        }
    };

    this.closePopup = function () {
        CIE.OneRewardPopup.close();
    };

    var generateBaseRequestParams = function () {
        var obj = {};
        obj.userId = _userId;
        obj.sessionId = _sessionId;
        obj.currency = _currency;
        obj.platform = _platform;
        return obj;
    };

    this.checkForStatusChange = function () {
        if (_isReady && _checkingForStatusChange == false) {
            _currentRetry = 0;
            _checkingForStatusChange = true;
            this.retrieveOneRewardData();
        }
    };

    function onDataFromPopup(data) {
        if (data == CIE.OneRewardPopupEvent.UPDATE_WIDGET_DATA) {
            this.retrieveOneRewardData();
        }
        else {
            this.dispatchEventToListeners(new CIE.OneRewardPopupEvent(CIE.OneRewardPopupEvent.DATA_RECEIVED, data));
        }
    }

    var self = this;
    CIE.OneRewardPopup.onDataFromPopupCallback = function (data) {
        onDataFromPopup.call(self, data);
    };

    this.init = function (oneRewardUrl, appKey, userId, sessionId, currency, platform) {
        _oneRewardResponseData = null;
        _totalRewardsResponseData = null;
        _oneRewardUrl = oneRewardUrl;
        _appKey = appKey;
        _userId = userId;
        _sessionId = sessionId;
        _currency = currency;
        _platform = platform;
        this.retrieveOneRewardData();
    };

    this.retrieveOneRewardData = function () {
        if (_userId != undefined && _sessionId != undefined) {
            _self.callOneRewardEndpoint("widgetData", function (e, responseStatus) {
                _self.onOneRewardData(e, responseStatus);
            });
        }
        else {
            console.log("APP credentials not set!");
            _self.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.ERROR, null).addError(CIE.ErrorCodes.APP_CREDENTIALS_NOT_SET));
        }
    };

    this.callOneRewardEndpoint = function (endpoint, callback, extraParams) {
        var params = generateBaseRequestParams();
        if (extraParams) {
            for (var key in extraParams) {
                params[key] = extraParams[key];
            }
        }
        new CIE.AsyncHTTPJSONRequest(_oneRewardUrl + "/" + endpoint + "?appKey=" + _appKey, callback, params).load();
    };

    this.retrieveTotalRewardsData = function () {
        if (_oneRewardResponseData == null || _oneRewardResponseData.getStatus() == undefined || _oneRewardResponseData.getConfig() == undefined) {
            console.log("ONE REWARD DATA NOT FOUND!");
            this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.ONE_REWARD_DATA_MISSING));
            return;
        }
        else if (_oneRewardResponseData.getStatus().getTrEnabled() == false) {
            console.log("TR DISABLES!");
            this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.TR_DISABLED));
            return;
        }
        else if (_oneRewardResponseData.getStatus().getTrAccountId() == "") {
            console.log("TR ACCOUNT MISSING!");
            this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.TR_ACCOUNT_ID_NOT_FOUND));
            return;
        }

        var params = {};

        var header = {};
        header["requestor"] = "TRS";
        header["transactionId"] = CIE.UUID();
        header["version"] = _oneRewardResponseData.getConfig().getTrVersion();
        header["transactionName"] = "getUserInfo";
        header["apiKey"] = _oneRewardResponseData.getConfig().getTrApiKey();

        var body = {};
        body["accountId"] = _oneRewardResponseData.getStatus().getTrAccountId();

        params["header"] = header;
        params["body"] = body;

        new CIE.AsyncHTTPJSONRequest(_oneRewardResponseData.getConfig().getTrUrl() + "/getUserInfo", function (e, responseStatus) {
            _self.onTotalRewardsData(e, responseStatus);
        }, params).load();
    };

    this.onOneRewardData = function (e, responseStatus) {
        if (e == "ERROR") {
            if (responseStatus == 503) {
                console.log("_onOneRewardData SERVER_MAINTENANCE");
                this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.ERROR, null).addError(CIE.ErrorCodes.SERVER_MAINTENANCE));
            }
            else {
                console.log("_onOneRewardData IO_ERROR");
                this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.ERROR, null).addError(CIE.ErrorCodes.IO_ERROR));
            }
        }
        else {
            try {
                console.log("_onOneRewardData DATA");
                var obj = JSON.parse(e);

                if (obj["config"] != null) {
                    _isReady = true;

                    _oneRewardResponseData = new CIE.OneRewardResponseModel(obj);
                    _oneRewardResponseData.rawData = e;

                    _serverClientTimeDiff = (new Date().getTime() / 1000) - _oneRewardResponseData.getTimestamp();

                    this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.RECEIVED, _oneRewardResponseData));

                    if (this.autoRetrieveTotalRewardsOnInit && _totalRewardsResponseData == null) {
                        if (_oneRewardResponseData && _oneRewardResponseData.getStatus() && _oneRewardResponseData.getStatus().getTrEnabled() && _oneRewardResponseData.getStatus().getTrAccountId() != "") {
                            this.retrieveTotalRewardsData();
                        }
                    }

                    if (_oneRewardResponseData.statusChangeEvent != null) {
                        _checkingForStatusChange = false;
                        this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.STATUS_CHANGE, _oneRewardResponseData));
                    }
                    else if (_checkingForStatusChange == true) {
                        if (_currentRetry < _oneRewardResponseData.getConfig().getStatusChangeRetryCount()) {
                            _currentRetry++;
                            setTimeout(_self.retrieveOneRewardData, (_currentRetry * _currentRetry) * _oneRewardResponseData.getConfig().getRetryBackoff() * 1000);
                        }
                        else {
                            _checkingForStatusChange = false;
                        }
                    }
                }
                else {
                    console.log("_onOneRewardData IO_ERROR");
                    this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.ERROR, null).addError(CIE.ErrorCodes.IO_ERROR));
                }
            }
            catch (error) {
                var msg = "Unable to decode JSON: " + error;
                console.log(msg);
                this.dispatchEventToListeners(new CIE.OneRewardEvent(CIE.OneRewardEvent.ERROR, null).addError(CIE.ErrorCodes.JSON_MALFORMED));
            }
        }
    };

    this.onTotalRewardsData = function (e, responseStatus) {
        if (e == "ERROR") {
            console.log("_onTotalRewardsData IO_ERROR");
            this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.IO_ERROR));
        }
        else {
            try {
                console.log("_onTotalRewardsData DATA");
                var obj = JSON.parse(e);
                _totalRewardsResponseData = new CIE.TotalRewardsResponseModel(obj);
                _totalRewardsResponseData.rawData = e;

                if (_totalRewardsResponseData.getResultCode() == 0) {
                    this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.RECEIVED, _totalRewardsResponseData));
                }
                else {
                    this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.TR_DATA_ERROR));
                }
            }
            catch (error) {
                console.log("Unable to decode JSON: " + error);
                this.dispatchEventToListeners(new CIE.TotalRewardsEvent(CIE.TotalRewardsEvent.ERROR, null).addError(CIE.ErrorCodes.JSON_MALFORMED));
            }
        }
    };

    this.getStatusNameById = function (id) {
        if (_oneRewardResponseData != null) {
            var statuses = _oneRewardResponseData.getConfig().getStatuses();
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].getStatusId() == id) {
                    return statuses[i].getStatusLabel();
                }
            }
        }
        return "";
    };

    this.getStatusMinPointsById = function (id) {
        if (_oneRewardResponseData != null) {
            var statuses = _oneRewardResponseData.getConfig().getStatuses();
            for (var i = 0; i < statuses.length; i++) {
                if (statuses[i].getStatusId() == id) {
                    return statuses[i].getMinPoints();
                }
            }
        }
        return 200000000; //Royal Diamond virtual cap
    };

    this.removeClientStep = function (id) {
        var arr = _oneRewardResponseData.getClientStepsCompleted();
        if (arr) {
            var index;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == id) {
                    index = i;
                    break;
                }
            }
            if (index != undefined) _oneRewardResponseData.getClientStepsCompleted()[index] = null;
            console.log("Removing step: " + id);
        }
    };

    this.completeClientStep = function (id) {
        this.callOneRewardEndpoint("updateClientSteps", null, {stepId: id});
        if (!this.clientStepsContains(id) && _oneRewardResponseData.getClientStepsCompleted() != null) {
            _oneRewardResponseData.getClientStepsCompleted().push(id);
        }
        console.log("Completing step: " + id);
    };

    this.clientStepsContains = function (id) {
        var arr = _oneRewardResponseData.getClientStepsCompleted();
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == id) {
                    return true;
                }
            }
        }
        return false;
    };

    this.getStatusIdFromPoints = function (points) {
        var arr = _oneRewardResponseData.getConfig().getStatuses();
        for (var i = arr.length - 1; i >= 0; i--) {
            if (points >= arr[i].getMinPoints()) {
                return arr[i].getStatusId();
            }
        }
    };

    /** @type {CIE.OneRewardResponseModel} */
    this.getOneRewardResponseData = function () {
        return _oneRewardResponseData;
    };

    /** @type {CIE.TotalRewardsResponseModel} */
    this.getTotalRewardsResponseData = function () {
        return _totalRewardsResponseData;
    };

    this.getUserId = function () {
        return _userId;
    };
    this.getSessionId = function () {
        return _sessionId;
    };
    this.getCurrency = function () {
        return _currency;
    };
    this.getPlatform = function () {
        return _platform;
    };
    this.getOneRewardUrl = function () {
        return _oneRewardUrl;
    };
    this.getExchangeRate = function () {
        return _exchangeRate;
    };
    this.getAppRewards = function () {
        return _appRewards;
    };
    this.getAppKey = function () {
        return _appKey;
    };
    this.getIsReady = function () {
        return _isReady;
    };
    this.getServerClientTimeDiff = function () {
        return _serverClientTimeDiff;
    };
    this.getCurrentTimestampOnServer = function () {
        return ( new Date().getTime() / 1000 ) - _serverClientTimeDiff;
    };
    this.getVersion = function () {
        return _version;
    };
};
/** @extends {CIE.Event} */
CIE.OneRewardEvent = function (type, data) {
    CIE.Event.call(this, type, data);
};

CIE.OneRewardEvent.RECEIVED = "OneRewardEvent.RECEIVED";
CIE.OneRewardEvent.ERROR = "OneRewardEvent.ERROR";
CIE.OneRewardEvent.STATUS_CHANGE = "OneRewardEvent.STATUS_CHANGE";
/** @extends {CIE.Event} */
CIE.OneRewardPopupEvent = function (type, data) {
    CIE.Event.call(this, type, data);
};

CIE.OneRewardPopupEvent.DATA_RECEIVED = "OneRewardPopupEvent.DATA_RECEIVED";
CIE.OneRewardPopupEvent.UPDATE_WIDGET_DATA = "OneRewardPopupEvent.updateWidgetData";
CIE.OneRewardPopupEvent.COMPLETE = "OneRewardPopupEvent.complete";
CIE.OneRewardPopupEvent.CLOSE = "OneRewardPopupEvent.close";
CIE.OneRewardPopupEvent.RC_CAPPED = "OneRewardPopupEvent.rcCapped";
CIE.OneRewardPopupEvent.TR_LINKED = "OneRewardPopupEvent.trLinked";
/** @extends {CIE.Event} */
CIE.TotalRewardsEvent = function (type, data) {
    CIE.Event.call(this, type, data);
};

CIE.TotalRewardsEvent.RECEIVED = "TotalRewardsEvent.RECEIVED";
CIE.TotalRewardsEvent.ERROR = "TotalRewardsEvent.ERROR";
CIE.BonusMultiplierModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;

        if (_obj["rates"] != undefined) {
            var pricePoints = [];
            var ratesArray = _obj["rates"];
            for (var i = 0; i < ratesArray.length; i++) {
                pricePoints.push(new CIE.PricePointModel(ratesArray[i]));
            }
            _obj["rates"] = pricePoints;
        }
    }

    this.getBonusMultiplier = function () {
        return _obj["bonusMultiplier"];
    };

    /** @type {CIE.PricePointModel[]} */
    this.getRates = function () {
        return _obj["rates"];
    };
};
CIE.ExchangeRateModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;

        _obj["statusPoints"] = new CIE.BonusMultiplierModel(_obj["statusPoints"]);
        _obj["rewardCredits"] = new CIE.BonusMultiplierModel(_obj["rewardCredits"]);
    }

    this.getExpiration = function () {
        return _obj["expiration"];
    };
    this.getCurrency = function () {
        return _obj["currency"];
    };

    /** @type {CIE.BonusMultiplierModel} */
    this.getStatusPoints = function () {
        return _obj["statusPoints"];
    };

    /** @type {CIE.BonusMultiplierModel} */
    this.getRewardCredits = function () {
        return _obj["rewardCredits"];
    };
};
CIE.OneRewardConfigModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;

        if (_obj["statuses"] != undefined) {
            var statusBrackets = [];
            var statusesArray = _obj["statuses"];
            for (var i = 0; i < statusesArray.length; i++) {
                statusBrackets.push(new CIE.StatusBracketModel(statusesArray[i]));
            }
            _obj["statuses"] = statusBrackets;
        }
    }

    this.getTrVersion = function () {
        return _obj["trVersion"];
    };
    this.getCdnWebsiteUrl = function () {
        return _obj["cdnWebsiteUrl"];
    };
    this.getStatusChangeRetryCount = function () {
        return _obj["statusChangeRetryCount"];
    };
    this.getRetryBackoff = function () {
        return _obj["retryBackoff"];
    };
    this.getTrUrl = function () {
        return _obj["trUrl"];
    };
    this.getTrApiKey = function () {
        return _obj["trApiKey"];
    };
    this.getNewUserStatusPoints = function () {
        return _obj["newUserStatusPoints"];
    };
    this.getDwUrl = function () {
        return _obj["dwUrl"];
    };
    this.getRewardCreditsCap = function () {
        return _obj["rewardCreditsCap"];
    };

    /** @type {CIE.StatusBracketModel[]} */
    this.getStatuses = function () {
        return _obj["statuses"];
    };
};
CIE.OneRewardResponseModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;

        _obj["config"] = new CIE.OneRewardConfigModel(_obj["config"]);

        if (_obj["statusChangeEvent"] != null) {
            _obj["statusChangeEvent"] = new CIE.StatusChangeModel(_obj["statusChangeEvent"]);
        }
        else {
            _obj["statusChangeEvent"] = null;
        }

        _obj["status"] = new CIE.StatusModel(_obj["status"]);
        _obj["exchangeRate"] = new CIE.ExchangeRateModel(_obj["exchangeRate"]);
    }

    /** @type {string} */
    this.getTimestamp = function () {
        return _obj["timestamp"];
    };

    /** @type {array} */
    this.getClientStepsCompleted = function () {
        return _obj["clientStepsCompleted"];
    };

    /** @type {CIE.OneRewardConfigModel} */
    this.getConfig = function () {
        return _obj["config"];
    };

    /** @type {CIE.StatusChangeModel} */
    this.getStatusChangeEvent = function () {
        return _obj["statusChangeEvent"];
    };

    /** @type {CIE.StatusModel} */
    this.getStatus = function () {
        return _obj["status"];
    };

    /** @type {CIE.ExchangeRateModel} */
    this.getExchangeRate = function () {
        return _obj["exchangeRate"];
    };

    this.getObj = function () {
        return _obj;
    };

    this.rawData = null;
};
CIE.PricePointModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
    }

    this.getLowerBound = function () {
        return _obj["lowerBound"];
    };
    this.getUpperBound = function () {
        return _obj["upperBound"];
    };
    this.getBaseRate = function () {
        return _obj["baseRate"];
    };
};
CIE.StatusBracketModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
    }

    this.getStatusId = function () {
        return _obj["statusId"];
    };
    this.getStatusLabel = function () {
        return _obj["statusLabel"];
    };
    this.getMinPoints = function () {
        return _obj["minPoints"];
    };
};
CIE.StatusChangeModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
        _obj["event"] = new CIE.TransactionEventModel(_obj["event"]);
    }

    this.getPreviousStatusId = function () {
        return _obj["previousStatusId"];
    };

    /** @type {CIE.TransactionEventModel} */
    this.getEvent = function () {
        return _obj["event"];
    };
};
CIE.StatusModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
    }

    this.getStatusId = function () {
        return _obj["statusId"];
    };
    this.getStatusPoints = function () {
        return _obj["statusPoints"];
    };
    this.getStatusPointsUntilStatusUp = function () {
        return _obj["statusPointsUntilStatusUp"];
    };
    this.getStatusExpiration = function () {
        return _obj["statusExpiration"];
    };
    this.getStatusPointsExpiration = function () {
        return _obj["statusPointsExpiration"];
    };
    this.getLastStatusChangeTime = function () {
        return _obj["lastStatusChangeTime"];
    };
    this.getStatusIdPostExpiration = function () {
        return _obj["statusIdPostExpiration"];
    };
    this.getTrEnabled = function () {
        return _obj["trEnabled"] == 1;
    };
    this.getTrHidden = function () {
        return _obj["trHidden"] == 1;
    };

    this.getTrAccountId = function () {
        return _obj["trAccountId"];
    };
    this.setTrAccountId = function (value) {
        _obj["trAccountId"] = value;
    };

    this.getTrNumber = function () {
        return _obj["trNumber"];
    };
    this.setTrNumber = function (value) {
        _obj["trNumber"] = value;
    };
};
CIE.TotalRewardsResponseModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
    }

    this.getResultCode = function () {
        return _obj["header"]["resultCode"];
    };
    this.getResultMessage = function () {
        return _obj["header"]["resultMessage"];
    };
    this.getFirstName = function () {
        return _obj["body"]["firstName"];
    };
    this.getLastName = function () {
        return _obj["body"]["lastName"];
    };
    this.getTierCode = function () {
        return _obj["body"]["tierCode"];
    };
    this.getPostedRCBalance = function () {
        return _obj["body"]["postedRCBalance"];
    };
    this.getUnpostedRCBalance = function () {
        return _obj["body"]["unpostedRCBalance"];
    };
    this.getRewardCreditsBalance = function () {
        return this.getPostedRCBalance() + this.getUnpostedRCBalance();
    };
    this.getIsIDVerified = function () {
        return _obj["body"]["isIDVerified"] == 1;
    };

    this.rawData = null;
};
CIE.TransactionEventModel = function (obj) {
    var _obj;

    if (obj != null) {
        _obj = obj;
    }

    this.getTimestamp = function () {
        return _obj["timestamp"];
    };
    this.getSourceApp = function () {
        return _obj["sourceApp"];
    };
    this.getSource = function () {
        return _obj["source"];
    };
    this.getAmount = function () {
        return _obj["amount"];
    };
    this.getCurrency = function () {
        return _obj["currency"];
    };
    this.getTransactionId = function () {
        return _obj["transactionId"];
    };
};
CIE.OneRewardPopup = function () {
};

CIE.OneRewardPopup.isInitialized = false;
CIE.OneRewardPopup.isClosed = true;
CIE.OneRewardPopup.iframeW = 720;
CIE.OneRewardPopup.iframeH = 480;
CIE.OneRewardPopup.iframeAspectRatio = 1.5;
CIE.OneRewardPopup.iframeContentLoaded = false;
CIE.OneRewardPopup.additionalMarginHeight = 0;
CIE.OneRewardPopup.gameDivId = "gameDiv";
CIE.OneRewardPopup.onDataFromPopupCallback = undefined; //only for HTML5 games
CIE.OneRewardPopup.version = "1.5";
CIE.OneRewardPopup.manualLeft = null;
CIE.OneRewardPopup.manualTop = null;

CIE.OneRewardPopup.open = function (cdnWebsiteUrl, oneRewardUrl, appKey, userId, sessionId, currency, platform, deeplink) {
    if (CIE.OneRewardPopup.isClosed == false) return;

    CIE.OneRewardPopup.isClosed = false;
    displayFlashScreenshot(true);

    if (CIE.OneRewardPopup.isInitialized == false) {
        CIE.OneRewardPopup.isInitialized = true;
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child IFrame window
        eventer(messageEvent, function (e) {
            console.log("OneReward Popup: " + e.data);
            if (e.data == "close") {
                CIE.OneRewardPopup.close();
            }
            else if (e.data == "complete") {
                CIE.OneRewardPopup.iframeContentLoaded = true;
            }
            else if (e.data.substr(0, 10) == "popupdata?") {
                onDataFromPopup(e.data.substring(10));
            }
        }, false);

        function onDataFromPopup(str) {
            if (CIE.OneReward != undefined && CIE.OneRewardPopup.onDataFromPopupCallback != undefined) {
                CIE.OneRewardPopup.onDataFromPopupCallback(str);
            }
            else {
                console.log("CIE.OneRewardPopup.gameDivId " + CIE.OneRewardPopup.gameDivId);
                if (document.getElementById(CIE.OneRewardPopup.gameDivId)) {
                    if (document.getElementById(CIE.OneRewardPopup.gameDivId)["onDataFromPopup"] != null) {
                        document.getElementById(CIE.OneRewardPopup.gameDivId)["onDataFromPopup"](str);
                    }
                    else {
                        console.log("onDataFromPopup callback not defined!");
                    }
                }
                else {
                    console.log(CIE.OneRewardPopup.gameDivId + " UNDEFINED!");
                }
            }
        }

        function getMarginLeft() {
            if (CIE.OneRewardPopup.manualLeft == null) {
                return (-CIE.OneRewardPopup.iframeW / 2) + "px";
            }
            else return 0;
        }

        function getLeft() {
            if (CIE.OneRewardPopup.manualLeft == null) {
                return "50%";
            }
            else return CIE.OneRewardPopup.manualLeft + "px";
        }

        function getMarginTop() {
            if (CIE.OneRewardPopup.manualTop == null) {
                return CIE.OneRewardPopup.additionalMarginHeight - (CIE.OneRewardPopup.iframeH / 2) + "px";
            }
            else return 0;
        }

        function getTop() {
            if (CIE.OneRewardPopup.manualTop == null) {
                return "50%";
            }
            else return CIE.OneRewardPopup.manualTop + "px";
        }

        function getLeftSpinner() {
            if (CIE.OneRewardPopup.manualLeft == null) {
                return "50%";
            }
            else return CIE.OneRewardPopup.manualLeft + (CIE.OneRewardPopup.iframeW / 2) + "px";
        }

        function getTopSpinner() {
            if (CIE.OneRewardPopup.manualTop == null) {
                return "50%";
            }
            else return CIE.OneRewardPopup.manualTop + (CIE.OneRewardPopup.iframeH / 2) + "px";
        }

        var css = '#overlay { display: block; top: 0; text-align:center; z-index: 2020; background-color: #000; height: 100%; left: 0; opacity: 0.7;position: fixed;top: 0;width: 100%;}' +
            '#overlay a{ text-decoration: none;color: #FFF;position: absolute;right:0;margin:50px;}' +
            '#OneRewardDiv{display:hidden; z-index:2021; background-color:none; position:absolute; margin-left:' + getMarginLeft() + '; left:' + getLeft() + '; margin-top:' + getMarginTop() + '; top:' + getTop() + ';}' +

            '@keyframes spin { to { transform: rotate(1turn); }}' +
            '@-webkit-keyframes spin {to { -webkit-transform: rotate(1turn); }}' +
            '.oneprogress {left:' + getLeftSpinner() + '; top:' + getTopSpinner() + '; margin-top:' + (CIE.OneRewardPopup.additionalMarginHeight - 50) + 'px; margin-left:-50px; display:inline-block; width:5em; height: 5em; overflow:hidden; animation:spin 1s infinite steps(8); -webkit-animation:spin 1s infinite steps(8); position:absolute; }' +
            '.large.oneprogress {font-size: 24px;}' +
            '.oneprogress:before,.oneprogress:after,.oneprogress > div:before,.oneprogress > div:after {content: \'\';position: absolute;top: 0;left: 2.25em;width: .5em;height: 1.5em;border-radius: .2em;background: #eee;box-shadow: 0 3.5em #eee;transform-origin: 50% 2.5em;  -webkit-transform-origin: 50% 2.5em;}' +
            '.oneprogress:before {background: #555;}' +
            '.oneprogress:after {transform: rotate(-45deg); -webkit-transform: rotate(-45deg); background: #777;}' +
            '.oneprogress > div:before { transform: rotate(-90deg);-webkit-transform: rotate(-90deg);background: #999;}' +
            '.oneprogress > div:after {transform: rotate(-135deg);-webkit-transform: rotate(-135deg); background: #bbb;}';


        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    }

    var overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay';
    overlayDiv.innerHTML = '<a id="closeOverlay" href="javascript:CIE.OneRewardPopup.close();" ><span>X</span></a><div id="spinner" class="large oneprogress"><div>Loadingâ€¦</div></div>';
    document.getElementsByTagName('body')[0].appendChild(overlayDiv);

    var iframe = document.createElement('iframe');
    iframe.id = 'onerewardiframe';
    iframe.name = 'onerewardiframe';

    iframe.width = 0;
    iframe.height = 0;
    iframe.style.border = 'none';

    iframe.src = cdnWebsiteUrl + "/index.html?oneRewardUrl=" + oneRewardUrl + "&appKey=" + appKey + "&userId=" + userId + "&sessionId=" + sessionId + "&currency=" + currency + "&platform=" + platform + "&deeplink=" + deeplink;

    var iframeLoadedCheck = function (startTime) {
        var intervalCont = null;
        if (window["onerewardiframe"] != undefined) {

            intervalCont = setInterval(function () {
                if (new Date().getTime() - startTime > 30000 || document.getElementById("onerewardiframe") == null) {
                    console.log("OneReward iframe ready but content failed to load in 30 sec!");
                    clearInterval(intervalCont);
                    window.postMessage('popupdata?' + 'OneRewardPopupEvent.timeout', '*');
                    CIE.OneRewardPopup.close();
                }
                else if (CIE.OneRewardPopup.iframeContentLoaded) {
                    if (document.getElementById('onerewardiframe') == null) {
                        clearInterval(intervalCont);
                        return;
                    }

                    console.log("OneReward iframe content loaded!");
                    document.getElementById('onerewardiframe').width = CIE.OneRewardPopup.iframeW;
                    document.getElementById('onerewardiframe').height = CIE.OneRewardPopup.setWidth(CIE.OneRewardPopup.iframeW);
                    clearInterval(intervalCont);

                    //Hide X and Spinner
                    var elX = document.getElementById("closeOverlay");
                    elX.parentNode.removeChild(elX);
                    var spinner = document.getElementById("spinner");
                    spinner.parentNode.removeChild(spinner);
                    CIE.OneRewardPopup.iframeContentLoaded = false;
                }
            }, 50);
        }
        else {
            if (interval != null) {
                clearInterval(intervalCont);
            }
        }
    };

    var iframeReady = false;
    var startTime = new Date().getTime();
    var interval = setInterval(function () {
        if (window["onerewardiframe"] != undefined) {
            if (new Date().getTime() - startTime > 30000) {
                console.log("Failed to load OneReward iframe, 30 sec passed!");
                clearInterval(interval);
                window.postMessage('popupdata?' + 'OneRewardPopupEvent.timeout', '*');
                CIE.OneRewardPopup.close();
            } else if (iframeReady) {
                console.log("OneReward iframe is ready... Waiting on content!");
                clearInterval(interval);
                iframeLoadedCheck(startTime);
            }
        }
        else {
            clearInterval(interval);
        }
    }, 50);

    if (iframe.addEventListener) {
        iframe.addEventListener("load", function () {
            iframeReady = true;
        });
    }
    else {
        iframe.attachEvent("onload", function () {
            iframeReady = true;
        });
    }

    document.getElementById('OneRewardDiv').appendChild(iframe);
    document.getElementById("OneRewardDiv").style.display = "block";
};

CIE.OneRewardPopup.close = function () {
    if (CIE.OneRewardPopup.isClosed == false) {
        window.postMessage('popupdata?' + 'OneRewardPopupEvent.close', '*');

        var el = document.getElementById("overlay");
        var elem = document.getElementById("onerewardiframe");

        if (el != null) {
            el.parentNode.removeChild(el);
        }

        if (elem != null) {
            elem.parentNode.removeChild(elem);
        }

        document.getElementById("OneRewardDiv").style.display = "none";
        CIE.OneRewardPopup.isClosed = true;
        hideFlashScreenshot(true);
        activateTab('play');
    }
};

CIE.OneRewardPopup.setWidth = function (width) {
    CIE.OneRewardPopup.iframeW = width;
    CIE.OneRewardPopup.iframeH = CIE.OneRewardPopup.iframeW / CIE.OneRewardPopup.iframeAspectRatio;
    return CIE.OneRewardPopup.iframeH;
};

CIE.OneRewardPopup.setAdditionalMarginHeight = function (additionalMarginHeight) {
    CIE.OneRewardPopup.additionalMarginHeight = additionalMarginHeight;
};

CIE.OneRewardPopup.setManualLeft = function (value) {
    CIE.OneRewardPopup.manualLeft = value;
};

CIE.OneRewardPopup.setManualTop = function (value) {
    CIE.OneRewardPopup.manualTop = value;
};

CIE.OneRewardPopup.setGameDivId = function (gameDivId) {
    CIE.OneRewardPopup.gameDivId = gameDivId;
};

CIE.OneRewardPopup.centerPopupOnDiv = function () {
    var game = document.getElementById(CIE.OneRewardPopup.gameDivId);
    var gameHeight = game.clientHeight;

    // calculate game offset from the top
    for (var gameTop = 0, el = game; el != null; gameTop += el.offsetTop, el = el.offsetParent) {
    }

    var docHeight = window.innerHeight;
    var gameBottom = docHeight - gameHeight - gameTop;

    CIE.OneRewardPopup.additionalMarginHeight = ( gameTop - gameBottom ) / 2;
};
CIE.AsyncHTTPJSONRequest = function (url, callback, params, type) {
    var _url = url;
    var _callback = callback;
    var _params = params;

    if (type == undefined) {
        type = "POST";
    }

    function _getXML() {
        if (typeof XMLHttpRequest !== 'undefined') {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                return xhr;
            }
        }

        if (typeof XDomainRequest != "undefined") {
            var xdr = new XDomainRequest();
            xdr.onload = function () {
                if (_callback != undefined) {
                    _callback(xdr.responseText);
                }
            };
            xdr.onerror = function () {
                if (_callback != undefined) {
                    _callback(CIE.AsyncHTTPJSONRequest.ERROR);
                }
            };
            xdr.onprogress = function () {
            };
            xdr.ontimeout = function () {
                if (_callback != undefined) {
                    _callback(CIE.AsyncHTTPJSONRequest.ERROR, CIE.AsyncHTTPJSONRequest.TIMEOUT);
                }
            };
            return xdr;
        }

        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.3.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    }

    this.load = function () {
        try {
            var _xml = _getXML();
            _xml.open(type, _url, true);
            if (_callback != undefined) {
                _xml.onreadystatechange = function () {
                    if (_xml.readyState == 4) {
                        if (_xml.status == 200) {
                            _callback(_xml.responseText, _xml.status);
                        }
                        else {
                            _callback(CIE.AsyncHTTPJSONRequest.ERROR, _xml.status);
                        }
                    }
                };

                _xml.ontimeout = function () {
                    _callback(CIE.AsyncHTTPJSONRequest.ERROR, CIE.AsyncHTTPJSONRequest.TIMEOUT);
                };
            }
            if (_xml.setRequestHeader) {
                _xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }

            if (typeof _params === 'string') {
                // this is a string
            }
            else if (_params == undefined) {
                _params = "{}";
            }
            else {
                try {
                    _params = JSON.stringify(_params);
                }
                catch (error) {
                    _params = "{}";
                    console.log(error);
                }
            }

            _xml.send(_params);
        }
        catch (error) {
            console.log(error);
        }
    };
};

CIE.AsyncHTTPJSONRequest.ERROR = "ERROR";
CIE.AsyncHTTPJSONRequest.TIMEOUT = "TIMEOUT";
CIE.Pair = function (first, second) {
    this.first = first;
    this.second = second;
};
/**
 * @return {string}
 */
CIE.UUID = function () {
    var d = new Date().getTime();
    var uuid;
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};
