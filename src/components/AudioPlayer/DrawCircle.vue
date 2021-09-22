<template>
  <div class="draw-circle"></div>
</template>

<script>
export default {
  name: 'DrawCircle',
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      // 全局svg对象
      let margin = { top: 0, right: 0, bottom: 0, left: 0 }
      let width = 260 - margin.left - margin.right
      let height = 260 - margin.top - margin.bottom
      let svg = d3
        .select('.draw-circle')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
      // 构造切割圆
      let clipArc = d3.arc().innerRadius(0).outerRadius(110)
      let outerData = [
        { x: 1, y: 10 },
        { x: 2, y: 16 },
        { x: 3, y: 8 },
        { x: 4, y: 16 },
        { x: 5, y: 10 },
        { x: 6, y: 16 }
      ]
      let MiddleData = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 3 },
        { x: 6, y: 2 }
      ]
      let innerData = [
        { x: 1, y: 150 },
        { x: 2, y: 140 },
        { x: 3, y: 90 },
        { x: 4, y: 160 },
        { x: 5, y: 110 },
        { x: 6, y: 90 },
        { x: 7, y: 140 }
      ]
      // 构造clipPath切割路径一
      this.clipPath(svg, clipArc, outerData, 'waveOuter', '#1F357195')
      // 构造clipPath切割路径二
      this.clipPath(svg, clipArc, MiddleData, 'waveMiddle', '#5F1F9A89')
      // 构造clipPath切割路径三
      this.clipPath(svg, clipArc, innerData, 'waveInner', '#5126A989')
      // 构造画圆的数据
      let pieData = []
      for (let i = 0; i < 1001; i++) {
        pieData.push({ name: i, value: 1 })
      }
      let pie = d3.pie().value((d) => d.value)(pieData)
      // 绘制外环彩色圆
      let rainbowArc = d3.arc().innerRadius(100).outerRadius(120)
      svg
        .append('g')
        .selectAll('path')
        .data(pie)
        .enter()
        .append('path')
        .attr('d', rainbowArc)
        .attr('fill', (d) => d3.interpolateRainbow(d.data.name * 0.001))
        .transition()
        .delay(1)
        .duration(1000)
        .ease(d3.easeLinear)
      // .on('start', function repeat() {
      //   d3.active(this)
      //     .attr('fill', (d) => d3.interpolateRainbow(d.data.name * 0.001))
      //     .transition()
      //     .attr('fill', (d) => d3.interpolateSinebow(d.data.name * 0.001))
      //     .transition()
      //     .attr('fill', (d) => d3.interpolateWarm(d.data.name * 0.001))
      //     .transition()
      //     .on('start', repeat)
      // })
    },
    /**
     * 构造clipPath切割路径
     * @svg 节点名
     * @clipArc 切割圆
     * @areaData 数据
     * @pathName clipPath名称
     * @fillColor 填空颜色
     */
    clipPath(svg, clipArc, areaData, pathName, fillColor) {
      let scaleX = d3
        .scaleUtc()
        .domain(d3.extent(areaData, (d) => d.x))
        .range([0, 392])
      let scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(areaData, (d) => d.y)])
        .nice()
        .range([280, 0])
      let area = d3
        .area()
        .curve(d3.curveBasis)
        .x((d) => scaleX(d.x))
        .y0(scaleY(0))
        .y1((d) => scaleY(d.y))
      svg
        .append('g')
        .append('defs')
        .append('clipPath')
        .attr('transform', 'translate(-140, 0)')
        .attr('id', pathName)
        .append('path')
        .datum(areaData)
        .attr('d', area)
        .transition()
      // .on('start', function reTranslate() {
      //   d3.active(this)
      //     .attr('transform', 'translate(0, 0)')
      //     .transition()
      //     .duration(10000)
      //     .ease(d3.easeLinear)
      //     .attr('transform', 'translate(-40, 0)')
      //     .transition()
      //     .duration(0)
      //     .ease(d3.easeLinear)
      //     .on('start', reTranslate)
      // })
      svg
        .append('g')
        .attr('clip-path', `url(#${pathName})`)
        .selectAll('path')
        .data(d3.pie()([1]))
        .enter()
        .append('path')
        .attr('d', clipArc)
        .attr('fill', fillColor)
    }
  }
}
</script>
