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
    section.className = 'location-section';

    // Заголовок секції з кількістю товарів
    const heading = document.createElement('h2');
    heading.className = 'section-title';
    heading.textContent = `List Location (${locationItems.length})`;

    // Створення таблиці
    const table = document.createElement('table');
    table.className = 'location-table';

    // Заголовки таблиці
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Brand</th>
        <th>Category</th>
        <th>Device P/N</th>
        <th>Qty</th>
        <th>Condition</th>
        <th>Edit User</th>
        <th>Notes</th>
      </tr>
    `;

    // Тіло таблиці
    const tbody = document.createElement('tbody');
    locationItems.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.brand}</td>
        <td>${item.category}</td>
        <td>${item.device_pn}</td>
        <td>${item.qty}</td>
        <td>${item.condition}</td>
        <td>${item.edit_user}</td>
        <td>${item.notes || '-'}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    section.appendChild(heading);
    section.appendChild(table);

    return section;
  }
}