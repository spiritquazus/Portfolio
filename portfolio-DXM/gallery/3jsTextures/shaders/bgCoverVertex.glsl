varying vec3 vertexNormal; //defines facing direction of vertex.

void main() {
    vertexNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); //boilerplate!
    
}