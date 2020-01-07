const apiKey = 'QZKjaiFPDjfLUn7lHzk73ZFkJUrpf5WN';


document.addEventListener('DOMContentLoaded', (event) => {
    
    
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

    document.getElementById('dropdown-buttons').addEventListener('click', function (event) {
        var status = document.getElementById('drop-down').style.display;
        if (status == 'none'){document.getElementById('drop-down').style.display="block"}
        else{document.getElementById('drop-down').style.display = "none"}
    });

    document.getElementById('dropdown-buttons').addEventListener('mouseleave', function (event) {
        document.getElementById('drop-down').style.display = "none";
    });
})