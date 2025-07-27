export class Footer {
  static render(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'footer container';

    const expandBtn = document.createElement('button');
    expandBtn.className = 'footer__expand-btn'
    expandBtn.innerHTML = 'Expand';

    const addBtn = document.createElement('button');
    addBtn.className = 'footer__add-btn'
    addBtn.innerHTML = 'Add';
    footer.append(expandBtn, addBtn);
    return footer;
  }
}