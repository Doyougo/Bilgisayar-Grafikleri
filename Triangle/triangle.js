main();

function main() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");
  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }
  
	var vertShdr;
	var fragShdr;

	var vertElem = document.getElementById( "vertex-shader" );//eleman olusturduk ve aldık
	if ( !vertElem ) {
	   alert( "Unable to load the vertex shader!" );
	   return -1;
	}
	else {
	   vertShdr = gl.createShader( gl.VERTEX_SHADER );//boş gölge objesi olusturduk
	   gl.shaderSource( vertShdr, vertElem.text );//kaynağı ayarladık.
	   gl.compileShader( vertShdr );
	   if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) )//kontrol
	   {
		  alert( "Vertex shader failed to compile!" );
		  return -1;
	   }
	}
	
	var fragElem = document.getElementById( "fragment-shader" );
	if ( !fragElem ) {
	   alert( "Unable to load fragment shader!" );
	   return ;
	}
	else {
	   fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
	   gl.shaderSource( fragShdr, fragElem.text );
	   gl.compileShader( fragShdr );
	   if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
		  alert( "Fragment shader failed to compile!" );
		  return -1;
	   }
	}
	
	var program = gl.createProgram();//boş program oluşturur.
	gl.attachShader( program, vertShdr );// progragama vertShdr atandı.
	gl.attachShader( program, fragShdr );
	gl.linkProgram( program ); //programı link ettik.

	if ( !gl.getProgramParameter(program, gl.LINK_STATUS) )//link kontrol 
	{
	   alert( "Shader program failed to link!" );
	   return -1;
	}
	gl.useProgram( program );

	// Three Vertices
	var vertices = new Float32Array( 
				[ -1, -1,
				   1, -1,
				   0,  1  ]);
				   
	var bufferId = gl.createBuffer();// buffer oluşturdu ekran kartında yer ayrıldı.
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );// buffer ı webgl için kullanmaya hazır hale getirdik. ID sini verdik.
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );//çizeceğimiz şeklin datasını buraya gönderdik
	 // bind işlemi GpU nun hangi buffer üzerinde işlem yapacağını belirtir.
	
	
	// Associate(ilişkilendirmek) out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );//
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
				   
				   
	// Set clear color to black, fully opaque
	gl.clearColor(1.0, 1.0, 0.0, 1.0);
	// Clear the color buffer with specified clear color
	gl.clear(gl.COLOR_BUFFER_BIT);
  
  
	gl.drawArrays( gl.TRIANGLES, 0, 3 );

}