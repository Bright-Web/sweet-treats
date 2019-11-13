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
        $('.details').hide();
        
                
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
            $('.details').fadeIn('fast');
        });
        $('.details-wrapper').on('click', function(){
            $('.details').fadeOut('fast');
        });
    }



    // Get HTML for each treat //

    function getTreatHTML(treat){
        return `
        <div class="card">
            <div class="card-image">
                <img src="${treat.image}" alt="">
                <div class="card-hover">
                    <div class="button button-quote">Quote</div>
                    <div class="button button-details">Details</div>
                </div>
            </div>
            <div class="card-info">
                <p class="card-title">${treat.name}</p>
                <p class="card-price">$${treat.price} / each</p>
            </div>
        </div>
        `
    }







});