// intro anims

const text1 = document.getElementById('welcome-txt');
const text2 = document.getElementById('support-1');
const text3 = document.getElementById('support-2');
const text4 = document.getElementById('support-3');
const wipe = document.getElementById('wipe-container');
const underwipe = document.getElementById('underwipe');
const navbar = document.getElementById('navbar');
const background = document.getElementById('background');
const wrap = document.getElementById('wrap');
const rewatchBtn = document.getElementById('rewatch-btn');

checkAnim();

function checkAnim() {

    if (typeof(Storage) !== "undefined") {
        
        var lastAnimationTime = localStorage.getItem("lastAnimationTime");
        
        if (lastAnimationTime && (Date.now() - lastAnimationTime < 10 * 60 * 1000)) {
            console.log('anim recent');
            wipeAnim();
        } else {
            console.log("Playing animation.");
            runAnim();
            localStorage.setItem("lastAnimationTime", Date.now());
        }
    } else {
        console.log("Local storage is not supported. Cannot track animation play time.");
    }
}

rewatchBtn.addEventListener('click', () => {
    runAnim(); 
});

function runAnim() {
    console.log('anim running');
    hidden(navbar, rewatchBtn);
    opacityOff(text1, text2, text3, text4);
    visible(background, text1, text2, text3, text4, wipe, underwipe);
    document.getElementById('title').textContent = '';
    setTimeout(() => {
        console.log('anim running');
        text1.style.animation = 'slowZoom 1s ease-out forwards 1';
        console.log('text1 anim');
        setTimeout(() => {
        console.log('text2 anim');
        text2.style.animation = 'fadeIn 1s ease-out forwards 1';
            setTimeout(() => {
                console.log('text3 anim');
                text3.style.animation = 'fadeIn 1s ease-out forwards 1';
                setTimeout(() => {
                    console.log('text4 anim');
                    text4.style.animation = 'slowZoom 1s ease-out forwards 1';
                    setTimeout(wipeAnim, 2000);
                }, 2000);
            }, 2000);
        }, 1600);
    }, 1000);
}

function wipeAnim() {
    wipe.style.animation = 'wipe 1s ease-in forwards 1';
    setTimeout(() => {
        hidden(text1, text2, text3, text4);
        opacityOff(rewatchBtn);
        visible(navbar, rewatchBtn);
        setTimeout(() => {
            let i = 0;
            let txt = 'Personal Project - Emir Akbarov';
            let speed = 50;
            let animDone = false;
            write();
            function write() {
                if (animDone == true) {
                    setTimeout(() => {
                        wrap.style.animation = 'fadeIn 0.3s ease-in forwards 1';
                    }, 200);
                } 
                if (i < txt.length) {
                    document.getElementById('title').textContent += txt.charAt(i);
                    i++;
                    if (i == txt.length) {
                        animDone = true;
                    }
                    setTimeout(write, speed);
                }
            }
        }, 1000);
    },500);
    wipe.addEventListener('animationend', () => {
        hidden(background);
    });
}


function visible(...a) {
    for (let i=0; i<a.length; i++) a[i].style.visibility = 'visible';
}

function hidden(...a) {
    for (let i=0; i<a.length; i++) a[i].style.visibility = 'hidden';
}

function opacityOff(...a) {
    for (let i=0; i<a.length; i++) a[i].style.opacity = 0;
}