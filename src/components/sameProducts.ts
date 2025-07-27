export interface SameProduct {
  original_id: string;
  same_id: string;
  fk_edit_employee: string;
}

export class SameProducts {
  static render(sameProducts: SameProduct[]): HTMLElement {
    const section = document.createElement('section');
    section.className = 'same-products';

    const container = document.createElement('div');
    container.className = 'same-products__container';

    const header = document.createElement('div');
    header.className = 'same-products__header';

    const heading = document.createElement('h2');
    heading.className = 'same-products__title';
    heading.textContent = 'Same Products';

    const description = document.createElement('p');
    description.className = 'same-products__count';
    description.textContent = `${sameProducts.length}`;

    header.appendChild(heading);
    header.appendChild(description);

    const table = document.createElement('table');
    table.className = 'same-products__table';

    const thead = document.createElement('thead');
    thead.className = 'same-products__thead';
    thead.innerHTML = `
      <tr class="same-products__row">
        <th class="same-products__header-cell same-products__header-cell--original">Original_id</th>
        <th class="same-products__header-cell same-products__header-cell--same">Same_id</th>
        <th class="same-products__header-cell same-products__header-cell--employee">Fk_edit_employee</th>

      </tr>
    `;

    const tbody = document.createElement('tbody');
    tbody.className = 'same-products__tbody';
    sameProducts.forEach(product => {
      const row = document.createElement('tr');
      row.className = 'same-products__row';
      row.innerHTML = `
        <td class="same-products__cell same-products__cell--original">
          <span class="same-products__id">${product.original_id}</span>
        </td>
        <td class="same-products__cell same-products__cell--same">
          <span class="same-products__id">${product.same_id}</span>
        </td>
        <td class="same-products__cell same-products__cell--employee">${product.fk_edit_employee} <img class="same-products__icon" src="./img/png/circle-arrow.png" alt="View"></td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(header);
    container.appendChild(table);
    section.appendChild(container);

    return section;
  }
}