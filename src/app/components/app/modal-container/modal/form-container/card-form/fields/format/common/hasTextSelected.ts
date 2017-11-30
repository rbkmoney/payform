export default function(target: HTMLInputElement) {
    let ref;
    const doc: any = document;
    if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
        return true;
    }
    const result = (typeof doc !== 'undefined' && doc !== null ? (ref = doc.selection) != null ? ref.createRange : void 0 : void 0) != null;
    if (result) {
        if (doc.selection.createRange().text) {
            return true;
        }
    }
    return false;
}
