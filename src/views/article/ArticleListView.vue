<template>
  <NavigateBar/>
  
  <div class="article-list-wrapper">
    <!-- 左侧类别菜单 -->
    <ArticleCategoryMenu v-on:handleSelect="handleSelect" v-on:handleSelectAll="handleSelectAll" class="article-list-menu-wrapper"/>
    <!-- 右侧文章内容 -->
    <div class="article-list-body">
      <div class="search-bar-row">
        <div class="search-bar">
          <div class="autocomplete">
            <input 
              type="text" 
              v-model="search" 
              placeholder="请输入搜索内容" 
              @input="handleInput" 
              @blur="hideSuggestions" 
              @focus="showSuggestions" 
              class="ellipse-input"
            />
            <ul v-show="suggestionsVisible" class="suggestions-list">
              <li v-for="item in suggestions" :key="item.value" @mousedown.prevent="selectSuggestion(item)">
                {{ item.value }}
              </li>
            </ul>
          
            <el-button :icon="Search" size="large" round class="search-button" @click="handleSearch" >Search</el-button>
          </div>
        </div>
      </div>
      <!-- 文章列表 -->
      <div class="article-list-region">
        <div v-for="post in posts" :key="post">
          <div class="article-region">
            <ArticleCard v-bind="post" class="card"/>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="page-region">
        <el-pagination v-model:current-page="pageIndex" :hide-on-single-page="true"
                       :total="total" :page-size="pageSize" background layout="prev, pager, next"  class="page-roller" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, watch } from "vue";
import ArticleCategoryMenu from '@/components/article/CategoryMenu.vue'
import { Search } from '@element-plus/icons-vue'
import ArticleCard from '@/components/article/ArticleCard.vue'
import NavigateBar from "@/components/base/NavigateBar.vue";
import { getArticlePage, getCategoryArticlePage, getAutocompleteSuggestions } from "@/api/article";

const total = ref(0)
const pageIndex = ref(1)
const pageSize = ref(10)
const categoryId = ref('')
const search = ref('')
const posts = ref([ ])
const suggestions = ref([]);
const suggestionsVisible = ref(false);

// 当选择页号改变时，发送请求
getPage()
watch(pageIndex, () => {
  getPage()
})

function getPage() {
  getCategoryArticlePage(pageIndex.value,pageSize.value, categoryId.value, search.value).then((res) => {
    posts.value = res["records"];
    total.value = res["total"];
  })
}

// 选择分类改变时，发送请求
function handleSelect(key: string, keyPath: string[]) {
  console.log(key, keyPath)
  categoryId.value = key
  pageIndex.value = 1
  getCategoryArticlePage(pageIndex.value, pageSize.value, categoryId.value, search.value).then((res) => {
    posts.value = res["records"];
    total.value = res["total"];
  })
}



// 点击search时，发送请求
function handleSearch() {
  console.info(search.value);
  getCategoryArticlePage(pageIndex.value, pageSize.value, categoryId.value, search.value).then((res) => {
    posts.value = res["records"];
    total.value = res["total"];
  })
}

function selectSuggestion(item: { value: string }) {
  search.value = item.value;
  suggestionsVisible.value = false;
}

function handleInput() {
  if (search.value) {
    getAutocompleteSuggestions(search.value).then((res) => {
      suggestions.value = res.map((item: string) => ({ value: item }));
      suggestionsVisible.value = true;
    });
  } else {
    suggestionsVisible.value = false;
  }
}

// 点击reset按钮，获得所有分类
function handleSelectAll() {
  categoryId.value = ''
  getPage()
}

function hideSuggestions() {
  setTimeout(() => {
    suggestionsVisible.value = false;
  }, 200);
}

function showSuggestions() {
  if (suggestions.value.length > 0) {
    suggestionsVisible.value = true;
  }
}

</script>

<style scoped>

.article-list-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background:  var(--md-ref-palette-neutral98);
  z-index: -1;
}

.article-list-menu-wrapper {
  margin-top: 56px;
  position: fixed;
  z-index: 1;
}

.article-list-body {
  margin-left: 80px;
  margin-top: 10%;
}

.article-list-region {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.article-region{
  margin-bottom: 40px;
}

.card{
  left: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  background-color: var(--md-ref-palette-neutral100);
}

.page-region{
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}


.search-bar-row {
  display: flex;
  justify-content: center;
  padding: 30px;
}

input {
  flex: 1;
  padding: 4px;
  border: none;
  border-radius: 50px; /* 使用border-radius属性设置成椭圆形 */
  outline: none;
  font-size: 14px;
  width: 600px;
  height: 30px;
}

.ellipse-input {
  flex: 1;
  padding: 4px;
  border: none;
  border-radius: 50px;
  outline: none;
  font-size: 14px;
  height: 30px;
}

.autocomplete {
  position: relative;
  width: 100%;
}

.suggestions-list {
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f5f5f5;
}
</style>
