import {
  __commonJS
} from "./chunk-V4OQ3NZ2.js";

// node_modules/html-to-md/dist/index.js
var require_dist = __commonJS({
  "node_modules/html-to-md/dist/index.js"(exports, module) {
    !(function(t, e) {
      "object" === typeof exports && "object" === typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define([], e) : "object" === typeof exports ? exports.html2md = e() : t.html2md = e();
    })(exports, function() {
      return (function(t) {
        var e = {};
        function r(n) {
          if (e[n]) return e[n].exports;
          var o = e[n] = { i: n, l: false, exports: {} };
          return t[n].call(o.exports, o, o.exports, r), o.l = true, o.exports;
        }
        return r.m = t, r.c = e, r.d = function(t2, e2, n) {
          r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
        }, r.r = function(t2) {
          "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r.t = function(t2, e2) {
          if (1 & e2 && (t2 = r(t2)), 8 & e2) return t2;
          if (4 & e2 && "object" === typeof t2 && t2 && t2.__esModule) return t2;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2) for (var o in t2) r.d(n, o, function(e3) {
            return t2[e3];
          }.bind(null, o));
          return n;
        }, r.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return r.d(e2, "a", e2), e2;
        }, r.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, r.p = "", r(r.s = 46);
      })([function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(1), o = r(12), i = r(6), a = r(7), c = r(2), u = (function() {
          function t2(t3, e2, r2) {
            var o2 = void 0 === r2 ? {} : r2, i2 = o2.keepSpace, a2 = void 0 !== i2 && i2, c2 = o2.prevTagName, u2 = void 0 === c2 ? "" : c2, s = o2.nextTagName, p = void 0 === s ? "" : s, l = o2.prevTagStr, f = void 0 === l ? "" : l, h = o2.nextTagStr, d = void 0 === h ? "" : h, _ = o2.parentTag, y = void 0 === _ ? "" : _, v = o2.isFirstSubTag, g = void 0 === v || v, b = o2.calcLeading, m = void 0 !== b && b, O = o2.leadingSpace, S = void 0 === O ? "" : O, T = o2.layer, x = void 0 === T ? 1 : T, j = o2.noWrap, w = void 0 !== j && j, P = o2.prevHasEndSpace, M = void 0 !== P && P, E = o2.prevHasStartSpace, N = void 0 !== E && E, C = o2.match, L = void 0 === C ? null : C, k = o2.indentSpace, A = void 0 === k ? "" : k, H = o2.language, W = void 0 === H ? "" : H, V = o2.count, R = void 0 === V ? 1 : V, I = o2.tableColumnCount, q = void 0 === I ? 0 : I, D = o2.noExtraLine, U = void 0 !== D && D, B = o2.inTable, F = void 0 !== B && B;
            if (this.tagName = e2, this.rawStr = t3, this.parentTag = y, this.prevTagName = u2, this.nextTagName = p, this.prevTagStr = f, this.nextTagStr = d, this.isFirstSubTag = g, this.calcLeading = m, this.leadingSpace = S, this.layer = x, this.noWrap = w, this.match = L, this.indentSpace = A, this.language = W, this.count = R, this.inTable = F, this.tableColumnCount = q, this.noExtraLine = U, this.prevHasEndSpace = M, this.prevHasStartSpace = N, this.hasStartSpace = false, this.hasEndSpace = false, this.keepSpace = a2, !this.__detectStr__(t3, this.tagName)) return this.attrs = {}, void (this.innerHTML = "");
            var G = this.__fetchTagAttrAndInnerHTML__(t3), $ = G.attr, J = G.innerHTML;
            J.startsWith(" ") && (0, n.isSpacePassingTag)(e2) && (this.hasStartSpace = true), J.endsWith(" ") && (0, n.isSpacePassingTag)(e2) && (this.hasEndSpace = true), this.attrs = $, this.innerHTML = J;
          }
          return t2.prototype.__detectStr__ = function(t3, e2) {
            if ("<" !== t3[0]) return "Not a valid tag, current tag name: ".concat(this.tagName, ", tag content: ").concat(t3), false;
            for (var r2 = "", n2 = false, o2 = 1; o2 < t3.length && ">" !== t3[o2]; o2++) !n2 && /(\s|\/)/.test(t3[o2]) && (n2 = true), n2 || (r2 += t3[o2]);
            return r2 === e2;
          }, t2.prototype.__fetchTagAttrAndInnerHTML__ = function(t3) {
            for (var e2 = "", r2 = 1; r2 < t3.length && ">" !== t3[r2]; r2++) e2 += t3[r2];
            for (var o2 = t3.slice(r2 + 1), i2 = "", a2 = -1, c2 = o2.length - 1; c2 >= 0; c2--) if ((i2 = o2[c2] + i2).startsWith("</")) {
              i2.startsWith("</" + this.tagName + ">") && (a2 = c2);
              break;
            }
            -1 === a2 && (0, n.isSelfClosing)(this.tagName) && this.tagName;
            var u2 = (0, n.getTagAttributes)(e2);
            return this.tagName && delete u2[this.tagName], { attr: u2, innerHTML: o2.slice(0, a2) };
          }, t2.prototype.__onlyLeadingSpace__ = function(t3) {
            t3 = t3.trim();
            for (var e2 = 0; e2 < t3.length; e2++) if (t3[e2] !== i.SINGLE) return false;
            return true;
          }, t2.prototype.__isEmpty__ = function(t3) {
            return !this.keepSpace && ("" === t3 && "td" !== this.tagName || this.calcLeading && this.__onlyLeadingSpace__(t3));
          }, t2.prototype.getValidSubTagName = function(t3) {
            return t3;
          }, t2.prototype.beforeParse = function() {
            var t3 = c.default.get().tagListener;
            if (t3) {
              var e2 = t3(this.tagName, { parentTag: this.parentTag, prevTagName: this.prevTagName, nextTagName: this.nextTagName, isFirstSubTag: this.isFirstSubTag, attrs: this.attrs, innerHTML: this.innerHTML, language: this.language, match: this.match, isSelfClosing: false }), r2 = e2.attrs, n2 = e2.language, o2 = e2.match;
              this.attrs = r2, "string" === typeof n2 && (this.language = n2), "undefined" !== typeof o2 && (this.match = o2);
            }
            return "";
          }, t2.prototype.parseValidSubTag = function(t3, e2, r2) {
            var o2 = new ((0, n.getTagConstructor)(e2))(t3, e2, r2);
            return [o2.exec(), o2];
          }, t2.prototype.parseOnlyString = function(t3, e2, r2) {
            var n2 = new o.default(t3, e2, r2);
            return [n2.exec(), n2];
          }, t2.prototype.afterParsed = function(t3) {
            return t3;
          }, t2.prototype.slim = function(t3) {
            return this.keepSpace ? t3 : t3.trim();
          }, t2.prototype.beforeMergeSpace = function(t3) {
            return t3;
          }, t2.prototype.mergeSpace = function(t3, e2, r2) {
            return this.keepSpace && "pre" !== this.tagName ? t3.endsWith("\n") ? t3 : t3 + r2.replace(/\n+/g, "\n") : e2 + t3 + r2;
          }, t2.prototype.afterMergeSpace = function(t3) {
            return t3;
          }, t2.prototype.beforeReturn = function(t3) {
            return !((0, n.isSpacePassingTag)(this.prevTagName) && this.prevHasEndSpace || (0, n.isSpacePassingTag)(this.tagName) && this.hasStartSpace) || /^\s+/.test(t3) || /\s+$/.test(this.prevTagStr) ? t3 : " " + t3;
          }, t2.prototype.exec = function(t3, e2) {
            void 0 === t3 && (t3 = ""), void 0 === e2 && (e2 = "");
            for (var r2 = this.beforeParse(), o2 = (0, n.generateGetNextValidTag)(this.innerHTML), i2 = o2(), c2 = i2[0], u2 = i2[1], s = null, p = false, l = false; "" !== u2; ) {
              var f, h = o2(), d = h[0], _ = h[1], y = { parentTag: this.tagName, nextTagName: d, nextTagStr: _, prevTagName: s, prevTagStr: r2, prevHasEndSpace: l, prevHasStartSpace: p, leadingSpace: this.leadingSpace, layer: this.layer, keepSpace: this.keepSpace, inTable: this.inTable, calcLeading: ("li" === this.tagName || "ol" === this.tagName || "ul" === this.tagName) && this.calcLeading }, v = void 0, g = void 0;
              if (null != c2) v = (f = this.parseValidSubTag(u2, c2, y))[0], g = f[1];
              else v = (f = this.parseOnlyString(u2, c2, y))[0], g = f[1];
              l = (null === g || void 0 === g ? void 0 : g.hasEndSpace) || false, p = (null === g || void 0 === g ? void 0 : g.hasStartSpace) || false;
              var b = this.getValidSubTagName(c2);
              c2 = d, u2 = _, null == b && this.__isEmpty__(v) || (!this.keepSpace && (0, a.default)(s) && (0, a.default)(b) && (r2 = r2.replace(/\n+$/, "\n"), v = v.replace(/^\n+/, "\n")), s = b, this.isFirstSubTag = false, r2 += v);
            }
            return r2 = this.afterParsed(r2), r2 = this.slim(r2), this.__isEmpty__(r2) ? "" : (r2 = this.beforeMergeSpace(r2), !this.noExtraLine && (0, a.default)(this.tagName) && this.prevTagName && !r2.startsWith("\n") && !(0, a.default)(this.prevTagName) && this.parentTag && (t3 = "\n\n"), r2 = this.mergeSpace(r2, t3, e2), this.noWrap && !this.keepSpace && (r2 = r2.replace(/\s+/g, " ")), r2 = this.afterMergeSpace(r2), r2 = this.beforeReturn(r2));
          }, t2;
        })();
        e.default = u;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.isSpacePassingTag = e.isIndependentTag = e.clearComment = e.getLanguage = e.getTableAlign = e.getTagAttributes = e.isSelfClosing = e.generateGetNextValidTag = e.getTagConstructor = e.getRealTagName = e.unescapeStr = e.extraEscape = void 0;
        var n = r(18);
        Object.defineProperty(e, "extraEscape", { enumerable: true, get: function() {
          return n.extraEscape;
        } }), Object.defineProperty(e, "unescapeStr", { enumerable: true, get: function() {
          return n.unescapeStr;
        } });
        var o = r(47);
        e.generateGetNextValidTag = o.default;
        var i = r(48);
        e.getTagConstructor = i.default;
        var a = r(11);
        e.isSelfClosing = a.default;
        var c = r(51);
        e.getTagAttributes = c.default;
        var u = r(52);
        e.getLanguage = u.default;
        var s = r(53);
        e.clearComment = s.default;
        var p = r(13);
        e.getRealTagName = p.default;
        var l = r(7);
        e.isIndependentTag = l.default;
        var f = r(54);
        e.isSpacePassingTag = f.default;
        var h = r(55);
        e.getTableAlign = h.default;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = (function() {
          function t2(t3) {
            var e2 = void 0 === t3 ? {} : t3, r2 = e2.skipTags, n2 = void 0 === r2 ? [] : r2, o2 = e2.emptyTags, i2 = void 0 === o2 ? [] : o2, a = e2.ignoreTags, c = void 0 === a ? [] : a, u = e2.aliasTags, s = void 0 === u ? {} : u, p = e2.renderCustomTags, l = void 0 === p || p, f = e2.tagListener, h = void 0 === f ? function(t4, e3) {
              return e3;
            } : f;
            this.options = { skipTags: n2, emptyTags: i2, ignoreTags: c, aliasTags: s, renderCustomTags: l, tagListener: h };
          }
          return t2.prototype.get = function() {
            return this.options;
          }, t2.prototype.clear = function() {
            this.options = {};
          }, t2.prototype.set = function(t3, e2) {
            var r2 = this;
            t3 && "[object Object]" === Object.prototype.toString.call(t3) && Object.keys(t3).forEach(function(n2) {
              e2 ? r2.options[n2] = t3[n2] : (function(t4, e3, r3) {
                if (!(r3 in t4)) return void (t4[r3] = e3[r3]);
                var n3 = Array.isArray(t4[r3]), o2 = "[object Object]" === Object.prototype.toString.call(t4[r3]);
                t4[r3] = n3 ? t4[r3].concat(e3[r3]) : o2 ? Object.assign(t4[r3], e3[r3]) : e3[r3];
              })(r2.options, t3, n2);
            });
          }, t2.prototype.reset = function() {
            this.options = JSON.parse(JSON.stringify(o)), this.options.tagListener = function(t3, e2) {
              return e2;
            };
          }, t2;
        })();
        var o = { ignoreTags: ["", "style", "head", "!doctype", "form", "svg", "noscript", "script", "meta"], skipTags: ["div", "html", "body", "nav", "section", "footer", "main", "aside", "article", "header"], emptyTags: [], aliasTags: { figure: "p", dl: "p", dd: "p", dt: "p", figcaption: "p" }, renderCustomTags: true }, i = new n();
        i.reset(), e.default = i;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h1");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "#", n2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.match + " " + t3;
          }, e2.prototype.exec = function(e3, r2) {
            return e3 || (e3 = "\n"), r2 || (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(1), o = r(2), i = (function() {
          function t2(t3, e2, r2) {
            var n2 = void 0 === r2 ? {} : r2, o2 = n2.parentTag, i2 = void 0 === o2 ? "" : o2, a = n2.leadingSpace, c = void 0 === a ? "" : a, u = n2.layer, s = void 0 === u ? 1 : u, p = n2.isFirstSubTag, l = void 0 !== p && p, f = n2.inTable, h = void 0 !== f && f, d = n2.match, _ = void 0 === d ? null : d, y = n2.prevTagName, v = void 0 === y ? "" : y, g = n2.nextTagName, b = void 0 === g ? "" : g;
            if (this.tagName = e2, this.rawStr = t3, this.parentTag = i2, this.isFirstSubTag = l, this.prevTagName = v, this.nextTagName = b, this.leadingSpace = c, this.layer = s, this.innerHTML = "", this.match = _, this.inTable = h, this.__detectStr__(t3, this.tagName)) {
              var m = this.__fetchTagAttr__(t3).attr;
              this.attrs = m;
            } else this.attrs = {};
          }
          return t2.prototype.__detectStr__ = function(t3, e2) {
            if ("<" !== t3[0]) return "Not a valid tag, current tag name: ".concat(this.tagName, ", tag content: ").concat(t3), false;
            for (var r2 = "", n2 = false, o2 = 1; o2 < t3.length && ">" !== t3[o2]; o2++) !n2 && /(\s|\/)/.test(t3[o2]) && (n2 = true), n2 || (r2 += t3[o2]);
            return r2 === e2;
          }, t2.prototype.__fetchTagAttr__ = function(t3) {
            for (var e2 = "", r2 = 1; r2 < t3.length && ">" !== t3[r2]; r2++) e2 += t3[r2];
            return { attr: (0, n.getTagAttributes)(e2) };
          }, t2.prototype.beforeParse = function() {
            var t3 = o.default.get().tagListener;
            if (t3) {
              var e2 = t3(this.tagName, { parentTag: this.parentTag, prevTagName: this.prevTagName, nextTagName: this.nextTagName, isFirstSubTag: this.isFirstSubTag, attrs: this.attrs, innerHTML: this.innerHTML, match: this.match, isSelfClosing: true }), r2 = e2.attrs, n2 = e2.match;
              this.attrs = r2, this.match = n2;
            }
            return "";
          }, t2.prototype.beforeMergeSpace = function(t3) {
            return t3;
          }, t2.prototype.afterMergeSpace = function(t3) {
            return t3;
          }, t2.prototype.beforeReturn = function(t3) {
            return t3;
          }, t2.prototype.exec = function(t3, e2) {
            void 0 === t3 && (t3 = ""), void 0 === e2 && (e2 = "");
            var r2 = this.beforeParse();
            return r2 = t3 + (r2 = this.beforeMergeSpace(r2)) + e2, r2 = this.afterMergeSpace(r2), r2 = this.beforeReturn(r2);
          }, t2;
        })();
        e.default = i;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = (function() {
          function t2() {
          }
          return t2.prototype.exec = function() {
            return "";
          }, t2;
        })();
        e.default = n;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.TRIPLE = e.DOUBLE = e.SINGLE = void 0;
        e.SINGLE = "☈";
        e.DOUBLE = "☈☈";
        e.TRIPLE = "☈☈☈";
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(13), o = { html: true, body: true, p: true, div: true, pre: true, section: true, blockquote: true, aside: true, li: true, ul: true, ol: true, form: true, hr: true, h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, dl: true, dd: true, dt: true, br: true, table: true };
        e.default = function(t2) {
          if (!t2) return false;
          var e2 = (0, n.default)(t2);
          return !!e2 && !!o[e2];
        };
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true }), e.__EmptySelfClose__ = e.__Empty__ = void 0;
        var i = r(0), a = r(4), c = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "__empty__"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.slim = function(t3) {
            return t3;
          }, e2.prototype.parseValidSubTag = function(r2, n2, i2) {
            if ("__skip__" === this.tagName) return t2.prototype.parseValidSubTag.call(this, r2, n2, i2);
            var a2 = new e2(r2, n2, o({}, i2));
            return [a2.exec(), a2];
          }, e2.prototype.parseOnlyString = function(e3, r2, n2) {
            return "__skip__" === this.tagName ? t2.prototype.parseOnlyString.call(this, e3, r2, n2) : [e3, null];
          }, e2.prototype.exec = function() {
            return t2.prototype.exec.call(this, "", "");
          }, e2;
        })(i.default);
        e.__Empty__ = c;
        var u = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "__emptyselfclose__");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.tagName = r2, n2;
          }
          return n(e2, t2), e2.prototype.exec = function() {
            return t2.prototype.exec.call(this, "", "");
          }, e2;
        })(a.default);
        e.__EmptySelfClose__ = u;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true }), e.__SkipSelfClose__ = e.__Skip__ = void 0;
        var o = r(0), i = r(4), a = r(1), c = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "__skip__");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.noNeedWrap = ["td", "th"], o2;
          }
          return n(e2, t2), e2.prototype.exec = function() {
            var e3 = (0, a.isIndependentTag)((0, a.getRealTagName)(this.tagName)) && (!this.parentTag || !this.noNeedWrap.includes(this.parentTag)), r2 = e3 ? "\n" : "", n2 = e3 ? "\n" : "";
            return t2.prototype.exec.call(this, r2, n2);
          }, e2;
        })(o.default);
        e.__Skip__ = c;
        var u = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "__skipselfclose__"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function() {
            return "";
          }, e2;
        })(i.default);
        e.__SkipSelfClose__ = u;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true }), e.__NoMatchSelfClose__ = e.__NoMatch__ = void 0;
        var o = r(0), i = r(4), a = (function(t2) {
          function e2(e3, r2) {
            return void 0 === r2 && (r2 = "__nomatch__"), t2.call(this, e3, r2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return "<".concat(this.tagName, ">").concat(t3, "</").concat(this.tagName, ">");
          }, e2.prototype.exec = function() {
            return t2.prototype.exec.call(this, "", "");
          }, e2;
        })(o.default);
        e.__NoMatch__ = a;
        var c = (function(t2) {
          function e2(e3, r2) {
            return void 0 === r2 && (r2 = "__nomatchselfclose__"), t2.call(this, e3, r2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function() {
            return "<".concat(this.tagName, " />");
          }, e2;
        })(i.default);
        e.__NoMatchSelfClose__ = c;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = { img: true, hr: true, input: true, br: true, meta: true, link: true, "!doctype": true, base: true, col: true, area: true, param: true, object: true, embed: true, keygen: true, source: true };
        e.default = function(t2) {
          return null != t2 && !!n[t2.toLowerCase()];
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(1), o = r(7), i = (function() {
          function t2(t3, e2, r2) {
            void 0 === e2 && (e2 = "__nomatch__");
            var n2 = void 0 === r2 ? {} : r2, o2 = n2.keepSpace, i2 = void 0 !== o2 && o2, a = n2.prevTagName, c = void 0 === a ? "" : a, u = n2.nextTagName, s = void 0 === u ? "" : u, p = n2.prevTagStr, l = void 0 === p ? "" : p, f = n2.prevHasEndSpace, h = void 0 !== f && f, d = n2.prevHasStartSpace, _ = void 0 !== d && d, y = n2.parentTag, v = void 0 === y ? "" : y, g = n2.calcLeading, b = void 0 !== g && g, m = n2.layer, O = void 0 === m ? 1 : m, S = n2.leadingSpace, T = void 0 === S ? "" : S, x = n2.inTable, j = void 0 !== x && x;
            this.tagName = e2, this.nextTagName = s, this.prevTagName = c, this.parentTag = v, this.prevTagStr = l, this.keepSpace = i2, this.calcLeading = b, this.leadingSpace = T, this.layer = O, this.rawStr = t3, this.inTable = j, this.prevHasEndSpace = h, this.prevHasStartSpace = _, this.hasEndSpace = false, this.hasStartSpace = false, t3.startsWith(" ") && (this.hasStartSpace = true), t3.endsWith(" ") && (this.hasEndSpace = true);
          }
          return t2.prototype.slim = function(t3) {
            if (this.keepSpace) return t3;
            var e2 = t3.replace(/\s+/g, " ");
            return (0, o.default)(this.prevTagName) && (e2 = e2.trimLeft()), (0, o.default)(this.nextTagName) && (e2 = e2.trimRight()), e2;
          }, t2.prototype.beforeReturn = function(t3) {
            if (this.keepSpace) return t3;
            if (this.calcLeading) return this.leadingSpace + (0, n.extraEscape)(t3);
            var e2 = (0, n.extraEscape)(t3);
            return this.inTable && (e2 = e2.replace(/\|/g, "\\|")), this.prevTagName, this.prevHasEndSpace, this.prevTagStr, (0, n.isSpacePassingTag)(this.prevTagName) && this.prevHasEndSpace && !/^\s+/.test(t3) && !/\s+$/.test(this.prevTagStr) ? " " + t3 : e2;
          }, t2.prototype.exec = function() {
            var t3 = this.rawStr;
            return t3 = this.slim(t3), t3 = this.beforeReturn(t3);
          }, t2;
        })();
        e.default = i;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(2);
        e.default = function(t2) {
          if (!t2) return t2;
          var e2 = n.default.get().aliasTags;
          return null != (null === e2 || void 0 === e2 ? void 0 : e2[t2]) ? e2[t2] : t2;
        };
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "strong");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.layer = 1, o2.match = o2.match || "**", o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.match + t3 + this.match;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), null != this.match && this.prevTagStr && !this.prevTagStr.endsWith("\\" + this.match[0]) && this.prevTagStr.endsWith(this.match[0]) && (e3 = " "), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "del");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = n2.match || "~~", n2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.match + t3 + this.match;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "em");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.match = o2.match || "*", o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.match + t3 + this.match;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), "strong" === this.parentTag && this.nextTagStr && (r2 = " "), null != this.match && this.prevTagStr && !this.prevTagStr.endsWith("\\" + this.match) && this.prevTagStr.endsWith(this.match) && (e3 = " "), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "th");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.tagName = r2, o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return t3 + "|";
          }, e2.prototype.parseValidSubTag = function(e3, r2, n2) {
            return "ul" === r2 || "ol" === r2 || "table" === r2 || "pre" === r2 ? [e3.replace(/([\n\r])/g, ""), null] : t2.prototype.parseValidSubTag.call(this, e3, r2, n2);
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.unescapeStr = e.extraEscape = e.escapeStr = void 0;
        var n = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&#x60;": "`", "&ldquo;": "“", "&rdquo;": "”" }, o = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#x60;", "“": "&ldquo;", "”": "&rdquo;" }, i = /[&<>"'`\u201c\u201d]/g, a = RegExp(i.source), c = /&(?:amp|lt|gt|quot|#39|apos|#x60|ldquo|rdquo);/g, u = RegExp(c.source), s = [[/\\/g, "\\\\"], [/\*/g, "\\*"], [/^-/g, "\\-"], [/^\+ /g, "\\+ "], [/^(=+)/g, "\\$1"], [/^(#{1,6}) /g, "\\$1 "], [/`/g, "\\`"], [/^~~~/g, "\\~~~"], [/\[/g, "\\["], [/\]/g, "\\]"], [/^>/g, "\\>"], [/_/g, "\\_"], [/^(\d+)\. /g, "$1\\. "]];
        e.escapeStr = function(t2) {
          return t2 && a.test(t2) ? t2.replace(i, function(t3) {
            return o[t3];
          }) : t2;
        }, e.unescapeStr = function(t2) {
          return t2 = t2 && u.test(t2) ? t2.replace(c, function(t3) {
            return n[t3];
          }) : t2;
        }, e.extraEscape = function(t2) {
          return s.reduce(function(t3, e2) {
            return t3.replace(e2[0], e2[1]);
          }, t2);
        };
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "a"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            var e3 = this.attrs, r2 = e3.href, n2 = e3.title, o2 = r2 || "";
            return n2 ? "[".concat(t3, "](").concat(o2, ' "').concat(n2, '")') : "[".concat(t3, "](").concat(o2, ")");
          }, e2.prototype.parseOnlyString = function(e3, r2, n2) {
            return "tbody" === this.parentTag || "thead" === this.parentTag ? [e3, null] : t2.prototype.parseOnlyString.call(this, e3, r2, n2);
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "b"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(14).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(7), a = r(0), c = r(1), u = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "blockquote");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.match = o2.match || ">", o2.fillPerLine = o2.fillPerLine.bind(o2), o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            if ("" === t3.trim()) return "";
            var e3 = this.match + " " + t3;
            return this.calcLeading ? this.leadingSpace + e3 : e3;
          }, e2.prototype.afterMergeSpace = function(t3) {
            for (var e3 = this, r2 = t3.split("\n"), n2 = r2.length - 1; n2 >= 0; n2--) n2 < r2.length - 1 && ">" === r2[n2].trim() && ">" === r2[n2 + 1].trim() && r2.splice(n2, 1);
            return (r2 = r2.map(function(t4) {
              return "" === t4 ? "" : e3.fillPerLine(t4);
            })).join("\n");
          }, e2.prototype.beforeReturn = function(t3) {
            return t3.replace("\n\n", "\n");
          }, e2.prototype.fillPerLine = function(t3) {
            var e3 = ">";
            if (this.calcLeading && (e3 = this.leadingSpace + ">"), !t3.startsWith(e3)) {
              var r2 = this.match + " " + t3;
              return this.calcLeading ? this.leadingSpace + r2 : r2;
            }
            return t3;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2;
            "blockquote" === e3 ? n2 = new ((0, c.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { calcLeading: this.calcLeading, match: this.match + ">", noExtraLine: true })) : n2 = new ((0, c.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { noExtraLine: true }));
            var a2 = n2.exec(), u2 = "";
            this.calcLeading && (u2 = this.leadingSpace);
            var s = (0, i.default)(r2.prevTagName) && "br" !== r2.prevTagName, p = (0, i.default)(r2.nextTagName) && "br" !== r2.nextTagName, l = (0, i.default)(e3) && "br" !== e3;
            return this.isFirstSubTag ? [a2.trimLeft().replace(u2, ""), n2] : l ? (a2 = u2 + this.match + a2, s || (a2 = "\n" + a2), !p && r2.nextTagStr && r2.nextTagStr.trim() && (a2 += this.match + "\n"), [a2, n2]) : s ? [u2 + this.match + "\n" + a2, n2] : [a2, n2];
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(a.default);
        e.default = u;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = r(4), i = r(18), a = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "b"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(t3, e3) {
            return void 0 === e3 && (e3 = "\n"), this.inTable ? (0, i.escapeStr)("<br />") : "  " + e3;
          }, e2;
        })(o.default);
        e.default = a;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(1), c = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "code");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.match = null == o2.match ? "`" : o2.match, o2.noWrap = "`" === o2.match, o2.layer = 1, o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            var e3, r2;
            return "" !== this.match && "`" !== this.match ? (e3 = this.match + " ", r2 = " " + this.match) : (e3 = this.match, r2 = this.match), e3 + t3 + r2;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2;
            return "pre" === e3 ? [(n2 = new ((0, a.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { language: "", match: "" }))).exec("", "\n"), n2] : [(n2 = new ((0, a.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { keepSpace: this.keepSpace, noWrap: this.noWrap }))).exec("", ""), n2];
          }, e2.prototype.parseOnlyString = function(t3) {
            if ("" !== this.match && t3) {
              var e3 = 1;
              (t3.startsWith("`") || t3.endsWith("`")) && (e3 = 2, (t3.startsWith("``") || t3.endsWith("``")) && (e3 = 3)), this.match = "`".repeat(e3);
            }
            return [(0, a.unescapeStr)(t3), null];
          }, e2.prototype.slim = function(t3) {
            return this.keepSpace ? t3 : t3.trim();
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = c;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h1");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "#", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h2");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "##", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h3");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "###", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h4");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "####", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h5");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "#####", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            void 0 === r2 && (r2 = "h6");
            var n2 = t2.call(this, e3, r2) || this;
            return n2.match = "######", n2;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(3).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "hr");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.match = "---", o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function() {
            return this.leadingSpace + this.match;
          }, e2.prototype.beforeReturn = function(t3) {
            return t3.replace(/^(?:\n\s*)/, "\n\n").replace(/(?:\n\s*)$/, "\n\n"), t3;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(4).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "i"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(16).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "img"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function() {
            var t3 = this.attrs, e3 = t3.src, r2 = t3.alt;
            return r2 || (r2 = ""), e3 || (e3 = ""), "![".concat(r2, "](").concat(e3, ")");
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(4).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "input"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function() {
            var t3 = this.attrs, e3 = t3.type, r2 = t3.checked;
            return "li" === this.parentTag && "checkbox" === e3 ? null != r2 ? "[x] " : "[ ] " : "";
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(4).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(1), c = r(7), u = r(6), s = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "li");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.match = o2.match || "*", o2.extraGap = "", o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.extraGap + this.leadingSpace + this.match + " " + t3;
          }, e2.prototype.__calcNextLeading__ = function() {
            var t3, e3, r2;
            return 1 === (null === (t3 = this.match) || void 0 === t3 ? void 0 : t3.length) ? u.DOUBLE : 2 === (null === (e3 = this.match) || void 0 === e3 ? void 0 : e3.length) ? u.TRIPLE : 3 === (null === (r2 = this.match) || void 0 === r2 ? void 0 : r2.length) ? u.DOUBLE : u.TRIPLE + u.DOUBLE;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2 = (0, a.getTagConstructor)(e3), i2 = this.__calcNextLeading__(), c2 = new n2(t3, e3, o(o({}, r2), { calcLeading: true, leadingSpace: this.leadingSpace + i2, layer: this.layer + 1 })), u2 = c2.exec();
            return "p" === e3 && (this.extraGap = "\n"), this.isFirstSubTag ? [u2.trimLeft().replace(this.leadingSpace + i2, ""), c2] : [u2, c2];
          }, e2.prototype.parseOnlyString = function(e3, r2, n2) {
            var i2 = false;
            (0, c.default)(n2.prevTagName) && (i2 = true);
            var a2 = this.__calcNextLeading__(), u2 = t2.prototype.parseOnlyString.call(this, e3, r2, o(o({}, n2), { calcLeading: i2, leadingSpace: this.leadingSpace + a2, layer: this.layer + 1 })), s2 = u2[0], p = u2[1];
            return this.isFirstSubTag ? [s2.replace(this.leadingSpace + a2, ""), p] : [s2, p];
          }, e2.prototype.beforeReturn = function(e3) {
            return t2.prototype.beforeReturn.call(this, e3);
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = s;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(5), c = r(1), u = r(2), s = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "ol");
            var o2, i2 = this;
            i2 = t2.call(this, e3, r2, n2) || this;
            var a2 = parseInt(null === (o2 = null === i2 || void 0 === i2 ? void 0 : i2.attrs) || void 0 === o2 ? void 0 : o2.start, 10);
            return i2.count = isNaN(a2) ? 1 : a2, i2;
          }
          return n(e2, t2), e2.prototype.__isValidSubTag__ = function(t3) {
            if (!t3) return false;
            var e3 = u.default.get().aliasTags, r2 = (0, c.getTagConstructor)(t3);
            return "li" === t3 || "li" == (null === e3 || void 0 === e3 ? void 0 : e3[t3]) || r2 === a.default;
          }, e2.prototype.getValidSubTagName = function(t3) {
            return t3 && this.__isValidSubTag__(t3) ? t3 : null;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2 = (0, c.getTagConstructor)(e3);
            if (this.__isValidSubTag__(e3)) {
              var i2 = this.count + ".", a2 = new n2(t3, e3, o(o({}, r2), { calcLeading: true, leadingSpace: this.leadingSpace, layer: this.layer, match: i2 }));
              return this.count++, [a2.exec("", "\n"), a2];
            }
            return ["", null];
          }, e2.prototype.parseOnlyString = function() {
            return ["", null];
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = s;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "p"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.calcLeading ? this.leadingSpace + t3 : t3;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), this.prevTagName || !this.prevTagStr || this.prevTagStr.endsWith("\n") || (e3 = "\n\n"), this.nextTagName || !this.nextTagStr || this.nextTagStr.startsWith("\n") || (r2 = "\n\n"), this.inTable && (e3 = "", r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(8), c = r(1), u = r(6), s = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "pre");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.indentSpace = u.DOUBLE + u.DOUBLE, o2.isIndent = o2.innerHTML.includes("```"), o2.match = o2.isIndent ? "" : "```", o2.language = o2.language || (0, c.getLanguage)(e3), o2.keepSpace = true, o2;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            var e3 = this.isIndent || "code" === this.parentTag ? "" : this.match + this.language + "\n", r2 = "";
            return t3.endsWith("\n") || (r2 = "\n"), e3 + t3 + (this.isIndent || "code" === this.parentTag ? "" : r2 + this.match);
          }, e2.prototype.fillPerLine = function(t3) {
            var e3 = "";
            return this.calcLeading && (e3 = this.leadingSpace), this.isIndent ? e3 + this.indentSpace + t3 : e3 + t3;
          }, e2.prototype.afterMergeSpace = function(t3) {
            var e3 = this, r2 = t3.split("\n");
            return (r2 = r2.map(function(t4) {
              return "" === t4 ? "" : e3.fillPerLine(t4);
            })).join("\n");
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            if ("code" === e3) {
              var n2 = new ((0, c.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { match: "", language: this.language, keepSpace: true }));
              return [n2.exec("", ""), n2];
            }
            var i2 = void 0;
            return [(i2 = (0, c.isSelfClosing)(e3) ? new a.__EmptySelfClose__(t3, e3) : new a.__Empty__(t3, e3, o(o({}, r2), { keepSpace: true }))).exec(), i2];
          }, e2.prototype.parseOnlyString = function(t3) {
            return [t3, null];
          }, e2.prototype.slim = function(t3) {
            return t3;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = s;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2) {
            return void 0 === r2 && (r2 = "s"), t2.call(this, e3, r2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(15).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "span"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(1);
        var c = (function(t2) {
          function e2(e3, r2, n2) {
            void 0 === r2 && (r2 = "table");
            var o2 = t2.call(this, e3, r2, n2) || this;
            return o2.exist_thead = false, o2.exist_tbody = false, o2.empty_tbody = true, o2.tableColumnCount = (function(t3) {
              for (var e4 = "", r3 = 0; r3 < t3.length && !e4.endsWith("</tr>"); r3++) e4 += t3[r3];
              return Math.max(e4.split("</td>").length - 1, e4.split("</th>").length - 1);
            })(o2.innerHTML), o2;
          }
          return n(e2, t2), e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            "thead" === e3 && (this.exist_thead = true), "tbody" === e3 && (this.exist_tbody = true, this.empty_tbody = false), "tr" === e3 && (this.empty_tbody = false);
            var n2 = new ((0, a.getTagConstructor)(e3))(t3, e3, o(o({}, r2), { tableColumnCount: this.tableColumnCount, inTable: true }));
            return [n2.exec("", "\n"), n2];
          }, e2.prototype.parseOnlyString = function() {
            return ["", null];
          }, e2.prototype.beforeReturn = function(t3) {
            if (!this.exist_thead && !this.exist_tbody && this.empty_tbody) return "";
            if (0 === this.tableColumnCount) return "";
            if (!this.exist_tbody) {
              for (var e3 = (0, a.getTableAlign)(this.innerHTML, this.tableColumnCount), r2 = this.leadingSpace + "|", n2 = 0; n2 < e3.length; n2++) r2 += e3[n2];
              t3 = this.empty_tbody ? t3 + r2 + "\n" : r2 + "" + t3;
            }
            return this.exist_thead || (t3 = "\n" + this.leadingSpace + "|".repeat(this.tableColumnCount + 1) + (t3.startsWith("\n") ? "" : "\n") + t3), t3;
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = c;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = r(0), i = r(1), a = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "tbody"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            for (var e3 = (0, i.getTableAlign)(this.innerHTML, this.tableColumnCount), r2 = this.leadingSpace + "|", n2 = 0; n2 < e3.length; n2++) r2 += e3[n2];
            return r2 + "\n" + t3;
          }, e2.prototype.parseOnlyString = function() {
            return ["", null];
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(o.default);
        e.default = a;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "td"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.parseValidSubTag = function(e3, r2, n2) {
            return "ul" === r2 || "ol" === r2 || "table" === r2 || "pre" === r2 ? [e3.replace(/([\n\r])/g, ""), null] : t2.prototype.parseValidSubTag.call(this, e3, r2, n2);
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(17).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "thead"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = ""), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(r(0).default);
        e.default = o;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })();
        Object.defineProperty(e, "__esModule", { value: true });
        var o = r(0), i = r(5), a = r(1), c = r(2), u = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "tr"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.beforeMergeSpace = function(t3) {
            return this.leadingSpace + "|" + t3;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2 = c.default.get().aliasTags, o2 = (0, a.getTagConstructor)(e3);
            if ("td" !== e3 && "th" !== e3 && "td" !== (null === n2 || void 0 === n2 ? void 0 : n2[e3]) && "th" !== (null === n2 || void 0 === n2 ? void 0 : n2[e3]) && o2 !== i.default) return "Should not have tags except <td> or <th> inside <tr>, current tag is ".concat(e3, " have been ignore."), ["", null];
            var u2 = new o2(t3, e3, r2);
            return [u2.exec("", ""), u2];
          }, e2.prototype.parseOnlyString = function() {
            return ["", null];
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = ""), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(o.default);
        e.default = u;
      }, function(t, e, r) {
        "use strict";
        var n = this && this.__extends || /* @__PURE__ */ (function() {
          var t2 = function(e2, r2) {
            return (t2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t3, e3) {
              t3.__proto__ = e3;
            } || function(t3, e3) {
              for (var r3 in e3) Object.prototype.hasOwnProperty.call(e3, r3) && (t3[r3] = e3[r3]);
            })(e2, r2);
          };
          return function(e2, r2) {
            if ("function" !== typeof r2 && null !== r2) throw new TypeError("Class extends value " + String(r2) + " is not a constructor or null");
            function n2() {
              this.constructor = e2;
            }
            t2(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (n2.prototype = r2.prototype, new n2());
          };
        })(), o = this && this.__assign || function() {
          return (o = Object.assign || function(t2) {
            for (var e2, r2 = 1, n2 = arguments.length; r2 < n2; r2++) for (var o2 in e2 = arguments[r2]) Object.prototype.hasOwnProperty.call(e2, o2) && (t2[o2] = e2[o2]);
            return t2;
          }).apply(this, arguments);
        };
        Object.defineProperty(e, "__esModule", { value: true });
        var i = r(0), a = r(5), c = r(1), u = r(2).default.get().aliasTags, s = (function(t2) {
          function e2(e3, r2, n2) {
            return void 0 === r2 && (r2 = "ul"), t2.call(this, e3, r2, n2) || this;
          }
          return n(e2, t2), e2.prototype.__isValidSubTag__ = function(t3) {
            if (!t3) return false;
            var e3 = (0, c.getTagConstructor)(t3);
            return "li" === t3 || "li" == (null === u || void 0 === u ? void 0 : u[t3]) || e3 === a.default;
          }, e2.prototype.getValidSubTagName = function(t3) {
            return t3 && this.__isValidSubTag__(t3) ? t3 : null;
          }, e2.prototype.parseValidSubTag = function(t3, e3, r2) {
            var n2 = (0, c.getTagConstructor)(e3);
            if (this.__isValidSubTag__(e3)) {
              var i2 = new n2(t3, e3, o(o({}, r2), { calcLeading: true, leadingSpace: this.leadingSpace, layer: this.layer, match: "*" }));
              return [i2.exec("", "\n"), i2];
            }
            return ["", null];
          }, e2.prototype.parseOnlyString = function() {
            return ["", null];
          }, e2.prototype.exec = function(e3, r2) {
            return void 0 === e3 && (e3 = "\n"), void 0 === r2 && (r2 = "\n"), t2.prototype.exec.call(this, e3, r2);
          }, e2;
        })(i.default);
        e.default = s;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(1), o = r(2), i = r(6);
        e.default = function(t2, e2, r2) {
          void 0 === r2 && (r2 = false), o.default.reset(), o.default.set(e2, r2), t2 = (t2 = (t2 = (0, n.clearComment)(t2)).trim()).replace(/(\r\n)/g, "").replace(/&nbsp;/g, " "), t2 = "<".concat(i.DOUBLE, "skip").concat(i.DOUBLE, ">").concat(t2, "</").concat(i.DOUBLE, "skip").concat(i.DOUBLE, ">");
          var a = "", c = "".concat(i.DOUBLE, "skip").concat(i.DOUBLE), u = t2;
          return a += new ((0, n.getTagConstructor)(c))(u, c, { parentTag: null, prevTagName: null, prevTagStr: a }).exec(), (function(t3) {
            return t3 = (t3 = (t3 = t3.replace(/^\s+/, "")).replace(/\s+$/, "")).replace(/\u2608/g, " ");
          })((0, n.unescapeStr)(a));
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(11);
        function o(t2, e2) {
          for (var r2 = ""; e2 < t2.length && /[a-zA-Z0-9!\-_]/.test(t2[e2]); ) r2 += t2[e2++];
          return r2.toLowerCase();
        }
        e.default = function(t2) {
          var e2 = 0;
          return function() {
            var r2 = "", i = null, a = 0, c = null, u = false;
            if (e2 >= t2.length) return [i, r2];
            for (var s = e2; s < t2.length; s++) {
              if ("<" === t2[s] && "/" !== t2[s + 1]) {
                if ("" !== r2 && null == i && !u) return e2 = s, [i, r2];
                var p = o(t2, s + 1);
                null == i && (i = p), i === p && a++, (0, n.default)(i) && (0 === --a && (u = true), a < 0 && "Tag ".concat(i, " is abnormal"));
              } else if ("<" === t2[s] && "/" === t2[s + 1]) {
                if (null == i) {
                  "Tag is not integrity, current tagStr is ".concat(t2.slice(e2));
                  for (var l = s; l < t2.length && ">" !== t2[l]; ) l++;
                  s = l;
                  continue;
                }
                i === (c = o(t2, s + 2)) && a--, a <= 0 && (u = true);
              }
              if (r2 += t2[s], ">" === t2[s] && u) return e2 = s + 1, [i, r2];
              s === t2.length - 1 && i !== c && (null != c && null != i && (r2 = r2.replace("<".concat(i, ">"), "").replace("</".concat(c, ">"), "")), i = null);
            }
            return e2 = t2.length, [i, r2];
          };
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(2), o = r(6), i = r(11), a = r(49);
        e.default = function t2(e2) {
          var c, u = n.default.get(), s = u.skipTags, p = u.emptyTags, l = u.ignoreTags, f = u.aliasTags, h = u.renderCustomTags, d = (0, i.default)(e2);
          if ((null === s || void 0 === s ? void 0 : s.includes(e2)) || e2 === "".concat(o.DOUBLE, "skip").concat(o.DOUBLE)) {
            var _ = r(9);
            return d ? _.__SkipSelfClose__ : _.__Skip__;
          }
          if (null === p || void 0 === p ? void 0 : p.includes(e2)) {
            var y = r(8);
            return d ? y.__EmptySelfClose__ : y.__Empty__;
          }
          if (null === l || void 0 === l ? void 0 : l.includes(e2)) return r(5).default;
          if (null != (null === f || void 0 === f ? void 0 : f[e2])) return t2(f[e2]);
          var v = e2.toLowerCase();
          if (true !== h && !(0, a.default)(v)) {
            if (false === h || "SKIP" === h) return _ = r(9), d ? _.__SkipSelfClose__ : _.__Skip__;
            if ("EMPTY" === h) return y = r(8), d ? y.__EmptySelfClose__ : y.__Empty__;
            if ("IGNORE" === h) return r(5).default;
          }
          try {
            c = r(50)("./".concat(e2)).default;
          } catch (g) {
            c = d ? r(10).__NoMatchSelfClose__ : r(10).__NoMatch__;
          }
          return c;
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = ["!doctype", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "circle", "cite", "clipPath", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "defs", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "ellipse", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "foreignObject", "form", "frame", "frameset", "g", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "line", "linearGradient", "link", "listing", "main", "map", "mark", "marquee", "mask", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "path", "pattern", "picture", "plaintext", "polygon", "polyline", "pre", "progress", "q", "radialGradient", "rb", "rbc", "rect", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "stop", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "text", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tspan", "tt", "u", "ul", "var", "video", "wbr", "xmp"];
        e.default = function(t2) {
          return "string" === typeof t2 && n.includes(t2.toLowerCase());
        };
      }, function(t, e, r) {
        var n = { "./__Heading__": 3, "./__Heading__.ts": 3, "./__empty__": 8, "./__empty__.ts": 8, "./__ignore__": 5, "./__ignore__.ts": 5, "./__nomatch__": 10, "./__nomatch__.ts": 10, "./__rawString__": 12, "./__rawString__.ts": 12, "./__skip__": 9, "./__skip__.ts": 9, "./a": 19, "./a.ts": 19, "./b": 20, "./b.ts": 20, "./blockquote": 21, "./blockquote.ts": 21, "./br": 22, "./br.ts": 22, "./code": 23, "./code.ts": 23, "./del": 15, "./del.ts": 15, "./em": 16, "./em.ts": 16, "./h1": 24, "./h1.ts": 24, "./h2": 25, "./h2.ts": 25, "./h3": 26, "./h3.ts": 26, "./h4": 27, "./h4.ts": 27, "./h5": 28, "./h5.ts": 28, "./h6": 29, "./h6.ts": 29, "./hr": 30, "./hr.ts": 30, "./i": 31, "./i.ts": 31, "./img": 32, "./img.ts": 32, "./input": 33, "./input.ts": 33, "./li": 34, "./li.ts": 34, "./ol": 35, "./ol.ts": 35, "./p": 36, "./p.ts": 36, "./pre": 37, "./pre.ts": 37, "./s": 38, "./s.ts": 38, "./span": 39, "./span.ts": 39, "./strong": 14, "./strong.ts": 14, "./table": 40, "./table.ts": 40, "./tbody": 41, "./tbody.ts": 41, "./td": 42, "./td.ts": 42, "./th": 17, "./th.ts": 17, "./thead": 43, "./thead.ts": 43, "./tr": 44, "./tr.ts": 44, "./ul": 45, "./ul.ts": 45 };
        function o(t2) {
          var e2 = i(t2);
          return r(e2);
        }
        function i(t2) {
          if (!r.o(n, t2)) {
            var e2 = new Error("Cannot find module '" + t2 + "'");
            throw e2.code = "MODULE_NOT_FOUND", e2;
          }
          return n[t2];
        }
        o.keys = function() {
          return Object.keys(n);
        }, o.resolve = i, t.exports = o, o.id = 50;
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.default = function(t2) {
          for (var e2 = {}, r2 = false, n = "", o = "", i = null, a = 0; a <= t2.length; a++) {
            if (a === t2.length || /\s/.test(t2[a])) {
              if (a === t2.length || !r2) {
                var c = n.trim();
                "/" === c[c.length - 1] && (c = c.slice(0, c.length - 1)), c && (e2[c] = o.trim()), n = "", o = "";
              }
            } else {
              if (/['"]/.test(t2[a]) && (!i || t2[a] === i)) {
                (r2 = !r2) && (i = t2[a]);
                continue;
              }
              if ("=" === t2[a] && !r2) continue;
            }
            if (a === t2.length) break;
            r2 ? o += t2[a] : n += t2[a];
          }
          return e2;
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = "javascript";
        e.default = function(t2) {
          var e2 = t2.match(/<.*?class=".*?language-([^\s"]*)?.*".*>/);
          return e2 ? e2[1] || "" : t2.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title|bullet).*?<\/span>/) ? n : "";
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.default = function(t2) {
          return t2.replace(/<!--(?:[\s\S]*?)-->/g, "");
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true });
        var n = r(13), o = { b: true, a: true, del: true, em: true, i: true, s: true, span: true, strong: true };
        e.default = function(t2) {
          if (null === t2) return true;
          if (!t2) return false;
          var e2 = (0, n.default)(t2);
          return !!e2 && !!o[e2];
        };
      }, function(t, e, r) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: true }), e.default = function(t2, e2) {
          var r2 = { _default_: "---|", center: ":---:|", left: ":---|", right: "---:|", start: ":---|", end: "---:|" }, n = Array(e2).fill(r2._default_), o = t2.match(/<(td|th)(.*?)>/g);
          return o ? n = (n = o.slice(0, e2)).map(function(t3) {
            var e3 = t3.match(/align\s*=\s*['"]\s*(center|left|right|start|end)/), n2 = t3.match(/text-align\s*:\s*(center|left|right|start|end)/);
            return e3 || n2 ? e3 && !n2 ? r2[e3[1]] || r2._default_ : n2 ? r2[n2[1]] || r2._default_ : void 0 : r2._default_;
          }) : n;
        };
      }]).default;
    });
  }
});
export default require_dist();
//# sourceMappingURL=html-to-md.js.map
