import base from './index'
const axios = base.axios
const baseUrl = base.baseUrl


export const getArticlePage = (pageIndex, pageSize, categoryId, search) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article/page?page=`+ pageIndex + '&pageSize=' + pageSize + '&categoryId=' + categoryId + '&search=' + search,
    }).then(res => res.data.data)
}

export const getCategoryArticlePage = (pageIndex, pageSize, categoryId, search) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article/page?page=` + pageIndex + '&pageSize=' + pageSize + '&categoryId=' + categoryId + '&search=' + search,
    }).then(res => res.data.data)
}

export const getCategoryDraftPage = (pageIndex, pageSize) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article/draftList?page=` + pageIndex + '&pageSize=' + pageSize,
    }).then(res => res.data.data)
}

export const getDraft = (draftId) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article/getDraft?draftId=` + draftId,
    }).then(res => res.data.data)
}



export const getAutocompleteSuggestions = (search) => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article/search?prefix=` + search,
    }).then(res => res.data.data)
}


export const getArticleDetail = articleId => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/article?articleId=` + articleId,
    }).then(res => res.data.data)
}

export const getArticleComments = articleId => {
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/comment?articleId=` + articleId,
    }).then(res => res.data.data)
}

export const clickLike = params => {
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/like`,
        data: params
    })
}

export const addComment = params => {
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/comment`,
        data: params
    }).then(res => res.data.data)
}
