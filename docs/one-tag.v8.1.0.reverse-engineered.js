/*! ONE Javascript SDK - v8.1.0 | http://thunderhead.com | Copyright (c) 2017 Thunderhead */
(function (root, factory) {

    var domReadyTime, getTime = function () {
        return (Date.now) ? Date.now() : new Date().getTime();
    };

    function addOnLoadEvent(callback) {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
        } else {
            // for IE8
            document.attachEvent('onload', callback);
        }
    }

    // calculate DOMContentLoaded timestamp for later use
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        domReadyTime = getTime();
    } else {
        addOnLoadEvent(function () {
            domReadyTime = getTime();
        });
    }

    var callback = function (customerApi, defaults) {
        // Begin custom block

        // Call to ONE for any Optimizations for the provided interaction
        customerApi.sendInteraction(defaults.interaction, defaults.properties).then(function (response) {
            // Default response processing logic for sendInteraction
            customerApi.processResponse(response);
        });

        // End custom block
    };

    var settings = {
        host: 'https://eu2.thunderhead.com',
        sk: 'ONE-XXXXXXXXXX-0000',
        pv: '',
        domReadyTime: domReadyTime,
        cookieSuffix: 'ABCDEFG'
    };

    var tag = factory();

    tag.go(root, settings, root.location.href, callback);

}(this, function () {

    var requirejs, require, define;
    !function (a) {
        function b(a, b) {
            return r.call(a, b)
        }

        function c(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o = b && b.split("/"), q = p.map, r = q && q["*"] || {};
            if (a) {
                for (a = a.split("/"),
                         g = a.length - 1,
                     p.nodeIdCompat && t.test(a[g]) && (a[g] = a[g].replace(t, "")),
                     "." === a[0].charAt(0) && o && (n = o.slice(0, o.length - 1),
                         a = n.concat(a)),
                         k = 0; k < a.length; k++)
                    if (m = a[k],
                        "." === m)
                        a.splice(k, 1),
                            k -= 1;
                    else if (".." === m) {
                        if (0 === k || 1 === k && ".." === a[2] || ".." === a[k - 1])
                            continue;
                        k > 0 && (a.splice(k - 1, 2),
                            k -= 2)
                    }
                a = a.join("/")
            }
            if ((o || r) && q) {
                for (c = a.split("/"),
                         k = c.length; k > 0; k -= 1) {
                    if (d = c.slice(0, k).join("/"),
                            o)
                        for (l = o.length; l > 0; l -= 1)
                            if (e = q[o.slice(0, l).join("/")],
                                e && (e = e[d])) {
                                f = e,
                                    h = k;
                                break
                            }
                    if (f)
                        break;
                    !i && r && r[d] && (i = r[d],
                        j = k)
                }
                !f && i && (f = i,
                    h = j),
                f && (c.splice(0, h, f),
                    a = c.join("/"))
            }
            return a
        }

        function d(b, c) {
            return function () {
                var d = s.call(arguments, 0);
                return "string" != typeof d[0] && 1 === d.length && d.push(null),
                    k.apply(a, d.concat([b, c]))
            }
        }

        function e(a) {
            return function (b) {
                return c(b, a)
            }
        }

        function f(a) {
            return function (b) {
                n[a] = b
            }
        }

        function g(c) {
            if (b(o, c)) {
                var d = o[c];
                delete o[c],
                    q[c] = !0,
                    j.apply(a, d)
            }
            if (!b(n, c) && !b(q, c))
                throw new Error("No " + c);
            return n[c]
        }

        function h(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c),
                a = a.substring(c + 1, a.length)),
                [b, a]
        }

        function i(a) {
            return function () {
                return p && p.config && p.config[a] || {}
            }
        }

        var j, k, l, m, n = {}, o = {}, p = {}, q = {}, r = Object.prototype.hasOwnProperty, s = [].slice, t = /\.js$/;
        l = function (a, b) {
            var d, f = h(a), i = f[0];
            return a = f[1],
            i && (i = c(i, b),
                d = g(i)),
                i ? a = d && d.normalize ? d.normalize(a, e(b)) : c(a, b) : (a = c(a, b),
                    f = h(a),
                    i = f[0],
                    a = f[1],
                i && (d = g(i))),
                {
                    f: i ? i + "!" + a : a,
                    n: a,
                    pr: i,
                    p: d
                }
        }
            ,
            m = {
                require: function (a) {
                    return d(a)
                },
                exports: function (a) {
                    var b = n[a];
                    return "undefined" != typeof b ? b : n[a] = {}
                },
                module: function (a) {
                    return {
                        id: a,
                        uri: "",
                        exports: n[a],
                        config: i(a)
                    }
                }
            },
            j = function (c, e, h, i) {
                var j, k, p, r, s, t, u = [], v = typeof h;
                if (i = i || c,
                    "undefined" === v || "function" === v) {
                    for (e = !e.length && h.length ? ["require", "exports", "module"] : e,
                             s = 0; s < e.length; s += 1)
                        if (r = l(e[s], i),
                                k = r.f,
                            "require" === k)
                            u[s] = m.require(c);
                        else if ("exports" === k)
                            u[s] = m.exports(c),
                                t = !0;
                        else if ("module" === k)
                            j = u[s] = m.module(c);
                        else if (b(n, k) || b(o, k) || b(q, k))
                            u[s] = g(k);
                        else {
                            if (!r.p)
                                throw new Error(c + " missing " + k);
                            r.p.load(r.n, d(i, !0), f(k), {}),
                                u[s] = n[k]
                        }
                    p = h ? h.apply(n[c], u) : void 0,
                    c && (j && j.exports !== a && j.exports !== n[c] ? n[c] = j.exports : p === a && t || (n[c] = p))
                } else
                    c && (n[c] = h)
            }
            ,
            requirejs = require = k = function (b, c, d, e, f) {
                if ("string" == typeof b)
                    return m[b] ? m[b](c) : g(l(b, c).f);
                if (!b.splice) {
                    if (p = b,
                        p.deps && k(p.deps, p.callback),
                            !c)
                        return;
                    c.splice ? (b = c,
                        c = d,
                        d = null) : b = a
                }
                return c = c || function () {
                    }
                    ,
                "function" == typeof d && (d = e,
                    e = f),
                    e ? j(a, b, c, d) : setTimeout(function () {
                        j(a, b, c, d)
                    }, 4),
                    k
            }
            ,
            k.config = function (a) {
                return k(a)
            }
            ,
            requirejs._defined = n,
            define = function (a, c, d) {
                if ("string" != typeof a)
                    throw new Error("See almond README: incorrect module build, no module name");
                c.splice || (d = c,
                    c = []),
                b(n, a) || b(o, a) || (o[a] = [a, c, d])
            }
            ,
            define.amd = {
                jQuery: !0
            }
    }(),
        define("node_modules/almond/almond", function () {
        }),
        function (a, b) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
                if (!a.document)
                    throw new Error("jQuery requires a window with a document");
                return b(a)
            }
                : b(a)
        }("undefined" != typeof window ? window : this, function (a, b) {
            function c(a) {
                var b = "length" in a && a.length
                    , c = Q.type(a);
                return "function" !== c && !Q.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
            }

            function d(a, b, c) {
                if (Q.isFunction(b))
                    return Q.grep(a, function (a, d) {
                        return !!b.call(a, d, a) !== c
                    });
                if (b.nodeType)
                    return Q.grep(a, function (a) {
                        return a === b !== c
                    });
                if ("string" == typeof b) {
                    if (Y.test(b))
                        return Q.filter(b, a, c);
                    b = Q.filter(b, a)
                }
                return Q.grep(a, function (a) {
                    return Q.inArray(a, b) >= 0 !== c
                })
            }

            function e(a, b) {
                do
                    a = a[b];
                while (a && 1 !== a.nodeType);
                return a
            }

            function f(a) {
                var b = ea[a] = {};
                return Q.each(a.match(da) || [], function (a, c) {
                    b[c] = !0
                }),
                    b
            }

            function g() {
                $.addEventListener ? ($.removeEventListener("DOMContentLoaded", h, !1),
                    a.removeEventListener("load", h, !1)) : ($.detachEvent("onreadystatechange", h),
                    a.detachEvent("onload", h))
            }

            function h() {
                ($.addEventListener || "load" === event.type || "complete" === $.readyState) && (g(),
                    Q.ready())
            }

            function i(a, b, c) {
                if (void 0 === c && 1 === a.nodeType) {
                    var d = "data-" + b.replace(ja, "-$1").toLowerCase();
                    if (c = a.getAttribute(d),
                        "string" == typeof c) {
                        try {
                            c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : ia.test(c) ? Q.parseJSON(c) : c)
                        } catch (e) {
                        }
                        Q.data(a, b, c)
                    } else
                        c = void 0
                }
                return c
            }

            function j(a) {
                var b;
                for (b in a)
                    if (("data" !== b || !Q.isEmptyObject(a[b])) && "toJSON" !== b)
                        return !1;
                return !0
            }

            function k(a, b, c, d) {
                if (Q.acceptData(a)) {
                    var e, f, g = Q.expando, h = a.nodeType, i = h ? Q.cache : a, j = h ? a[g] : a[g] && g;
                    if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b)
                        return j || (j = h ? a[g] = G.pop() || Q.guid++ : g),
                        i[j] || (i[j] = h ? {} : {
                            toJSON: Q.noop
                        }),
                        "object" != typeof b && "function" != typeof b || (d ? i[j] = Q.extend(i[j], b) : i[j].data = Q.extend(i[j].data, b)),
                            f = i[j],
                        d || (f.data || (f.data = {}),
                            f = f.data),
                        void 0 !== c && (f[Q.camelCase(b)] = c),
                            "string" == typeof b ? (e = f[b],
                            null == e && (e = f[Q.camelCase(b)])) : e = f,
                            e
                }
            }

            function l(a, b, c) {
                if (Q.acceptData(a)) {
                    var d, e, f = a.nodeType, g = f ? Q.cache : a, h = f ? a[Q.expando] : Q.expando;
                    if (g[h]) {
                        if (b && (d = c ? g[h] : g[h].data)) {
                            Q.isArray(b) ? b = b.concat(Q.map(b, Q.camelCase)) : b in d ? b = [b] : (b = Q.camelCase(b),
                                b = b in d ? [b] : b.split(" ")),
                                e = b.length;
                            for (; e--;)
                                delete d[b[e]];
                            if (c ? !j(d) : !Q.isEmptyObject(d))
                                return
                        }
                        (c || (delete g[h].data,
                            j(g[h]))) && (f ? Q.cleanData([a], !0) : O.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
                    }
                }
            }

            function m() {
                return !0
            }

            function n() {
                return !1
            }

            function o() {
                try {
                    return $.activeElement
                } catch (a) {
                }
            }

            function p(a) {
                var b = ra.split("|")
                    , c = a.createDocumentFragment();
                if (c.createElement)
                    for (; b.length;)
                        c.createElement(b.pop());
                return c
            }

            function q(a, b) {
                var c, d, e = 0,
                    f = typeof a.getElementsByTagName !== ha ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== ha ? a.querySelectorAll(b || "*") : void 0;
                if (!f)
                    for (f = [],
                             c = a.childNodes || a; null != (d = c[e]); e++)
                        !b || Q.nodeName(d, b) ? f.push(d) : Q.merge(f, q(d, b));
                return void 0 === b || b && Q.nodeName(a, b) ? Q.merge([a], f) : f
            }

            function r(a) {
                la.test(a.type) && (a.defaultChecked = a.checked)
            }

            function s(a, b) {
                return Q.nodeName(a, "table") && Q.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
            }

            function t(a) {
                return a.type = (null !== Q.find.attr(a, "type")) + "/" + a.type,
                    a
            }

            function u(a) {
                var b = Ca.exec(a.type);
                return b ? a.type = b[1] : a.removeAttribute("type"),
                    a
            }

            function v(a, b) {
                for (var c, d = 0; null != (c = a[d]); d++)
                    Q._data(c, "globalEval", !b || Q._data(b[d], "globalEval"))
            }

            function w(a, b) {
                if (1 === b.nodeType && Q.hasData(a)) {
                    var c, d, e, f = Q._data(a), g = Q._data(b, f), h = f.events;
                    if (h) {
                        delete g.handle,
                            g.events = {};
                        for (c in h)
                            for (d = 0,
                                     e = h[c].length; d < e; d++)
                                Q.event.add(b, c, h[c][d])
                    }
                    g.data && (g.data = Q.extend({}, g.data))
                }
            }

            function x(a, b) {
                var c, d, e;
                if (1 === b.nodeType) {
                    if (c = b.nodeName.toLowerCase(),
                        !O.noCloneEvent && b[Q.expando]) {
                        e = Q._data(b);
                        for (d in e.events)
                            Q.removeEvent(b, d, e.handle);
                        b.removeAttribute(Q.expando)
                    }
                    "script" === c && b.text !== a.text ? (t(b).text = a.text,
                        u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML),
                    O.html5Clone && a.innerHTML && !Q.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && la.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
                    b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
                }
            }

            function y(a) {
                return function (b, c) {
                    "string" != typeof b && (c = b,
                        b = "*");
                    var d, e = 0, f = b.toLowerCase().match(da) || [];
                    if (Q.isFunction(c))
                        for (; d = f[e++];)
                            "+" === d.charAt(0) ? (d = d.slice(1) || "*",
                                (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
                }
            }

            function z(a, b, c, d) {
                function e(h) {
                    var i;
                    return f[h] = !0,
                        Q.each(a[h] || [], function (a, h) {
                            var j = h(b, c, d);
                            return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
                                e(j),
                                !1)
                        }),
                        i
                }

                var f = {}
                    , g = a === cb;
                return e(b.dataTypes[0]) || !f["*"] && e("*")
            }

            function A(a, b) {
                var c, d, e = Q.ajaxSettings.flatOptions || {};
                for (d in b)
                    void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
                return c && Q.extend(!0, a, c),
                    a
            }

            function B(a, b, c) {
                for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];)
                    i.shift(),
                    void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
                if (e)
                    for (g in h)
                        if (h[g] && h[g].test(e)) {
                            i.unshift(g);
                            break
                        }
                if (i[0] in c)
                    f = i[0];
                else {
                    for (g in c) {
                        if (!i[0] || a.converters[g + " " + i[0]]) {
                            f = g;
                            break
                        }
                        d || (d = g)
                    }
                    f = f || d
                }
                if (f)
                    return f !== i[0] && i.unshift(f),
                        c[f]
            }

            function C(a, b, c, d) {
                var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
                if (k[1])
                    for (g in a.converters)
                        j[g.toLowerCase()] = a.converters[g];
                for (f = k.shift(); f;)
                    if (a.responseFields[f] && (c[a.responseFields[f]] = b),
                        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
                            i = f,
                            f = k.shift())
                        if ("*" === f)
                            f = i;
                        else if ("*" !== i && i !== f) {
                            if (g = j[i + " " + f] || j["* " + f],
                                    !g)
                                for (e in j)
                                    if (h = e.split(" "),
                                        h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0],
                                                k.unshift(h[1]));
                                        break
                                    }
                            if (g !== !0)
                                if (g && a["throws"])
                                    b = g(b);
                                else
                                    try {
                                        b = g(b)
                                    } catch (l) {
                                        return {
                                            state: "parsererror",
                                            error: g ? l : "No conversion from " + i + " to " + f
                                        }
                                    }
                        }
                return {
                    state: "success",
                    data: b
                }
            }

            function D(a, b, c, d) {
                var e;
                if (Q.isArray(b))
                    Q.each(b, function (b, e) {
                        c || gb.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
                    });
                else if (c || "object" !== Q.type(b))
                    d(a, b);
                else
                    for (e in b)
                        D(a + "[" + e + "]", b[e], c, d)
            }

            function E() {
                try {
                    return new a.XMLHttpRequest
                } catch (b) {
                }
            }

            function F() {
                try {
                    return new a.ActiveXObject("Microsoft.XMLHTTP")
                } catch (b) {
                }
            }

            var G = []
                , H = G.slice
                , I = G.concat
                , J = G.push
                , K = G.indexOf
                , L = {}
                , M = L.toString
                , N = L.hasOwnProperty
                , O = {}
                ,
                P = "1.11.3 -css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-effects,-effects/Tween,-effects/animatedSelector,-effects/support,-dimensions,-offset,-deprecated"
                , Q = function (a, b) {
                    return new Q.fn.init(a, b)
                }
                , R = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
                , S = /^-ms-/
                , T = /-([\da-z])/gi
                , U = function (a, b) {
                    return b.toUpperCase()
                };
            Q.fn = Q.prototype = {
                jquery: P,
                constructor: Q,
                selector: "",
                length: 0,
                toArray: function () {
                    return H.call(this)
                },
                get: function (a) {
                    return null != a ? a < 0 ? this[a + this.length] : this[a] : H.call(this)
                },
                pushStack: function (a) {
                    var b = Q.merge(this.constructor(), a);
                    return b.prevObject = this,
                        b.context = this.context,
                        b
                },
                each: function (a, b) {
                    return Q.each(this, a, b)
                },
                map: function (a) {
                    return this.pushStack(Q.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                slice: function () {
                    return this.pushStack(H.apply(this, arguments))
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                eq: function (a) {
                    var b = this.length
                        , c = +a + (a < 0 ? b : 0);
                    return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: J,
                sort: G.sort,
                splice: G.splice
            },
                Q.extend = Q.fn.extend = function () {
                    var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
                    for ("boolean" == typeof g && (j = g,
                        g = arguments[h] || {},
                        h++),
                         "object" == typeof g || Q.isFunction(g) || (g = {}),
                         h === i && (g = this,
                             h--); h < i; h++)
                        if (null != (e = arguments[h]))
                            for (d in e)
                                a = g[d],
                                    c = e[d],
                                g !== c && (j && c && (Q.isPlainObject(c) || (b = Q.isArray(c))) ? (b ? (b = !1,
                                    f = a && Q.isArray(a) ? a : []) : f = a && Q.isPlainObject(a) ? a : {},
                                    g[d] = Q.extend(j, f, c)) : void 0 !== c && (g[d] = c));
                    return g
                }
                ,
                Q.extend({
                    expando: "jQuery" + (P + Math.random()).replace(/\D/g, ""),
                    isReady: !0,
                    error: function (a) {
                        throw new Error(a)
                    },
                    noop: function () {
                    },
                    isFunction: function (a) {
                        return "function" === Q.type(a)
                    },
                    isArray: Array.isArray || function (a) {
                        return "array" === Q.type(a)
                    }
                    ,
                    isWindow: function (a) {
                        return null != a && a == a.window
                    },
                    isNumeric: function (a) {
                        return !Q.isArray(a) && a - parseFloat(a) + 1 >= 0
                    },
                    isEmptyObject: function (a) {
                        var b;
                        for (b in a)
                            return !1;
                        return !0
                    },
                    isPlainObject: function (a) {
                        var b;
                        if (!a || "object" !== Q.type(a) || a.nodeType || Q.isWindow(a))
                            return !1;
                        try {
                            if (a.constructor && !N.call(a, "constructor") && !N.call(a.constructor.prototype, "isPrototypeOf"))
                                return !1
                        } catch (c) {
                            return !1
                        }
                        if (O.ownLast)
                            for (b in a)
                                return N.call(a, b);
                        for (b in a)
                            ;
                        return void 0 === b || N.call(a, b)
                    },
                    type: function (a) {
                        return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? L[M.call(a)] || "object" : typeof a
                    },
                    globalEval: function (b) {
                        b && Q.trim(b) && (a.execScript || function (b) {
                                a.eval.call(a, b)
                            }
                        )(b)
                    },
                    camelCase: function (a) {
                        return a.replace(S, "ms-").replace(T, U)
                    },
                    nodeName: function (a, b) {
                        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                    },
                    each: function (a, b, d) {
                        var e, f = 0, g = a.length, h = c(a);
                        if (d) {
                            if (h)
                                for (; f < g && (e = b.apply(a[f], d),
                                e !== !1); f++)
                                    ;
                            else
                                for (f in a)
                                    if (e = b.apply(a[f], d),
                                        e === !1)
                                        break
                        } else if (h)
                            for (; f < g && (e = b.call(a[f], f, a[f]),
                            e !== !1); f++)
                                ;
                        else
                            for (f in a)
                                if (e = b.call(a[f], f, a[f]),
                                    e === !1)
                                    break;
                        return a
                    },
                    trim: function (a) {
                        return null == a ? "" : (a + "").replace(R, "")
                    },
                    makeArray: function (a, b) {
                        var d = b || [];
                        return null != a && (c(Object(a)) ? Q.merge(d, "string" == typeof a ? [a] : a) : J.call(d, a)),
                            d
                    },
                    inArray: function (a, b, c) {
                        var d;
                        if (b) {
                            if (K)
                                return K.call(b, a, c);
                            for (d = b.length,
                                     c = c ? c < 0 ? Math.max(0, d + c) : c : 0; c < d; c++)
                                if (c in b && b[c] === a)
                                    return c
                        }
                        return -1
                    },
                    merge: function (a, b) {
                        for (var c = +b.length, d = 0, e = a.length; d < c;)
                            a[e++] = b[d++];
                        if (c !== c)
                            for (; void 0 !== b[d];)
                                a[e++] = b[d++];
                        return a.length = e,
                            a
                    },
                    grep: function (a, b, c) {
                        for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++)
                            d = !b(a[f], f),
                            d !== h && e.push(a[f]);
                        return e
                    },
                    map: function (a, b, d) {
                        var e, f = 0, g = a.length, h = c(a), i = [];
                        if (h)
                            for (; f < g; f++)
                                e = b(a[f], f, d),
                                null != e && i.push(e);
                        else
                            for (f in a)
                                e = b(a[f], f, d),
                                null != e && i.push(e);
                        return I.apply([], i)
                    },
                    guid: 1,
                    proxy: function (a, b) {
                        var c, d, e;
                        if ("string" == typeof b && (e = a[b],
                                b = a,
                                a = e),
                                Q.isFunction(a))
                            return c = H.call(arguments, 2),
                                d = function () {
                                    return a.apply(b || this, c.concat(H.call(arguments)))
                                }
                                ,
                                d.guid = a.guid = a.guid || Q.guid++,
                                d
                    },
                    now: function () {
                        return +new Date
                    },
                    support: O
                }),
                Q.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
                    L["[object " + b + "]"] = b.toLowerCase()
                });
            var V = function (a) {
                function b(a, b, c, d) {
                    var e, f, g, h, i, j, l, n, o, p;
                    if ((b ? b.ownerDocument || b : O) !== G && F(b),
                            b = b || G,
                            c = c || [],
                            h = b.nodeType,
                        "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h)
                        return c;
                    if (!d && I) {
                        if (11 !== h && (e = sa.exec(a)))
                            if (g = e[1]) {
                                if (9 === h) {
                                    if (f = b.getElementById(g),
                                        !f || !f.parentNode)
                                        return c;
                                    if (f.id === g)
                                        return c.push(f),
                                            c
                                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)
                                    return c.push(f),
                                        c
                            } else {
                                if (e[2])
                                    return $.apply(c, b.getElementsByTagName(a)),
                                        c;
                                if ((g = e[3]) && v.getElementsByClassName)
                                    return $.apply(c, b.getElementsByClassName(g)),
                                        c
                            }
                        if (v.qsa && (!J || !J.test(a))) {
                            if (n = l = N,
                                    o = b,
                                    p = 1 !== h && a,
                                1 === h && "object" !== b.nodeName.toLowerCase()) {
                                for (j = z(a),
                                         (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n),
                                         n = "[id='" + n + "'] ",
                                         i = j.length; i--;)
                                    j[i] = n + m(j[i]);
                                o = ta.test(a) && k(b.parentNode) || b,
                                    p = j.join(",")
                            }
                            if (p)
                                try {
                                    return $.apply(c, o.querySelectorAll(p)),
                                        c
                                } catch (q) {
                                } finally {
                                    l || b.removeAttribute("id")
                                }
                        }
                    }
                    return B(a.replace(ia, "$1"), b, c, d)
                }

                function c() {
                    function a(c, d) {
                        return b.push(c + " ") > w.cacheLength && delete a[b.shift()],
                            a[c + " "] = d
                    }

                    var b = [];
                    return a
                }

                function d(a) {
                    return a[N] = !0,
                        a
                }

                function e(a) {
                    var b = G.createElement("div");
                    try {
                        return !!a(b)
                    } catch (c) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b),
                            b = null
                    }
                }

                function f(a, b) {
                    for (var c = a.split("|"), d = a.length; d--;)
                        w.attrHandle[c[d]] = b
                }

                function g(a, b) {
                    var c = b && a
                        ,
                        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
                    if (d)
                        return d;
                    if (c)
                        for (; c = c.nextSibling;)
                            if (c === b)
                                return -1;
                    return a ? 1 : -1
                }

                function h(a) {
                    return function (b) {
                        var c = b.nodeName.toLowerCase();
                        return "input" === c && b.type === a
                    }
                }

                function i(a) {
                    return function (b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }

                function j(a) {
                    return d(function (b) {
                        return b = +b,
                            d(function (c, d) {
                                for (var e, f = a([], c.length, b), g = f.length; g--;)
                                    c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                            })
                    })
                }

                function k(a) {
                    return a && "undefined" != typeof a.getElementsByTagName && a
                }

                function l() {
                }

                function m(a) {
                    for (var b = 0, c = a.length, d = ""; b < c; b++)
                        d += a[b].value;
                    return d
                }

                function n(a, b, c) {
                    var d = b.dir
                        , e = c && "parentNode" === d
                        , f = Q++;
                    return b.first ? function (b, c, f) {
                        for (; b = b[d];)
                            if (1 === b.nodeType || e)
                                return a(b, c, f)
                    }
                        : function (b, c, g) {
                            var h, i, j = [P, f];
                            if (g) {
                                for (; b = b[d];)
                                    if ((1 === b.nodeType || e) && a(b, c, g))
                                        return !0
                            } else
                                for (; b = b[d];)
                                    if (1 === b.nodeType || e) {
                                        if (i = b[N] || (b[N] = {}),
                                            (h = i[d]) && h[0] === P && h[1] === f)
                                            return j[2] = h[2];
                                        if (i[d] = j,
                                                j[2] = a(b, c, g))
                                            return !0
                                    }
                        }
                }

                function o(a) {
                    return a.length > 1 ? function (b, c, d) {
                        for (var e = a.length; e--;)
                            if (!a[e](b, c, d))
                                return !1;
                        return !0
                    }
                        : a[0]
                }

                function p(a, c, d) {
                    for (var e = 0, f = c.length; e < f; e++)
                        b(a, c[e], d);
                    return d
                }

                function q(a, b, c, d, e) {
                    for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)
                        (f = a[h]) && (c && !c(f, d, e) || (g.push(f),
                        j && b.push(h)));
                    return g
                }

                function r(a, b, c, e, f, g) {
                    return e && !e[N] && (e = r(e)),
                    f && !f[N] && (f = r(f, g)),
                        d(function (d, g, h, i) {
                            var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [h] : h, []),
                                s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                            if (c && c(s, t, h, i),
                                    e)
                                for (j = q(t, n),
                                         e(j, [], h, i),
                                         k = j.length; k--;)
                                    (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                            if (d) {
                                if (f || a) {
                                    if (f) {
                                        for (j = [],
                                                 k = t.length; k--;)
                                            (l = t[k]) && j.push(s[k] = l);
                                        f(null, t = [], j, i)
                                    }
                                    for (k = t.length; k--;)
                                        (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                                }
                            } else
                                t = q(t === g ? t.splice(o, t.length) : t),
                                    f ? f(null, g, t, i) : $.apply(g, t)
                        })
                }

                function s(a) {
                    for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function (a) {
                        return a === b
                    }, g, !0), j = n(function (a) {
                        return aa(b, a) > -1
                    }, g, !0), k = [function (a, c, d) {
                        var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                        return b = null,
                            e
                    }
                    ]; h < e; h++)
                        if (c = w.relative[a[h].type])
                            k = [n(o(k), c)];
                        else {
                            if (c = w.filter[a[h].type].apply(null, a[h].matches),
                                    c[N]) {
                                for (d = ++h; d < e && !w.relative[a[d].type]; d++)
                                    ;
                                return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                                        value: " " === a[h - 2].type ? "*" : ""
                                    })).replace(ia, "$1"), c, h < d && s(a.slice(h, d)), d < e && s(a = a.slice(d)), d < e && m(a))
                            }
                            k.push(c)
                        }
                    return o(k)
                }

                function t(a, c) {
                    var e = c.length > 0
                        , f = a.length > 0
                        , g = function (d, g, h, i, j) {
                        var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j),
                            u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                        for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0; m = a[l++];)
                                    if (m(k, g, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (P = u)
                            }
                            e && ((k = !m && k) && n--,
                            d && p.push(k))
                        }
                        if (n += o,
                            e && o !== n) {
                            for (l = 0; m = c[l++];)
                                m(p, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;)
                                        p[o] || r[o] || (r[o] = Y.call(i));
                                r = q(r)
                            }
                            $.apply(i, r),
                            j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (P = u,
                            C = s),
                            p
                    };
                    return e ? d(g) : g
                }

                var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
                    O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function (a, b) {
                        return a === b && (E = !0),
                            0
                    }, V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice,
                    aa = function (a, b) {
                        for (var c = 0, d = a.length; c < d; c++)
                            if (a[c] === b)
                                return c;
                        return -1
                    },
                    ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ea = da.replace("w", "w#"),
                    fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
                    ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
                    ha = new RegExp(ca + "+", "g"),
                    ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
                    ja = new RegExp("^" + ca + "*," + ca + "*"),
                    ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
                    la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"), ma = new RegExp(ga),
                    na = new RegExp("^" + ea + "$"), oa = {
                        ID: new RegExp("^#(" + da + ")"),
                        CLASS: new RegExp("^\\.(" + da + ")"),
                        TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + fa),
                        PSEUDO: new RegExp("^" + ga),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + ba + ")$", "i"),
                        needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
                    }, pa = /^(?:input|select|textarea|button)$/i, qa = /^h\d$/i, ra = /^[^{]+\{\s*\[native \w/,
                    sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ta = /[+~]/, ua = /'|\\/g,
                    va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"), wa = function (a, b, c) {
                        var d = "0x" + b - 65536;
                        return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                    }, xa = function () {
                        F()
                    };
                try {
                    $.apply(X = _.call(O.childNodes), O.childNodes),
                        X[O.childNodes.length].nodeType
                } catch (ya) {
                    $ = {
                        apply: X.length ? function (a, b) {
                            Z.apply(a, _.call(b))
                        }
                            : function (a, b) {
                                for (var c = a.length, d = 0; a[c++] = b[d++];)
                                    ;
                                a.length = c - 1
                            }
                    }
                }
                v = b.support = {},
                    y = b.isXML = function (a) {
                        var b = a && (a.ownerDocument || a).documentElement;
                        return !!b && "HTML" !== b.nodeName
                    }
                    ,
                    F = b.setDocument = function (a) {
                        var b, c, d = a ? a.ownerDocument || a : O;
                        return d !== G && 9 === d.nodeType && d.documentElement ? (G = d,
                            H = d.documentElement,
                            c = d.defaultView,
                        c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)),
                            I = !y(d),
                            v.attributes = e(function (a) {
                                return a.className = "i",
                                    !a.getAttribute("className")
                            }),
                            v.getElementsByTagName = e(function (a) {
                                return a.appendChild(d.createComment("")),
                                    !a.getElementsByTagName("*").length
                            }),
                            v.getElementsByClassName = ra.test(d.getElementsByClassName),
                            v.getById = e(function (a) {
                                return H.appendChild(a).id = N,
                                !d.getElementsByName || !d.getElementsByName(N).length
                            }),
                            v.getById ? (w.find.ID = function (a, b) {
                                    if ("undefined" != typeof b.getElementById && I) {
                                        var c = b.getElementById(a);
                                        return c && c.parentNode ? [c] : []
                                    }
                                }
                                    ,
                                    w.filter.ID = function (a) {
                                        var b = a.replace(va, wa);
                                        return function (a) {
                                            return a.getAttribute("id") === b
                                        }
                                    }
                            ) : (delete w.find.ID,
                                    w.filter.ID = function (a) {
                                        var b = a.replace(va, wa);
                                        return function (a) {
                                            var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                                            return c && c.value === b
                                        }
                                    }
                            ),
                            w.find.TAG = v.getElementsByTagName ? function (a, b) {
                                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
                            }
                                : function (a, b) {
                                    var c, d = [], e = 0, f = b.getElementsByTagName(a);
                                    if ("*" === a) {
                                        for (; c = f[e++];)
                                            1 === c.nodeType && d.push(c);
                                        return d
                                    }
                                    return f
                                }
                            ,
                            w.find.CLASS = v.getElementsByClassName && function (a, b) {
                                    if (I)
                                        return b.getElementsByClassName(a)
                                }
                            ,
                            K = [],
                            J = [],
                        (v.qsa = ra.test(d.querySelectorAll)) && (e(function (a) {
                            H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>",
                            a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"),
                            a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"),
                            a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="),
                            a.querySelectorAll(":checked").length || J.push(":checked"),
                            a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
                        }),
                            e(function (a) {
                                var b = d.createElement("input");
                                b.setAttribute("type", "hidden"),
                                    a.appendChild(b).setAttribute("name", "D"),
                                a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="),
                                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                                    a.querySelectorAll("*,:x"),
                                    J.push(",.*:")
                            })),
                        (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function (a) {
                            v.disconnectedMatch = L.call(a, "div"),
                                L.call(a, "[s!='']:x"),
                                K.push("!=", ga)
                        }),
                            J = J.length && new RegExp(J.join("|")),
                            K = K.length && new RegExp(K.join("|")),
                            b = ra.test(H.compareDocumentPosition),
                            M = b || ra.test(H.contains) ? function (a, b) {
                                var c = 9 === a.nodeType ? a.documentElement : a
                                    , d = b && b.parentNode;
                                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                            }
                                : function (a, b) {
                                    if (b)
                                        for (; b = b.parentNode;)
                                            if (b === a)
                                                return !0;
                                    return !1
                                }
                            ,
                            U = b ? function (a, b) {
                                if (a === b)
                                    return E = !0,
                                        0;
                                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                                    1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
                            }
                                : function (a, b) {
                                    if (a === b)
                                        return E = !0,
                                            0;
                                    var c, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
                                    if (!f || !h)
                                        return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                                    if (f === h)
                                        return g(a, b);
                                    for (c = a; c = c.parentNode;)
                                        i.unshift(c);
                                    for (c = b; c = c.parentNode;)
                                        j.unshift(c);
                                    for (; i[e] === j[e];)
                                        e++;
                                    return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                                }
                            ,
                            d) : G
                    }
                    ,
                    b.matches = function (a, c) {
                        return b(a, null, null, c)
                    }
                    ,
                    b.matchesSelector = function (a, c) {
                        if ((a.ownerDocument || a) !== G && F(a),
                                c = c.replace(la, "='$1']"),
                            v.matchesSelector && I && (!K || !K.test(c)) && (!J || !J.test(c)))
                            try {
                                var d = L.call(a, c);
                                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                                    return d
                            } catch (e) {
                            }
                        return b(c, G, null, [a]).length > 0
                    }
                    ,
                    b.contains = function (a, b) {
                        return (a.ownerDocument || a) !== G && F(a),
                            M(a, b)
                    }
                    ,
                    b.attr = function (a, b) {
                        (a.ownerDocument || a) !== G && F(a);
                        var c = w.attrHandle[b.toLowerCase()]
                            , d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                        return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                    }
                    ,
                    b.error = function (a) {
                        throw new Error("Syntax error, unrecognized expression: " + a)
                    }
                    ,
                    b.uniqueSort = function (a) {
                        var b, c = [], d = 0, e = 0;
                        if (E = !v.detectDuplicates,
                                D = !v.sortStable && a.slice(0),
                                a.sort(U),
                                E) {
                            for (; b = a[e++];)
                                b === a[e] && (d = c.push(e));
                            for (; d--;)
                                a.splice(c[d], 1)
                        }
                        return D = null,
                            a
                    }
                    ,
                    x = b.getText = function (a) {
                        var b, c = "", d = 0, e = a.nodeType;
                        if (e) {
                            if (1 === e || 9 === e || 11 === e) {
                                if ("string" == typeof a.textContent)
                                    return a.textContent;
                                for (a = a.firstChild; a; a = a.nextSibling)
                                    c += x(a)
                            } else if (3 === e || 4 === e)
                                return a.nodeValue
                        } else
                            for (; b = a[d++];)
                                c += x(b);
                        return c
                    }
                    ,
                    w = b.selectors = {
                        cacheLength: 50,
                        createPseudo: d,
                        match: oa,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function (a) {
                                return a[1] = a[1].replace(va, wa),
                                    a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa),
                                "~=" === a[2] && (a[3] = " " + a[3] + " "),
                                    a.slice(0, 4)
                            },
                            CHILD: function (a) {
                                return a[1] = a[1].toLowerCase(),
                                    "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                                        a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                                        a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
                                    a
                            },
                            PSEUDO: function (a) {
                                var b, c = !a[6] && a[2];
                                return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                                        a[2] = c.slice(0, b)),
                                    a.slice(0, 3))
                            }
                        },
                        filter: {
                            TAG: function (a) {
                                var b = a.replace(va, wa).toLowerCase();
                                return "*" === a ? function () {
                                    return !0
                                }
                                    : function (a) {
                                        return a.nodeName && a.nodeName.toLowerCase() === b
                                    }
                            },
                            CLASS: function (a) {
                                var b = R[a + " "];
                                return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function (a) {
                                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                                    })
                            },
                            ATTR: function (a, c, d) {
                                return function (e) {
                                    var f = b.attr(e, a);
                                    return null == f ? "!=" === c : !c || (f += "",
                                            "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                                }
                            },
                            CHILD: function (a, b, c, d, e) {
                                var f = "nth" !== a.slice(0, 3)
                                    , g = "last" !== a.slice(-4)
                                    , h = "of-type" === b;
                                return 1 === d && 0 === e ? function (a) {
                                    return !!a.parentNode
                                }
                                    : function (b, c, i) {
                                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                            q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                                        if (q) {
                                            if (f) {
                                                for (; p;) {
                                                    for (l = b; l = l[p];)
                                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                                            return !1;
                                                    o = p = "only" === a && !o && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (o = [g ? q.firstChild : q.lastChild],
                                                g && s) {
                                                for (k = q[N] || (q[N] = {}),
                                                         j = k[a] || [],
                                                         n = j[0] === P && j[1],
                                                         m = j[0] === P && j[2],
                                                         l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                                    if (1 === l.nodeType && ++m && l === b) {
                                                        k[a] = [P, n, m];
                                                        break
                                                    }
                                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)
                                                m = j[1];
                                            else
                                                for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]),
                                                l !== b));)
                                                    ;
                                            return m -= e,
                                            m === d || m % d === 0 && m / d >= 0
                                        }
                                    }
                            },
                            PSEUDO: function (a, c) {
                                var e,
                                    f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                                return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c],
                                        w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function (a, b) {
                                            for (var d, e = f(a, c), g = e.length; g--;)
                                                d = aa(a, e[g]),
                                                    a[d] = !(b[d] = e[g])
                                        }) : function (a) {
                                            return f(a, 0, e)
                                        }
                                ) : f
                            }
                        },
                        pseudos: {
                            not: d(function (a) {
                                var b = []
                                    , c = []
                                    , e = A(a.replace(ia, "$1"));
                                return e[N] ? d(function (a, b, c, d) {
                                    for (var f, g = e(a, null, d, []), h = a.length; h--;)
                                        (f = g[h]) && (a[h] = !(b[h] = f))
                                }) : function (a, d, f) {
                                    return b[0] = a,
                                        e(b, null, f, c),
                                        b[0] = null,
                                        !c.pop()
                                }
                            }),
                            has: d(function (a) {
                                return function (c) {
                                    return b(a, c).length > 0
                                }
                            }),
                            contains: d(function (a) {
                                return a = a.replace(va, wa),
                                    function (b) {
                                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                                    }
                            }),
                            lang: d(function (a) {
                                return na.test(a || "") || b.error("unsupported lang: " + a),
                                    a = a.replace(va, wa).toLowerCase(),
                                    function (b) {
                                        var c;
                                        do
                                            if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                                return c = c.toLowerCase(),
                                                c === a || 0 === c.indexOf(a + "-");
                                        while ((b = b.parentNode) && 1 === b.nodeType);
                                        return !1
                                    }
                            }),
                            target: function (b) {
                                var c = a.location && a.location.hash;
                                return c && c.slice(1) === b.id
                            },
                            root: function (a) {
                                return a === H
                            },
                            focus: function (a) {
                                return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                            },
                            enabled: function (a) {
                                return a.disabled === !1
                            },
                            disabled: function (a) {
                                return a.disabled === !0
                            },
                            checked: function (a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && !!a.checked || "option" === b && !!a.selected
                            },
                            selected: function (a) {
                                return a.parentNode && a.parentNode.selectedIndex,
                                a.selected === !0
                            },
                            empty: function (a) {
                                for (a = a.firstChild; a; a = a.nextSibling)
                                    if (a.nodeType < 6)
                                        return !1;
                                return !0
                            },
                            parent: function (a) {
                                return !w.pseudos.empty(a)
                            },
                            header: function (a) {
                                return qa.test(a.nodeName)
                            },
                            input: function (a) {
                                return pa.test(a.nodeName)
                            },
                            button: function (a) {
                                var b = a.nodeName.toLowerCase();
                                return "input" === b && "button" === a.type || "button" === b
                            },
                            text: function (a) {
                                var b;
                                return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                            },
                            first: j(function () {
                                return [0]
                            }),
                            last: j(function (a, b) {
                                return [b - 1]
                            }),
                            eq: j(function (a, b, c) {
                                return [c < 0 ? c + b : c]
                            }),
                            even: j(function (a, b) {
                                for (var c = 0; c < b; c += 2)
                                    a.push(c);
                                return a
                            }),
                            odd: j(function (a, b) {
                                for (var c = 1; c < b; c += 2)
                                    a.push(c);
                                return a
                            }),
                            lt: j(function (a, b, c) {
                                for (var d = c < 0 ? c + b : c; --d >= 0;)
                                    a.push(d);
                                return a
                            }),
                            gt: j(function (a, b, c) {
                                for (var d = c < 0 ? c + b : c; ++d < b;)
                                    a.push(d);
                                return a
                            })
                        }
                    },
                    w.pseudos.nth = w.pseudos.eq;
                for (u in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    w.pseudos[u] = h(u);
                for (u in {
                    submit: !0,
                    reset: !0
                })
                    w.pseudos[u] = i(u);
                return l.prototype = w.filters = w.pseudos,
                    w.setFilters = new l,
                    z = b.tokenize = function (a, c) {
                        var d, e, f, g, h, i, j, k = S[a + " "];
                        if (k)
                            return c ? 0 : k.slice(0);
                        for (h = a,
                                 i = [],
                                 j = w.preFilter; h;) {
                            d && !(e = ja.exec(h)) || (e && (h = h.slice(e[0].length) || h),
                                i.push(f = [])),
                                d = !1,
                            (e = ka.exec(h)) && (d = e.shift(),
                                f.push({
                                    value: d,
                                    type: e[0].replace(ia, " ")
                                }),
                                h = h.slice(d.length));
                            for (g in w.filter)
                                !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(),
                                    f.push({
                                        value: d,
                                        type: g,
                                        matches: e
                                    }),
                                    h = h.slice(d.length));
                            if (!d)
                                break
                        }
                        return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
                    }
                    ,
                    A = b.compile = function (a, b) {
                        var c, d = [], e = [], f = T[a + " "];
                        if (!f) {
                            for (b || (b = z(a)),
                                     c = b.length; c--;)
                                f = s(b[c]),
                                    f[N] ? d.push(f) : e.push(f);
                            f = T(a, t(e, d)),
                                f.selector = a
                        }
                        return f
                    }
                    ,
                    B = b.select = function (a, b, c, d) {
                        var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
                        if (c = c || [],
                            1 === l.length) {
                            if (f = l[0] = l[0].slice(0),
                                f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                                if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0],
                                        !b)
                                    return c;
                                j && (b = b.parentNode),
                                    a = a.slice(f.shift().value.length)
                            }
                            for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e],
                                !w.relative[h = g.type]);)
                                if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                                    if (f.splice(e, 1),
                                            a = d.length && m(f),
                                            !a)
                                        return $.apply(c, d),
                                            c;
                                    break
                                }
                        }
                        return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b),
                            c
                    }
                    ,
                    v.sortStable = N.split("").sort(U).join("") === N,
                    v.detectDuplicates = !!E,
                    F(),
                    v.sortDetached = e(function (a) {
                        return 1 & a.compareDocumentPosition(G.createElement("div"))
                    }),
                e(function (a) {
                    return a.innerHTML = "<a href='#'></a>",
                    "#" === a.firstChild.getAttribute("href")
                }) || f("type|href|height|width", function (a, b, c) {
                    if (!c)
                        return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                }),
                v.attributes && e(function (a) {
                    return a.innerHTML = "<input/>",
                        a.firstChild.setAttribute("value", ""),
                    "" === a.firstChild.getAttribute("value")
                }) || f("value", function (a, b, c) {
                    if (!c && "input" === a.nodeName.toLowerCase())
                        return a.defaultValue
                }),
                e(function (a) {
                    return null == a.getAttribute("disabled")
                }) || f(ba, function (a, b, c) {
                    var d;
                    if (!c)
                        return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                }),
                    b
            }(a);
            Q.find = V,
                Q.expr = V.selectors,
                Q.expr[":"] = Q.expr.pseudos,
                Q.unique = V.uniqueSort,
                Q.text = V.getText,
                Q.isXMLDoc = V.isXML,
                Q.contains = V.contains;
            var W = Q.expr.match.needsContext
                , X = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
                , Y = /^.[^:#\[\.,]*$/;
            Q.filter = function (a, b, c) {
                var d = b[0];
                return c && (a = ":not(" + a + ")"),
                    1 === b.length && 1 === d.nodeType ? Q.find.matchesSelector(d, a) ? [d] : [] : Q.find.matches(a, Q.grep(b, function (a) {
                        return 1 === a.nodeType
                    }))
            }
                ,
                Q.fn.extend({
                    find: function (a) {
                        var b, c = [], d = this, e = d.length;
                        if ("string" != typeof a)
                            return this.pushStack(Q(a).filter(function () {
                                for (b = 0; b < e; b++)
                                    if (Q.contains(d[b], this))
                                        return !0
                            }));
                        for (b = 0; b < e; b++)
                            Q.find(a, d[b], c);
                        return c = this.pushStack(e > 1 ? Q.unique(c) : c),
                            c.selector = this.selector ? this.selector + " " + a : a,
                            c
                    },
                    filter: function (a) {
                        return this.pushStack(d(this, a || [], !1))
                    },
                    not: function (a) {
                        return this.pushStack(d(this, a || [], !0))
                    },
                    is: function (a) {
                        return !!d(this, "string" == typeof a && W.test(a) ? Q(a) : a || [], !1).length
                    }
                });
            var Z, $ = a.document, _ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, aa = Q.fn.init = function (a, b) {
                    var c, d;
                    if (!a)
                        return this;
                    if ("string" == typeof a) {
                        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : _.exec(a),
                            !c || !c[1] && b)
                            return !b || b.jquery ? (b || Z).find(a) : this.constructor(b).find(a);
                        if (c[1]) {
                            if (b = b instanceof Q ? b[0] : b,
                                    Q.merge(this, Q.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : $, !0)),
                                X.test(c[1]) && Q.isPlainObject(b))
                                for (c in b)
                                    Q.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                            return this
                        }
                        if (d = $.getElementById(c[2]),
                            d && d.parentNode) {
                            if (d.id !== c[2])
                                return Z.find(a);
                            this.length = 1,
                                this[0] = d
                        }
                        return this.context = $,
                            this.selector = a,
                            this
                    }
                    return a.nodeType ? (this.context = this[0] = a,
                        this.length = 1,
                        this) : Q.isFunction(a) ? "undefined" != typeof Z.ready ? Z.ready(a) : a(Q) : (void 0 !== a.selector && (this.selector = a.selector,
                        this.context = a.context),
                        Q.makeArray(a, this))
                }
            ;
            aa.prototype = Q.fn,
                Z = Q($);
            var ba = /^(?:parents|prev(?:Until|All))/
                , ca = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            Q.extend({
                dir: function (a, b, c) {
                    for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !Q(e).is(c));)
                        1 === e.nodeType && d.push(e),
                            e = e[b];
                    return d
                },
                sibling: function (a, b) {
                    for (var c = []; a; a = a.nextSibling)
                        1 === a.nodeType && a !== b && c.push(a);
                    return c
                }
            }),
                Q.fn.extend({
                    has: function (a) {
                        var b, c = Q(a, this), d = c.length;
                        return this.filter(function () {
                            for (b = 0; b < d; b++)
                                if (Q.contains(this, c[b]))
                                    return !0
                        })
                    },
                    closest: function (a, b) {
                        for (var c, d = 0, e = this.length, f = [], g = W.test(a) || "string" != typeof a ? Q(a, b || this.context) : 0; d < e; d++)
                            for (c = this[d]; c && c !== b; c = c.parentNode)
                                if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && Q.find.matchesSelector(c, a))) {
                                    f.push(c);
                                    break
                                }
                        return this.pushStack(f.length > 1 ? Q.unique(f) : f)
                    },
                    index: function (a) {
                        return a ? "string" == typeof a ? Q.inArray(this[0], Q(a)) : Q.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function (a, b) {
                        return this.pushStack(Q.unique(Q.merge(this.get(), Q(a, b))))
                    },
                    addBack: function (a) {
                        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                    }
                }),
                Q.each({
                    parent: function (a) {
                        var b = a.parentNode;
                        return b && 11 !== b.nodeType ? b : null
                    },
                    parents: function (a) {
                        return Q.dir(a, "parentNode")
                    },
                    parentsUntil: function (a, b, c) {
                        return Q.dir(a, "parentNode", c)
                    },
                    next: function (a) {
                        return e(a, "nextSibling")
                    },
                    prev: function (a) {
                        return e(a, "previousSibling")
                    },
                    nextAll: function (a) {
                        return Q.dir(a, "nextSibling")
                    },
                    prevAll: function (a) {
                        return Q.dir(a, "previousSibling")
                    },
                    nextUntil: function (a, b, c) {
                        return Q.dir(a, "nextSibling", c)
                    },
                    prevUntil: function (a, b, c) {
                        return Q.dir(a, "previousSibling", c)
                    },
                    siblings: function (a) {
                        return Q.sibling((a.parentNode || {}).firstChild, a)
                    },
                    children: function (a) {
                        return Q.sibling(a.firstChild)
                    },
                    contents: function (a) {
                        return Q.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : Q.merge([], a.childNodes)
                    }
                }, function (a, b) {
                    Q.fn[a] = function (c, d) {
                        var e = Q.map(this, b, c);
                        return "Until" !== a.slice(-5) && (d = c),
                        d && "string" == typeof d && (e = Q.filter(d, e)),
                        this.length > 1 && (ca[a] || (e = Q.unique(e)),
                        ba.test(a) && (e = e.reverse())),
                            this.pushStack(e)
                    }
                });
            var da = /\S+/g
                , ea = {};
            Q.Callbacks = function (a) {
                a = "string" == typeof a ? ea[a] || f(a) : Q.extend({}, a);
                var b, c, d, e, g, h, i = [], j = !a.once && [], k = function (f) {
                    for (c = a.memory && f,
                             d = !0,
                             g = h || 0,
                             h = 0,
                             e = i.length,
                             b = !0; i && g < e; g++)
                        if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                            c = !1;
                            break
                        }
                    b = !1,
                    i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
                }, l = {
                    add: function () {
                        if (i) {
                            var d = i.length;
                            !function f(b) {
                                Q.each(b, function (b, c) {
                                    var d = Q.type(c);
                                    "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                                })
                            }(arguments),
                                b ? e = i.length : c && (h = d,
                                        k(c))
                        }
                        return this
                    },
                    remove: function () {
                        return i && Q.each(arguments, function (a, c) {
                            for (var d; (d = Q.inArray(c, i, d)) > -1;)
                                i.splice(d, 1),
                                b && (d <= e && e--,
                                d <= g && g--)
                        }),
                            this
                    },
                    has: function (a) {
                        return a ? Q.inArray(a, i) > -1 : !(!i || !i.length)
                    },
                    empty: function () {
                        return i = [],
                            e = 0,
                            this
                    },
                    disable: function () {
                        return i = j = c = void 0,
                            this
                    },
                    disabled: function () {
                        return !i
                    },
                    lock: function () {
                        return j = void 0,
                        c || l.disable(),
                            this
                    },
                    locked: function () {
                        return !j
                    },
                    fireWith: function (a, c) {
                        return !i || d && !j || (c = c || [],
                            c = [a, c.slice ? c.slice() : c],
                            b ? j.push(c) : k(c)),
                            this
                    },
                    fire: function () {
                        return l.fireWith(this, arguments),
                            this
                    },
                    fired: function () {
                        return !!d
                    }
                };
                return l
            }
                ,
                Q.extend({
                    Deferred: function (a) {
                        var b = [["resolve", "done", Q.Callbacks("once memory"), "resolved"], ["reject", "fail", Q.Callbacks("once memory"), "rejected"], ["notify", "progress", Q.Callbacks("memory")]]
                            , c = "pending"
                            , d = {
                            state: function () {
                                return c
                            },
                            always: function () {
                                return e.done(arguments).fail(arguments),
                                    this
                            },
                            then: function () {
                                var a = arguments;
                                return Q.Deferred(function (c) {
                                    Q.each(b, function (b, f) {
                                        var g = Q.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a = g && g.apply(this, arguments);
                                            a && Q.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                        })
                                    }),
                                        a = null
                                }).promise()
                            },
                            promise: function (a) {
                                return null != a ? Q.extend(a, d) : d
                            }
                        }
                            , e = {};
                        return d.pipe = d.then,
                            Q.each(b, function (a, f) {
                                var g = f[2]
                                    , h = f[3];
                                d[f[1]] = g.add,
                                h && g.add(function () {
                                    c = h
                                }, b[1 ^ a][2].disable, b[2][2].lock),
                                    e[f[0]] = function () {
                                        return e[f[0] + "With"](this === e ? d : this, arguments),
                                            this
                                    }
                                    ,
                                    e[f[0] + "With"] = g.fireWith
                            }),
                            d.promise(e),
                        a && a.call(e, e),
                            e
                    },
                    when: function (a) {
                        var b, c, d, e = 0, f = H.call(arguments), g = f.length,
                            h = 1 !== g || a && Q.isFunction(a.promise) ? g : 0, i = 1 === h ? a : Q.Deferred(),
                            j = function (a, c, d) {
                                return function (e) {
                                    c[a] = this,
                                        d[a] = arguments.length > 1 ? H.call(arguments) : e,
                                        d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                                }
                            };
                        if (g > 1)
                            for (b = new Array(g),
                                     c = new Array(g),
                                     d = new Array(g); e < g; e++)
                                f[e] && Q.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                        return h || i.resolveWith(d, f),
                            i.promise()
                    }
                });
            var fa;
            Q.fn.ready = function (a) {
                return Q.ready.promise().done(a),
                    this
            }
                ,
                Q.extend({
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function (a) {
                        a ? Q.readyWait++ : Q.ready(!0)
                    },
                    ready: function (a) {
                        if (a === !0 ? !--Q.readyWait : !Q.isReady) {
                            if (!$.body)
                                return setTimeout(Q.ready);
                            Q.isReady = !0,
                            a !== !0 && --Q.readyWait > 0 || (fa.resolveWith($, [Q]),
                            Q.fn.triggerHandler && (Q($).triggerHandler("ready"),
                                Q($).off("ready")))
                        }
                    }
                }),
                Q.ready.promise = function (b) {
                    if (!fa)
                        if (fa = Q.Deferred(),
                            "complete" === $.readyState)
                            setTimeout(Q.ready);
                        else if ($.addEventListener)
                            $.addEventListener("DOMContentLoaded", h, !1),
                                a.addEventListener("load", h, !1);
                        else {
                            $.attachEvent("onreadystatechange", h),
                                a.attachEvent("onload", h);
                            var c = !1;
                            try {
                                c = null == a.frameElement && $.documentElement
                            } catch (d) {
                            }
                            c && c.doScroll && !function e() {
                                if (!Q.isReady) {
                                    try {
                                        c.doScroll("left")
                                    } catch (a) {
                                        return setTimeout(e, 50)
                                    }
                                    g(),
                                        Q.ready()
                                }
                            }()
                        }
                    return fa.promise(b)
                }
            ;
            var ga, ha = "undefined";
            for (ga in Q(O))
                break;
            O.ownLast = "0" !== ga,
                O.inlineBlockNeedsLayout = !1,
                Q(function () {
                    var a, b, c, d;
                    c = $.getElementsByTagName("body")[0],
                    c && c.style && (b = $.createElement("div"),
                        d = $.createElement("div"),
                        d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                        c.appendChild(d).appendChild(b),
                    typeof b.style.zoom !== ha && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
                        O.inlineBlockNeedsLayout = a = 3 === b.offsetWidth,
                    a && (c.style.zoom = 1)),
                        c.removeChild(d))
                }),
                function () {
                    var a = $.createElement("div");
                    if (null == O.deleteExpando) {
                        O.deleteExpando = !0;
                        try {
                            delete a.test
                        } catch (b) {
                            O.deleteExpando = !1
                        }
                    }
                    a = null
                }(),
                Q.acceptData = function (a) {
                    var b = Q.noData[(a.nodeName + " ").toLowerCase()]
                        , c = +a.nodeType || 1;
                    return (1 === c || 9 === c) && (!b || b !== !0 && a.getAttribute("classid") === b)
                }
            ;
            var ia = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
                , ja = /([A-Z])/g;
            Q.extend({
                cache: {},
                noData: {
                    "applet ": !0,
                    "embed ": !0,
                    "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                },
                hasData: function (a) {
                    return a = a.nodeType ? Q.cache[a[Q.expando]] : a[Q.expando],
                    !!a && !j(a)
                },
                data: function (a, b, c) {
                    return k(a, b, c)
                },
                removeData: function (a, b) {
                    return l(a, b)
                },
                _data: function (a, b, c) {
                    return k(a, b, c, !0)
                },
                _removeData: function (a, b) {
                    return l(a, b, !0)
                }
            }),
                Q.fn.extend({
                    data: function (a, b) {
                        var c, d, e, f = this[0], g = f && f.attributes;
                        if (void 0 === a) {
                            if (this.length && (e = Q.data(f),
                                1 === f.nodeType && !Q._data(f, "parsedAttrs"))) {
                                for (c = g.length; c--;)
                                    g[c] && (d = g[c].name,
                                    0 === d.indexOf("data-") && (d = Q.camelCase(d.slice(5)),
                                        i(f, d, e[d])));
                                Q._data(f, "parsedAttrs", !0)
                            }
                            return e
                        }
                        return "object" == typeof a ? this.each(function () {
                            Q.data(this, a)
                        }) : arguments.length > 1 ? this.each(function () {
                            Q.data(this, a, b)
                        }) : f ? i(f, a, Q.data(f, a)) : void 0
                    },
                    removeData: function (a) {
                        return this.each(function () {
                            Q.removeData(this, a)
                        })
                    }
                }),
                Q.extend({
                    queue: function (a, b, c) {
                        var d;
                        if (a)
                            return b = (b || "fx") + "queue",
                                d = Q._data(a, b),
                            c && (!d || Q.isArray(c) ? d = Q._data(a, b, Q.makeArray(c)) : d.push(c)),
                            d || []
                    },
                    dequeue: function (a, b) {
                        b = b || "fx";
                        var c = Q.queue(a, b)
                            , d = c.length
                            , e = c.shift()
                            , f = Q._queueHooks(a, b)
                            , g = function () {
                            Q.dequeue(a, b)
                        };
                        "inprogress" === e && (e = c.shift(),
                            d--),
                        e && ("fx" === b && c.unshift("inprogress"),
                            delete f.stop,
                            e.call(a, g, f)),
                        !d && f && f.empty.fire()
                    },
                    _queueHooks: function (a, b) {
                        var c = b + "queueHooks";
                        return Q._data(a, c) || Q._data(a, c, {
                                empty: Q.Callbacks("once memory").add(function () {
                                    Q._removeData(a, b + "queue"),
                                        Q._removeData(a, c)
                                })
                            })
                    }
                }),
                Q.fn.extend({
                    queue: function (a, b) {
                        var c = 2;
                        return "string" != typeof a && (b = a,
                            a = "fx",
                            c--),
                            arguments.length < c ? Q.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                                var c = Q.queue(this, a, b);
                                Q._queueHooks(this, a),
                                "fx" === a && "inprogress" !== c[0] && Q.dequeue(this, a)
                            })
                    },
                    dequeue: function (a) {
                        return this.each(function () {
                            Q.dequeue(this, a)
                        })
                    },
                    clearQueue: function (a) {
                        return this.queue(a || "fx", [])
                    },
                    promise: function (a, b) {
                        var c, d = 1, e = Q.Deferred(), f = this, g = this.length, h = function () {
                            --d || e.resolveWith(f, [f])
                        };
                        for ("string" != typeof a && (b = a,
                            a = void 0),
                                 a = a || "fx"; g--;)
                            c = Q._data(f[g], a + "queueHooks"),
                            c && c.empty && (d++,
                                c.empty.add(h));
                        return h(),
                            e.promise(b)
                    }
                });
            var ka = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    Q.access = function (a, b, c, d, e, f, g) {
                        var h = 0
                            , i = a.length
                            , j = null == c;
                        if ("object" === Q.type(c)) {
                            e = !0;
                            for (h in c)
                                Q.access(a, b, h, c[h], !0, f, g)
                        } else if (void 0 !== d && (e = !0,
                            Q.isFunction(d) || (g = !0),
                            j && (g ? (b.call(a, d),
                                b = null) : (j = b,
                                    b = function (a, b, c) {
                                        return j.call(Q(a), c)
                                    }
                            )),
                                b))
                            for (; h < i; h++)
                                b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
                        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
                    }
            )
                , la = /^(?:checkbox|radio)$/i;
            !function () {
                var a = $.createElement("input")
                    , b = $.createElement("div")
                    , c = $.createDocumentFragment();
                if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                        O.leadingWhitespace = 3 === b.firstChild.nodeType,
                        O.tbody = !b.getElementsByTagName("tbody").length,
                        O.htmlSerialize = !!b.getElementsByTagName("link").length,
                        O.html5Clone = "<:nav></:nav>" !== $.createElement("nav").cloneNode(!0).outerHTML,
                        a.type = "checkbox",
                        a.checked = !0,
                        c.appendChild(a),
                        O.appendChecked = a.checked,
                        b.innerHTML = "<textarea>x</textarea>",
                        O.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue,
                        c.appendChild(b),
                        b.innerHTML = "<input type='radio' checked='checked' name='t'/>",
                        O.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked,
                        O.noCloneEvent = !0,
                    b.attachEvent && (b.attachEvent("onclick", function () {
                        O.noCloneEvent = !1
                    }),
                        b.cloneNode(!0).click()),
                    null == O.deleteExpando) {
                    O.deleteExpando = !0;
                    try {
                        delete b.test
                    } catch (d) {
                        O.deleteExpando = !1
                    }
                }
            }(),
                function () {
                    var b, c, d = $.createElement("div");
                    for (b in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    })
                        c = "on" + b,
                        (O[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"),
                            O[b + "Bubbles"] = d.attributes[c].expando === !1);
                    d = null
                }();
            var ma = /^(?:input|select|textarea)$/i
                , na = /^key/
                , oa = /^(?:mouse|pointer|contextmenu)|click/
                , pa = /^(?:focusinfocus|focusoutblur)$/
                , qa = /^([^.]*)(?:\.(.+)|)$/;
            Q.event = {
                global: {},
                add: function (a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = Q._data(a);
                    if (q) {
                        for (c.handler && (i = c,
                            c = i.handler,
                            e = i.selector),
                             c.guid || (c.guid = Q.guid++),
                             (g = q.events) || (g = q.events = {}),
                             (k = q.handle) || (k = q.handle = function (a) {
                                 return typeof Q === ha || a && Q.event.triggered === a.type ? void 0 : Q.event.dispatch.apply(k.elem, arguments)
                             }
                                 ,
                                 k.elem = a),
                                 b = (b || "").match(da) || [""],
                                 h = b.length; h--;)
                            f = qa.exec(b[h]) || [],
                                n = p = f[1],
                                o = (f[2] || "").split(".").sort(),
                            n && (j = Q.event.special[n] || {},
                                n = (e ? j.delegateType : j.bindType) || n,
                                j = Q.event.special[n] || {},
                                l = Q.extend({
                                    type: n,
                                    origType: p,
                                    data: d,
                                    handler: c,
                                    guid: c.guid,
                                    selector: e,
                                    needsContext: e && Q.expr.match.needsContext.test(e),
                                    namespace: o.join(".")
                                }, i),
                            (m = g[n]) || (m = g[n] = [],
                                m.delegateCount = 0,
                            j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))),
                            j.add && (j.add.call(a, l),
                            l.handler.guid || (l.handler.guid = c.guid)),
                                e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                                Q.event.global[n] = !0);
                        a = null
                    }
                },
                remove: function (a, b, c, d, e) {
                    var f, g, h, i, j, k, l, m, n, o, p, q = Q.hasData(a) && Q._data(a);
                    if (q && (k = q.events)) {
                        for (b = (b || "").match(da) || [""],
                                 j = b.length; j--;)
                            if (h = qa.exec(b[j]) || [],
                                    n = p = h[1],
                                    o = (h[2] || "").split(".").sort(),
                                    n) {
                                for (l = Q.event.special[n] || {},
                                         n = (d ? l.delegateType : l.bindType) || n,
                                         m = k[n] || [],
                                         h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                         i = f = m.length; f--;)
                                    g = m[f],
                                    !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1),
                                    g.selector && m.delegateCount--,
                                    l.remove && l.remove.call(a, g));
                                i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || Q.removeEvent(a, n, q.handle),
                                    delete k[n])
                            } else
                                for (n in k)
                                    Q.event.remove(a, n + b[j], c, d, !0);
                        Q.isEmptyObject(k) && (delete q.handle,
                            Q._removeData(a, "events"))
                    }
                },
                trigger: function (b, c, d, e) {
                    var f, g, h, i, j, k, l, m = [d || $], n = N.call(b, "type") ? b.type : b,
                        o = N.call(b, "namespace") ? b.namespace.split(".") : [];
                    if (h = k = d = d || $,
                        3 !== d.nodeType && 8 !== d.nodeType && !pa.test(n + Q.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."),
                            n = o.shift(),
                            o.sort()),
                            g = n.indexOf(":") < 0 && "on" + n,
                            b = b[Q.expando] ? b : new Q.Event(n, "object" == typeof b && b),
                            b.isTrigger = e ? 2 : 3,
                            b.namespace = o.join("."),
                            b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                            b.result = void 0,
                        b.target || (b.target = d),
                            c = null == c ? [b] : Q.makeArray(c, [b]),
                            j = Q.event.special[n] || {},
                        e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                        if (!e && !j.noBubble && !Q.isWindow(d)) {
                            for (i = j.delegateType || n,
                                 pa.test(i + n) || (h = h.parentNode); h; h = h.parentNode)
                                m.push(h),
                                    k = h;
                            k === (d.ownerDocument || $) && m.push(k.defaultView || k.parentWindow || a)
                        }
                        for (l = 0; (h = m[l++]) && !b.isPropagationStopped();)
                            b.type = l > 1 ? i : j.bindType || n,
                                f = (Q._data(h, "events") || {})[b.type] && Q._data(h, "handle"),
                            f && f.apply(h, c),
                                f = g && h[g],
                            f && f.apply && Q.acceptData(h) && (b.result = f.apply(h, c),
                            b.result === !1 && b.preventDefault());
                        if (b.type = n,
                            !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && Q.acceptData(d) && g && d[n] && !Q.isWindow(d)) {
                            k = d[g],
                            k && (d[g] = null),
                                Q.event.triggered = n;
                            try {
                                d[n]()
                            } catch (p) {
                            }
                            Q.event.triggered = void 0,
                            k && (d[g] = k)
                        }
                        return b.result
                    }
                },
                dispatch: function (a) {
                    a = Q.event.fix(a);
                    var b, c, d, e, f, g = [], h = H.call(arguments), i = (Q._data(this, "events") || {})[a.type] || [],
                        j = Q.event.special[a.type] || {};
                    if (h[0] = a,
                            a.delegateTarget = this,
                        !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                        for (g = Q.event.handlers.call(this, a, i),
                                 b = 0; (e = g[b++]) && !a.isPropagationStopped();)
                            for (a.currentTarget = e.elem,
                                     f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();)
                                a.namespace_re && !a.namespace_re.test(d.namespace) || (a.handleObj = d,
                                    a.data = d.data,
                                    c = ((Q.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h),
                                void 0 !== c && (a.result = c) === !1 && (a.preventDefault(),
                                    a.stopPropagation()));
                        return j.postDispatch && j.postDispatch.call(this, a),
                            a.result
                    }
                },
                handlers: function (a, b) {
                    var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
                    if (h && i.nodeType && (!a.button || "click" !== a.type))
                        for (; i != this; i = i.parentNode || this)
                            if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                                for (e = [],
                                         f = 0; f < h; f++)
                                    d = b[f],
                                        c = d.selector + " ",
                                    void 0 === e[c] && (e[c] = d.needsContext ? Q(c, this).index(i) >= 0 : Q.find(c, this, null, [i]).length),
                                    e[c] && e.push(d);
                                e.length && g.push({
                                    elem: i,
                                    handlers: e
                                })
                            }
                    return h < b.length && g.push({
                        elem: this,
                        handlers: b.slice(h)
                    }),
                        g
                },
                fix: function (a) {
                    if (a[Q.expando])
                        return a;
                    var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
                    for (g || (this.fixHooks[e] = g = oa.test(e) ? this.mouseHooks : na.test(e) ? this.keyHooks : {}),
                             d = g.props ? this.props.concat(g.props) : this.props,
                             a = new Q.Event(f),
                             b = d.length; b--;)
                        c = d[b],
                            a[c] = f[c];
                    return a.target || (a.target = f.srcElement || $),
                    3 === a.target.nodeType && (a.target = a.target.parentNode),
                        a.metaKey = !!a.metaKey,
                        g.filter ? g.filter(a, f) : a
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function (a, b) {
                        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                            a
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (a, b) {
                        var c, d, e, f = b.button, g = b.fromElement;
                        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || $,
                            e = d.documentElement,
                            c = d.body,
                            a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0),
                            a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)),
                        !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                        a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                            a
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function () {
                            if (this !== o() && this.focus)
                                try {
                                    return this.focus(),
                                        !1
                                } catch (a) {
                                }
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function () {
                            if (this === o() && this.blur)
                                return this.blur(),
                                    !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function () {
                            if (Q.nodeName(this, "input") && "checkbox" === this.type && this.click)
                                return this.click(),
                                    !1
                        },
                        _default: function (a) {
                            return Q.nodeName(a.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function (a) {
                            void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                },
                simulate: function (a, b, c, d) {
                    var e = Q.extend(new Q.Event, c, {
                        type: a,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    d ? Q.event.trigger(e, null, b) : Q.event.dispatch.call(b, e),
                    e.isDefaultPrevented() && c.preventDefault()
                }
            },
                Q.removeEvent = $.removeEventListener ? function (a, b, c) {
                    a.removeEventListener && a.removeEventListener(b, c, !1)
                }
                    : function (a, b, c) {
                        var d = "on" + b;
                        a.detachEvent && (typeof a[d] === ha && (a[d] = null),
                            a.detachEvent(d, c))
                    }
                ,
                Q.Event = function (a, b) {
                    return this instanceof Q.Event ? (a && a.type ? (this.originalEvent = a,
                        this.type = a.type,
                        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a,
                    b && Q.extend(this, b),
                        this.timeStamp = a && a.timeStamp || Q.now(),
                        void (this[Q.expando] = !0)) : new Q.Event(a, b)
                }
                ,
                Q.Event.prototype = {
                    isDefaultPrevented: n,
                    isPropagationStopped: n,
                    isImmediatePropagationStopped: n,
                    preventDefault: function () {
                        var a = this.originalEvent;
                        this.isDefaultPrevented = m,
                        a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                    },
                    stopPropagation: function () {
                        var a = this.originalEvent;
                        this.isPropagationStopped = m,
                        a && (a.stopPropagation && a.stopPropagation(),
                            a.cancelBubble = !0)
                    },
                    stopImmediatePropagation: function () {
                        var a = this.originalEvent;
                        this.isImmediatePropagationStopped = m,
                        a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
                            this.stopPropagation()
                    }
                },
                Q.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    pointerenter: "pointerover",
                    pointerleave: "pointerout"
                }, function (a, b) {
                    Q.event.special[a] = {
                        delegateType: b,
                        bindType: b,
                        handle: function (a) {
                            var c, d = this, e = a.relatedTarget, f = a.handleObj;
                            return e && (e === d || Q.contains(d, e)) || (a.type = f.origType,
                                c = f.handler.apply(this, arguments),
                                a.type = b),
                                c
                        }
                    }
                }),
            O.submitBubbles || (Q.event.special.submit = {
                setup: function () {
                    return !Q.nodeName(this, "form") && void Q.event.add(this, "click._submit keypress._submit", function (a) {
                            var b = a.target
                                , c = Q.nodeName(b, "input") || Q.nodeName(b, "button") ? b.form : void 0;
                            c && !Q._data(c, "submitBubbles") && (Q.event.add(c, "submit._submit", function (a) {
                                a._submit_bubble = !0
                            }),
                                Q._data(c, "submitBubbles", !0))
                        })
                },
                postDispatch: function (a) {
                    a._submit_bubble && (delete a._submit_bubble,
                    this.parentNode && !a.isTrigger && Q.event.simulate("submit", this.parentNode, a, !0))
                },
                teardown: function () {
                    return !Q.nodeName(this, "form") && void Q.event.remove(this, "._submit")
                }
            }),
            O.changeBubbles || (Q.event.special.change = {
                setup: function () {
                    return ma.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (Q.event.add(this, "propertychange._change", function (a) {
                        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                    }),
                        Q.event.add(this, "click._change", function (a) {
                            this._just_changed && !a.isTrigger && (this._just_changed = !1),
                                Q.event.simulate("change", this, a, !0)
                        })),
                        !1) : void Q.event.add(this, "beforeactivate._change", function (a) {
                        var b = a.target;
                        ma.test(b.nodeName) && !Q._data(b, "changeBubbles") && (Q.event.add(b, "change._change", function (a) {
                            !this.parentNode || a.isSimulated || a.isTrigger || Q.event.simulate("change", this.parentNode, a, !0)
                        }),
                            Q._data(b, "changeBubbles", !0))
                    })
                },
                handle: function (a) {
                    var b = a.target;
                    if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type)
                        return a.handleObj.handler.apply(this, arguments)
                },
                teardown: function () {
                    return Q.event.remove(this, "._change"),
                        !ma.test(this.nodeName)
                }
            }),
            O.focusinBubbles || Q.each({
                focus: "focusin",
                blur: "focusout"
            }, function (a, b) {
                var c = function (a) {
                    Q.event.simulate(b, a.target, Q.event.fix(a), !0)
                };
                Q.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this
                            , e = Q._data(d, b);
                        e || d.addEventListener(a, c, !0),
                            Q._data(d, b, (e || 0) + 1)
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this
                            , e = Q._data(d, b) - 1;
                        e ? Q._data(d, b, e) : (d.removeEventListener(a, c, !0),
                            Q._removeData(d, b))
                    }
                }
            }),
                Q.fn.extend({
                    on: function (a, b, c, d, e) {
                        var f, g;
                        if ("object" == typeof a) {
                            "string" != typeof b && (c = c || b,
                                b = void 0);
                            for (f in a)
                                this.on(f, b, c, a[f], e);
                            return this
                        }
                        if (null == c && null == d ? (d = b,
                                c = b = void 0) : null == d && ("string" == typeof b ? (d = c,
                                    c = void 0) : (d = c,
                                    c = b,
                                    b = void 0)),
                            d === !1)
                            d = n;
                        else if (!d)
                            return this;
                        return 1 === e && (g = d,
                            d = function (a) {
                                return Q().off(a),
                                    g.apply(this, arguments)
                            }
                            ,
                            d.guid = g.guid || (g.guid = Q.guid++)),
                            this.each(function () {
                                Q.event.add(this, a, d, c, b)
                            })
                    },
                    one: function (a, b, c, d) {
                        return this.on(a, b, c, d, 1)
                    },
                    off: function (a, b, c) {
                        var d, e;
                        if (a && a.preventDefault && a.handleObj)
                            return d = a.handleObj,
                                Q(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                                this;
                        if ("object" == typeof a) {
                            for (e in a)
                                this.off(e, b, a[e]);
                            return this
                        }
                        return b !== !1 && "function" != typeof b || (c = b,
                            b = void 0),
                        c === !1 && (c = n),
                            this.each(function () {
                                Q.event.remove(this, a, c, b)
                            })
                    },
                    trigger: function (a, b) {
                        return this.each(function () {
                            Q.event.trigger(a, b, this)
                        })
                    },
                    triggerHandler: function (a, b) {
                        var c = this[0];
                        if (c)
                            return Q.event.trigger(a, b, c, !0)
                    }
                });
            var ra = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
                , sa = / jQuery\d+="(?:null|\d+)"/g
                , ta = new RegExp("<(?:" + ra + ")[\\s/>]", "i")
                , ua = /^\s+/
                , va = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
                , wa = /<([\w:]+)/
                , xa = /<tbody/i
                , ya = /<|&#?\w+;/
                , za = /<(?:script|style|link)/i
                , Aa = /checked\s*(?:[^=]|=\s*.checked.)/i
                , Ba = /^$|\/(?:java|ecma)script/i
                , Ca = /^true\/(.*)/
                , Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
                , Ea = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: O.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            }
                , Fa = p($)
                , Ga = Fa.appendChild($.createElement("div"));
            Ea.optgroup = Ea.option,
                Ea.tbody = Ea.tfoot = Ea.colgroup = Ea.caption = Ea.thead,
                Ea.th = Ea.td,
                Q.extend({
                    clone: function (a, b, c) {
                        var d, e, f, g, h, i = Q.contains(a.ownerDocument, a);
                        if (O.html5Clone || Q.isXMLDoc(a) || !ta.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Ga.innerHTML = a.outerHTML,
                                Ga.removeChild(f = Ga.firstChild)),
                                !(O.noCloneEvent && O.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || Q.isXMLDoc(a)))
                            for (d = q(f),
                                     h = q(a),
                                     g = 0; null != (e = h[g]); ++g)
                                d[g] && x(e, d[g]);
                        if (b)
                            if (c)
                                for (h = h || q(a),
                                         d = d || q(f),
                                         g = 0; null != (e = h[g]); g++)
                                    w(e, d[g]);
                            else
                                w(a, f);
                        return d = q(f, "script"),
                        d.length > 0 && v(d, !i && q(a, "script")),
                            d = h = e = null,
                            f
                    },
                    buildFragment: function (a, b, c, d) {
                        for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; o < l; o++)
                            if (f = a[o],
                                f || 0 === f)
                                if ("object" === Q.type(f))
                                    Q.merge(n, f.nodeType ? [f] : f);
                                else if (ya.test(f)) {
                                    for (h = h || m.appendChild(b.createElement("div")),
                                             i = (wa.exec(f) || ["", ""])[1].toLowerCase(),
                                             k = Ea[i] || Ea._default,
                                             h.innerHTML = k[1] + f.replace(va, "<$1></$2>") + k[2],
                                             e = k[0]; e--;)
                                        h = h.lastChild;
                                    if (!O.leadingWhitespace && ua.test(f) && n.push(b.createTextNode(ua.exec(f)[0])),
                                            !O.tbody)
                                        for (f = "table" !== i || xa.test(f) ? "<table>" !== k[1] || xa.test(f) ? 0 : h : h.firstChild,
                                                 e = f && f.childNodes.length; e--;)
                                            Q.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                                    for (Q.merge(n, h.childNodes),
                                             h.textContent = ""; h.firstChild;)
                                        h.removeChild(h.firstChild);
                                    h = m.lastChild
                                } else
                                    n.push(b.createTextNode(f));
                        for (h && m.removeChild(h),
                             O.appendChecked || Q.grep(q(n, "input"), r),
                                 o = 0; f = n[o++];)
                            if ((!d || Q.inArray(f, d) === -1) && (g = Q.contains(f.ownerDocument, f),
                                    h = q(m.appendChild(f), "script"),
                                g && v(h),
                                    c))
                                for (e = 0; f = h[e++];)
                                    Ba.test(f.type || "") && c.push(f);
                        return h = null,
                            m
                    },
                    cleanData: function (a, b) {
                        for (var c, d, e, f, g = 0, h = Q.expando, i = Q.cache, j = O.deleteExpando, k = Q.event.special; null != (c = a[g]); g++)
                            if ((b || Q.acceptData(c)) && (e = c[h],
                                    f = e && i[e])) {
                                if (f.events)
                                    for (d in f.events)
                                        k[d] ? Q.event.remove(c, d) : Q.removeEvent(c, d, f.handle);
                                i[e] && (delete i[e],
                                    j ? delete c[h] : typeof c.removeAttribute !== ha ? c.removeAttribute(h) : c[h] = null,
                                    G.push(e))
                            }
                    }
                }),
                Q.fn.extend({
                    text: function (a) {
                        return ka(this, function (a) {
                            return void 0 === a ? Q.text(this) : this.empty().append((this[0] && this[0].ownerDocument || $).createTextNode(a))
                        }, null, a, arguments.length)
                    },
                    append: function () {
                        return this.domManip(arguments, function (a) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var b = s(this, a);
                                b.appendChild(a)
                            }
                        })
                    },
                    prepend: function () {
                        return this.domManip(arguments, function (a) {
                            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                var b = s(this, a);
                                b.insertBefore(a, b.firstChild)
                            }
                        })
                    },
                    before: function () {
                        return this.domManip(arguments, function (a) {
                            this.parentNode && this.parentNode.insertBefore(a, this)
                        })
                    },
                    after: function () {
                        return this.domManip(arguments, function (a) {
                            this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                        })
                    },
                    remove: function (a, b) {
                        for (var c, d = a ? Q.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
                            b || 1 !== c.nodeType || Q.cleanData(q(c)),
                            c.parentNode && (b && Q.contains(c.ownerDocument, c) && v(q(c, "script")),
                                c.parentNode.removeChild(c));
                        return this
                    },
                    empty: function () {
                        for (var a, b = 0; null != (a = this[b]); b++) {
                            for (1 === a.nodeType && Q.cleanData(q(a, !1)); a.firstChild;)
                                a.removeChild(a.firstChild);
                            a.options && Q.nodeName(a, "select") && (a.options.length = 0)
                        }
                        return this
                    },
                    clone: function (a, b) {
                        return a = null != a && a,
                            b = null == b ? a : b,
                            this.map(function () {
                                return Q.clone(this, a, b)
                            })
                    },
                    html: function (a) {
                        return ka(this, function (a) {
                            var b = this[0] || {}
                                , c = 0
                                , d = this.length;
                            if (void 0 === a)
                                return 1 === b.nodeType ? b.innerHTML.replace(sa, "") : void 0;
                            if ("string" == typeof a && !za.test(a) && (O.htmlSerialize || !ta.test(a)) && (O.leadingWhitespace || !ua.test(a)) && !Ea[(wa.exec(a) || ["", ""])[1].toLowerCase()]) {
                                a = a.replace(va, "<$1></$2>");
                                try {
                                    for (; c < d; c++)
                                        b = this[c] || {},
                                        1 === b.nodeType && (Q.cleanData(q(b, !1)),
                                            b.innerHTML = a);
                                    b = 0
                                } catch (e) {
                                }
                            }
                            b && this.empty().append(a)
                        }, null, a, arguments.length)
                    },
                    replaceWith: function () {
                        var a = arguments[0];
                        return this.domManip(arguments, function (b) {
                            a = this.parentNode,
                                Q.cleanData(q(this)),
                            a && a.replaceChild(b, this)
                        }),
                            a && (a.length || a.nodeType) ? this : this.remove()
                    },
                    detach: function (a) {
                        return this.remove(a, !0)
                    },
                    domManip: function (a, b) {
                        a = I.apply([], a);
                        var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0],
                            n = Q.isFunction(m);
                        if (n || j > 1 && "string" == typeof m && !O.checkClone && Aa.test(m))
                            return this.each(function (c) {
                                var d = k.eq(c);
                                n && (a[0] = m.call(this, c, d.html())),
                                    d.domManip(a, b)
                            });
                        if (j && (h = Q.buildFragment(a, this[0].ownerDocument, !1, this),
                                c = h.firstChild,
                            1 === h.childNodes.length && (h = c),
                                c)) {
                            for (f = Q.map(q(h, "script"), t),
                                     e = f.length; i < j; i++)
                                d = h,
                                i !== l && (d = Q.clone(d, !0, !0),
                                e && Q.merge(f, q(d, "script"))),
                                    b.call(this[i], d, i);
                            if (e)
                                for (g = f[f.length - 1].ownerDocument,
                                         Q.map(f, u),
                                         i = 0; i < e; i++)
                                    d = f[i],
                                    Ba.test(d.type || "") && !Q._data(d, "globalEval") && Q.contains(g, d) && (d.src ? Q._evalUrl && Q._evalUrl(d.src) : Q.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Da, "")));
                            h = c = null
                        }
                        return this
                    }
                }),
                Q.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function (a, b) {
                    Q.fn[a] = function (a) {
                        for (var c, d = 0, e = [], f = Q(a), g = f.length - 1; d <= g; d++)
                            c = d === g ? this : this.clone(!0),
                                Q(f[d])[b](c),
                                J.apply(e, c.get());
                        return this.pushStack(e)
                    }
                }),
                Q.fn.delay = function (a, b) {
                    return a = Q.fx ? Q.fx.speeds[a] || a : a,
                        b = b || "fx",
                        this.queue(b, function (b, c) {
                            var d = setTimeout(b, a);
                            c.stop = function () {
                                clearTimeout(d)
                            }
                        })
                }
                ,
                function () {
                    var a, b, c, d, e;
                    b = $.createElement("div"),
                        b.setAttribute("className", "t"),
                        b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                        d = b.getElementsByTagName("a")[0],
                        c = $.createElement("select"),
                        e = c.appendChild($.createElement("option")),
                        a = b.getElementsByTagName("input")[0],
                        d.style.cssText = "top:1px",
                        O.getSetAttribute = "t" !== b.className,
                        O.style = /top/.test(d.getAttribute("style")),
                        O.hrefNormalized = "/a" === d.getAttribute("href"),
                        O.checkOn = !!a.value,
                        O.optSelected = e.selected,
                        O.enctype = !!$.createElement("form").enctype,
                        c.disabled = !0,
                        O.optDisabled = !e.disabled,
                        a = $.createElement("input"),
                        a.setAttribute("value", ""),
                        O.input = "" === a.getAttribute("value"),
                        a.value = "t",
                        a.setAttribute("type", "radio"),
                        O.radioValue = "t" === a.value
                }();
            var Ha = /\r/g;
            Q.fn.extend({
                val: function (a) {
                    var b, c, d, e = this[0];
                    {
                        if (arguments.length)
                            return d = Q.isFunction(a),
                                this.each(function (c) {
                                    var e;
                                    1 === this.nodeType && (e = d ? a.call(this, c, Q(this).val()) : a,
                                        null == e ? e = "" : "number" == typeof e ? e += "" : Q.isArray(e) && (e = Q.map(e, function (a) {
                                                return null == a ? "" : a + ""
                                            })),
                                        b = Q.valHooks[this.type] || Q.valHooks[this.nodeName.toLowerCase()],
                                    b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                                });
                        if (e)
                            return b = Q.valHooks[e.type] || Q.valHooks[e.nodeName.toLowerCase()],
                                b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
                                    "string" == typeof c ? c.replace(Ha, "") : null == c ? "" : c)
                    }
                }
            }),
                Q.extend({
                    valHooks: {
                        option: {
                            get: function (a) {
                                var b = Q.find.attr(a, "value");
                                return null != b ? b : Q.trim(Q.text(a))
                            }
                        },
                        select: {
                            get: function (a) {
                                for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || e < 0, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++)
                                    if (c = d[i],
                                        (c.selected || i === e) && (O.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !Q.nodeName(c.parentNode, "optgroup"))) {
                                        if (b = Q(c).val(),
                                                f)
                                            return b;
                                        g.push(b)
                                    }
                                return g
                            },
                            set: function (a, b) {
                                for (var c, d, e = a.options, f = Q.makeArray(b), g = e.length; g--;)
                                    if (d = e[g],
                                        Q.inArray(Q.valHooks.option.get(d), f) >= 0)
                                        try {
                                            d.selected = c = !0
                                        } catch (h) {
                                            d.scrollHeight
                                        }
                                    else
                                        d.selected = !1;
                                return c || (a.selectedIndex = -1),
                                    e
                            }
                        }
                    }
                }),
                Q.each(["radio", "checkbox"], function () {
                    Q.valHooks[this] = {
                        set: function (a, b) {
                            if (Q.isArray(b))
                                return a.checked = Q.inArray(Q(a).val(), b) >= 0
                        }
                    },
                    O.checkOn || (Q.valHooks[this].get = function (a) {
                            return null === a.getAttribute("value") ? "on" : a.value
                        }
                    )
                });
            var Ia, Ja, Ka = Q.expr.attrHandle, La = /^(?:checked|selected)$/i, Ma = O.getSetAttribute, Na = O.input;
            Q.fn.extend({
                attr: function (a, b) {
                    return ka(this, Q.attr, a, b, arguments.length > 1)
                },
                removeAttr: function (a) {
                    return this.each(function () {
                        Q.removeAttr(this, a)
                    })
                }
            }),
                Q.extend({
                    attr: function (a, b, c) {
                        var d, e, f = a.nodeType;
                        if (a && 3 !== f && 8 !== f && 2 !== f)
                            return typeof a.getAttribute === ha ? Q.prop(a, b, c) : (1 === f && Q.isXMLDoc(a) || (b = b.toLowerCase(),
                                d = Q.attrHooks[b] || (Q.expr.match.bool.test(b) ? Ja : Ia)),
                                void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = Q.find.attr(a, b),
                                    null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""),
                                    c) : void Q.removeAttr(a, b))
                    },
                    removeAttr: function (a, b) {
                        var c, d, e = 0, f = b && b.match(da);
                        if (f && 1 === a.nodeType)
                            for (; c = f[e++];)
                                d = Q.propFix[c] || c,
                                    Q.expr.match.bool.test(c) ? Na && Ma || !La.test(c) ? a[d] = !1 : a[Q.camelCase("default-" + c)] = a[d] = !1 : Q.attr(a, c, ""),
                                    a.removeAttribute(Ma ? c : d)
                    },
                    attrHooks: {
                        type: {
                            set: function (a, b) {
                                if (!O.radioValue && "radio" === b && Q.nodeName(a, "input")) {
                                    var c = a.value;
                                    return a.setAttribute("type", b),
                                    c && (a.value = c),
                                        b
                                }
                            }
                        }
                    }
                }),
                Ja = {
                    set: function (a, b, c) {
                        return b === !1 ? Q.removeAttr(a, c) : Na && Ma || !La.test(c) ? a.setAttribute(!Ma && Q.propFix[c] || c, c) : a[Q.camelCase("default-" + c)] = a[c] = !0,
                            c
                    }
                },
                Q.each(Q.expr.match.bool.source.match(/\w+/g), function (a, b) {
                    var c = Ka[b] || Q.find.attr;
                    Ka[b] = Na && Ma || !La.test(b) ? function (a, b, d) {
                        var e, f;
                        return d || (f = Ka[b],
                            Ka[b] = e,
                            e = null != c(a, b, d) ? b.toLowerCase() : null,
                            Ka[b] = f),
                            e
                    }
                        : function (a, b, c) {
                            if (!c)
                                return a[Q.camelCase("default-" + b)] ? b.toLowerCase() : null
                        }
                }),
            Na && Ma || (Q.attrHooks.value = {
                set: function (a, b, c) {
                    return Q.nodeName(a, "input") ? void (a.defaultValue = b) : Ia && Ia.set(a, b, c)
                }
            }),
            Ma || (Ia = {
                set: function (a, b, c) {
                    var d = a.getAttributeNode(c);
                    if (d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
                            d.value = b += "",
                        "value" === c || b === a.getAttribute(c))
                        return b
                }
            },
                Ka.id = Ka.name = Ka.coords = function (a, b, c) {
                    var d;
                    if (!c)
                        return (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
                }
                ,
                Q.valHooks.button = {
                    get: function (a, b) {
                        var c = a.getAttributeNode(b);
                        if (c && c.specified)
                            return c.value
                    },
                    set: Ia.set
                },
                Q.attrHooks.contenteditable = {
                    set: function (a, b, c) {
                        Ia.set(a, "" !== b && b, c)
                    }
                },
                Q.each(["width", "height"], function (a, b) {
                    Q.attrHooks[b] = {
                        set: function (a, c) {
                            if ("" === c)
                                return a.setAttribute(b, "auto"),
                                    c
                        }
                    }
                })),
            O.style || (Q.attrHooks.style = {
                get: function (a) {
                    return a.style.cssText || void 0
                },
                set: function (a, b) {
                    return a.style.cssText = b + ""
                }
            });
            var Oa = /^(?:input|select|textarea|button|object)$/i
                , Pa = /^(?:a|area)$/i;
            Q.fn.extend({
                prop: function (a, b) {
                    return ka(this, Q.prop, a, b, arguments.length > 1)
                },
                removeProp: function (a) {
                    return a = Q.propFix[a] || a,
                        this.each(function () {
                            try {
                                this[a] = void 0,
                                    delete this[a]
                            } catch (b) {
                            }
                        })
                }
            }),
                Q.extend({
                    propFix: {
                        "for": "htmlFor",
                        "class": "className"
                    },
                    prop: function (a, b, c) {
                        var d, e, f, g = a.nodeType;
                        if (a && 3 !== g && 8 !== g && 2 !== g)
                            return f = 1 !== g || !Q.isXMLDoc(a),
                            f && (b = Q.propFix[b] || b,
                                e = Q.propHooks[b]),
                                void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function (a) {
                                var b = Q.find.attr(a, "tabindex");
                                return b ? parseInt(b, 10) : Oa.test(a.nodeName) || Pa.test(a.nodeName) && a.href ? 0 : -1
                            }
                        }
                    }
                }),
            O.hrefNormalized || Q.each(["href", "src"], function (a, b) {
                Q.propHooks[b] = {
                    get: function (a) {
                        return a.getAttribute(b, 4)
                    }
                }
            }),
            O.optSelected || (Q.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex,
                    b.parentNode && b.parentNode.selectedIndex),
                        null
                }
            }),
                Q.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                    Q.propFix[this.toLowerCase()] = this
                }),
            O.enctype || (Q.propFix.enctype = "encoding");
            var Qa = /[\t\r\n\f]/g;
            Q.fn.extend({
                addClass: function (a) {
                    var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
                    if (Q.isFunction(a))
                        return this.each(function (b) {
                            Q(this).addClass(a.call(this, b, this.className))
                        });
                    if (j)
                        for (b = (a || "").match(da) || []; h < i; h++)
                            if (c = this[h],
                                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Qa, " ") : " ")) {
                                for (f = 0; e = b[f++];)
                                    d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                                g = Q.trim(d),
                                c.className !== g && (c.className = g)
                            }
                    return this
                },
                removeClass: function (a) {
                    var b, c, d, e, f, g, h = 0, i = this.length,
                        j = 0 === arguments.length || "string" == typeof a && a;
                    if (Q.isFunction(a))
                        return this.each(function (b) {
                            Q(this).removeClass(a.call(this, b, this.className))
                        });
                    if (j)
                        for (b = (a || "").match(da) || []; h < i; h++)
                            if (c = this[h],
                                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Qa, " ") : "")) {
                                for (f = 0; e = b[f++];)
                                    for (; d.indexOf(" " + e + " ") >= 0;)
                                        d = d.replace(" " + e + " ", " ");
                                g = a ? Q.trim(d) : "",
                                c.className !== g && (c.className = g)
                            }
                    return this
                },
                toggleClass: function (a, b) {
                    var c = typeof a;
                    return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : Q.isFunction(a) ? this.each(function (c) {
                        Q(this).toggleClass(a.call(this, c, this.className, b), b)
                    }) : this.each(function () {
                        if ("string" === c)
                            for (var b, d = 0, e = Q(this), f = a.match(da) || []; b = f[d++];)
                                e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                        else
                            c !== ha && "boolean" !== c || (this.className && Q._data(this, "__className__", this.className),
                                this.className = this.className || a === !1 ? "" : Q._data(this, "__className__") || "")
                    })
                },
                hasClass: function (a) {
                    for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++)
                        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Qa, " ").indexOf(b) >= 0)
                            return !0;
                    return !1
                }
            }),
                Q.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
                    Q.fn[b] = function (a, c) {
                        return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                    }
                }),
                Q.fn.extend({
                    hover: function (a, b) {
                        return this.mouseenter(a).mouseleave(b || a)
                    },
                    bind: function (a, b, c) {
                        return this.on(a, null, b, c)
                    },
                    unbind: function (a, b) {
                        return this.off(a, null, b)
                    },
                    delegate: function (a, b, c, d) {
                        return this.on(b, a, c, d)
                    },
                    undelegate: function (a, b, c) {
                        return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
                    }
                });
            var Ra = Q.now()
                , Sa = /\?/
                ,
                Ta = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            Q.parseJSON = function (b) {
                if (a.JSON && a.JSON.parse)
                    return a.JSON.parse(b + "");
                var c, d = null, e = Q.trim(b + "");
                return e && !Q.trim(e.replace(Ta, function (a, b, e, f) {
                    return c && b && (d = 0),
                        0 === d ? a : (c = e || b,
                            d += !f - !e,
                            "")
                })) ? Function("return " + e)() : Q.error("Invalid JSON: " + b)
            }
                ,
                Q.parseXML = function (b) {
                    var c, d;
                    if (!b || "string" != typeof b)
                        return null;
                    try {
                        a.DOMParser ? (d = new DOMParser,
                            c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"),
                            c.async = "false",
                            c.loadXML(b))
                    } catch (e) {
                        c = void 0
                    }
                    return c && c.documentElement && !c.getElementsByTagName("parsererror").length || Q.error("Invalid XML: " + b),
                        c
                }
            ;
            var Ua, Va, Wa = /#.*$/, Xa = /([?&])_=[^&]*/, Ya = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                Za = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, $a = /^(?:GET|HEAD)$/, _a = /^\/\//,
                ab = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, bb = {}, cb = {},
                db = "*/".concat("*");
            try {
                Va = location.href
            } catch (eb) {
                Va = $.createElement("a"),
                    Va.href = "",
                    Va = Va.href
            }
            Ua = ab.exec(Va.toLowerCase()) || [],
                Q.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Va,
                        type: "GET",
                        isLocal: Za.test(Ua[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": db,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText",
                            json: "responseJSON"
                        },
                        converters: {
                            "* text": String,
                            "text html": !0,
                            "text json": Q.parseJSON,
                            "text xml": Q.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function (a, b) {
                        return b ? A(A(a, Q.ajaxSettings), b) : A(Q.ajaxSettings, a)
                    },
                    ajaxPrefilter: y(bb),
                    ajaxTransport: y(cb),
                    ajax: function (a, b) {
                        function c(a, b, c, d) {
                            var e, k, r, s, u, w = b;
                            2 !== t && (t = 2,
                            h && clearTimeout(h),
                                j = void 0,
                                g = d || "",
                                v.readyState = a > 0 ? 4 : 0,
                                e = a >= 200 && a < 300 || 304 === a,
                            c && (s = B(l, v, c)),
                                s = C(l, s, v, e),
                                e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"),
                                u && (Q.lastModified[f] = u),
                                    u = v.getResponseHeader("etag"),
                                u && (Q.etag[f] = u)),
                                    204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state,
                                        k = s.data,
                                        r = s.error,
                                        e = !r)) : (r = w,
                                !a && w || (w = "error",
                                a < 0 && (a = 0))),
                                v.status = a,
                                v.statusText = (b || w) + "",
                                e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
                                v.statusCode(q),
                                q = void 0,
                            i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]),
                                p.fireWith(m, [v, w]),
                            i && (n.trigger("ajaxComplete", [v, l]),
                            --Q.active || Q.event.trigger("ajaxStop")))
                        }

                        "object" == typeof a && (b = a,
                            a = void 0),
                            b = b || {};
                        var d, e, f, g, h, i, j, k, l = Q.ajaxSetup({}, b), m = l.context || l,
                            n = l.context && (m.nodeType || m.jquery) ? Q(m) : Q.event, o = Q.Deferred(),
                            p = Q.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0,
                            u = "canceled", v = {
                                readyState: 0,
                                getResponseHeader: function (a) {
                                    var b;
                                    if (2 === t) {
                                        if (!k)
                                            for (k = {}; b = Ya.exec(g);)
                                                k[b[1].toLowerCase()] = b[2];
                                        b = k[a.toLowerCase()]
                                    }
                                    return null == b ? null : b
                                },
                                getAllResponseHeaders: function () {
                                    return 2 === t ? g : null
                                },
                                setRequestHeader: function (a, b) {
                                    var c = a.toLowerCase();
                                    return t || (a = s[c] = s[c] || a,
                                        r[a] = b),
                                        this
                                },
                                overrideMimeType: function (a) {
                                    return t || (l.mimeType = a),
                                        this
                                },
                                statusCode: function (a) {
                                    var b;
                                    if (a)
                                        if (t < 2)
                                            for (b in a)
                                                q[b] = [q[b], a[b]];
                                        else
                                            v.always(a[v.status]);
                                    return this
                                },
                                abort: function (a) {
                                    var b = a || u;
                                    return j && j.abort(b),
                                        c(0, b),
                                        this
                                }
                            };
                        if (o.promise(v).complete = p.add,
                                v.success = v.done,
                                v.error = v.fail,
                                l.url = ((a || l.url || Va) + "").replace(Wa, "").replace(_a, Ua[1] + "//"),
                                l.type = b.method || b.type || l.method || l.type,
                                l.dataTypes = Q.trim(l.dataType || "*").toLowerCase().match(da) || [""],
                            null == l.crossDomain && (d = ab.exec(l.url.toLowerCase()),
                                l.crossDomain = !(!d || d[1] === Ua[1] && d[2] === Ua[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Ua[3] || ("http:" === Ua[1] ? "80" : "443")))),
                            l.data && l.processData && "string" != typeof l.data && (l.data = Q.param(l.data, l.traditional)),
                                z(bb, l, b, v),
                            2 === t)
                            return v;
                        i = Q.event && l.global,
                        i && 0 === Q.active++ && Q.event.trigger("ajaxStart"),
                            l.type = l.type.toUpperCase(),
                            l.hasContent = !$a.test(l.type),
                            f = l.url,
                        l.hasContent || (l.data && (f = l.url += (Sa.test(f) ? "&" : "?") + l.data,
                            delete l.data),
                        l.cache === !1 && (l.url = Xa.test(f) ? f.replace(Xa, "$1_=" + Ra++) : f + (Sa.test(f) ? "&" : "?") + "_=" + Ra++)),
                        l.ifModified && (Q.lastModified[f] && v.setRequestHeader("If-Modified-Since", Q.lastModified[f]),
                        Q.etag[f] && v.setRequestHeader("If-None-Match", Q.etag[f])),
                        (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
                            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + db + "; q=0.01" : "") : l.accepts["*"]);
                        for (e in l.headers)
                            v.setRequestHeader(e, l.headers[e]);
                        if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))
                            return v.abort();
                        u = "abort";
                        for (e in {
                            success: 1,
                            error: 1,
                            complete: 1
                        })
                            v[e](l[e]);
                        if (j = z(cb, l, b, v)) {
                            v.readyState = 1,
                            i && n.trigger("ajaxSend", [v, l]),
                            l.async && l.timeout > 0 && (h = setTimeout(function () {
                                v.abort("timeout")
                            }, l.timeout));
                            try {
                                t = 1,
                                    j.send(r, c)
                            } catch (w) {
                                if (!(t < 2))
                                    throw w;
                                c(-1, w)
                            }
                        } else
                            c(-1, "No Transport");
                        return v
                    },
                    getJSON: function (a, b, c) {
                        return Q.get(a, b, c, "json")
                    },
                    getScript: function (a, b) {
                        return Q.get(a, void 0, b, "script")
                    }
                }),
                Q.each(["get", "post"], function (a, b) {
                    Q[b] = function (a, c, d, e) {
                        return Q.isFunction(c) && (e = e || d,
                            d = c,
                            c = void 0),
                            Q.ajax({
                                url: a,
                                type: b,
                                dataType: e,
                                data: c,
                                success: d
                            })
                    }
                }),
                Q._evalUrl = function (a) {
                    return Q.ajax({
                        url: a,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    })
                }
                ,
                Q.fn.extend({
                    wrapAll: function (a) {
                        if (Q.isFunction(a))
                            return this.each(function (b) {
                                Q(this).wrapAll(a.call(this, b))
                            });
                        if (this[0]) {
                            var b = Q(a, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && b.insertBefore(this[0]),
                                b.map(function () {
                                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)
                                        a = a.firstChild;
                                    return a
                                }).append(this)
                        }
                        return this
                    },
                    wrapInner: function (a) {
                        return Q.isFunction(a) ? this.each(function (b) {
                            Q(this).wrapInner(a.call(this, b))
                        }) : this.each(function () {
                            var b = Q(this)
                                , c = b.contents();
                            c.length ? c.wrapAll(a) : b.append(a)
                        })
                    },
                    wrap: function (a) {
                        var b = Q.isFunction(a);
                        return this.each(function (c) {
                            Q(this).wrapAll(b ? a.call(this, c) : a)
                        })
                    },
                    unwrap: function () {
                        return this.parent().each(function () {
                            Q.nodeName(this, "body") || Q(this).replaceWith(this.childNodes)
                        }).end()
                    }
                });
            var fb = /%20/g
                , gb = /\[\]$/
                , hb = /\r?\n/g
                , ib = /^(?:submit|button|image|reset|file)$/i
                , jb = /^(?:input|select|textarea|keygen)/i;
            Q.param = function (a, b) {
                var c, d = [], e = function (a, b) {
                    b = Q.isFunction(b) ? b() : null == b ? "" : b,
                        d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
                if (void 0 === b && (b = Q.ajaxSettings && Q.ajaxSettings.traditional),
                    Q.isArray(a) || a.jquery && !Q.isPlainObject(a))
                    Q.each(a, function () {
                        e(this.name, this.value)
                    });
                else
                    for (c in a)
                        D(c, a[c], b, e);
                return d.join("&").replace(fb, "+")
            }
                ,
                Q.fn.extend({
                    serialize: function () {
                        return Q.param(this.serializeArray())
                    },
                    serializeArray: function () {
                        return this.map(function () {
                            var a = Q.prop(this, "elements");
                            return a ? Q.makeArray(a) : this
                        }).filter(function () {
                            var a = this.type;
                            return this.name && !Q(this).is(":disabled") && jb.test(this.nodeName) && !ib.test(a) && (this.checked || !la.test(a))
                        }).map(function (a, b) {
                            var c = Q(this).val();
                            return null == c ? null : Q.isArray(c) ? Q.map(c, function (a) {
                                return {
                                    name: b.name,
                                    value: a.replace(hb, "\r\n")
                                }
                            }) : {
                                name: b.name,
                                value: c.replace(hb, "\r\n")
                            }
                        }).get()
                    }
                }),
                Q.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
                    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && E() || F()
                }
                    : E;
            var kb = 0
                , lb = {}
                , mb = Q.ajaxSettings.xhr();
            a.attachEvent && a.attachEvent("onunload", function () {
                for (var a in lb)
                    lb[a](void 0, !0)
            }),
                O.cors = !!mb && "withCredentials" in mb,
                mb = O.ajax = !!mb,
            mb && Q.ajaxTransport(function (a) {
                if (!a.crossDomain || O.cors) {
                    var b;
                    return {
                        send: function (c, d) {
                            var e, f = a.xhr(), g = ++kb;
                            if (f.open(a.type, a.url, a.async, a.username, a.password),
                                    a.xhrFields)
                                for (e in a.xhrFields)
                                    f[e] = a.xhrFields[e];
                            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
                            a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                            for (e in c)
                                void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                            f.send(a.hasContent && a.data || null),
                                b = function (c, e) {
                                    var h, i, j;
                                    if (b && (e || 4 === f.readyState))
                                        if (delete lb[g],
                                                b = void 0,
                                                f.onreadystatechange = Q.noop,
                                                e)
                                            4 !== f.readyState && f.abort();
                                        else {
                                            j = {},
                                                h = f.status,
                                            "string" == typeof f.responseText && (j.text = f.responseText);
                                            try {
                                                i = f.statusText
                                            } catch (k) {
                                                i = ""
                                            }
                                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                                        }
                                    j && d(h, i, j, f.getAllResponseHeaders())
                                }
                                ,
                                a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = lb[g] = b : b()
                        },
                        abort: function () {
                            b && b(void 0, !0)
                        }
                    }
                }
            }),
                Q.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        "text script": function (a) {
                            return Q.globalEval(a),
                                a
                        }
                    }
                }),
                Q.ajaxPrefilter("script", function (a) {
                    void 0 === a.cache && (a.cache = !1),
                    a.crossDomain && (a.type = "GET",
                        a.global = !1)
                }),
                Q.ajaxTransport("script", function (a) {
                    if (a.crossDomain) {
                        var b, c = $.head || Q("head")[0] || $.documentElement;
                        return {
                            send: function (d, e) {
                                b = $.createElement("script"),
                                    b.async = !0,
                                a.scriptCharset && (b.charset = a.scriptCharset),
                                    b.src = a.url,
                                    b.onload = b.onreadystatechange = function (a, c) {
                                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null,
                                        b.parentNode && b.parentNode.removeChild(b),
                                            b = null,
                                        c || e(200, "success"))
                                    }
                                    ,
                                    c.insertBefore(b, c.firstChild)
                            },
                            abort: function () {
                                b && b.onload(void 0, !0)
                            }
                        }
                    }
                });
            var nb = []
                , ob = /(=)\?(?=&|$)|\?\?/;
            Q.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var a = nb.pop() || Q.expando + "_" + Ra++;
                    return this[a] = !0,
                        a
                }
            }),
                Q.ajaxPrefilter("json jsonp", function (b, c, d) {
                    var e, f, g,
                        h = b.jsonp !== !1 && (ob.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ob.test(b.data) && "data");
                    if (h || "jsonp" === b.dataTypes[0])
                        return e = b.jsonpCallback = Q.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                            h ? b[h] = b[h].replace(ob, "$1" + e) : b.jsonp !== !1 && (b.url += (Sa.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                            b.converters["script json"] = function () {
                                return g || Q.error(e + " was not called"),
                                    g[0]
                            }
                            ,
                            b.dataTypes[0] = "json",
                            f = a[e],
                            a[e] = function () {
                                g = arguments
                            }
                            ,
                            d.always(function () {
                                a[e] = f,
                                b[e] && (b.jsonpCallback = c.jsonpCallback,
                                    nb.push(e)),
                                g && Q.isFunction(f) && f(g[0]),
                                    g = f = void 0
                            }),
                            "script"
                }),
                Q.parseHTML = function (a, b, c) {
                    if (!a || "string" != typeof a)
                        return null;
                    "boolean" == typeof b && (c = b,
                        b = !1),
                        b = b || $;
                    var d = X.exec(a)
                        , e = !c && [];
                    return d ? [b.createElement(d[1])] : (d = Q.buildFragment([a], b, e),
                    e && e.length && Q(e).remove(),
                        Q.merge([], d.childNodes))
                }
            ;
            var pb = Q.fn.load;
            return Q.fn.load = function (a, b, c) {
                if ("string" != typeof a && pb)
                    return pb.apply(this, arguments);
                var d, e, f, g = this, h = a.indexOf(" ");
                return h >= 0 && (d = Q.trim(a.slice(h, a.length)),
                    a = a.slice(0, h)),
                    Q.isFunction(b) ? (c = b,
                        b = void 0) : b && "object" == typeof b && (f = "POST"),
                g.length > 0 && Q.ajax({
                    url: a,
                    type: f,
                    dataType: "html",
                    data: b
                }).done(function (a) {
                    e = arguments,
                        g.html(d ? Q("<div>").append(Q.parseHTML(a)).find(d) : a)
                }).complete(c && function (a, b) {
                        g.each(c, e || [a.responseText, b, a])
                    }
                ),
                    this
            }
                ,
                Q.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
                    Q.fn[b] = function (a) {
                        return this.on(b, a)
                    }
                }),
            "function" == typeof define && define.amd && define("jquery-internal", [], function () {
                return Q
            }),
                Q.noConflict = function () {
                }
                ,
                Q
        }),
        function (a, b) {
            "use strict";
            "object" == typeof module && module.exports && "function" == typeof require ? module.exports = b() : "function" == typeof define && "object" == typeof define.amd ? define("loglevel", b) : a.log = b()
        }(this, function () {
            "use strict";
            function a(a) {
                return typeof console !== h && (void 0 !== console[a] ? b(console, a) : void 0 !== console.log ? b(console, "log") : g)
            }

            function b(a, b) {
                var c = a[b];
                if ("function" == typeof c.bind)
                    return c.bind(a);
                try {
                    return Function.prototype.bind.call(c, a)
                } catch (d) {
                    return function () {
                        return Function.prototype.apply.apply(c, [a, arguments])
                    }
                }
            }

            function c(a, b, c) {
                return function () {
                    typeof console !== h && (d.call(this, b, c),
                        this[a].apply(this, arguments))
                }
            }

            function d(a, b) {
                for (var c = 0; c < i.length; c++) {
                    var d = i[c];
                    this[d] = c < a ? g : this.methodFactory(d, a, b)
                }
            }

            function e(b, d, e) {
                return a(b) || c.apply(this, arguments)
            }

            function f(a, b, c) {
                function f(a) {
                    var b = (i[a] || "silent").toUpperCase();
                    try {
                        return void (window.localStorage[l] = b)
                    } catch (c) {
                    }
                    try {
                        window.document.cookie = encodeURIComponent(l) + "=" + b + ";"
                    } catch (c) {
                    }
                }

                function g() {
                    var a;
                    try {
                        a = window.localStorage[l]
                    } catch (b) {
                    }
                    if (typeof a === h)
                        try {
                            var c = window.document.cookie
                                , d = c.indexOf(encodeURIComponent(l) + "=");
                            d && (a = /^([^;]+)/.exec(c.slice(d))[1])
                        } catch (b) {
                        }
                    return void 0 === k.levels[a] && (a = void 0),
                        a
                }

                var j, k = this, l = "loglevel";
                a && (l += ":" + a),
                    k.levels = {
                        TRACE: 0,
                        DEBUG: 1,
                        INFO: 2,
                        WARN: 3,
                        ERROR: 4,
                        SILENT: 5
                    },
                    k.methodFactory = c || e,
                    k.getLevel = function () {
                        return j
                    }
                    ,
                    k.setLevel = function (b, c) {
                        if ("string" == typeof b && void 0 !== k.levels[b.toUpperCase()] && (b = k.levels[b.toUpperCase()]),
                                !("number" == typeof b && b >= 0 && b <= k.levels.SILENT))
                            throw "log.setLevel() called with invalid level: " + b;
                        if (j = b,
                            c !== !1 && f(b),
                                d.call(k, b, a),
                            typeof console === h && b < k.levels.SILENT)
                            return "No console available for logging"
                    }
                    ,
                    k.setDefaultLevel = function (a) {
                        g() || k.setLevel(a, !1)
                    }
                    ,
                    k.enableAll = function (a) {
                        k.setLevel(k.levels.TRACE, a)
                    }
                    ,
                    k.disableAll = function (a) {
                        k.setLevel(k.levels.SILENT, a)
                    }
                ;
                var m = g();
                null == m && (m = null == b ? "WARN" : b),
                    k.setLevel(m, !1)
            }

            var g = function () {
            }
                , h = "undefined"
                , i = ["trace", "debug", "info", "warn", "error"]
                , j = new f
                , k = {};
            j.getLogger = function (a) {
                if ("string" != typeof a || "" === a)
                    throw new TypeError("You must supply a name when creating a logger.");
                var b = k[a];
                return b || (b = k[a] = new f(a, j.getLevel(), j.methodFactory)),
                    b
            }
            ;
            var l = typeof window !== h ? window.log : void 0;
            return j.noConflict = function () {
                return typeof window !== h && window.log === j && (window.log = l),
                    j
            }
                ,
                j
        }),
        function (a) {
            var b = "object" == typeof exports && exports
                , c = "object" == typeof module && module && module.exports == b && module
                , d = "object" == typeof global && global;
            d.global !== d && d.window !== d || (a = d);
            var e = function (a) {
                this.message = a
            };
            e.prototype = new Error,
                e.prototype.name = "InvalidCharacterError";
            var f = function (a) {
                throw new e(a)
            }
                , g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                , h = /[\t\n\f\r ]/g
                , i = function (a) {
                a = String(a).replace(h, "");
                var b = a.length;
                b % 4 == 0 && (a = a.replace(/==?$/, ""),
                    b = a.length),
                (b % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(a)) && f("Invalid character: the string to be decoded is not correctly encoded.");
                for (var c, d, e = 0, i = "", j = -1; ++j < b;)
                    d = g.indexOf(a.charAt(j)),
                        c = e % 4 ? 64 * c + d : d,
                    e++ % 4 && (i += String.fromCharCode(255 & c >> (-2 * e & 6)));
                return i
            }
                , j = function (a) {
                a = String(a),
                /[^\0-\xFF]/.test(a) && f("The string to be encoded contains characters outside of the Latin1 range.");
                for (var b, c, d, e, h = a.length % 3, i = "", j = -1, k = a.length - h; ++j < k;)
                    b = a.charCodeAt(j) << 16,
                        c = a.charCodeAt(++j) << 8,
                        d = a.charCodeAt(++j),
                        e = b + c + d,
                        i += g.charAt(e >> 18 & 63) + g.charAt(e >> 12 & 63) + g.charAt(e >> 6 & 63) + g.charAt(63 & e);
                return 2 == h ? (b = a.charCodeAt(j) << 8,
                    c = a.charCodeAt(++j),
                    e = b + c,
                    i += g.charAt(e >> 10) + g.charAt(e >> 4 & 63) + g.charAt(e << 2 & 63) + "=") : 1 == h && (e = a.charCodeAt(j),
                        i += g.charAt(e >> 2) + g.charAt(e << 4 & 63) + "=="),
                    i
            }
                , k = {
                encode: j,
                decode: i,
                version: "0.1.0"
            };
            if ("function" == typeof define && "object" == typeof define.amd && define.amd)
                define("base-64", [], function () {
                    return k
                });
            else if (b && !b.nodeType)
                if (c)
                    c.exports = k;
                else
                    for (var l in k)
                        k.hasOwnProperty(l) && (b[l] = k[l]);
            else
                a.base64 = k
        }(this),
        define("base64", ["base-64"], function (a) {
            "use strict";
            return {
                decode: function (b) {
                    return b ? decodeURIComponent(escape(a.decode(b))) : b
                }
            }
        }),
        define("url-utils", ["loglevel", "base-64", "jquery-internal"], function (a, b, c) {
            "use strict";
            function d(a) {
                return c.each(a, function (b, c) {
                    "" !== c && null !== c && void 0 !== c || delete a[b]
                })
            }

            return {
                cleanParam: function (a) {
                    return c.param(d(a))
                },
                parseUrlString: function (a) {
                    var b, d, e, f = document.createElement("a"), g = {};
                    for (f.href = a,
                             b = c.grep(f.search.replace(/^\?/, "").split("&"), function (a) {
                                 return !!a
                             }),
                             e = 0; e < b.length; e++)
                        d = b[e].split("="),
                            g[this.safeURIDecode(d[0])] = this.safeURIDecode(d[1]);
                    return {
                        protocol: f.protocol,
                        host: f.host,
                        hostname: f.hostname,
                        port: f.port,
                        pathname: "/" === f.pathname.charAt(0) ? f.pathname : "/" + f.pathname,
                        search: f.search,
                        searchObject: g,
                        hash: f.hash
                    }
                },
                urlObjectToString: function (a) {
                    return a.protocol + "//" + a.host + a.pathname + a.search + a.hash
                },
                safeURIDecode: function (b) {
                    if (void 0 === b || b.length < 1)
                        return b;
                    var c = b;
                    try {
                        return c = c.replace(/%(?![2-9a-fA-F]{1}[0-9a-fA-F]{1})/g, "%25"),
                            decodeURIComponent(c)
                    } catch (d) {
                        a.error("The URI-element failed to decode: " + c)
                    }
                    return c
                },
                objectToNameValuePairs: function (a) {
                    var b = [];
                    for (var c in a)
                        a.hasOwnProperty(c) && b.push({
                            name: c,
                            value: a[c]
                        });
                    return b
                },
                encodeApiRequest: function (a) {
                    return b.encode(encodeURIComponent(JSON.stringify(a)))
                },
                precondition: function (b, c) {
                    if (!b)
                        throw a.error(c),
                            {
                                name: "RequiredValue",
                                message: c
                            }
                },
                getFullInteractionUri: function (a, b) {
                    return a.indexOf("://") === -1 ? b + a : a
                },
                objectToQueryString: function (a) {
                    return c.param(a).replace(/\+/g, "%20")
                },
                buildRequestUri: function (a, b) {
                    return b ? a + "?" + b : a
                }
            }
        }),
        define("sdk-internal", ["jquery-internal", "loglevel", "base64", "url-utils"], function (a, b, c, d) {
            "use strict";
            function e(b) {
                b && a.each(b, function (a, b) {
                    b.data = c.decode(b.data);
                    try {
                        b.data = JSON.parse(b.data)
                    } catch (d) {
                    }
                })
            }

            function f(b, c, d) {
                this.config = c,
                    this.transport = b,
                    this.customer = d || {},
                    this.convert = a.isFunction(this.config.promiseConverter) ? this.config.promiseConverter : function (a) {
                        return a
                    }
            }

            return f.prototype.setDebug = function (a) {
                var c = a ? "debug" : "warn";
                b.setLevel(c)
            }
                ,
                f.prototype.getTid = function () {
                    return this.customer.tid
                }
                ,
                f.prototype.sendInteraction = function (a, c) {
                    d.precondition(a, "Missing required parameter: interactionPath");
                    var f = d.getFullInteractionUri(a, this.config.touchpoint)
                        , g = this.customer;
                    return this.convert(this.transport.sendInteraction(this.customer, f, c || {}).then(function (a) {
                        return g.tid = a.tid,
                            b.debug("ONE - Storing tid: ", g.tid),
                            e(a.optimizations),
                            a
                    }))
                }
                ,
                f.prototype.generatePixelUrl = function (b, c) {
                    var e = b ? d.getFullInteractionUri(d.buildRequestUri(b, d.objectToQueryString(c)), this.config.touchpoint) : ""
                        , f = "/one/rt/track/" + encodeURIComponent(this.config.sk) + "/pixel";
                    return this.config.host + f + "?" + a.param({
                            pv: this.config.pv,
                            tid: this.customer.tid,
                            uri: e
                        })
                }
                ,
                f.prototype.getUrlWithOneTid = function (b) {
                    if (!b)
                        return "";
                    var c = d.parseUrlString(d.getFullInteractionUri(b, this.config.touchpoint))
                        , e = this.customer.tid;
                    return e && (c.searchObject["one-tid"] = e,
                        c.search = "?" + a.param(c.searchObject)),
                        d.urlObjectToString(c)
                }
                ,
                f.prototype.sendBaseTouchpointProperties = function (a) {
                    return d.precondition(a, "Missing required parameter: properties"),
                        b.debug("ONE - Sending properties: ", a),
                        this.convert(this.transport.sendProperties(this.customer, this.config.touchpoint, a))
                }
                ,
                f.prototype.sendProperties = function (a, c) {
                    d.precondition(a, "Missing required parameter: interactionPath"),
                        d.precondition(c, "Missing required parameter: properties"),
                        b.debug("ONE - Sending properties: ", c);
                    var e = d.getFullInteractionUri(a, this.config.touchpoint);
                    return this.convert(this.transport.sendProperties(this.customer, e, c))
                }
                ,
                f.prototype.sendResponseCode = function (a, c) {
                    return d.precondition(a, "Missing required parameter: responseCode"),
                        b.debug("ONE - Sending response code: ", a),
                        this.convert(this.transport.sendResponseCode(this.customer, a, c))
                }
                ,
                f.prototype.getStructureData = function (a, b) {
                    return b = b || "json",
                        d.precondition(a, "Missing required parameter: structureServiceName"),
                        d.precondition("json" === b || "html" === b, "format parameter must be json or html"),
                        this.convert(this.transport.getStructureData(this.customer, a, b))
                }
                ,
                function (a, b) {
                    d.precondition(a, "Internal Error - SDK Transport not provided"),
                        d.precondition(b, "Missing required SDK settings object"),
                        d.precondition(b.version, "Missing version (e.g { version: 2.0 })"),
                        d.precondition(b.host, 'Missing ONE host URL (e.g { host: "https://eu2.thunderhead.com" })'),
                        d.precondition(b.sk, 'Missing Site-Key (e.g { sk: "ONE-ABCD1234-5678" })'),
                        d.precondition(b.touchpoint, 'Missing Base Touchpoint URI (e.g { touchpoint: "crm://contactcenter" })'),
                        d.precondition(b.touchpoint.indexOf("://") > 0, "Invalid Touchpoint URI: " + b.touchpoint);
                    var c = a(b);
                    return {
                        customerApi: function (a) {
                            return new f(c, b, a)
                        }
                    }
                }
        }),
        define("jsonp-transport", ["jquery-internal", "loglevel", "url-utils"], function (a, b, c) {
            "use strict";
            function d(c) {
                b.debug("ONE - Invoking (JSONP): ", c.url),
                    c.dataType = "jsonp",
                    c.jsonpCallback = "THX_" + a.now() + "_" + Math.floor(100 * Math.random() + 1);
                var d = a.Deferred();
                return a.ajax(c).done(function (a) {
                    d.resolve(a)
                }).fail(function (a) {
                    d.reject({
                        name: "JSONP Error",
                        message: "ONE responded with status: " + a.statusText,
                        status: a.status,
                        response: a
                    })
                }),
                    d.promise()
            }

            function e(c) {
                var d = Math.round((new Date).getTime() / 1e3)
                    , e = c.url + "&_=" + d;
                b.debug("ONE - Invoking (Image): ", e);
                var f = a.Deferred();
                return a('<img src="' + e + '">').load(function () {
                    b.debug("Image load success ", e),
                        f.resolve({
                            status: 200
                        })
                }).error(function () {
                    f.reject({
                        name: "JSONP (Image) Error",
                        message: "ONE responded with status: unknown",
                        status: -1,
                        response: {}
                    })
                }),
                    f.promise()
            }

            return function (f) {
                function g(a, b, e) {
                    var f = c.buildRequestUri(b, c.objectToQueryString(e));
                    return d({
                        url: k.host + m,
                        data: {
                            pv: k.pv,
                            tid: a.tid,
                            flash: !0,
                            uri: f
                        }
                    })
                }

                function h(b, d, f) {
                    f = a.extend(f, {
                        tid: b.tid,
                        rid: d
                    });
                    var g = c.objectToQueryString(f)
                        , h = k.host + o + "?" + g;
                    return e({
                        url: h
                    })
                }

                function i(b, d, f) {
                    if (!a.isEmptyObject(f)) {
                        var g = {
                            uri: d,
                            properties: c.objectToNameValuePairs(f)
                        }
                            , h = k.host + n + "?" + a.param({
                                pv: k.pv,
                                tid: b.tid,
                                apirequest: c.encodeApiRequest(g)
                            });
                        return e({
                            url: h
                        })
                    }
                }

                function j(b, d, f, g, h) {
                    f = c.getFullInteractionUri(c.buildRequestUri(f, c.objectToQueryString(g)), k.touchpoint),
                        h = a.extend(h, {
                            errorType: d,
                            interactionUri: f
                        });
                    var i = k.host + p + "?" + a.param({
                            pv: k.pv,
                            tid: b,
                            errorrequest: c.encodeApiRequest(h)
                        });
                    return e({
                        url: i
                    })
                }

                var k = f
                    , l = "/one/rt/web/onetag/"
                    , m = l + encodeURIComponent(k.sk) + "/"
                    , n = m + "__props.gif"
                    , o = l + "__req.gif"
                    , p = m + "error";
                return b.debug("ONE - Using JSONP transport"),
                    {
                        sendInteraction: g,
                        sendResponseCode: h,
                        sendProperties: i,
                        sendErrorEvent: j,
                        getStructureData: function () {
                            throw {
                                name: "UnsupportedMethodImplementation",
                                message: "getStructureData() is not supported via JSONP"
                            }
                        }
                    }
            }
        }),
        function (a) {
            if ("function" == typeof define && define.amd)
                define("js-cookie", a);
            else if ("object" == typeof exports)
                module.exports = a();
            else {
                var b = window.Cookies
                    , c = window.Cookies = a();
                c.noConflict = function () {
                    return window.Cookies = b,
                        c
                }
            }
        }(function () {
            function a() {
                for (var a = 0, b = {}; a < arguments.length; a++) {
                    var c = arguments[a];
                    for (var d in c)
                        b[d] = c[d]
                }
                return b
            }

            function b(c) {
                function d(b, e, f) {
                    var g;
                    if (arguments.length > 1) {
                        if (f = a({
                                path: "/"
                            }, d.defaults, f),
                            "number" == typeof f.expires) {
                            var h = new Date;
                            h.setMilliseconds(h.getMilliseconds() + 864e5 * f.expires),
                                f.expires = h
                        }
                        try {
                            g = JSON.stringify(e),
                            /^[\{\[]/.test(g) && (e = g)
                        } catch (i) {
                        }
                        return e = c.write ? c.write(e, b) : encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                            b = encodeURIComponent(String(b)),
                            b = b.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent),
                            b = b.replace(/[\(\)]/g, escape),
                            document.cookie = [b, "=", e, f.expires && "; expires=" + f.expires.toUTCString(), f.path && "; path=" + f.path, f.domain && "; domain=" + f.domain, f.secure ? "; secure" : ""].join("")
                    }
                    b || (g = {});
                    for (var j = document.cookie ? document.cookie.split("; ") : [], k = /(%[0-9A-Z]{2})+/g, l = 0; l < j.length; l++) {
                        var m = j[l].split("=")
                            , n = m[0].replace(k, decodeURIComponent)
                            , o = m.slice(1).join("=");
                        '"' === o.charAt(0) && (o = o.slice(1, -1));
                        try {
                            if (o = c.read ? c.read(o, n) : c(o, n) || o.replace(k, decodeURIComponent),
                                    this.json)
                                try {
                                    o = JSON.parse(o)
                                } catch (i) {
                                }
                            if (b === n) {
                                g = o;
                                break
                            }
                            b || (g[n] = o)
                        } catch (i) {
                        }
                    }
                    return g
                }

                return d.get = d.set = d,
                    d.getJSON = function () {
                        return d.apply({
                            json: !0
                        }, [].slice.call(arguments))
                    }
                    ,
                    d.defaults = {},
                    d.remove = function (b, c) {
                        d(b, "", a(c, {
                            expires: -1
                        }))
                    }
                    ,
                    d.withConverter = b,
                    d
            }

            return b(function () {
            })
        }),
        define("tag-constants", [], function () {
            "use strict";
            return {
                PointsProcessor: {
                    MAX_RETRIES: 900,
                    RETRY_WAIT_MS: 1e3,
                    HANDLER_NAMES: {
                        CAPTURE_POINT: "Capture Point",
                        TRACKING_POINT: "Tracking Point",
                        OPTIMIZATION_POINT: "Optimization Point"
                    },
                    POINT_TYPES: {
                        CAPTURE_POINT: "CAPTURE_POINT",
                        TRACKING_POINT: "TRACKING_POINT",
                        OPTIMIZATION_POINT: "OPTIMIZATION_POINT"
                    }
                },
                Cookie: {
                    LEGACY_TID: "_one",
                    TID_PREFIX: "_one_",
                    TID_EXPIRATION: 729,
                    SESSION: "_one_session",
                    OVERRIDE: "THX_OVERRIDE",
                    BLOCK_USER: "_one_user_block_tag",
                    ENABLE_LOGGING: "_one_enable_logging"
                },
                CaptureType: {
                    VALUE: "VALUE",
                    ATTRIBUTE: "ATTRIBUTE",
                    COOKIE: "COOKIE",
                    TEXT: "TEXT"
                },
                ElementNames: {
                    SELECT: "SELECT",
                    INPUT: "INPUT",
                    BUTTON: "BUTTON",
                    TEXTAREA: "TEXTAREA"
                },
                ElementTypes: {
                    RADIO: "radio",
                    BUTTON: "button",
                    TEXT: "text",
                    CHECKBOX: "checkbox"
                },
                Directive: {
                    UPDATE: "UPDATE",
                    REPLACE: "REPLACE",
                    SKIP: "SKIP",
                    BEFORE: "BEFORE",
                    AFTER: "AFTER"
                },
                InjectedAttributes: {
                    CAPTURE_TYPE: "data-cp-type",
                    CAPTURE_DELAY: "data-cp-delay",
                    CAPTURE_POINT_ID: "data-cp-id",
                    TRACKING_POINT_ID: "data-tp-id",
                    CAPTURE_ATTRIBUTE: "data-cp-attr",
                    RESPONSE_ID: "data-responseid",
                    NEGATIVE_RESPONSE_ID: "data-neg-responseid",
                    NEUTRAL_RESPONSE_ID: "data-neu-responseid",
                    ASSET_RESPONSE: "one-asset-response",
                    EVENT_SENT: "data-evt-sent"
                },
                AssetResponseTypes: {
                    POSITIVE: "positive",
                    NEUTRAL: "neutral",
                    NEGATIVE: "negative",
                    NONE: "none"
                },
                OnChangeInputTypes: {
                    text: !0,
                    tel: !0,
                    color: !0,
                    number: !0,
                    date: !0,
                    email: !0,
                    search: !0,
                    url: !0,
                    month: !0,
                    range: !0
                },
                Errors: {
                    DOM_FAILURE: "DOM_FAILURE",
                    TIMEOUT: "TIMEOUT",
                    CUSTOM_TAG: "CUSTOM_TAG"
                }
            }
        }),
        define("tag-utils", ["jquery-internal", "loglevel", "tag-constants", "js-cookie", "url-utils", "jsonp-transport"], function (a, b, c, d, e, f) {
            "use strict";
            var g = {
                tagConfig: null,
                getOrSetCookie: function (a, b, c, e, f, g) {
                    return void 0 !== b || a && "string" != typeof a ? (c = this.updateExpires(c),
                        d.set(a, b, {
                            expires: c,
                            path: e,
                            domain: f,
                            secure: g
                        }),
                        null) : d.get(a)
                },
                updateExpires: function (a) {
                    if (!a || a <= 0)
                        return "";
                    var b = new Date;
                    return g.addDays(b, a)
                },
                addDays: function (a, b) {
                    if (!(a instanceof Date))
                        return "";
                    var c = 1e3 * b * 60 * 60 * 24
                        , d = new Date(a.getTime() + c);
                    return d.toGMTString()
                },
                getApiRequest: function (b, c) {
                    return {
                        uri: b || e.safeURIDecode(document.location.toString()),
                        properties: a.extend({}, c)
                    }
                },
                getElementBySelector: function (c) {
                    if (void 0 === c)
                        return null;
                    for (var d, e = c.split(">"), f = !1, h = 0; h < e.length; h++) {
                        f = !1;
                        var i = a.trim(e[h]);
                        if (0 === i.indexOf("#")) {
                            if (d = document.getElementById(i.substring(1)),
                                null === d) {
                                f = !1,
                                g.tagConfig.retryCount < 1 && b.warn("Unable to find element with ID [" + i + "]");
                                break
                            }
                            f = !0
                        } else {
                            if (void 0 === d && (d = document.body),
                                null === d) {
                                g.tagConfig.retryCount < 1 && b.warn("Unable to find element with CSS path [" + i + "]");
                                break
                            }
                            var j = d.childNodes
                                ,
                                k = i.indexOf(":eq(") > 0 ? i.substring(0, i.indexOf(":")).toLowerCase() : i.toLowerCase()
                                , l = 0;
                            if (i.indexOf(":eq(") > 0) {
                                var m = i.substring(i.indexOf(":eq(") + 4, i.indexOf(")"));
                                "" !== m && (l = parseInt(m, void 0))
                            }
                            for (var n = 0; n < j.length; n++) {
                                var o = j[n].localName || j[n].tagName || j[n].nodeName;
                                if (1 === j[n].nodeType && o.toLowerCase() === k) {
                                    if (0 === l) {
                                        f = !0,
                                            d = j[n];
                                        break
                                    }
                                    l--
                                }
                            }
                        }
                    }
                    return f ? d || null : null
                },
                isContentPositionBeforeOrAfter: function (a) {
                    return a === c.Directive.AFTER || a === c.Directive.BEFORE
                },
                isInvalidTextInjection: function (a, b, c) {
                    return g.isContentPositionBeforeOrAfter(a) && "#text" === b && "IMG" !== c && "OBJECT" !== c
                },
                sendDomErrorEvent: function (a, b, d) {
                    var e = a.apiRequest
                        , h = g.getOrSetCookie(c.Cookie.TID_PREFIX + b.cookieSuffix)
                        , i = {}
                        , j = c.PointsProcessor.HANDLER_NAMES
                        , k = c.PointsProcessor.POINT_TYPES
                        , l = !0;
                    d.name === j.CAPTURE_POINT ? (i.capturePointId = a.id,
                        i.pointType = k.CAPTURE_POINT) : d.name === j.TRACKING_POINT ? (i.trackingPointId = a.id,
                        i.pointType = k.TRACKING_POINT) : d.name === j.OPTIMIZATION_POINT && a.data.actions.length > 0 ? (i.responseIdentifier = a.data.actions[0].asset.responses[0].code,
                        i.pointType = k.OPTIMIZATION_POINT) : l = !1,
                    l && f(b).sendErrorEvent(h, c.Errors.DOM_FAILURE, e.uri, e.properties, i)
                },
                processPoint: function (a, d, e, f) {
                    g.tagConfig = a;
                    var h = g.getElementBySelector(d.path)
                        , i = !1;
                    return null == h && f && this.sendDomErrorEvent(d, f, e),
                        null !== h && "password" === h.type ? (b.warn("This capture point has been ignored. ONE cannot capture data from a password field."),
                            i = !0) : d.captureType === c.CaptureType.COOKIE ? g.getOrSetCookie(d.path) && (e.process(d, h),
                                b.info("Injected [" + d.path + "]"),
                                i = !0) : null !== h && (e.process(d, h),
                                b.info("Injected [" + d.path + "]"),
                                i = !0),
                        i
                },
                reprocessPoints: function (a) {
                    if (g.tagConfig = a,
                            a.retryCount++,
                        a.retryCount >= c.PointsProcessor.MAX_RETRIES || !a.pointsToRetry.length)
                        return a.retryCount = 0,
                            void (a.pointsToRetry.length = 0);
                    for (var b, d, e = a.pointsToRetry.length; e--;)
                        b = a.pointsToRetry[e],
                            d = g.processPoint(a, b.point, b.handler, null),
                        d && a.pointsToRetry.splice(e, 1);
                    setTimeout(function () {
                        g.reprocessPoints(a)
                    }, c.PointsProcessor.RETRY_WAIT_MS)
                },
                inject: function (a, d) {
                    if (a) {
                        var e = a.nodeName
                            , f = document.createElement("DIV")
                            , h = document.createElement("DIV")
                            , i = g.getWrappingElements(d.data)
                            , j = g.wrapMarkup(d.data, i);
                        if (f.innerHTML = j,
                                h.innerHTML = "<br/>" + j,
                                h.removeChild(h.firstChild),
                                !(f.childNodes.length < 1)) {
                            var k = g.getFirstPullActionChildElement(f, i.length)
                                , l = null === k ? null : k.nodeName
                                , m = g.getDirective(l, e, d.directives);
                            if (m !== c.Directive.SKIP) {
                                g.isContentPositionBeforeOrAfter(d.directives) && (m = d.directives);
                                var n, o = g.getReplaceTag(l, e), p = g.getElementToReplace(o, f, d, i.length),
                                    q = a.parentNode, r = q.childNodes, s = "", t = "", u = "", v = "";
                                if (m === c.Directive.REPLACE || m === c.Directive.BEFORE || m === c.Directive.AFTER) {
                                    for (var w = 0; w < r.length; w++)
                                        if (r[w] === a) {
                                            g.tagConfig.previewVersion && (p.data = {
                                                directive: m,
                                                rid: d.responseId,
                                                path: d.path
                                            });
                                            for (var x = a.attributes, y = 0; y < x.length; y++)
                                                switch (x[y].name) {
                                                    case "class":
                                                        s = " " + x[y].value;
                                                        break;
                                                    case "style":
                                                        t = x[y].value;
                                                        break;
                                                    case "width":
                                                        u = x[y].value;
                                                        break;
                                                    case "height":
                                                        v = x[y].value
                                                }
                                            if (p.className = "THX_IP" + (p.className ? " " + p.className : "") + s,
                                                m === c.Directive.REPLACE) {
                                                var z = t
                                                    , A = u
                                                    , B = v;
                                                z.length > 0 && z.lastIndexOf(";") !== z.length - 1 && (z += ";"),
                                                A.length > 0 && (z += "width:" + A + "px;"),
                                                B.length > 0 && (z += "height:" + B + "px;"),
                                                z.length > 0 && (p.style.cssText = p.style.cssText + " " + z,
                                                g.tagConfig.previewVersion && (p.data.style = p.style))
                                            }
                                            if (g.setResponses(d, p),
                                                g.tagConfig.previewVersion && m === c.Directive.REPLACE && (p.data.originalElement = r[w].cloneNode(!0),
                                                    p.data.replaceElement = p.cloneNode(!0)),
                                                m === c.Directive.BEFORE)
                                                q.insertBefore(p, r[w]);
                                            else if (m === c.Directive.AFTER)
                                                q.insertBefore(p, r[w].nextSibling);
                                            else {
                                                var C = g.findAncestorWithNodeName(a, "A")
                                                    , D = !1;
                                                C && "A" === p.nodeName && (b.warn("Injection Prevented - Invalid Markup. Cannot inject an anchor tag into another anchor tag."),
                                                    D = !0),
                                                D || q.replaceChild(p, r[w])
                                            }
                                            n = p;
                                            break
                                        }
                                } else if (m === c.Directive.UPDATE) {
                                    g.setResponses(d, a);
                                    for (var E = a.attributes, F = "", G = 0; G < E.length; G++)
                                        "class" !== E[G].name && "className" !== E[G].name || (F = " " + E[G].value);
                                    a.className = "THX_IP" + F,
                                    g.tagConfig.previewVersion && (a.data = {
                                        directive: m,
                                        rid: d.responseId,
                                        path: d.path
                                    }),
                                    g.tagConfig.previewVersion && (a.data.originalElement = a.cloneNode(!0),
                                        a.data.replaceElement = p.cloneNode(!0)),
                                        a.innerHTML = "",
                                        a.appendChild(p),
                                        n = a
                                }
                                g.addSpecialElements(h),
                                    g.addEventHandler(n, "click", g.handleEvent, !1),
                                    g.attachHrefIntercepts(n),
                                    b.info("Content : " + d.data)
                            } else if (g.isInvalidTextInjection(d.directives, l, e)) {
                                var H = d.directives === c.Directive.AFTER ? "after" : "before";
                                b.warn("ONE optimization has been skipped. Injecting a text asset", H, "a node is not supported by ONE Tag.")
                            } else
                                b.warn("ONE optimization has been skipped.")
                        }
                    }
                },
                setResponses: function (a, b) {
                    b.setAttribute(c.InjectedAttributes.RESPONSE_ID, a.responseId),
                    a.neutralResponseId && b.setAttribute(c.InjectedAttributes.NEUTRAL_RESPONSE_ID, a.neutralResponseId),
                    a.negativeResponseId && b.setAttribute(c.InjectedAttributes.NEGATIVE_RESPONSE_ID, a.negativeResponseId)
                },
                attachHrefIntercepts: function (a) {
                    for (var b = a.getElementsByTagName("A"), c = 0; c < b.length; c++)
                        "function" == typeof b[c].onclick && (b[c]._onclick = b[c].onclick),
                            b[c].onclick = this.hrefIntercept
                },
                hrefIntercept: function (a) {
                    for (var b = g.getEvent(a), d = g.getTarget(b), e = d, f = d.getAttribute("onelabel"), h = d.getAttribute(c.InjectedAttributes.ASSET_RESPONSE), i = g.getResponseId(d, h); !i && "BODY" !== e.tagName;)
                        h || (h = e.getAttribute(c.InjectedAttributes.ASSET_RESPONSE)),
                            i = g.getResponseId(e, h),
                            e = e.parentNode;
                    return e.getAttribute(c.InjectedAttributes.RESPONSE_ID) && g.processEvent(b) && g.logOptimizationPoint(e.getAttribute(c.InjectedAttributes.RESPONSE_ID), f),
                        g.handleHrefOnclick(d, b, !1)
                },
                handleEvent: function (a) {
                    var b = g.getEvent(a)
                        , d = g.getTarget(b);
                    if (!g.processEvent(b))
                        return !0;
                    for (var e = d.getAttribute(c.InjectedAttributes.ASSET_RESPONSE), f = g.getResponseId(d, e), h = d.parentNode; null === f;) {
                        if ("BODY" === h.tagName)
                            return;
                        e || (e = h.getAttribute(c.InjectedAttributes.ASSET_RESPONSE)),
                            f = g.getResponseId(h, e),
                            h = h.parentNode
                    }
                    return g.logOptimizationPoint(f),
                        !0
                },
                getResponseId: function (a, d) {
                    if (!d)
                        return a.getAttribute(c.InjectedAttributes.RESPONSE_ID);
                    d = d.toLowerCase();
                    var e;
                    switch (d) {
                        case c.AssetResponseTypes.POSITIVE:
                            e = a.getAttribute(c.InjectedAttributes.RESPONSE_ID);
                            break;
                        case c.AssetResponseTypes.NEUTRAL:
                            e = a.getAttribute(c.InjectedAttributes.NEUTRAL_RESPONSE_ID);
                            break;
                        case c.AssetResponseTypes.NEGATIVE:
                            e = a.getAttribute(c.InjectedAttributes.NEGATIVE_RESPONSE_ID);
                            break;
                        default:
                            e = c.AssetResponseTypes.NONE
                    }
                    return b.info("Sending rid [" + e + "] for configured response type [" + d + "}"),
                        e
                },
                getWrappingElements: function (b) {
                    var c = a.trim(b).toLowerCase();
                    return 0 === c.indexOf("<thead") || 0 === c.indexOf("<tbody") || 0 === c.indexOf("<tfoot") || 0 === c.indexOf("<caption") ? ["table"] : 0 === c.indexOf("<th") ? ["table", "thead", "tr"] : 0 === c.indexOf("<tr") ? ["table", "tbody"] : 0 === c.indexOf("<td") ? ["table", "tbody", "tr"] : 0 === c.indexOf("<colgroup") ? ["table", "thead"] : 0 === c.indexOf("<col") ? ["table", "colgroup"] : []
                },
                wrapMarkup: function (a, b) {
                    for (var c = a, d = b.length - 1; d >= 0; d--)
                        c = "<" + b[d] + ">" + c + "</" + b[d] + ">";
                    return c
                },
                getFirstPullActionChildElement: function (a, b) {
                    for (var c = a, d = 0; d < b; d++)
                        c = c.childNodes[0];
                    for (var e = c.childNodes.length, f = 0; f < e; f++) {
                        var g = c.childNodes[f].nodeName;
                        if ("SCRIPT" !== g && "LINK" !== g && "STYLE" !== g && !this.isEmptyTextNode(c.childNodes[f]))
                            return c.childNodes[f]
                    }
                    return null
                },
                isEmptyTextNode: function (b) {
                    if ("#text" !== b.nodeName)
                        return !1;
                    var c = b.textContent || b.innerText || "";
                    return "" === a.trim(c)
                },
                getDirective: function (a, b, d) {
                    if (a === b)
                        return c.Directive.REPLACE;
                    if (g.isInvalidTextInjection(d, a, b))
                        return c.Directive.SKIP;
                    var e = "";
                    switch (a) {
                        case "#text":
                            e = "IMG" === b || "OBJECT" === b ? c.Directive.REPLACE : g.isContentPositionBeforeOrAfter(d) ? c.Directive.SKIP : c.Directive.UPDATE;
                            break;
                        case "SPAN":
                            e = "DIV" === b || "P" === b || 0 === b.indexOf("H") ? c.Directive.UPDATE : c.Directive.REPLACE;
                            break;
                        case "OBJECT":
                            e = "DIV" === b ? c.Directive.UPDATE : c.Directive.REPLACE;
                            break;
                        case "IMG":
                            e = "DIV" === b || "P" === b ? c.Directive.UPDATE : c.Directive.REPLACE;
                            break;
                        case "A":
                            e = "DIV" === b || "P" === b || 0 === b.indexOf("H") ? c.Directive.UPDATE : c.Directive.REPLACE;
                            break;
                        case "DIV":
                        case "P":
                        case "H1":
                        case "H2":
                        case "H3":
                        case "H4":
                        case "H5":
                        case "H6":
                            e = c.Directive.REPLACE;
                            break;
                        default:
                            e = c.Directive.SKIP
                    }
                    return e
                },
                getReplaceTag: function (a, b) {
                    var c = "SELF";
                    switch (a) {
                        case "#text":
                            "IMG" !== b && "OBJECT" !== b || (c = "SPAN");
                            break;
                        case "OBJECT":
                            "DIV" !== b && (c = "DIV");
                            break;
                        case "A":
                            "DIV" !== b && "P" !== b && 0 !== b.indexOf("H") || (c = "A")
                    }
                    return c
                },
                getElementToReplace: function (a, b, c, d) {
                    var e, f = g.getFirstPullActionChildElement(b, d);
                    return "DIV" === a ? e = b : "SPAN" === a ? (e = document.createElement("span"),
                        e.innerHTML = c.data) : "A" === a ? (e = f,
                        e.href = f.href) : e = f,
                        e
                },
                setAttribute: function (a, b, c) {
                    var d = document.createAttribute(b);
                    d.value = c,
                        a.setAttributeNode(d)
                },
                findAncestorWithNodeName: function (a, b) {
                    return a && a.parentNode && "BODY" !== a.parentNode.nodeName ? a.parentNode.nodeName === b ? a.parentNode : g.findAncestorWithNodeName(a.parentNode, b) : null
                },
                addSpecialElements: function (a) {
                    for (var b = a.getElementsByTagName("style"), c = 0; c < b.length; c++)
                        g.addStyle(b[c]);
                    for (var d = a.getElementsByTagName("link"), e = 0; e < d.length; e++)
                        g.addLink(d[e]);
                    for (var f = a.getElementsByTagName("script"), h = 0; h < f.length; h++)
                        g.addScript(f[h])
                },
                addScript: function (a) {
                    if (a) {
                        var b = document.createElement("script")
                            , c = a.getAttribute("src");
                        b.setAttribute("type", "text/javascript"),
                            c ? (b.setAttribute("src", c),
                                b.setAttribute("charset", "UTF-8")) : b.text = a.text,
                            document.body.appendChild(b)
                    }
                },
                addStyle: function (a) {
                    if (a) {
                        var b = document.createElement("style")
                            , c = document.createTextNode(a.innerHTML);
                        b.type = "text/css",
                            b.styleSheet ? b.styleSheet.cssText = c.nodeValue : b.appendChild(c),
                            document.body.appendChild(b)
                    }
                },
                addLink: function (a) {
                    if (a) {
                        var b = document.createElement("link");
                        b.rel = "stylesheet",
                            b.type = "text/css",
                            b.href = a.href,
                            document.body.appendChild(b)
                    }
                },
                addEventHandler: function (a, b, c, d) {
                    a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener(b, c, d),
                    "click" === b && g.delayParentAnchors(a)
                },
                delayParentAnchors: function (a) {
                    if (a && a.parentNode) {
                        var b = a.parentNode;
                        "BODY" !== b.nodeName && ("A" === a.nodeName && ("function" == typeof a.onclick && (a._onclick = a.onclick),
                                a.onclick = function (a) {
                                    var b = g.getEvent(a);
                                    g.handleHrefOnclick(this, b, !0)
                                }
                        ),
                            g.delayParentAnchors(b))
                    }
                },
                handleHrefOnclick: function (a, b, c) {
                    var d = a.getAttribute("href");
                    return g.isExternalLink(d) ? (setTimeout(function () {
                        var c = "function" != typeof a._onclick || a._onclick(b);
                        c && (document.location.href = d)
                    }, 500),
                    c && g.preventDefault(b),
                        !1) : ("function" == typeof a._onclick && a._onclick(b),
                        !0)
                },
                isExternalLink: function (a) {
                    var b = "javascript";
                    return a && a.length > 0 && "#" !== a.charAt(0) && a.indexOf(b + ":") === -1
                },
                getTarget: function (a) {
                    var b = g.getEvent(a)
                        , c = b.target ? b.target : b.srcElement;
                    return c = 3 === c.nodeType ? c.parentNode : c
                },
                getCurrentTarget: function (a) {
                    var b = g.getEvent(a);
                    return b.currentTarget ? b.currentTarget : b.srcElement
                },
                getEvent: function (a) {
                    return a ? a : window.event
                },
                processEvent: function (a) {
                    var b = g.getTarget(a)
                        , d = b.getAttribute(c.InjectedAttributes.EVENT_SENT);
                    if (d)
                        return !1;
                    var e = (new Date).getTime();
                    return g.setAttribute(b, c.InjectedAttributes.EVENT_SENT, e),
                        setTimeout(function () {
                            g.setAttribute(b, c.InjectedAttributes.EVENT_SENT, "")
                        }, 100),
                        !0
                },
                addParam: function (a, b, c, d) {
                    return b && c && (a += (d ? "?" : "&") + b + "=" + c),
                        a
                },
                getEventTarget: function (a, b) {
                    if (a.currentTarget)
                        return a.currentTarget;
                    for (var c = a.srcElement; !c.getAttribute(b) && (c = c.parentNode,
                    !c.getAttribute(b) && "BODY" !== c.nodeName);)
                        ;
                    return c
                },
                extractValueFromTarget: function (a, b) {
                    return b === c.CaptureType.VALUE ? g.extractValueCaptureTypeFromTarget(a) : b === c.CaptureType.ATTRIBUTE ? g.extractAttributeCaptureTypeFromTarget(a) : b === c.CaptureType.TEXT && a.nodeName === c.ElementNames.SELECT ? g.extractSelectedTextFromSelectElement(a) : ""
                },
                extractValueCaptureTypeFromTarget: function (a) {
                    return a.nodeName === c.ElementNames.INPUT && a.type === c.ElementTypes.CHECKBOX ? a.checked : a.value
                },
                extractAttributeCaptureTypeFromTarget: function (a) {
                    var b = a.getAttribute(c.InjectedAttributes.CAPTURE_ATTRIBUTE);
                    return a.nodeName === c.ElementNames.SELECT && (a = g.extractSelectedOptionFromSelect(a)),
                        g.extractAttributeFromTarget(a, b)
                },
                extractAttributeFromTarget: function (a, b) {
                    for (var c = 0; c < a.attributes.length; c++)
                        if (a.attributes[c].name === b)
                            return a.attributes[c].value;
                    return null
                },
                extractSelectedTextFromSelectElement: function (a) {
                    var b = g.extractSelectedOptionFromSelect(a);
                    return b ? b.text : null
                },
                extractSelectedAttributeFromSelectElement: function (a, b) {
                    var c = g.extractSelectedOptionFromSelect(a);
                    return c ? g.extractAttributeFromTarget(c, b) : null
                },
                extractSelectedOptionFromSelect: function (a) {
                    return a.selectedIndex === -1 ? null : a.options[a.selectedIndex]
                },
                logOptimizationPoint: function (a, c) {
                    g.tagConfig.customerApi.sendResponseCode(a, {
                        onelabel: c
                    }),
                        b.info("Logging event with response ID [" + a + "] and asset link (onelabel) [" + c + "].")
                },
                logCapturePointEvent: function (a, c, d, e) {
                    a && (c || c === !1 || 0 === c) && (e.properties[a] = c,
                        d > 0 ? setTimeout(function () {
                            g.tagConfig.customerApi.sendProperties(e.uri, e.properties)
                        }, d) : g.tagConfig.customerApi.sendProperties(e.uri, e.properties),
                        b.info("Logging click on Capture Point name [" + a + "] and value [" + c + "]."))
                },
                handleCapturePointEvent: function (b) {
                    var d = g.getEvent(b)
                        , e = g.getEventTarget(d, c.InjectedAttributes.CAPTURE_POINT_ID)
                        , f = e.getAttribute(c.InjectedAttributes.CAPTURE_POINT_ID)
                        , h = e.getAttribute(c.InjectedAttributes.CAPTURE_DELAY)
                        , i = e.getAttribute(c.InjectedAttributes.CAPTURE_TYPE)
                        , j = a.data(e, "one-apirequest");
                    return !f || !h || (h > 0 ? setTimeout(function () {
                            g.logCapturePointEvent(f, g.extractValueFromTarget(e, i), 0, j)
                        }, h) : g.logCapturePointEvent(f, g.extractValueFromTarget(e, i), 0, j),
                            !0)
                },
                attachCapturePointHandler: function (a, b, d, e, f) {
                    g.setAttribute(a, c.InjectedAttributes.CAPTURE_POINT_ID, b.id),
                        g.setAttribute(a, c.InjectedAttributes.CAPTURE_DELAY, d || 0),
                        g.setAttribute(a, c.InjectedAttributes.CAPTURE_TYPE, e || 0),
                        g.setAttribute(a, c.InjectedAttributes.CAPTURE_ATTRIBUTE, b.attribute),
                        g.addEventHandler(a, f, g.handleCapturePointEvent, !1),
                        g.attachApiRequest(a, b.apiRequest)
                },
                logTrackingPointEvent: function (a, c) {
                    c.properties[a] = "",
                        g.tagConfig.customerApi.sendProperties(c.uri, c.properties),
                        b.info("Logging click on Tracking Point with ID [" + a + "].")
                },
                trackingPointIntercept: function (b) {
                    var d, e = g.getEvent(b), f = g.getTarget(e),
                        h = f.getAttribute(c.InjectedAttributes.TRACKING_POINT_ID);
                    return h || (f = g.getCurrentTarget(e),
                        h = f.getAttribute(c.InjectedAttributes.TRACKING_POINT_ID)),
                        d = a.data(f, "one-apirequest"),
                    h && g.logTrackingPointEvent(h, d),
                        g.handleHrefOnclick(f, e)
                },
                attachApiRequest: function (b, c) {
                    a.data(b, "one-apirequest", c)
                },
                preventDefault: function (a) {
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                }
            };
            return g
        }),
        define("web-points-processor", ["jquery-internal", "loglevel", "tag-constants", "tag-utils"], function (a, b, c, d) {
            "use strict";
            var e = {
                previewVersion: "",
                retryCount: 0,
                pointsToRetry: [],
                customerApi: null
            };
            return {
                processPoints: function (f, g, h, i) {
                    if (e.customerApi = f,
                            e.previewVersion = i.pv,
                        void 0 !== g) {
                        if (g.length < 1)
                            return void b.warn("No points of type [" + h.name + "] to inject.");
                        var j, k = e.pointsToRetry.length > 0;
                        a.each(g, function (a, b) {
                            j = d.processPoint(e, b, h, i),
                            j || e.pointsToRetry.push({
                                point: b,
                                handler: h
                            })
                        }),
                        i.doRetry && !k && e.pointsToRetry.length > 0 && setTimeout(function () {
                            d.reprocessPoints(e)
                        }, c.PointsProcessor.RETRY_WAIT_MS)
                    }
                },
                OptimizationPoint: {
                    name: "Optimization Point",
                    process: function (c, e) {
                        var f = this.convertToLegacyCommand(c);
                        if (f && e.nodeType && "" !== f.data)
                            if ("application/x-thunderhead-external-url" === f.dataMimeType) {
                                var g = f.data
                                    , h = {
                                    accepts: "text/html",
                                    success: function (a) {
                                        b.info("Retrieving external asset at url: " + g),
                                            f.data = a,
                                            d.inject(e, f)
                                    },
                                    error: function (a) {
                                        b.error("There was a problem retrieving external asset at url: " + g, a)
                                    }
                                };
                                a.ajax(g, h)
                            } else
                                d.inject(e, f)
                    },
                    getResponseBySentiment: function (a, b) {
                        for (var c = 0; c < a.length; c++)
                            if (a[c].sentiment === b)
                                return a[c].code;
                        return null
                    },
                    convertToLegacyCommand: function (c) {
                        if (!c.data.actions || c.data.actions.length < 1)
                            return b.warn("No actions for optimization with path [" + c.path + "]"),
                                null;
                        var d = c.data.actions[0];
                        if (!d.asset)
                            return b.warn("No assets for optimization with path [" + c.path + "]"),
                                null;
                        var e = d.asset
                            , f = this.getResponseBySentiment(e.responses, "positive")
                            , g = this.getResponseBySentiment(e.responses, "negative")
                            , h = this.getResponseBySentiment(e.responses, "neutral");
                        return f ? {
                            data: a.trim(e.content),
                            dataMimeType: e.mimeType,
                            directives: c.directives,
                            path: c.path,
                            responseId: f,
                            negativeResponseId: g,
                            neutralResponseId: h
                        } : (b.warn("No positive response code for optimization with path [" + c.path + "]"),
                            null)
                    }
                },
                TrackingPoint: {
                    name: "Tracking Point",
                    process: function (a, b) {
                        d.setAttribute(b, c.InjectedAttributes.TRACKING_POINT_ID, a.id),
                            d.attachApiRequest(b, a.apiRequest),
                        "function" == typeof b.onclick && (b._onclick = b.onclick),
                            b.onclick = d.trackingPointIntercept
                    }
                },
                CapturePoint: {
                    name: "Capture Point",
                    process: function (a, b) {
                        var c = a.captureDelay
                            , d = a.captureType
                            , e = b ? b.nodeName : ""
                            , f = b ? b.type : "";
                        this.onLoadCaptureData(a, b, d, c, e, f),
                            this.onClickCaptureHandler(a, b, d, c, e, f)
                    },
                    onLoadCaptureData: function (a, b, d, e, f, g) {
                        d === c.CaptureType.TEXT ? this.captureElementText(a, b, e, f) : d === c.CaptureType.VALUE ? this.captureElementValue(a, b, e, f, g) : d === c.CaptureType.ATTRIBUTE ? this.captureElementAttribute(a, b, e, f) : d === c.CaptureType.COOKIE && this.captureCookieValue(a, e)
                    },
                    captureElementText: function (a, b, e, f) {
                        var g = f && f === c.ElementNames.SELECT ? d.extractSelectedTextFromSelectElement(b) : b.innerHTML;
                        d.logCapturePointEvent(a.id, g, e, a.apiRequest)
                    },
                    captureElementValue: function (a, b, e, f, g) {
                        f === c.ElementNames.INPUT && (g === c.ElementTypes.TEXT || g === c.ElementTypes.CHECKBOX) || f === c.ElementNames.SELECT ? d.logCapturePointEvent(a.id, d.extractValueCaptureTypeFromTarget(b), e, a.apiRequest) : f === c.ElementNames.BUTTON || f === c.ElementNames.INPUT && (g === c.ElementTypes.RADIO || g === c.ElementTypes.BUTTON) ? this.captureElementValueFromGroup(a, b, e) : this.captureElementText(a, b, e, f)
                    },
                    captureElementValueFromGroup: function (a, b, c) {
                        for (var e = a.elementName ? a.elementName : b.name, f = document.getElementsByName(e), g = 0; g < f.length; g++)
                            if (f[g].checked !== !1) {
                                d.logCapturePointEvent(a.id, f[g].value, c, a.apiRequest);
                                break
                            }
                    },
                    captureElementAttribute: function (a, b, e, f) {
                        var g = f === c.ElementNames.SELECT ? d.extractSelectedAttributeFromSelectElement(b, a.attribute) : d.extractAttributeFromTarget(b, a.attribute);
                        void 0 !== g && d.logCapturePointEvent(a.id, g, e, a.apiRequest)
                    },
                    captureCookieValue: function (a, b) {
                        var c = d.getOrSetCookie(a.path);
                        c && d.logCapturePointEvent(a.id, c, b, a.apiRequest)
                    },
                    onClickCaptureHandler: function (a, b, e, f, g, h) {
                        if (e !== c.CaptureType.COOKIE)
                            if (g === c.ElementNames.INPUT && c.OnChangeInputTypes[h] || g === c.ElementNames.SELECT || g === c.ElementNames.TEXTAREA)
                                d.attachCapturePointHandler(b, a, f, e, "change");
                            else if (g === c.ElementNames.BUTTON || g === c.ElementNames.INPUT && ("radio" === h || "button" === h))
                                for (var i = a.elementName ? a.elementName : b.name, j = document.getElementsByName(i), k = 0; k < j.length; k++)
                                    d.attachCapturePointHandler(j[k], a, f, e, "click");
                            else
                                d.attachCapturePointHandler(b, a, f, e, "click")
                    }
                }
            }
        }),
        define("tag", ["jquery-internal", "loglevel", "sdk-internal", "jsonp-transport", "js-cookie", "url-utils", "web-points-processor", "tag-constants", "tag-utils"], function (a, b, c, d, e, f, g, h, i) {
            "use strict";
            function j(a, c, d) {
                return a ? (b.debug("ONE - Saving TID: ", a, d),
                    void e.set(h.Cookie.TID_PREFIX + c, a, {
                        domain: d,
                        expires: h.Cookie.TID_EXPIRATION
                    })) : void b.warn("ONE - TID not found: ", a, d)
            }

            function k(a) {
                var c = e.get(h.Cookie.LEGACY_TID)
                    , d = e.get(h.Cookie.TID_PREFIX + a);
                return b.debug("ONE - Loading TID:", d),
                d || c || null
            }

            function l(a, c, d) {
                b.debug("Processing Optimizations: ", c),
                    g.processPoints(a, c, g.OptimizationPoint, d)
            }

            function m(a, c, d) {
                b.debug("Processing Captures: ", c),
                    g.processPoints(a, c, g.CapturePoint, d)
            }

            function n(a, c, d) {
                b.debug("Processing Trackers: ", c),
                    g.processPoints(a, c, g.TrackingPoint, d)
            }

            function o(c, e, f) {
                a(function () {
                    f.processOptimizations ? l(c, e.optimizations, f) : (b.error("ONE took longer than " + f.timeout + "ms to respond. Blocking injections."),
                        d(f).sendErrorEvent(c.getTid(), h.Errors.TIMEOUT, f.interaction, f.properties, {
                            requestTimeSeconds: f.domReadyTime / 1e3
                        })),
                        m(c, e.captures, f),
                        n(c, e.trackers, f)
                })
            }

            function p(b, c, d) {
                a.each(b, function (a, b) {
                    b.apiRequest = i.getApiRequest(c, d)
                })
            }

            function q(c, d) {
                return {
                    sendInteraction: function (a, c) {
                        function e(b) {
                            return p(b.trackers, a, c),
                                p(b.captures, a, c),
                                p(b.optimizations, a, c),
                                b
                        }

                        function f(a) {
                            return b.error("ONE-Tag - Call to ONE failed ", a),
                                a
                        }

                        return d.sendInteraction(a, c).then(e, f)
                    },
                    processResponse: function (e, f, g) {
                        j(d.getTid(), c.cookieSuffix, e.cookieDomain),
                            c.timeout = "undefined" != typeof g ? g : c.timeout,
                            c.doRetry = "undefined" != typeof f ? f : c.doRetry;
                        var h = a.now();
                        c.domReadyTime = c.domReadyTime ? h - c.domReadyTime : 0,
                            b.debug("ONE - Response received. dom, timeout, actual:", c.domReadyTime, c.timeout, h);
                        var i = !c.timeout || c.domReadyTime < c.timeout;
                        return c.processOptimizations = c.pv || i,
                            o(d, e, c),
                            e
                    },
                    sendBaseTouchpointProperties: function (a) {
                        return d.sendBaseTouchpointProperties(a)
                    },
                    sendProperties: function (a, b) {
                        return d.sendProperties(a, b)
                    },
                    generatePixelUrl: function (a, b) {
                        return d.generatePixelUrl(a, b)
                    },
                    sendResponseCode: function (a, b) {
                        return d.sendResponseCode(a, b)
                    },
                    setDebug: function (a) {
                        return d.setDebug(a)
                    },
                    getTid: function () {
                        return d.getTid()
                    }
                }
            }

            return {
                go: function (g, i, j, l) {
                    if (g.onetagExists)
                        return void b.error("ONE-Tag already exists on the page. Check it has not been loaded more than once.");
                    g.onetagExists = !0;
                    var m = f.parseUrlString(j);
                    i = a.extend(i, {
                        version: "2.0",
                        touchpoint: m.protocol + "//" + m.host,
                        timeout: 1050,
                        doRetry: !0,
                        interaction: m.pathname,
                        properties: m.searchObject
                    });
                    var n = {
                        interaction: i.interaction,
                        properties: i.properties
                    };
                    b.debug("ONE - Settings & defaults loaded ", i, n);
                    var o = k(i.cookieSuffix)
                        , p = c(d, i).customerApi({
                        tid: o
                    })
                        , r = q(i, p);
                    if (!i.pv) {
                        var s = e.get(h.Cookie.BLOCK_USER);
                        if (s && "true" === s)
                            return b.debug("Found disable cookie. Aborting injection."),
                                void delete g.onetagExists
                    }
                    try {
                        l.call(g, r, n)
                    } catch (t) {
                        b.error("ONE - Custom code threw an exception", t),
                            d(i).sendErrorEvent(p.getTid(), h.Errors.CUSTOM_TAG, n.interaction, n.properties, {})
                    }
                }
            }
        });
    return require('tag');
}));
