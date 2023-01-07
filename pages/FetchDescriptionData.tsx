import { useState, useEffect } from 'react';
import axios from 'axios';

type Description = {
  id?: number;
  description: string;
};

const BASE_URL = 'http://127.0.0.1:8000/api/description';

export default function FetchDescriptionData(): JSX.Element {
  const [data, setData] = useState<Description[]>([]);
  const [id, setId] = useState<number>(1);
  const [post, setPost] = useState<Description>({ id: 0, description: '' });
  const [updated, setUpdated] = useState<boolean>(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    axios.get(BASE_URL, config).then((res) => setData(res.data));
  }, [updated]);

  const putDescription = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const _data = {
      id: post.id,
      description: post.description,
    };
    await axios.put(`${BASE_URL}/${post.id}/`, _data, config).then((res) => {
      if (res.data.id) {
        setUpdated(!updated);
        setPost({ id: 1, description: '' });
      }
    });
  };

  // const createSkill = (arg: Skill) => {
  //   const _data = {
  //     title: arg.title,
  //     color_code: arg.color_code,
  //   };
  //   axios
  //     .post(BASE_URL, _data, {
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     .then((res) => {
  //       setData([...data, res.data]);
  //       setCreate({ title: '', color_code: '' });
  //     });
  // };

  // const handleInputChange = (e: any) => {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   setCreate({ ...create, [name]: value });
  // };

  return (
    <div className="box-border m-5 text-xl">
      <ul>
        {data.map((_data) => (
          <div key={_data.id} className="flex space-x-2">
            <li>{_data.id}</li>:<li>{_data.description}</li>
          </div>
        ))}
      </ul>

      <form
        onSubmit={putDescription}
        className="flex flex-col mt-10 w-1/3 space-y-4"
      >
        <input
          type="text"
          placeholder="id"
          className="border border-black"
          onChange={(e) => setPost({ ...post, id: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="description"
          className="border border-black"
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <button type="submit" className="border border-black">
          Edit
        </button>
      </form>
    </div>
  );
}
