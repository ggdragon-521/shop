<template>
<div class="quantity-selector clearfix">
    <span class="reduce" @click="reduce()" :class="{disable : val==1||count==0}">－</span>
    <input type="text" v-model="val" class="number" readonly="true" />
    <span class="add" @click="add()" :class="{disable : val==count||count==0}">＋</span>
</div>
</template>

<script>
	export default{
		name:'numControl',
		props:{
			number:{
				type:Number,
				required:true,
				default:1,
				validator(value) {
                return value > 0 ;
            }
			},
			count:{
				type:Number,
				required:true,
			},
			indexArr:{
                type:Array,
			}
		},
		data(){
			return{
				val:this.number,
			}
		},
		watch:{
			count(){
				if(this.count==0){
					this.val=1
				}
				this.$emit('chang-event',{
					val:this.val,
					indexArr:this.indexArr,
				})
			}
		},
		mounted(){
           if(this.val<1){
           	this.val = 1;
           }
           if(this.val>this.count){
           	this.val=this.count;
           }
           if(this.count<1){
           	this.count=0;
           	this.val=1;
           }
		},
		methods:{
			 add() {
            if ( this.val >= this.count ) {
                return;
            }
            this.val += 1;
            this.$emit('chang-event', {
                val : this.val,
                changeVal : 1,
                indexArr : this.indexArr
            });
        },
			reduce(){
				if(this.val<=1||this.count===0){
					return;
				}
				this.val-=1;
				this.$emit('chang-event',{
					val:this.val,
					changeVal:-1,
					indexArr:this.indexArr,
				})
			}
			
		}
	}
</script>

<style scoped>
	.clearfix:after {
    content: ".";
    visibility: hidden;
    display: block;
    height: .1px;
    font-size: .1em;
    line-height: 0;
    clear: both;
}
.quantity-selector {
    margin-top: 2rem;
    width: 8.571rem;
    line-height: 2.9rem;
    border: 1px solid #d1d6e4;
    border-radius: 3px;
}
.quantity-selector .reduce,
.quantity-selector .add {
    float: left;
    width: 33.33%;
    border-right: 1px solid #d1d6e4;
    text-align: center;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
}
.quantity-selector .number {
    float: left;
    width: 33.33%;
    height: 2.857rem;
    padding: .5rem 0;
    line-height: 1rem;
    border: none;
    text-align: center;
}
.quantity-selector .add {
    border-left: 1px solid #d1d6e4;
    border-right: none;
}
.quantity-selector  .disable {
    cursor: not-allowed;
    color: #d2d2d2;
}
</style>