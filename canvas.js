const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

const w = 1200;
const h = 500;

cvs.width = w;
cvs.height = h;

const gravity = 1.75;

class Drop{
    constructor(x, y, scale, initVel){
        this.x = x;
        this.y = y;
        this.scale = scale;       
        this.initVel = initVel;

        this.splashLifetime = 1;
        this.splashRadius = 0;
        this.lastX = x;
    }

    update() {
        this.y = this.y + (this.scale*gravity) + this.initVel;
        if (this.splashLifetime > 0){ this.splashLifetime -= 0.05; this.splashRadius += 0.2} else { this.lastX = this.x};
    }

    draw(){ 
        c.beginPath();
        c.fillStyle = 'rgba(180,0,170,1)';
        c.rect(this.x, this.y, this.scale, this.scale * 3);
        c.fill();

        c.beginPath();
        c.strokeStyle = 'rgba(180,0,170,' + String(this.splashLifetime) + ')';
        c.arc(this.lastX, h, this.scale*this.splashRadius, 0, 2 * Math.PI);
        c.stroke();        

    }
}

function animate() {

    drops.forEach(drop => {
        if (drop.y > h){
            drop.x = Math.floor(Math.random() * w);
            drop.y = 0;
            drop.initVel = Math.random() * 3;

            drop.splashLifetime = 1;
            drop.splashRadius = 0;
        } else {                        
            drop.update();
        }
    });
  
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drops.forEach(drop => {        
        drop.draw();
    });
  
    window.requestAnimationFrame(animate);
    //var animation = window.requestAnimationFrame(animate);
    //window.cancelAnimationFrame(animation);
};

const drops = [];
for (let i = 0; i < 350; i++){
    let randX = Math.floor(Math.random() * w);
    let randY = Math.floor(Math.random() * h);
    let randSize = (Math.random() * 3.5) + 0.5;
    let randVel = Math.random() * 3;

    drops.push(
        new Drop (
            randX,
            randY,   
            randSize,
            randVel
        )
    );
};

c.clearRect(0, 0, window.innerWidth, window.innerHeight);
drops.forEach(drop => {
    drop.draw();
});

animate();