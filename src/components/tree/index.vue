<template>
  <a-tree
    v-model:checkedKeys="checkedKeys"
    checkable
    checkStrictly
    :tree-data="props.treeData"
    :field-names="fieldNames"
    @check="onCheck"
  ></a-tree>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

const props = defineProps({
  checkedKeys: {
    type: Array as PropType<number[] | string[]>,
    default: () => []
  },
  treeData: {
    type: Array as PropType<any[]>,
    required: true
  },
  fieldNames: {
    type: Object as PropType<any>,
    default: () => ({ key: 'id', title: 'title', children: 'children' })
  }
})

const checkedKeys = ref<Array<number | string>>(props.checkedKeys)

const onCheck = (keys: any, e: any) => {
  const { checked, node, checkedNodes } = e

  // checkAllChildren(node, checked)
  // checkAllParent(node, checked)

  console.log('node', node)
  console.log('checked', checked)
  console.log('checkedNodes', checkedNodes)

  // checkAllChildren(node, checked)
  console.log('checkedKeys', checkedKeys.value)
}

// 如果是父节点，全选子节点

// // 如果是子节点，选中父节点
// const checkAllParent = (node: any, checked: string[]) => {
//   if (node.parent) {
//     const parent = node.parent
//     parent.children.every((child: any) => checkedKeys.value.includes(child[props.fieldNames.key]))
//     checkedKeys.value = checkedKeys.value.filter((key) => key !== parent[props.fieldNames.key])
//     if (checked) {
//       checkedKeys.value.push(parent[props.fieldNames.key])
//       selectedKeys.value.push(parent[props.fieldNames.key])
//     }
//     checkAllParent(parent, checked)
//   }
// }
</script>

<style scoped lang="less"></style>
