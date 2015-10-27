<script type="text/javascript">
	var str = "#C9F7C4";
	var rgb = fToRgb(str);
	console.log(rgb);
	function HexToRgb(hstr){
		var newArr = [];
		var arrToStr = "";
		var fArr = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"a":10,"b":11,"c":12,"d":13,"e":14,"f":15};
		var newStr = hstr.substr(1,hstr.length-1);
		for(var i=0;i<parseInt(newStr.length/2);i++){
			var splitStr = newStr.substr(parseInt(i*2),2);
			var first = splitStr.substr(0,1).toLowerCase();
			var last = splitStr.substr(1,1).toLowerCase();
				newArr.push(parseInt(parseInt((fArr[first]*16))+parseInt(fArr[last])));
			}
		for(var k=0;k<newArr.length;k++){
			arrToStr+= newArr[k]+",";
		}
		return "rgb("+arrToStr.substr(0,arrToStr.length-1)+")";
	}
</script>
