class Snake {
  protected xPos: number;
  protected yPos: number; 
  protected color:string;
  protected scale: number; 
  protected enemy: HTMLImageElement;


  constructor(xPos: number, yPos: number, scale:number, color:string) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = scale
    this.color = color
    this.enemy = this.loadNewImage('')
  }

  /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    let posY = this.yPos;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, posY, this.scale*canvas.width, this.scale*canvas.height);
    
  }

  
  public getPosX = () => {
    return this.xPos;
  }

  public setPosX = (param:number) => {
    this.xPos = param;
  }

  public getPosY = () => {
    return this.yPos;
  }

  public setPosY = (param:number) => {
    this.yPos = param;
  }

  private loadNewImage(source: string): HTMLImageElement {
      const img = new Image();
      img.src = source;
      return img;
  }

}
