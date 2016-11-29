export default class ElementManager {

    constructor(closeButton, spinner, form, checkmark, errorPanel, payButton) {
        this.closeButton = closeButton;
        this.spinner = spinner;
        this.form = form;
        this.checkmark = checkmark;
        this.errorPanel = errorPanel;
        this.payButton = payButton;
    }

    manageError(message) {
        this.spinner.hide();
        this.form.show();
        this.closeButton.show();
        this.errorPanel.show(message);
    }

    managePay() {
        this.spinner.show();
        this.form.hide();
        this.errorPanel.hide();
        this.closeButton.hide();
    }

    manageSuccessPolling() {
        this.spinner.hide();
        this.checkmark.show();
    }
}
