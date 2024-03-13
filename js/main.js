(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

  



    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
        let a = "";
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
            // Update the div with the content of the first blog post
            for(let i=0;i<data.Blog.length;i++){
                a += `<div class="col-lg-4 mb-5">
                            <div class="position-relative mb-4">
                                <img class="img-fluid rounded w-100" src="${data.Blog[i].image}" alt="">
                                <div class="blog-date">
                                    <h6 class="text-white font-weight-bold mb-n1">${data.Blog[i].date.split('-')[0]}</h6>
                                    <small class="text-white mt-1">${data.Blog[i].date.split('-')[1]}</small>
                                    <small class="text-white font-weight-bold">${data.Blog[i].date.split('-')[2]}</small>
                                </div>
                            </div>
                            <h5 class="font-weight-medium mb-4">${data.Blog[i].heading}</h5>
                            <buton class="btn btn-sm btn-outline-primary py-2" data-lightbox="portfolio" onclick="openblog(${data.Blog[i].id})">View</button>
                        </div>`
                }
                $('#blog_container').html(a);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

      
 

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);


function openModel(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block"
}

function modelClose(){
    document.getElementById('myModal').style.display = "none";
}

window.onclick = function(event) {
event.target == document.getElementById('myModal')  ? modelClose() : null
}

function openblog(id){
    let a = "";
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Update the div with the content of the first blog post
        for(let i=0;i<data.Blog.length;i++){
            if(id == i){
                a += `<div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header1">
                    <span id="sp2" class="close" onclick="modelClose()">&times;</span>
                    <h2>${data.Blog[i].heading}</h2>
                    </div>
                    <div class="modal-body">
                    ${data.Blog[i].content}
                </div>
                </div>   
                </div>`
            }
        }
        document.getElementById('modals').innerHTML = a 
        openModel()
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

