import { MainProperty } from "./MainProperty";
import { LocalStorageController } from "../services/LocalStorageController";

export class SearchGrid {
    constructor(propertiesList, elementContainer, order) {
        this.propertiesList = propertiesList;
        this.elementContainer = elementContainer;
        this.order = order;
        this.mainProperty = new MainProperty();
        this.LocalStorageController = new LocalStorageController();
        this.containerHtmlMarkUp = 
            `
                <div class="listContainer">
                    <div class="listContainer__allProperties">
                    </div>
                    <div class="listContainer_selectedProperty">
                    </div>
                </div>
            `;

    }

    initialize =()=> {
        this.propertiesList.sort((a,b) => (a.price_value > b.price_value) ? 1 : ((b.price_value > a.price_value) ? -1 : 0))
        if (this.order === 'des') {
            this.propertiesList = [...this.propertiesList].reverse();
        }
        this.allPropertiesContainer = this.elementContainer.querySelector('.listContainer__allProperties');
        this.savedProperties = this.LocalStorageController.getLocalStorage();
        for (const [index, property] of this.propertiesList.entries()) {
            this.formatValue = this.mainProperty.formatValue(property.price_value)
            this.buildListElement = 
                `
                    <div id="${index}" class="property-item">
                        <div class="property-item__intro">
                            <p>Situated in: ${property.town}  ${property.postcode} - £${this.formatValue}</p>
                            <p>Type of property: ${property.property_type} with ${property.bedrooms} bedroom${property.bedrooms > 1 ? 's' : ''}</p>
                        </div>
                        ${this.imageMissing(property.photos[0])}
                        <div class="property-item__interaction">
                            <div class="property-item__interaction--save">
                                <label for="setsaved" >Save property </label>
                                <input type="checkbox" name="setsaved" value="${property.property_id}" ${this.savedProperties.includes(property.property_id) ? 'checked' : ''}>
                            </div>
                            <button id="${index}" class="viewDetails">View More Information</button>
                        <div/>
                    </div>
                `;
            this.allPropertiesContainer.innerHTML += this.buildListElement;
        }
        this.addListeners();
        this.elementContainer.querySelector('.listContainer_selectedProperty').innerHTML =
            this.mainProperty.showSelectedProperty(this.propertiesList[0]);
    }

    addListeners =()=> {

        this.propertyItem = this.elementContainer.querySelectorAll('.viewDetails');
        this.saveButtom = this.elementContainer.querySelectorAll('input[name="setsaved"]');

        this.propertyItem.forEach(button => {
            button.addEventListener('click', (e)=> {

                this.selectedPropertyContainer = 
                    this.elementContainer.querySelector('.listContainer_selectedProperty');

                this.selectedPropertyContainer.innerHTML = 
                    this.mainProperty.showSelectedProperty(this.propertiesList[e.target.id]);
            })
        });

        this.saveButtom.forEach(button => {
            button.addEventListener('change', (e)=> {
                if (e.target.checked) {
                    this.LocalStorageController.updateLocalStorage(e.target.value);
                } else {
                    this.LocalStorageController.deleteItemSessionStorage(e.target.value);
                }
            })
        })
    }

    imageMissing =(img)=> {
        if (img == null) {
            return `<div class="property-item__no-img"></div>`
        }

        return `<img src="https://mr1.homeflow.co.uk/${img}" />`
    }
}