window.onload = function() {
	verticalmenu();
}

function verticalmenu() {
	var padding_left = "15px";
	var menu_div = document.getElementsByClassName("verticalmenu")[0];
	var menu_dl = menu_div.firstElementChild;
	
	//预设每个a的paddingleft
	var a = menu_dl.getElementsByTagName("a");
	for(var i = 0; i < a.length; i++) {
		a[i].style.paddingLeft = padding_left;
	}
	var dl = menu_dl.getElementsByTagName("dl");
	for(var i = 0; i < dl.length; i++) {
		dl[i].style.overflow = "hidden";
	}
	
	each_dd(menu_dl);
	
	function each_dd(dl) {
		var dd = dl.firstElementChild;
		while(dd) {			
			/**
			 * do something
			 */
			
			if(dd.getElementsByTagName("dl")[0]) {		//如果此dd有了菜单
				
				var dl = dd.getElementsByTagName("dl")[0];
				
				dd_is_title(dd);		//是一个可展开的项
				
				each_dd(dl);		//深度遍历
			}
			else {		// dd没有子菜单,是一个可用的菜单
				
				dd_is_item(dd);
				
			}
			
			dd = dd.nextElementSibling;
		}
	}
	//dd是一个可用项
	function dd_is_item(dd) {
		/**
		 * do something
		 */		
	}
	
	//dd是一个标题
	function dd_is_title(dd) {
		var a = dd.firstElementChild;
		//修改字距离左边的距离
		/**
		 * 
		 */
		a.onclick = function() {
			if(this.parentElement.className.indexOf("active") >= 0) {
				//关闭菜单
				do_close_sublist(this);		//关闭子菜单中的所有子菜单
				do_close_list(this);		//关闭菜单
			}
			else {
				//打开菜单
				do_open_list(this);
			}
			
		}
		
	}
	
	//计算子菜单数的同时也给子菜单中的每个 a 
	function get_dd_number(dl) {
		var dd_first = dl.firstElementChild;
		var count = 0;
		while(dd_first != null) {
			count += 1;
			var a = dd_first.firstElementChild;		//dl 下载dd 的a
			var pre_paddingLeft = dl.previousElementSibling.style.paddingLeft;		//dl前一个元素的 a 的padding-left
			a.style.paddingLeft = (parseInt(pre_paddingLeft) + parseInt(padding_left)).toString() + "px";	//再缩进 一个 15
			dd_first = dd_first.nextElementSibling;
		}
		return count;
	}
	
	//关闭菜单
	function do_close_list(this_a) {
		var dl = this_a.nextElementSibling;
		var dd_number = get_dd_number(dl);
		this_a.parentElement.className = this_a.parentElement.className.replace("active", "");		//取消颜色
		this_a.parentElement.parentElement.style.height = ( this_a.parentElement.parentElement.offsetHeight - parseInt(dl.style.height) ).toString() + "px";		//父dl减少高度		
		dl.style.height = "0px";		//高度为零
		this_a.getElementsByTagName("i")[0].className = "icon-chevron-right";		//图标旋转
		/**
		 * 其它操作
		 */
		
	}
	//打开菜单
	function do_open_list(this_a) {
		var dl = this_a.nextElementSibling;
		var dd_number = get_dd_number(dl);
		this_a.parentElement.className = this_a.parentElement.className + " active";		//激活颜色
		dl.style.height = (dd_number * this_a.offsetHeight).toString() + "px";		//出现高度
		this_a.parentElement.parentElement.style.height = (this_a.parentElement.parentElement.offsetHeight + dd_number * this_a.offsetHeight).toString() + "px";		//父dl增加高度		
		this_a.getElementsByTagName("i")[0].className = "icon-chevron-down";		//图标旋转
		/**
		 * 其它操作
		 */
	}
	
	//关闭菜单时同时将子菜单的子菜单关闭
	function do_close_sublist(this_a) {
		var dl = this_a.nextElementSibling;
		var dd = dl.getElementsByTagName("dd");
		for(var i = 0; i < dd.length; i++) {
			if(dd[i].getElementsByTagName("dl")[0] == null) {
				continue;
			}
			var a = dd[i].firstElementChild;
			close_sublist(a);
		}
		function close_sublist(this_a) {
			var dl = this_a.nextElementSibling;
			var dd_number = get_dd_number(dl);
			this_a.parentElement.className = this_a.parentElement.className.replace("active", "");		//取消颜色
			this_a.parentElement.parentElement.style.height = ( this_a.parentElement.parentElement.offsetHeight - parseInt(dl.style.height) ).toString() + "px";		//父dl减少高度		
			dl.style.height = "0px";		//高度为零
			this_a.getElementsByTagName("i")[0].className = "icon-chevron-right";		//图标旋转
		}
	}

}
