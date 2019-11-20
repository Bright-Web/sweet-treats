$(document).ready(function () {
    
    const EL_TREATS_LIST = $('.treats-list');
    let form = document.querySelector('.quote-form');


    let treatsArr = [];
    let categoryArr = [];
    let filteredArr = [];

    let quote = {
        treat: "",
        price: 0,
        servings: 0,
        event: "",
        attendees: 0
    };

    init();


    // Init function //

    function init(){
        $.getJSON('json/treats.json', function (data) {
            treatsArr = data.treats;            
        displayTreats(treatsArr);        
        getCategoryList()
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
        addButtonClickListeners()
        hideQuote()
        hidePricing()

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

    function addButtonClickListeners(){
        addDetailsClickListener()
        addQuoteClickListener()
    }

    // Set detail button click listener function and populate HTML

    function addDetailsClickListener() {
        $('.button-details').on('click', function () {
            let treatSlug = $(this).data('slug');
            let treat = getTreatBySlug(treatSlug);
            setDetailsHTML(treat);
            $('.button-quote').data('slug', treatSlug)
            showDetails();
            openLightbox();            
        });
        $('.lightbox-wrapper').on('click', function(){
            closeLightbox();

        });

    }

    // Set detail button click listener function and populate HTML

    function addQuoteClickListener(){
        $('.button-quote').on('click', function () {
            hideDetails();            
            let treatSlug = $(this).data('slug')
            let treat = getTreatBySlug(treatSlug)
            setQuoteTreatDetails(treat)
            showQuote();
            addPriceSubmitListener();
            openLightbox();            
        });
    }
    
    function addPriceSubmitListener(){
        $('.price-submit').on('click', function (){
            quote.event = form.event.value;
            quote.attendees = form.attendees.value;
            hideQuote()
            displayPricing()
        });
    }

    function setQuoteTreatDetails (treat) {
        quote.treat = treat.name;
        quote.price = treat.price;
        quote.servings = treat.servings;
        
    }

    function displayPricing (treat) {
        let total = calculateTotal();
        $('.pricing-event').html(quote.event)
        $('.pricing-attendees').html(quote.attendees)
        $('.pricing-treat').html(quote.treat)
        $('.pricing-total').html("$" + total)
        showPricing();
    }

    function calculateTotal () {
        let total = (quote.attendees / quote.servings) * quote.price
        return total
    }

    // Hide and show
    
    function openLightbox(){
        $('.lightbox').fadeIn('fast');
    }
    function closeLightbox(){
        $('.lightbox').fadeOut('fast');
        hideDetails();
        hidePricing();
        hideQuote();
    }    
    function hideDetails(){
        $('.details-wrapper').hide();
    }
    function showDetails(){
        $('.details-wrapper').show();
    }
    function hideQuote(){
        $('.quote-wrapper').hide();
    }
    function showQuote(){
        $('.quote-wrapper').show();
    }
    function hidePricing(){
        $('.pricing-wrapper').hide();
    }
    function showPricing(){
        $('.pricing-wrapper').show();
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

    function setDetailsHTML(treat) {
        $(".details-image-img").attr('src', treat.image);
        $(".details-name").html(treat.name);
        $(".details-price").html("$" + treat.price + " / " + treat.unit);
        $(".details-units").html(treat.servings + " servings per " + treat.unit);
        $(".details-flavours").html(getFlavoursHTML(treat));

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



    function getCategoryList(){
        $.each(treatsArr, function (i, treat) { 
             let category = treat.category
             if($.inArray(category, categoryArr) === -1){
                 categoryArr.push(category)
             }

        });
        $('.filter-list').hide();
        $('.filter-list').html(getCategoryHtml());
        $('.filter-toggle').on('click', function(){
            $('.filter-list').toggle('slide', { direction: 'down' });
        })

        $('.filter-item').on('click', function () {
            let category = $(this).data('cat')
            filteredArr = []
            getFilteredList(category)
            displayTreats(filteredArr);
        });
    }


    function getFilteredList (category){
        $.each(treatsArr, function (i, treat) { 
             if(treat.category === category){
                 filteredArr.push(treat)
             }
        });
    }


    function getCategoryHtml() {
        let string = ""
        $.each(categoryArr, function (i, category) { 
             string += `
             <li class="filter-item" data-cat=${category}>${category}</li>
             `
        });
        return string
    }
    










});