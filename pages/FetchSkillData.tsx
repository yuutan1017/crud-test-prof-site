import { useState, useEffect } from 'react';
import axios from 'axios';

type Skill = {
  id?: number;
  title: string;
  color_code: string;
};

const BASE_URL = 'http://127.0.0.1:8000/api/skills/';

export default function FetchSkillData(): JSX.Element {
  const [data, setData] = useState<Skill[]>([]);
  const [create, setCreate] = useState<Skill>({ title: '', color_code: '' });
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setData(res.data);
    });
  }, []);

  const createSkill = (arg: Skill) => {
    const _data = {
      title: arg.title,
      color_code: arg.color_code,
    };
    axios
      .post(BASE_URL, _data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        setData([...data, res.data]);
        setCreate({ title: '', color_code: '' });
      });
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setCreate({ ...create, [name]: value });
  };

  return (
    <div>
      <ul>
        {data.map((d) => (
          <div key={d.id}>
            <div>name : {d.title}</div>
            <div>color-code : {d.color_code}</div>
          </div>
        ))}
      </ul>
      <input
        type="text"
        name="title"
        value={create.title}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        type="text"
        name="color_code"
        value={create.color_code}
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={() => createSkill(create)}>create</button>
    </div>
  );
}
