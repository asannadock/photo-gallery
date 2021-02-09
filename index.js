// Display photo inside of a 'photos' flexbox container with the given src from the picsum website (https://picsum.photos/id/${photo.id}/100/100)
// and add the alt attribute that will be the title from the photos.json file
function displayPhotos(photos) {
    let photoHtml = photos.map(photo => {
        return `<img class="photo" src='https://picsum.photos/id/${photo.id}/100/100' alt='${photo.title}' title='${photo.title}' />`
    }).join('') // map() gives us an array, therefor we use join('') to make it one unified string
    console.log(photoHtml)
    return `<div class="photos">${photoHtml}</div>`
}
// Load data from photos.json
async function getPhotos() {
    let response = await fetch('photos.json')
    let photos = await response.json()
    return photos
}
// After getting data from the json file we invoke displayPhotos() function inside the 'gallery' container.
// We have a 'selected-photo' image on the top of the container.
// That image is the one we select from the all photos loaded by displayPhotos() function. 
getPhotos().then(photos => {
    document.body.innerHTML = 
    `<div class="gallery">
        <img class="photo" id="selected-photo" src="https://picsum.photos/id/${photos[2].id}/400/400" alt='${photos[2].title}' title='${photos[2].title}' />
        ${displayPhotos(photos)}
    </div>`

    // Create a collection of all images and convert it into an array using built-in Array.from() function
    // - that is we create an array from all photos we have on the page
    let allPhotos = Array.from(document.getElementsByClassName('photo'))
    
    // Now adding 'click' event listener to each photo in the created array
    allPhotos.forEach(eachPhoto => {
        eachPhoto.addEventListener('click', event => {
            // By clicking a photo we'll change the 'selected-photo' image src to the one we clicked on. 
            // So let's store the image src in a variable. In the src we extract the part of the photo url without the image size (100/100).
            // For that we use substr() method that take only the part of the url starting from the first symbol and finishing with the 'id/' 
            // (that is removing the last 7 symbols from the full url (100/100)). 
            // Then we will add to the url another size for the selected (large) photo (400/400).
            let selectedPhotoSrc = `${eachPhoto.src.substr(0, eachPhoto.src.length - 7)}400/400`
            let selectedPhoto = document.getElementById('selected-photo')
            selectedPhoto.src = selectedPhotoSrc
            selectedPhoto.style.display = 'inline'
        })
    })
})