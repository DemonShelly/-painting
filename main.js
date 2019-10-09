	
		let canvas = document.getElementById('myCanvas');
		let ctx = canvas.getContext('2d');
		let mode = '';
		let drawing,erasering,drawCircling,drawTriangling,drawRectangling = false;
		let pencilColor='#f18898' ;
		let pencilSize = 1;
		let mx,my,oriX,oriY,sizeText,sizePicker,colorPicker,inputElement,
		fontPicker,fontSizePicker;
		let fontText= 'Merriweather';
		let textColor = "#000000";
		

	
		document.getElementById('pencil').onclick = function(){
			mode='draw'
			canvas.style.cursor="url(img/pencil.png)2.5 25,auto";
		}
		document.getElementById('eraser').onclick = function(){
			mode='eraser'
			canvas.style.cursor="url(img/eraser.png)2.5 25,auto";
		}
		document.getElementById('circle').onclick = function(){
			mode='circle'
			canvas.style.cursor="";
		}
		document.getElementById('triangle').onclick = function(){
			mode='triangle'
			canvas.style.cursor="";
		}
		document.getElementById('rec').onclick = function(){
			mode='rectangle'
			canvas.style.cursor="";
		}

		//上傳檔案
		inputElement = document.getElementById("input");
		
		inputElement.addEventListener("change", handleFiles, false);

			function handleFiles(ev) {
				console.log(this.files)
				
				var img = new Image();	
				let file = ev.target.files[0];
				let reader = new FileReader();

				reader.addEventListener('load',function(){
					img.src = reader.result;

				},false);

				if (file) {
					reader.readAsDataURL(file);
					img.addEventListener('load',function(){
						ctx.drawImage(img,0,0,400,400*img.height/img.width);
					},false);
				}
		  	}

		
		//另存成圖		
		function download() {
			var download = document.getElementById("download");
			var image = document.getElementById("myCanvas").toDataURL("image/png")
			    .replace("image/png", "image/octet-stream");//跳出另存新檔
			download.setAttribute("href", image);

			}


		//新增文字
			//選字型
		 	fontPicker = document.getElementById('fontStyle');
			fontPicker.addEventListener("change", watchFontPicker, false);

			function watchFontPicker(event) {
				fontText= event.target.value;	 
			}
			//選字大小
			fontSizePicker = document.getElementById('textSize')
			fontSizePicker.addEventListener("change", watchFontSizePicker, false);

			function watchFontSizePicker(event) {
				sizeText= event.target.value;
				// console.log(sizeText);	 
			}

		function newText(){
			let textContent = document.getElementById('text').value;
		
			ctx.font = sizeText+'px'+' '+fontText;
			ctx.fillStyle = textColor;
			ctx.textBaseline = "top";
			ctx.fillText(textContent,0,0);

		}
	

		//顏色選擇
		colorPicker = document.getElementById('color')
		colorPicker.addEventListener("change", watchColorPicker, false);

		function watchColorPicker(event) {
			pencilColor= event.target.value;	 
		  	// console.log(event.target.value);
		}

		//畫筆粗細
		sizePicker = document.getElementById('fontsize')
		sizePicker.addEventListener("change", watchSizePicker, false);
		function watchSizePicker(event) {		
			pencilSize = event.target.value
		  	// console.log(event.target.value);
		}

		//生成形狀
		function drawRec(x1,y1,x2,y2){
			ctx.beginPath();
			ctx.fillStyle=pencilColor;
			ctx.moveTo(x1,y1);
			ctx.lineTo(x1,y2);
			ctx.lineTo(x2,y2);
			ctx.lineTo(x2,y1);
			ctx.fill();

		}
		function drawTri(x1,y1,x2,y2){
			ctx.beginPath();
			ctx.fillStyle=pencilColor;
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.lineTo(-(x2)+(2*x1),y2);
			ctx.fill();

		}
		function drawCircle(x,y,r){
			ctx.beginPath();
			ctx.fillStyle=pencilColor;
			ctx.arc(x,y,r,0,Math.PI*2,true);
			ctx.fill();

		}

		function dist(x1,y1,x2,y2){
			return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		}



		//畫筆選擇
		function styleButt(){
			ctx.lineCap='butt';
		}
		function styleRound(){
			ctx.lineCap='round';
		}
		function styleRound2(){
			ctx.lineJoin='round';
		}
		function styleMiter(){
			ctx.lineJoin='miter';
		}
		function styleBevel(){
			ctx.lineJoin='bevel';
		}

		function clearAll(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);

		}

		//畫畫事件
		function draw(){
			ctx.beginPath();
			ctx.strokeStyle = pencilColor;
			ctx.lineWidth = pencilSize;
		}
		function eraserDraw(){
			ctx.beginPath();
			ctx.strokeStyle = eraserColor;
			ctx.lineWidth = pencilSize;
		}

		canvas.onmousedown = function(ev){
			mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
			my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
			

			if (mode=='draw') {
				draw();	
			    ctx.moveTo(mx, my);
			    drawing=true;
			    
			}
			else if (mode=='eraser') {
				eraserColor = 'white';
				
				eraserDraw();
			    ctx.moveTo(mx, my);
			    erasering=true;
			}
			
			else if (mode =='circle'){
				
				oldImg = ctx.getImageData(0,0,canvas.width,canvas.height);
				oriX=mx;
				oriY=my;
				drawCircling=true;
			}
			else if (mode=='triangle') {
				
				oldImg = ctx.getImageData(0,0,canvas.width,canvas.height);
				oriX=mx;
				oriY=my;
				drawTriangling=true;
			}
			else if (mode=='rectangle') {
				oldImg = ctx.getImageData(0,0,canvas.width,canvas.height);
				oriX=mx;
				oriY=my;
				drawRectangling=true;
			}

		}

		canvas.onmousemove = function(ev){
			mx = event.clientX - parseInt(canvas.style.left) + window.pageXOffset;
		    my = event.clientY - parseInt(canvas.style.top) + window.pageYOffset;
			if(drawing&&mode=='draw'){
				
		        ctx.lineTo(mx, my);
		        ctx.stroke();

   			 }
   			 else if (erasering&&mode=='eraser') {
   		
		        ctx.lineTo(mx, my);
		        ctx.stroke();
		        
   			 }
   			 else if (drawCircling&&mode=='circle') {
   			 	clearAll();
   			 	ctx.putImageData(oldImg,0,0);
   			 	drawCircle(oriX,oriY,dist(oriX,oriY,mx,my));
   			 }
   			 else if(drawTriangling&&mode=='triangle'){
   			 	clearAll();
   			 	ctx.putImageData(oldImg,0,0);
   			 	drawTri(oriX,oriY,mx,my);
   			 }
   			 else if (drawRectangling&&mode=='rectangle') {
   			 	clearAll();
   			 	ctx.putImageData(oldImg,0,0);
   			 	drawRec(oriX,oriY,mx,my);
   			 }

		}

		canvas.onmouseup = function(){
			if (mode=='draw') {
				drawing = false;
			}
			else if(mode =='eraser'){
				erasering = false;
			}
			else if(mode =='circle'){
				drawCircling=false;
			}
			else if (mode=='triangle') {
				drawTriangling = false;
			}
			else if (mode=='rectangle') {
				drawRectangling=false;
			}
			
			
		}
