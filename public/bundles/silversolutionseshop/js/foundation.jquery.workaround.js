(function (global, doc, $) {
    const originalLoad = $.fn.load;
    const originalAjax = $.ajax;

    // this is a workaround to make foundation5 works with jQuery 3+
    // we cannot upgrade to foundation6 because of too great impact on our and customer's code
    // see: https://issues.ibexa.co/browse/EC-425
    $.fn.load = function (firstArgument) {
        if (typeof firstArgument !== 'string') {
            this.on('load', firstArgument);

            return this;
        }

        return originalLoad.apply(this, arguments);
    };
    $.fn.selector = '';
    $.ajax = function () {
        const jqXHR = originalAjax.apply(this, arguments);

        jqXHR.success = function () {
            return jqXHR.done.apply(this, arguments);
        };
        jqXHR.error = function () {
            return jqXHR.fail.apply(this, arguments);
        };
        jqXHR.complete = function () {
            return jqXHR.always.apply(this, arguments);
        };

        return jqXHR;
    };
})(window, window.document, window.jQuery);
