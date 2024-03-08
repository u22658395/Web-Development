$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "../PA3/api.php",
        data: {
            type:"populateFilter"
        },
        dataType: "JSON"
        
    }).then((result) => {
        
    }).catch((err) => {
        
    });

    window.onclick = function(event) { 
        if($(event.target).hasClass('dropdown-button')) {
            let dropContent = $(event.target).next();
            toggleDropdown(dropContent[0]);
        }
        else{
            // Close the dropdown if the user clicks outside of it
           
            if(!$(event.target).hasClass('checkbox') && !$(event.target).hasClass('checkInput')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.style.display === "block") {
                        openDropdown.style.display = "none";
                    }
                }
            }
        }
    }

});


function toggleDropdown(dropContent) {
    dropContent.style.display = (dropContent.style.display === "block") ? "none" : "block";
}
    
    // Close the dropdown if the user clicks outside of it
    