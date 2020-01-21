// CONFIGURATION TO GIF API
const apiKey = 'QZKjaiFPDjfLUn7lHzk73ZFkJUrpf5WN';

///GENERAL FUNCTIONS
//changeTheme : Funcion para cambiar el tema de la pagina, determina cambio y luego cambia segun los pasos: 
// 1-Buttons
// 2-Top Bars
// 3-Logo
// 4-Backround
// 5-Icons
// 6-Links
//@theme texto con el tema elegido a cambiar
function changeTheme(theme){

    //Nombre de las clases A USAR/REEMPLAZAR
    const btnDay = 'btn-theme-day';
    const btnNight = 'btn-theme-night';
    const topBarsDay = 'color-theme1';
    const topBarsNight = 'color-theme2';
    const logoDay = 'gifOF_logo.png';
    const logoNight = 'gifOF_logo_dark.png';
    const bgBodyDay = '#FFFFFF';
    const bgBodyNight = '#110038';
    const hoverDay = 'hover-day';
    const hoverNight = 'hover-night'; 
    // const ddDay = 'dropdown.svg';
    // const ddNight = 'fordward.svg';
    //Buttons
    var themeDay = theme ==='day' ? true:false;
    var btnElements;
    if (themeDay){
        btnElements = document.getElementsByClassName(btnNight);
        replaceClases(btnElements,btnNight,btnDay);

        btnSailor = document.getElementsByClassName('btn-sailor-day2');
        replaceClases(btnSailor,'btn-sailor-day2','btn-sailor-day');

        btnSailor = document.getElementsByClassName('btn-sailor-night2');
        replaceClases(btnSailor,'btn-sailor-night2','btn-sailor-night');

        btnSailor = document.getElementsByClassName('bg-night');
        replaceClases(btnSailor,'bg-night','bg-day');
    } else {
        btnElements = document.getElementsByClassName(btnDay);
        replaceClases(btnElements,btnDay,btnNight);

        btnSailor = document.getElementsByClassName('btn-sailor-day');
        replaceClases(btnSailor,'btn-sailor-day','btn-sailor-day2');

        btnSailor = document.getElementsByClassName('btn-sailor-night');
        replaceClases(btnSailor,'btn-sailor-night','btn-sailor-night2');

        btnSailor = document.getElementsByClassName('bg-day');
        replaceClases(btnSailor,'bg-day','bg-night');
    }

    //Top Bars
    var topbar;
    if (themeDay){
        topbar = document.getElementsByClassName(topBarsNight);
        replaceClases(topbar,topBarsNight,topBarsDay);
    } else {
        topbar = document.getElementsByClassName(topBarsDay);
        replaceClases(topbar,topBarsDay,topBarsNight);
    }

    //Logo
    var logo = document.getElementById('web-logo').src;
    var src = logo.split('/');
    if (themeDay){
        src[src.length-1] = logoDay;
    } else {
        src[src.length-1] = logoNight;
    }

    document.getElementById('web-logo').src = src.join('/');

    //Background
    if (themeDay){
        document.body.style.backgroundColor = bgBodyDay;
    } else {
        document.body.style.backgroundColor = bgBodyNight;
    }

    //Icons
    var icons = document.getElementsByClassName('icon');
    changeIcons(themeDay,icons); // ENPROCESO

    //Links and A subline
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++){
        if (themeDay){
            links[i].style.color = bgBodyNight;
        } else {
            links[i].style.color = bgBodyDay;
        }
    }

    var subline;
    if (themeDay){
        subline = document.getElementsByClassName('short-underline-night');
        console.log(subline);
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '1';
    } else {
        subline = document.getElementsByClassName('short-underline-day');
        subline[0].style.opacity = '0';
        subline = document.getElementsByClassName('short-underline-night');
        subline[0].style.opacity = '1';
    }

    //Hover Link
    var hover;
    if (themeDay){
        hover = document.getElementsByClassName(hoverNight);
        replaceClases(hover,hoverNight,hoverDay);
    } else {
        hover = document.getElementsByClassName(hoverDay);
        replaceClases(hover,hoverDay,hoverNight);

    }
}

/// FUNCTION TO GET FROM DB- MOVE TO ANOTHER JSFILE
function getSearchResults(search) {
    const found = fetch('http://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
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
    var status = document.getElementById('drop-down').style.display;
    if (status == 'none'){document.getElementById('drop-down').style.display="block"}
    else{document.getElementById('drop-down').style.display = "none"}
});

document.getElementById('dropdown-buttons').addEventListener('mouseleave', function (event) {
    document.getElementById('drop-down').style.display = "none";
});

document.addEventListener('input',function(event){
    var btnSearch = document.getElementsByClassName('search-btn');
    var inputText = document.getElementById('search-input').value;
    if (!!inputText){
        /// ARAMAR PARA SABER EL TEMA ACTUAL
        btnSearch[0].classList.replace('none-mode','btn-theme-day');
        document.getElementsByClassName('subsearch-box')[0].style.display = 'block';
    } else{
        /// ARAMAR PARA SABER EL TEMA ACTUAL
        btnSearch[0].classList.replace('btn-theme-day','none-mode',);
        document.getElementsByClassName('subsearch-box')[0].style.display = 'none';
    }
});

document.addEventListener('focusout',function(event){
    document.getElementsByClassName('subsearch-box')[0].style.display = 'none';
    
});

