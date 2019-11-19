/*
	作用: 数组求和
	参数: 数据
	返回值: 数值
*/
function sum(obj) {
	var num = 0
	for (var i=0; i<obj.length; i++) {
		num += obj[i]					
	}
	return num
}
/*
	作用: 获取标签
	参数: 第一个值：必选项，元素名
		 第二个值：可选项，父级元素，用来限定第一个元素
	返回值: 元素值
	
	新版本获取元素方法
function $(name,parent){
	parent = parent || document
	var name = parent.querySelectorAll(name)
	return name
}*/

// 兼容版本获取元素方法
function $(name,obj) {
	var first = name.charAt(0)	//	判断首位字符是什么
	obj = obj || document;	//	判断是否有父级参数传入
	if (first == '#') {	//	如果首位字符是 #，说明需要通过 id 取得元素
		id = name.split('#')[1]
		return obj.getElementById(id)
	} else if(first == '.') {	//	如果首位字符是 . ,说明是需要通过 class 名取得元素
		var all = obj.getElementsByTagName('*')	//	获取所有的元素
		var styleName = name.split('.')[1]	//	获取无 . 类名的字符串
		var num = []	//	定义一个空数组
		for (var i=0; i<all.length; i++) {	//	遍历所有的元素，也就是 all 数组
			if (all[i].className) {	//	含有 className 的元素才进入判定
				var arr = all[i].className.split(' ')	//	把所有的 className 元素分割为数组并赋值给 arr
				for (var k=0; k<arr.length; k++) {	//	遍历 arr 数组
					if(arr[k] == styleName){	// 判断数组中是否有与传入函数相等的值
						num.push(all[i])	//	将这个元素放入 num 数组中					
					}
				}
			}
		}
		return num		//	返回值是 num 数组
		// console.log(className)
		
	} else {
		return obj.getElementsByTagName(name)	//	通过标签名获取元素
	}
}

/*
	作用：给元素添加想要的事件，并且自己写对应的操作
	参数：第一个值：元素名
		 第二个值：想添加事件
		 第三个值：对应的操作
*/
function bind(name,event,fn) {
	name['on'+event] = fn
}

/*
	作用：遍历一个数组
	参数：第一个值：数组
		 第二个值：函数
	
*/
function forEach(obj,fn) {
	for(var i=0; i<obj.length; i++) {
		fn(obj[i],i)
	}
}

/*
	作用：封装一个全选盘算函数
	参数：
*/
function check(obj) {
	var onoff = true
	forEach(obj,function(el){
		if (el.checked == false) {
			onoff = false
		}
	}) 
	return onoff
}
/*
	作用：封装一个兼容获取样式的函数
	参数：
		第一个值：元素名
		第二个值：样式名
	返回值：样式的值
*/
function getStyle(obj,attr) {
	if(obj.currentStyle){
	   // ie
	   return obj.currentStyle[attr]
	}else{
	   // 谷歌
	   return getComputedStyle(obj)[attr];
	}
}

/*
	作用:封装一个给元素添加 class 的函数
	参数：
		第一个值：元素名，
		第二个值：样式名
	//	高版本添加 class 样式方法
function addClass(obj,styleName) {
	var str = obj.className	//	获取元素所有的 class 样式
	if (str){	//	判断 str 是否有值
		if(str.indexOf(styleName) == -1) {	//	查找 str 中是否有符 styleName 的值
			obj.className = obj.className + ' ' + styleName	//	如果 styleName 在str找不到那么在元素已有的 className 基础上加上 styleName
		}
	}else{
		obj.className = styleName
	}
} 
*/
	//	兼容版本的添加 class 样式方法
function addClass(obj,styleName) {
	var str = obj.className // 获取元素所有的 class 样式
	if (str) {	//	判断 str 是否有值
		var arr = str.split(' ')	//	将获取的字符串分割成数组
		var onoff = false	//	定义一个 onoff 为 
		for (var i=0; i<arr.length; i++) {	// 遍历 arr 数组
			if (arr[i] == styleName) {	//	判读数组中是否有同传入的 styleName 相同值
				onoff = true	//	如果有将 onoff 赋值为 true
			}
		}
		if (!onoff) {	//	只有 onoff 为false 时才给元素添加 styleName 值
			obj.className = obj.className + ' ' + styleName
		}
	} else {
		obj.className = styleName
	}
}

