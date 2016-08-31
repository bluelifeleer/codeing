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

var str = '       swd  dfgdfgn  ';
console.log(str.trim());
