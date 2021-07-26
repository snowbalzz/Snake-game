class Enemy {
    constructor(xPos, yPos, scale, color) {
        this.getPosX = () => {
            return this.xPos;
        };
        this.setPosX = (param) => {
            this.xPos = param;
        };
        this.getPosY = () => {
            return this.yPos;
        };
        this.setPosY = (param) => {
            this.yPos = param;
        };
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.color = color;
        this.enemy = this.loadNewImage('');
    }
    draw(ctx, canvas) {
        let posY = this.yPos;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, posY, this.scale * canvas.width, this.scale * canvas.height);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.counter += 1;
            this.tailDraw();
            this.keyCheck();
            this.collision();
            this.eatingApple();
            if (this.counter % 5 === 0) {
                this.tailMovePrototype();
            }
            requestAnimationFrame(this.loop);
        };
        this.addingCube = () => {
            this.tail.push();
        };
        this.tailDraw = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.enemy.draw(this.ctx, this.canvas);
            this.tail.forEach(element => {
                element.draw(this.ctx, this.canvas);
            });
        };
        this.addSnake = () => {
            this.tail.push(new Snake(this.tail[this.tail.length - 1].getPosX(), this.tail[this.tail.length - 1].getPosY(), this.scaleOfSnake, 'grey'));
        };
        this.collision = () => {
            this.tail.forEach(element => {
                if (element.getPosX() > this.canvas.width - this.scaleOfSnake * this.canvas.width) {
                    element.setPosX(0);
                }
                if (element.getPosX() < 0) {
                    element.setPosX(this.canvas.width - this.scaleOfSnake * this.canvas.height);
                }
                if (element.getPosY() > this.canvas.height + this.scaleOfSnake * this.canvas.height) {
                    element.setPosY(0);
                }
                if (element.getPosY() < 0) {
                    element.setPosY(this.canvas.height - this.scaleOfSnake * this.canvas.height);
                }
            });
        };
        this.keyCheck = () => {
            if (this.keyboard.isKeyDown(KeyboardListener.KEY_DOWN) && this.keyPressed != 'up') {
                this.keyPressed = 'down';
                this.teleX = 0;
                this.teleY = this.canvas.height * this.scaleOfSnake;
            }
            if (this.keyboard.isKeyDown(KeyboardListener.KEY_UP) && this.keyPressed != 'down') {
                this.keyPressed = 'up';
                this.teleX = 0;
                this.teleY = -this.canvas.height * this.scaleOfSnake;
            }
            if (this.keyboard.isKeyDown(KeyboardListener.KEY_RIGHT) && this.keyPressed != 'left') {
                this.keyPressed = 'right';
                this.teleX = this.canvas.width * this.scaleOfSnake;
                this.teleY = 0;
            }
            if (this.keyboard.isKeyDown(KeyboardListener.KEY_LEFT) && this.keyPressed != 'right') {
                this.keyPressed = 'left';
                this.teleX = -this.canvas.width * this.scaleOfSnake;
                this.teleY = 0;
            }
        };
        this.eatingApple = () => {
            this.tail.forEach(element => {
                if (element.getPosX() < this.enemy.getPosX() + this.scaleOfSnake * this.canvas.width &&
                    element.getPosX() + this.scaleOfSnake * this.canvas.width > this.enemy.getPosX() &&
                    element.getPosY() < this.enemy.getPosY() + this.scaleOfSnake * this.canvas.height &&
                    element.getPosY() + this.scaleOfSnake * this.canvas.height > this.enemy.getPosY()) {
                    console.log('tasty');
                    this.spawnEnemy();
                    this.addSnake();
                }
            });
        };
        this.spawnEnemy = () => {
            this.enemy = new Enemy(Math.floor(Math.random() * this.canvas.height) - 100, Math.floor(Math.random() * this.canvas.width + 100), this.scaleOfSnake, 'red');
        };
        this.counter = 0;
        this.canvas = canvasId;
        this.keyPressed = '';
        this.ctx = this.canvas.getContext("2d");
        this.keyboard = new KeyboardListener();
        this.teleX = 0;
        this.teleY = 0;
        this.scaleOfSnake = 0.05;
        this.tail = [];
        for (let i = 0; i < 5; i++) {
            this.tail.push(new Snake(this.canvas.width / 2 - i * this.scaleOfSnake * this.canvas.width, this.canvas.height / 2, this.scaleOfSnake, 'grey'));
        }
        this.spawnEnemy();
        this.loop();
    }
    tailMovePrototype() {
        if (this.keyPressed === '')
            return;
        let popped = this.tail.pop();
        popped.setPosX(this.tail[0].getPosX() + this.teleX);
        popped.setPosY(this.tail[0].getPosY() + this.teleY);
        this.selfCollision(popped);
        this.tail.unshift(popped);
    }
    selfCollision(popped) {
        this.tail.forEach(element => {
            if (element.getPosX() === popped.getPosX() && element.getPosY() === popped.getPosY()) {
                location.reload(true);
            }
        });
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
class Snake {
    constructor(xPos, yPos, scale, color) {
        this.getPosX = () => {
            return this.xPos;
        };
        this.setPosX = (param) => {
            this.xPos = param;
        };
        this.getPosY = () => {
            return this.yPos;
        };
        this.setPosY = (param) => {
            this.yPos = param;
        };
        this.xPos = xPos;
        this.yPos = yPos;
        this.scale = scale;
        this.color = color;
        this.enemy = this.loadNewImage('');
    }
    draw(ctx, canvas) {
        let posY = this.yPos;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos, posY, this.scale * canvas.width, this.scale * canvas.height);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
let init = () => {
    const KiwiWars = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map