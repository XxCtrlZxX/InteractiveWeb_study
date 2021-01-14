export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * (stageWidth - diameter));
        this.y = diameter + (Math.random() * (stageHeight - diameter));
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);
        this.bounceBlock(block);

        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const minY = this.radius;
        const maxX = stageWidth - this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius;
        const minY = block.y - this.radius;
        const maxX = block.maxX + this.radius;
        const maxY = block.maxY + this.radius;

        if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
            // x좌표의 차이와 y좌표의 차이를 구해서 어느 면에 닿았는지 알 수 있게
            const dx1 = this.x - minX;
            const dx2 = maxX - this.x;
            const dy1 = this.y - minY;
            const dy2 = maxY - this.y;
            const dx = dx1 > dx2 ? dx2 : dx1;   // 둘 중 작은 거
            const dy = dy1 > dy2 ? dy2 : dy1;

            if (dx < dy) {
                // 오른쪽 or 왼쪽
                this.vx *= -1;
                this.x += this.vx;
            } else {
                // 위 or 아래
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}