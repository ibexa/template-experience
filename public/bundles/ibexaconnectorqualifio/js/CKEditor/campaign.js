import CampaignDropdownView from './common/campaign-dropdown/campaign.dropdown.js';

(function (global, doc, ibexa) {
    let cachedCampaignList = null;
    let isLoadingCampaigns = false;
    const campaignDropdowns = [];
    const updateCampaignList = (dropdown) => {
        if (cachedCampaignList) {
            dropdown.updateCampaignList(cachedCampaignList);

            return;
        }

        campaignDropdowns.push(dropdown);

        if (isLoadingCampaigns) {
            return;
        }

        isLoadingCampaigns = true;

        const request = new Request('/api/ibexa/v2/qualifio/campaigns', {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.ibexa.api.QualifioCampaignList+json',
            },
            mode: 'same-origin',
            credentials: 'same-origin',
        });

        fetch(request)
            .then(ibexa.helpers.request.getJsonFromResponse)
            .then((response) => {
                const groupedCampaignList = response.QualifioCampaignList.QualifioCampaigns.reduce((grouped, campaign) => {
                    if (!grouped[campaign.website]) {
                        grouped[campaign.website] = [campaign];
                    } else {
                        grouped[campaign.website].push(campaign);
                    }

                    return grouped;
                }, {});

                cachedCampaignList = groupedCampaignList;
                isLoadingCampaigns = false;

                campaignDropdowns.forEach((campaignDropdown) => campaignDropdown.updateCampaignList(cachedCampaignList));
            })
            .catch((error) => {
                campaignDropdowns.forEach((campaignDropdown) => campaignDropdown.showWarning(error));
            });
    };
    const getLabel = (value, campaignList = {}) => {
        const selectedCampaign = Object.values(campaignList)
            .flat()
            .find((campaign) => String(campaign.id) === value);

        return selectedCampaign?.title ?? '';
    };
    const campaignRender = (config, locale) => {
        const campaignDropdown = new CampaignDropdownView({ locale, config });

        updateCampaignList(campaignDropdown);

        return campaignDropdown;
    };
    const campaignSetValue = (attributeView, value) => {
        attributeView.labeledDropdown.fieldView.element.value = value;
        attributeView.labeledDropdown.fieldView.buttonView.set({
            label: getLabel(value, attributeView.campaignList),
            withText: true,
        });
        attributeView.labeledDropdown.set('isEmpty', !value);
    };
    const campaignGetValue = (attributeView) => {
        return `${attributeView.labeledDropdown.fieldView.element.value}`;
    };
    const campaignGetValueLabel = (value) => {
        return getLabel(value, cachedCampaignList);
    };

    ibexa.addConfig('richText.CKEditor.customTags.attributeRenderMethods.campaign', campaignRender, true);
    ibexa.addConfig('richText.CKEditor.customTags.setValueMethods.campaign', campaignSetValue, true);
    ibexa.addConfig('richText.CKEditor.customTags.getValueMethods.campaign', campaignGetValue, true);
    ibexa.addConfig('richText.CKEditor.customTags.getValueLabelMethods.campaign', campaignGetValueLabel, true);
})(window, document, window.ibexa);
