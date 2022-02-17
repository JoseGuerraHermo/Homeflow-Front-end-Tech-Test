import './styles.scss';
import { SearchForm } from './components/SearchForm';
import { SearchGrid } from './components/SearchGrid';
import { ShowError } from './components/ShowError';
import { LocalStorageController } from './services/LocalStorageController';

const appSelector = document.querySelector('#app');
const searchForm = new SearchForm(appSelector);
const localStorageController = new LocalStorageController();

appSelector.innerHTML = searchForm.htmlMarkUp;
searchForm.initialize();
localStorageController.setLocalStorage();


//custom event to send the data from one component to sibling 
// after fetching properties in the selected area / error
appSelector.addEventListener('dataReceived', (e)=>{

  if (appSelector.querySelector('.listContainer')) {
    console.log(appSelector.children)
  }
  
  if (e.detail.data.elements.length === 0) {
    const showError = new ShowError();
    appSelector.innerHTML += showError.showErrorHhtmlMarkUp;
    return;
  }

  const searchGrid = new SearchGrid(e.detail.data.elements, appSelector, e.detail.order);
  appSelector.innerHTML += searchGrid.containerHtmlMarkUp;
  searchGrid.initialize();

});
