import { screen, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    user: {
      id: '6a69f297e9c77d7a6e9bb826',
      username: 'amorzephyr',
      name: 'Zephyr@CS',
    },
  };
  const users = [
    {
      id: '6a69f297e9c77d7a6e9bb826',
      username: 'amorzephyr',
      name: 'Abdul Samad',
    },
    {
      id: '6a69f297e9c77d7a6e983826',
      username: 'harisbaig',
      name: 'Haris Baig',
    },
  ];

  it('Renders information but no buttons to unauthenticated users.', () => {
    render(<Blog blog={blog} />);
    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);
    const url = screen.getByText(blog.url);
    const likes = screen.getByText(blog.likes);
    expect(screen.queryByRole('button', { name: /like/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /delete/i })).toBeNull();
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  it('Show only like button to authenticated users who is not the creator of the blog.', () => {
    render(<Blog blog={blog} user={users[1]} />);
    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(blog.likes)).toBeDefined();
    expect(screen.getByRole('button', { name: /like/i })).toBeDefined();
    expect(screen.queryByRole('button', { name: /delete/i })).toBeNull();
  });

  it('Show both like and delete button to authenticated user who is the creator of the blog.', () => {
    render(<Blog blog={blog} user={users[0]} />);
    expect(screen.getByText(blog.title)).toBeDefined();
    expect(screen.getByText(blog.author)).toBeDefined();
    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(blog.likes)).toBeDefined();
    expect(screen.getByRole('button', { name: /like/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDefined();
  });
});
