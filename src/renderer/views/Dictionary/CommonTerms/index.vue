
<template lang="pug">
  .common-terms
    .content(class="clearfix")
      .left
        el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="id"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag")
      .right
        vxe-table(
          border
           auto-resize
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="tableData"
          :checkbox-config="{checkStrictly: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        )
          vxe-table-column(field="no" title="序号")
          vxe-table-column(field="bedNo" title="分类")
          vxe-table-column(field="name" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="sex" title="编码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
    .option
      el-button(size="mini") 新增(N)
      el-button(size="mini") 删除(D)
      el-button(size="mini") 保存(S)
      el-button(size="mini") 取消(C)
      el-button(size="mini") 刷新(R)
</template>
<script>
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      tableData: [],
      data: [{
        id: 1,
        label: '一级 1',
        children: []
      }, {
        id: 2,
        label: '一级 2',
        children: []
      },
      {
        id: 3,
        label: '一级 3',
        children: []
      }, {
        id: 4,
        label: '一级 4',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }
  }
}
</script>
<style lang="stylus" scoped>
  .common-terms
    height 100%
    .content
      height calc(100% - 28px)
      .left
        float left
        width 20%
        height 100%
      .right
        height 100%
        float right
        width 80%
    .option
      text-align right
</style>
