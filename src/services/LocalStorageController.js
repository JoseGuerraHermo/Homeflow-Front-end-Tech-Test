export class LocalStorageController {
    constructor(){
        
    }

    setLocalStorage =()=> {
        if (localStorage.getItem('savedproperties') === null ) {
            this.localProperties = localStorage.setItem('savedproperties','[]');
        } 
    }

    getLocalStorage =()=> {
        return JSON.parse(localStorage.getItem('savedproperties'));
    }

    updateLocalStorage =(id)=> {
        this.updateProperties = JSON.parse(localStorage.getItem('savedproperties'));
        this.updateProperties.push(Number(id))
        localStorage.setItem('savedproperties', JSON.stringify(this.updateProperties));
    }

    deleteItemSessionStorage =(id)=> {
        this.updateProperties = JSON.parse(localStorage.getItem('savedproperties'));
        this.updateProperties.forEach((savedID, index) => {
            if (savedID == id) {
                this.updateProperties.splice(index, 1)
            }
        });
        localStorage.setItem('savedproperties', JSON.stringify(this.updateProperties));    
    }
}