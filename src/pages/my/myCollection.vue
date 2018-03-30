<template>
	<div class="com-top">
		<div class="header clearfix">
			<a href="javascript:history.back();" class="header-back"></a>
			<h1>我的收藏</h1>
		</div>
		<ul class="clearfix com-goods-list">
			<goods-item v-for="(data,index) in goodsList" :goodsItem="data"   :key="index"></goods-item>
		</ul>

	</div>
</template>

<script>
import 
</script>