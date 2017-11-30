export const cardHolderUppercase = (e: KeyboardEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (e.which === 8) {
        return;
    }
    setTimeout(() => {
        target.value = value.toUpperCase();
    });
};
