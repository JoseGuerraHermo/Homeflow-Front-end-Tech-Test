export class SearchForm {
    constructor(elementContainer) {
        this.elementContainer = elementContainer;
        this.order = '';
        this.data = {};
        this.htmlMarkUp = 
            `
                <div class="formContainer">
                    <div class="formContainer__search">
                        <label class="formContainer__search--label">Find properties in:</label>
                        <input type="text" class="formContainer__search--input" placeholder="e.g. Brighton">
                    </div>
                    <div class="formContainer__order">
                        <p class="formContainer__order--title">Sort Prices</p>
                        <input type="radio" id="asc" name="order" value="asc">
                        <label for="asc">Ascending</label>
                        <input type="radio" id="des" name="order" value="des" checked="checked">
                        <label for="des">Descending</label>
                    </div>
                    <div class="formContainer__button">
                        <button class="formContainer__button--btn">Find!</button>
                    </div>
                </div>
            `;
        this.test = this.createSearch();
    }

    initialize =()=> {
        this.searchBtn = this.elementContainer.querySelector('.formContainer__button--btn');
        this.inputSearch = this.elementContainer.querySelector('.formContainer__search--input');
        this.inputOrder = this.elementContainer.querySelectorAll('input[name="order"]');
        this.addListeners();
    }

    addListeners =()=> {
        this.searchBtn.addEventListener('click', () => {
            this.fetchData(this.inputSearch.value);
            for (const radio of this.inputOrder) {
                if(radio.checked) {
                    this.order = radio.value;
                    break;
                }
            };
        });

        //due to the way javascript handles the dom and the events, 
        //we need to reattach the event
        //to allow multiple search
        this.elementContainer.addEventListener('click', (e)=> {
            if (e.target.classList.value === 'formContainer__button--btn') {

                this.inputSearchReset = this.elementContainer.querySelector('.formContainer__search--input');
                this.inputOrderReset = this.elementContainer.querySelectorAll('input[name="order"]');
                this.propertiesAlreadyInDOM = this.elementContainer.querySelector('.listContainer');
                
                if ( this.propertiesAlreadyInDOM !== null) {
                    this.appSelector = document.querySelector('#app');
                    this.appSelector.childNodes.forEach((node, index) => {
                        if (this.appSelector.childNodes[index].className == "listContainer") {
                            this.appSelector.removeChild(this.appSelector.childNodes[index])
                            this.fetchData(this.inputSearchReset.value);
                            for (const radio of this.inputOrderReset) {
                                if(radio.checked) {
                                    this.order = radio.value;
                                    break;
                                }
                            };
                        } 
                    })
                }
            }
        })
    }

    fetchData =(city)=>{
        const url = `/api/properties?location=${city}`;
        fetch(url)
        .then(response => response.json())
        .then((json) => {
          this.triggerDataChange(json, this.order)
        })
        .catch((err) => {
            console.error(err);
        });
    }

    triggerDataChange(data, order) {
      this.data = data.result.properties;
      this.elementContainer.dispatchEvent(new CustomEvent('dataReceived', {
        detail: {
          data: this.data,
          order: this.order
        }
      }));
      
    }

    createSearch =()=> {
        this.container = document.createElement('div');
        this.search = document.createElement('input');
        this.search.classList.add('formContainer__search--input');
        this.button = document.createElement('button');
        this.button.classList.add('formContainer__button--btn');
        this.container.appendChild(this.search)
        this.container.appendChild(this.button)

        return this.container;
    }
}
