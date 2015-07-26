var ui = {};
var mmenu = {};
var pano_menu = {};
(function(){
	console.log(document.getElementById("krpanoViewer") );
	var show_hide_panos, multimenu, select_lang, multimenu_controls, select_size, i, length, elems, tutorial, photo_container, big_menu;
	var multimenu_opened = true;
	var panos_opened = true;

	window.onresize = function() {
		elem_position();
	}
	window.onload = function () {
		tutorial = document.getElementById("tutorial");
		show_hide_panos = document.getElementById('show_hide_panos');
		multimenu = document.getElementById('multimenu');
		select_lang = multimenu.getElementsByClassName('lang')[0];
		multimenu_controls = multimenu.getElementsByClassName("icon");
		big_menu = multimenu.getElementsByClassName("panels")[0].getElementsByClassName("menu")[0].getElementsByClassName("elem");
		select_size = document.getElementById("share").getElementsByClassName("select")[0];

		select_size.addEventListener("click", function(){
			this.classList.toggle("active");
		});

		window.Slider = {
			cur: 0, //текущий слайд
			len: 0, // всего слайда
			album: null, //ссылка на альбом слайдов
			marker: null, //ссылка на маркер нажатием на который был вызван салйдер
			/**
			 * [nextSlide переход на следующий слайд]
			 * @return {[type]} [description]
			 */
			nextSlide: function() {
				this.hideSlide();
				this.cur += 1;
				if (this.cur > this.len-1) this.cur = 0;
				this.showSlide();
			},
			/**
			 * [prevSlide переход на предыдуший слайд]
			 * @return {[type]} [description]
			 */
			prevSlide: function() {
				this.hideSlide();
				this.cur -= 1;
				if (this.cur < 0) this.cur = this.len - 1;
				this.showSlide();
			},
			/**
			 * [showSlide показывает текущий слайд]
			 * @return {[type]} [description]
			 */
			showSlide: function() {
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = this.cur + 1;

				this.album.getElementsByClassName("photo")[this.cur].classList.add("active");
			},
			/**
			 * [hideSlide прячет текущий слайд(картинку)]
			 * @return {[type]} [description]
			 */
			hideSlide: function() {
				this.album.getElementsByClassName("photo")[this.cur].classList.remove("active");
			},
			/**
			 * [close функция для закрытия альбома и всего слайдер]
			 * @return {[type]} [description]
			 */
			close: function() {
				this.hideSlide();
				this.album.classList.remove("active");
				document.getElementsByClassName("photo_container")[0].classList.remove("active");
				//this.marker.classList.remove("hide");
			},
			/**
			 * [init функия инициализации слайдера]
			 * @param  {[html елемент]} album  [в нем находятся фото]
			 * @param  {[html елемент]} marker [маркер нажатием на который был вызван альбом]
			 * @return {[type]}        [не ретюрнит ничего плохо но как есть]
			 */
			init: function(album) {
				//this.marker = marker;
				this.album = album;
				this.cur = 0;
				//показываем полотно на котором будут отображаны слайды
				document.getElementsByClassName("photo_container")[0].classList.add("active");
				//показываем контейнер всех слайдов
				this.album.classList.add("active");
				var elem = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
				for (var i = 0; i < elem.length; i += 1) {
					if(elem[i].classList.contains("active")) {
						this.len = elem[i].getElementsByClassName("photo").length;
					}
				}
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = this.cur + 1;
				photo_container.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("len")[0].innerText = this.len;
				var albums = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
				for (var i = 0; i < albums.length; i += 1) {
					albums[i].getElementsByClassName("len")[0].innerText = albums[i].getElementsByTagName("img").length;
				}

				this.album.getElementsByClassName("photos")[0].getElementsByClassName("photo")[0].classList.add("active");

				this.showSlide();
			}
		};

		window.Video = {
			vidCont: document.getElementsByClassName("video_container")[0],
			cur: 0,
			len: 0,
			album: null,
			marker: null,
			hide: function() {
				var cur_video = this.vidCont.getElementsByClassName("video")[this.cur];
				cur_video.classList.remove("active")
				cur_video.getElementsByClassName("ifram_cont")[0].innerHTML = '';
			},
			show: function() {
				this.vidCont.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = this.cur + 1;
				var cur_video = this.vidCont.getElementsByClassName("video")[this.cur];
				cur_video.classList.add("active")
				cur_video.getElementsByClassName("ifram_cont")[0].innerHTML = '<iframe width="560" height="315" src="'+cur_video.getElementsByClassName("ifram_cont")[0].getAttribute("data-src")+'" frameborder="0" allowfullscreen></iframe>';
			},
			next: function() {
				this.hide();
				this.cur += 1;
				if (this.cur > this.len-1) this.cur = 0;
				this.show();
			},
			prev: function() {
				this.hide();
				this.cur -= 1;
				if (this.cur < 0) this.cur = this.len - 1;
				this.show();
			},
			close: function() {
				this.hide();
				document.getElementsByClassName("video_container")[0].classList.remove("active");
				//показываем контейнер всех слайдов
				this.album.classList.remove("active");
				//this.marker.classList.remove("hide");
			},
			init: function(album) {
				//this.marker = marker;
				this.album = album;
				this.cur = 0;
				//показываем полотно на котором будут отображаны слайды
				document.getElementsByClassName("video_container")[0].classList.add("active");
				//показываем контейнер всех слайдов
				this.album.classList.add("active");
				var elem = this.vidCont.getElementsByClassName("cont");
				for (var i = 0; i < elem.length; i += 1) {
					if(elem[i].classList.contains("active")) {
						this.len = elem[i].getElementsByClassName("video").length;
					}
				}
				this.vidCont.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("cur")[0].innerText = 1;
				this.vidCont.getElementsByClassName("album_info")[0].getElementsByClassName("amount")[0].getElementsByClassName("len")[0].innerText = this.len;
				var albums = document.getElementsByClassName("photo_container")[0].getElementsByClassName("cont");
				for (var i = 0; i < albums.length; i += 1) {
					albums[i].getElementsByClassName("len")[0].innerText = this.len;
				}

				this.show();
			},
		};

		//pзакрыть видео инфоблок
		if(document.getElementsByClassName("video_container")[0]) {
			if(document.getElementsByClassName("video_container")[0].getElementsByClassName("close")[0]) {
				document.getElementsByClassName("video_container")[0].getElementsByClassName("close")[0].addEventListener("click",function(){
					Video.close();
				});
				var elems = document.getElementsByClassName("video_container")[0].getElementsByClassName("prev");
				for (var i = 0; i < elems.length; i += 1) {
					elems[i].addEventListener("click", function() {
						Video.prev();
					});
				}
				elems = document.getElementsByClassName("video_container")[0].getElementsByClassName("next");
				for (var i = 0; i < elems.length; i += 1) {
					elems[i].addEventListener("click", function() {
						Video.next();
					});
				}

			}
		}

		if(document.getElementsByClassName("photo_container")[0]) {
			photo_container = document.getElementsByClassName("photo_container")[0];
			for(var j = 0; j < photo_container.getElementsByClassName("photos").length; j +=1 ) {
				var photos = photo_container.getElementsByClassName("photos")[j].getElementsByClassName("photo");
				//инициализация фотоплеера
				for(var i = 0; i < photos.length; i += 1) {
					photos[i].getElementsByTagName("img")[0].addEventListener("click", function() {
						Slider.nextSlide();
					});
					if(photos[i].getElementsByTagName("img")[0].height > photos[i].getElementsByTagName("img")[0].width*1.5) {
						photos[i].classList.add("horizontal");
					}
				}
			}
		}

		var elems = select_size.getElementsByClassName("option");
		for(var i = 0; i < elems.length; i += 1) {
			elems[i].addEventListener('click', function() {
				select_size.getElementsByClassName("title")[0].getElementsByClassName("txt")[0].innerText = this.innerText;
				var size = select_size.getElementsByClassName("title")[0].getElementsByClassName("txt")[0].innerText;
				document.getElementById("share").getElementsByClassName("code")[0].innerText = '<iframe width="'+size.split(" x ")[0]+'" height="'+size.split(" x ")[1]+'" frameborder="0" src="http://placeview.in/pano/1392"></iframe>';
			});
		}

		if(!localStorage.getItem('player'))
			tutorial.classList.add("active");
		elem_position();
		close_all_check();

		//закрыть фото слайдер
		if(photo_container) {
			photo_container.getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function(){
				Slider.close();
			});

			//предыдущее фото
			photo_container.getElementsByClassName("control")[0].getElementsByClassName("back")[0].addEventListener('click',function(){
				//prev slide
				Slider.prevSlide();
			});
		}

		//показать модуль
		document.getElementById("module_container").getElementsByClassName("control")[0].getElementsByClassName("close")[0].addEventListener('click',function() {
			var arr = document.getElementById("module_container").classList;
			document.getElementById("module_container").classList.remove(document.getElementById("module_container").classList[0],document.getElementById("module_container").classList[1]);
			var elems = document.getElementsByClassName("modules")[0].getElementsByClassName("elem");
			for (var i = 0; i < elems.length; i += 1) {
				elems[i].classList.remove("active");
			}
		});
		var arr = document.getElementsByClassName("modules")[0].getElementsByClassName("elem");
		for(var i = 0; i< arr.length; i += 1) {
			arr[i].addEventListener('click', function() {
				this.classList.add("active");
				if(!document.getElementById("module_container").classList.contains("active")){
					document.getElementById("module_container").classList.add('active');
				}
				if(!document.getElementById("module_container").classList.contains(this.getAttribute('data-module'))){
					document.getElementById("module_container").classList.toggle(this.getAttribute('data-module'));
				}
			});
		}
		if(document.getElementsByClassName('info_container')[0]) {
			document.getElementsByClassName('info_container')[0].getElementsByClassName('close')[0].addEventListener('click',function() {
				var arr = document.getElementsByClassName('marker');
				for(var i = 0; i < arr.length; i += 1) {
					arr[i].classList.remove('hide');
				}
				document.getElementsByClassName('info_container')[0].classList.remove("active");
				var elems = document.getElementsByClassName('info_container')[0].getElementsByClassName("cont");
				for(var i = 0; elems.length > i; i += 1) {
					elems[i].classList.remove("active");
				}
			});
		}

		document.getElementById("subcribe_module").getElementsByClassName("elem")[0].getElementsByClassName("sub")[0].addEventListener("click", function() {
			document.getElementById("subcribe_module").getElementsByClassName("elem")[0].style.display="none";
			document.getElementById("subcribe_module").getElementsByClassName("elem")[1].style.display="block";
		});

		ui.show_info_block = function show_info_block(id) {
			var el = document.getElementById('hotspot_'+id);
			if(!el) return "no such elem";
			console.log(el);
			if(el.classList.contains("information_block")){
				document.getElementsByClassName('info_container')[0].classList.add('active');
				el.classList.add("active");
				document.getElementsByClassName("info_container")[0].style.left = "50px";
				document.getElementsByClassName("info_container")[0].style.top = "50px";
			}else if(el.classList.contains("photo_album")){
				Slider.init(el);
			}else if(el.classList.contains("video_album")){
				Video.init(el);
			}
		}
		window.loader = new (function () {
			this.show_loader = function () {
				document.getElementById("loader").classList.add("active");
			}
			this.hide_loader = function() {
				document.getElementById("loader").classList.remove("active");
			}
		})();
		show_hide_panos.getElementsByClassName('hide')[0].addEventListener('click', function(){
			hide_panos();
		});
		show_hide_panos.getElementsByClassName('show')[0].addEventListener('click', function(){
			show_panos();
		});
		pano_menu.show_panos = function() {
			show_panos();
		}
		pano_menu.hide_panos = function() {
			hide_panos();
		}

		//выбор языка в нераскрытом мультименю
		select_lang.getElementsByClassName('cur')[0].addEventListener('click', function(){
			this.parentNode.classList.toggle('active');
		});

		var arr = select_lang.getElementsByClassName('list')[0].getElementsByTagName("div");
		for(var i = 0; i < arr.length; i += 1) {
			arr[i].addEventListener('click',function(){
				this.parentNode.parentNode.getElementsByClassName('cur')[0].innerHTML = this.innerHTML;
				this.parentNode.parentNode.classList.remove('active');
			});
		}

		for(var i = 0; i < multimenu_controls.length; i += 1) {
			multimenu_controls[i].addEventListener("click", function() {
				if(this.classList.contains("active")) {
					multimenu_close();
					return;
				}
				multimenu_open(this);
			});
		}

		for(var i = 0; i < big_menu.length; i += 1) {
			big_menu[i].addEventListener("click", function () {
				for(var j = 0; j < multimenu_controls.length; j += 1) {
					if(multimenu_controls[j].classList.contains(this.getAttribute("data-panel"))) {
						multimenu_controls[j].click();
					}
				}
			});
		}
		close_all_panels(document.getElementById("close_all").getElementsByTagName("span")[0]);
		elems = multimenu.getElementsByClassName("back_button");
		//multimenu_close();
		multimenu.getElementsByClassName("panels")[0].getElementsByClassName("back_button")[0].addEventListener("click", function () {
			multimenu.getElementsByClassName("menu")[0].getElementsByClassName("ask")[0].click();
		});

		elems = multimenu.getElementsByClassName("control");
		length = elems.length;
		for(i = 0; i < length; i += 1) {
				elems[i]=elems[i].getElementsByClassName("fa-times")[0];
		}
		//multimenu_close();

		tutorial.getElementsByClassName("close")[0].addEventListener('click', function() {
			tutorial.classList.remove("active");
			localStorage.setItem('player', true);
		});
	}

	function hide_panos() {
		show_hide_panos.classList.remove('active');
		panos_opened = false;
		close_all_check();
	}
	function show_panos() {
		show_hide_panos.classList.add('active');
		panos_opened = true;
		close_all_check();
	}
	/**
	 * [show показать блок мультименю]
	 * @param  {[имя]} panel [передать название панели]
	 * @return {[type]}       [description]
	 */
	mmenu.show = function multimenu_show(panel) {
		console.log(panel);
		if(panel) {
			var elems = multimenu.getElementsByClassName("icon");
			for(var i = 0; i < elems.length; i += 1) {
				if(elems[i].getAttribute("data-panel") == panel) {
					elems[i].click();
					return 1;
				}
			}
		}
		return 0;
	}
	function close_all_check() {
		if((multimenu_opened) && (panos_opened)) {
			document.getElementById("close_all").classList.add("active");
			return 1;
		}
		document.getElementById("close_all").classList.remove("active");
		return 0;
	}

	function elem_position() {
		document.getElementsByClassName("slides")[0].style.height = window.innerHeight- document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").style.height = window.innerHeight - document.getElementById("top_menu").clientHeight + "px";
		document.getElementById("multimenu").getElementsByClassName("menu")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - "px";
		for(var j = 0; j < document.getElementsByClassName("photos").length; j += 1){
			if(document.getElementsByClassName("photos")[j].getElementsByClassName("horizontal")) {
				var photos = document.getElementsByClassName("photos")[j].getElementsByClassName("horizontal");
						for(var i = 0; i < photos.length; i += 1) {
							photos[i].getElementsByClassName("im_cont")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 14 + "px";
							photos[i].getElementsByClassName("descr")[0].style.height = window.innerHeight - document.getElementById("top_menu").clientHeight - 14 + "px";
						}
			}
		}
	}

	function close_all_panels(el) {
		el.addEventListener("click", function() {
			show_hide_panos.classList.remove("active");
			multimenu_close()
			multimenu_opened = false;
			panos_opened = false;
			close_all_check();
		});
	}

	function multimenu_close() {
		if(multimenu_opened){
			document.getElementById("multimenu").getElementsByClassName("menu")[0].getElementsByClassName("active")[0].classList.remove("active");
			document.getElementById("multimenu").getElementsByClassName("panels")[0].classList.remove("active");
			multimenu_opened = false;
			close_all_check();
		}
	}
	function multimenu_open (el) {
		for(var j = 0; j < multimenu_controls.length; j += 1) {
			multimenu_controls[j].classList.remove("active");
		}
		for(var j = 0; j < multimenu.getElementsByClassName("panel").length; j += 1) {
			multimenu.getElementsByClassName("panel")[j].classList.remove("active");
		}
		document.getElementById(el.getAttribute("data-panel")).classList.add("active");
		multimenu.getElementsByClassName("panels")[0].classList.add("active");
		el.classList.add("active");
		multimenu_opened = true;
		close_all_check();
	}
})();