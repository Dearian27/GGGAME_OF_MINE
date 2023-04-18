// class Scene {
//   constructor() {
//     this.name = 'Scene';
//   }
  
//   update() {
//     // Код для оновлення сцени
//   }
  
//   render() {
//     // Код для відображення сцени
//   }
// }

// class SceneManager {
//   constructor() {
//     this.scenes = [];
//     this.currentScene = null;
//   }
  
//   addScene(scene) {
//     this.scenes.push(scene);
//   }
  
//   removeScene(scene) {
//     const index = this.scenes.indexOf(scene);
//     if (index > -1) {
//       this.scenes.splice(index, 1);
//     }
//   }
  
//   goToScene(name) {
//     const scene = this.scenes.find(scene => scene.name === name);
//     if (scene) {
//       this.currentScene = scene;
//     }
//   }
  
//   update() {
//     if (this.currentScene) {
//       this.currentScene.update();
//     }
//   }
  
//   render() {
//     if (this.currentScene) {
//       this.currentScene.render();
//     }
//   }
// }

// const sceneManager = new SceneManager();
// const scene1 = new Scene();
// const scene2 = new Scene();
// sceneManager.addScene(scene1);
// sceneManager.addScene(scene2);
// sceneManager.goToScene('Scene 1');
