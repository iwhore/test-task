import { renderHeader } from './components/header';
import { ProductInfo } from './components/productInfo';
import { LocationList } from './components/locationList';
import { EbayListings } from './components/ebayListings';
import { SameProducts } from './components/sameProducts'
import { Footer } from './components/footer'


interface ProductData {
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
  location: Array<{
    id: string;
    brand: string;
    category: string;
    device_pn: string;
    qty: number;
    condition: string;
    edit_user: string;
    notes: string;
  }>;
  ebay_listings: Array<{
    listing_id: string;
    sku: string;
    condition_id: string;
    product_id: string;
    title: string;
    price: number;
    listing_qty: number;
    inventory_qty: number;
  }>;
  same_products: Array<{
    original_id: string;
    same_id: string;
    fk_edit_employee: string;
  }>;
}

async function loadProductData(): Promise<ProductData> {
  const response = await fetch('./data/data.json');
  if (!response.ok) throw new Error('Failed to load product data');
  return await response.json();
}

async function renderAllSections() {
    try {
        // Завантажуємо дані
        const productData = await loadProductData();
        
        // Створюємо або знаходимо контейнер
        const appContainer = document.getElementById('app') || createAppContainer();
        appContainer.innerHTML = '';
        
        // Рендеримо хедер
        appContainer.appendChild(renderHeader(productData.id));
        
        // Рендеримо основну інформацію про продукт
        const productInfo = await ProductInfo.render();
        appContainer.appendChild(productInfo);
        
        appContainer.appendChild(LocationList.render(productData.location));
        appContainer.appendChild(EbayListings.render(productData.ebay_listings));
        appContainer.appendChild(SameProducts.render(productData.same_products));
       appContainer.appendChild(Footer.render());
    } catch (error) {
        handleError(error);
    }
}


function createAppContainer(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);
  return container;
}

function handleError(error: unknown) {
  console.error('Application error:', error);
  const errorElement = document.createElement('div');
  errorElement.className = 'global-error';
  errorElement.textContent = 'Failed to load application. Please refresh the page.';
  document.body.prepend(errorElement);
}

// Запуск додатку
document.addEventListener('DOMContentLoaded', renderAllSections);