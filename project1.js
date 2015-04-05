

var canvas;
var gl;

var numVertices  = 36;

var texSize = 64;

var program;

var direction = 1;

var hold = 0;
var win = 0;

var game_place = 1;
var color_of_vertex = [1, 0, 1, 0, 1, 2, 1, 2];
var highlight = 0;

var pointsArray = [];
var colorsArray = [];
var texCoordsArray = [];

var texture;

var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

var vertexColors = [
    vec4( 1.0, 0.3, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 0.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];    

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta = [45.0, 45.0, 45.0];

var thetaLoc;

function configureTexture( image ) {
    texture = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
    
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}


function quad(a, b, c, d) {

     hold = color_of_vertex[highlight];
     color_of_vertex[highlight] = 4;
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[color_of_vertex[a]]); 
     texCoordsArray.push(texCoord[0]);

     pointsArray.push(vertices[b]); 
     colorsArray.push(vertexColors[color_of_vertex[b]]);
     texCoordsArray.push(texCoord[1]); 

     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[color_of_vertex[c]]);
     texCoordsArray.push(texCoord[2]); 
   
     pointsArray.push(vertices[a]); 
     colorsArray.push(vertexColors[color_of_vertex[a]]);
     texCoordsArray.push(texCoord[0]); 

     pointsArray.push(vertices[c]); 
     colorsArray.push(vertexColors[color_of_vertex[c]]);
     texCoordsArray.push(texCoord[2]); 

     pointsArray.push(vertices[d]); 
     colorsArray.push(vertexColors[color_of_vertex[d]]);
     texCoordsArray.push(texCoord[3]); 
     color_of_vertex[highlight] = hold;
}


function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function change(where)
{
	if(where == 0)
	{
		color_of_vertex[0] = (color_of_vertex[0] + 1) % 3 
		color_of_vertex[4] = (color_of_vertex[4] + 1) % 3 
		color_of_vertex[3] = (color_of_vertex[3] + 1) % 3 
		color_of_vertex[1] = (color_of_vertex[1] + 1) % 3 
	}
	if(where == 1)
	{
		color_of_vertex[0] = (color_of_vertex[0] + 1) % 3 
		color_of_vertex[5] = (color_of_vertex[5] + 1) % 3 
		color_of_vertex[2] = (color_of_vertex[2] + 1) % 3 
		color_of_vertex[1] = (color_of_vertex[1] + 1) % 3 
	}
	if(where == 2)
	{
		color_of_vertex[3] = (color_of_vertex[3] + 1) % 3 
		color_of_vertex[6] = (color_of_vertex[6] + 1) % 3 
		color_of_vertex[2] = (color_of_vertex[2] + 1) % 3 
		color_of_vertex[1] = (color_of_vertex[1] + 1) % 3 
	}
	if(where == 3)
	{
		color_of_vertex[0] = (color_of_vertex[0] + 1) % 3 
		color_of_vertex[7] = (color_of_vertex[7] + 1) % 3 
		color_of_vertex[3] = (color_of_vertex[3] + 1) % 3 
		color_of_vertex[2] = (color_of_vertex[2] + 1) % 3 
	}
	if(where == 4)
	{
		color_of_vertex[0] = (color_of_vertex[0] + 1) % 3 
		color_of_vertex[4] = (color_of_vertex[4] + 1) % 3 
		color_of_vertex[5] = (color_of_vertex[5] + 1) % 3 
		color_of_vertex[7] = (color_of_vertex[7] + 1) % 3 
	}
	if(where == 5)
	{
		color_of_vertex[5] = (color_of_vertex[5] + 1) % 3 
		color_of_vertex[4] = (color_of_vertex[4] + 1) % 3 
		color_of_vertex[6] = (color_of_vertex[6] + 1) % 3 
		color_of_vertex[1] = (color_of_vertex[1] + 1) % 3 
	}
	if(where == 6)
	{
		color_of_vertex[6] = (color_of_vertex[6] + 1) % 3 
		color_of_vertex[2] = (color_of_vertex[2] + 1) % 3 
		color_of_vertex[7] = (color_of_vertex[7] + 1) % 3 
		color_of_vertex[5] = (color_of_vertex[5] + 1) % 3 
	}
	if(where == 7)
	{
		color_of_vertex[7] = (color_of_vertex[7] + 1) % 3 
		color_of_vertex[6] = (color_of_vertex[6] + 1) % 3 
		color_of_vertex[4] = (color_of_vertex[4] + 1) % 3 
		color_of_vertex[3] = (color_of_vertex[3] + 1) % 3 
	}
}

