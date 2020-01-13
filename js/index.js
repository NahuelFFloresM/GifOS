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
    } else {
        btnElements = document.getElementsByClassName(btnDay);
        replaceClases(btnElements,btnDay,btnNight);
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
    changeIcons(themeDay,icons); // ENproceso

    //Links and A subline
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++){
        if (themeDay){
            links[i].style.color = bgBodyNight;
        } else {
            links[i].style.color = bgBodyDay;
        }
    }

    var subline = document.getElementById('short_underline');
    if (themeDay){
        subline.style.borderColor = bgBodyDay;
    } else {
        subline.style.borderColor = bgBodyNight;
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

/// DOC READY EVENTS TO LINK
document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('dropdown-buttons').addEventListener('click', function (event) {
        var status = document.getElementById('drop-down').style.display;
        if (status == 'none'){document.getElementById('drop-down').style.display="block"}
        else{document.getElementById('drop-down').style.display = "none"}
    });

    document.getElementById('dropdown-buttons').addEventListener('mouseleave', function (event) {
        document.getElementById('drop-down').style.display = "none";
    });

    
})

