(function(global, eZ) {
    eZ.EzLandingPageValidator = class EzLandingPageValidator extends eZ.BaseFieldValidator {
        constructor(config) {
            super(config);

            this.pageBuilder = config.pageBuilder;
        }

        /**
         * Validates the input field value
         *
         * @method validateInput
         * @returns {Object}
         * @memberof EzLandingPageValidator
         */
        validateInput() {
            const isValid = this.pageBuilder.validateAllBlocksData();
            const errorMessage = Translator.trans(
                /*@Desc("Some blocks are missing configuration")*/ 'fieldtype.landing_page.missing_proper_configuration.error.message',
                {},
                'page_builder'
            );

            return { isError: !isValid, errorMessage };
        }
    };

    eZ.EzLandingPageLayoutValidator = class EzLandingPageLayoutValidator extends eZ.BaseFieldValidator {
        constructor(config) {
            super(config);

            this.pageBuilder = config.pageBuilder;
        }

        validateLayout() {
            const isValidLayout = this.pageBuilder.validateLayoutData();
            const errorMessage = Translator.trans(
                /*@Desc("The layout of this landing page is no longer available and you cannot publish it. Please select a different layout.")*/ 'layout_selector.error.label',
                {},
                'page_builder'
            );

            return { isError: !isValidLayout, errorMessage };
        }
    };
})(window, window.eZ);