function is_win()
{
	win = 0;
	if(color_of_vertex[0] == 1 && color_of_vertex[1] == 1 && color_of_vertex[2] == 1 && color_of_vertex[3] == 1 && color_of_vertex[4] == 1 && color_of_vertex[5] == 1 && color_of_vertex[6] == 1 && color_of_vertex[7] == 1)
	{
		win = 1;
	}
	if(color_of_vertex[0] == 0 && color_of_vertex[1] == 0 && color_of_vertex[2] == 0 && color_of_vertex[3] == 0 && color_of_vertex[4] == 0 && color_of_vertex[5] == 0 && color_of_vertex[6] == 0 && color_of_vertex[7] == 0)
	{
		win = 1;
	}
	if(color_of_vertex[0] == 2 && color_of_vertex[1] == 2 && color_of_vertex[2] == 2 && color_of_vertex[3] == 2 && color_of_vertex[4] == 2 && color_of_vertex[5] == 2 && color_of_vertex[6] == 2 && color_of_vertex[7] == 2)
	{
		win = 1;
	}
}




window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
   
    if(game_place == 1)
    {
    console.log(pointsArray.length);
    colorCube();
    console.log(pointsArray.length);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    //
    // Initialize a texture
    //

    var image = new Image();
    image.onload = function() { 
        configureTexture( image );
    }
    image.src = "first.gif"


    //var image = document.getElementById("texImage");
 
    configureTexture( image );

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    } 


window.onkeydown = function(event) {
	var key = event.keyCode;
	console.log(key);
	switch(key) {
		case 67:
			if (game_place == 2)
			{
				change(highlight);
			}
			if(game_place == 1)
			{
				game_place = 2;
			}
			is_win();

			break;
		case 37:
			highlight = (highlight + 5) % 8
			axis = yAxis;
			direction = -1;
			break;
		case 38:
			highlight = (highlight + 4) % 8
			axis = xAxis;
			direction = -1;
			break;
		case 39:
			highlight = (highlight + 3) % 8
			axis = yAxis;
			direction = 1;
			break;
		case 40:
			highlight = (highlight + 4) % 8
			axis = xAxis;
			direction = 1;
			break;
        }
				pointsArray = [];
				console.log(pointsArray.length);
				colorsArray = [];
				texCoordsArray = [];
				colorCube();
				console.log(pointsArray.length);

				var cBuffer = gl.createBuffer();
				gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
				gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
				var vColor = gl.getAttribLocation( program, "vColor" );
				gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
				gl.enableVertexAttribArray( vColor );
				var vBuffer = gl.createBuffer();
				gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
				gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
				var vPosition = gl.getAttribLocation( program, "vPosition" );
    
				gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    
				gl.enableVertexAttribArray( vPosition );
    
   
				var tBuffer = gl.createBuffer();

				gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );

				gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    

				var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
 
				gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );

				gl.enableVertexAttribArray( vTexCoord );

    //
    // Initialize a texture
    //


				var image = new Image();

				image.onload = function() { 

					configureTexture( image );

				}
				is_win();
				if(win == 1)
				{
					image.src = "third.gif"
				}
				if(win == 0)
				{
					image.src = "second.gif"
				}
				configureTexture( image );
			





    };

    // document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    // document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    // document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
       
    render();
 
}

var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    theta[axis] += 1.00 * direction;
    gl.uniform3fv(thetaLoc, flatten(theta));
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}