/*
	作用：封装一个删除元素 class 的函数
	参数：
		第一个值：元素名
		第二个值：样式名
	//	高版本删除元素 class 样式方法
function removeClass(obj,styleName) {
	if(obj.className) {	//	判断元素是否有 class 值
		var arr = obj.className.split(' ')	//	将元素的所有 class 名拆分成数组
		if (arr.indexOf(styleName) != -1) {	//	判断数组是否存在有和 styleName 相同的值
			arr.splice(arr.indexOf(styleName),1)	//	删除数组中和 styleName 相同的值
			obj.className = arr.join(' ')	//	给元素添加数组中的属性
		}
	}
}
*/
	//	兼容版本删除元素 class 样式的方法
function removeClass(obj,styleName) {
	if (obj.className) {	//	当元素用 className 值时执行
		var arr = obj.className.split(' ')	//	获取所有的 class 样式名并且赋值给 arr 数组
		for (var i=0; i<arr.length; i++) {	//	遍历 arr 数组
			if (arr[i] == styleName) {	//	判断 arr 数组中是否有同传入的 styleName 相同的值
				arr.splice(i,1)		//	如果有，删除数组中的该值			
			}
		}
		obj.className = arr.join(' ')	//	先把数组拼接成字符串，赋值给元素的 className 属性
	}
}

/*
	作用：封装一个获取元素同级之间的上一个同级元素的函数
	参数：是一个元素
	返回值：传入元素的上一个同级元素
		
*/

function prev(el) {
	if (el.nodeType != 1) {	//	判断参数是否是一个元素
		return '请输入正确的元素';
	}
	return el.previousElementSibling;	//	返回值是传入元素的上一个同级元素
}

/*
	作用：封装一个获取元素同级之间的下一个同级元素的函数
	参数：是一个元素
	返回值：传入元素的下一个同级元素
		
*/

function next(el) {
	if (el.nodeType != 1) {	//	判断传入参数是否是一个元素
		return '请输入一个正确的元素';
	}
	return el.nextElementSibling;	//	返回值是传入元素的下一个同级元素
}

/*
	作用：封装一个获取元素父级的函数
	参数：是一个元素
	返回值：传入元素的父级元素
		
*/

function parent(el) {
	if(el.nodeType != 1) {	//	判断传入元素是否是一个元素
		return '请输入一个正确的元素';
	}
	return el.parentNode;	//	返回值是传入元素的父级元素
}

/*
	作用：封装一个获取元素同级之前的所有同级元素
	参数：是一个元素
	返回值：一个数组
		
*/
function  prevAll(el) {
	if(el.nodeType != 1) {	//	判断传入参数是否为一个元素
		return '请添加一个元素';
	}
	var arr = [];	//	定义一个空数组用来存放传入元素之前的同级元素
	function fn(el) {	//	定义一个查询上一个同级元素的函数
		var prev = el.previousElementSibling;	//	获取传入参数的上一同级元素
		if (prev) {	//	如果 prev 有值
			arr.push(prev);	//	将 prev 存入数组
			fn(prev);	//	
		}
	}
	fn(el);	//	调用递归函数
	return arr;	//	返回值是一个数组
}

/*
	作用：封装一个获取元素同级之后的所有同级元素
	参数：是一个元素
	返回值：一个数组
		
*/

function nextAll(el) {
	if (el.nodeType != 1) {	//	判断参数是否为元素
		return '请输入正确的元素';
	}
	var arr = [];	//	定义一个空数组用来存放传入元素之后的同级元素
	function fn(el) {	//	定义一个查询下一个同级元素的函数
		var next = el.nextElementSibling;	//	获取传入参数的下一同级元素
		if (next) {	//	判断 next 是否有值
			arr.push(next);	//	将 next 存入数组中
			fn(next);	// 再次调用 fn 函数
		}
	}
	fn(el);	//	首次调用 fn 函数
	return arr;	//	返回数组
}

/*
	作用：找到排除自己以外的所有兄弟元素
	参数：
		el:是一个元素
		str:字符串，是 class 名或者标签名
	返回值：一个数组
		
*/

