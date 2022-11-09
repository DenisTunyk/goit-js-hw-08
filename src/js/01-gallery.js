// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

const markup = galleryItems.map(({original, preview, description}) =>
    `
    <a class="gallery__item" style="display: block" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
`).join("");

galleryEl.insertAdjacentHTML("beforeend", markup);

let gallery = new SimpleLightbox('.gallery a',{captions: true, captionSelector: "img", captionsData: "alt", captionDelay: 250, captionPosition: "bottom"});

function onClickGallery(e) {
    e.preventDefault();
    gallery.on('show.simplelightbox', function () {
	    // do something…
    });
}
