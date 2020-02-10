// CONFIGURATION TO GIF API
const apiKey = 'QZKjaiFPDjfLUn7lHzk73ZFkJUrpf5WN';
var globalTheme = true;
// PROMESAS
let getLimitGifs = (search,limit) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit='+ limit);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

///GENERAL FUNCTIONS
//changeTheme : Funcion para cambiar el tema de la pagina
function changeTheme(theme){

    globalTheme = !globalTheme;
    //Nombre de las clases A USAR/REEMPLAZAR
    const btnDay = 'theme-day';
    const btnNight = 'theme-night';
    
    var themeDay = theme ==='day' ? true:false;
    var btnElements;
    if (themeDay){
        btnElements = document.getElementsByClassName(btnNight);
        replaceClases(btnElements,btnNight,btnDay);

        btnSailor = document.getElementsByClassName('bg-night');
        replaceClases(btnSailor,'bg-night','bg-day');

    } else {
        btnElements = document.getElementsByClassName(btnDay);
        replaceClases(btnElements,btnDay,btnNight);

        btnSailor = document.getElementsByClassName('bg-day');
        replaceClases(btnSailor,'bg-day','bg-night');
    }

    
    var subline;
    if (themeDay){
        subline = document.getElementsByClassName('short-underline-night');
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '1';
    } else {
        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-night');
        subline[0].style.opacity = '1';
    }
}



/// FUNCTION TO GET FROM DB- MOVE TO ANOTHER JSFILE
function getSearchResults(search,limit) {
    getLimitGifs(search,limit).then( response => {
        response.data.forEach(element => {
            var item = document.createElement('div');
            item.className += 'suggestion-item pos-relative';
            var header = document.createElement('header');
            header.className = 'top-bar theme-day';
            header.innerHTML ='#HashTag';
            var closeIcon = document.createElement('img');
            closeIcon.className = 'close-icon';
            closeIcon.src = "./assets/close.svg";
            closeIcon.alt = "Close Window";
            header.appendChild(closeIcon);
            var img = document.createElement('img');
            img.className = 'img-item';
            img.src = 'https://media.giphy.com/media/'+ element.id +'/giphy.gif';
            img.alt = "..gif-alt";
            var btn = document.createElement('button');
            btn.className = "btn btn-more";
            btn.innerHTML = "Ver mas...";
            item.appendChild(header);
            item.appendChild(img);
            item.appendChild(btn);
            document.getElementById('suggestions-container').appendChild(item);
        });        
    }).catch(error => {
        console.log(error);
    })
}

function getRandomResults(search) { 
    const found = fetch('https://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=' + search)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });
    return found;
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

document.getElementById('search-input').addEventListener('input',function(event){
    var btnSearch = document.getElementsByClassName('search-btn');
    var inputText = this.value;
    if (!!inputText){
        /// ARAMAR PARA SABER EL TEMA ACTUAL
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

document.getElementById('subsearch-box-container').addEventListener('focusout',function(event){
    event.target.style.display = 'none';
});

document.getElementById('search-action-btn').addEventListener('click', function(event){
    var searchText = document.getElementById('search-input').value;
    document.getElementById('subsearch-box').style.display = 'none';
    getSearchResults(searchText,4);
});

document.addEventListener("DOMContentLoaded", function(event) {
    var item = "<div class='suggestion-item pos-relative'><header class='color-theme1'>#HashTag <img src='./assets/close.svg' class='close-icon' alt='Close Window'></header><img src='' alt='..gif-alt'><button class='btn btn-more'>Ver más...</button></div>";
    console.log("DOM fully loaded and parsed");
});
