import React, { useState, useEffect, useRef } from 'react'
import PosForm from '../components/PostForm'
import PostList from '../components/PostList'
import PostFilter from '../components/PostFilter'
import MyModal from '../components/UI/MyModal/MyModal'
import MyButton from '../components/UI/button/MyButton'
import { usePosts } from '../hooks/usePost'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
import PostService from '../components/API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { getPagesCount } from '../components/utils/pages'
import Pagination from '../components/UI/pagination/Pagination'
import "../styles/App.css"
import MySelect from '../components/UI/select/MySelect'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElem = useRef()
  
  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useObserver(lastElem, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const deletePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }
 
  return (
    <div className="App">
      <button onClick={fetchPosts}>Click</button>
      <MyButton onClick={() => setModal(true)} style={{marginTop: '30px'}}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PosForm create={createPost} />
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Количество элементов на странице'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'},
        ]}
      />
      {
        postError && 
        <h1>Something was wrong ${postError} </h1>
      }
      <PostList remove={deletePost} posts={sortedAndSearchedPosts} title={`Список постов ${page}`} />
      <div ref={lastElem} style={{height: '20px', background: 'green'}}></div>
      {isPostLoading &&
        <Loader />
      }
      <Pagination
        page={page}
        totalPages={totalPages}
        changePage={changePage}
      />
    </div>
  )
}

export default Posts
