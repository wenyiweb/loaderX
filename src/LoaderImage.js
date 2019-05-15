// Loader plugin to load images
function LoaderImage(url, tags, priority, origin) {
    var self = this,
        loader = null;

    this.img = new Image();
    if (origin !== undefined) {
        this.img.crossOrigin = origin;
    }
    this.tags = tags;
    this.priority = priority;

    var onReadyStateChange = function () {
        if (self.img.readyState === 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    var onLoad = function () {
        removeEventHandlers();
        loader.onLoad(self);
    };

    var onError = function () {
        removeEventHandlers();
        loader.onError(self);
    };

    var removeEventHandlers = function () {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function (loaderX) {
        loader = loaderX;

        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);

        self.img.src = url;
    };
    this.checkStatus = function () {
        if (self.img.complete) {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };
    this.onTimeout = function () {
        removeEventHandlers();
        if (self.img.complete) {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function () {
        return url;
    };

    // cross-browser event binding
    this.bind = function (eventName, eventHandler) {
        if (self.img.addEventListener) {
            self.img.addEventListener(eventName, eventHandler, false);
        } else if (self.img.attachEvent) {
            self.img.attachEvent('on' + eventName, eventHandler);
        }
    };

    // cross-browser event un-binding
    this.unbind = function (eventName, eventHandler) {
        if (self.img.removeEventListener) {
            self.img.removeEventListener(eventName, eventHandler, false);
        } else if (self.img.detachEvent) {
            self.img.detachEvent('on' + eventName, eventHandler);
        }
    };

}

module.exports = LoaderImage;