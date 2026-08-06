const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    user: '6a69f297e9c77d7a6e9bb826',
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '6a69f297e9c77d7a6e9bb826',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '6a69f297e9c77d7a6e9bb826',
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '6a69f2b6e9c77d7a6e9bb827', // Fixed to match haris_baig
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '6a69f2b6e9c77d7a6e9bb827', // Fixed to match haris_baig
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '6a69f2cce9c77d7a6e9bb828', // Fixed to match amorzephyr
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '6a69f2cce9c77d7a6e9bb828', // Fixed to match amorzephyr
    __v: 0,
  },
];

const users = [
  {
    user: {
      _id: '6a69f297e9c77d7a6e9bb826',
      username: 'fahad_rafiq',
      name: 'Fahad Rafiq',
      passwordHash:
        '$2b$10$8TaHVYM8kJRePyKOTuWHieQ37kETGLGNB5DYFqL//J4QG0HqqpEnO',
      blogs: [
        '5a422a851b54a676234d17f7', // React patterns
        '5a422aa71b54a676234d17f8', // Go To Statement Considered Harmful
      ],
      __v: 0,
    },
    password: 'Fahad@CS',
  },
  {
    user: {
      _id: '6a69f2b6e9c77d7a6e9bb827',
      username: 'haris_baig',
      name: 'Haris Baig',
      passwordHash:
        '$2b$10$ojyX/.AZzoksYnfktjcXXuOxZASU.P08N4jYnPg8MjXhQNuPHEf2y',
      blogs: [
        '5a422b3a1b54a676234d17f9', // Canonical string reduction
        '5a422b891b54a676234d17fa', // First class tests
      ],
      __v: 0,
    },
    password: 'Haris@CS',
  },
  {
    user: {
      _id: '6a69f2cce9c77d7a6e9bb828',
      username: 'amorzephyr',
      name: 'Abdul Samad',
      passwordHash:
        '$2b$10$w4QvMwy2no1JZfh8WN37GehN.gVQfSbGyv5cJilNRi2nYumuzrRue',
      blogs: [
        '5a422ba71b54a676234d17fb', // TDD harms architecture
        '5a422bc61b54a676234d17fc', // Type wars
      ],
      __v: 0,
    },
    password: 'Zephyr@CS',
  },
];

module.exports = { listWithOneBlog, blogs, users };