function siblings(el,str) {
	if (el.nodeType != 1) {
		return '请输入正确的元素';
	}
	var parent = el.parentNode;	//	获取传入元素的父级元素
	var children = parent.children;	//	获取该父级元素的所有自己元素
	var arr = [];	//	定义一个空数组用来存放符合条件的元素
	for (var i=0; i<children.length; i++) {	//	遍历所有的子元素
		if (children[i] != el) {	//	判断遍历的子元素是否等于传入元素
			arr.push(children[i]);	//	如果不等于，将该子元素放入数组中
		}
	}
	if (str) {	//	判断是否有第二个传入参数
		var first = str[0];	//	获取第二个传入参数值的首字符
		if (first == '.') { //	如果首字符等于 . 说明传入参数是一个 class 名
			var arr1 = [];
			var styleName = str.substring(1);
			for (var i=0; i<arr.length; i++) {	//	遍历 arr 数组
				var newarr = [];	//	定义一个新的数组
				newarr = arr[i].className.split(' ');	//	将 arr 数组子元素的 className 用空格分割成一个新数组
				 for (var k=0; k<newarr.length; k++) {	//	遍历该元素的所有 className
					 if (newarr[k] == styleName) {	//	如果有样式名与传入的 styleName 值相等
						 arr1.push(arr[i]);		//	将className 对应的元素传入 arr1 中
					 }
				 }
			}
			return arr1;	//	返回值为 arr1
		} else {	//	传入参数为 标签名
			var arr2 = [];	//	定义一个用来存放返回值的空数组
			var label = str.toUpperCase();	//	将传入的标签名转化为大写
			for (var i=0; i<arr.length; i++) {	//	遍历	 arr 数组
				var className = arr[i].nodeName;	// 获取每一个元素的元素名
				if (className == label) {	//	如果遍历元素的标签名等于传入元素的标签名，将对应的元素传入 arr2 中
					arr2.push(arr[i]);
				}
			}
			return arr2;	//	返回值为 arr2
		}
	} else {
		return arr;	//没有第二个传入参数，返回 arr 数组
	}
}

/*
	作用：一个兼容低版本 IE 的事件监听函数
	参数：
		el：元素
		event：需要绑定的事件
		fn：触发事件是需要执行的函数
*/

function addEvent(el,event,fn) {
	if(!(el.nodeType == 1 || el.nodeType == 9)){
	   return '请输入正确的元素'
	}
	function fn1(ev){
		ev = ev || window.event;
		typeof fn == 'function' && fn.call(el,ev,fn1);
	}
	if(el.addEventListener){	//	判断 el 是否为元素
	   // 谷歌			   
	   el.addEventListener(event,fn1);				   
	}else{
	   // ie
	   el.attachEvent('on'+event,fn1);
	}
	
}

/*
	作用：获取倒计时的函数
	参数：是一个对象
		对象的第一个属性：未来时间
		对象的第二个属性：函数
			函数的实参是：天数，小时，分钟，秒
*/
function countDown(obj){
	var date =	new Date(obj.future).getTime();	//	未来的时间
	var nowDate = new Date().getTime();	//	当前时间
	var timeRange = (date - nowDate)/1000;	//	将未来时间与当前时间的差值换算为秒
	var day = parseInt(timeRange/(60*60*24));	//	将差值换算为天
	var hours = parseInt((timeRange - (day*60*60*24))/(60*60));	//	将差值换算为小时
	var mins = parseInt((timeRange - (day*60*60*24 + hours*60*60))/60); 	//	将差值换算为分钟
	var seconds = parseInt(timeRange - (day*60*60*24 + hours*60*60 + mins*60));	//	将差值换算为秒
	// console.log(day,hours,mins,seconds);
	typeof obj.success == 'function' && obj.success({
		day:day,
		hours:hours,
		mins:mins,
		seconds:seconds
	}) 
}

/*
	作用：封装一个拖动元素的函数
	参数：
		参数一：el，需要拖动的元素
		参数二：fn，一个带参数的函数
*/
function darg(el,fn){	//	封装的拖动函数
	addEvent(el,'mousedown',function(ev){	//	当鼠标按下 box 元素触发事件
		var originL = ev.pageX;	//	获取鼠标最初在 x 轴的位置
		var originT = ev.pageY;	//	获取鼠标最初在 y 轴的位置
		var obj = this.getBoundingClientRect();	//	获取当前元素的的信息
		var starL = obj.left;	//	获取元素开始的 left 值
		var starT = obj.top;	//	获取元素开始的 top 值
		var fnN = null;	//	定义一个 fn 变量用来存储函数名
		addEvent(document,'mousemove',function(ev,fnName) {	//	当鼠标移动时触发事件
			var disL = ev.pageX - originL;	//	获取当期鼠标的 x 轴值同鼠标最初在 x 轴的差值
			var disT = ev.pageY - originT;	//	获取当期鼠标的 y 轴值同鼠标最初在 y 轴的差值
			el.style.left = starL + disL + 'px';	//	改变 box 元素的 left 值
			el.style.top = starT + disT + 'px';	//	改变 box 元素的 top 值
			fnN = fnName;	//	将本事件调用的函数名存储起来
			typeof fn == 'function' && fn(ev);	//	调用传入的 fn 函数
			
		})
		addEvent(document,'mouseup',function(ev,fnName){	//	当鼠标抬起触发事件
			document.removeEventListener('mousemove',fnN);	//	解绑鼠标移动事件
			document.removeEventListener('mouseup',fnName);	//	解绑鼠标抬起事件
		})
		ev.preventDefault();	//	阻止浏览器的默认行为
	})
}

