export interface EbayListing {
  listing_id: string;
  sku: string;
  condition_id: string;
  product_id: string;
  title: string;
  price: number;
  listing_qty: number;
  inventory_qty: number;
}

export class EbayListings {
  static render(ebayListings: EbayListing[]): HTMLElement {
    const section = document.createElement('section');
    section.className = 'ebay-listings';

    const container = document.createElement('div');
    container.className = 'ebay-listings__container';

    const header = document.createElement('div');
    header.className = 'ebay-listings__header';

    const heading = document.createElement('h2');
    heading.className = 'ebay-listings__title';
    heading.textContent = 'List ebay vision listings';

    const description = document.createElement('p');
    description.className = 'ebay-listings__count';
    description.textContent = `53`;

    header.appendChild(heading);
    header.appendChild(description);

    const table = document.createElement('table');
    table.className = 'ebay-listings__table';

    const thead = document.createElement('thead');
    thead.className = 'ebay-listings__thead';
    thead.innerHTML = `
      <tr class="ebay-listings__row">
        <th class="ebay-listings__header-cell ebay-listings__header-cell--id">Listing ID</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--sku">SKU</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--condition-id">condition_id</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--product-id">product_id</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--title">Title</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--price">Price</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--listing-qty">Listing_qty</th>
        <th class="ebay-listings__header-cell ebay-listings__header-cell--inventory-qty">Inventory_qty</th>
      </tr>
    `;

    const tbody = document.createElement('tbody');
    tbody.className = 'ebay-listings__tbody';
    ebayListings.forEach(listing => {
      const row = document.createElement('tr');
      row.className = 'ebay-listings__row';
      row.innerHTML = `
        <td class="ebay-listings__cell ebay-listings__cell--id">${listing.listing_id}</td>
        <td class="ebay-listings__cell ebay-listings__cell--sku">${listing.sku}</td>
        <td class="ebay-listings__cell ebay-listings__cell--condition-id">${listing.condition_id}</td>
        <td class="ebay-listings__cell ebay-listings__cell--product-id">${listing.product_id}</td>
        <td class="ebay-listings__cell ebay-listings__cell--title">${listing.title}</td>
        <td class="ebay-listings__cell ebay-listings__cell--price">
          <span class="ebay-listings__price">${listing.price.toFixed(2)}</span>
        </td>
        <td class="ebay-listings__cell ebay-listings__cell--listing-qty">${listing.listing_qty}</td>
        <td class="ebay-listings__cell ebay-listings__cell--inventory-qty">${listing.inventory_qty}</td>
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