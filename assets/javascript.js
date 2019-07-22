// Scrolling
var $content = $('header .content')
    , $blur = $('header .overlay')
    , wHeight = $(window).height();

$(window).on('resize', function () {
    wHeight = $(window).height();
});

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Scroller() {
    this.latestKnownScrollY = 0;
    this.ticking = false;
}

Scroller.prototype = {

    init: function () {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
        $blur.css('background-image', $('header:first-of-type').css('background-image'));
    },


    onScroll: function () {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    },


    requestTick: function () {
        if (!this.ticking) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    },

    update: function () {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking = false;


        var slowScroll = currentScrollY / 2
            , blurScroll = currentScrollY * 2
            , opaScroll = 1.4 - currentScrollY / 400;
        if (currentScrollY > wHeight)
            $('nav').css('position', 'fixed');
        else
            $('nav').css('position', 'absolute');

        $content.css({
            'transform': 'translateY(' + slowScroll + 'px)',
            '-moz-transform': 'translateY(' + slowScroll + 'px)',
            '-webkit-transform': 'translateY(' + slowScroll + 'px)',
            'opacity': opaScroll
        });

        $blur.css({
            'opacity': blurScroll / wHeight
        });
    }
};


var scroller = new Scroller();
scroller.init();

// Why do I have a horizontal scrollbar!?
var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
    document.querySelectorAll('*'),
    function (el) {
        if (el.offsetWidth > docWidth) {
            console.log(el);
        }
    }
);

// Hamburger Menu Activate!

function myFunction() {
    var x = document.getElementById("navBar");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Sticky navbar
window.onscroll = function () { myFunction() };
var navbar = document.getElementById("myTopnav");
var sticky = navbar.offsetTop;
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// Up button menu
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("blogBtn").style.display = "block";
    } else {
        document.getElementById("blogBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}