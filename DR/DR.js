var gl;
var theta = 0;
var thetaLoc;
var isDirClockwise = false;
var keyState = false;
var delay = 100;
var colorRed = 0;
var colorGreen = 0;
var colorBlue = 0;
var sizeBig = 1 ;
var sizeSmall = 1 ;
var translatingX = 0.1;
var translatingY = 0.1;
var transloc;

window.onload = function init() {

  const canvas = document.querySelector("#glcanvas");
  // Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);

  // Only continue if WebGL is available and working
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

	var program = initShaders(gl, "vertex-shader" , "fragment-shader" );

	gl.useProgram( program );

		//-------------------------SET--------------------------

		sizeBigloc = gl.getUniformLocation(program, "sizeBig");
		gl.uniform1f(sizeBigloc, sizeBig,  sizeBig,  0.0, 0.0);

		sizeSmallloc = gl.getUniformLocation(program, "sizeSmall");
		gl.uniform1f(sizeSmallloc, sizeSmall,  sizeSmall,  0.0, 0.0);

		thetaLoc = gl.getUniformLocation(program, "theta");
		gl.uniform1f(thetaLoc, theta);


		transloc = gl.getUniformLocation(program, "translation");
		gl.uniform4f(transloc, translatingX , translatingY, 0.0, 0.0 );


		gl.clearColor(0.3, 0.4, 0.5, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.drawArrays(gl.TRIANGLES, 0, 42);
		gl.drawArrays(gl.TRIANGLES, 42, 39);

	//COLOR SLIDERS
		document.getElementById("slider").onchange = 		function() {colorRed = this.value;
		redloc = gl.getUniformLocation(program, "red");
		gl.uniform1f(redloc, colorRed); };

		redloc = gl.getUniformLocation(program, "red"); //A yı çağır,kullan
		gl.uniform1f(redloc, colorRed); //programa yükleme yap

		document.getElementById("slideg").onchange = 		function() { colorGreen = this.value;
		greenloc = gl.getUniformLocation(program, "green");
		gl.uniform1f(greenloc, colorGreen); }; //slider ın alacağı değer

		greenloc = gl.getUniformLocation(program, "green"); //A yı çağır,kullan
		gl.uniform1f(greenloc, colorGreen); //programa yükleme yap

		document.getElementById("slideb").onchange = 		function() {colorBlue = this.value;
		blueloc = gl.getUniformLocation(program, "blue");
		gl.uniform1f(blueloc, colorBlue);};//slider ın alacağı değer

		blueloc = gl.getUniformLocation(program, "blue"); //A yı çağır,kullan
		gl.uniform1f(blueloc, colorBlue); //programa yükleme yap


	//-----------------------------------------------------------------
	//----------------------YÖN TUŞLARI-------------------------------
	//-----------------------------------------------------------------

		transloc = gl.getUniformLocation(program, "translation");
		gl.uniform4f(transloc, translatingX , translatingY, 0.0, 0.0 );

	window.addEventListener("keydown", function (event) {
        switch (event.key) {

          case "ArrowDown":
            translatingY -= 0.1;
            break;

          case "ArrowUp":
            translatingY += 0.1;
            break;

          case "ArrowLeft":
              translatingX -= 0.1;
            break;

          case "ArrowRight":
            translatingX += 0.1;
            break;

          default:
            return;
        };
    })

	//-----------------------------------------------------------------
	//----------------------------BUTTONS-------------------------------
	//-----------------------------------------------------------------

		//------------------Büyütme Butonu------------------------------
	var myButton = document.getElementById("DirectionButton");
	myButton.addEventListener("click", buttonPressfunc);

	function buttonPressfunc() {
		sizeBigloc = gl.getUniformLocation(program, "sizeBig");
		gl.uniform1f(sizeBigloc, sizeBig=sizeBig*1.1,  sizeBig=sizeBig*1.1,  0.0, 0.0);
	}


		//------------------Küçültme Butonu------------------------------
	var myButton2 = document.getElementById("DirectionButton2");
	myButton2.addEventListener("click", buttonPressfunc2);

	function buttonPressfunc2() {
		sizeSmallloc = gl.getUniformLocation(program, "sizeSmall");
		gl.uniform1f(sizeSmallloc, sizeSmall=sizeSmall*0.9,  sizeSmall=sizeSmall*0.9,  0.0, 0.0);
	}


	//-----------------------------------------------------------------
	//----------------------------MENU---------------------------------
	//-----------------------------------------------------------------

	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
	switch (m.selectedIndex) {
		case 0:

			keyState =! keyState;
			break;

		case 1:
			isDirClockwise = !isDirClockwise;
			break;

		case 2:
			delay /= 2.0;
			break;

		case 3:
			delay *= 2.0;
			break;
	}

});


	//-----------------------------------------------------------------
	//----------------------------KOORDİNATLAR-------------------------
	//-----------------------------------------------------------------

	var vertices = [ //D HARFi
					vec2(-0.5,0.0),   vec2(-0.5,0.5),   vec2(-0.4,0.5),
					 vec2(-0.5,0.0),  vec2(-0.4,0.0),   vec2(-0.4,0.5),
					 vec2(-0.4,0.5),  vec2(-0.4,0.4),   vec2(-0.2,0.5),
					 vec2(-0.4,0.4),  vec2(-0.2,0.4),   vec2(-0.2,0.5),
					 vec2(-0.2,0.4),  vec2(-0.2,0.5),   vec2(-0.1,0.42),
					 vec2(-0.2,0.4),  vec2(-0.153,0.3), vec2(-0.1,0.42),
					 vec2(-0.1,0.42), vec2(-0.153,0.3), vec2(-0.05,0.3),
					 vec2(-0.153,0.3),vec2(-0.152,0.2), vec2(-0.05,0.3),
					 vec2(-0.152,0.2),vec2(-0.05,0.2),  vec2(-0.05,0.3),
					 vec2(-0.15,0.2), vec2(-0.05,0.2),  vec2(-0.1,0.08),
					 vec2(-0.15,0.2), vec2(-0.21,0.1),  vec2(-0.1,0.08),
					 vec2(-0.2,0.0),  vec2(-0.21,0.1),  vec2(-0.1,0.08),
					 vec2(-0.4,0.1),  vec2(-0.21,0.1),  vec2(-0.2,0.0),
					 vec2(-0.4,0.0),  vec2(-0.4,0.1),   vec2(-0.2,0.0),

						//R HARFİ
					 vec2(0.0,0.5),  vec2(0.1,0.5),   vec2(0.0,0.0),//1çubuk
					 vec2(0.0,0.0),  vec2(0.1,0.0),   vec2(0.1,0.5),//2çubuk
					 vec2(0.1,0.5),  vec2(0.1,0.4),   vec2(0.2,0.5),//3
					 vec2(0.1,0.4),  vec2(0.2,0.4),   vec2(0.2,0.5),//sonradn4
					 vec2(0.2,0.4),  vec2(0.2,0.5),   vec2(0.3,0.4),//sonradn5
					 vec2(0.2,0.3),  vec2(0.2,0.4),   vec2(0.3,0.4),//6
					 vec2(0.2,0.3),  vec2(0.3,0.3),   vec2(0.3,0.4),//7
					 vec2(0.3,0.3),  vec2(0.28,0.25), vec2(0.2,0.3),//8
					 vec2(0.2,0.3),  vec2(0.28,0.25), vec2(0.2,0.2),//9
					 vec2(0.2,0.3),  vec2(0.2,0.2),   vec2(0.1,0.2),//10
					 vec2(0.1,0.2),  vec2(0.1,0.3),   vec2(0.2,0.3),//11
					 vec2(0.2,0.2),  vec2(0.25,0.25), vec2(0.35,0.0),//kuyruk2
					 vec2(0.2,0.2),  vec2(0.25,0.0),  vec2(0.35,0.0),//kuyruk2



					 ];


	var bufferId = gl.createBuffer();// buffer oluşturdu ekran kartında yer ayrıldı.
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );// buffer ı webgl için kullanmaya hazır hale getirdik. ID sini verdik.
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );//çizeceğimiz şeklin datasını buraya gönderdik
	// bind işlemi GpU nun hangi buffer üzerinde işlem yapacağını belirtir.


	// Associate(ilişkilendirmek) out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );//
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );





	// Set clear color to Canvas
	gl.clearColor(255, 201, 139, 1.0);

	requestAnimFrame(render);

};

function render()
{

	setTimeout(function() {

	gl.clear(gl.COLOR_BUFFER_BIT); // Clear the color buffer with specified clear color



	gl.uniform4f(transloc, translatingX , translatingY, 0.0, 0.0 );//öteleme için transloc güncellemesi

	if(keyState) //Stop/Start için
	{
		theta += (isDirClockwise ? -0.1 : 0.1);
	}

	gl.uniform1f(thetaLoc, theta);
	gl.drawArrays(gl.TRIANGLES, 0, 42);
	if(keyState) //Stop/Start için
	{
		theta += (isDirClockwise ? -0.1 : 0.1);
	}
	gl.uniform1f(thetaLoc, -theta);
	gl.drawArrays(gl.TRIANGLES, 42, 39);


	requestAnimFrame(render);

}, delay);

}
