export interface ProductData {
  id: string;
  brand: string;
  model_series: string;
  device_pn: string;
  dev_type: string;
  rnk: number;
  min_price: number;
  max_price: number;
  quantity: number;
  ePrq: number;
  eA4q: number;
  sku: string;
  l_user: string;
  category: string;
  e_user: string;
  green_id: string;
  edit_at: string;
  create_at: string;
  amazon_listing_src: string;
  elCcq: number;
  amazq: number;
  notes: string;
  photo_device: string;
  photo_data_plate: string;
}

export class ProductInfo {
  static async loadProductData(): Promise<ProductData> {
    const response = await fetch('./data/data.json');
    if (!response.ok) {
      throw new Error('Failed to load product data');
    }
    return await response.json();
  }

  static createSpecCard(label: string, value: string | number, hasIcon: boolean = false): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'spec-card';
    card.innerHTML = `
      <div class="spec-card__content">
        <p class="spec-card__label">${label}</p>
        <p class="spec-card__value">${value}</p>
        ${hasIcon ? '<img class="spec-card__icon" src="./img/png/circle-arrow.png" alt="" aria-hidden="true">' : ''}
      </div>
    `;
    return card;
  }

  static createLinkedSpecCard(label: string, url: string): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'spec-card spec-card--linked';
    card.innerHTML = `
      <div class="spec-card__content">
        <p class="spec-card__label">${label}</p>
        <div class="spec-card__value">
          <a class="spec-card__external-link" href="${url}" target="_blank" rel="noopener noreferrer">
            <span class="spec-card__link-text">${url}</span>
            <img class="spec-card__icon" src="./img/png/open.png" alt="">
          </a>
        </div>
      </div>
    `;
    return card;
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
      }
      return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'});
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString; // Повертаємо оригінальний рядок у разі помилки
    }
  }

  static formatNumber(num: number): string {
    try {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } catch (e) {
      console.error('Number formatting error:', e);
      return num.toString(); // Повертаємо оригінальне число у разі помилки
    }
  }

  static async render(): Promise<HTMLElement> {
    const container = document.createElement('div');
    container.className = 'product-info-container container';

    try {
      const product = await this.loadProductData();

      // Оновлення заголовка
      const projectIdElement = document.querySelector('.header__project-id');
      if (projectIdElement) {
        projectIdElement.textContent = product.id;
      }

      // Основна секція
      const productSection = document.createElement('div');
      productSection.className = 'product-section';

      // Секції характеристик
      const deviceSpecsContainer = document.createElement('div');
      deviceSpecsContainer.className = 'specs-container';
      
      const metaInfoContainer = document.createElement('div');
      metaInfoContainer.className = 'specs-container';

      // Додавання характеристик
      deviceSpecsContainer.appendChild(this.createSpecCard('Brand', product.brand, true));
      deviceSpecsContainer.appendChild(this.createSpecCard('Model/Series', product.model_series));
      deviceSpecsContainer.appendChild(this.createSpecCard('Device P/N', product.device_pn));
      deviceSpecsContainer.appendChild(this.createSpecCard('Dev. Type', product.dev_type.replace(/,/g, ', ')));
      deviceSpecsContainer.appendChild(this.createSpecCard('RNK', product.rnk));
      deviceSpecsContainer.appendChild(this.createSpecCard('Min Price', `$${product.min_price.toFixed(2)}`));
      deviceSpecsContainer.appendChild(this.createSpecCard('Max Price', `$${product.max_price.toFixed(2)}`));
      deviceSpecsContainer.appendChild(this.createSpecCard('Quantity', this.formatNumber(product.quantity)));
      deviceSpecsContainer.appendChild(this.createSpecCard('EPrq', product.ePrq));
      deviceSpecsContainer.appendChild(this.createSpecCard('EAq', product.eA4q));
      deviceSpecsContainer.appendChild(this.createLinkedSpecCard('photo device', product.photo_device));
      
      metaInfoContainer.appendChild(this.createSpecCard('SKU', product.sku, true));
      metaInfoContainer.appendChild(this.createSpecCard('L-User', product.l_user, true));
      metaInfoContainer.appendChild(this.createSpecCard('Category', product.category, true));
      metaInfoContainer.appendChild(this.createSpecCard('E-User', product.e_user, true));
      metaInfoContainer.appendChild(this.createSpecCard('Green_id', product.green_id));
      metaInfoContainer.appendChild(this.createSpecCard('Edit_at', this.formatDate(product.edit_at)));
      metaInfoContainer.appendChild(this.createSpecCard('Create_at', this.formatDate(product.create_at)));
      metaInfoContainer.appendChild(this.createLinkedSpecCard('Amazon Listing', product.amazon_listing_src));
      metaInfoContainer.appendChild(this.createSpecCard('ELCcq', product.elCcq));
      metaInfoContainer.appendChild(this.createSpecCard('Amazq', product.amazq));
      metaInfoContainer.appendChild(this.createSpecCard('Notes', product.notes || '--------------------'));

      // Галерея
      const gallery = document.createElement('aside');
      gallery.className = 'product-gallery';
      gallery.innerHTML = `
        <div class="product-gallery__grid">
          <figure class="product-gallery__card">
            <figcaption class="product-gallery__caption">Device_photo</figcaption>
            <img class="product-gallery__img" src="./img/device-photo.png" alt="Device photo">
          </figure>
          <figure class="product-gallery__card">
            <figcaption class="product-gallery__caption">Photo_data_plate</figcaption>
            <img class="product-gallery__img" src="./img/device-data.png" alt="Data plate photo">
          </figure>
        </div>
      `;

      // Збираємо всі частини разом
      productSection.appendChild(deviceSpecsContainer);
      productSection.appendChild(metaInfoContainer);
      productSection.appendChild(gallery);
      container.appendChild(productSection);

    } catch (error) {
      console.error('Error loading product data:', error);
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = 'Error loading product data. Please try again later.';
      container.appendChild(errorElement);
    }

    return container;
  }
}