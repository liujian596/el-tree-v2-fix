<script setup>
function getKey(prefix, id) {
  return `${prefix}-${id}`;
}

function createData(
  maxDeep,
  maxChildren,
  minNodesNumber,
  deep = 1,
  key = 'node'
) {
  let id = 0;
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren);
      const nodeKey = getKey(key, ++id);
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      };
    });
}

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
};
const data = createData(4, 30, 40);
</script>

<template>
  <div>
    <p>
      先滚动el-tree-v2组件，之后点击ButtonView按钮跳转路由再返回本组件，发现el-tree-v2组件视窗内无节点显示，在再次滚动el-tree-v2组件后视窗内节点重现
    </p>
    <el-tree-v2
      style="max-width: 600px"
      :data="data"
      :props="props"
      :height="208"
    />
    <el-button @click="() => $router.push('/ButtonView')">ButtonView</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
