// CONFIGURATION TO GIF API
const apiKey = 'QZKjaiFPDjfLUn7lHzk73ZFkJUrpf5WN';

///GENERAL FUNCTIONS
function changeTheme(theme){
    var themeOld = theme ==='day' ? 'btn-theme-day':'btn-theme-night';
    var themeNew = theme ==='day' ? 'btn-theme-night':'btn-theme-day';
    var btnElements = document.getElementsByClassName(themeOld);
    console.log(btnElements);
    
    Object.keys(btnElements).forEach(key => {
        btnElements[key].classList.replace(themeOld,themeNew);
    });

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

