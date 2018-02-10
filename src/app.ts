import { TaskQueue, autoinject, observable } from "aurelia-framework";

@autoinject()
export class App {
  public colours = [
    'blackberry',
    'strawberry',
    'mango',
    'lime',
    'mint',
    'white'
  ];
  public primaryColour = 'mint';
  public secondaryColour = 'lime';
  public overridePrimary: boolean = false;
  public overrideSecondary: boolean = false;
  public flip: boolean = false;
  public leftEyebrow: boolean = false;
  public rightEyebrow: boolean = false;
  public randomTimer: NodeJS.Timer;
  @observable public scatter: boolean = false;

  constructor(private taskQueue: TaskQueue) { }

  public scatterChanged(newValue) {
    if (newValue) {
      this.random();
    } else {
      clearTimeout(this.randomTimer);
      var items = document.querySelectorAll('path, polyline, polygon');

      [].forEach.call(items, (div) => clearTransform(div));
    }
  }

  public random() {
    this.randomTimer = setInterval(() => {
      var items = document.querySelectorAll('path, polyline, polygon');

      [].forEach.call(items, (div) => randomTransform(div));
    }, 100);
  }

  public setPrimary(colour: string) {
    this.primaryColour = colour;
  }

  public setSecondary(colour: string) {
    this.secondaryColour = colour;
  }
}

function randomTransform(el) {
  var trans = "matrix3d(" + Math.random() + ", -" + Math.random() + ", " + Math.random() + ", 0, " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", 0, -" + Math.random() + ", 0, " + Math.random() + ", 0, 0, 0, 0, 1)";

  clearTransform(el);

  // set random transform
  el.style.webkitTransform = trans;
  el.style.MozTransform = trans;
  el.style.msTransform = trans;
  el.style.OTransform = trans;
  el.style.transform = trans;
}

function clearTransform(el) {
  el.style.transform = "";
  el.style.webkitTransform = "";
  el.style.MozTransform = "";
  el.style.msTransform = "";
  el.style.OTransform = "";
}
