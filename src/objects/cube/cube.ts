import { Mesh, MeshBasicMaterial, PlaneGeometry, Vector3 } from "three"
import throttle from "lodash.throttle"


export const vectorFromWebSocket = new Vector3()

export const updateVectorThrottle =throttle((position: Vector3) => {
    vectorFromWebSocket.copy(position)
}, 100)

const geometry = new PlaneGeometry(1, 1)
const material = new MeshBasicMaterial({ color: 0x00ff })
const mesh = new Mesh(geometry, material)

const render = () => {
    mesh.position.lerp(vectorFromWebSocket, 0.1)
}

export const anotherPlayer = {
    mesh,
    render
}