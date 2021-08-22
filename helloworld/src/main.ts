import P5 from "p5";
import "sanitize.css";
import "./style.css";

const sketch = (p: P5) => {
  let socket: WebSocket;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //p.noLoop();
    p.colorMode(p.HSL, 360, 100, 100);

    socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", (event) => {
      socket.send("Hello Web Socket");
    });
  };

  p.draw = () => {
    p.background(160, 50, 50);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  /**
   * マウスをクリックするとメッセージが送信される
   * 
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
    if (p.key === "f") {
      const element = document.body;
      element.requestFullscreen();
    }

    if (p.key === "s") {
      p.saveCanvas(
        `file${p.year()}_${p.month()}_${p.day()}_${p.hour()}_${p.minute()}`,
        "png"
      );
    }
  };
};

new P5(sketch);
