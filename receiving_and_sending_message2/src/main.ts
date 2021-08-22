import P5 from "p5";
import "sanitize.css";
import "./style.css";
import Inconsolata from "./fonts/inconsolata.otf";
const sketch = (p: P5) => {
  let socket: WebSocket;
  let font1: P5.Font;
  let message = "Hello World";
  p.preload = () => {
    font1 = p.loadFont(Inconsolata);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    //p.noLoop();
    p.colorMode(p.HSL, 360, 100, 100);
    p.textFont(font1);
    p.textSize(p.width / 6);
    p.textAlign(p.CENTER, p.CENTER);

    socket = new WebSocket("ws://localhost:8080");

    // 通信開始

    socket.addEventListener("open", (event) => {
      socket.send("Hello Web Socket");
    });

    socket.addEventListener("message", (event) => {
      const receivingMessage = String(event.data);
      message = receivingMessage;
      console.log("Message from server", receivingMessage);
    });
  };

  p.draw = () => {
    p.background(0, 0 ,0);
    p.fill(160, 50, 50);
    p.push();
    p.translate(0, 0, 0);
    p.scale(0.5);
    p.rotateX(p.frameCount * 0.01);
    // p.rotateY(p.frameCount * 0.03);
    p.text(message, 0, 0);
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  /**
   * マウスをクリックするとメッセージが送信される
   * @returns
   */

  p.mousePressed = () => {
    if (socket) {
      socket.send("Hello Server!");
      socket.send("Hello send message");
    }

    return false;
  };

  p.keyPressed = () => {
    // Full Screen Mode
    if (p.key === "f") {
      const element = document.body;
      element.requestFullscreen();
    }

    // Save Canvas png
    if (p.key === "s") {
      p.saveCanvas(
        `file${p.year()}_${p.month()}_${p.day()}_${p.hour()}_${p.minute()}`,
        "png"
      );
    }
  };
};

new P5(sketch);
