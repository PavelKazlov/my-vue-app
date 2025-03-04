import { onCleanup, onMount } from "solid-js";
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";
// import { player } from "../../objects/player/player";
// import { anotherPlayer } from "../../objects/cube/cube";
import { player2 } from "../../objects/player/player2";

const CubeAnimation = () => {
  let mountRef: HTMLDivElement | undefined;

  onMount(() => {
    if (!mountRef) return;
    
    const scene = new Scene();
    scene.background = new Color(0xffffff); 
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000,);
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.appendChild(renderer.domElement);

       scene.add(player2.group, 
    );

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      player2.render()
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);

    onCleanup(() => {
      if (mountRef) {
        mountRef.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    });
  });

  return <div ref={el => (mountRef = el)} />;
 
};


export default CubeAnimation;
