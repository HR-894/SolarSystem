$(document).ready(function(){
    // Custom Cursor & Touch Trail Effect
    const cursor = $('.cursor-trail');
    const trailColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#007fff', '#8b00ff'];

    function createTrail(x, y) {
        let trail = $('<div>').addClass('trail').appendTo('body');
        const randomColor = trailColors[Math.floor(Math.random() * trailColors.length)];

        trail.css({
            left: x + 'px',
            top: y + 'px',
            background: randomColor,
            'box-shadow': `0 0 5px ${randomColor}, 0 0 10px ${randomColor}`
        });

        setTimeout(function() {
            trail.remove();
        }, 500);
    }

    $(document).on('mousemove', function(e) {
        cursor.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });
        createTrail(e.clientX, e.clientY);
    });

    $(document).on('touchmove', function(e) {
        const touch = e.originalEvent.touches[0];
        createTrail(touch.clientX, touch.clientY);
    });

    const preloader = $('#preloader');
    const preloaderVideo = $('#preloader-video');
    const skipButton = $('#skip-button');
    let skipTimer;

    function transitionToMain() {
        if(preloader.hasClass('fade-out')) return;
        clearTimeout(skipTimer);
        preloader.addClass('fade-out');
        setTimeout(() => {
            preloader.addClass('hidden');
            playMeteorShower();
        }, 1000);
    }
    transitionToMain(); // THIS LINE IS FOR REMOVING PRELOADER VIDEO

    // IN FUTURE ADD PRELOADER VIDEO 
    /* skipTimer = setTimeout(() => {
        skipButton.removeClass('hidden');
    }, 5000);
    
    preloaderVideo.on('ended', transitionToMain);
    skipButton.on('click', transitionToMain);
    
    setTimeout(() => {
        transitionToMain();
    }, 30000); */

    // Helpers for cosmic background
    function createStarElement(color) {
        return $('<div class="star"></div>').css({
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            color: color,
            width: (Math.random() * 2 + 1) + 'px',
            height: (Math.random() * 2 + 1) + 'px',
            animationDuration: (Math.random() * 1.5 + 0.8) + 's',
            opacity: (Math.random() * 0.6 + 0.4)
        });
    }

    function createNebulaElement() {
        const colors = ['rgba(255,0,255,0.18)', 'rgba(0,100,255,0.18)', 'rgba(255,100,0,0.14)', 'rgba(128,0,255,0.14)'];
        return $('<div class="nebula"></div>').css({
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            width: (Math.random() * 300 + 150) + 'px',
            height: (Math.random() * 300 + 150) + 'px',
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: (Math.random() * 6) + 's'
        });
    }

    function playMeteorShower() {
        const showerContainer = $('#meteor-shower');
        const cosmic = $('.cosmic-background');
        showerContainer.removeClass('hidden');

        // Populate cosmic background with nebulae and colorful stars
        cosmic.empty();
        for (let i = 0; i < 8; i++) cosmic.append(createNebulaElement());
        const starColors = ['#ff69b4','#4169e1','#ffd700','#ff4500','#00fa9a','#9370db','#ffffff'];
        for (let i = 0; i < 120; i++) cosmic.append(createStarElement(starColors[Math.floor(Math.random() * starColors.length)]));
        cosmic.addClass('visible');

        let meteors = 60; // increased intensity
        let meteorsFallen = 0;

        for (let i = 0; i < meteors; i++) {
            let meteor = $('<div class="meteor"></div>');
            showerContainer.append(meteor);
            
            // Path: top-left to bottom-right, keep meteor tilt same as original (-45deg)
            const startX = Math.random() * 50 - 20; // left side area in vw
            const startY = -150;
            const endX = startX + 100; // move towards right
            const endY = window.innerHeight + 150;

            meteor.css({
                left: startX + 'vw',
                top: startY + 'px',
                transform: 'rotate(-45deg)'
            });

            setTimeout(() => {
                meteor.animate({
                    top: endY + 'px',
                    left: endX + 'vw'
                }, Math.random() * 1500 + 800, 'linear', function() {
                    // impact flash
                    const impact = $('<div></div>').css({
                        position: 'absolute',
                        left: endX + 'vw',
                        top: (endY - 20) + 'px',
                        width: '4px',
                        height: '4px',
                        background: 'rgba(255,200,0,0.85)',
                        borderRadius: '50%',
                        filter: 'blur(2px)',
                        zIndex: 10001
                    }).appendTo(showerContainer);

                    impact.animate({width: '12px', height: '12px', marginLeft: '-6px', marginTop: '-6px', opacity: 0}, 300, function(){ impact.remove(); });

                    if (meteorsFallen < 8) {
                        $('body').addClass('shake');
                        setTimeout(() => $('body').removeClass('shake'), 500);
                    }

                    $(this).remove();
                    meteorsFallen++;

                    // End of shower: hide cosmic background and proceed
                    if (meteorsFallen === meteors) {
                        showerContainer.addClass('fade-out');
                        setTimeout(() => {
                            showerContainer.addClass('hidden').empty();
                            cosmic.removeClass('visible');
                            setTimeout(() => cosmic.empty(), 800);
                            $('.content, .title-container, #info-button, .zoom-controls, .controls, .credit-container').removeClass('hidden');
                            startAnimation();
                        }, 800);
                    }
                });
            }, Math.random() * 3000);
        }
    }
    
    var content = $('.content').eq(0);
    var width = content.width();
    var height = content.height();
    var verticalKaificent = 0.2;
    var deltaMerc = 0, deltaVenus = 0, deltaEarth = 0, deltaMars = 0, deltaJupiter = 0, deltaSaturn = 0, deltaUranus = 0, deltaNeptune = 0, deltaMoon = 0;
    var n = 20;
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
    
    var $mercuryContainer = $('.mercury_container'), $venusContainer = $('.venus_container'), $earthMoonContainer = $('.earth_moon_container'), $marsContainer = $('.mars_container'), $jupiterContainer = $('.jupiter_container'), $saturnRingContainer = $('.saturn_ring_container'), $uranusContainer = $('.uranus_container'), $neptuneContainer = $('.neptune_container'), $moon = $('.moon');

    var mercuryX, mercuryY, venusX, venusY, earthX, earthY, moonX, moonY, marsX, marsY, jupiterX, jupiterY, saturnX, saturnY, uranusX, uranusY, neptuneX, neptuneY;

    function setInitialPositions(){
        $('.sun').css({'top': (height/2 - $('.sun').height()/2), 'left': (width/2 - $('.sun').width()/2)});
        
        mercuryX = width/2 - $mercuryContainer.width()/2; mercuryY = height/2 - $mercuryContainer.height()/2;
        venusX = width/2 - $venusContainer.width()/2; venusY = height/2 - $venusContainer.height()/2;
        earthX = width/2 - $earthMoonContainer.width()/2; earthY = height/2 - $earthMoonContainer.height()/2;
        moonX = $earthMoonContainer.width()/2 - $moon.width()/2; moonY = $earthMoonContainer.height()/2 - $moon.height()/2;
        marsX = width/2 - $marsContainer.width()/2; marsY = height/2 - $marsContainer.height()/2;
        jupiterX = width/2 - $jupiterContainer.width()/2; jupiterY = height/2 - $jupiterContainer.height()/2;
        saturnX = width/2 - $saturnRingContainer.width()/2; saturnY = height/2 - $saturnRingContainer.height()/2;
        uranusX = width/2 - $uranusContainer.width()/2; uranusY = height/2 - $uranusContainer.height()/2;
        neptuneX = width/2 - $neptuneContainer.width()/2; neptuneY = height/2 - $neptuneContainer.height()/2;
    }

    function startAnimation() {
        if (!animationFrameId) {
            drawOrbits();
            setInitialPositions();
            scaleHandler();
            move();
        }
    }

    $('#speed-slider').on('input', function() {
        const slider = $(this);
        const value = parseFloat(slider.val());
        animationSpeed = value;

        $('#speed-display').text(value.toFixed(1) + 'x');

        const min = slider.attr('min');
        const max = slider.attr('max');
        const percentage = ((value - min) / (max - min)) * 100;
        
        const red = Math.round(255 * (percentage / 100));
        const green = Math.round(255 * (1 - (percentage / 100)));
        const fillColor = `rgb(${red}, ${green}, 0)`;

        slider.css('background', `linear-gradient(to right, ${fillColor} ${percentage}%, #333 ${percentage}%)`);
    }).trigger('input');


    function updateShadow(container, angle) {
        var shadowAngle = angle + 90;
        container.find('.shadow').css('background', 'linear-gradient(' + -shadowAngle + 'deg, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0) 70%)');
    }

    function move(){
        deltaMerc = (deltaMerc + (47.87/n) * animationSpeed) % 360;
        var alphaMerc = Math.PI*deltaMerc/180;
        $mercuryContainer.css({'top': mercuryY + Rmercury.y * Math.sin(alphaMerc) * verticalKaificent, 'left': mercuryX + Rmercury.x * Math.cos(alphaMerc)});
        updateShadow($mercuryContainer, deltaMerc);
        $mercuryContainer.css('z-index', deltaMerc < 180 ? 11 : 9);

        deltaVenus = (deltaVenus + (35.02/n) * animationSpeed) % 360;
        var alphaVenus = Math.PI*deltaVenus/180;
        $venusContainer.css({'top': venusY + Rvenus.y * Math.sin(alphaVenus) * verticalKaificent, 'left': venusX + Rvenus.x * Math.cos(alphaVenus)});
        updateShadow($venusContainer, deltaVenus);
        $venusContainer.css('z-index', deltaVenus < 180 ? 12 : 8);

        deltaEarth = (deltaEarth + (29.78/n) * animationSpeed) % 360;
        var alphaEarth = Math.PI*deltaEarth/180;
        $earthMoonContainer.css({'top': earthY + Rearth.y * Math.sin(alphaEarth) * verticalKaificent, 'left': earthX + Rearth.x * Math.cos(alphaEarth)});
        updateShadow($earthMoonContainer.find('.shadow_earth'), deltaEarth);
        $earthMoonContainer.css('z-index', deltaEarth < 180 ? 13 : 7);

        deltaMoon = (deltaMoon + (340/n) * animationSpeed) % 360;
        var moonAlpha = Math.PI*deltaMoon/180;
        $moon.css({'top': moonY + Rmoon * Math.sin(moonAlpha) * verticalKaificent, 'left': moonX + Rmoon * Math.cos(moonAlpha)});

        deltaMars = (deltaMars + (24.077/n) * animationSpeed) % 360;
        var alphaMars = Math.PI*deltaMars/180;
        $marsContainer.css({'top': marsY + Rmars.y * Math.sin(alphaMars) * verticalKaificent, 'left': marsX + Rmars.x * Math.cos(alphaMars)});
        updateShadow($marsContainer, deltaMars);
        $marsContainer.css('z-index', deltaMars < 180 ? 14 : 6);

        deltaJupiter = (deltaJupiter + (13.07/n) * animationSpeed) % 360;
        var alphaJupiter = Math.PI*deltaJupiter/180;
        $jupiterContainer.css({'top': jupiterY + Rjupiter.y * Math.sin(alphaJupiter) * verticalKaificent, 'left': jupiterX + Rjupiter.x * Math.cos(alphaJupiter)});
        updateShadow($jupiterContainer, deltaJupiter);
        $jupiterContainer.css('z-index', deltaJupiter < 180 ? 15 : 5);

        deltaSaturn = (deltaSaturn + (9.69/n) * animationSpeed) % 360;
        var alphaSaturn = Math.PI*deltaSaturn/180;
        $saturnRingContainer.css({'top': saturnY + Rsaturn.y * Math.sin(alphaSaturn) * verticalKaificent, 'left': saturnX + Rsaturn.x * Math.cos(alphaSaturn)});
        updateShadow($saturnRingContainer.find('.saturn_container'), deltaSaturn);
        $saturnRingContainer.css('z-index', deltaSaturn < 180 ? 16 : 4);

        deltaUranus = (deltaUranus + (6.81/n) * animationSpeed) % 360;
        var alphaUranus = Math.PI*deltaUranus/180;
        $uranusContainer.css({'top': uranusY + Ruranus.y * Math.sin(alphaUranus) * verticalKaificent, 'left': uranusX + Ruranus.x * Math.cos(alphaUranus)});
        updateShadow($uranusContainer, deltaUranus);
        $uranusContainer.css('z-index', deltaUranus < 180 ? 17 : 3);
        
        deltaNeptune = (deltaNeptune + (5.43/n) * animationSpeed) % 360;
        var alphaNeptune = Math.PI*deltaNeptune/180;
        $neptuneContainer.css({'top': neptuneY + Rneptune.y * Math.sin(alphaNeptune) * verticalKaificent, 'left': neptuneX + Rneptune.x * Math.cos(alphaNeptune)});
        updateShadow($neptuneContainer, deltaNeptune);
        $neptuneContainer.css('z-index', deltaNeptune < 180 ? 17 : 3);
        
        animationFrameId = requestAnimationFrame(move);
    }
    
    function drawOrbits(){
        $('.mercury_circle').css({'left': width/2 - Rmercury.x, 'top': height/2 - Rmercury.y*verticalKaificent, 'width': Rmercury.x*2, 'height': Rmercury.y*2*verticalKaificent});
        $('.venus_circle').css({'left': width/2 - Rvenus.x, 'top': height/2 - Rvenus.y*verticalKaificent, 'width': Rvenus.x*2, 'height': Rvenus.y*2*verticalKaificent});
        $('.earth_circle').css({'left': width/2 - Rearth.x, 'top': height/2 - Rearth.y*verticalKaificent, 'width': Rearth.x*2, 'height': Rearth.y*2*verticalKaificent});
        $('.mars_circle').css({'left': width/2 - Rmars.x, 'top': height/2 - Rmars.y*verticalKaificent, 'width': Rmars.x*2, 'height': Rmars.y*2*verticalKaificent});
        $('.jupiter_circle').css({'left': width/2 - Rjupiter.x, 'top': height/2 - Rjupiter.y*verticalKaificent, 'width': Rjupiter.x*2, 'height': Rjupiter.y*2*verticalKaificent});
        $('.saturn_circle').css({'left': width/2 - Rsaturn.x, 'top': height/2 - Rsaturn.y*verticalKaificent, 'width': Rsaturn.x*2, 'height': Rsaturn.y*2*verticalKaificent});
        $('.uranus_circle').css({'left': width/2 - Ruranus.x, 'top': height/2 - Ruranus.y*verticalKaificent, 'width': Ruranus.x*2, 'height': Ruranus.y*2*verticalKaificent});
        $('.neptune_circle').css({'left': width/2 - Rneptune.x, 'top': height/2 - Rneptune.y*verticalKaificent, 'width': Rneptune.x*2, 'height': Rneptune.y*2*verticalKaificent});
    }

    function scaleHandler(){
        var isDragged = false, lastMousePos = { x: 0, y: 0 };
        var scale = 1.0;
        var rotationZ = 0;
        var $solarSystem = $('#solar-system-wrapper');

        function updateTransform() {
            $solarSystem.css('transform', 'scale(' + scale + ') rotateZ(' + rotationZ + 'deg)');
            drawOrbits();
        }
        updateTransform();

        $('#zoom-in').on('click', function() { scale = Math.min(3.0, scale + 0.2); updateTransform(); });
        $('#zoom-out').on('click', function() { scale = Math.max(0.3, scale - 0.2); updateTransform(); });
        
        $(document).mousedown(function(event) {
            if ($(event.target).closest('.controls, #planet-details, #info-popup, #info-button, .credit-container, .title-container').length) return;
            isDragged = true;
            lastMousePos = { x: event.pageX, y: event.pageY };
            event.preventDefault();
        });

        $(document).mousemove(function(event) {
            if (isDragged) {
                var deltaX = event.pageX - lastMousePos.x;
                var deltaY = event.pageY - lastMousePos.y;

                rotationZ += deltaX * 0.5; // Horizontal drag for 2D rotation
                verticalKaificent += deltaY * 0.001; // Vertical drag for 3D tilt
                
                verticalKaificent = Math.max(0, Math.min(1, verticalKaificent));
                updateTransform();
                lastMousePos = { x: event.pageX, y: event.pageY };
            }
        });

        $(document).mouseup(function() { isDragged = false; });
    
        // --- NEW: HAND GESTURE LOGIC ---
        const videoElement = document.getElementById('input_video');
        let lastHandX = null;
        let lastHandY = null;
        let lastPinchDist = null;

        function onResults(results) {
            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                
                // Index Finger Tip (Point 8) and Thumb Tip (Point 4)
                const indexTip = landmarks[8];
                const thumbTip = landmarks[4];
                
                // 1. PINCH DETECTION (Zoom ke liye)
                // Distance between thumb and index
                const distance = Math.sqrt(Math.pow(indexTip.x - thumbTip.x, 2) + Math.pow(indexTip.y - thumbTip.y, 2));
                
                // Agar distance < 0.1 hai toh pinch maana jayega (Zoom)
                if (distance < 0.1) {
                    // Visual feedback ke liye cursor ka color badal sakte ho
                    $('.cursor-trail').css('border-color', 'red'); 
                    
                    if (lastPinchDist) {
                        const zoomDelta = (lastPinchDist - distance) * 5; // Sensitivity
                        // Agar ungliyan paas aa rahi hain -> Zoom Out, Door -> Zoom In logic reverse kar sakte ho
                        // Yahan simple logic:
                        if(distance < lastPinchDist) scale -= 0.05; 
                        else scale += 0.05;
                        
                        scale = Math.max(0.3, Math.min(3.0, scale));
                        updateTransform();
                    }
                    lastPinchDist = distance;
                    lastHandX = null; // Reset rotation tracking
                } 
                // 2. MOVEMENT DETECTION (Rotate ke liye - Open Hand)
                else {
                    $('.cursor-trail').css('border-color', 'yellow');
                    lastPinchDist = null;
                    
                    const currentX = indexTip.x;
                    const currentY = indexTip.y;

                    if (lastHandX !== null && lastHandY !== null) {
                        // Camera mirror hota hai, isliye minus lagaya
                        const deltaX = (lastHandX - currentX) * 1000; 
                        const deltaY = (lastHandY - currentY) * 5; // Tilt slow rakha hai

                        rotationZ += deltaX * 0.2;
                        
                        // Vertical tilt thoda sensitive hai,
                        verticalKaificent += deltaY * 0.001;
                        verticalKaificent = Math.max(0, Math.min(1, verticalKaificent));
                        
                        updateTransform();
                    }

                    lastHandX = currentX;
                    lastHandY = currentY;
                }
            } else {
                // Agar haath screen se hat gaya
                lastHandX = null;
                lastHandY = null;
                lastPinchDist = null;
            }
        }

        // Initialize MediaPipe Hands
        const hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }});
        
        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        });
        
        hands.onResults(onResults);

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await hands.send({image: videoElement});
            },
            width: 640,
            height: 480
        });
        camera.start();
    }
    
    // Planet Data
    const planetData = {
        sun: { name: 'Sun', description: 'The star at the center of our Solar System.', diameter: '1,391,400 km', mass: '330,000 Earths', fact: 'The Sun accounts for 99.86% of the mass in the solar system.', wikiLink: 'https://en.wikipedia.org/wiki/Sun' },
        mercury: { name: 'Mercury', description: 'The smallest planet and nearest to the Sun.', diameter: '4,879 km', mass: '0.055 Earths', fact: 'A year on Mercury is just 88 Earth days long.', wikiLink: 'https://en.wikipedia.org/wiki/Mercury_(planet)' },
        venus: { name: 'Venus', description: 'The second planet from the Sun, known for its thick, toxic atmosphere.', diameter: '12,104 km', mass: '0.815 Earths', fact: 'Venus rotates in the opposite direction to most other planets.', wikiLink: 'https://en.wikipedia.org/wiki/Venus' },
        earth: { name: 'Earth', description: 'Our home planet, the only known place to harbor life.', diameter: '12,742 km', mass: '1 Earth', fact: 'Earth is the only planet not named after a Greek or Roman deity.', wikiLink: 'https://en.wikipedia.org/wiki/Earth' },
        mars: { name: 'Mars', description: 'The "Red Planet," known for its iron-rich dust.', diameter: '6,779 km', mass: '0.107 Earths', fact: 'Mars has the tallest volcano in the solar system, Olympus Mons.', wikiLink: 'https://en.wikipedia.org/wiki/Mars' },
        jupiter: { name: 'Jupiter', description: 'The largest planet in our solar system, a gas giant.', diameter: '139,820 km', mass: '318 Earths', fact: 'The Great Red Spot is a giant storm on Jupiter that has raged for centuries.', wikiLink: 'https://en.wikipedia.org/wiki/Jupiter' },
        saturn: { name: 'Saturn', description: 'The ringed jewel of the solar system.', diameter: '116,460 km', mass: '95 Earths', fact: 'Saturn is less dense than water and would float in a large enough bathtub.', wikiLink: 'https://en.wikipedia.org/wiki/Saturn' },
        uranus: { name: 'Uranus', description: 'An ice giant that rotates on its side.', diameter: '50,724 km', mass: '14.5 Earths', fact: 'Uranus is tilted so far that it essentially orbits the sun on its side.', wikiLink: 'https://en.wikipedia.org/wiki/Uranus' },
        neptune: { name: 'Neptune', description: 'The distant, windy ice giant.', diameter: '49,244 km', mass: '17 Earths', fact: 'Neptune has the strongest winds in the solar system, reaching up to 2,100 km/h.', wikiLink: 'https://en.wikipedia.org/wiki/Neptune' }
    };
    
    $('[data-planet]').on('click', function() {
        const planet = $(this).data('planet');
        const data = planetData[planet];
        const details = $('#planet-details');
        
        $('#planet-name').text(data.name);
        $('#planet-description').text(data.description);
        $('#planet-diameter').text(data.diameter);
        $('#planet-mass').text(data.mass);
        $('#planet-fact').text(data.fact);
        $('#wiki-link').attr('href', data.wikiLink);
        
        details.removeClass('hidden').addClass('visible');
    });

    $('#close-details').on('click', function() {
        $('#planet-details').removeClass('visible').addClass('hidden');
    });
    
    $('#info-button').on('click', function() {
        $('.content').addClass('blur');
        $('#info-popup').removeClass('hidden');
    });
    $('#close-popup').on('click', function() {
        $('.content').removeClass('blur');
        $('#info-popup').addClass('hidden');
    });
});
