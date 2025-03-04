import { FrontSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader, MathUtils } from "three";
import { createArrowHelper } from "../../arrow";
import { keyboardControl } from "../../keyboard.control";
import { updateVectorThrottle } from "../cube/cube";

const textureLoader = new TextureLoader();
const texture = textureLoader.load('/Idle.png');

texture.repeat.set(1 / 4, 1 / 3); // Assuming 4 columns & 3 rows of frames

const geometry = new PlaneGeometry(3, 3);
const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    color: 0xe9724f,
    side: FrontSide
});

const mesh = new Mesh(geometry, material);
const arrowHelper = createArrowHelper();
const group = new Group();
group.add(mesh, arrowHelper.arrowHelper);


const frameCountX = 4;  // Columns in sprite sheet
let currentFrame = 0;
let animationSpeed = 10;
let frameTimer = 0;
let rotationSpeed = 0.2; // Adjust for smoother rotation

const updateAnimation = () => {
    frameTimer++;
    if (frameTimer >= animationSpeed) {
        frameTimer = 0;
        currentFrame = (currentFrame + 1) % frameCountX;
        texture.offset.x = currentFrame / frameCountX;
    }
};

const render = () => {
    const movement = keyboardControl.direction.length() > 0;

    if (movement) {
        updateAnimation();

        // Compute target rotation angle based on movement direction
        const targetAngle = Math.atan2(keyboardControl.direction.y, keyboardControl.direction.x) - MathUtils.degToRad(-90);
        
        // Smoothly interpolate rotation
        mesh.rotation.z = MathUtils.lerp(mesh.rotation.z, targetAngle, rotationSpeed);
    } else {
        texture.offset.x = 0;
    }


    group.position.add(keyboardControl.direction.clampLength(0.07, 0.07));
    updateVectorThrottle(group.position);
    arrowHelper.render(keyboardControl.direction);
};

export const player2 = {
    group,
    render
};
