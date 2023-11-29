/*
  Task #1 - Get posts from remote API, iterate over them,
  and render them as new DOM nodes.
*/

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const table = document.querySelector('.table');

interface Post {
  userId: number,
  readonly id: number,
  title: string,
  body: string,
};

const getData = async (): Promise<Post[]> => {
  const result = await fetch(API_URL);

  return result.json();
}

const loadPosts = async () => {
  const postsFromServer = await getData();
  
  postsFromServer.forEach(post => {
    const {userId, id, title, body} = post;

    table?.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${userId}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td>${body}</td>
      </tr>
    `);
  });
};

loadPosts();

/*
  Task #2 - Create a function updateObjectInArray - which has to update an object
  of a given shape in an array of uni-shaped objects and return a cloned array.
*/

const testPosts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi"
  },
  {
    "userId": 1,
    "id": 9,
    "title": "nesciunt iure omnis dolorem tempora et accusantium",
    "body": "consectetur animi nesciunt iure dolore"
  },
  {
    "userId": 2,
    "id": 12,
    "title": "in quibusdam tempo",
    "body": "itaque id aut magnam\npraevoluptatem\nincidunt ea est distinctio odio"
  }
];

function updateObjectInArray<ObjectShape> (
  initialArray: ObjectShape[],
  key: keyof ObjectShape,
  value: string | number | boolean,
  patch: Partial<ObjectShape>
) {
  const copiedArrayWithPatch = initialArray.map(item => {
    if(item[key] === value) {
      return { ...item, ...patch };
    }

    return item;
  });

  return copiedArrayWithPatch;
}

const result = updateObjectInArray(
  testPosts,
  'id' as keyof Post,
  12,
  {title: "upadated value", body: "new body"}
);

const result2 = updateObjectInArray(
  testPosts,
  'id' as keyof Post,
  8,
  {title: "test with wrong id"}
);
