varying vec2 vertexUV; //vec2(0, 0.24) imported from vertexShader.glsl
varying vec3 vertexNormal; //defines facing direction of vertex.

void main() {
    vertexUV = uv;
    vertexNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); //boilerplate!
    
}



/* void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
} */