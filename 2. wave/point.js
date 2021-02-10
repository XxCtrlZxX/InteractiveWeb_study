export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.07;
        this.cur = index;
        this.max = 200;
    }

    update() {
        if (this.cur > Math.PI * 2)
            this.cur = 0;
        
        this.cur += this.speed;
        this.y = this.fixedY + Math.sin(this.cur) * this.max;
    }
}