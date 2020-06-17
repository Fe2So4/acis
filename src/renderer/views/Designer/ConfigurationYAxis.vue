<template>
  <div>
    <el-form-item label="纵坐标配置">
      <el-button @click="onClick">
        配置
      </el-button>
      <el-dialog
        center
        title="纵坐标配置"
        :visible.sync="visible"
      >
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
          >
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
              >Append</el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >Delete</el-button>
            </span>
          </span>
        </el-tree>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="visible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="visible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-form-item>
    <el-form-item label="横线分隔">
      <el-input-number
        :value="value.lineInterval"
        :min="0"
        controls-position="right"
        @change="onChangeLineInterval"
      />
    </el-form-item>
  </div>
</template>

<script>
let id = 1000
export default {
  name: 'ConfigurationYAxis',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onClick () {
      this.visible = true
    },
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    onChangeLineInterval (currentValue, oldValue) {
      const configuration = Object.assign({}, this.value, {
        lineInterval: currentValue
      })
      this.$emit('change', {
        yAxis: configuration
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
