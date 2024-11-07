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
    type: Array as PropType<string[]>,
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

const checkedKeys = ref<string[]>(props.checkedKeys)
const onCheck = (keys: any, e: any) => {
  const { checked } = keys
  const { node } = e
  console.log('checked', checked)
  console.log('node', node)
  console.log('checkedKeys', checkedKeys.value)
}

// 如果是父节点，全选子节点
const checkAllChildren = (node: any, checked: boolean) => {
  node.children.forEach((child: any) => {
    checkedKeys.value = checkedKeys.value.filter((key) => key !== child[props.fieldNames.key])
    if (checked) {
      checkedKeys.value.push(child[props.fieldNames.key])
    }
    checkAllChildren(child, checked)
  })
}

// 如果是子节点，选中父节点
const checkParent = (node: any, checked: boolean) => {
  if (node.parent) {
    const parent = node.parent
    parent.children.every((child: any) => checkedKeys.value.includes(child[props.fieldNames.key]))
    checkedKeys.value = checkedKeys.value.filter((key) => key !== parent[props.fieldNames.key])
    if (checked) {
      checkedKeys.value.push(parent[props.fieldNames.key])
    }
    checkParent(parent, checked)
  }
}
</script>

<style scoped lang="less"></style>
