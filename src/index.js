var time = require("time"),
    isObject = require("is_object");


module.exports = Cookie;


function Cookie(name, value, unparsed, options) {
    if (isObject(unparsed)) {
        options = unparsed;
        unparsed = null;
    }
    options = options || {};

    this.name = name;
    this.value = value;
    this.path = options.path || null;
    this.domain = options.domain || null;
    this.expires = options.expires || null;
    this.maxAge = options.maxAge || null;
    this.secure = !!options.secure || null;
    this.httpOnly = options.httpOnly != null ? !!options.httpOnly : true;
    this.unparsed = unparsed;
}

Cookie.prototype.serialize = function() {
    var str = this.name + "=" + encodeURIComponent(this.value);

    if ((this.maxAge = +this.maxAge)) {
        this.expires = new Date(time.stamp() + this.maxAge);
    }

    if (this.path) {
        str += "; Path=" + this.path;
    }
    if (this.domain) {
        str += "; Domain=" + this.domain;
    }
    if (this.expires) {
        str += "; Expires=" + this.expires.toUTCString();
    }
    if (this.httpOnly) {
        str += "; HttpOnly";
    }
    if (this.secure) {
        str += "; Secure";
    }

    return str;
};

Cookie.prototype.toString = Cookie.prototype.serialize;