/*
	作用：封装一个放大镜的函数
	参数：el，盛放放大镜的容器
*/

function enlarge(el) {
	var wrap = $(el)[0];	//	获取放大镜的父级元素
	var origin = wrap.firstElementChild;	//	获取放大镜的第一个子元素
	var nextb  = next(origin);	//	获取 origin 的下一个兄弟元素
	addEvent(origin,'mouseenter',function(ev){	//	给第一个子元添加鼠标移入事件
		var div = document.createElement('div');	//	创建一个 遮罩元素
		this.appendChild(div);	//	把遮罩元素插入到父级元素中					
		addEvent(this,'mousemove',function(ev){					
			var disL = ev.pageX - this.offsetLeft - div.clientWidth/2;	//	获取鼠标移入时 x 轴与 元素 的 left 差值减去 div 宽度的一半
			var disH = ev.pageY - this.offsetTop - div.clientHeight/2	//	获取鼠标移入时 y 轴与 元素 的 left 差值减去 div 高度的一半
			var maxL =  this.clientWidth - div.clientWidth;	//	获取 div 在 元素中移动的最大 left 值
			var maxH = this.clientHeight - div.clientHeight; //	获取 div 在元素中移动的最大 top 值
			if (disL >= maxL) {	//	判断 left 差值是否大于最大值
				disL = maxL;
			} else if (disL <= 0) {	//	判断 left 差值是否小于0
				disL = 0;
			} 
			if (disH >= maxH) {	//	判断 top 差值是否大于最大值
				disH = maxH;
			} else if (disH <= 0) {	//	判断 top 差值是否小于0
				disH = 0;
			}
			div.style.left = disL + 'px';	//	给 div 的 left 重新赋值
			div.style.top = disH + 'px';	//	给 div 的 top 重新赋值
			var proL = disL / maxL;	//	获取鼠标在 x 轴的比例
			var proH = disH / maxH;	//	获取鼠标在 y 轴的比例						
			var oImg =  nextb.firstElementChild; 	//	获取大图
			var disW = oImg.clientWidth - nextb.clientWidth;	//	获取图片移动的最大宽度
			var disT = oImg.clientHeight - nextb.clientHeight;	//	获取图片移动的最大高度	
			nextb.style.display = 'block';	//	给 display 重新设置值
			oImg.style.left = -disW * proL + 'px'; //	重新设置图片的 left 值
			oImg.style.top = - disT * proH + 'px';	//	重新设置图片的 top 值
		})
		addEvent(this,'mouseleave',function(ev){						
			nextb.style.display = 'none';	//	给 display 重新设置值
			div.remove();	//	移除 div 元素
		})
	})
}

/*
	作用：封装一个判断两个元素是否碰撞的函数
	参数：
		参数一：
		参数二：元素
	返回值：
		ture 两个元素碰撞
		false 两个元素没有碰撞
*/

function collision(obj,obj1) {
	var obj = obj.getBoundingClientRect();	//	获取obj的各种信息
	var obj1 = obj1.getBoundingClientRect();	//	获取obj1的各种信息
	//	获取obj1的 left , top , top , bottom
	var pl = obj1.left;
	var pr = obj1.right;
	var pt = obj1.top;
	var pb = obj1.bottom;
	//	获取obj的 left , top , top , bottom
	var bl = obj.left;
	var br = obj.right;
	var bt = obj.top;
	var bb = obj.bottom;
	if (pr >= bl && pb >= bt && pl <= br && pt <= bb) {
		return true;
	} else {
		return false;
	}
}

/*
	作用：封装一个滚轮滚动事件
	参数：
		参数一：触发滚轮事件的元素
		参数二：滚轮上滚执行的函数
		参数二：滚轮下滚执行的函数
*/

function wheel(obj,upFn,downFn) {
	var str = window.navigator.userAgent;	//	获取浏览器的代理信息
	if (str.indexOf('Chrome') != -1) {	//	在谷歌浏览器中
		addEvent(obj,'wheel',function(ev) {	
			if (ev.wheelDelta > 0) {	//	滚轮上滚
				typeof upFn == 'function' && upFn();
			} else if (ev.wheelDelta < 0) {	//	滚轮下滚
				typeof downFn == 'function' && downFn();
			}
		})				
	} else if (str.indexOf('Firefox') != -1) {	//	在火狐浏览器中
		addEvent(obj,'DOMMouseScroll',function(ev) {
			if (ev.detail < 0) {	//	滚轮上滚
				typeof upFn == 'function' && upFn();
			} else if (ev.detail > 0) { //	滚轮下滚
				typeof downFn == 'function' && downFn();
			}
		})
	}
}