export class ShowError {
    constructor() {
        this.showErrorHhtmlMarkUp = 
            `
                <div class="error-message">
                    <p>Sorry, we could't find any result.</p>
                    <p>Please refresh and try again:</p>
                    <ul>
                        <li>e.g. Brighton</li>
                        <li>e.g. London</li>
                        <li>e.g. Bristol</li>
                    </ul>
                    <button onClick="window.location.reload();">Refresh Page Here</button>
                </div>
            `;
    }
}