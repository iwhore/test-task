export function renderHeader(productId: string): HTMLElement {
    const header = document.createElement('header');
    header.className = 'header container';
    
    header.innerHTML = `
        <div class="header__title-group">
            <h2 class="header__project-id">${productId}</h2>
            <button class="header__edit-button">
                <img class="header__icon_edit" src="./img/png/edit.png" alt="Edit">
                Edit
            </button>
        </div>
        <div class="header__controls">
            <img class="header__control-icon" src="./img/png/arrow-left.png" alt="left">
            <img class="header__control-icon" src="./img/png/arrow-right.png" alt="right">
            <img class="header__control-icon" src="./img/png/expand.png" alt="expand">
            <img class="header__control-icon" src="./img/png/close.png" alt="close">
        </div>
    `;

    return header;
}