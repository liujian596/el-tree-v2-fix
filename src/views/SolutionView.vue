<script setup>
import { ref, watch, onActivated } from 'vue';
import { useMutationObserver } from '@vueuse/core';

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

const treeRef = ref(null);
let treeScrollTarget = null;
let throttledFlag = true;
let treeTop = 0;
watch(treeRef, () => {
  // console.log(treeRef.value?.$el)
  useMutationObserver(
    treeRef.value?.$el,
    () => {
      treeScrollTarget = treeRef.value?.$el.getElementsByClassName(
        'el-tree-virtual-list'
      )[0];
      if (!treeScrollTarget) return;
      if (throttledFlag) {
        throttledFlag = false;
        treeScrollTarget.addEventListener('scroll', (ev) => {
          treeTop = ev.target.scrollTop;
        });
      }
    },
    { subtree: true, childList: true }
  );
});
onActivated(() => {
  if (!treeScrollTarget) return;
  treeScrollTarget.scrollTo(0, treeTop);
});
</script>

<template>
  <div>
    <p>
      通过监听本组件dom树获取滚动元素，记录滚动距离，被重新激活时恢复滚动距离
    </p>
    <el-tree-v2
      ref="treeRef"
      style="max-width: 600px"
      :data="data"
      :props="props"
      :height="208"
    />
    <el-button @click="() => $router.push('/ButtonView')">ButtonView</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
