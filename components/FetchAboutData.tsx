import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';

const BASE_URL = 'http://127.0.0.1:8000/api/about/';

type About = {
  id?: number;
  image: string;
  text: string;
};

export const FetchAboutData = (): JSX.Element => {
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

  //Get HTML
  const GetAboutData = () => {
    return (
      <ul>
        <h2 className="font-bold">Get Image & Text</h2>
        {data.map((_data) => (
          <div className="my-3" key={_data.id}>
            <div className="flex">
              <li>{_data.id}</li> : <li>{_data.text}</li>
            </div>
            <Image
              src={_data.image}
              alt="トップ画像"
              width={250}
              height={150}
            />
          </div>
        ))}
      </ul>
    );
  };

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

    await axios.post(BASE_URL, body, config).then(() => {
      setUpdated(!updated);
    });
  };

  //Post HTML
  const PostAboutData = () => {
    return (
      <>
        <h2 className="font-bold">Post Image & Text</h2>
        <form onSubmit={onSubmitPost}>
          <div className="my-2">
            <label htmlFor="image">Image Upload</label>
            <input
              type="file"
              name="image"
              onChange={(e: any) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="flex flex-col mt-3 w-1/2">
            <label htmlFor="text">text</label>
            <input
              className="border border-stone-900"
              type="text"
              name="text"
              onChange={(e: any) => setText(e.target.value)}
              required
            />
          </div>
          <button
            className="my-3 p-2 border border-slate-900 rounded-full w-1/2"
            type="submit"
          >
            Upload
          </button>
        </form>
      </>
    );
  };

  //Aboutページの削除（IDを指定してね）
  const onSubmitDelete = (): void => {
    axios.delete(`${BASE_URL}${id}/`);
  };

  const DeleteAbout = () => {
    return (
      <>
        <h2 className="font-bold">Delete Image & Text</h2>
        <form onSubmit={onSubmitDelete}>
          <div className="flex flex-col w-1/2">
            <label htmlFor="delete">delete</label>
            <input
              className="border border-stone-900"
              type="text"
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
      </>
    );
  };

  return (
    <div className="mx-5 space-y-5 mt-10">
      <PostAboutData />
      <DeleteAbout />
      <GetAboutData />
    </div>
  );
};
