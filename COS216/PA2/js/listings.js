$(document).ready(function () {
    var obj = JSON.stringify({"studentnum":"u22658395","apikey":"8772a8ef375d70f9d53acb7e11f694f5","type":"GetAllListings","return":["id","title", "location", "price","bedrooms", "bathrooms", "type"],"limit":+limit});
    var limit = "30";
    

    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://wheatley.cs.up.ac.za/api/", true);
    xhr.onreadystatechange =function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
            var response = JSON.parse(xhr.responseText);
            
            if(response["status"] == "success")
            {   
                response["data"].forEach(function(element) {
                    var imageXhr = new XMLHttpRequest();
                    imageXhr.open('GET',"https://wheatley.cs.up.ac.za/api/getimage?listing_id="+element["id"], true);
                        
                    imageXhr.onreadystatechange = function() {
                        if (imageXhr.readyState == 4 && imageXhr.status == 200) {
                            imageResp = JSON.parse(imageXhr.responseText)
                            
                            if(imageResp["status"] == "success"){
                                

                                createContent(element["title"],(element["price"]).toLocaleString(), imageResp["data"][0],element["location"], element["bedrooms"], element["bathrooms"], element["type"]);
                            }
                                    
                        }
                    }
                    imageXhr.send();
                })
                
                
            }
        }
    }

    xhr.open("POST","https://wheatley.cs.up.ac.za/api/", true);
    xhr.send(obj);
        
    
    function createContent(title, price, image, location, bed, bath, offer){
        $("#content-container").append(
            $("<div>",{class:"property"}).append(
                $("<a>",{
                    class:"property-anchor",
                }).append(
                    $("<img>",{
                        class:"favor-icon",
                        src:"img/icons/star.svg"
                    }),

                    $("<img>",{
                        class:"property-image",
                        src: image
                    }),

                    $("<div>",{
                        class:"property-header"
                    }).append(
                        $("<span>",{
                            class: "property-name",
                            text: title
                        }),
                        $("<span>",{
                            class: "property-price",
                            text: `R`+ price
                        })
                    ),
                    
                    $("<div>",{
                        class:"property-info",
                    }).append(
                        $("<div>",{
                            class: "property-location",
                        }).append(
                            $("<i>",{
                                class:"lni lni-map-marker"
                            }),
                            $("<span>",{
                                class:"property-info-headings",
                                text: "Location:"
                            }),
                            `&nbsp;`+location

                        ),
                        
                        $("<div>",{
                            class: "property-bedrooms",
                        }).append(
                            $("<img>",{
                                src:"img/icons/bed.svg",
                                class:"info-icons"
                            }),
                            $("<span>",{
                                class:"property-info-headings",
                                text: "Bedrooms:"
                            }),
                            `&nbsp;`+bed

                        ),
                        
                        $("<div>",{
                            class: "property-bath",
                        }).append(
                            $("<img>",{
                                src:"img/icons/shower.svg",
                                class:"info-icons"
                            }),
                            $("<span>",{
                                class:"property-info-headings",
                                text: "Bathrooms:"
                            }),
                            `&nbsp;`+bath

                        ),

                        $("<div>",{
                            class: "property-offer",
                        }).append(
                            $("<i>",{
                                class:"lni lni-offer info-icons"
                            }),
                            $("<span>",{
                                class:"property-info-headings",
                                text: "Offer:"
                            }),
                            `&nbsp;`+offer

                        )
                        
                    )
                    
                    
                    
                )
            )
        );
    }
   
});
