class ImageGallery {
    constructor(images) {
        this.images = images;
        this.currentIndex = 0;

        this.gallery = document.getElementById("gallery");
        this.lightbox = document.getElementById("lightbox");
        this.lightboxImg = document.getElementById("lightbox-img");
        this.imageName = document.getElementById("image-name");

        this.prevBtn = document.getElementById("prev");
        this.nextBtn = document.getElementById("next");
        this.closeBtn = document.getElementById("close");

        this.renderImages();
        this.addEvents();
    }

    renderImages() {
        this.images.forEach((imgObj, index) => {
            const img = document.createElement("img");
            img.src = imgObj.src;
            img.classList.add("gallery-img");

            
            img.addEventListener("click", () => this.openLightbox(index));

            this.gallery.appendChild(img);
        });
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.lightbox.style.display = "flex";
        this.updateImage();
    }

    updateImage() {
        this.lightboxImg.src = this.images[this.currentIndex].src;
        this.imageName.textContent = this.images[this.currentIndex].name;
    }

    closeLightbox() {
        this.lightbox.style.display = "none";
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    prevImage() {
        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    handleKeyboard(e) {
        if (this.lightbox.style.display !== "flex") return;

        if (e.key === "ArrowRight") this.nextImage();
        if (e.key === "ArrowLeft") this.prevImage();
        if (e.key === "Escape") this.closeLightbox();
    }

    addEvents() {
        this.prevBtn.addEventListener("click", () => this.prevImage());
        this.nextBtn.addEventListener("click", () => this.nextImage());
        this.closeBtn.addEventListener("click", () => this.closeLightbox());
        document.addEventListener("keydown", (e) => this.handleKeyboard(e));
    }
}

const images = [
    { src: "https://picsum.dev/image/1276/view", name: "AI Building" },
    { src: "https://picsum.dev/image/1181/view", name: "Piano" },
    { src: "https://picsum.dev/image/1186/view", name: "Puppy" },
    { src: "https://picsum.dev/image/1194/view", name: "Sleeping Baby" },
    { src: "https://picsum.dev/image/1198/view", name: "SnowFall" },
    { src: "https://picsum.dev/image/1199/view", name: "Book" },
    { src: "https://picsum.dev/image/1200/view", name: "Coffee" },
    { src: "https://picsum.dev/image/1256/view", name: "Sunrise Balcony" },
    { src: "https://picsum.dev/image/1260/view", name: "Cycle" },
    { src: "https://picsum.dev/image/1267/view", name: "Camera" },
    { src: "https://picsum.dev/image/1264/view", name: "Canvas Painting" },
    { src: "https://picsum.dev/image/1192/view", name: "Candle"}
];

new ImageGallery(images);
