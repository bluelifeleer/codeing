/**
 * 为字符串添加trim、ltrim、rtrim等去除空格的方法。
 * 使用：<scripot type="text/javascript" src="./trim_str.js"></script>
 *       <scripot type="text/javascript">
 * 	 	let str = '  sdfsdfg   wsrffgvsdf  ';
 * 		console.log(str.trim());	//去除两边空格
 * 		console.log(str.ltrim());	//去除左边空格
 * 		console.log(str.rtrim());	//去除右边空格
 * 	 </script>
 * @return string
 * @author bulelife thebulelife@163|outlook.com
 * @date 2016-09-01
 */
String.prototype.trim = function (fag='default'){
	const preg_arr = {'default':/(^\s*)|(\s*$)/,'left':/(^\s*)/,'right':/(\s*$)/};
	switch(fag){
		case 'left':
			return this.replace(preg_arr.left,'');
		break;
		case 'right':
			return this.replace(preg_arr.right,'');
		break;
		default:
			return this.replace(preg_arr.default,'');
		break;
	}
}

String.prototype.ltrim = function (){
	return this.trim('left');
}

String.prototype.rtrim = function (){
	return this.trim('right');
}


//test using
var str = '       swd  dfgdfgn  ';
console.log(str.trim());
