import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { Axios } from 'axios';
import Image from 'next/image';
import Link from 'next/link';

type Work = {
  id?: number;
  image: any;
  title: string;
  description: string;
  url: string;
};

const BASE_URL = 'http://127.0.0.1:8000/api/works/';
const initialValue = { id: 0, image: '', title: '', description: '', url: '' };

export default function FetchWorkData(): JSX.Element {
  const [data, setData] = useState<Work[]>([]);
  const [create, setCreate] = useState(initialValue);
  const [put, setPut] = useState(initialValue);
  const [updated, setUpdated] = useState<boolean>(false);

  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  //Aboutページの一覧所得
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(BASE_URL, config).then((res) => setData(res.data));
    };
    fetchData();
  }, [updated]);

  //Aboutページの新規作成
  const createWorkData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', create.image);
    formData.append('title', create.title);
    formData.append('description', create.description);
    formData.append('url', create.url);

    const body = formData;

    await axios
      .post(BASE_URL, body, config)
      .then(() => {
        setUpdated(!updated);
        setCreate(initialValue);
      })
      .catch((err) => alert(err));
  };

  //Aboutページの更新
  const editWorkData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    if (typeof put.image !== 'string') formData.append('image', put.image);
    formData.append('title', put.title);
    formData.append('description', put.description);
    formData.append('url', put.url);

    const body = formData;

    await axios
      .put(`${BASE_URL}${put.id}/`, body, config)
      .then((res) => {
        if (res.data.id) setUpdated(!updated);
        setPut(initialValue);
      })
      .catch(() => alert('No exists ID'));
  };

  //Aboutページの削除（IDを指定してね）
  const deleteWorkData = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .delete(`${BASE_URL}${put.id}/`)
      .then(() => {
        alert('Delete Success');
        setUpdated(!updated);
      })
      .catch(() => alert('No exists ID'));
  };

  //IDを指定し、そのIDの情報をINPUTタグに補完する関数
  const complementDataById = (e: ChangeEvent<HTMLSelectElement>) => {
    const _id = parseInt(e.target.value);
    const _data = data.filter((i) => i.id === _id)[0];
    setPut({
      id: _id,
      image: _data.image,
      title: _data.title,
      description: _data.description,
      url: _data.url,
    });
    setUpdated(!updated);
  };

  return (
    <div className="flex flex-row mx-5 space-y-5 mt-10">
      <div className="flex flex-col w-1/2 px-5">
        <h2 className="font-bold">Post</h2>
        <form className="w-1/3" onSubmit={createWorkData}>
          <div className="my-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e: any) =>
                setCreate({ ...create, image: e.target.files[0] })
              }
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="title">title</label>
            <input
              className="border border-stone-900 p-1"
              type="title"
              name="text"
              value={create.title}
              onChange={(e) => setCreate({ ...create, title: e.target.value })}
              required
            />
            <label htmlFor="description">description</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="description"
              value={create.description}
              onChange={(e) =>
                setCreate({ ...create, description: e.target.value })
              }
              required
            />
            <label htmlFor="url">url</label>
            <input
              className="border border-stone-900 p-1"
              type="url"
              name="url"
              value={create.url}
              onChange={(e) => setCreate({ ...create, url: e.target.value })}
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>

        <form className="w-1/3 mt-10" onSubmit={editWorkData}>
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
          <div className="my-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e: any) =>
                setPut({ ...put, image: e.target.files[0] })
              }
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="title">title</label>
            <input
              className="border border-stone-900 p-1"
              type="title"
              name="text"
              value={put.title}
              onChange={(e) => setPut({ ...put, title: e.target.value })}
              required
            />
            <label htmlFor="description">description</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="description"
              value={put.description}
              onChange={(e) => setPut({ ...put, description: e.target.value })}
              required
            />
            <label htmlFor="url">url</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="url"
              value={put.url}
              onChange={(e) => setPut({ ...put, url: e.target.value })}
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
        <form className="w-1/3 mt-10" onSubmit={deleteWorkData}>
          <select
            id="id"
            className="border border-black"
            onChange={(e) => {
              setPut({ ...put, id: parseInt(e.target.value) });
            }}
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
          <button
            className="my-3 p-2 border border-slate-900 rounded-full"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>

      <div className="w-2/3">
        <h2 className="font-bold">Get Works Data</h2>
        <div className="grid grid-cols-2 space-x-5">
          {data.map((i) => (
            <div key={i.id} className="flex flex-col">
              <div>{i.id}</div>
              <Image
                src={i.image}
                alt="thumbnail"
                width={250}
                height={250}
                priority
              />
              <div>title : {i.title}</div>
              <div>description : {i.description}</div>
              <Link className=" text-blue-500" href={i.url}>
                {i.url}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
