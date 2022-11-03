
class Exterminate {
  constructor() {
    this.shutdownList = [];
  }
  add(func) {
    if (!this.shutdownList.includes(func) && typeof func === "function") {
      this.shutdownList.push(func);
    }
  }
  async now(callee) {
    console.log(`${callee} signal received: Shutting down TurtleBox`);
    for (let i = 0; i < this.shutdownList.length; i++) {
      await this.shutdownList[i]();
    }
  }
}

module.exports = Exterminate;
