 
uniform sampler2D nightCityTex;

varying vec2 vertexUV; //vec2(0, 0.24). Imported from vertexShader.glsl
varying vec3 vertexNormal; //defines facing direction of vertex. Imported from vertexShader.glsl


void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 3.5);

    gl_FragColor = vec4(vec3(0.00, 0.00, 0.04) + texture2D(nightCityTex, vertexUV).xyz, 1.0);
        //vec3(0.05, 0.05, 0.15)
        //atmosphere
        
         
} 


/* void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Solid red color
} */