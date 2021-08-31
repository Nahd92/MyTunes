/* === VARIABLES   ==== */
const toggle = document.getElementById("sidebar-toggle"),
sidebarItems = document.getElementById("sidebar-items");

const menuToggle = document.getElementById("nav-toggle"),
menu = document.getElementById("nav-menu");

const sidebar = document.querySelector('.sidebar')
const sidebarArrow = document.querySelector('.sidebar__arrow')
const arrowleft = document.getElementById("arrow-left");

const searchIcon = document.getElementById("nav-search"),
		 searchContainer = document.getElementById("search"),
			searchSection = document.getElementById("search-section");

const searchInput = document.getElementById('search-input');
const searchCross = document.getElementById("cross-icon");
const form = document.getElementById('add-track');


/* === STORED VALUES  ==== */
const artists = document.querySelectorAll(".name");
const genres = document.querySelectorAll(".genre");

/* === FUNCTIONS  ==== */

/* === SIDEBAR   ==== */
function showSidebar() {
	if(toggle && sidebarItems) {
		sidebarItems.classList.toggle('show-sidebar')
	}
}


/* === SEARCH   ==== */
function closeSearchContainer() {
	searchContainer.classList.toggle('active')
	searchSection.classList.toggle('active');
}

function removeSearchIconAndShowInput() {
	searchInput.classList.toggle('active')
}

function openSearchContainer() {
	searchContainer.classList.add('active');
	searchSection.classList.add('active');

}




function checkIfSearchWordExist(e) {
	const noResult = document.querySelector('.noResultAfterSearch');
	const trackCard = Array.from(document.querySelectorAll('.track-card .name'));


	let fetchedArtistName = trackCard.filter(a => a.innerHTML.toLowerCase() === e.target.value.toLowerCase());

		for (let i = 0; i <= fetchedArtistName.length; i++) {
			const a = fetchedArtistName[i];

			if(fetchedArtistName.length > 0){
				let superParent = a.parentElement.parentElement;
				let parents = a.parentElement;
	
				console.log(a.innerHTML);
				const img = superParent.children[0].getAttribute('src');
				const overlay = superParent.children[1].textContent;
				
				const artistName = parents.children[1].textContent;
				const genreName = parents.children[3].textContent;
				const releaseYear = parents.children[5].textContent;
				const albumName = parents.children[7].textContent;
				
				console.log(parents.children[1].textContent);
				console.log(genreName);
				console.log(releaseYear);
				console.log(parents.children[7].textContent);
			  createCard("search", "search-container", artistName, genreName,releaseYear,albumName, img, overlay)
			}
			else {
				noResult.innerHTML = "No track in list";
			}
		}
}




/* === MENU   ==== */
function showMenu() {
	if(menuToggle && menu) {
		menu.classList.toggle("show-menu")
	}
}

/* === SIDEBAR   ==== */
function sidebarSwapColor(yAxis) {
	console.log(yAxis);
	if(yAxis >= 570 && !(yAxis >= 6550 && yAxis <= 7200)) {
		sidebar.classList.add('active')
		sidebarArrow.classList.add('active')
		arrowleft.classList.add('active')
		sidebarItems.classList.add('active')	
	} else {
		sidebar.classList.remove('active')
		sidebarArrow.classList.remove('active')
		arrowleft.classList.remove('active')
	}
}
function swapArrows() {	
	if(toggle && sidebarItems) {
		sidebarArrow.classList.toggle('swapped-right-arrow')
		arrowleft.classList.toggle('swapped-left-arrow')
	}
}
function sidebarMoveWithHiddenContainer() {
	if(toggle && sidebarItems) {
		sidebar.classList.toggle('active-move')
		sidebarArrow.classList.toggle('active-move-arrow')
	}
}

/* === CREATE ELEMENT   ==== */

function createCard(section, container, artist, artistGenre, 
	releasedYear, album, imageFilename, trackFilename) {

	const cardClassName	= "track-card";
	const newTracksSection = document.querySelector(`.${section}`)
	newTracksSection.classList.add('section');
	const newtrackcontainer = document.querySelector(`.${container}`)

	let card = document.createElement('div');
	card.className = cardClassName

	let overlay = createTrackAndOverlayInfo(trackFilename);
	const artistInfo = createArtistInfo(artist);
	const genreInfo = createGenreInfo(artistGenre);
	const releaseInfo = createReleaseInfo(releasedYear);
	const albumInfo = createAlbumnInfo(album);
	const cardInfo = createCardInfo()
	const image = createImgElement(imageFilename);

	newTracksSection.appendChild(newtrackcontainer);
	newtrackcontainer.appendChild(card)
	card.appendChild(image)
	card.appendChild(overlay);
	card.appendChild(cardInfo);

	cardInfo.appendChild(artistInfo[0])
	cardInfo.appendChild(artistInfo[1])
	cardInfo.appendChild(genreInfo[0])
	cardInfo.appendChild(genreInfo[1])
	cardInfo.appendChild(releaseInfo[0])
	cardInfo.appendChild(releaseInfo[1])
	cardInfo.appendChild(albumInfo[0])
	cardInfo.appendChild(albumInfo[1])
}

