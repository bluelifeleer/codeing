<script type="text/javascript">
/**
 * 十六进制颜色转换为rgb颜色值，支持简写和完整的十六进制颜色值写法，如：#CCC or #CCCCCC。
 * 十六进制每两位表示一个颜色值，对应rgb(255,255,255)这种格式
 * 取十六进制颜色字符串的每两位取一次，用取到的两位值中的第一位在颜色中对应的值乘以１６加上第二位上的数字在颜色中对应的值便是当前两位代表的rgb中的一种颜色，
 * @param hex color string
 * @return rgbString
 * @using HexToRgb(hstr);
 * @date 2015-10-27
 * @author bluelife
 * @email thebulelife@163.com
 */
var hexColorStr = "#ccc";		//hex color string
var rgb = HexToRgb(hexColorStr);	//return rgbstring
console.log(rgb);			//parint rgb
function HexToRgb(hstr){
	var newArr = [];
	var arrToStr = "";
	var fArr = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"a":10,"b":11,"c":12,"d":13,"e":14,"f":15};
	var newStr = hstr.substr(1,hstr.length-1);				//十六进制的字符串去掉#号
	if(newStr.length == 3){							//十六进制的颜色值简写如：#FFF,#CCC等
		for(var i=0;i<newStr.length;i++){
			var splitStr = newStr.substr(parseInt(i*1),1);
			var first = splitStr.substr(0,1).toLowerCase();
			newArr.push(parseInt(parseInt((fArr[first]*16))+parseInt(fArr[first])));	//计算rgb值并以数组形式保存
		}
	}else{												//十六进制的颜色值不简写：#FFFFFF,#CCCCCC等
		for(var i=0;i<parseInt(newStr.length/2);i++){
			var splitStr = newStr.substr(parseInt(i*2),2);
			var first = splitStr.substr(0,1).toLowerCase();
			var last = splitStr.substr(1,1).toLowerCase();
			newArr.push(parseInt(parseInt((fArr[first]*16))+parseInt(fArr[last])));
		}
	}
	if(newArr.join()){
		return "rgb("+newArr.join()+")";						//把数组转换成字符串
	}else{
		for(var k=0;k<newArr.length;k++){
			arrToStr+= newArr[k]+",";
		}
		return "rgb("+substr(0,arrToStr.length-1)+")";
	}
}
</script>
