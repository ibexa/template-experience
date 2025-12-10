(function (doc) {
    const popularityDurationSelect = doc.querySelector('.dashboard_popularity_duration');

    if (popularityDurationSelect) {
        popularityDurationSelect.addEventListener(
            'change',
            function () {
                this.form.submit();
            },
            false,
        );
    }
})(window.document);