function createTrackAndOverlayInfo(trckFile) {
	const trackfileNameClassName = "audio";
	const overlayClassName = "track-overlay";
	
	let overlay = document.createElement('div');
	overlay.className = overlayClassName;

	let trackFile = document.createElement('audio');
	trackFile.setAttribute('src', `${trckFile}`);
	trackFile.classList = trackfileNameClassName
	trackFile.controls = true;

	 overlay.appendChild(trackFile)
	 return overlay;
}

function createImgElement(imgFile) {	
	const imageFileNameClassName = "track-cover";
	let imageFile = document.createElement('img')
	imageFile.setAttribute('src', `${imgFile}`);
	imageFile.classList = imageFileNameClassName
	return imageFile;
}


function createArtistInfo(artistName){
	const artistClassName = "artists-name";

	let title =document.createElement('h4');
	title.className = artistClassName;
	title.innerHTML = 'Artist:' 
	let aName = document.createElement('p');
	aName.innerHTML = artistName
	aName.className = "name"

	return [title, aName];
}
function createGenreInfo(genreName){
	const artistClassGenreName = "artist__genre";
	
	let genre = document.createElement('h4');
	genre.className = artistClassGenreName;
	genre.innerHTML =  'Genre:';
	let gName = document.createElement('p');
	gName.innerHTML = genreName
	gName.className = "genre"


	return [genre, gName];
}
function createReleaseInfo(releaseName){
	const artistClassReleaseName = "artist__release";
	
	let released = document.createElement('h4');
	released.classList = artistClassReleaseName
	released.innerHTML =  'Release year:';
	let releasedYear = document.createElement('p');
	releasedYear.innerHTML = releaseName
	releasedYear.className = "released";
	


	return [released, releasedYear];
}
function createAlbumnInfo(albumName){
	const artistClassAlbumName = "artist__album";

	let recentAlbum = document.createElement('h4');
	recentAlbum.className = artistClassAlbumName; 
	recentAlbum.innerHTML =  'Recent Album:';
	let theAlbumName = document.createElement('p');
	theAlbumName.innerHTML = albumName
	theAlbumName.className = "recentAlbum"



	return [recentAlbum, theAlbumName];
}

function createCardInfo() {
	const cardInformation = "card-info";

	const cardInfo = document.createElement('div');
	cardInfo.className = cardInformation

	return cardInfo;
}


function formValuesOnSubmitAndCreateCard() {
	const artistInput = form.elements["artist"].value;
	const genreInput = form.elements["genre"].value;
	const release = form.elements["release"].value;
	const recentAlbum = form.elements["recent-album"].value;
	const profileImg = document.querySelector('input.upload-img-btn').files[0];
    const profileAud = document.querySelector('input.upload-file-btn').files[0];
	
	const trackCoverImgURL = URL.createObjectURL(profileImg);
	const trackFileAudioURL = URL.createObjectURL(profileAud);

	createCard("added-tracks", "addded-tracks-container" ,artistInput, genreInput,release, recentAlbum, trackCoverImgURL, trackFileAudioURL);
}


function clearSearchInputField() {
	searchInput.value = '';
}

function removeAllCardsInSearchContainer() {
	const firstChild = searchContainer.firstElementChild;
	searchContainer.innerHTML = '';
	searchContainer.append(firstChild);
}


/* === EVENT LISTNERS  ==== */
window.addEventListener('scroll', () => {
	let top = window.scrollY;
	sidebarSwapColor(top);
});

toggle.addEventListener('click', () => {
	showSidebar();
	sidebarMoveWithHiddenContainer();
	swapArrows();
});

menuToggle.addEventListener('click', () => {
	showMenu()

});

searchIcon.addEventListener('click', () => {
	removeSearchIconAndShowInput()
});

searchInput.addEventListener('change',  (e) => {
	checkIfSearchWordExist(e);
}) 

searchInput.addEventListener('keyup',  (e) => {
	if(e.key === 'Enter'){
	openSearchContainer(e);
	clearSearchInputField();
	}
}) 


searchCross.addEventListener('click', () => {
	removeAllCardsInSearchContainer();
	closeSearchContainer()
});



form.addEventListener("submit", function(e) {
	e.preventDefault();
	formValuesOnSubmitAndCreateCard()
})
