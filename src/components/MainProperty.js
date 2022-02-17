export class MainProperty {
    constructor(propertyInfo) {
        this.propertyInfo = propertyInfo
    }

    showSelectedProperty =(propertyData)=> {
        this.propertyData = propertyData;
        this.FeaturesList = this.renderFeatures(this.propertyData.features);
        this.value = this.formatValue(this.propertyData.price_value);
        this.selectedPropertyHtmlMarkup = 
            `
                <div class="main-property">
                    <div class="main-property__intro">
                        <span class="main-property__intro--location">Location: ${this.propertyData.town}, ${this.propertyData.postcode}</span>
                        <span class="main-property__intro--value">£${this.value}</span>
                    </div>
                    <div class="imageGrid">
                        ${this.imageGrid(this.propertyData.photos)}
                    </div>
                    <div class="main-property__description">
                        <h3 class="main-property__description--title">Property Information</h3>
                        <p class="main-property__description--full">${this.propertyData.short_description}</p>
                    </div>
                    <div class="main-property__features">
                        <ul>
                            ${this.FeaturesList}
                        </ul>
                    </div>
                    <div class="main-property__agency">
                        <img src="https://mr1.homeflow.co.uk/${this.propertyData.agency.agency_logo}" />
                        <p class="main-property__agency--branch"> ${this.propertyData.agency.agency_name}, ${this.propertyData.agency.branch.branch_name} </p>
                        <span class="main-property__agency--site"> - visit <a href="${this.propertyData.agency.external_domain}">their website.</a></span>
                    </div>
                </div>
            `;
        return this.selectedPropertyHtmlMarkup;
    }

    renderFeatures =(features)=> {
        if (features.length == 0 ) {
            return `<li>Contact the agency for more information</li>`;
        }
        this.structuredFeatures = features.map(feature => `<li>${feature}</li>`);
        return this.structuredFeatures.join('');
    }

    formatValue =(val)=> val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    imageGrid =(images)=> {
        if (images.length == 0) {
            return `<div class="imageGrid__no-img"></div>`;
        };
        this.allImages = images.map(img => `<img src="https://mr1.homeflow.co.uk/${img}" alt="property" class="imageGrid__image" />`);
        return this.allImages.join('');
    }
}