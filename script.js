$(document).ready(function(){
    // Custom Cursor Trail Effect
    const cursor = $('.cursor-trail');
    const trailColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#007fff', '#8b00ff'];

    $(document).on('mousemove', function(e) {
        cursor.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });

        // Create a new trail particle
        let trail = $('<div>').addClass('trail').appendTo('body');
        const randomColor = trailColors[Math.floor(Math.random() * trailColors.length)];

        trail.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px',
            background: randomColor,
            'box-shadow': `0 0 5px ${randomColor}, 0 0 10px ${randomColor}`
        });

        setTimeout(function() {
            trail.remove();
        }, 800); // Trail particle lifetime
    });

    const preloader = $('#preloader');
    const preloaderVideo = $('#preloader-video');

    preloaderVideo.on('ended', function() {
        preloader.addClass('fade-out');
        setTimeout(() => {
            preloader.addClass('hidden');
            startAnimation();
        }, 1000);
    });
    
    setTimeout(() => {
        if (!preloader.hasClass('fade-out')) {
            preloader.addClass('fade-out');
            setTimeout(() => {
                preloader.addClass('hidden');
                startAnimation();
            }, 1000);
        }
    }, 30000);

    var content = document.getElementsByClassName('content')[0];
    var width = content.offsetWidth;
    var height = content.offsetHeight;
    var verticalKaificent = 0.2;
        deltaMerc = 0;
        deltaVenus = 0;
        deltaEarth = 0;
        deltaMars = 0;
        deltaJupiter = 0;
        deltaSaturn = 0;
        deltaUranus = 0;
        deltaNeptune = 0;
        deltaMoon = 0;
        n = 20;
    var animationSpeed = 1;
    var animationFrameId;

    var Rmercury = {x: 90, y: 85};
    var Rvenus = {x: 130, y: 125};
    var Rearth = {x: 185, y: 180};
    var Rmoon = 28;
    var Rmars = {x: 240, y: 230};
    var Rjupiter = {x: 320, y: 310};
    var Rsaturn = {x: 430, y: 415};
    var Ruranus = {x: 510, y: 490};
    var Rneptune = {x: 560, y: 540};
    
    spacePosition();
    drawOrbits();
    scaleHandler();
    $(window).scrollTop($(window).height());
    $(window).scrollLeft($(window).width()/2);

    var $mercuryContainer = $('.mercury_container').eq(0);
    var mercuryX = width/2 - $mercuryContainer.width() /2;
    var mercuryY = height/2 - $mercuryContainer.height() /2;
    var mercury = $('.shadow_mercury').eq(0);	

    var $venusContainer = $('.venus_container').eq(0);
    var venusX = width/2 - $venusContainer.width() /2;
    var venusY = height/2 - $venusContainer.height() /2;
    var venus = $('.shadow_venus').eq(0);	

    var $earthMoonContainer = $('.earth_moon_container').eq(0);
    var earthX = width/2 - $earthMoonContainer.width() /2;
    var earthY = height/2 - $earthMoonContainer.height() /2;
    var earth = $('.shadow_earth').eq(0);	

    var $moon = $('.moon').eq(0);
    var moonX = $earthMoonContainer.width() /2  - $moon.width()/2;
    var moonY = $earthMoonContainer.height() /2 - $moon.height()/2;

    var $marsContainer = $('.mars_container').eq(0);
    var marsX = width/2 - $marsContainer.width() /2;
    var marsY = height/2 - $marsContainer.height() /2;
    var mars = $('.shadow_mars').eq(0);	

    var $jupiterContainer = $('.jupiter_container').eq(0);
    var jupiterX = width/2 - $jupiterContainer.width() /2;
    var jupiterY = height/2 - $jupiterContainer.height() /2;
    var jupiter = $('.shadow_jupiter').eq(0);	


    var $saturnRingContainer = $('.saturn_ring_container').eq(0);
    var saturnX = width/2 - $saturnRingContainer.width() /2;
    var saturnY = height/2 - $saturnRingContainer.height() /2;
    var saturn = $('.shadow_saturn').eq(0);	

    var $ringContainer = $('.ring_container').eq(0);

    var $uranusContainer = $('.uranus_container').eq(0);
    var uranusX = width/2 - $uranusContainer.width() /2;
    var uranusY = height/2 - $uranusContainer.height() /2;
    var uranus = $('.shadow_uranus').eq(0);	

    var $neptuneContainer = $('.neptune_container').eq(0);
    var neptuneX = width/2 - $neptuneContainer.width() /2;
    var neptuneY = height/2 - $neptuneContainer.height() /2;
    var neptune = $('.shadow_neptune').eq(0);	

    function spacePosition(){
      sun = document.getElementsByClassName('sun')[0];
      sun.style.top = (height/2 - sun.offsetHeight /2 ) + 'px';
      sun.style.left = (width/2 - sun.offsetWidth /2 ) + 'px';

      mercuryContainer = document.getElementsByClassName('mercury_container')[0];
      mercuryContainer.style.top = (height/2 - mercuryContainer.offsetHeight /2 ) + 'px';
      mercuryContainer.style.left = (width/2 - mercuryContainer.offsetWidth /2 + Rmercury.x ) + 'px';

      venusContainer = document.getElementsByClassName('venus_container')[0];
      venusContainer.style.top = (height/2 - venusContainer.offsetHeight /2 ) + 'px';
      venusContainer.style.left = (width/2 - venusContainer.offsetWidth /2 + Rvenus.x ) + 'px';

      earthMoonContainer = document.getElementsByClassName('earth_moon_container')[0];
      earthMoonContainer.style.top = (height/2 - earthMoonContainer.offsetHeight /2 ) + 'px';
      earthMoonContainer.style.left = (width/2 - earthMoonContainer.offsetWidth /2 + Rearth.x ) + 'px';
      
      moon = document.getElementsByClassName('moon')[0];
      moon.style.top = (earthMoonContainer.offsetHeight /2  - moon.offsetHeight/2) + 'px';
      moon.style.left = (earthMoonContainer.offsetWidth /2 - moon.offsetWidth/2 + Rmoon ) + 'px';

      marsContainer = document.getElementsByClassName('mars_container')[0];
      marsContainer.style.top = (height/2 - marsContainer.offsetHeight /2 ) + 'px';
      marsContainer.style.left = (width/2 - marsContainer.offsetWidth /2 + Rmars.x ) + 'px';

      jupiterContainer = document.getElementsByClassName('jupiter_container')[0];
      jupiterContainer.style.top = (height/2 - jupiterContainer.offsetHeight /2 ) + 'px';
      jupiterContainer.style.left = (width/2 - jupiterContainer.offsetWidth /2 + Rjupiter.x ) + 'px';

      saturnRingContainer = document.getElementsByClassName('saturn_ring_container')[0];
      saturnRingContainer.style.top = (height/2 - saturnRingContainer.offsetHeight /2 ) + 'px';
      saturnRingContainer.style.left = (width/2 - saturnRingContainer.offsetWidth /2 + Rsaturn.x ) + 'px';

      uranusContainer = document.getElementsByClassName('uranus_container')[0];
      uranusContainer.style.top = (height/2 - uranusContainer.offsetHeight /2 ) + 'px';
      uranusContainer.style.left = (width/2 - uranusContainer.offsetWidth /2 + Ruranus.x ) + 'px';

      neptuneContainer = document.getElementsByClassName('neptune_container')[0];
      neptuneContainer.style.top = (height/2 - neptuneContainer.offsetHeight /2 ) + 'px';
      neptuneContainer.style.left = (width/2 - neptuneContainer.offsetWidth /2 + Rneptune.x ) + 'px';
    }

    function startAnimation() {
        if (!animationFrameId) {
            move();
        }
    }

    $('#speed-slider').on('input', function() {
        animationSpeed = $(this).val();
    });

    function move(){
        moveEarth();
        moveMercury();
        moveVenus();
        moveMars();
        moveJupiter();
        moveSaturn();
        moveUranus();
        moveNeptune();
        moveMoon();	
        animationFrameId = requestAnimationFrame(move);
    }
    function moveMercury(){
        var alpha = Math.PI*deltaMerc/180;
        $mercuryContainer.css('top', mercuryY + Rmercury.y * Math.sin(alpha)* verticalKaificent);
        $mercuryContainer.css('left', mercuryX + Rmercury.x * Math.cos(alpha));
        mercury.css('transform','rotate(' + deltaMerc + 'deg)');
        if (deltaMerc<180) {
            $mercuryContainer.css('z-index', 11);
        }else{
            $mercuryContainer.css('z-index', 9);
        }
        deltaMerc+=(47.87/n) * animationSpeed;	
        if(deltaMerc>360){deltaMerc-=360;}
    }
    function moveVenus(){
        var alpha = Math.PI*deltaVenus/180;
        $venusContainer.css('top', venusY + Rvenus.y * Math.sin(alpha)* verticalKaificent);
        $venusContainer.css('left', venusX + Rvenus.x * Math.cos(alpha));

        venus.css('transform','rotate(' + deltaVenus + 'deg)');
        if (deltaVenus<180) {
            $venusContainer.css('z-index', 12);
        }else{
            $venusContainer.css('z-index', 8);
        }
        deltaVenus+=(35.02/n) * animationSpeed;	
        if(deltaVenus>360){deltaVenus-=360;}
    }
    function moveEarth(){
        var alpha = Math.PI*deltaEarth/180;
        $earthMoonContainer.css('top', earthY + Rearth.y * Math.sin(alpha)* verticalKaificent);
        $earthMoonContainer.css('left', earthX + Rearth.x * Math.cos(alpha));
        earth.css('transform','rotate(' + deltaEarth + 'deg)');
        if ((deltaEarth<180)) {
            $earthMoonContainer.css('z-index', 13);
        }else{
            $earthMoonContainer.css('z-index', 7);
        }
        deltaEarth+=(29.78/n) * animationSpeed;	
        if(deltaEarth>360){deltaEarth-=360;}
    }
    function moveMoon(){
        var alpha = Math.PI*deltaMoon/180;
        $moon.css('top', moonY + Rmoon * Math.sin(alpha)* verticalKaificent);
        $moon.css('left', moonX + Rmoon * Math.cos(alpha));
        if (deltaMoon<180) {
            $moon.css('z-index', 11);
        }else{
            $moon.css('z-index', 9);
        }
        deltaMoon += (340/n) * animationSpeed;
        if(deltaMoon>360){deltaMoon-=360;}
    }
    function moveMars(){
        var alpha = Math.PI*deltaMars/180;
        $marsContainer.css('top', marsY + Rmars.y * Math.sin(alpha)* verticalKaificent);
        $marsContainer.css('left', marsX + Rmars.x * Math.cos(alpha));
        mars.css('transform','rotate(' + deltaMars + 'deg)');
        if (deltaMars<180) {
            $marsContainer.css('z-index', 14);
        }else{
            $marsContainer.css('z-index', 6);
        }
        deltaMars+=(24.077/n) * animationSpeed;	
        if(deltaMars>360){deltaMars-=360;}
    }
    function moveJupiter(){
        var alpha = Math.PI*deltaJupiter/180;
        $jupiterContainer.css('top', jupiterY + Rjupiter.y * Math.sin(alpha)* verticalKaificent);
        $jupiterContainer.css('left', jupiterX + Rjupiter.x * Math.cos(alpha));
        jupiter.css('transform','rotate(' + deltaJupiter + 'deg)');
        if (deltaJupiter<180) {
            $jupiterContainer.css('z-index', 15);
        }else{
            $jupiterContainer.css('z-index', 5);
        }
        deltaJupiter += (13.07/n) * animationSpeed;	
        if(deltaJupiter>360){deltaJupiter-=360;}
    }
    function moveSaturn(){
        var alpha = Math.PI*deltaSaturn/180;
        $saturnRingContainer.css('top', saturnY + Rsaturn.y * Math.sin(alpha)* verticalKaificent);
        $saturnRingContainer.css('left', saturnX + Rsaturn.x * Math.cos(alpha));
        saturn.css('transform','rotate(' + deltaSaturn + 'deg)');
        if (deltaSaturn<180){
            $saturnRingContainer.css('z-index', 16);
        }else{
            $saturnRingContainer.css('z-index', 4);
        }
        deltaSaturn += (9.69/n) * animationSpeed;	
        if(deltaSaturn>360){deltaSaturn-=360;}
    }
    function moveUranus(){
        var alpha = Math.PI*deltaUranus/180;
        $uranusContainer.css('top', uranusY + Ruranus.y * Math.sin(alpha)* verticalKaificent);
        $uranusContainer.css('left', uranusX + Ruranus.x * Math.cos(alpha));
        uranus.css('transform','rotate(' + deltaUranus + 'deg)');
        if (deltaUranus<180){
            $uranusContainer.css('z-index', 17);
        }else{
            $uranusContainer.css('z-index', 3);
        }
        deltaUranus+=(6.81/n) * animationSpeed;	
        if(deltaUranus>360){deltaUranus-=360;}
    }
    function moveNeptune(){
        var alpha = Math.PI*deltaNeptune/180;
        $neptuneContainer.css('top', neptuneY + Rneptune.y * Math.sin(alpha)* verticalKaificent);
        $neptuneContainer.css('left', neptuneX + Rneptune.x * Math.cos(alpha));
        uranus.css('transform','rotate(' + deltaNeptune + 'deg)');
        if (deltaNeptune<180){
            $neptuneContainer.css('z-index', 17);
        }else{
            $neptuneContainer.css('z-index', 3);
        }
        deltaNeptune+=(5.43/n) * animationSpeed;	
        if(deltaNeptune>360){deltaNeptune-=360;}
    }
    function drawOrbits(){
        var mercuryCircle = $('.mercury_circle').eq(0);
        mercuryCircle.css('left', width/2 - Rmercury.x);
        mercuryCircle.css('top', height/2 - Rmercury.y*verticalKaificent);
        mercuryCircle.css('width', Rmercury.x*2);
        mercuryCircle.css('height', Rmercury.y*2*verticalKaificent);

        var venusCircle = $('.venus_circle').eq(0);
        venusCircle.css('left', width/2 - Rvenus.x);
        venusCircle.css('top', height/2 - Rvenus.y*verticalKaificent);
        venusCircle.css('width', Rvenus.x*2);
        venusCircle.css('height', Rvenus.y*2*verticalKaificent);

        var earthCircle = $('.earth_circle').eq(0);
        earthCircle.css('left', width/2 - Rearth.x);
        earthCircle.css('top', height/2 - Rearth.y*verticalKaificent);
        earthCircle.css('width', Rearth.x*2);
        earthCircle.css('height', Rearth.y*2*verticalKaificent);

        var marsCircle = $('.mars_circle').eq(0);
        marsCircle.css('left', width/2 - Rmars.x);
        marsCircle.css('top', height/2 - Rmars.y*verticalKaificent );
        marsCircle.css('width', Rmars.x*2);
        marsCircle.css('height', Rmars.y*2*verticalKaificent);

        var jupiterCircle = $('.jupiter_circle').eq(0);
        jupiterCircle.css('left', width/2 - Rjupiter.x);
        jupiterCircle.css('top', height/2 - Rjupiter.y*verticalKaificent);
        jupiterCircle.css('width', Rjupiter.x*2);
        jupiterCircle.css('height', Rjupiter.y*2*verticalKaificent);

        var saturnCircle = $('.saturn_circle').eq(0);
        saturnCircle.css('left', width/2 - Rsaturn.x);
        saturnCircle.css('top', height/2 - Rsaturn.y*verticalKaificent);
        saturnCircle.css('width', Rsaturn.x*2);
        saturnCircle.css('height', Rsaturn.y*2*verticalKaificent);
        
        var saturnRing = $('.gif_ring').eq(0);
        saturnRing.css('height', Rmoon*2* verticalKaificent);

        var uranusCircle = $('.uranus_circle').eq(0);
        uranusCircle.css('left', width/2 - Ruranus.x);
        uranusCircle.css('top', height/2 - Ruranus.y*verticalKaificent);
        uranusCircle.css('width', Ruranus.x*2);
        uranusCircle.css('height', Ruranus.y*2*verticalKaificent);

        var neptuneCircle = $('.neptune_circle').eq(0);
        neptuneCircle.css('left', width/2 - Rneptune.x);
        neptuneCircle.css('top', height/2 - Rneptune.y*verticalKaificent);
        neptuneCircle.css('width', Rneptune.x*2);
        neptuneCircle.css('height', Rneptune.y*2*verticalKaificent);
    }

    function scaleHandler(){
        var currentMousePos = { x: -1, y: -1 };
        var isDragged = false;

        $(document).mousemove(function(event) {
            if(!isDragged){
                currentMousePos.x = event.pageX;
                currentMousePos.y = event.pageY;
            }
            else{
                delta = (event.pageY - currentMousePos.y)/10000 + verticalKaificent;
                if( delta <= 1 && delta >=0 ){
                    verticalKaificent = delta;
                }
                drawOrbits();
                $mercuryContainer.css('top', mercuryY + Rmercury.y * Math.sin(Math.PI*deltaMerc/180)* verticalKaificent);
                $venusContainer.css('top', venusY + Rvenus.y * Math.sin(Math.PI*deltaVenus/180)* verticalKaificent);
                $earthMoonContainer.css('top', earthY + Rearth.y * Math.sin(Math.PI*deltaEarth/180)* verticalKaificent);
                $moon.css('top', moonY + Rmoon * Math.sin(Math.PI*deltaMoon/180)* verticalKaificent);

                $marsContainer.css('top', marsY + Rmars.y * Math.sin(Math.PI*deltaMars/180)* verticalKaificent);
                $jupiterContainer.css('top', jupiterY + Rjupiter.y * Math.sin(Math.PI*deltaJupiter/180)* verticalKaificent);
                $saturnRingContainer.css('top', saturnY + Rsaturn.y * Math.sin(Math.PI*deltaSaturn/180)* verticalKaificent);
                $uranusContainer.css('top', uranusY + Ruranus.y * Math.sin(Math.PI*deltaUranus/180)* verticalKaificent);
                $neptuneContainer.css('top', neptuneY + Rneptune.y * Math.sin(Math.PI*deltaNeptune/180)* verticalKaificent);
            }
        });

        $(document).mousedown(function() { 	
            isDragged = true;
        });

        $(document).mouseup(function() {
            isDragged = false;
        });
    }
    
    // Planet Data
    const planetData = {
        mercury: { name: 'Mercury', description: 'The smallest planet in our solar system and nearest to the Sun.', diameter: '4,879 km', mass: '0.055 Earths', distance: '57.9 million km' },
        venus: { name: 'Venus', description: 'Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.', diameter: '12,104 km', mass: '0.815 Earths', distance: '108.2 million km' },
        earth: { name: 'Earth', description: 'Our home planet is the third planet from the Sun and the only place we know of so far that’s inhabited by living things.', diameter: '12,742 km', mass: '1 Earth', distance: '149.6 million km' },
        mars: { name: 'Mars', description: 'Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere.', diameter: '6,779 km', mass: '0.107 Earths', distance: '227.9 million km' },
        jupiter: { name: 'Jupiter', description: 'Jupiter is the fifth planet from our Sun and is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined.', diameter: '139,820 km', mass: '318 Earths', distance: '778.5 million km' },
        saturn: { name: 'Saturn', description: 'Saturn is the sixth planet from the Sun and the second-largest planet in our solar system.', diameter: '116,460 km', mass: '95 Earths', distance: '1.4 billion km' },
        uranus: { name: 'Uranus', description: 'The seventh planet from the Sun with the third largest diameter in our solar system, Uranus is very cold and windy.', diameter: '50,724 km', mass: '14.5 Earths', distance: '2.9 billion km' },
        neptune: { name: 'Neptune', description: 'Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.', diameter: '49,244 km', mass: '17 Earths', distance: '4.5 billion km' }
    };
    
    $('[data-planet]').on('click', function() {
        const planet = $(this).data('planet');
        const data = planetData[planet];
        
        $('#planet-name').text(data.name);
        $('#planet-description').text(data.description);
        $('#planet-diameter').text(data.diameter);
        $('#planet-mass').text(data.mass);
        $('#planet-distance').text(data.distance);
        
        $('#planet-details').removeClass('hidden');
    });

    $('#close-details').on('click', function() {
        $('#planet-details').addClass('hidden');
    });
});