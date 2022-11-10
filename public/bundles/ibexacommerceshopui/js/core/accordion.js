import addConfig from '../helpers/addConfig';

(function(global, doc, ibexa) {
    class Accordion {
        attachEvents() {
            this.accordionNodes.forEach((accordionNode) => {
                accordionNode.querySelectorAll('.ibexa-commerce-accordion__navigation-label').forEach((navigation) => {
                    navigation.addEventListener('click', this.toggle, false);
                });
            });
        }

        toggle(event) {
            event.preventDefault();

            const container = event.currentTarget.closest('.ibexa-commerce-accordion');
            const { targetSelector } = event.currentTarget.dataset;
            const actionNode = container.querySelector(targetSelector);

            actionNode.classList.toggle('ibexa-commerce-accordion__navigation-content--expanded');
        }

        init(accordionSelector) {
            this.accordionNodes = doc.querySelectorAll(accordionSelector);

            this.attachEvents();
        }
    }

    addConfig('eshop.widgets.Accordion', Accordion);
})(window, window.document, window.ibexa);
