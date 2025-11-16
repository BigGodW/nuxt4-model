export const getArticleTagName = (id: string) => {
    const articleTagList = useState('articleTagList')
    let res
    // console.log(articleTagList)
    articleTagList.value.forEach(i => {
        if (i.id == id) {
            res = i.name
        }
    })
    return res
}

export const getArticleCategoryName = (id: string) => {
    const articleCategoriesList = useState('articleCategoriesList')
    let res
    articleCategoriesList.value.forEach(i => {
        if (i.id == id) {
            res = i.name
        }
    })
    return res
}