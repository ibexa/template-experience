import BaseAIAssistantComponent from './base.ai.assistant.component';
import Textarea from '../../../../ui-dev/src/modules/ai-assistant/fields/textarea/textarea';

export default class ImgToText extends BaseAIAssistantComponent {
    constructor(mainElement, extraConfig) {
        super(mainElement, extraConfig);

        this.imageQuality = this.aiConfig.options.image_quality;
        this.maxSize = this.aiConfig.options.image_max_size;

        this.replacedField = Textarea;
    }

    getScale(img) {
        if (!this.maxSize) {
            return 1;
        }

        const widthScale = this.maxSize.width / img.width;
        const heightScale = this.maxSize.height / img.height;

        return Math.min(widthScale, heightScale, 1);
    }

    getBase64Image(img) {
        const canvas = document.createElement('canvas');
        const scale = this.getScale(img);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/jpeg', this.imageQuality);

        canvas.remove();

        return dataURL;
    }

    getImgInput() {
        if (this.tempImageElement.src.indexOf('data:image') === 0) {
            return this.tempImageElement.src;
        }

        return this.getBase64Image(this.tempImageElement);
    }

    initTempImage() {
        this.tempImageElement = document.createElement('img');

        this.tempImageElement.src = this.inputElement.src;
        this.tempImageElement.style.maxWidth = 'initial';
        this.tempImageElement.style.width = 'initial';
        this.tempImageElement.style.height = 'initial';
        this.tempImageElement.style.display = 'none';

        this.container.append(this.tempImageElement);
    }

    initImageObserver() {
        const observerConfig = {
            attributes: true,
            attributeFilter: ['src'],
        };

        this.imageObserver = new MutationObserver(() => {
            this.tempImageElement.remove();
            this.initTempImage();
        });

        this.imageObserver.observe(this.inputElement, observerConfig);
    }

    getInputValue() {
        return this.getImgInput();
    }

    // eslint-disable-next-line no-unused-vars
    getResponseValue(response) {}

    getRequestBody() {}

    handleAIDialogConfirm(responseText) {
        this.outputElement.value = responseText;
        this.outputElement.dispatchEvent(new Event('input'));

        super.handleAIDialogClose(responseText);
    }

    init() {
        super.init();

        this.initTempImage();
        this.initImageObserver();
    }
}
