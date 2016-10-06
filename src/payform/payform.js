(function () {
    this.payformClose = () => {
        this.parent.postMessage('payform-close', '*');
    };

}).call(window || {});
