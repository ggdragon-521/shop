<template>
	<div>
		<div class="search-wrap">
			<div class="search-main">
				<a href="javascript:history.back();" class="header-back"></a>
				<div class="search-box">
					<input type="text" class="search" v-bind:placeholder="linkContent" v-model="searchKey">
					<a href="javascript:;" class="empty-search" v-show="searchKey.trim()!=''" v-on:click="clearSearch()"></a>
				</div>
				<a href="javascript:;" class="search-btn" v-on:click="go1()"></a>
				<ul class="response-box" v-if="responseList.length>0">
					<li v-for="data in responseList" track-by="$index">
						<a href="javascript:;" v-html="data" v-on:click="go($event)"></a>
					</li>
				</ul>
			</div>
            </div>
			<div class="hot-search">
				<p>热门搜索</p>
				<ul class="hot-items clearfix">
					<li v-for="data in hotSearch">
						<a href="javascript:;" v-html="data.linkContent" v-on:click="go($event)"></a>
					</li>
				</ul>
			</div>
			<div class="history">
				<div class="history-header">
					历史记录
					<a href="javascript:;" class="empty-history" @click="removeHistory()">清空记录</a>
				</div>
				<ul class="history-items">
					<li v-for="data in history">
						<a href="javascript:;" v-html="data.q" @click="go($event)"></a>
					</li>
				</ul>
			</div>

	</div>
</template>

<script>
import commonMethods from '@/js/common';
import '../../js/zepto.min.js';

export default{
	name:'search',
	data(){
		return{
			searchKey : '',//搜索词
            responseList : [],//按键感应内容
            hotSearch : [],//热搜词
            history : [],//历史记录
            lastGo : true,
            linkContent : ''//默认搜索
		}
	},
	mounted(){
		//判断是否是无痕模式
      if(this.storageTest(window.localStorage)){
        let storage = window.localStorage;
        let object = new Object();
        if(storage.getItem('nisu')=='{}'){
            storage.setItem('nisu',JSON.stringify(object));
        }
        this.getHistory();
      }
      this.getHotList();
      this.getTextSearch();
	},
	//监听搜索词变化
	watch :{
		searchKey:function(){
			this.getResponseData();
		}
	},
	methods : {
        storageTest(storage){
            if(!!storage){
                try{
                    storage.setItem('key','value');
                    storage.removeItem('key');
                    return true;
                }catch(e){
                    return false;
                }
            }else{
                return false;
            }
        },
        getTextSearch(){
        	var oThis = this;
        	oThis.responseList = [];
        	$.ajax({
        		type:'post',
        		url:'https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/getTextSearch',
        		dataType:'json',
        		success:function(data){
                  if(data.data.message){
                  	oThis.linkContent = data.data.list[0]['linkContent'];
                  }
        		}
        	})
        },
        getResponseData(){
        	var oThis = this;
        	if(oThis.lastGo){
        		oThis.lastGo = false;
        		$.ajax({
        			type:'post',
        			url:'',
        			data:{
        				keyWord : oThis.searchKey,
        			},
        			dataType:'json',
                    success:function(data){
                    	if(data.data.message){
                    		oThis.responseList = data.data;
                    	}else{
                    		oThis.responseList = [];
                    	}
                    }
        		})
        	}
        },
        clearSearch(){
        	this.searchKey = '';
        	this.responseList = [];
        },
        getHotList(){
        	var oThis = this;
        	$.ajax({
        		type:'post',
        		url:'https://www.easy-mock.com/mock/5a0bad8922eff44db04955c0/example_1510714761014/hotSearch',
        		dataType:'json',
        		success:function(data){
        			if(data.data.message){
        				oThis.hotSearch = data.data.hotList;
        			}
        		}
        	})
        },
        go(e){
            var dom = e.target;
            var oThis = this;
            oThis.searchKey = dom.innerText;
            if(this.searchKey.trim()===''){
            	this.$route.push({path:'goodsResult',query : {keyword:this.linkContent}})
            }
            if(this.storageTest(window.localStorage)){
                this.setHistory(this.searchKey);
            }
            oThis.responseList = [];
            this.$router.push({ path: 'goodsResult', query: {  keyword : oThis.searchKey }});
            oThis.searchKey='';
        },
        go1(){
            if(this.searchKey==''){
                this.searchKey = this.linkContent;
            }
             this.$router.push({ path: 'goodsResult', query: {  keyword : this.searchKey }});
        },
          // 设置历史记录
        setHistory(strKey) {
            var nowtime = (new Date()).getTime(),
            storage = window.localStorage,
            obj = JSON.parse(storage.getItem('nisu'));//字符串转对象
            obj[strKey] = nowtime;
            storage.setItem('nisu', JSON.stringify(obj));//对象转字符串
        },
         // 获取历史记录
        getHistory() {
            var storage = window.localStorage,
                length = 10,
                arr = [],
                obj = {},
                newObj = {};
            this.history = [];
            obj = JSON.parse(storage.getItem('nisu'));//字符串转对象
            for(var x in obj) {
                arr.push(obj[x]);
            }
            arr.sort(function(a, b) {
                return b-a;
            });
            arr.length>=10 ? length = 10 : length = arr.length;
            for(var i=0; i<length; i++) {
                for(var x in obj) {
                    if( obj[x]===arr[i] ) {
                        this.history.push({q : x});
                        newObj[x] = arr[i];
                    }
                }
            }
            storage.setItem('nisu', JSON.stringify(newObj));//对象转字符串
        },
         // 清除历史记录
        removeHistory() {
            if( this.storageTest(window.localStorage) ) {
                this.history = [];
                window.localStorage.removeItem('nisu');
                var storage = window.localStorage,
                    obj = new Object();
                storage.setItem('nisu', JSON.stringify(obj));//对象转字符串
            }
        },

        throttle(method, context) {
            clearTimeout(method.tId);
                method.tId = setTimeout(function(){
                    method.call(context);
            }, 100);
        }
	}
}
</script>

