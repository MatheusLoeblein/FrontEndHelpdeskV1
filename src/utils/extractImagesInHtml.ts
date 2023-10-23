import DOMPurify from 'dompurify';

const html ='<p>sadasdasdasdasdsaddasdasdassdsadasdasdasdasdadas</p><p><img src="https://i.ibb.co/9bWJht3/IMG-20230624-125141-Photo-Room.png"></p>'

function extractImagesAndText(html) {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(sanitizedHtml, 'text/html');
  const imgElements = doc.querySelectorAll('img');

  const imageUrls = Array.from(imgElements).map((img) => img.getAttribute('src'));

  Array.from(imgElements).forEach((img) => img.remove());
  const textWithoutImages = doc.body.innerHTML;

  console.log(imageUrls, textWithoutImages)

  return { imageUrls, textWithoutImages };
}

extractImagesAndText(html)