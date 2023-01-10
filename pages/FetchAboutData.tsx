import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import Image from 'next/image';

type About = {
  id?: number;
  image: HTMLImageElement;
  text: string;
};

const BASE_URL = 'http://127.0.0.1:8000/api/about/1/';
const initialValue = { image: '', text: '' };

export default function FetchAboutData(): JSX.Element {
  const [data, setData] = useState<About>();
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
    const fetchData = async () =>
      await axios.get(BASE_URL, config).then((res) => {
        setData(res.data);
        setPut({ ...put, text: res.data.text });
      });
    fetchData();
  }, [updated]);

  //Aboutページの更新
  const onSubmitPut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', put.image);
    formData.append('text', put.text);

    const body = formData;

    await axios
      .put(BASE_URL, body, config)
      .then((res: AxiosResponse) => {
        if (res.data.id) {
          setUpdated(!updated);
          setPut(initialValue);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex flex-row mx-5 space-y-5 mt-10">
      <div className="flex flex-col w-1/2 px-5">
        <h2 className="font-bold">Put</h2>
        <form className="w-1/3" onSubmit={onSubmitPut}>
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
            <label htmlFor="text">text</label>
            <input
              className="border border-stone-900 p-1"
              type="text"
              name="text"
              defaultValue={data?.text}
              onChange={(e) => setPut({ ...put, text: e.target.value })}
            />
            <button
              className="my-3 p-2 border border-slate-900 rounded-full"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 ">
        <h2 className="font-bold">Get Image & Text</h2>
        {data ? (
          <ul className="grid grid-cols-2">
            <div className="my-3">
              <div className="flex flex-col">
                <li>{data.id}</li>
                <Image
                  src={data.image}
                  alt="トップ画像"
                  width={250}
                  height={200}
                  priority
                />
                <li>{data.text}</li>
              </div>
            </div>
          </ul>
        ) : (
          <div className="font-bold">NO DATA</div>
        )}
      </div>
    </div>
  );
}
