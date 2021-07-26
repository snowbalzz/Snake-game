

class Game {


    private canvas: HTMLCanvasElement;
    private keyboard: KeyboardListener;
    private enemy: Enemy;
    private counter: number;
    private tail: Snake[];
    private keyPressed: string;
    public teleX: number;
    public teleY: number;
    private readonly ctx: CanvasRenderingContext2D;
    private scaleOfSnake: number;

    public constructor(canvasId: HTMLCanvasElement) {
        
        this.counter = 0;
        // Construct all of the canvas
        this.canvas = canvasId;
        this.keyPressed = ''
        this.ctx = this.canvas.getContext("2d");
        
        this.keyboard = new KeyboardListener();
        

        this.teleX = 0;
        this.teleY = 0;
        this.scaleOfSnake = 0.02;
        this.tail = [];
        
        console.log(this.gridNum());
        

        for (let i = 0; i < 5; i++) {
            this.tail.push(new Snake(this.canvas.width/2 - i * this.scaleOfSnake*this.canvas.width, this.canvas.height/2, this.scaleOfSnake, 'grey'));
        }

        this.spawnEnemy();

        this.loop();
    }
 
    /**
     * Method for the Game Loop
     */
    public loop = () => {
        this.counter +=1;

        this.tailDraw();
        this.keyCheck();
        this.collision();
        this.eatingApple();
        // this.selfCollision();
        
        if (this.counter % 3 === 0) {
        this.tailMovePrototype();
        }
            
        requestAnimationFrame(this.loop);
    };


    public addingCube = () => {
            this.tail.push();
    }

    public tailDraw =()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.enemy.draw(this.ctx, this.canvas);

        this.tail.forEach(element => {
            element.draw(this.ctx, this.canvas);
        });
    } 

    public tailMovePrototype() {
        if (this.keyPressed === '') return;

        let popped = this.tail.pop();
            
        popped.setPosX(this.tail[0].getPosX() + this.teleX);
        popped.setPosY(this.tail[0].getPosY() + this.teleY);
        

        this.selfCollision(popped);

        this.tail.unshift(popped);

    }

    public addSnake  = () => {
        this.tail.push(new Snake(
            this.tail[this.tail.length - 1].getPosX(),
            this.tail[this.tail.length - 1].getPosY(), this.scaleOfSnake,
            'grey'
            ));
        
    } 

    public collision = () => {
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
    }

    public keyCheck = () => {
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
    }


    private selfCollision(popped: Snake) {
        this.tail.forEach(element => {
            if (element.getPosX() === popped.getPosX() && element.getPosY() === popped.getPosY()) {
                location.reload(true);
            }
        });
    }

    public eatingApple = () => {
        this.tail.forEach(element => {
            if (
                element.getPosX() < this.enemy.getPosX() + this.scaleOfSnake*this.canvas.width &&
                element.getPosX() + this.scaleOfSnake*this.canvas.width  > this.enemy.getPosX() &&
                element.getPosY() < this.enemy.getPosY() + this.scaleOfSnake*this.canvas.height &&
                element.getPosY() + this.scaleOfSnake*this.canvas.height > this.enemy.getPosY() 
              ) {
                console.log('tasty');
                this.spawnEnemy();
                this.addSnake();
              }
        });
    }

    private spawnEnemy = () => {
        this.enemy = new Enemy( 
            Math.ceil(this.randomNumber(1, this.gridNum())) * (this.scaleOfSnake * this.canvas.width), 
            Math.ceil(this.randomNumber(1, this.gridNum())) * (this.scaleOfSnake * this.canvas.height), 
            this.scaleOfSnake, 
            'red');
    }

    private gridNum = () => {
        return  (this.canvas.width / (this.scaleOfSnake * this.canvas.width)) - 1; 
    }

    private randomNumber = (min:number, max:number) =>{ 
        return Math.random() * (max - min) + min;
    } 
}
