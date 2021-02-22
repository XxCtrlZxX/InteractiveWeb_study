import {
    Point
} from './point.js'

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.points = [];
        
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i] = new Point(
                this.index + i,
                this.pointGap * i,
                this.stageHeight / 2    // centerY
            )
        }
    }

    draw(ctx) {
        // lines
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1)
                this.points[i].update();

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
        
        // points
        /*for (let i = 0; i < this.totalPoints; i++) {
            if (i > 0 && i < this.totalPoints - 1)
                this.points[i].update();

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.points[i].x, this.points[i].y, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }*/
    }
}