interface LocationItem {
  id: string;
  brand: string;
  category: string;
  device_pn: string;
  qty: number;
  condition: string;
  edit_user: string;
  notes: string;
}

export class LocationList {
  static render(locationItems: LocationItem[]): HTMLElement {
    const section = document.createElement('section');
    section.className = 'location-list ';
    
    // Main container div
    const container = document.createElement('div');
    container.className = 'location-list__container';

    // Location header
    const header = document.createElement('div');
    header.className = 'location-list__header';
    
    const heading = document.createElement('h2');
    heading.className = 'location-list__title';
    heading.textContent = `List Location`;
    
    const description = document.createElement('p');
    description.className = 'location-list__count';
    description.textContent = `${locationItems.length}`;
    
    header.appendChild(heading);
    header.appendChild(description);
    
    // Table head
    const thead = document.createElement('thead');
    thead.className = 'location-list__thead';
    thead.innerHTML = `
      <tr class="location-list__row">
        <th class="location-list__header-cell location-list__header-cell--id">ID</th>
        <th class="location-list__header-cell location-list__header-cell--brand">Brand</th>
        <th class="location-list__header-cell location-list__header-cell--category">Category</th>
        <th class="location-list__header-cell location-list__header-cell--device-pn">Device P/N</th>
        <th class="location-list__header-cell location-list__header-cell--qty">Qty</th>
        <th class="location-list__header-cell location-list__header-cell--condition">Condition</th>
        <th class="location-list__header-cell location-list__header-cell--edit-user">Edit User</th>
        <th class="location-list__header-cell location-list__header-cell--notes">Notes</th>
      </tr>
    `;
    
    // Table body
    const tbody = document.createElement('tbody');
    const imgUrl = 
    tbody.className = 'location-list__tbody';
    locationItems.forEach(item => {
      const row = document.createElement('tr');
      row.className = 'location-list__row';
      row.innerHTML = `
        <td class="location-list__cell location-list__cell--id">${item.id}</td>
        <td class="location-list__cell location-list__cell--brand">${item.brand}</td>
        <td class="location-list__cell location-list__cell--category">${item.category}</td>
        <td class="location-list__cell location-list__cell--device-pn">${item.device_pn}</td>
        <td class="location-list__cell location-list__cell--qty">${item.qty}</td>
        <td class="location-list__cell location-list__cell--condition">${item.condition}</td>
        <td class="location-list__cell location-list__cell--edit-user">${item.edit_user}</td>
        <td class="location-list__cell location-list__cell--notes">${item.notes || '-'}  <img class="location-list__icon" src="./img/png/circle-arrow.png" alt="Product" class="location-list__img"></td>
      `;
      tbody.appendChild(row);
    });
    
    // Table element
    const table = document.createElement('table');
    table.className = 'location-list__table';
    table.appendChild(thead);
    table.appendChild(tbody);
    
    // Assemble the structure
    container.appendChild(header);
    container.appendChild(table);
    section.appendChild(container);
    
    return section;
  }
}