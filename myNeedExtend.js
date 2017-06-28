function MyNeedExtend() {
    var my = this;
    var jQuery = function () {

    };
    var arr = [];
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var trim = "".trim;
    var support = {};

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }

    jQuery.fn = jQuery.prototype = {};

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    var jquery_fun = {

        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () {
        },

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function (obj) {
            return typeof(obj) === "function";
        },

        isArray: Array.isArray,

        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function (obj) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return obj - parseFloat(obj) >= 0;
        },

        isPlainObject: function (obj) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            // Support: Firefox <20
            // The try/catch suppresses exceptions thrown when attempting to access
            // the "constructor" property of certain host objects, ie. |window.location|
            // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
            try {
                if (obj.constructor &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },

        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        type: function (obj) {
            if (obj == null) {
                return obj + "";
            }
            // Support: Android < 4.0, iOS < 6 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        globalEval: function (code) {
            var script,
                indirect = eval;

            code = jQuery.trim(code);

            if (code) {
                // If the code includes a valid, prologue position
                // strict mode pragma, execute code by injecting a
                // script tag into the document.
                if (code.indexOf("use strict") === 1) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild(script).parentNode.removeChild(script);
                } else {
                    // Otherwise, avoid the DOM node creation, insertion
                    // and removal by using an indirect global eval
                    indirect(code);
                }
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function (obj, callback, args) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);

            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);

                        if (value === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);

                        if (value === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        trim: function (text) {
            return text == null ? "" : trim.call(text);
        },

        // results is for internal usage only
        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ?
                            [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },

        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function (elems, callback, arg) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn, context) {
            var tmp, args, proxy;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: Date.now
    };
    jQuery.extend(jquery_fun);

    this.jquery = jQuery;

    //添加移动端的触摸事件
    this.AddTouchFun = function () {
        var that = this;
        //默认的配置选项
        that.settings = {
            tapDurationThreshold: 250,//触屏大于这个时间不当作tap
            scrollSupressionThreshold: 3,//触发touchmove的敏感度
            swipeDurationThreshold: 750,//大于这个时间不当作swipe
            horizontalDistanceThreshold: 30,//swipe的触发垂直方向move必须小于这个距离
            verticalDistanceThreshold: 75,//swipe的触发水平方向move必须大于这个距离
            tapHoldDurationThreshold: 750,//长按触发事件需要长按这个事件才可触发
            doubleTapInterval: 250//双击事件触发中间的间隔必须小于这个时间
        };

        that.init = function (dom, callback, fun) {
            //时间存储
            that.date = {};
            //所有的可以触发的事件数组
            that.arr = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'];
            //存储手指接触移动端的接触点的相关信息
            that.touch = {};

            //将传入的dom和回调函数存到对象当中
            that.dom = dom;
            that.callback = callback;

            var arr = fun.split(",");
            for (var i = 0; i < arr.length; i++) {
                //监听事件
                if (that.arr.indexOf(arr[i]) != -1) {
                    that[arr[i]]();
                }
            }

        };

        that.tap = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.tap.end = e.changedTouches;
                that.tap.endTime = Number(new Date());
                if (
                    (that.tap.endTime - that.tap.startTime <= that.settings.tapDurationThreshold) &&
                    (that.tap.start.length === 1) &&
                    (that.tap.end.length === 1) &&
                    (that.getRange(that.tap.start[0].clientX, that.tap.start[0].clientY, that.tap.end[0].clientX, that.tap.end[0].clientY) < that.settings.scrollSupressionThreshold)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.tap.startTime = Number(new Date());
                that.tap.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.tap.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.singleTap = function () {
            var currentTarget;
            that.singleTap.timeOut = null;//预防与双击冲突的延迟器
            that.singleTap.type = false;//是否双击的标记
            var touchend = function (event) {
                var e = event || window.event;
                that.singleTap.end = e.changedTouches;
                that.singleTap.endTime = Number(new Date());
                if (
                    (that.singleTap.endTime - that.singleTap.startTime <= that.settings.tapDurationThreshold) &&
                    (that.singleTap.start.length === 1) &&
                    (that.singleTap.end.length === 1) &&
                    (that.getRange(that.singleTap.start[0].clientX, that.singleTap.start[0].clientY, that.singleTap.end[0].clientX, that.singleTap.end[0].clientY) < that.settings.scrollSupressionThreshold)
                ) {
                    if (that.singleTap.type) return;
                    that.singleTap.timeOut = setTimeout(function () {
                        that.callback.call(that.dom, currentTarget);
                    }, that.settings.doubleTapInterval);
                }

                document.removeEventListener("touchend", touchend);
            };

            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.singleTap.startTime = Number(new Date());
                that.singleTap.start = [];

                currentTarget = e;

                //双击清除singleTap事件
                if (that.singleTap.startTime - that.singleTap.endTime < that.settings.doubleTapInterval) {
                    clearTimeout(that.singleTap.timeOut);
                    that.singleTap.type = true;
                } else {
                    that.singleTap.type = false;
                }
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.singleTap.start.push(obj);
                    })();
                }

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.doubleTap = function () {
            var currentTarget;
            that.doubleTap.prevTime = 0;//定义一个记录上一次点击后鼠标抬起的时的时间变量
            var touchend = function (event) {
                var e = event || window.event;
                that.doubleTap.end = e.changedTouches;
                that.doubleTap.endTime = Number(new Date());
                if (
                    (that.doubleTap.endTime - that.doubleTap.startTime <= that.settings.tapDurationThreshold) &&
                    (that.doubleTap.start.length === 1) &&
                    (that.doubleTap.end.length === 1) &&
                    (that.getRange(that.doubleTap.start[0].clientX, that.doubleTap.start[0].clientY, that.doubleTap.end[0].clientX, that.doubleTap.end[0].clientY) < that.settings.scrollSupressionThreshold)
                ) {
                    if (that.doubleTap.prevTime != 0 && that.doubleTap.startTime - that.doubleTap.prevTime < that.settings.doubleTapInterval) {
                        that.callback.call(that.dom, currentTarget);
                    } else {
                        that.doubleTap.prevTime = that.doubleTap.endTime;
                    }
                } else {
                    that.doubleTap.prevTime = 0;
                }

            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.doubleTap.startTime = Number(new Date());
                that.doubleTap.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.doubleTap.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.longTap = function () {
            var currentTarget;
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.longTap.startTime = Number(new Date());
                that.longTap.start = my.jquery.extend(true, {}, e.targetTouches[0]);
                that.longTap.move = null;

                currentTarget = e;

                //设置定时器，确定长按触发的事件
                that.longTap.timeOut = setTimeout(function () {
                    if (!that.longTap.move ||
                        Math.sqrt(Math.pow(Math.abs(that.longTap.start.clientX - that.longTap.move.clientX), 2) + Math.pow(Math.abs(that.longTap.start.clientY - that.longTap.move.clientY), 2)) < that.settings.scrollSupressionThreshold) {
                        mouseUp();
                        that.callback.call(that.dom, currentTarget);
                    } else {
                        mouseUp();
                    }
                }, that.settings.tapHoldDurationThreshold);

                document.addEventListener("touchmove", mouseMove);
                document.addEventListener("touchend", mouseUp);
            };

            var mouseMove = function (event) {
                var e = event || window.event;
                that.longTap.move = my.jquery.extend(true, {}, e.targetTouches[0]);
            };

            var mouseUp = function () {
                clearTimeout(that.longTap.timeOut);
                document.removeEventListener("touchmove", mouseMove);
                document.removeEventListener("touchend", mouseUp);
            };

            that.dom.addEventListener("touchstart", mouseDown);
        };

        that.swipe = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.touch.end = e.changedTouches;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.touch.start.length === 1) &&
                    (that.touch.end.length === 1) &&
                    (Math.sqrt(Math.pow(Math.abs(that.touch.start[0].clientX - that.touch.end[0].clientX), 2) + Math.pow(Math.abs(that.touch.start[0].clientY - that.touch.end[0].clientY), 2)) > that.settings.horizontalDistanceThreshold)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.touch.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.swipeLeft = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.touch.end = e.changedTouches;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.touch.start.length === 1) &&
                    (that.touch.end.length === 1) &&
                    (that.getRange(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > that.settings.verticalDistanceThreshold) &&
                    (that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) >= 315 ||
                    that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) <= 45)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.touch.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.swipeRight = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.touch.end = e.changedTouches;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.touch.start.length === 1) &&
                    (that.touch.end.length === 1) &&
                    (that.getRange(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > that.settings.verticalDistanceThreshold) &&
                    (that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) >= 135 &&
                    that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) <= 225)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.touch.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.swipeUp = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.touch.end = e.changedTouches;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.touch.start.length === 1) &&
                    (that.touch.end.length === 1) &&
                    (that.getRange(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > that.settings.horizontalDistanceThreshold) &&
                    (that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > 45 &&
                    that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) < 135)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.touch.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        that.swipeDown = function () {
            var currentTarget;
            var touchend = function (event) {
                var e = event || window.event;
                that.touch.end = e.changedTouches;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.touch.start.length === 1) &&
                    (that.touch.end.length === 1) &&
                    (that.getRange(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > that.settings.horizontalDistanceThreshold) &&
                    (that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) > 225 &&
                    that.getAngle(that.touch.start[0].clientX, that.touch.start[0].clientY, that.touch.end[0].clientX, that.touch.end[0].clientY) < 315)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("touchend", touchend);
            };
            //设置手指触发事件
            var touchstart = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = [];
                var len = e.targetTouches.length;
                for (var i = 0; i < len; i++) {
                    (function () {
                        var obj = my.jquery.extend(true, {}, e.targetTouches[i]);
                        that.touch.start.push(obj);
                    })();
                }

                currentTarget = e;

                document.addEventListener("touchend", touchend);
            };

            that.dom.addEventListener("touchstart", touchstart);
        };

        //计算滑动的角度
        that.getAngle = function (px1, py1, px2, py2) {
            //两点的x、y值
            x = px2 - px1;
            y = py2 - py1;
            hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            //斜边长度
            cos = x / hypotenuse;
            radian = Math.acos(cos);
            //求出弧度
            angle = 180 / (Math.PI / radian);
            //用弧度算出角度
            if (y < 0) {
                angle = -angle;
            } else if ((y == 0) && (x < 0)) {
                angle = 180;
            }
            return angle + 180;
        };

        //计算两点之间的距离
        that.getRange = function (px1, py1, px2, py2) {
            return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
        };
    };

    //添加pc设备的点击事件
    this.AddClickFun = function () {
        var that = this;
        //默认的配置选项
        that.settings = {
            tapDurationThreshold: 250,//触屏大于这个时间不当作tap
            scrollSupressionThreshold: 10,//触发touchmove的敏感度
            swipeDurationThreshold: 750,//大于这个时间不当作swipe
            horizontalDistanceThreshold: 30,//swipe的触发垂直方向move必须小于这个距离
            verticalDistanceThreshold: 75,//swipe的触发水平方向move必须大于这个距离
            tapHoldDurationThreshold: 750,//swipe的触发水平方向move必须大于这个距离
            doubleTapInterval: 250//swipe的触发水平方向move必须大于这个距离
        };

        that.init = function (dom, fun) {
            that.dom = dom;
            that.fun = fun;
            //存储mouse相关的坐标信息
            that.mouse = {};
            //存储时间相关的信息
            that.date = {};

            that.dom.addEventListener("mousedown", that.mouseDown);
            that.dom.addEventListener("mouseup", that.mouseUp);
        };

        that.mouseDown = function (event) {
            event.preventDefault();
            var e = event || window.event;
            that.mouse.mouseDownX = e.clientX;
            that.mouse.mouseDownY = e.clientY;
            that.date.startTime = Number(new Date());
        };

        that.mouseUp = function (event) {
            event.preventDefault();
            var e = event || window.event;
            that.mouse.mouseUpX = e.clientX;
            that.mouse.mouseUpY = e.clientY;
            that.date.endTime = Number(new Date());
            //判断是否属于click
            if (
                (that.date.endTime - that.date.startTime <= that.settings.tapDurationThreshold) &&
                (Math.sqrt(Math.pow(Math.abs(that.mouse.mouseDownX - that.mouse.mouseUpX), 2) + Math.pow(Math.abs(that.mouse.mouseUpY - that.mouse.mouseDownY), 2)) < that.settings.scrollSupressionThreshold)
            ) {
                that.fun.call(that.dom);
            }

            //清除事件

        }
    };

    //添加pc端设备的鼠标交互事件
    this.AddComputerFun = function () {
        var that = this;
        //默认的配置选项
        that.settings = {
            tapDurationThreshold: 250,//触屏大于这个时间不当作tap
            scrollSupressionThreshold: 10,//触发touchmove的敏感度
            swipeDurationThreshold: 750,//大于这个时间不当作swipe
            horizontalDistanceThreshold: 30,//swipe的触发垂直方向move必须小于这个距离
            verticalDistanceThreshold: 75,//swipe的触发水平方向move必须大于这个距离
            tapHoldDurationThreshold: 750,//长按触发事件需要长按这个事件才可触发
            doubleTapInterval: 250//双击事件触发中间的间隔必须小于这个时间
        };

        that.init = function (dom, callback, event, callback2) {
            that.dom = dom;
            that.callback = callback;
            //callback2兼容滚动事件上下两个方法的兼容
            that.callback2 = callback2;

            //时间存储
            that.date = {};
            //所有的可以触发的事件数组
            that.arr = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap', "wheel"];
            //存储手指接触移动端的接触点的相关信息
            that.touch = {};

            var arr = event.split(" ");
            for (var i = 0; i < arr.length; i++) {
                //监听事件
                if (that.arr.indexOf(arr[i]) != -1) {
                    that[arr[i]]();
                }
            }
        };

        that.tap = function () {

            var currentTarget;

            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.tapDurationThreshold) &&
                    (Math.sqrt(Math.pow(Math.abs(that.touch.start.clientX - that.touch.end.clientX), 2) + Math.pow(Math.abs(that.touch.start.clientY - that.touch.end.clientY), 2)) < that.settings.scrollSupressionThreshold) &&
                    e.button === 0
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = event;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.singleTap = function () {
            var currentTarget;
            that.singleTap.timeOut = null;//预防与双击冲突的延迟器
            that.singleTap.type = false;//是否双击的标记
            var mouseUp = function (event) {
                var e = event || window.event;
                that.singleTap.end = e;
                that.singleTap.endTime = Number(new Date());
                if (
                    (that.singleTap.endTime - that.singleTap.startTime <= that.settings.tapDurationThreshold) &&
                    (Math.sqrt(Math.pow(Math.abs(that.singleTap.start.clientX - that.singleTap.end.clientX), 2) + Math.pow(Math.abs(that.singleTap.start.clientY - that.singleTap.end.clientY), 2)) < that.settings.scrollSupressionThreshold)
                ) {
                    if (that.singleTap.type) return;
                    that.singleTap.timeOut = setTimeout(function () {
                        that.callback.call(that.dom, currentTarget);
                    }, that.settings.doubleTapInterval);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.singleTap.startTime = Number(new Date());
                that.singleTap.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                //双击清除singleTap事件
                if (that.singleTap.startTime - that.singleTap.endTime < that.settings.doubleTapInterval) {
                    clearTimeout(that.singleTap.timeOut);
                    that.singleTap.type = true;
                } else {
                    that.singleTap.type = false;
                }

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.doubleTap = function () {
            var currentTarget;
            that.doubleTap.prevTime = 0;//定义一个记录上一次点击后鼠标抬起的时的时间变量
            var mouseUp = function (event) {
                var e = event || window.event;
                that.doubleTap.end = my.jquery.extend(true, {}, e);
                that.doubleTap.endTime = Number(new Date());
                if (
                    (that.doubleTap.endTime - that.doubleTap.startTime <= that.settings.tapDurationThreshold) &&
                    (Math.sqrt(Math.pow(Math.abs(that.doubleTap.start.clientX - that.doubleTap.end.clientX), 2) + Math.pow(Math.abs(that.doubleTap.start.clientY - that.doubleTap.end.clientY), 2)) < that.settings.scrollSupressionThreshold)
                ) {
                    if (that.doubleTap.prevTime != 0 && that.doubleTap.endTime - that.doubleTap.prevTime < that.settings.doubleTapInterval) {
                        that.callback.call(that.dom, currentTarget);
                    } else {
                        that.doubleTap.prevTime = that.doubleTap.endTime;
                    }
                } else {
                    that.doubleTap.prevTime = 0;
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.doubleTap.startTime = Number(new Date());
                that.doubleTap.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.longTap = function () {
            var currentTarget;
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.longTap.startTime = Number(new Date());
                that.longTap.start = my.jquery.extend(true, {}, e);
                that.longTap.move = null;

                currentTarget = e;

                //设置定时器，确定长按触发的事件
                that.longTap.timeOut = setTimeout(function () {
                    if (!that.longTap.move ||
                        Math.sqrt(Math.pow(Math.abs(that.longTap.start.clientX - that.longTap.move.clientX), 2) + Math.pow(Math.abs(that.longTap.start.clientY - that.longTap.move.clientY), 2)) < that.settings.scrollSupressionThreshold) {
                        mouseUp();
                        that.callback.call(that.dom, currentTarget);
                    } else {
                        mouseUp();
                    }
                }, that.settings.tapHoldDurationThreshold);

                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            };

            var mouseMove = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.longTap.move = my.jquery.extend(true, {}, e);
            };

            var mouseUp = function () {
                clearTimeout(that.longTap.timeOut);
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.swipe = function () {
            var currentTarget;
            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.getRange(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > that.settings.horizontalDistanceThreshold)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.swipeLeft = function () {
            var currentTarget;
            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.getRange(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > that.settings.verticalDistanceThreshold) &&
                    (that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) >= 135 ||
                    that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) <= -135)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.swipeRight = function () {
            var currentTarget;
            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.getRange(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > that.settings.verticalDistanceThreshold) &&
                    (that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) >= -45 &&
                    that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) <= 45)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.swipeUp = function () {
            var currentTarget;
            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.getRange(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > that.settings.horizontalDistanceThreshold) &&
                    (that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > -135 &&
                    that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) < -45)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.swipeDown = function () {
            var currentTarget;
            var mouseUp = function (event) {
                var e = event || window.event;
                that.touch.end = e;
                that.date.end = Number(new Date());
                if (
                    (that.date.end - that.date.start <= that.settings.swipeDurationThreshold) &&
                    (that.getRange(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > that.settings.horizontalDistanceThreshold) &&
                    (that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) > 45 &&
                    that.getAngle(that.touch.start.clientX, that.touch.start.clientY, that.touch.end.clientX, that.touch.end.clientY) < 135)
                ) {
                    that.callback.call(that.dom, currentTarget);
                }

                document.removeEventListener("mouseup", mouseUp);
            };
            //设置手指触发事件
            var mouseDown = function (event) {
                var e = event || window.event;
                e.preventDefault();
                that.date.start = Number(new Date());
                that.touch.start = my.jquery.extend(true, {}, e);

                currentTarget = e;

                document.addEventListener("mouseup", mouseUp);
            };

            that.dom.addEventListener("mousedown", mouseDown);
        };

        that.wheel = function () {
            var dom = that.dom;
            var fun1 = that.callback;
            var fun2 = that.callback2;
            function scroll(event) {
                var e = event || window.event;
                if (e.wheelDelta) {
                    //除了firfox浏览器，别的浏览器的处理
                    wheel(-e.wheelDelta / 120, e);
                } else if (e.detail) {
                    //firefox浏览器的测试
                    if (e.detail === -3) {
                        wheel(-1, e);
                    } else if (e.detail === 3) {
                        wheel(1, e);
                    } else {
                        console.log("鼠标滚轮事件改了？", e.wheelDelta);
                    }
                }

                function wheel(index, event) {
                    if(index >= 0){
                        //向下滚动
                        if(my.jquery.isFunction(fun1)){
                            fun1.call(dom,event);
                        }
                    }else if(index < 0){
                        //向上滚动
                        if(my.jquery.isFunction(fun2)){
                            fun2.call(dom,event);
                        }
                    }
                }
            }

            //添加监听事件
            dom.addEventListener("mousewheel",scroll,false);
            dom.addEventListener("DOMMouseScroll",scroll,false);
        };

        //计算滑动的角度
        that.getAngle = function (px1, py1, px2, py2) {
            //两点的x、y值
            x = px2 - px1;
            y = py2 - py1;
            hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            //斜边长度
            cos = x / hypotenuse;
            radian = Math.acos(cos);
            //求出弧度
            angle = 180 / (Math.PI / radian);
            //用弧度算出角度
            if (y < 0) {
                angle = -angle;
            } else if ((y == 0) && (x < 0)) {
                angle = 180;
            }
            return angle;
        };

        //计算两点之间的距离
        that.getRange = function (px1, py1, px2, py2) {
            return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
        };
    };

    //在一个盒子内添加图片组，并且添加了交互事件
    this.ImageView = function (obj) {
        var that = this;
        var settings = {
            mouseDown: {
                x: 0,
                y: 0,
                time: null//存储鼠标按下时的时间
            },//鼠标按下数据存储
            mouseMove: {
                x: 0,
                y: 0
            },//鼠标移动数据存储
            mouseUp: {time: null},//鼠标抬起数据存储
            loadImg: "button/load.gif",//图片加载中动态图
            ulStyle: "height:100%; padding:0; margin:0; position:absolute; left:0; overflow:hidden;",//生成的ul的样式
            liStyle: "height:100%; padding:0; margin:0; float:left; position:relative; list-style-type:none; overflow:hidden;",//生成的li的样式
            imgStyle: "position:absolute; left:0; top:0; right:0; bottom:0; margin:auto; cursor:move; display:block; transform:translate(0px, 0px) scale(1,1); max-width:100%; max-height:100%;",//生成的img的样式
            maxScale: 2,//实际图片的最大放大比例，默认为1
            maximum: 1.5,//手指可以放大到的最大极限
            minScale: 0.8,//最小缩放比例
            scrollScale: 1.1,//每次缩放的比例
            picIndex: 0,//当前显示的第几张图片，默认第一张
            img: null,//当前操作的img,鼠标抬起时清空
            picTransition: "all .3s",//图片过渡效果设置
            picWrapTransition: "all .3s",//ul列表的过渡样式
            canMovePercent: "50%",//移动图片出现空白的百分比以后就会切换页面
            updateTimeOut: 100,//每次鼠标离开屏幕后，处理界面的延迟
            timeOut: null,//鼠标屏幕离开的延时器对象存储
            changeBtn: {//pc端左右切换按钮样式
                leftBtn: {//向左切换按钮
                    src: "button/left.png",
                    style: "position:absolute; top:50%; transform:translateY(-50%); width:50px; height:100px; cursor:pointer; z-index:1; left:0;"
                },
                rightBtn: {//向右切换按钮
                    src: "button/right.png",
                    style: "position:absolute; top:50%; transform:translateY(-50%); width:50px; height:100px; cursor:pointer; z-index:1; right:0;"
                },
                changePic: "max-width:100%; max-height:100%; position:absolute; top:0; right:0; bottom:0; left:0; margin:auto; display:block;"
            }
        };
        that.settings = my.jquery.extend(true, {}, settings, obj);

        //media 媒体类型 phone,pc,pad   picWrap 需要填充的标签div   arr 图片数据数组
        that.init = function (media, picWrap, arr) {
            that.arr = arr;
            that.picWrap = picWrap;
            that.media = media || my.browserRedirect();
            function createDom() {
                that.picWrapWidth = that.picWrap.offsetWidth;////图片外框宽度
                that.picWrapHeight = that.picWrap.offsetHeight;//图片外框高度
                that.picWrapLeft = that.picWrap.getBoundingClientRect().left;//图片外框的距离左侧距离
                that.picWrapTop = that.picWrap.getBoundingClientRect().top;//图片外框距离顶部距离
                that.prefix = my.getPrefix();

                picWrap.style.overflow = "hidden";
                picWrap.style.cssText += that.prefix + "user-select:none;";
                if (picWrap.style.position !== "absolute" && picWrap.style.position !== "relative" && picWrap.style.position !== "fixed") {
                    picWrap.style.position = "relative";
                }

                //pc端添加左右切换按钮
                if (that.media === "pc" && that.arr.length > 1) {
                    //向左切换图片按钮
                    var left = document.createElement("div");
                    var leftImg = document.createElement("img");
                    leftImg.src = that.settings.changeBtn.leftBtn.src;
                    left.onclick = function () {
                        that.changePic("left");
                    };

                    //向右切换图片按钮
                    var right = document.createElement("div");
                    var rightImg = document.createElement("img");
                    rightImg.src = that.settings.changeBtn.rightBtn.src;
                    right.onclick = function () {
                        that.changePic("right");
                    };

                    //给左右切换按钮添加样式
                    left.style.cssText = that.settings.changeBtn.leftBtn.style;
                    right.style.cssText = that.settings.changeBtn.rightBtn.style;
                    leftImg.style.cssText = rightImg.style.cssText = that.settings.changeBtn.changePic;

                    //将元素添加到dom树
                    left.appendChild(leftImg);
                    picWrap.appendChild(left);
                    right.appendChild(rightImg);
                    picWrap.appendChild(right);
                }

                var len = arr.length;
                //创建ul
                that.ul = document.createElement("ul");
                that.ul.style.cssText = that.settings.ulStyle + "transition:" + that.settings.picWrapTransition;
                that.ul.style.width = len * that.picWrapWidth + "px";
                picWrap.appendChild(that.ul);

                //创建li
                for (var i = 0; i < len; i++) {
                    (function (i) {
                        var li = document.createElement("li");
                        li.style.cssText = that.settings.liStyle;
                        li.style.width = that.picWrapWidth + "px";
                        that.ul.appendChild(li);

                        //创建img
                        var img = document.createElement("img");
                        img.style.cssText = that.settings.imgStyle;
                        img.src = that.settings.loadImg;
                        li.appendChild(img);

                        //js动态加载图片
                        var bufferImg = new Image();
                        bufferImg.src = arr[i].src;
                        bufferImg.onload = function () {
                            img.src = arr[i].src;
                            //将图片的实际大小存储到对象当中
                            arr[i].width = img.naturalWidth;
                            arr[i].height = img.naturalHeight;

                            arr[i].scale = arr[i].width / img.width;
                            //设置图片大小
                            if (img.naturalWidth / img.naturalHeight > that.picWrapWidth / that.picWrapHeight) {
                                img.style.width = "100%";
                            } else {
                                img.style.height = "100%";
                            }

                            if (arr[i].scale < 1) {
                                arr[i].scale = 1;
                            }

                            //给移动端和pc端绑定事件
                            if (that.media === "pc") {
                                //平面地图鼠标移动事件
                                img.addEventListener("mousedown", that.mouseDown);
                                //平面地图鼠标滑轮放大缩小事件和移动端两指放大缩小
                                img.addEventListener("mousewheel", that.scrollFun, false);
                                img.addEventListener("DOMMouseScroll", that.scrollFun, false);//给火狐添加放大缩小事件
                            } else if (that.media === "phone" || that.media === "pad") {
                                img.addEventListener("touchstart", that.mouseDown);
                            }
                        };
                    })(i);
                }

                //移动列表
                var picIndex = that.settings.picIndex;
                that.ul.style.left = -picIndex * that.picWrap.offsetWidth + "px";
                for (var i = 0; i < that.ul.childNodes.length; i++) {
                    that.ul.childNodes[i].childNodes[0].style.transform = "translate(0px, 0px) scale(1, 1)";
                }
            }

            createDom();

            //图片外框变动触发的事件
            window.addEventListener("resize", function () {
                that.picWrap.innerHTML = null;
                //重新设置高度和宽度
                createDom();
            });

        };

        //鼠标滚轮缩放事件
        that.scrollFun = function (event) {
            var img = this;
            that.settings.img = img;

            var e = event || window.event;

            //获取当前img对象的偏移量
            var translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            var scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/);
            var offsetX = parseFloat(translate[1]);
            var offsetY = parseFloat(translate[2]);
            var scaleX = parseFloat(scale[1]);

            var imgWidth = img.offsetWidth;//图片实际宽度
            var imgHeight = img.offsetHeight;//图片实际高度
            var picWrapWidth = that.picWrap.offsetWidth;//图片外框宽度
            var picWrapHeight = that.picWrap.offsetHeight;//图片外框高度
            var picWrapLeft = that.picWrap.offsetLeft;//图片外框的距离左侧距离
            var picWrapTop = that.picWrap.offsetTop;//图片外框距离顶部距离

            //获取鼠标当前位置在图片的位置
            var mouseLeft = (imgWidth / 2 * scaleX - offsetX - picWrapWidth / 2) + (e.clientX - picWrapLeft);
            var mouseTop = (imgHeight * scaleX / 2 - offsetY - picWrapHeight / 2) + (e.clientY - picWrapTop);

            var percentLeft = mouseLeft / (imgWidth * scaleX);
            var percentTop = mouseTop / (imgHeight * scaleX);

            //PC端地图放大缩小处理
            function wheel(index, event) {
                var e = event || window.event;
                //获取图片的当前大小
                var translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
                var scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/)[1];

                //图片缩放
                var offsetX, offsetY;
                if (index < 0) {
                    scale = scale * Math.pow(that.settings.scrollScale, -index);
                } else if (index > 0) {
                    scale = scale / Math.pow(that.settings.scrollScale, index);
                }

                //设置禁止无限缩放
                var maxScale = that.arr[that.settings.picIndex].scale * that.settings.maximum * that.settings.maxScale;
                if (scale < that.settings.minScale) {
                    scale = that.settings.minScale;
                } else if (scale > maxScale) {
                    scale = maxScale;
                }

                //缩放以后更新图片的鼠标焦点
                offsetX = imgWidth / 2 * scale - (percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2;

                offsetY = imgHeight * scale / 2 - (percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2;


                //放大变小问题
                img.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) " + "scale(" + scale + "," + scale + ") ";

                //触发回调
                that.scaleCallback(scale);

                //更新图片位置
                that.updatePicPoistion(percentLeft, percentTop, e);

            }

            if (e.wheelDelta) {
                //除了firfox浏览器，别的浏览器的处理
                wheel(-e.wheelDelta / 120, e);
            } else if (e.detail) {
                //firefox浏览器的测试
                if (e.detail === -3) {
                    wheel(-1, e);
                } else if (e.detail === 3) {
                    wheel(1, e);
                } else {
                    console.log("鼠标滚轮事件改了？", e.wheelDelta);
                }
            }
        };

        //鼠标按下事件
        that.mouseDown = function (event) {
            event.preventDefault();
            var e = event || window.event;
            var img = this;
            that.settings.img = img;
            that.settings.mouseDown.e = e;
            that.settings.img.style.transition = "none";
            that.settings.mouseDown.time = Number(new Date());

            if (that.media === "pc") {
                that.settings.mouseDown.x = e.clientX;
                that.settings.mouseDown.y = e.clientY;
            } else if (that.media === "phone" || that.media === "pad") {
                that.settings.mouseDown.x = e.targetTouches[0].clientX;
                that.settings.mouseDown.y = e.targetTouches[0].clientY;
            }

            //获取当前img对象的偏移量
            that.settings.mouseDown.translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            that.settings.mouseDown.scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/);
            that.settings.mouseDown.offsetX = parseFloat(that.settings.mouseDown.translate[1]);
            that.settings.mouseDown.offsetY = parseFloat(that.settings.mouseDown.translate[2]);
            that.settings.mouseDown.scaleX = parseFloat(that.settings.mouseDown.scale[1]);

            //添加移动事件
            if (that.media === "pc") {
                document.addEventListener("mousemove", that.mouseMove);
                document.addEventListener("mouseup", that.mouseUp);
            } else if (that.media === "phone" || that.media === "pad") {
                if (e.targetTouches.length === 1) {
                    document.addEventListener("touchmove", that.mouseMove);
                    document.addEventListener("touchend", that.mouseUp);
                } else if (e.targetTouches.length >= 2) {
                    //清除一个手指头的事件
                    document.removeEventListener("touchmove", that.mouseMove);
                    document.removeEventListener("touchend", that.mouseUp);

                    var scaleX = that.settings.mouseDown.scaleX;
                    var offsetX = that.settings.mouseDown.offsetX;
                    var offsetY = that.settings.mouseDown.offsetY;
                    var picWrapWidth = that.picWrapWidth;
                    var picWrapHeight = that.picWrapHeight;
                    var picWrapLeft = that.picWrapLeft;
                    var picWrapTop = that.picWrapTop;

                    //生成原始位置信息
                    that.settings.twoTouch = {
                        clientX: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                        clientY: (event.touches[0].clientY + event.touches[1].clientY) / 2,
                        distance: Math.sqrt(Math.pow(Math.abs(event.touches[0].clientX - event.touches[1].clientX), 2) + Math.pow(Math.abs(event.touches[0].clientY - event.touches[1].clientY), 2)),
                        scale: that.settings.mouseDown.scaleX
                    };

                    //获取鼠标当前位置在图片的位置
                    that.settings.twoTouch.mouseLeft = (that.settings.img.offsetWidth / 2 * scaleX - offsetX - picWrapWidth / 2) + (that.settings.twoTouch.clientX - picWrapLeft);
                    that.settings.twoTouch.mouseTop = (that.settings.img.offsetHeight * scaleX / 2 - offsetY - picWrapHeight / 2) + (that.settings.twoTouch.clientY - picWrapTop);
                    //当前手指中心点的百分比
                    that.settings.twoTouch.percentLeft = that.settings.twoTouch.mouseLeft / (that.settings.img.offsetWidth * scaleX);
                    that.settings.twoTouch.percentTop = that.settings.twoTouch.mouseTop / (that.settings.img.offsetHeight * scaleX);

                    //添加两指移动事件
                    document.addEventListener("touchmove", that.twoTouch);
                    document.addEventListener("touchend", that.twoTouchEnd);
                }
            }

        };

        //鼠标移动事件
        that.mouseMove = function (event) {
            var img = that.settings.img;
            var e = event || window.event;
            if (that.media === 'pc') {
                e.preventDefault();
                that.settings.mouseMove.x = e.clientX;
                that.settings.mouseMove.y = e.clientY;
            } else if (that.media === "phone" || that.media === "pad") {
                that.settings.mouseMove.x = e.targetTouches[0].clientX;
                that.settings.mouseMove.y = e.targetTouches[0].clientY;
            }

            //计算出移动的距离
            var moveX = that.settings.mouseMove.x - that.settings.mouseDown.x;
            var moveY = that.settings.mouseMove.y - that.settings.mouseDown.y;

            //移动图片时，处理是移动整个盒子，还是图片
            var changePicWrap = function (scale) {
                that.ul.style.transition = "none";
                var percentX;
                var changeOffsetX = moveX + that.settings.mouseDown.offsetX;

                if (that.picWrap.offsetWidth >= img.offsetWidth * scale) {
                    //如果没有放大，直接移动的是图片列表外部的框体
                    percentX = moveX;
                    //设置只修改y轴
                    img.style.transform = "translate(" + that.settings.mouseDown.offsetX + "px," + (moveY + that.settings.mouseDown.offsetY) + "px) " + "scale(" + scale + "," + scale + ")";
                } else {
                    //图片宽度超过盒子宽度的情况下，尽量保证页面显示最多面积的图片
                    if (img.offsetWidth * scale / 2 + changeOffsetX < that.picWrap.offsetWidth / 2) {
                        //移动后图片右侧出现空白面积
                        percentX = img.offsetWidth * scale / 2 + changeOffsetX - that.picWrap.offsetWidth / 2;
                    } else if (changeOffsetX + that.picWrap.offsetWidth / 2 > img.offsetWidth * scale / 2) {
                        //移动后图片左侧出现空白面积
                        percentX = that.picWrap.offsetWidth / 2 + changeOffsetX - img.offsetWidth * scale / 2;
                    } else {
                        img.style.transform = "translate(" + (changeOffsetX) + "px," + (moveY + that.settings.mouseDown.offsetY) + "px) " + "scale(" + scale + "," + scale + ")";
                        percentX = 0;
                    }
                }

                that.ul.style.left = -that.settings.picIndex * that.picWrapWidth + percentX + "px";

            };

            changePicWrap(that.settings.mouseDown.scaleX);
        };

        //两指移动事件
        that.twoTouch = function (eve) {
            var event = eve || window.event;
            if (event.targetTouches.length === 1) return;
            var e = that.settings.twoTouch;

            var picWrapWidth = that.picWrapWidth;
            var picWrapHeight = that.picWrapHeight;
            var picWrapLeft = that.picWrapLeft;
            var picWrapTop = that.picWrapTop;
            var imgWidth = that.settings.img.offsetWidth;
            var imgHeight = that.settings.img.offsetHeight;

            //获取移动后的两个手指的位置
            var data = {
                clientX: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                clientY: (event.touches[0].clientY + event.touches[1].clientY) / 2,
                distance: Math.sqrt(Math.pow(Math.abs(event.touches[0].clientX - event.touches[1].clientX), 2) + Math.pow(Math.abs(event.touches[0].clientY - event.touches[1].clientY), 2))
            };
            //修改中心点处于图片的位置
            var mouseLeft = data.clientX - e.clientX;
            var mouseTop = data.clientY - e.clientY;

            //设置属性
            var scale = e.scale * data.distance / e.distance;

            //设置禁止无限缩放
            var maxScale = that.arr[that.settings.picIndex].scale * that.settings.maximum * that.settings.maxScale;
            if (scale < that.settings.minScale) {
                scale = that.settings.minScale;
            } else if (scale > maxScale) {
                scale = maxScale;
            }

            //缩放以后更新图片的鼠标焦点
            var offsetX = imgWidth / 2 * scale - (e.percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2 + mouseLeft;
            var offsetY = imgHeight * scale / 2 - (e.percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2 + mouseTop;

            that.settings.img.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) " + "scale(" + scale + "," + scale + ") ";

            //触发回调
            that.scaleCallback(scale);
        };

        //鼠标抬起事件
        that.mouseUp = function () {
            //鼠标抬起时清除所有与之不相关的事件
            document.removeEventListener("mousemove", that.mouseMove);
            document.removeEventListener("mouseup", that.mouseUp);
            document.removeEventListener("touchmove", that.mouseMove);
            document.removeEventListener("touchend", that.mouseUp);
            document.removeEventListener("touchmove", that.twoTouch);

            //鼠标抬起处理问题，在为pc或者只是移动图片的情况下
            if (that.media === "pc" || that.settings.mouseDown.e.touches.length === 1) {
                that.settings.mouseUp.time = Number(new Date());
                that.updatePicPoistion();
            }
            ;
        };

        //两个手指抬起处理清除事件
        that.twoTouchEnd = function () {
            //清除事件
            document.removeEventListener("touchmove", that.mouseMove);
            document.removeEventListener("touchend", that.twoTouchEnd);
            document.removeEventListener("touchmove", that.twoTouch);
            //手指抬起处理图片的位置
            that.settings.mouseUp.time = Number(new Date());
            that.updatePicPoistion();
        };

        //操作完成后进行图片的位置处理
        that.updatePicPoistion = function (percentLeft, percentTop, e) {

            //移动完处理问题
            that.settings.img.style.transition = that.settings.picTransition;
            that.ul.style.transition = that.settings.picWrapTransition;
            var translate = that.settings.img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            var scale = parseInt(that.settings.img.style.transform.match(/scale\((\S*),\s(\S*)\)/)[1] * 10000) / 10000;
            var offsetX = parseFloat(translate[1]);
            var offsetY = parseFloat(translate[2]);

            //处理是否切换页面
            var percentX = parseFloat(that.ul.style.left) + that.settings.picIndex * that.picWrapWidth;
            if (Math.abs(percentX) >= that.picWrapWidth * parseFloat(that.settings.canMovePercent) / 100 ||
                (that.settings.mouseUp.time - that.settings.mouseDown.time <= 250) && (Math.abs(percentX) >= that.picWrapWidth * 0.1)
            ) {
                if (percentX < 0) {
                    //向右切换图片
                    that.changePic("right");
                } else {
                    //向左切换图片
                    that.changePic("left");
                }
            } else {
                setTimeout(function () {
                    that.ul.style.left = -that.settings.picIndex * that.picWrapWidth + "px";
                }, 0)
            }

            //更新图片的位置
            function updatePoistion(scale) {
                var picWrap = that.picWrap;
                var img = that.settings.img;

                //先判断图片宽度不超过盒子的宽度的情况
                if (picWrap.offsetWidth >= img.offsetWidth * scale) {
                    //如果图片左侧超过了盒子范围，矫正
                    offsetX = 0;
                } else {
                    //图片宽度超过盒子宽度的情况下，尽量保证页面显示最多面积的图片
                    if (img.offsetWidth * scale / 2 + offsetX < picWrap.offsetWidth / 2) {
                        //移动后图片右侧出现空白面积
                        offsetX = (picWrap.offsetWidth - img.offsetWidth * scale) / 2;
                    } else if (offsetX + picWrap.offsetWidth / 2 > img.offsetWidth * scale / 2) {
                        //移动后图片左侧出现空白面积
                        offsetX = (img.offsetWidth * scale - picWrap.offsetWidth) / 2;
                    }
                }

                //判断图片高度不超过盒子的高度下的问题
                if (picWrap.offsetHeight >= img.offsetHeight * scale) {
                    //如果图片上部超过了盒子范围，矫正offset.offsetY = 0;
                    offsetY = 0;
                } else {
                    //图片高度超过盒子高度的情况下，尽量保证页面显示最多面积的图片
                    if (img.offsetHeight * scale / 2 + offsetY < picWrap.offsetHeight / 2) {
                        offsetY = (picWrap.offsetHeight - img.offsetHeight * scale) / 2;
                    } else if (offsetY + picWrap.offsetHeight / 2 > img.offsetHeight * scale / 2) {
                        offsetY = (img.offsetHeight * scale - picWrap.offsetHeight) / 2;
                    }
                }

                return {offsetX: offsetX, offsetY: offsetY};
            }

            //更新放大比例
            //显示地图的缩放率保证在一以上
            timeOutScale(scale);

            //延迟缩放
            function timeOutScale(scale) {
                var img = that.settings.img;
                var imgWidth = img.offsetWidth;
                var imgHeight = img.offsetHeight;
                var picWrapLeft = that.picWrapLeft;
                var picWrapTop = that.picWrapTop;
                var picWrapWidth = that.picWrapWidth;
                var picWrapHeight = that.picWrapHeight;

                //更新位置
                var offset = updatePoistion(scale);
                var offsetX = offset.offsetX;
                var offsetY = offset.offsetY;
                //更新图片的位置
                img.style.transform = "translate(" + offsetX + "px," + offsetY + "px) scale(" + scale + "," + scale + ") ";
                var twoTouch = that.settings.twoTouch;
                var maxScale = parseInt(that.arr[that.settings.picIndex].scale * that.settings.maxScale * 10000) / 10000;

                //计算出延迟后修改的内容
                if (scale < 1) {
                    scale = 1;
                } else if (scale > maxScale) {

                    scale = maxScale;
                    offset = updatePoistion(scale);
                    offsetX = offset.offsetX;
                    offsetY = offset.offsetY;

                    //如果是放大，定位也需要回退
                    //缩放以后更新图片的鼠标焦点
                    if (that.media === "pc") {
                        offsetX = imgWidth / 2 * scale - (percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2;
                        offsetY = imgHeight * scale / 2 - (percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2;
                    } else if (that.media === "phone" || that.media === "pad") {
                        offsetX = imgWidth / 2 * scale - (twoTouch.percentLeft * imgWidth * scale - (twoTouch.clientX - picWrapLeft)) - picWrapWidth / 2;
                        offsetY = imgHeight * scale / 2 - (twoTouch.percentTop * imgHeight * scale - (twoTouch.clientY - picWrapTop)) - picWrapHeight / 2;
                    }
                }

                clearTimeout(that.settings.timeOut);
                that.settings.timeOut = setTimeout(function () {
                    img.style.transform = "translate(" + offsetX + "px," + offsetY + "px) scale(" + scale + "," + scale + ") ";
                    that.touchendCallback(offsetY, offsetX, scale);
                }, that.settings.updateTimeOut);
            }
        };

        //切换下一张图片的方法
        that.changePic = function (val) {
            var picIndex = that.settings.picIndex;
            var arr = that.arr;
            //判断是向左还是向右移动图片
            if (val === "left") {
                if (picIndex <= 0) {
                    picIndex = 0;
                    changeList(true);
                } else {
                    picIndex--;
                    changeList(false);
                }
            } else if (val === "right") {
                picIndex++;
                if (picIndex >= arr.length) {
                    picIndex = arr.length - 1;
                    changeList(true);
                } else {
                    changeList(false);
                }
            }

            //判断
            function changeList(bool) {
                //移动列表
                that.settings.picIndex = picIndex;

                //判断是否在结尾处，如果在结尾，实现弹一下的效果 是（true） 不是 （false）
                //that.changePic.canBcak  延迟器，延迟一下触发时间
                if (bool && that.media === "pc") {
                    clearTimeout(that.changePic.canBack);
                    if (picIndex == 0) {
                        that.ul.style.left = "300px";
                    } else {
                        that.ul.style.left = -300 - picIndex * that.picWrap.offsetWidth + "px";
                    }

                    that.changePic.canBack = setTimeout(function () {
                        if (!that.changePic.canBack) return;
                        that.ul.style.left = -picIndex * that.picWrap.offsetWidth + "px";
                    }, 300)
                } else {
                    clearTimeout(that.changePic.canBack);
                    that.ul.style.left = -picIndex * that.picWrap.offsetWidth + "px";
                    for (var i = 0; i < that.ul.childNodes.length; i++) {
                        that.ul.childNodes[i].childNodes[0].style.transform = "translate(0px, 0px) scale(1, 1)";
                    }
                }
            }

        };

        //图片缩放时调用的方法，更新相关内容
        that.scaleCallback = function (scale) {
            //console.log(scale);
        };

        //图片操作完成后的回调方法
        that.touchendCallback = function (offsetY, offsetX, scale) {
            //console.log(offsetY, offsetX, scale);
        }
    };

    //在一个div内添加图片，并在图片上面添加一些内容
    this.DivImageView = function (obj) {
        var that = this;
        var settings = {
            mouseDown: {
                x: 0,
                y: 0,
                time: null//存储鼠标按下时的时间
            },//鼠标按下数据存储
            mouseMove: {
                x: 0,
                y: 0
            },//鼠标移动数据存储
            mouseUp: {time: null},//鼠标抬起数据存储
            loadImg: "button/load.gif",//图片加载中动态图
            divStyle: "padding:0; position:absolute; left:0; top:0; right:0; bottom:0; margin:auto; overflow:hidden; transform:translate(0px, 0px) scale(1,1); max-width:100%; max-height:100%; cursor:move; ",//生成的图片div的样式
            imgStyle: "position:absolute; left:0; top:0; right:0; bottom:0; margin:auto; display:block; z-index:-1;",//生成的img的样式
            maxScale: 2,//实际图片的最大放大比例，默认为1
            maximum: 1.5,//手指可以放大到的最大极限
            minScale: 0.8,//最小缩放比例
            scrollScale: 1.1,//每次缩放的比例
            picIndex: 0,//当前显示的第几张图片，默认第一张
            img: null,//当前操作的img,鼠标抬起时清空
            picTransition: "all .3s",//图片过渡效果设置
            picWrapTransition: "all .3s",//ul列表的过渡样式
            canMovePercent: "50%",//移动图片出现空白的百分比以后就会切换页面
            updateTimeOut: 100,//每次鼠标离开屏幕后，处理界面的延迟
            timeOut: null//鼠标屏幕离开的延时器对象存储
        };
        that.settings = my.jquery.extend(true, {}, settings, obj);

        //media 媒体类型 phone,pc,pad   picWrap 需要填充的标签div   arr 图片数据数组
        that.init = function (media, picWrap, obj) {
            that.arr = obj;
            that.picWrap = picWrap;
            that.media = media || my.browserRedirect();
            function createDom() {
                that.picWrapWidth = that.picWrap.parentNode.offsetWidth;////图片外框宽度
                that.picWrapHeight = that.picWrap.parentNode.offsetHeight;//图片外框高度
                that.picWrapLeft = that.picWrap.parentNode.getBoundingClientRect().left;//图片外框的距离左侧距离
                that.picWrapTop = that.picWrap.parentNode.getBoundingClientRect().top;//图片外框距离顶部距离
                that.prefix = my.getPrefix();

                picWrap.style.overflow = "hidden";
                picWrap.style.cssText += that.prefix + "user-select:none;";
                if (picWrap.style.position !== "absolute" && picWrap.style.position !== "relative" && picWrap.style.position !== "fixed") {
                    picWrap.style.position = "relative";
                }

                //生成需要显示的图片的div
                var picDiv = document.createElement("div");
                picDiv.style.cssText = that.settings.divStyle;
                picWrap.appendChild(picDiv);

                //生成图片放入到div内
                var picImage = document.createElement("img");
                picImage.style.cssText = that.settings.imgStyle;
                picImage.src = that.settings.loadImg;
                picDiv.appendChild(picImage);

                that.settings.img = picDiv;

                //加载地图，并将地图上的内容放置到地图上面
                var bufferImg = new Image();
                bufferImg.src = obj.src;
                bufferImg.onload = function () {
                    picImage.src = obj.src;
                    //获取图片的真实高度和宽度
                    var width = bufferImg.naturalWidth;
                    var height = bufferImg.naturalHeight;

                    //根据不同的情况设置div大小
                    if (width < that.picWrapWidth && height < that.picWrapHeight) {
                        picDiv.style.width = width + "px";
                        picDiv.style.height = height + "px";
                    } else {
                        if (width / height > that.picWrapWidth / that.picWrapHeight) {
                            picDiv.style.width = "100%";
                            picDiv.style.height = that.picWrapWidth * height / width + "px";
                            picImage.style.width = "100%";
                            picImage.style.height = "100%";
                        } else {
                            picDiv.style.height = "100%";
                            picDiv.style.width = that.picWrapHeight * width / height + "px";
                            picImage.style.width = "100%";
                            picImage.style.height = "100%";
                        }
                    }

                    //计算出最大可放大比例
                    var maxScale = width / that.picWrapWidth < 1 ? 1 : width / that.picWrapWidth;
                    that.maxScale = maxScale * that.settings.maximum * that.settings.maxScale;

                    //初始化增加额外的内容调用
                    that.initMore(picDiv, obj);


                    //给移动端和pc端绑定事件
                    if (that.media === "pc") {
                        //平面地图鼠标移动事件
                        picDiv.addEventListener("mousedown", that.mouseDown);
                        //平面地图鼠标滑轮放大缩小事件和移动端两指放大缩小
                        picDiv.addEventListener("mousewheel", that.scrollFun, false);
                        picDiv.addEventListener("DOMMouseScroll", that.scrollFun, false);//给火狐添加放大缩小事件
                    } else if (that.media === "phone" || that.media === "pad") {
                        picDiv.addEventListener("touchstart", that.mouseDown);
                    }
                };
            }

            createDom();

            //图片外框变动触发的事件
            window.addEventListener("resize", function () {
                that.picWrap.innerHTML = null;
                //重新设置高度和宽度
                createDom();
            });

        };

        that.initMore = function () {

        };

        //鼠标滚轮缩放事件
        that.scrollFun = function (event) {
            var img = this;
            that.settings.img = img;

            var e = event || window.event;

            //获取当前img对象的偏移量
            var translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            var scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/);
            var offsetX = parseFloat(translate[1]);
            var offsetY = parseFloat(translate[2]);
            var scaleX = parseFloat(scale[1]);

            var imgWidth = img.offsetWidth;//图片实际宽度
            var imgHeight = img.offsetHeight;//图片实际高度
            var picWrapWidth = that.picWrapWidth;//图片外框宽度
            var picWrapHeight = that.picWrapHeight;//图片外框高度
            var picWrapLeft = that.picWrapLeft;//图片外框的距离左侧距离
            var picWrapTop = that.picWrapTop;//图片外框距离顶部距离

            //获取鼠标当前位置在图片的位置
            var mouseLeft = (imgWidth / 2 * scaleX - offsetX - picWrapWidth / 2) + (e.clientX - picWrapLeft);
            var mouseTop = (imgHeight * scaleX / 2 - offsetY - picWrapHeight / 2) + (e.clientY - picWrapTop);

            var percentLeft = mouseLeft / (imgWidth * scaleX);
            var percentTop = mouseTop / (imgHeight * scaleX);

            //PC端地图放大缩小处理
            function wheel(index, event) {
                var e = event || window.event;
                //获取图片的当前大小
                var translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
                var scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/)[1];

                //图片缩放
                var offsetX, offsetY;
                if (index < 0) {
                    scale = scale * Math.pow(that.settings.scrollScale, -index);
                } else if (index > 0) {
                    scale = scale / Math.pow(that.settings.scrollScale, index);
                }

                //设置禁止无限缩放
                if (scale < that.settings.minScale) {
                    scale = that.settings.minScale;
                } else if (scale > that.maxScale) {
                    scale = that.maxScale;
                }

                //缩放以后更新图片的鼠标焦点
                offsetX = imgWidth / 2 * scale - (percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2;

                offsetY = imgHeight * scale / 2 - (percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2;


                //放大变小问题
                img.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) " + "scale(" + scale + "," + scale + ") ";

                //触发回调
                that.scaleCallback(that.settings.img);

                //更新图片位置
                that.updatePicPoistion(percentLeft, percentTop, e);

            }

            if (e.wheelDelta) {
                //除了firfox浏览器，别的浏览器的处理
                wheel(-e.wheelDelta / 120, e);
            } else if (e.detail) {
                //firefox浏览器的测试
                if (e.detail === -3) {
                    wheel(-1, e);
                } else if (e.detail === 3) {
                    wheel(1, e);
                } else {
                    console.log("鼠标滚轮事件改了？", e.wheelDelta);
                }
            }
        };

        //鼠标按下事件
        that.mouseDown = function (event) {
            event.preventDefault();
            var e = event || window.event;
            that.settings.mouseDown.e = e;
            that.settings.img.style.transition = "none";
            that.settings.mouseDown.time = Number(new Date());
            var img = that.settings.img;

            if (that.media === "pc") {
                that.settings.mouseDown.x = e.clientX;
                that.settings.mouseDown.y = e.clientY;
            } else if (that.media === "phone" || that.media === "pad") {
                that.settings.mouseDown.x = e.targetTouches[0].clientX;
                that.settings.mouseDown.y = e.targetTouches[0].clientY;
            }

            //获取当前img对象的偏移量
            that.settings.mouseDown.translate = img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            that.settings.mouseDown.scale = img.style.transform.match(/scale\((\S*),\s(\S*)\)/);
            that.settings.mouseDown.offsetX = parseFloat(that.settings.mouseDown.translate[1]);
            that.settings.mouseDown.offsetY = parseFloat(that.settings.mouseDown.translate[2]);
            that.settings.mouseDown.scaleX = parseFloat(that.settings.mouseDown.scale[1]);

            //添加移动事件
            if (that.media === "pc") {
                document.addEventListener("mousemove", that.mouseMove);
                document.addEventListener("mouseup", that.mouseUp);
            } else if (that.media === "phone" || that.media === "pad") {
                if (e.targetTouches.length === 1) {
                    document.addEventListener("touchmove", that.mouseMove);
                    document.addEventListener("touchend", that.mouseUp);
                } else if (e.targetTouches.length >= 2) {
                    //清除一个手指头的事件
                    document.removeEventListener("touchmove", that.mouseMove);
                    document.removeEventListener("touchend", that.mouseUp);

                    var scaleX = that.settings.mouseDown.scaleX;
                    var offsetX = that.settings.mouseDown.offsetX;
                    var offsetY = that.settings.mouseDown.offsetY;
                    var picWrapWidth = that.picWrapWidth;
                    var picWrapHeight = that.picWrapHeight;
                    var picWrapLeft = that.picWrapLeft;
                    var picWrapTop = that.picWrapTop;

                    //生成原始位置信息
                    that.settings.twoTouch = {
                        clientX: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                        clientY: (event.touches[0].clientY + event.touches[1].clientY) / 2,
                        distance: Math.sqrt(Math.pow(Math.abs(event.touches[0].clientX - event.touches[1].clientX), 2) + Math.pow(Math.abs(event.touches[0].clientY - event.touches[1].clientY), 2)),
                        scale: that.settings.mouseDown.scaleX
                    };

                    //获取鼠标当前位置在图片的位置
                    that.settings.twoTouch.mouseLeft = (that.settings.img.offsetWidth / 2 * scaleX - offsetX - picWrapWidth / 2) + (that.settings.twoTouch.clientX - picWrapLeft);
                    that.settings.twoTouch.mouseTop = (that.settings.img.offsetHeight * scaleX / 2 - offsetY - picWrapHeight / 2) + (that.settings.twoTouch.clientY - picWrapTop);
                    //当前手指中心点的百分比
                    that.settings.twoTouch.percentLeft = that.settings.twoTouch.mouseLeft / (that.settings.img.offsetWidth * scaleX);
                    that.settings.twoTouch.percentTop = that.settings.twoTouch.mouseTop / (that.settings.img.offsetHeight * scaleX);

                    //添加两指移动事件
                    document.addEventListener("touchmove", that.twoTouch);
                    document.addEventListener("touchend", that.twoTouchEnd);
                }
            }

        };

        //鼠标移动事件
        that.mouseMove = function (event) {
            var img = that.settings.img;
            var e = event || window.event;
            if (that.media === 'pc') {
                e.preventDefault();
                that.settings.mouseMove.x = e.clientX;
                that.settings.mouseMove.y = e.clientY;
            } else if (that.media === "phone" || that.media === "pad") {
                that.settings.mouseMove.x = e.targetTouches[0].clientX;
                that.settings.mouseMove.y = e.targetTouches[0].clientY;
            }

            //计算出移动的距离
            var moveX = that.settings.mouseMove.x - that.settings.mouseDown.x;
            var moveY = that.settings.mouseMove.y - that.settings.mouseDown.y;

            //修改图片的位置
            img.style.transition = "none";
            img.style.transform = "translate(" + (moveX + that.settings.mouseDown.offsetX) + "px," + (moveY + that.settings.mouseDown.offsetY) + "px) " + "scale(" + that.settings.mouseDown.scaleX + "," + that.settings.mouseDown.scaleX + ")";
        };

        //两指移动事件
        that.twoTouch = function (eve) {
            var event = eve || window.event;
            if (event.targetTouches.length === 1) return;
            var e = that.settings.twoTouch;

            var picWrapWidth = that.picWrapWidth;
            var picWrapHeight = that.picWrapHeight;
            var picWrapLeft = that.picWrapLeft;
            var picWrapTop = that.picWrapTop;
            var imgWidth = that.settings.img.offsetWidth;
            var imgHeight = that.settings.img.offsetHeight;

            //获取移动后的两个手指的位置
            var data = {
                clientX: (event.touches[0].clientX + event.touches[1].clientX) / 2,
                clientY: (event.touches[0].clientY + event.touches[1].clientY) / 2,
                distance: Math.sqrt(Math.pow(Math.abs(event.touches[0].clientX - event.touches[1].clientX), 2) + Math.pow(Math.abs(event.touches[0].clientY - event.touches[1].clientY), 2))
            };
            //修改中心点处于图片的位置
            var mouseLeft = data.clientX - e.clientX;
            var mouseTop = data.clientY - e.clientY;

            //设置属性
            var scale = e.scale * data.distance / e.distance;

            //设置禁止无限缩放
            if (scale < that.settings.minScale) {
                scale = that.settings.minScale;
            } else if (scale > that.maxScale) {
                scale = that.maxScale;
            }

            //缩放以后更新图片的鼠标焦点
            var offsetX = imgWidth / 2 * scale - (e.percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2 + mouseLeft;
            var offsetY = imgHeight * scale / 2 - (e.percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2 + mouseTop;

            that.settings.img.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) " + "scale(" + scale + "," + scale + ") ";

            //触发回调
            that.scaleCallback(that.settings.img);
        };

        //鼠标抬起事件
        that.mouseUp = function () {
            //鼠标抬起时清除所有与之不相关的事件
            document.removeEventListener("mousemove", that.mouseMove);
            document.removeEventListener("mouseup", that.mouseUp);
            document.removeEventListener("touchmove", that.mouseMove);
            document.removeEventListener("touchend", that.mouseUp);
            document.removeEventListener("touchmove", that.twoTouch);

            //鼠标抬起处理问题，在为pc或者只是移动图片的情况下
            if (that.media === "pc" || that.settings.mouseDown.e.touches.length === 1) {
                that.settings.mouseUp.time = Number(new Date());
                that.updatePicPoistion();
            }
            ;
        };

        //两个手指抬起处理清除事件
        that.twoTouchEnd = function () {
            //清除事件
            document.removeEventListener("touchmove", that.mouseMove);
            document.removeEventListener("touchend", that.twoTouchEnd);
            document.removeEventListener("touchmove", that.twoTouch);
            //手指抬起处理图片的位置
            that.settings.mouseUp.time = Number(new Date());
            that.updatePicPoistion();
        };

        //操作完成后进行图片的位置处理
        that.updatePicPoistion = function (percentLeft, percentTop, e) {

            //移动完处理问题
            that.settings.img.style.transition = that.settings.picTransition;
            //that.ul.style.transition = that.settings.picWrapTransition;
            var translate = that.settings.img.style.transform.match(/translate\((\S*)px,\s(\S*)px\)/);
            var scale = parseInt(that.settings.img.style.transform.match(/scale\((\S*),\s(\S*)\)/)[1] * 10000) / 10000;
            var offsetX = parseFloat(translate[1]);
            var offsetY = parseFloat(translate[2]);

            //更新图片的位置
            function updatePoistion(scale) {
                var picWrap = that.picWrap;
                var img = that.settings.img;

                //先判断图片宽度不超过盒子的宽度的情况
                if (picWrap.offsetWidth >= img.offsetWidth * scale) {
                    //如果图片左侧超过了盒子范围，矫正
                    offsetX = 0;
                } else {
                    //图片宽度超过盒子宽度的情况下，尽量保证页面显示最多面积的图片
                    if (img.offsetWidth * scale / 2 + offsetX < picWrap.offsetWidth / 2) {
                        //移动后图片右侧出现空白面积
                        offsetX = (picWrap.offsetWidth - img.offsetWidth * scale) / 2;
                    } else if (offsetX + picWrap.offsetWidth / 2 > img.offsetWidth * scale / 2) {
                        //移动后图片左侧出现空白面积
                        offsetX = (img.offsetWidth * scale - picWrap.offsetWidth) / 2;
                    }
                }

                //判断图片高度不超过盒子的高度下的问题
                if (picWrap.offsetHeight >= img.offsetHeight * scale) {
                    //如果图片上部超过了盒子范围，矫正offset.offsetY = 0;
                    offsetY = 0;
                } else {
                    //图片高度超过盒子高度的情况下，尽量保证页面显示最多面积的图片
                    if (img.offsetHeight * scale / 2 + offsetY < picWrap.offsetHeight / 2) {
                        offsetY = (picWrap.offsetHeight - img.offsetHeight * scale) / 2;
                    } else if (offsetY + picWrap.offsetHeight / 2 > img.offsetHeight * scale / 2) {
                        offsetY = (img.offsetHeight * scale - picWrap.offsetHeight) / 2;
                    }
                }

                return {offsetX: offsetX, offsetY: offsetY};
            }

            //更新放大比例
            //显示地图的缩放率保证在一以上
            timeOutScale(scale);

            //延迟缩放
            function timeOutScale(scale) {
                var img = that.settings.img;
                var imgWidth = img.offsetWidth;
                var imgHeight = img.offsetHeight;
                var picWrapLeft = that.picWrapLeft;
                var picWrapTop = that.picWrapTop;
                var picWrapWidth = that.picWrapWidth;
                var picWrapHeight = that.picWrapHeight;

                //更新位置
                var offset = updatePoistion(scale);
                var offsetX = offset.offsetX;
                var offsetY = offset.offsetY;
                //更新图片的位置
                img.style.transform = "translate(" + offsetX + "px," + offsetY + "px) scale(" + scale + "," + scale + ") ";
                var twoTouch = that.settings.twoTouch;
                var maxScale = (that.maxScale * 10000) / 10000 / that.settings.maximum;//图片能够显示的最大放大尺度

                //计算出延迟后修改的内容
                if (scale < 1) {
                    scale = 1;
                } else if (scale > maxScale) {

                    scale = maxScale;
                    offset = updatePoistion(scale);
                    offsetX = offset.offsetX;
                    offsetY = offset.offsetY;

                    //如果是放大，定位也需要回退
                    //缩放以后更新图片的鼠标焦点
                    if (that.media === "pc") {
                        offsetX = imgWidth / 2 * scale - (percentLeft * imgWidth * scale - (e.clientX - picWrapLeft)) - picWrapWidth / 2;
                        offsetY = imgHeight * scale / 2 - (percentTop * imgHeight * scale - (e.clientY - picWrapTop)) - picWrapHeight / 2;
                    } else if (that.media === "phone" || that.media === "pad") {
                        offsetX = imgWidth / 2 * scale - (twoTouch.percentLeft * imgWidth * scale - (twoTouch.clientX - picWrapLeft)) - picWrapWidth / 2;
                        offsetY = imgHeight * scale / 2 - (twoTouch.percentTop * imgHeight * scale - (twoTouch.clientY - picWrapTop)) - picWrapHeight / 2;
                    }
                }

                clearTimeout(that.settings.timeOut);
                that.settings.timeOut = setTimeout(function () {
                    img.style.transform = "translate(" + offsetX + "px," + offsetY + "px) scale(" + scale + "," + scale + ") ";
                    that.touchendCallback(that.settings.img);
                }, that.settings.updateTimeOut);
            }
        };

        //切换下一张图片的方法
        that.changePic = function (val) {
            var picIndex = that.settings.picIndex;
            var arr = that.arr;
            //判断是向左还是向右移动图片
            if (val === "left") {
                picIndex--;
                if (picIndex < 0) {
                    picIndex = 0;
                    //return;
                }
            } else if (val === "right") {
                picIndex++;
                if (picIndex >= arr.length) {
                    picIndex = arr.length - 1;
                    //return;
                }
            }

            that.settings.picIndex = picIndex;
            //console.log(picIndex,picWrap.offsetWidth);
            //移动列表
            that.ul.style.left = -picIndex * that.picWrap.offsetWidth + "px";
            for (var i = 0; i < that.ul.childNodes.length; i++) {
                that.ul.childNodes[i].childNodes[0].style.transform = "translate(0px, 0px) scale(1, 1)";
            }
        };

        //图片缩放时调用的方法，更新相关内容
        that.scaleCallback = function (scale) {
            //console.log(scale);
        };

        //图片缩放完成后的回调方法
        that.touchendCallback = function (offsetY, offsetX, scale) {
            //console.log(offsetY, offsetX, scale);
        }
    };

    //增加专用的交互事件
    var touch_fun = {
        click: function (fun) {
            return this.each(this, function (index, dom) {
                if (my.browserRedirect() === "pc") {
                    new my.AddComputerFun().init(dom, fun, "tap");
                } else {
                    new my.AddTouchFun().init(dom, fun, "tap");
                }
            });
        },
        tap: function (fun) {
            return this.each(this, function (index, dom) {
                if (my.browserRedirect() === "pc") {
                    new my.AddComputerFun().init(dom, fun, "tap");
                } else {
                    new my.AddTouchFun().init(dom, fun, "tap");
                }
            });
        },
        swipe: function (fun) {
            return this.each(this, function (index, dom) {

            });
        },
        on: function (event, fun,fun2) {
            //fun2 兼容鼠标滚动事件第二个事件
            return this.each(this, function (index, dom) {
                if (my.browserRedirect() === "pc") {
                    new my.AddComputerFun().init(dom, fun, event ,fun2);
                } else {
                    new my.AddTouchFun().init(dom, fun, event);
                }
            });
        }
    };

    //生成类似于jq的类数组对象
    this.touch = function (dom) {
        var touch_obj = new Object();
        if (my.isDom(dom)) {
            [].push.call(touch_obj, dom);
        } else if (my.jquery.isArray(dom)) {
            [].push.apply(touch_obj, dom);
        }else if(dom.length > 0){
            [].push.apply(touch_obj, dom);
        }

        jQuery.extend(true, touch_obj, jquery_fun, touch_fun);

        return touch_obj;
    }
}

MyNeedExtend.prototype = {
    constructor: MyNeedExtend,
    //判断是什么媒体设备的浏览器
    browserRedirect: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        //调用方法，首先判断是移动端还是PC端，然后根据浏览器的分辨率判断是pad还是phone还是minphone
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            if (bIsIpad) {
                return "pad";
            } else if (document.body.clientWidth > 767 && document.body.clientHeight > 767) {
                return "pad";
            } else if (document.body.clientWidth < 400 || document.body.clientHeight < 400) {
                return "phone";//小于320的minphone 暂时修改成phone
            } else {
                return "phone";
            }
        } else {
            return "pc";
        }
    },
    //深拷贝和浅拷贝(设置,对象，深/浅)
    cloneObj: function (settings, obj, boolean) {
        var bool = boolean || false;
        if (typeof obj != "object") {
            return;
        }
        //首先判断是深拷贝还是浅拷贝 true 深   false 浅
        if (bool) {
            for (var i in obj) {
                if (typeof obj[i] == "object" && !(obj[i] instanceof HTMLElement)) {
                    if (obj[i] instanceof Array) {
                        settings[i] = [];
                    } else {
                        settings[i] = {};
                    }
                    this.cloneObj(settings[i], obj[i], true);
                } else {
                    settings[i] = obj[i];
                }
            }
        } else {
            for (var i in obj) {
                settings[i] = obj[i];
            }
        }
    },
    //判断元素内是否包含另一个元素(元素，是否包含的另一个元素)
    inDom: function (dom, include) {
        if (include && include.parentNode) {
            if (include.parentNode === dom) {
                return true;
            } else if (include.parentNode === document.body) {
                return false;
            } else {
                return this.inDom(dom, include.parentNode);
            }
        } else {
            return false;
        }
    },
    //获取浏览器的兼容性前缀
    getPrefix: function () {
        var temp = document.body;
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for (var i in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    },
    //判断是否是一个dom对象
    isDom: function (dom) {
        var is_Dom = ( typeof HTMLElement === 'object' ) ?
            function (obj) {
                return obj instanceof HTMLElement;
            } :
            function (obj) {
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            }
        return is_Dom(dom);
    },
    //鼠标上下滚轮事件(绑定的dom对象，向下滚动触发事件，向上滚动触发事件）
    wheel: function (dom, fun1, fun2) {
        var that = this;
        //获取传入的arguments的个数
        var argLen = arguments.length;
        function scroll(event) {
            var e = event || window.event;
            if (e.wheelDelta) {
                //除了firfox浏览器，别的浏览器的处理
                wheel(-e.wheelDelta / 120, e);
            } else if (e.detail) {
                //firefox浏览器的测试
                if (e.detail === -3) {
                    wheel(-1, e);
                } else if (e.detail === 3) {
                    wheel(1, e);
                } else {
                    console.log("鼠标滚轮事件改了？", e.wheelDelta);
                }
            }

            function wheel(index, event) {
                if(index >= 0){
                    //向下滚动
                    if(argLen >= 2 && that.jquery.isFunction(fun1)){
                        fun1.call(dom,event);
                    }
                }else if(index < 0){
                    //向上滚动
                    if(argLen >= 3 && that.jquery.isFunction(fun2)){
                        fun2.call(dom,event);
                    }
                }
            }
        }

        //添加监听事件
        dom.addEventListener("mousewheel",scroll,false);
        dom.addEventListener("DOMMouseScroll",scroll,false);
    }
};