<style scoped>
/*搜索框开始*/
.search-wrap {
    position:fixed;
    z-index: 66;
    width: 100%;
    left: 0;
    top: 0;
    height:3.417rem;
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
.search-wrap .header-back {
    position: absolute;
    top: 1rem;
    left: 0.875rem;
    width: 1.4rem;
    height: 1.4rem;
    background: url(../../m-images/header-back.png) no-repeat center / 1.3rem 1.3rem;
}
.search-wrap .search-main {
    position: relative;
    max-width: 640px;
    margin: 0 auto;
}
.search-wrap .search-box {
    position: absolute;
    left: 3rem;
    top: .56rem;
    width: 21rem;
    height: 2.292rem;
    background: #f4f4f4;
    border-radius: 4px;
}
.search-wrap .search {
    width: 80%;
    margin-top: .4rem;
    margin-left: 1rem;
    height: 1.6rem;
    line-height: 1.6rem;
    border:none;
    background: #f4f4f4;
}
.search-wrap .search-btn {
    float: right;
    margin-right: .8rem;
    margin-top: 1.2rem;
    width: 1.167rem;
    height: 1.167rem;
    background: url(../../m-images/icon2.png) no-repeat 0 0;
    background-size:400px 400px;
    vertical-align: middle;
}
.search-wrap .response-box {
    position: absolute;
    left: 0;
    top: 3.417rem;
    width: 100%;
    background-color: #fff;
}
.search-wrap .response-box li {
    padding-left: 1rem;
    border-bottom: 1px solid #ebebeb;
}
.search-wrap .response-box a {
    display: block;
    line-height: 2.708rem;
    color: #000;
}
.search-wrap .empty-search {
    float: right;
    margin-top: .5rem;
    margin-right: 1rem;
    width: 1.4rem;
    height: 1.4rem;
    background:  url(../../m-images/icon2.png) no-repeat 0 -3.958rem;
    background-size: 33.333rem 33.333rem;
}
/*搜索框结束*/

/*热门搜索开始*/
.hot-search {
    padding: 4.417rem 1rem 1rem;
    background-color: #fff;
}
.hot-search .hot-items li {
    float: left;
    margin: 10px 10px 0 0;
}
.hot-search .hot-items a {
    display: block;
    padding: 5px 10px;
    line-height: 1.2rem;
    background-color: #f1f1f1;
    color: #3b3b3b;
    border-radius: 3px;
}
/*热门搜索结束*/

/*历史记录开始*/
.history {
    margin-top: 0.708rem;
    background-color: #fff;
}
.history .history-header {
    padding: 0 1rem;
    line-height: 3.125rem;
    border-bottom: 1px solid #ebebeb;
}
.history .empty-history {
    float: right;
    margin-top: 0.833rem;
    padding: 0.208rem 0.417rem;
    color: #b3b3b3;
    line-height: 1;
    border:1px solid #b3b3b3;
    border-radius: 2px;
}
.history .history-items {
    padding-left: 1rem;
}
.history .history-items li {
    line-height: 2.5rem;
    border-bottom: 1px solid #ebebeb;
}
.history .history-items a {
    display: block;
    color: #3b3b3b;
}
/*历史记录结束*/
</style>