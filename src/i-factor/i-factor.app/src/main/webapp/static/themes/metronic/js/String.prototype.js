String.prototype.trim = function () {
    // 用正则表达式将前后空格  
    // 用空字符串替代 
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

String.prototype.startsWith = function (str) {
    return (this.match("^" + str) == str);
}

String.prototype.endsWith = function (str) {
    return (this.match(str + "$") == str);
}
