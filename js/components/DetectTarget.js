import Matter from "matter-js";

export function detectBodyAtPoint(bodies,worldPos){
    for(let body of bodies){
        if(
            Matter.Bounds.contains(body.bounds,worldPos) &&
            Matter.Vertices.contains(body.vertices, worldPos)
        ) {
            return body;
        }
    }
    return null;
}