/* === VARIABLES   ==== */
const toggle = document.getElementById("sidebar-toggle"),
sidebarItems = document.getElementById("sidebar-items");

const menuToggle = document.getElementById("nav-toggle"),
menu = document.getElementById("nav-menu");

const sidebar = document.querySelector('.sidebar')
const sidebarArrow = document.querySelector('.sidebar__arrow')
const arrowleft = document.getElementById("arrow-left");

const searchIcon = document.getElementById("nav-search"),
		 searchContainer = document.querySelector(".search-container"),
			searchSection = document.getElementById("search-section");

const searchInput = document.getElementById('search-input');
const searchCross = document.getElementById("cross-icon");
const form = document.getElementById('add-track');

const editButtons = Array.from(document.querySelectorAll('.edit-btn'))
const removeButtons = Array.from(document.querySelectorAll('.remove-btn'))
const changeBtn = Array.from(document.querySelectorAll('.change-btn'));


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
	const trackCard = Array.from(document.querySelectorAll('.track-card .name'));
	let fetchedArtistName = trackCard.filter(a => a.innerHTML.toLowerCase() === e.target.value.toLowerCase());

		for (let i = 0; i <= fetchedArtistName.length; i++) {
			const a = fetchedArtistName[i];
			if(fetchedArtistName.length > 0){
				let superParent = a.parentElement.parentElement;
				let parents = a.parentElement;

				const img = superParent.children[0].getAttribute('src');
				const overlay = superParent.children[1].children[0].getAttribute('src');
				
				const artistName = parents.children[1].textContent;
				const genreName = parents.children[3].textContent;
				const releaseYear = parents.children[5].textContent;
				const albumName = parents.children[7].textContent;


				createCard(superParent.id, "search", "search-container", artistName, genreName,releaseYear,albumName, img, overlay)
			}
			else {
				const createDiv = document.createElement('div');
				createDiv.innerHTML = "No tracks were found"; 
				createDiv.setAttribute('style', 'margin-top: 2em; text-align: center; font-size: 2em;' )
			  	searchContainer.appendChild(createDiv);
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

function createCard(id, section, container, artist, artistGenre, 
	releasedYear, album, imageFilename, trackFilename) {

	const cardClassName	= "track-card";
	const newTracksSection = document.querySelector(`.${section}`)
	newTracksSection.classList.add('section');
	const newtrackcontainer = document.querySelector(`.${container}`)

	let card = document.createElement('div');
	card.className = cardClassName
	card.id = id;

	let overlay = createTrackAndOverlayInfo(trackFilename);
	const artistInfo = createArtistInfo(artist);
	const genreInfo = createGenreInfo(artistGenre);
	const releaseInfo = createReleaseInfo(releasedYear);
	const albumInfo = createAlbumnInfo(album);
	const cardInfo = createCardInfo()
	const image = createImgElement(imageFilename);
	const editCardContainer = createEditCardContainer();
	const cardButtons = createCardButtons();
	const editContainer = createContainer();


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

	editContainer.appendChild(editCardContainer);

	card.appendChild(editContainer)
	card.appendChild(cardButtons);
	
}

function createContainer() {
	let container = document.createElement('div');
	container.className = "edit-card-container";
	return container;
}

function createEditCardContainer() {
	let editCards = document.createElement('div');
	editCards.className = "edit-cards";

	let editArtistName = document.createElement('h4')
	editArtistName.className = "edit-artistname";
	editArtistName.innerHTML = 'Change Artist:'
	let editArtistInput = document.createElement('input')
	editArtistInput.className = "edit-artist-name"
	editArtistInput.setAttribute('type', 'text')
	
	let editGenre = document.createElement('h4')
	editGenre.className = "edit-artistname";
	editGenre.innerHTML = 'Change Genre:'
	let editArtistGenreInput = document.createElement('input')
	editArtistGenreInput.className = "edit-artist-genre"
	editArtistGenreInput.setAttribute('type', 'text')


	let editArtistRelease = document.createElement('h4')
	editArtistRelease.className = "edit-artistname";
	editArtistRelease.innerHTML = 'Change: release:'
	
	let editArtistReleaseInput = document.createElement('input')
	editArtistReleaseInput.className = "edit-artist-release"
	editArtistReleaseInput.setAttribute('type', 'text')

	let editArtistAlbum = document.createElement('h4')
	editArtistAlbum.className = "edit-artistname";
	editArtistAlbum.innerHTML = 'Change: album:'
	let editArtistAlbumInput = document.createElement('input')
	editArtistAlbumInput.className = "edit-artist-album"
	editArtistAlbumInput.setAttribute('type', 'text')

	editCards.appendChild(editArtistName)
	editCards.appendChild(editArtistInput)
	editCards.appendChild(editGenre)
	editCards.appendChild(editArtistGenreInput)
	editCards.appendChild(editArtistRelease)
	editCards.appendChild(editArtistReleaseInput)
	editCards.appendChild(editArtistAlbum)
	editCards.appendChild(editArtistAlbumInput)

	return editCards;
}

function createCardButtons() {
	const cardButton = document.createElement('div')
	cardButton.className = "card-buttons"

	const removeAref = document.createElement('a')
	removeAref.className = "remove-btn track-button";
	removeAref.setAttribute("href", "#")
	removeAref.textContent = "Remove"

	removeAref.addEventListener('click', (e) => {
		e.preventDefault();
		removeACard(e);
	})


	
	const editAref = document.createElement('a')
	editAref.className = "edit-btn track-button"
	editAref.setAttribute("href", "#")
	editAref.textContent = "Edit"
	
	editAref.addEventListener('click', (event) => {
		event.preventDefault();
		removeEditButtonOnClick(event);
		addChangeButtonOnClick(event);
		editACard(event);
	})


	const changeAref = document.createElement('a')
	changeAref.className = "change-btn track-button";
	changeAref.setAttribute("href", "#")
	changeAref.textContent = "Change Values"
	changeAref.addEventListener('click', (e) => {
		e.preventDefault();
		editACard(e);
		removeEditButtonOnClick(e);
		addChangeButtonOnClick(e);
		acceptChanges(e);
	})


	cardButton.appendChild(removeAref)
	cardButton.appendChild(editAref)
	cardButton.appendChild(changeAref)
	
	return cardButton;
}

function createTrackAndOverlayInfo(trckFile) {
	const trackfileNameClassName = "audio";
	const overlayClassName = "track-overlay";
	
	let overlay = document.createElement('div');
	overlay.className = overlayClassName;

	let trackFile = document.createElement('audio');
	trackFile.setAttribute('src', `${trckFile}`);
	trackFile.className = trackfileNameClassName
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


function formValuesOnSubmitAndCreateCard(e) {
	const artistInput = form.elements["artist"].value;
	const genreInput = form.elements["genre"].value;
	const release = form.elements["release"].value;
	const recentAlbum = form.elements["recent-album"].value;
	const profileImg = document.querySelector('input.upload-img-btn').files[0];
    const profileAud = document.querySelector('input.upload-file-btn').files[0];
	
	const trackCoverImgURL = URL.createObjectURL(profileImg);
	const trackFileAudioURL = URL.createObjectURL(profileAud);

	createCard(e ,"added-tracks", "addded-tracks-container" ,artistInput, genreInput,release, recentAlbum, trackCoverImgURL, trackFileAudioURL);
}


function clearSearchInputField() {
	searchInput.value = '';
}

function removeAllCardsInSearchContainer() {
	searchContainer.innerHTML = '';
}


function removeACard(event) {
	console.log(event)
	let parentsParent = event.target.parentElement.parentElement;
	parentsParent.parentNode.removeChild(parentsParent);  
}



function editACard(event) {
	let parentsParent = event.target.parentElement.parentElement;

	let editCards= parentsParent.children[3];
	editCards.classList.toggle('active')
}

function acceptChanges(event) {
	let parentsParent = event.target.parentElement.parentElement;
	console.log(parentsParent)
	let cardInfo = parentsParent.children[2];
	let editCards= parentsParent.children[3].children[0];
	console.log(editCards)

		
	cardInfo.children[1].innerHTML = editCards.children[1].value;
	cardInfo.children[3].innerHTML =  editCards.children[3].value;
	cardInfo.children[5].innerHTML =   editCards.children[5].value;
	cardInfo.children[7].innerHTML =  editCards.children[7].value;
}

function removeEditButtonOnClick(e) {
	console.log(e)
	const parentsParent = e.target.parentElement.parentNode.id;
	console.log(parentsParent)
	const getCardTrackWithId = document.getElementById(parentsParent);

	console.log(getCardTrackWithId)
	const editButton = getCardTrackWithId.children[4].children[1]
	editButton.classList.toggle('active');
}

function addChangeButtonOnClick(e) {
	const parentsParent = e.target.parentElement.parentNode.id;
	const getCardTrackWithId = document.getElementById(parentsParent);
	const changeButton = getCardTrackWithId.children[4].children[2]
	changeButton.classList.toggle('active');
}




/* === EVENT LISTNERS  ==== */
window.addEventListener('scroll', () => {
	let top = window.scrollY;
	let width = window.scrollX;
	sidebarSwapColor(top,width);
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
	removeAllCardsInSearchContainer();
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



for (let i = 0; i < editButtons.length; i++) {
	const element = editButtons[i];
	element.addEventListener('click', function(event)  {
		event.preventDefault();
		removeEditButtonOnClick(event);
		addChangeButtonOnClick(event);
		editACard(event);
	})
}


for (let i = 0; i < removeButtons.length; i++) {
	const element = removeButtons[i];
	element.addEventListener('click', (e) => {
		e.preventDefault();
	removeACard(e)
})
}

for (let i = 0; i < changeBtn.length; i++) {
	const element = changeBtn[i];
	element.addEventListener('click', (e) => {
		e.preventDefault();
		editACard(e);
		removeEditButtonOnClick(e);
		addChangeButtonOnClick(e);
		acceptChanges(e);
	})
}
