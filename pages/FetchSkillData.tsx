import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

type Skill = {
  id?: number;
  category: number;
  title: string;
  color_code: string;
};

const BASE_URL = 'http://127.0.0.1:8000/api/skills';
const initialValue = { id: 0, category: 0, title: '', color_code: '' };
const category_idx = [1, 2, 3];

export default function FetchSkillData(): JSX.Element {
  const [data, setData] = useState<Skill[]>([]);
  const [create, setCreate] = useState<Skill>(initialValue);
  const [put, setPut] = useState<Skill>(initialValue);
  const [id, setId] = useState<number>(0);
  const [updated, setUpdated] = useState<boolean>(false);

  const categorySwitch = (num: number) => {
    switch (num) {
      case 1:
        return 'Front-End';
      case 2:
        return 'Back-End';
      case 3:
        return 'Others';
    }
  };

  const config = { headers: { 'Content-Type': 'application/json' } };

  //一覧取得
  useEffect(() => {
    const fetchData = async () =>
      await axios.get(BASE_URL, config).then((res) => setData(res.data));
    fetchData();
  }, [updated]);

  //新規作成
  const createSkillData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const _data = {
      category: create.category,
      title: create.title,
      color_code: create.color_code,
    };
    await axios
      .post(`${BASE_URL}/`, _data, config)
      .then(() => {
        setUpdated(!updated);
        setCreate(initialValue);
      })
      .catch((error) => alert(error));
  };

  //更新
  const putSkillData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const _data = {
      id: put.id,
      category: put.category,
      title: put.title,
      color_code: put.color_code,
    };
    await axios
      .put(`${BASE_URL}/${put.id}/`, _data, config)
      .then((res) => {
        if (res.data.id) {
          setUpdated(!updated);
          setPut(initialValue);
        }
      })
      .catch((error) => alert(error));
  };

  //削除
  const deleteSkillData = (): void => {
    axios
      .delete(`${BASE_URL}/${put.id}/`)
      .then(() => alert('Delete Success'))
      .catch(() => alert('No exists ID'));
  };

  //idを選択したらidに対応するデータが表示される関数
  const complementDataById = (e: ChangeEvent<HTMLSelectElement>) => {
    const _id = parseInt(e.target.value);
    const _data = data.filter((i) => i.id === _id)[0];
    setPut({
      id: _id,
      category: _data.category,
      title: _data.title,
      color_code: _data.color_code,
    });
    setUpdated(!updated);
  };

  return (
    <div className="box-border m-5 text-xl">
      <ul>
        {data.map((_data) => (
          <div key={_data.id} className="flex space-x-2">
            <li>id:{_data.id}</li>...<li>title:{_data.title}</li>...
            <li>code:{_data.color_code}</li>...
            <li>category:{_data.category}</li>
          </div>
        ))}
      </ul>

      <form
        onSubmit={createSkillData}
        className="flex flex-col mt-10 w-1/3 space-y-4"
      >
        <h2>Create</h2>
        <select
          id="category"
          className="border border-black"
          onChange={(e) =>
            setCreate({ ...create, category: parseInt(e.target.value) })
          }
        >
          <option value="" hidden>
            {categorySwitch(create.category)}
          </option>
          {category_idx.map((i) => (
            <option key={i} value={i}>
              {categorySwitch(i)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="title"
          value={create.title}
          className="border border-black"
          onChange={(e) => setCreate({ ...create, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="color_code"
          value={create.color_code}
          className="border border-black"
          onChange={(e) => setCreate({ ...create, color_code: e.target.value })}
        />
        <button type="submit" className="border border-black">
          Create
        </button>
      </form>

      <form
        onSubmit={putSkillData}
        className="flex flex-col mt-10 w-1/3 space-y-4"
      >
        <h2>Edit / Delete</h2>
        <select
          id="id"
          className="border border-black"
          onChange={(e) => complementDataById(e)}
        >
          <option value="" hidden>
            選択してください
          </option>
          {data.map((i) => (
            <option key={i.id} value={i.id}>
              {i.id}
            </option>
          ))}
        </select>
        <select
          id="category"
          className="border border-black"
          onChange={(e) =>
            setPut({ ...put, category: parseInt(e.target.value) })
          }
        >
          <option value="" hidden>
            {categorySwitch(put.category)}
          </option>
          {category_idx.map((i) => (
            <option key={i} value={i}>
              {categorySwitch(i)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="title"
          value={put.title}
          className="border border-black"
          onChange={(e) => setPut({ ...put, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="color_code"
          value={put.color_code}
          className="border border-black"
          onChange={(e) => setPut({ ...put, color_code: e.target.value })}
        />
        <button type="submit" className="border border-black">
          Edit
        </button>
        <button
          type="button"
          className="border border-black"
          onClick={() => deleteSkillData()}
        >
          Delete
        </button>
      </form>
    </div>
  );
}
