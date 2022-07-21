(function(global, doc) {
    doc.querySelector('.ibexa-commerce-js--print-page').addEventListener('click', (event) => {
        event.preventDefault();

        global.print();
    });
})(window, window.document);
