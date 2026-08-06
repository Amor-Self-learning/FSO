import { useShallow } from 'zustand/shallow';
import blogsService from '../services/blogs';
import { create } from 'zustand';

const useBlogsStore = create((set) => ({
  blogs: [],
  isLoading: true,
  initialize: async () => {
    const allBlogs = await blogsService.getAll();
    set(() => ({
      blogs: allBlogs,
      isLoading: false,
    }));
  },
  addToBlog: async (blog, token) => {
    const newBlog = await blogsService.add(blog, token);
    newBlog.user = blog.user;
    set((state) => ({
      blogs: state.blogs.concat(newBlog),
    }));
  },
  deleteBlog: async (blogId, token) => {
    await blogsService.del(blogId, token);
    set((state) => ({
      isLoading: false,
      blogs: state.blogs.filter((b) => b.id !== blogId),
    }));
  },
  likeBlog: async (blog, user) => {
    const newBlog = await blogsService.like(blog, user);
    newBlog.user = blog.user;
    set((state) => ({
      isLoading: false,
      blogs: state.blogs.map((b) => (b.id !== blog.id ? b : newBlog)),
    }));
  },
}));

export const useBlogData = () =>
  useBlogsStore(
    useShallow((state) => ({
      blogs: state.blogs,
      isLoading: state.isLoading,
      error: state.error,
    }))
  );

export const useBlogActions = () =>
  useBlogsStore(
    useShallow((state) => ({
      initialize: state.initialize,
      addToBlog: state.addToBlog,
      deleteBlog: state.deleteBlog,
      likeBlog: state.likeBlog,
    }))
  );
