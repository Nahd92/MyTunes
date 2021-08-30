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
const artists = document.getElementsByClassName("artists-name");
const categories = document.getElementsByClassName("artist__genre");

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
	searchContainer.classList.add('active')
	searchSection.classList.add('active');
}

function checkIfSearchWordExist(e) {

	//e.target.value
}





/* === MENU   ==== */
function showMenu() {
	if(menuToggle && menu) {
		menu.classList.toggle("show-menu")
	}
}

/* === SIDEBAR   ==== */
function sidebarSwapColor(yAxis) {
	if(yAxis >= 400 && !(yAxis >= 4400 && yAxis <= 4950)) {
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

function createCard(section, container, artistName, artistGenre, 
	releasedYear, album, imageFilename, trackFilename) {
	const artistClassName = "artists-name";
	const artistClassGenreName = "artist__genre";
	const artistClassReleaseName = "artist__release";
	const artistClassAlbumName = "artist__album";
	const cardClassName	= "track-card";
	const imageFileNameClassName = "track-cover";
	const trackfileNameClassName = "audio";
	const overlayClassName = "track-overlay";
	const trackbuttonClassName = "btn track__button";


	const newTracksSection = document.querySelector(`.${section}`)
	newTracksSection.classList.add('section');
	const newtrackcontainer = document.querySelector(`.${container}`)

	let card = document.createElement('div');
	card.className = cardClassName

	let title = document.createElement('h2');
	title.className = artistClassName;
	title.innerHTML = `Artist: ${artistName}`;

	let genre = document.createElement('h4');
	genre.className = artistClassGenreName;
	genre.innerHTML =  `Genre: ${artistGenre}`;

	let released = document.createElement('h4')
	released.classList = artistClassReleaseName
	released.innerHTML =  `Release year: ${releasedYear}`;

	let recentAlbum = document.createElement('h4')
	recentAlbum.className = artistClassAlbumName; 
	recentAlbum.innerHTML =  `Recent Album: ${album}`;
	
	let imageFile = document.createElement('img')
	imageFile.setAttribute('src', `${imageFilename}`);
	imageFile.classList = imageFileNameClassName

	console.log(imageFile)
	
	let overlay = document.createElement('div');
	overlay.className = overlayClassName;
	let aRef = document.createElement('a')
	aRef.className = trackbuttonClassName;
	aRef.innerText = "Read More!";
	
	
	let trackFile = document.createElement('audio');
	trackFile.setAttribute('src', `${trackFilename}`);
	trackFile.classList = trackfileNameClassName
	trackFile.controls = true;
	
	console.log(trackFile)

	newTracksSection.appendChild(newtrackcontainer);
	newtrackcontainer.appendChild(card)
	card.appendChild(title)
	card.appendChild(genre)
	card.appendChild(released)
	card.appendChild(recentAlbum)
	card.appendChild(imageFile)
	overlay.appendChild(aRef);
	card.appendChild(overlay);
	card.appendChild(trackFile)

	console.log(newtrackcontainer);
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
	console.log(e.target.value);
	checkIfSearchWordExist(e);
}) 

searchInput.addEventListener('keyup',  (e) => {
	if(e.key === 'Enter'){
	openSearchContainer(e);
	createCard("search", "search-container", "Iron Maiden","Heavy metal", 1992,"Heavy", "/Assets/Covers/U2.jpg", "/Assets/Tracks/ambient-atmospheric-4947.mp3")
	}
}) 





searchCross.addEventListener('click', () => {
	closeSearchContainer()
});





form.addEventListener("submit", function(e) {
	e.preventDefault();
	formValuesOnSubmitAndCreateCard()
})
