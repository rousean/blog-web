<!-- 当前浏览器不是谷歌时显示 -->
<template>
  <div class="browser-container">
    <div class="browser-text">
      <a href="https://www.google.com/intl/zh-CN/chrome/" target="_blank">
        <svg-icon
          iconClass="blog-google"
          style="width: 144px; height: 36px"
        ></svg-icon>
      </a>
      <div>当前网页推荐Google浏览器预览!</div>
      <div>请点击图标前往官网下载!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Browser',
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      let i = 0
      let svg = d3
        .select('.browser-container')
        .append('svg')
        .attr('width', 1920)
        .attr('height', 1080)
      svg
        .append('rect')
        .attr('width', 1920)
        .attr('height', 1080)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('ontouchstart' in document ? 'touchmove' : 'mousemove', (e) => {
          svg
            .insert('circle', 'rect')
            .attr('cx', d3.pointer(e)[0])
            .attr('cy', d3.pointer(e)[1])
            .attr('r', 1e-6)
            .attr('fill', 'none')
            .attr('stroke-width', 2.5)
            .style('stroke', d3.hsl((i = (i + 1) % 360), 1, 0.5))
            .style('stroke-opacity', 1)
            .transition()
            .duration(2000)
            .ease(Math.sqrt)
            .attr('r', 100)
            .style('stroke-opacity', 1e-6)
            .remove()
          e.preventDefault()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.browser-container {
  position: relative;
}
.browser-text {
  width: 380px;
  height: 80px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: Saint-Andrews;
  font-size: 20px;
}
</style>
