import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';

const BASE_URL = 'http://127.0.0.1:8000/api/about/';

type About = {
  id?: number;
  image: string;
  text: string;
};

export default function FetchAboutData(): JSX.Element {
  const [data, setData] = useState<About[]>([]);
  const [id, setId] = useState<number>();
  const [image, setImage] = useState<File | string>('');
  const [text, setText] = useState<string>('');
  const [updated, setUpdated] = useState<boolean>(false);

  //Aboutページの一覧所得
  useEffect(() => {
    const config = {
      headers: { Accept: 'application/json' },
    };
    const fetchData = async () => {
      await axios
        .get(BASE_URL, config)
        .then((res: AxiosResponse) => setData(res.data));
    };

    fetchData();
  }, [updated]);

  //Aboutページの新規作成
  const onSubmitPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);

    const body = formData;

    await axios
      .post(BASE_URL, body, config)
      .then(() => setUpdated(!updated))
      .catch((err) => alert(err));
  };

  //Aboutページの削除（IDを指定してね）
  const onSubmitDelete = (): void => {
    axios
      .delete(`${BASE_URL}${id}/`)
      .then(() => alert('Delete Success'))
      .catch(() => alert('No exists ID'));
  };

  //Aboutページの更新
  const onSubmitPut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);

    const body = formData;

    await axios
      .put(`${BASE_URL}${id}/`, body, config)
      .then((res) => {
        if (res.data.id) setUpdated(!updated);
      })
      .catch(() => alert('No exists ID'));
  };

  return (
    <div className="flex flex-row mx-5 space-y-5 mt-10">
      <div className="flex flex-col w-1/2 px-5">
        <h2 className="font-bold">Post</h2>
        <form className="w-1/3" onSubmit={onSubmitPost}>
          <div className="my-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e: any) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="text">text</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="text"
              onChange={(e: any) => setText(e.target.value)}
              required
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>

        <h2 className="font-bold">Put</h2>
        <form className="w-1/3" onSubmit={onSubmitPut}>
          <div className="flex flex-col">
            <label htmlFor="id">ID</label>
            <input
              className="border border-stone-900 p-1"
              type="number"
              name="id"
              onChange={(e) => setId(parseInt(e.target.value))}
            />
          </div>
          <div className="my-2">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e: any) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="text">text</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="text"
              onChange={(e: any) => setText(e.target.value)}
              required
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>

        <h2 className="font-bold">Delete</h2>
        <form className="w-1/3" onSubmit={onSubmitDelete}>
          <div className="flex flex-col">
            <label htmlFor="delete">ID</label>
            <input
              className="border border-stone-900 p-1"
              type="number"
              name="delete"
              onChange={(e) => setId(parseInt(e.target.value))}
              required
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 ">
        <h2 className="font-bold">Get Image & Text</h2>
        <ul className="grid grid-cols-2">
          {data.map((_data) => (
            <div className="my-3" key={_data.id}>
              <div className="flex">
                <li>{_data.id}</li> : <li>{_data.text}</li>
              </div>
              <Image
                src={_data.image}
                alt="トップ画像"
                width="250"
                height="200"
                priority
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
