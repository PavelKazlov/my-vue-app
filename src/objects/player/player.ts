import { FrontSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader, } from "three"
import { createArrowHelper } from "../../arrow"
import { keyboardControl } from "../../keyboard.control"
import { updateVectorThrottle } from "../cube/cube"



const textureLoader = new TextureLoader()
const texture = textureLoader.load('/Idle.png' ); 


// texture.offset.x = 0.5
// texture.offset.y = 0.5
// texture.wrapS = RepeatWrapping
// texture.wrapT = RepeatWrapping

texture.repeat.set( 1/4, 1/3 );

const geometry = new PlaneGeometry(3, 3)
const material = new MeshBasicMaterial({ 
    // color: 0x00ff00, 
    map: texture,
    transparent: true,
    color: 0xe9724f,
    side: FrontSide
    // alphaTest: 0.5,

})
const mesh = new Mesh(geometry, material)
const arrowHelper = createArrowHelper()
const group = new Group()
group.add(mesh, arrowHelper.arrowHelper)

const render = () => {
    group.position.add(keyboardControl.direction.clampLength(0.1, 0.1));
    updateVectorThrottle(group.position)
    arrowHelper.render(keyboardControl.direction) 
}

export const player = {
    group,
    render
}
