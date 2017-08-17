(function (window) {
    var sl = function (selecommand, obj) {
        return new sl.fn.init(selecommand, obj);
    },
    quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, //检查查询格式正则
    toString = Object.prototype.toString,
    push = Array.prototype.push,
    //把传过来的查询字符拆分
    chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
    sl.fn = sl.prototype = {
        init: function (selecommand, obj) {
            selecommand = selecommand || document;
            if (selecommand.nodeType) {
                this[0] = selecommand;
                this.length = 1;
                return this;
            }
            if (typeof selecommand == "string") {
                var match = quickExpr.exec(selecommand);
                if (match && (match[1] || !obj)) {
                    if (match[1]) {//创建原数
                        alert(match[1]);
                    } else {//此处为传进的是ID的值
                        var elem = document.getElementById(match[2]);
                        if (elem) {
                            return sl(elem);
                        }
                        selecommand = [];
                    }
                }
                else if (!obj && /^\w+$/.test(selecommand)) {
                    selecommand = document.getElementsByTagName(selecommand);
                }
                else if (!obj || obj.slVersion) {
                    return (obj || rootsl).find(selecommand);
                } else {
                    return sl(obj).find(selecommand);
                }
            }
            return this.setArray(sl.makeArray(selecommand));
        },
        length: 0,
        setArray: function (array) {
            this.length = array.length;
            Array.prototype.push.apply(this, array);
            return this;
        },
        slVersion: "0.1",
        push: push,
        splice: [].splice
    };
    sl.extend = sl.fn.extend = function () {
        var arg = arguments[0] || {}, i = 1, length = arguments.length, option;
        if (i === length) {
            arg = this;
            i--;
        }
        for (; i < length; i++) {
            if ((option = arguments[i]) != null) {
                for (var t in option) {
                    var src = arg[t];
                    var copy = option[t];
                    if (src === copy)
                        continue;
                    if (copy !== undefined)
                        arg[t] = copy;
                }
            }
        }
        return arg;
    }
    sl.extend({
        makeArray: function (array) {
            var ret = [];
            if (array != null) {
                var i = array.length;
                if (i == null || array.split || array.setInterval || array.call)
                    ret[0] = array;
                else
                    while (i)
                        ret[--i] = array[i];
                return ret;
            }
        },
        LoadXml: function (path) {
            var b;
            if (window.ActiveXObject) {
                b = new ActiveXObject('Microsoft.XMLDOM');
                b.async = false;
                b.load(path);
                b.setProperty("SelectionLanguage", "XPath");
                return b.documentElement
            } if (document.implementation && document.implementation.createDocument) {
                b = document.implementation.createDocument('', '', null);
                b.async = false;
                b.load(path);
                return b.firstChild
            } alert('您的浏览器不支持XML操作，请更新您的浏览器！\n建议使用IE5.5以上的版本。');
            return null;
        },
        addEventst: function (o, type, fn) {
            o.attachEvent ? o.attachEvent('on' + type, function () { fn.call(o) }) : o.addEventListener(type, fn, false);
            return sl.addEventst;
        },
        QueryString: function () {
            var path = window.location.search, pattern = /[?&]([^=]+)=([^&]+)(?=&|$)/g, hash = {};
            while (pattern.test(path)) hash[RegExp.$1] = RegExp.$2;
            //alert(hash);
            return hash;
        } ()
    });
    sl.fn.extend({
        find: function (selecommand) {
            var ret = sl(null), length = 0;
            for (var i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                sl.find(selecommand, this[i], ret);
            }
            if (ret.length > 0 && ret.get(0).nodeType === 9)
                ret.splice(0, 1);
            return ret;
        },
        get: function (num) {
            if (num == null)
                return this.toArray();
            if (num > this.length) {
                alert("超过大小");
                return this.toArray();
            }
            return this[num];
            //return num ==null ? this.toArray
        },
        attr: function (name, value) {
            var length = this.length;
            if (value !== undefined) {
                for (var i = 0; i < length; i++) {
                    if (this[i]) {
                        this[i].setAttribute ? this[i].setAttribute(name, value) : undefined;
                    }
                }
                return this;
            }
            return length ? this[0].getAttribute(name) : undefined;
        },
        execCustomizeMethods: function (fn) {
            for (var i = 0; i < this.length; i++) {
                this[i].ids = i;
                fn.call(this[i], this);
            }
        },
        addEventst: function (type, fn) {
            for (var i = 0; i < this.length; i++) {
                this[i].index = i;
                var o = this[i];
                sl.addEventst(o, type, fn);
            }
            return this;
        }
    });
    var Sizzle = function (selector, context, results) {
        results = results || [];
        var origContext = context = context || document;
        if (context.nodeType !== 1 && context.nodeType !== 9) {
            return [];
        }
        if (!selector || typeof selector !== "string") {
            return results;
        }
        var parts = [], m, set, checkSet, extra, prune = true, soFar = selector;
        while ((chunker.exec(""), m = chunker.exec(soFar)) !== null) {
            soFar = m[3];
            parts.push(m[1]);
            if (m[2]) {
                extra = m[3];
                break;
            }
        }
        if (parts.length > 1 && context.nodeType === 9 && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
            var ret = Sizzle.find(parts.shift(), context);
            context = ret.set[0];
        }
        if (context) {
            var ret = Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context);
            set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
            if (parts.length > 0)
                checkSet = sl.makeArray(set);
            while (parts.length) {
                var cur = parts.pop(), pop = cur;
                if (!Expr.relative[cur]) {
                    cur = "";
                } else {
                    pop = parts.pop();
                }
                if (pop == null) {
                    pop = context;
                }
                Expr.relative[cur](checkSet, pop);
            }
        } else {
            checkSet = parts = [];
        }

        if (!checkSet) {
            checkSet = set;
        }
        if (toString.call(checkSet) === "[object Array]") {
            if (context && context.nodeType === 1) {
                for (var i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1)) {
                        results.push(set[i]);
                    }
                }
            } else {
                for (var i = 0; checkSet[i] != null; i++) {
                    if (checkSet[i] && checkSet[i].nodeType === 1) {
                        results.push(set[i]);
                    }
                }
            }
        } else {
            sl.makeArray(checkSet, results);
        }
        return results;
    };
    Sizzle.find = function (expr, context) {
        var set, match;
        if (!expr) {
            return [];
        }
        for (var i = 0, l = Expr.order.length; i < l; i++) {
            var type = Expr.order[i], match;
            if ((match = Expr.leftMatch[type].exec(expr))) {
                var left = match[1];
                match.splice(1, 1);
                if (left.substr(left.length - 1) !== "\\") {
                    match[1] = (match[1] || "").replace(/\\/g, "");
                    set = Expr.find[type](match, context);
                    if (set != null) {
                        expr = expr.replace(Expr.match[type], "");
                        break;
                    }
                }
            }
        }
        if (!set) {
            set = context.getElementsByTagName("*");
        }
        return { set: set, expr: expr };
    };
    sl.find = Sizzle;
    sl.fn.init.prototype = sl.fn;
    rootsl = sl(document);
    window.sl = window.$ = sl;
    var Expr = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        relative: {
            "+": function (checkSet, part) {
                var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

                if (isTag) {
                    part = part.toLowerCase();
                }

                for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                    if ((elem = checkSet[i])) {
                        while ((elem = elem.previousSibling) && elem.nodeType !== 1) { }

                        checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
                    }
                }

                if (isPartStrNotTag) {
                    Sizzle.filter(part, checkSet, true);
                }
            },
            ">": function (checkSet, part) {
                var isPartStr = typeof part === "string";

                if (isPartStr && !/\W/.test(part)) {
                    part = part.toLowerCase();

                    for (var i = 0, l = checkSet.length; i < l; i++) {
                        var elem = checkSet[i];
                        if (elem) {
                            var parent = elem.parentNode;
                            checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                        }
                    }
                } else {
                    for (var i = 0, l = checkSet.length; i < l; i++) {
                        var elem = checkSet[i];
                        if (elem) {
                            checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
                        }
                    }

                    if (isPartStr) {
                        Sizzle.filter(part, checkSet, true);
                    }
                }
            }
        },
        find: {
            ID: function (match, context) {
                if (typeof context.getElementById !== "undefined") {
                    var m = context.getElementById(match[1]);
                    return m ? [m] : [];
                }
            },
            NAME: function (match, context) {
                if (typeof context.getElementsByName !== "undefined") {
                    var ret = [], results = context.getElementsByName(match[1]);

                    for (var i = 0, l = results.length; i < l; i++) {
                        if (results[i].getAttribute("name") === match[1]) {
                            ret.push(results[i]);
                        }
                    }

                    return ret.length === 0 ? null : ret;
                }
            },
            TAG: function (match, context) {
                return context.getElementsByTagName(match[1]);
            }
        },
        filter: {
            CLASS: function (elem, match) {
                return (" " + (elem.className || elem.getAttribute("class")) + " ")
				    .indexOf(match) > -1;
            }
        },
        preFilter: {
            CLASS: function (match, curLoop, inplace, result, not, isXML) {
                match = " " + match[1].replace(/\\/g, "") + " ";

                if (isXML) {
                    return match;
                }

                for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
                    if (elem) {
                        if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) {
                            if (!inplace) {
                                result.push(elem);
                            }
                        } else if (inplace) {
                            curLoop[i] = false;
                        }
                    }
                }

                return false;
            }
        }
    };
    Sizzle.filter = function (expr, set, inplace, not) {
        var old = expr, result = [], curLoop = set, match, anyFound;
        while (expr && set.length) {
            for (var type in Expr.filter) {
                if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                    var filter = Expr.filter[type], found, item, left = match[1];
                    anyFound = false;
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) === "\\") {
                        continue;
                    }
                    if (curLoop === result) {
                        result = [];
                    }
                    if (Expr.preFilter[type]) {
                        match = Expr.preFilter[type](match, curLoop, inplace, result, not);
                        if (!match) {
                            anyFound = found = true;
                        } else if (match === true) {
                            continue;
                        }
                    }
                    if (match) {
                        for (var i = 0; (item = curLoop[i]) != null; i++) {
                            if (item) {
                                found = filter(item, match, i, curLoop);
                                var pass = not ^ !!found;
                                if (inplace && found != null) {
                                    if (pass) {
                                        anyFound = true;
                                    } else {
                                        curLoop[i] = false;
                                    }
                                } else if (pass) {
                                    result.push(item);
                                    anyFound = true;
                                }
                            }
                        }
                    }
                    if (found !== undefined) {
                        if (!inplace) {
                            curLoop = result;
                        }
                        expr = expr.replace(Expr.match[type], "");
                        if (!anyFound) {
                            return [];
                        }
                        break;
                    }
                }
            }
            // Improper expression
            if (expr === old) {
                if (anyFound == null) {
                    throw "Syntax error, unrecognized expression: " + expr;
                } else {
                    break;
                }
            }

            old = expr;
        }
        return curLoop;
    };
    for (var type in Expr.match) {
        Expr.match[type] = new RegExp(Expr.match[type].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, function (all, num) {
            return "\\" + (num - 0 + 1);
        }));
    }
})(window);