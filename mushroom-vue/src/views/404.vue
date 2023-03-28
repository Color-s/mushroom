<template>
    <div class="not-found">
        <img src="../assets/404.gif" alt="">
        
    </div>
    <div>
        <a class="attribute" href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>

    <div class="video">
        <iframe src="//player.bilibili.com/player.html?aid=648615224&bvid=BV12e4y1T7Pa&cid=920949411&page=1&autoplay=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" autoplay=1> </iframe>
        <iframe src="//player.bilibili.com/player.html?aid=344523771&bvid=BV12e4y1T7Pa&cid=920949411&page=1&autoplay=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
    </div>
    
    
</template>
<style scoped>
.not-found {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.not-found img {
    width: 400px;
    height: 400px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    /* 图片宽度高度的一半才能居中 */
    margin-left: -200px;
    margin-top: -200px;
}

.attribute{
    color: #000;
    text-align: center;
}

.video iframe{
    width: 500px;
    height: 349px;
}
</style>

