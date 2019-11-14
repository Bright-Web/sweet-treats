$(document).ready(function () {
    
    const EL_TREATS_LIST = $('.treats-list');


    let treatsArr = [];


    init();


    // Init function //

    function init(){
        $.getJSON('json/treats.json', function (data) {
            treatsArr = data.treats;
            displayTreats(treatsArr);
        });
        closeLightbox()      
                
    }

    // Display Treats //

    function displayTreats(treats) {
        let string = "";
        $.each(treats, function (i, treat) { 
            string += getTreatHTML(treat);    
        });
        EL_TREATS_LIST.html(string);
        $('.card-hover').hide();
        cardHover();
        addButtonClickListeners();

    }

    // Add card hover effect //

    function cardHover () {
        $('.card').on('mouseenter', function () {
            $(this).find('.card-hover').fadeIn('fast');
        });
        $('.card').on('mouseleave', function () {
            $(this).find('.card-hover').fadeOut('fast');
        });
    }

    // Add click listeners to buttons

    function addButtonClickListeners () {
        $('.button-details').on('click', function () {
            let treatSlug = $(this).data('slug');
            let treat = getTreatBySlug(treatSlug);
            $('.lightbox-inner').html(getDetailsHTML(treat));
            openLightbox();            
        });
        $('.lightbox-wrapper').on('click', function(){
            closeLightbox();
        });
    }

    function openLightbox(){
        $('.lightbox').fadeIn('fast');
    }
    function closeLightbox(){
        $('.lightbox').fadeOut('fast');
    }

    // Find treat by name

    function getTreatBySlug(treatSlug) {
        for (let i = 0; i < treatsArr.length; i++) {
            const treat = treatsArr[i];
            if(treat.slug === treatSlug){
                return treat;
            }            
        }       
    }

    // Get HTML for the clicked details button

    function getDetailsHTML(treat) {
        return `
        <div class="details-image">
            <img src="${treat.image}" alt="" srcset="">
        </div>
        <div class="details-info">
            <div class="details-top">
                <p class="details-name">${treat.name}</p>
                <p class="details-price">$${treat.price} / ${treat.unit}</p>
                <p class="details-units">${treat.perUnit} per ${treat.unit}</p>
            </div>
            <div class="details-bottom">
                <p class="details-flavours-title">Available Flavours:</p>
                <ul class="details-flavours">
                ${getFlavoursHTML(treat)}
                </ul>
            </div>
            <div class="button button-quote">Quote</div>
        </div>
        `
    }

    // Get HTML for treat flavours //
    function getFlavoursHTML(treat){
        let string = "";
        $.each(treat.flavours, function(i, flavour){
            string += `<li class="details-flavour">${flavour}</li>`
        })
        return string
    }


    // Get HTML for each treat //

    function getTreatHTML(treat){
        return `
        <div class="card">
            <div class="card-image">
                <img src="${treat.image}" alt="">
                <div class="card-hover">
                    <div class="button button-quote" data-slug=${treat.slug}>Quote</div>
                    <div class="button button-details" data-slug=${treat.slug}>Details</div>
                </div>
            </div>
            <div class="card-info">
                <p class="card-title">${treat.name}</p>
                <p class="card-price">$${treat.price} / ${treat.unit}</p>
            </div>
        </div>
        `
    }


    






});