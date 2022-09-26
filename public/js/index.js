// CONFIGURATION TO GIF API
let UserAppId = "";
let scrollCount = 0;
var globalTheme = true;
let activeSearch = "";

///GENERAL FUNCTIONS
//changeTheme : Funcion para cambiar el tema de la pagina
function generateID(){
    getNewUserId().then( response =>{
        let id = response.random_id;
        localStorage.setItem('giphyUserId',id);
    }).catch(error => {
        console.log(error);
    })
}

function changeTheme(theme){
    globalTheme = !globalTheme;
    localStorage.setItem('globalTheme',theme);
    //Nombre de las clases A USAR/REEMPLAZAR
    const btnDay = 'theme-day';
    const btnNight = 'theme-night';
    
    let themeDay = theme ==='day' ? true:false;
    let btnElements;
    let subline;

    if (themeDay){
        btnElements = document.getElementsByClassName(btnNight);
        replaceClases(btnElements,btnNight,btnDay);

        btnSailor = document.getElementsByClassName('bg-night');
        replaceClases(btnSailor,'bg-night','bg-day');

        subline = document.getElementsByClassName('short-underline-night');
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '1';

        let logo = document.getElementById('web-logo');
        logo.src = "assets/gifOF_logo.png";

        let misg = document.getElementById('mis-guifos').classList;
        misg.toggle('hover-day',true);
        misg.toggle('hover-night',false);


        let searchBox = document.getElementsByClassName('box-night');
        replaceClases(searchBox,'box-night','box-day');

    } else {
        btnElements = document.getElementsByClassName(btnDay);
        replaceClases(btnElements,btnDay,btnNight);

        btnSailor = document.getElementsByClassName('bg-day');
        replaceClases(btnSailor,'bg-day','bg-night');

        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-night');
        subline[0].style.opacity = '1';

        let logo = document.getElementById('web-logo');
        logo.src = "assets/gifOF_logo_dark.png";

        let searchBox = document.getElementsByClassName('box-day');
        replaceClases(searchBox,'box-day','box-night');

        let misg = document.getElementById('mis-guifos').classList;
        misg.toggle('hover-day',false);
        misg.toggle('hover-night',true);

    }

}

function getSlug(text){
    let slugs = text.split('-');
    let response = "";
    if (slugs[0]) response += "#"+slugs[0];
    if (slugs[1]) response += " #"+slugs[1];
    if (slugs[2]) response += " #"+slugs[2];
    return response;
}

/// FUNCTION TO GET FROM DB- MOVE TO ANOTHER JSFILE
function getSearchResults(search,limit,offset) {
    getLimitGifs(search,limit,offset).then( response => {
        document.getElementById('trends-title').placeholder = "Ejemplo de búsqueda: "+search;
        document.getElementById('trendings-container').innerHTML = "";
        response.data.forEach(element => {
            var item = document.createElement('div');
            item.className += 'trend-item';
            item.onclick = function() {getSearchResults(slug,12,scrollCount)};
            var img = document.createElement('img');
            img.className = 'img-item';
            img.src = 'https://media.giphy.com/media/'+ element.id +'/giphy.gif';
            img.alt = "..gif-alt";
            var hasht = document.createElement('div');
            let slug = getSlug(element.slug);
            hasht.innerHTML = slug;            
            hasht.className ='text-bar hashtag';
            hasht.className+= globalTheme ? ' theme-day' : ' theme-night';
            item.appendChild(img);
            item.appendChild(hasht);
            document.getElementById('trendings-container').appendChild(item);
            scrollCount +=offset;
        });
    }).catch(error => {
        console.log(error);
    })
}

// GET RANDOM RESULTS OF GYPHY
function getRandomResults() { 
    getRandomGifs().then(response => {
        let item = document.createElement('div');
        item.className += 'suggestion-item pos-relative';
        item.id = response.data.id;
        let header = document.createElement('header');
        header.className = 'text-bar top-bar';
        header.className += globalTheme ? ' theme-day':' theme-night';
        let slug = getSlug(response.data.slug);
        header.innerHTML = slug;
        let closeIcon = document.createElement('img');
        closeIcon.className = 'close-icon';
        closeIcon.src = "./assets/close.svg";
        closeIcon.alt = "Close Window";
        closeIcon.onclick = function(){document.getElementById(response.data.id).remove(); getRandomResults();}
        header.appendChild(closeIcon);
        let img = document.createElement('img');
        img.className = 'img-item';
        img.src = 'https://media.giphy.com/media/'+ response.data.id +'/giphy.gif';
        img.alt = slug;
        let btn = document.createElement('button');
        btn.className = "btn btn-more";
        btn.innerHTML = "Ver más...";
        btn.onclick = function() {getSearchResults(slug,12)};
        item.appendChild(header);
        item.appendChild(img);
        item.appendChild(btn);
        document.getElementById('suggestions-container').appendChild(item);
    }).catch(error => {
        console.log(error);
    })
}

