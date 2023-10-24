export function extractImageUrlsAndCleanHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const imgElements = doc.querySelectorAll('img');

  const imageUrls = Array.from(imgElements).map((img) => img.getAttribute('src'));

  // Remove as tags <img> do HTML
  Array.from(imgElements).forEach((img) => img.remove());

  // Obtenha o HTML limpo após a remoção das tags <img>
  const cleanHtml = doc.documentElement.outerHTML;

  return { imageUrls, cleanHtml };
}