function getTrendingsResults(limit,offset){
    scrollCount +=offset;
    getTrendsGifs(limit,scrollCount).then(response => {
        response.data.forEach( element => {
            let item = document.createElement('div');
            let slug = getSlug(element.slug);
            item.className += 'trend-item';
            item.onclick = function() {
                document.getElementById('suggestions-title').style.display = 'none';
                document.getElementById('suggestions-container').style.display = 'none';
                document.getElementById('trends-title').placeholder = 'Ejemplo de búsqueda: '+slug;
                slug.replace("#","");
                getSearchResults(slug,12,12);
            }
            let img = document.createElement('img');
            img.className = 'img-item';
            img.src = 'https://media.giphy.com/media/'+ element.id +'/giphy.gif';
            img.alt = "..gif-alt";
            let hasht = document.createElement('div');
            hasht.innerHTML = slug;
            hasht.className +='text-bar hashtag';
            hasht.className += globalTheme ? ' theme-day':' theme-night';
            item.appendChild(img);
            item.appendChild(hasht);
            document.getElementById('trendings-container').appendChild(item);
        })
    }).catch(error => {
        console.log(error);
    })
}

//HELPER FUNCTIONS
function changeIcons(themeDay,icons){
    console.log('changingIcons');
};

function replaceClases(array, themeOld, themeNew){
    while(array.length > 0){
        array[0].classList.replace(themeOld,themeNew);
    }
}

/// EVENT LISTENER

document.getElementById('dropdown-buttons').addEventListener('click', function (event) {
    var dropdown = document.getElementById('drop-down');
    var status = dropdown.style.display;
    if (status == 'none'){
        dropdown.style.display="block";
    }
    else {
        dropdown.style.display = "none";
    }
});

document.getElementById('dropdown-buttons').addEventListener('mouseleave', function (event) {
    document.getElementById('drop-down').style.display = "none";
});

async function getSuggestions(inputtext){
    getLimitGifs(inputtext,1,0).then( response => {
        let suggestions = response.data[0].title.split(' ');
        let remove = suggestions.indexOf('GIF');
        if (remove) suggestions.splice(remove,1);
        console.log(suggestions);
        document.getElementById('first-search-button').innerHTML = inputtext;
        document.getElementById('second-search-button').innerHTML = 'Gatos';
        document.getElementById('third-search-button').innerHTML = 'Perros';        
    });
}

document.getElementById('search-input').addEventListener('input',function(event){
    var btnSearch = document.getElementsByClassName('search-btn');
    var inputText = this.value;
    getSuggestions(inputText);
    if (!!inputText){
        if (globalTheme){
            btnSearch[0].classList.replace('none-mode','day-mode');
        } else {
            btnSearch[0].classList.replace('none-mode','night-mode');
        }
        document.getElementsByClassName('subsearch-box')[0].style.display = 'block';
    } else{
        if (globalTheme){
            btnSearch[0].classList.replace('day-mode','none-mode');
        } else {
            btnSearch[0].classList.replace('night-mode','none-mode');
        }        
        document.getElementsByClassName('subsearch-box')[0].style.display = 'none';
    }

});

document.getElementById('search-input').addEventListener('keypress',function(event){
    let keyName = event.key;
    if(keyName == 'Enter'){
        let searchText = document.getElementById('search-input').value;
        document.getElementById('subsearch-box').style.display = 'none';
        getSearchResults(searchText,12,12);
    }
});

document.getElementById('search-action-btn').addEventListener('click', function(event){
    let searchText = document.getElementById('search-input').value;
    document.getElementById('subsearch-box').style.display = 'none';
    getSearchResults(searchText,12,12);
});

document.getElementById('btn-newGif').addEventListener('click', function(event){
    localStorage.setItem('newGif-command','newgif');
    window.location = "user";    
});

// Botones emergentes del buscador
document.getElementById('first-search-button').addEventListener('click',function(){
    let text = document.getElementById('first-search-button').innerHTML;
    getSearchResults(text,12,12);
});

document.getElementById('second-search-button').addEventListener('click',function(){
    let text = document.getElementById('first-search-button').innerHTML;
    getSearchResults(text,12,12);
});

document.getElementById('third-search-button').addEventListener('click',function(){
    let text = document.getElementById('first-search-button').innerHTML;
    getSearchResults(text,12,12);
});

window.addEventListener('scroll',function(event){
    let position = document.getElementById('end-trendings');
    let screen = window.screen.height+window.pageYOffset;
    if( position.offsetTop < screen){
        if (activeSearch){ getSearchResults(activeSearch,12,scrollCount)}
        getTrendingsResults(12,scrollCount);
    }
});

function userNew(){
    let response = true;
    if (localStorage.getItem('giphyUserId')) return false;
    return response;
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    scrollCount = 9;
    let actualTheme = localStorage.getItem('globalTheme');
    if (actualTheme == 'night'){
        changeTheme('night');
    }

    if (userNew()){
        generateID();
    } else{
        UserAppId = localStorage.getItem('giphyUserId');
    }
    for (var i = 0; i < 4; i++){
        getRandomResults();
    }
    getTrendingsResults(12,0);
});


